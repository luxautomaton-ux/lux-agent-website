import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SIGNING_SECRET = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET") ?? "";
const TOLERANCE_SECONDS = 300;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function rest(path: string, init: RequestInit = {}) {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("BACKEND_NOT_CONFIGURED");
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function sha256Hex(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function parseSignature(header: string) {
  const parts = header.split(",").map(part => part.trim());
  let timestamp = 0;
  const signatures: string[] = [];
  for (const part of parts) {
    const [key, value] = part.split("=", 2);
    if (key === "t") timestamp = Number(value);
    if (key === "v1" && value) signatures.push(value);
  }
  return { timestamp, signatures };
}

function constantTimeEqualHex(a: string, b: string) {
  if (!/^[a-f0-9]+$/i.test(a) || !/^[a-f0-9]+$/i.test(b) || a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index++) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return diff === 0;
}

async function verifyStripeSignature(body: string, header: string) {
  if (!SIGNING_SECRET) return false;
  const { timestamp, signatures } = parseSignature(header);
  if (!timestamp || !signatures.length) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (age > TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${body}`),
  );
  const expected = Array.from(new Uint8Array(signature))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
  return signatures.some(candidate => constantTimeEqualHex(candidate, expected));
}

async function checkoutRow(checkoutId: string) {
  const query = new URLSearchParams({
    select: "id,status,customer_email,setup,setup_hash,stripe_session_id",
    id: `eq.${checkoutId}`,
    limit: "1",
  });
  const response = await rest(`lux_agent_checkout_sessions?${query}`);
  if (!response.ok) throw new Error("CHECKOUT_READ_FAILED");
  return (await response.json() as Array<Record<string, unknown>>)[0] ?? null;
}

async function recordEvent(input: {
  eventId: string;
  eventType: string;
  checkoutId?: string | null;
  payloadHash: string;
  livemode?: boolean | null;
  note?: string;
}) {
  const response = await rest("lux_agent_stripe_events?on_conflict=event_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({
      event_id: input.eventId,
      event_type: input.eventType,
      checkout_id: input.checkoutId ?? null,
      payload_hash: input.payloadHash,
      livemode: input.livemode ?? null,
      note: input.note ?? null,
    }),
  });
  if (!response.ok) throw new Error("EVENT_RECORD_FAILED");
}

async function handleCompleted(event: Record<string, unknown>, bodyHash: string) {
  const data = event.data as Record<string, unknown> | undefined;
  const object = data?.object as Record<string, unknown> | undefined;
  if (!object) throw new Error("MISSING_SESSION_OBJECT");

  const metadata = object.metadata as Record<string, unknown> | undefined;
  const checkoutId = String(metadata?.checkout_id ?? "");
  const setupHash = String(metadata?.setup_hash ?? "");
  const stripeSessionId = String(object.id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(checkoutId) || !/^[a-f0-9]{64}$/i.test(setupHash) || !stripeSessionId) {
    throw new Error("INVALID_SESSION_METADATA");
  }

  const row = await checkoutRow(checkoutId);
  if (!row) throw new Error("CHECKOUT_NOT_FOUND");
  if (String(row.setup_hash ?? "") !== setupHash) throw new Error("SETUP_HASH_MISMATCH");
  if (row.stripe_session_id && String(row.stripe_session_id) !== stripeSessionId) {
    throw new Error("SESSION_ID_MISMATCH");
  }

  // Session completion can precede payment settlement (for example, delayed payment methods).
  const paid = object.payment_status === "paid";
  if (!paid) {
    await recordEvent({
      eventId: String(event.id), eventType: String(event.type), checkoutId,
      payloadHash: bodyHash, livemode: Boolean(event.livemode),
      note: "payment pending; no entitlement may be issued",
    });
    return;
  }

  const now = new Date().toISOString();
  const update = await rest(`lux_agent_checkout_sessions?id=eq.${checkoutId}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "paid",
      stripe_session_id: stripeSessionId,
      stripe_payment_intent_id: object.payment_intent ? String(object.payment_intent) : null,
      stripe_customer_id: object.customer ? String(object.customer) : null,
      amount_total: typeof object.amount_total === "number" ? object.amount_total : null,
      currency: object.currency ? String(object.currency) : null,
      livemode: Boolean(event.livemode),
      paid_at: now,
      updated_at: now,
      error_code: null,
      error_detail: null,
    }),
  });
  if (!update.ok) throw new Error("CHECKOUT_UPDATE_FAILED");

  await recordEvent({
    eventId: String(event.id),
    eventType: String(event.type),
    checkoutId,
    payloadHash: bodyHash,
    livemode: Boolean(event.livemode),
    note: "checkout paid; ready for authenticated workspace claim",
  });
}

