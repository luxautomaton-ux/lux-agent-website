import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import SolutionCard from "@/components/SolutionCard";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Solutions — Lux Automaton",
  description:
    "Real-world AI operating systems built on the Lux Automaton stack. Lux Care OS, Epic Electric, Inland Circle Program OS, and custom AI systems for any business vertical.",
};

// ─────────────────────────────────────────────
// SOLUTIONS PAGE
// ─────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <div style={{ paddingTop: "72px" }}>
      <SolutionsHero />
      <SolutionsGrid />
      <EcosystemConnectionSection />
      <CustomSystemsSection />
      <SolutionsCTA />
    </div>
  );
}

// ─── HERO ────────────────────────────────────
function SolutionsHero() {
  return (
    <section
      style={{
        padding: "100px 24px 80px",
        backgroundImage: `linear-gradient(to right, rgba(3, 5, 18, 0.92) 0%, rgba(3, 5, 18, 0.82) 60%, rgba(3, 5, 18, 0.55) 100%), url(${prefixPath("/images/page-hero-waves.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(26, 109, 255, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
          Solutions
        </div>

        <h1
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "28px",
          }}
        >
          AI Systems That{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--electric), var(--cyan), var(--blue-bright))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Solve Real Problems
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            maxWidth: "680px",
            margin: "0 auto 48px",
          }}
        >
          Lux Automaton is not just a collection of apps. It is a connected ecosystem for building custom AI
          operating systems around real work — clinics, contractors, community programs, creators, agencies,
          and small businesses.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-primary">
            Book a Demo →
          </Link>
          <Link href="/products" className="btn-outline">
            View Products
          </Link>
          <Link href="/partners" className="btn-outline">
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS GRID ──────────────────────────
function SolutionsGrid() {
  return (
    <section
      style={{ padding: "100px 24px", background: "var(--bg-base)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            Featured Systems Built with Lux Automaton
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Real-world AI operating systems, built for real work.
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Powered by Lux Agent, Lux Coder, Success Packs, and the full Lux Automaton workflow stack.
          </p>
        </div>

        <div
          className="solutions-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} layout="full" />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .solutions-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 680px) {
          .solutions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── ECOSYSTEM CONNECTION ─────────────────────
function EcosystemConnectionSection() {
  const connections = [
    { product: "Lux Coder", role: "Builds the software, dashboards, and tools." },
    { product: "Lux Agent", role: "Guides the user and helps execute tasks daily." },
    { product: "Lux Agent USB", role: "Makes the system portable and local-first." },
    { product: "Success Packs", role: "Installs the business operating recipe." },
    { product: "Lux WriteOff", role: "Organizes deductions and expense workflows." },
    { product: "Lux Budgeter", role: "Supports budgeting and cash flow visibility." },
  ];

  return (
    <section
      className="circuit-grid"
      style={{
        padding: "100px 24px",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            Product Ecosystem Connection
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Lux Automaton Products{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Together
            </span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
            Custom systems like Lux Care OS, Epic Electric, and Inland Circle Program OS show how the ecosystem
            can be applied to real-world operations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {connections.map((item) => (
            <div
              key={item.product}
              className="glass-card"
              style={{ padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 8px var(--cyan)",
                  flexShrink: 0,
                  marginTop: "6px",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {item.product}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CUSTOM SYSTEMS ───────────────────────────
function CustomSystemsSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <div
          className="glass-card neon-border-anim"
          style={{ padding: "60px 56px" }}
        >
          <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
            Custom AI Systems
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              lineHeight: 1.15,
            }}
          >
            Need a System Built Around{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--electric), var(--cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Business?
            </span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            Lux Automaton can help design a custom AI operating system for your business, program, clinic,
            agency, creative company, or local service operation. We combine Lux Agent, Lux Coder, Lux Agent USB,
            Success Packs, CRM workflows, and automation tools into one connected system.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              Book a Custom Setup →
            </Link>
            <Link href="/partners" className="btn-outline" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────
function SolutionsCTA() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg-void)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(0, 229, 255, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          Your Business Does Not Need Another App.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--electric), var(--cyan), var(--blue-bright))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            It Needs a System.
          </span>
        </h2>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            lineHeight: 1.8,
            maxWidth: "540px",
            margin: "0 auto 48px",
          }}
        >
          Lux Automaton builds connected AI systems that help people organize work, automate follow-up,
          create deliverables, manage money, and scale operations with more confidence.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-primary" style={{ fontSize: "0.95rem", padding: "15px 36px" }}>
            Book a Demo →
          </Link>
          <Link href="/products" className="btn-outline" style={{ fontSize: "0.95rem", padding: "15px 36px" }}>
            Explore the Ecosystem
          </Link>
          <Link href="/partners" className="btn-outline" style={{ fontSize: "0.95rem", padding: "15px 36px" }}>
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}
