import type { Metadata } from "next";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Partners — Lux Automaton",
  description: "Partner with Lux Automaton. Referral programs, reseller agreements, and agency partnerships for AI automation leaders.",
};

const PARTNER_TIERS = [
  {
    name: "Referral Partner",
    icon: "🤝",
    color: "var(--cyan)",
    commission: "20%",
    description: "Refer clients and earn a recurring commission on every subscription you bring in.",
    perks: [
      "20% recurring commission",
      "Unique referral tracking link",
      "Co-branded materials",
      "Partner dashboard access",
      "Monthly payout",
    ],
    cta: "Become a Referral Partner",
  },
  {
    name: "Agency Reseller",
    icon: "🏢",
    color: "var(--blue-bright)",
    commission: "35%",
    description: "Resell Lux Automaton products to your agency clients under your own brand.",
    perks: [
      "Up to 35% margin",
      "White-label options",
      "Priority client support",
      "Custom pricing authority",
      "Quarterly business reviews",
      "Co-sell opportunities",
    ],
    cta: "Apply as Reseller",
  },
  {
    name: "Tech Partner",
    icon: "🔗",
    color: "var(--green)",
    commission: "Custom",
    description: "Build integrations, plugins, or joint solutions with Lux Automaton's AI ecosystem.",
    perks: [
      "API early access",
      "Sandbox environment",
      "Joint go-to-market",
      "Co-marketing budget",
      "Listed in partner directory",
      "Engineering collaboration",
    ],
    cta: "Explore Tech Partnership",
  },
];

const PARTNER_LOGOS = [
  "Stripe", "Supabase", "Vercel", "OpenAI", "Zapier",
];

export default function PartnersPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      {/* ── HERO ── */}
      <section
        className="circuit-grid"
        style={{
          padding: "80px 24px 100px",
          backgroundImage: `linear-gradient(to right, rgba(3, 5, 18, 0.92) 0%, rgba(3, 5, 18, 0.82) 60%, rgba(3, 5, 18, 0.55) 100%), url(${prefixPath("/images/page-hero-cyber.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
            Partnership Program
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              maxWidth: "700px",
            }}
          >
            Grow With Us.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Together.
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginBottom: "40px",
            }}
          >
            Join the Lux Automaton partner network. Whether you&apos;re an agency, tech platform,
            or independent consultant — there&apos;s a program built for you.
          </p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem" }}>
            Apply Now →
          </Link>
        </div>
      </section>

      <div className="neon-line" />

      {/* ── PARTNER TIERS ── */}
      <section
        className="circuit-grid"
        style={{ padding: "100px 24px", background: "var(--bg-base)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>
              Partnership Tiers
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Find Your Fit
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "28px",
            }}
          >
            {PARTNER_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="glass-card"
                style={{ padding: "40px", position: "relative", overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: `radial-gradient(circle at top right, ${tier.color}18, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: `${tier.color}18`,
                    border: `1px solid ${tier.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    marginBottom: "20px",
                  }}
                >
                  {tier.icon}
                </div>

                {/* Commission badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "36px",
                    right: "36px",
                    background: `${tier.color}18`,
                    border: `1px solid ${tier.color}44`,
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: tier.color,
                    letterSpacing: "0.05em",
                  }}
                >
                  {tier.commission}
                </div>

                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  {tier.name}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {tier.description}
                </p>

                <div className="neon-line" style={{ marginBottom: "24px" }} />

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span style={{ color: tier.color, fontSize: "0.65rem" }}>◆</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: `${tier.color}18`,
                    color: tier.color,
                    border: `1px solid ${tier.color}44`,
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK BAR ── */}
      <section
        style={{
          padding: "64px 24px",
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "32px",
            }}
          >
            Built on trusted infrastructure
          </div>
          <div
            style={{
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo}
                className="partner-logo"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--bg-void)",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "16px" }}
          >
            Ready to Partner?
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "32px" }}>
            Fill out the contact form and select &quot;Partnership Inquiry&quot;. We respond within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary">
            Apply Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
