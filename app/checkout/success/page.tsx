import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome to Lux Automaton — Checkout Complete",
  description: "Your subscription is active. Access your Lux Automaton dashboard.",
};

export default function CheckoutSuccessPage() {
  return (
    <div
      className="circuit-grid"
      style={{
        paddingTop: "72px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, var(--bg-void) 0%, var(--bg-base) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          margin: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "64px 48px",
            textAlign: "center",
            border: "1px solid rgba(0, 255, 136, 0.25)",
            boxShadow: "0 0 60px rgba(0, 255, 136, 0.06)",
          }}
        >
          {/* Animated checkmark */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0, 255, 136, 0.1)",
              border: "2px solid rgba(0, 255, 136, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              margin: "0 auto 32px",
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.2)",
            }}
          >
            ✓
          </div>

          <div
            className="section-label"
            style={{ marginBottom: "20px", display: "inline-flex" }}
          >
            Subscription Active
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "var(--text-primary)",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            You&apos;re In.
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              fontSize: "1rem",
              marginBottom: "40px",
            }}
          >
            Your Lux Automaton subscription is now active.
            Check your email for login details and next steps.
          </p>

          <div className="neon-line" style={{ marginBottom: "32px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/" className="btn-primary" style={{ justifyContent: "center" }}>
              Back to Home
            </Link>
            <Link href="/products" className="btn-outline" style={{ justifyContent: "center" }}>
              Explore All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
