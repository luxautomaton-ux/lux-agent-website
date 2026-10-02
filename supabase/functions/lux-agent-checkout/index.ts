import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const configuredOrigins = (Deno.env.get("LUX_AGENT_CHECKOUT_ALLOWED_ORIGINS") ?? "")
  .split(",").map(value => value.trim()).filter(Boolean);
const LOCAL_ORIGINS = new Set(["http://localhost:3080", "http://127.0.0.1:3080"]);

type Setup = {
  successId?: string;
  generalTeamMode?: boolean;
  memoryIds?: string[];
  customTeam?: boolean;
  customDepartments?: string[];
  customNotes?: string;
  target?: "desktop" | "usb" | "both";
};

function allowedOrigin(origin: string) {
  return configuredOrigins.includes(origin) || (configuredOrigins.length === 0 && LOCAL_ORIGINS.has(origin));
}

function cors(origin: string) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin(origin) ? origin : "null",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Vary": "Origin",
  };
}

function reply(origin: string, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join("");
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

function cleanId(value: unknown) {
  const id = String(value ?? "").trim();
  return /^[A-Za-z0-9:_-]{1,120}$/.test(id) ? id : "";
}

function validateSetup(value: unknown): Setup | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const target = String(raw.target ?? "");
  if (!["desktop", "usb", "both"].includes(target)) return null;
  const successId = cleanId(raw.successId);
  const memoryIds = Array.isArray(raw.memoryIds) ? raw.memoryIds.map(cleanId).filter(Boolean) : [];
  const departments = Array.isArray(raw.customDepartments)
    ? raw.customDepartments.map(item => String(item).trim()).filter(Boolean).slice(0, 16)
    : [];
  if (memoryIds.length > 12) return null;
  if (!successId && !raw.generalTeamMode) return null;
  return {
    successId,
    generalTeamMode: Boolean(raw.generalTeamMode),
    memoryIds: [...new Set(memoryIds)],
    customTeam: Boolean(raw.customTeam),
    customDepartments: departments,
    customNotes: String(raw.customNotes ?? "").trim().slice(0, 1200),
    target: target as Setup["target"],
  };
}

function productKeys(setup: Setup) {
  const keys = ["core_team"];
  if (setup.successId) keys.push(`success:${setup.successId.toLowerCase()}`);
  for (const id of setup.memoryIds ?? []) keys.push(`memory:${id.toLowerCase()}`);
  if (setup.target === "usb" || setup.target === "both") keys.push("usb_travel");
  if (setup.customTeam) keys.push("premium_team");
  return [...new Set(keys)];
}

async function catalogRows(keys: string[]) {
  const expression = `in.(${keys.join(",")})`;
  const query = new URLSearchParams({
    select: "product_key,display_name,stripe_price_id,billing_mode,active",
    product_key: expression,
  });
  const response = await rest(`lux_agent_checkout_catalog?${query}`);
  if (!response.ok) throw new Error("CATALOG_READ_FAILED");
  return await response.json() as Array<{
    product_key: string; display_name: string; stripe_price_id: string | null;
    billing_mode: "payment" | "subscription"; active: boolean;
  }>;
}

async function status(origin: string) {
  let active = 0;
  try {
    const query = new URLSearchParams({ select: "product_key", active: "eq.true" });
    const response = await rest(`lux_agent_checkout_catalog?${query}`);
    if (response.ok) active = (await response.json() as unknown[]).length;
  } catch {}
  return reply(origin, {
    enabled: Boolean(STRIPE_SECRET && configuredOrigins.length && active > 0),
    stripeConfigured: Boolean(STRIPE_SECRET),
    originConfigured: configuredOrigins.length > 0,
    activeCatalogItems: active,
    chargesAllowed: Boolean(STRIPE_SECRET && configuredOrigins.length && active > 0),
  });
}

