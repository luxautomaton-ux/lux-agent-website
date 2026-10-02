import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const KEY_ID = "lux-agent-setup-ed25519-v1";
const SECRET_NAME = "lux-agent-setup-ed25519-v1-private";

type Setup = {
  successId?: string;
  generalTeamMode?: boolean;
  memoryIds?: string[];
  customTeam?: boolean;
  customDepartments?: string[];
  customNotes?: string;
  target?: "desktop" | "usb" | "both";
};

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
async function authUser(auth: string) {
  if (!auth.startsWith("Bearer ")) return null;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SERVICE_KEY, Authorization: auth },
  });
  if (!response.ok) return null;
  return await response.json() as { id?: string; email?: string };
}

function productKeys(setup: Setup) {
  const keys = ["core_team"];
  if (setup.successId) keys.push(`success:${setup.successId.toLowerCase()}`);
  for (const id of setup.memoryIds ?? []) keys.push(`memory:${String(id).toLowerCase()}`);
  if (setup.target === "usb" || setup.target === "both") keys.push("usb_travel");
  if (setup.customTeam) keys.push("premium_team");
  return [...new Set(keys)];
}

async function membership(workspaceId: string, userId: string) {
  const query = new URLSearchParams({
    select: "role",
    workspace_id: `eq.${workspaceId}`,
    user_id: `eq.${userId}`,
    limit: "1",
  });
  const response = await rest(`lux_workspace_members?${query}`);
  if (!response.ok) throw new Error("MEMBERSHIP_READ_FAILED");
  return (await response.json() as Array<{ role: string }>)[0] ?? null;
}
async function checkout(checkoutId: string) {
  const query = new URLSearchParams({
    select: "id,status,customer_email,setup,setup_hash,claimed_workspace_id",
    id: `eq.${checkoutId}`,
    limit: "1",
  });
  const response = await rest(`lux_agent_checkout_sessions?${query}`);
  if (!response.ok) throw new Error("CHECKOUT_READ_FAILED");
  return (await response.json() as Array<{
    id: string;
    status: string;
    customer_email: string;
    setup: Setup;
    setup_hash: string;
    claimed_workspace_id: string | null;
  }>)[0] ?? null;
}

async function activeEntitlementKeys(workspaceId: string, keys: string[]) {
  const query = new URLSearchParams({
    select: "product_key,status",
    workspace_id: `eq.${workspaceId}`,
    product_key: `in.(${keys.join(",")})`,
    status: "in.(active,trialing)",
  });
  const response = await rest(`lux_entitlements?${query}`);
  if (!response.ok) throw new Error("ENTITLEMENT_READ_FAILED");
  return new Set((await response.json() as Array<{ product_key: string }>).map(row => row.product_key));
}
async function signingSecret() {
  const response = await rest("rpc/lux_agent_get_signing_secret", {
    method: "POST",
    body: JSON.stringify({ secret_name: SECRET_NAME }),
  });
  if (!response.ok) throw new Error("SIGNING_KEY_UNAVAILABLE");
  const value = await response.json();
  if (typeof value !== "string" || value.length < 40) throw new Error("SIGNING_KEY_UNAVAILABLE");
  return value;
}

function fromB64(value: string) {
  const raw = atob(value.replace(/\s+/g, ""));
  return Uint8Array.from(raw, char => char.charCodeAt(0));
}

function toB64(bytes: ArrayBuffer) {
  const view = new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}
async function sign(payloadJson: string) {
  const privatePkcs8 = fromB64(await signingSecret());
  const key = await crypto.subtle.importKey("pkcs8", privatePkcs8, { name: "Ed25519" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("Ed25519", key, new TextEncoder().encode(payloadJson));
  return toB64(signature);
}

async function recordIssuance(checkoutId: string, workspaceId: string, setupHash: string, payloadHash: string) {
  const response = await rest("lux_agent_setup_issuances?on_conflict=checkout_id,workspace_id,setup_hash,key_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({
      checkout_id: checkoutId,
      workspace_id: workspaceId,
      setup_hash: setupHash,
      key_id: KEY_ID,
      payload_hash: payloadHash,
    }),
  });
  if (!response.ok) throw new Error("ISSUANCE_RECORD_FAILED");
}

Deno.serve(async request => {
  if (request.method !== "POST") return json({ error: "METHOD_NOT_ALLOWED" }, 405);
  const user = await authUser(request.headers.get("Authorization") ?? "");
  if (!user?.id || !user.email) return json({ error: "AUTHENTICATION_REQUIRED" }, 401);
  let body: { checkoutId?: string; workspaceId?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "INVALID_REQUEST" }, 400);
  }

  const checkoutId = String(body.checkoutId ?? "").trim();
  const workspaceId = String(body.workspaceId ?? "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(checkoutId) || !/^[0-9a-f-]{36}$/i.test(workspaceId)) {
    return json({ error: "INVALID_REQUEST" }, 400);
  }

  try {
    const member = await membership(workspaceId, user.id);
    if (!member || !["owner", "admin"].includes(member.role)) return json({ error: "WORKSPACE_ADMIN_REQUIRED" }, 403);

    const order = await checkout(checkoutId);
    if (!order) return json({ error: "ORDER_NOT_FOUND" }, 404);
    if (order.status !== "claimed" || order.claimed_workspace_id !== workspaceId) {
      return json({ error: "ORDER_NOT_CLAIMED_TO_WORKSPACE" }, 409);
    }
    if (order.customer_email.toLowerCase() !== user.email.toLowerCase()) {
      return json({ error: "ORDER_EMAIL_MISMATCH" }, 403);
    }

    const keys = productKeys(order.setup);
    const active = await activeEntitlementKeys(workspaceId, keys);
    const missing = keys.filter(key => !active.has(key));
    if (missing.length) return json({ error: "ENTITLEMENT_MISMATCH", missing }, 409);
    const payload = {
      schema: "lux-setup/v1",
      version: 1,
      production: true,
      keyId: KEY_ID,
      checkoutId,
      workspaceId,
      setupHash: order.setup_hash,
      setup: order.setup,
      productKeys: keys,
      issuedAt: new Date().toISOString(),
    };
    const payloadJson = JSON.stringify(payload);
    const signatureB64 = await sign(payloadJson);
    const payloadHash = await digest(payloadJson);
    await recordIssuance(checkoutId, workspaceId, order.setup_hash, payloadHash);

    return json({
      schema: "lux-signed-setup/v1",
      algorithm: "Ed25519",
      keyId: KEY_ID,
      payloadJson,
      signatureB64,
    });
  } catch (error) {
    console.error(error);
    return json({ error: "SIGNED_SETUP_UNAVAILABLE" }, 500);
  }
});
