import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

type Setup = {
  successId?: string;
  generalTeamMode?: boolean;
  memoryIds?: string[];
  customTeam?: boolean;
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
    select: "id,status,customer_email,setup,setup_hash,stripe_session_id,claimed_workspace_id",
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
    stripe_session_id: string | null;
    claimed_workspace_id: string | null;
  }>)[0] ?? null;
}

async function knownCatalogKeys(keys: string[]) {
  const query = new URLSearchParams({
    select: "product_key",
    product_key: `in.(${keys.join(",")})`,
  });
  const response = await rest(`lux_agent_checkout_catalog?${query}`);
  if (!response.ok) throw new Error("CATALOG_READ_FAILED");
  return new Set((await response.json() as Array<{ product_key: string }>).map(row => row.product_key));
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
    if (!member || !["owner", "admin"].includes(member.role)) {
      return json({ error: "WORKSPACE_ADMIN_REQUIRED" }, 403);
    }

    const order = await checkout(checkoutId);
    if (!order) return json({ error: "ORDER_NOT_FOUND" }, 404);
    if (order.status === "claimed" && order.claimed_workspace_id === workspaceId) {
      return json({ ok: true, duplicate: true, workspaceId, productKeys: productKeys(order.setup) });
    }
    if (order.status === "claimed") return json({ error: "ORDER_ALREADY_CLAIMED" }, 409);
    if (order.status !== "paid" || !order.stripe_session_id) return json({ error: "ORDER_NOT_PAID" }, 409);
    if (order.customer_email.toLowerCase() !== user.email.toLowerCase()) {
      return json({ error: "ORDER_EMAIL_MISMATCH" }, 403);
    }

    const keys = productKeys(order.setup);
    const known = await knownCatalogKeys(keys);
    const unknown = keys.filter(key => !known.has(key));
    if (unknown.length) return json({ error: "ORDER_CATALOG_MISMATCH", unknown }, 409);

    const entitlementRows = keys.map(product_key => ({
      workspace_id: workspaceId,
      product_key,
      status: "active",
      source: "stripe",
      source_ref: order.stripe_session_id,
      updated_at: new Date().toISOString(),
    }));
    const grant = await rest("lux_entitlements?on_conflict=workspace_id,product_key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(entitlementRows),
    });
    if (!grant.ok) throw new Error("ENTITLEMENT_GRANT_FAILED");
    const now = new Date().toISOString();
    const mark = await rest(`lux_agent_checkout_sessions?id=eq.${checkoutId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "claimed", claimed_workspace_id: workspaceId, claimed_at: now, updated_at: now }),
    });
    if (!mark.ok) throw new Error("ORDER_CLAIM_FAILED");

    return json({
      ok: true,
      checkoutId,
      workspaceId,
      productKeys: keys,
      setup: order.setup,
      setupHash: order.setup_hash,
      signingState: "pending-server-signature",
    });
  } catch (error) {
    console.error(error);
    return json({ error: "ORDER_CLAIM_UNAVAILABLE" }, 500);
  }
});