async function handleUnpaidTerminal(event: Record<string, unknown>, bodyHash: string, status: "expired" | "failed") {
  const data = event.data as Record<string, unknown> | undefined;
  const object = data?.object as Record<string, unknown> | undefined;
  const metadata = object?.metadata as Record<string, unknown> | undefined;
  const checkoutId = String(metadata?.checkout_id ?? "");
  const setupHash = String(metadata?.setup_hash ?? "");
  const sessionId = String(object?.id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(checkoutId) || !/^[a-f0-9]{64}$/i.test(setupHash) || !sessionId) {
    throw new Error("INVALID_SESSION_METADATA");
  }
  const row = await checkoutRow(checkoutId);
  if (!row || row.setup_hash !== setupHash || (row.stripe_session_id && row.stripe_session_id !== sessionId)) {
    throw new Error("SESSION_IDENTITY_MISMATCH");
  }
  // A delayed failure/expiry event must never revoke an already settled purchase.
  const update = await rest(`lux_agent_checkout_sessions?id=eq.${checkoutId}&status=neq.paid`, {
    method: "PATCH",
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  });
  if (!update.ok) throw new Error("CHECKOUT_UPDATE_FAILED");
  await recordEvent({
    eventId: String(event.id), eventType: String(event.type), checkoutId,
    payloadHash: bodyHash, livemode: Boolean(event.livemode),
    note: `checkout ${status}; settled purchases preserved`,
  });
}

Deno.serve(async request => {
  if (request.method === "GET") {
    return json({
      enabled: Boolean(SIGNING_SECRET),
      signingSecretConfigured: Boolean(SIGNING_SECRET),
      acceptsCharges: false,
    });
  }
  if (request.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405);
  if (!SIGNING_SECRET) return json({ error: "WEBHOOK_NOT_ACTIVATED" }, 503);

  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature") ?? "";
  if (!await verifyStripeSignature(body, signature)) {
    return json({ error: "INVALID_SIGNATURE" }, 400);
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return json({ error: "INVALID_JSON" }, 400);
  }

  const eventId = String(event.id ?? "");
  const eventType = String(event.type ?? "");
  if (!eventId || !eventType) return json({ error: "INVALID_EVENT" }, 400);

  const bodyHash = await sha256Hex(body);
  const existing = await rest(`lux_agent_stripe_events?select=event_id&event_id=eq.${encodeURIComponent(eventId)}&limit=1`);
  if (existing.ok && (await existing.json() as unknown[]).length) {
    return json({ received: true, duplicate: true });
  }

  try {
    if (eventType === "checkout.session.completed" || eventType === "checkout.session.async_payment_succeeded") {
      await handleCompleted(event, bodyHash);
    } else if (eventType === "checkout.session.expired") {
      await handleUnpaidTerminal(event, bodyHash, "expired");
    } else if (eventType === "checkout.session.async_payment_failed") {
      await handleUnpaidTerminal(event, bodyHash, "failed");
    } else {
      await recordEvent({
        eventId,
        eventType,
        payloadHash: bodyHash,
        livemode: Boolean(event.livemode),
        note: "event acknowledged; no Lux state change required",
      });
    }
    return json({ received: true });
  } catch (error) {
    console.error(error);
    return json({ error: "WEBHOOK_PROCESSING_FAILED" }, 500);
  }
});