Deno.serve(async request => {
  const origin = request.headers.get("Origin") ?? "";
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (request.method === "GET") return status(origin);
  if (request.method !== "POST") return reply(origin, { error: "METHOD_NOT_ALLOWED" }, 405);
  if (!allowedOrigin(origin)) return reply(origin, { error: "ORIGIN_NOT_ALLOWED" }, 403);
  if (!STRIPE_SECRET || configuredOrigins.length === 0) {
    return reply(origin, { error: "CHECKOUT_NOT_ACTIVATED" }, 503);
  }

  try {
    const raw = await request.json() as Record<string, unknown>;
    const customer = (raw.customer ?? {}) as Record<string, unknown>;
    const name = String(customer.name ?? "").trim().slice(0, 120);
    const email = String(customer.email ?? "").trim().toLowerCase().slice(0, 254);
    const business = String(customer.business ?? "").trim().slice(0, 160);
    const setup = validateSetup(raw.setup);
    const returnPrefix = raw.returnPathPrefix === "/lux-agent-website" ? "/lux-agent-website" : "";
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !setup) {
      return reply(origin, { error: "INVALID_CHECKOUT_REQUEST" }, 400);
    }

    const keys = productKeys(setup);
    const rows = await catalogRows(keys);
    const byKey = new Map(rows.map(row => [row.product_key, row]));
    const missing = keys.filter(key => {
      const row = byKey.get(key);
      return !row?.active || !row.stripe_price_id || row.billing_mode !== "payment";
    });
    if (missing.length) {
      return reply(origin, { error: "CHECKOUT_NOT_ACTIVATED", missingProducts: missing }, 503);
    }

    const setupJson = JSON.stringify(setup);
    const setupHash = await digest(setupJson);
    const insert = await rest("lux_agent_checkout_sessions", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        customer_name: name, customer_email: email, customer_business: business,
        setup, setup_hash: setupHash, request_origin: origin,
      }),
    });
    if (!insert.ok) throw new Error("CHECKOUT_RECORD_FAILED");
    const checkout = (await insert.json() as Array<{ id: string }>)[0];
    if (!checkout?.id) throw new Error("CHECKOUT_RECORD_FAILED");

    const form = new URLSearchParams();
    form.set("mode", "payment");
    form.set("customer_email", email);
    form.set("client_reference_id", checkout.id);
    form.set("success_url", `${origin}${returnPrefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    form.set("cancel_url", `${origin}${returnPrefix}/checkout/cancel`);
    form.set("metadata[checkout_id]", checkout.id);
    form.set("metadata[setup_hash]", setupHash);
    keys.forEach((key, index) => {
      form.set(`line_items[${index}][price]`, byKey.get(key)!.stripe_price_id!);
      form.set(`line_items[${index}][quantity]`, "1");
    });

    const stripe = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });
    const stripeBody = await stripe.json() as Record<string, unknown>;
    if (!stripe.ok || !stripeBody.id || !stripeBody.url) {
      const stripeError = stripeBody.error as Record<string, unknown> | undefined;
      await rest(`lux_agent_checkout_sessions?id=eq.${checkout.id}`, {
        method: "PATCH",        body: JSON.stringify({
          status: "failed", error_code: "STRIPE_SESSION_FAILED",
          error_detail: String(stripeError?.message ?? "Stripe checkout failed").slice(0, 500),
          updated_at: new Date().toISOString(),
        }),
      });
      return reply(origin, { error: "CHECKOUT_PROVIDER_FAILED" }, 502);
    }

    await rest(`lux_agent_checkout_sessions?id=eq.${checkout.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "checkout_created",
        stripe_session_id: stripeBody.id,
        livemode: Boolean(stripeBody.livemode),
        updated_at: new Date().toISOString(),
      }),
    });

    return reply(origin, { checkoutId: checkout.id, url: stripeBody.url });
  } catch (error) {
    console.error(error);
    return reply(origin, { error: "CHECKOUT_UNAVAILABLE" }, 500);
  }
});
