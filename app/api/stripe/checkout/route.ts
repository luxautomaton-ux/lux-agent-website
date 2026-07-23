import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout session and returns the redirect URL.
 *
 * Body: { priceId: string; planName?: string }
 *
 * This route proxies to the Supabase Edge Function (create-checkout)
 * or can be extended to call Stripe directly from the Next.js layer.
 */
export async function POST(req: NextRequest) {
  try {
    const { priceId, planName } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "priceId is required" }, { status: 400 });
    }

    // ── Option A: Proxy to Supabase Edge Function ──
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const res = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          priceId,
          planName,
          successUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/products`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("[stripe/checkout] Supabase Edge error:", data);
        return NextResponse.json({ error: data.error ?? "Checkout failed" }, { status: 500 });
      }
      return NextResponse.json(data);
    }

    // ── Option B: Direct Stripe (fallback) ──
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe not configured. Set STRIPE_SECRET_KEY or Supabase env vars." },
        { status: 500 }
      );
    }

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "subscription",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/products`,
      }),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error("[stripe/checkout] Stripe error:", session);
      return NextResponse.json({ error: session?.error?.message ?? "Checkout failed" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
