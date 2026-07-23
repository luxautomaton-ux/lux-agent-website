import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import SolutionCard from "@/components/SolutionCard";

// ─────────────────────────────────────────────
// FeaturedSystems — homepage section
// Sits between the ProductsPreview and Ecosystem sections
// ─────────────────────────────────────────────

export default function FeaturedSystems() {
  return (
    <section
      style={{
        padding: "120px 24px",
        background: "var(--bg-void)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--blue-bright), var(--cyan), transparent)",
          opacity: 0.25,
        }}
      />

      {/* Background circuit grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(26, 109, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 109, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: "72px", maxWidth: "680px" }}>
          <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>
            Featured Systems
          </div>

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
            Featured Systems{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built with Lux Automaton
            </span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Real-world AI operating systems powered by Lux Agent, Lux Coder, Success Packs,
            and the Lux Automaton workflow stack.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="solutions-grid"
        >
          {SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} layout="grid" />
          ))}
        </div>

        {/* Bottom row — ecosystem connection copy + CTA */}
        <div
          style={{
            marginTop: "72px",
            padding: "40px 48px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "center",
          }}
          className="solutions-footer-row"
        >
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--cyan)",
                marginBottom: "12px",
              }}
            >
              Connected to Solve Problems
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "640px" }}>
              Lux Automaton products work together:{" "}
              <strong style={{ color: "var(--text-primary)" }}>Lux Coder</strong> builds the software.{" "}
              <strong style={{ color: "var(--text-primary)" }}>Lux Agent</strong> guides execution.{" "}
              <strong style={{ color: "var(--text-primary)" }}>Lux Agent USB</strong> makes it portable.{" "}
              <strong style={{ color: "var(--text-primary)" }}>Success Packs</strong> install the operating recipe.
              Featured systems like Lux Care OS, Epic Electric, and Inland Circle Program OS show how the ecosystem
              becomes real solutions for real organizations.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
            <Link href="/solutions" className="btn-primary" style={{ whiteSpace: "nowrap", textAlign: "center" }}>
              View All Solutions →
            </Link>
            <Link href="/contact" className="btn-outline" style={{ whiteSpace: "nowrap", textAlign: "center", fontSize: "0.8rem" }}>
              Book a Demo
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .solutions-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 680px) {
          .solutions-grid { grid-template-columns: 1fr !important; }
          .solutions-footer-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
