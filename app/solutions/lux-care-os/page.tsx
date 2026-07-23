import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/solutions";
import { prefixPath } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Lux Care OS — AI-Powered Care Operations | Lux Automaton",
  description:
    "Lux Care OS is a private AI-powered care operations system for clinics, caregivers, and support teams. Organize workflows, documentation, staff tasks, and daily execution.",
};

const solution = SOLUTIONS.find((s) => s.slug === "lux-care-os")!;

const ACCENT = "#00ff88";
const ACCENT_DIM = "rgba(0, 255, 136, 0.12)";
const ACCENT_BORDER = "rgba(0, 255, 136, 0.22)";
const ACCENT_GLOW = "rgba(0, 255, 136, 0.08)";

const fiveWHItems = [
  { key: "who", label: "WHO", emoji: "👥", ...solution.fiveWH.who },
  { key: "what", label: "WHAT", emoji: "🧠", ...solution.fiveWH.what },
  { key: "when", label: "WHEN", emoji: "⏰", ...solution.fiveWH.when },
  { key: "where", label: "WHERE", emoji: "📍", ...solution.fiveWH.where },
  { key: "why", label: "WHY", emoji: "💡", ...solution.fiveWH.why },
  { key: "how", label: "HOW", emoji: "⚙️", ...solution.fiveWH.how },
];

const ecosystemChips = [
  { label: "Lux Agent", href: "/products/lux-agent" },
  { label: "Lux Coder", href: "/products/lux-coder" },
  { label: "Success Packs", href: "/products/success-packs" },
];

export default function LuxCareOSPage() {
  return (
    <div style={{ paddingTop: "72px", background: "var(--bg-void)" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "560px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `linear-gradient(to bottom, rgba(3, 5, 18, 0.78) 0%, rgba(3, 5, 18, 0.93) 100%), url(${prefixPath("/images/lux-care-os-hero.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 24px 80px",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(0,255,136,0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom border glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Back link */}
          <Link
            href="/solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "32px",
              transition: "color 0.2s",
            }}
          >
            ← Back to Solutions
          </Link>

          {/* Category badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: ACCENT_DIM,
              border: `1px solid ${ACCENT_BORDER}`,
              borderRadius: "4px",
              padding: "5px 14px",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "28px",
            }}
          >
            🏥 {solution.category}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center" }} className="hero-grid">
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  marginBottom: "20px",
                }}
              >
                Lux{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, #00c97a)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Care OS
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  maxWidth: "620px",
                  marginBottom: "40px",
                }}
              >
                {solution.description}
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a
                  href={solution.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: ACCENT,
                    color: "#020408",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "opacity 0.2s, box-shadow 0.2s",
                    boxShadow: `0 0 24px rgba(0,255,136,0.35)`,
                  }}
                >
                  {solution.primaryCta.label} →
                </a>
                <Link
                  href={solution.secondaryCta.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    color: ACCENT,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "13px 28px",
                    borderRadius: "8px",
                    border: `1px solid ${ACCENT_BORDER}`,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {solution.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* Status card */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${ACCENT_BORDER}`,
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                padding: "32px",
                minWidth: "220px",
                textAlign: "center",
              }}
              className="hero-status-card"
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "12px" }}>{solution.icon}</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT, fontWeight: 700, marginBottom: "8px" }}>
                System Status
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: ACCENT,
                    boxShadow: `0 0 8px ${ACCENT}`,
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.8rem", color: ACCENT, fontWeight: 600 }}>LIVE</span>
              </div>
              <div style={{ marginTop: "20px", fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Private deployment<br />Secure infrastructure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ───────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "64px", alignItems: "start" }} className="what-grid">
            {/* Giant letter */}
            <div
              style={{
                fontSize: "clamp(8rem, 18vw, 14rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                color: ACCENT,
                opacity: 0.12,
                letterSpacing: "-0.06em",
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              W
            </div>
            <div style={{ paddingTop: "12px" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: "16px",
                }}
              >
                What It Is
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                }}
              >
                {solution.fiveWH.what.headline}
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  marginBottom: "24px",
                  maxWidth: "700px",
                }}
              >
                {solution.description}
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "680px" }}>
                {solution.fiveWH.what.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ──────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--bg-void)",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px",
            height: "300px",
            background: `radial-gradient(ellipse, rgba(0,255,136,0.05) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "24px",
            }}
          >
            The Problem
          </div>
          <blockquote
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              fontStyle: "normal",
              marginBottom: "40px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "4rem",
                color: ACCENT,
                opacity: 0.15,
                lineHeight: 1,
              }}
            >
              &quot;
            </span>
            {solution.problem}
          </blockquote>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto" }}>
            {solution.fiveWH.why.body}
          </p>
        </div>
      </section>

      {/* ── 5W+H GRID ────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "16px",
              }}
            >
              The Full Picture
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Who, What, When, Where, Why & How
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="fivewh-grid"
          >
            {fiveWHItems.map((item) => (
              <div
                key={item.key}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  backdropFilter: "blur(12px)",
                  padding: "32px",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                className="fivewh-card"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: ACCENT,
                      background: ACCENT_DIM,
                      border: `1px solid ${ACCENT_BORDER}`,
                      borderRadius: "3px",
                      padding: "3px 8px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    marginBottom: "12px",
                  }}
                >
                  {item.headline}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--bg-void)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "16px",
              }}
            >
              Built For
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              {solution.fiveWH.who.headline}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
              {solution.fiveWH.who.body}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {solution.audience.map((a) => (
              <div
                key={a}
                style={{
                  background: ACCENT_GLOW,
                  border: `1px solid ${ACCENT_BORDER}`,
                  borderRadius: "100px",
                  padding: "10px 22px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: ACCENT,
                  letterSpacing: "0.02em",
                }}
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "16px",
              }}
            >
              Use Cases
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              What It Helps Your Team With
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
            }}
            className="usecases-grid"
          >
            {solution.useCases.map((uc) => (
              <div
                key={uc}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "18px 22px",
                }}
              >
                <span style={{ color: ACCENT, fontSize: "1.1rem", flexShrink: 0, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--bg-void)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: "16px",
              }}
            >
              System Features
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              What&apos;s Inside Lux Care OS
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="features-grid"
          >
            {solution.features.map((f, i) => (
              <div
                key={f}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  backdropFilter: "blur(12px)",
                  padding: "28px 24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                className="feature-card"
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: ACCENT_DIM,
                    border: `1px solid ${ACCENT_BORDER}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{f}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM CONNECTION ─────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(6,11,20,1) 60%)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
            className="eco-grid"
          >
            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: "16px",
                }}
              >
                Ecosystem
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                  lineHeight: 1.2,
                }}
              >
                Part of the Lux Automaton Stack
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                {solution.ecosystemConnection}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {ecosystemChips.map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${ACCENT_BORDER}`,
                    borderRadius: "8px",
                    padding: "12px 20px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: ACCENT,
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "all 0.2s",
                  }}
                >
                  {chip.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────── */}
      {solution.disclaimer && (
        <section style={{ padding: "48px 24px", background: "var(--bg-base)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              style={{
                background: "rgba(0,255,136,0.04)",
                border: "1px solid rgba(0,255,136,0.15)",
                borderRadius: "12px",
                padding: "28px 32px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "2px" }}>⚠️</span>
              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    marginBottom: "10px",
                  }}
                >
                  Important Compliance Note
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
                  {solution.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* ── VIDEO WALKTHROUGH ──────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-base)",
          padding: "100px 24px",
          textAlign: "center",
          position: "relative",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: ACCENT_DIM,
              border: `1px solid ${ACCENT_BORDER}`,
              borderRadius: "4px",
              padding: "5px 14px",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: "20px",
            }}
          >
            DEMO
          </div>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "var(--text-primary)",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            See Lux Care OS in Action
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.6,
              maxWidth: "540px",
              margin: "0 auto 48px",
            }}
          >
            Watch a live walkthrough showing how Lux Care OS organizes workflows, coordinates staff, and streamlines daily operations.
          </p>

          {/* Video container with green glow */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${ACCENT_BORDER}`,
              boxShadow: `0 0 40px ${ACCENT_GLOW}`,
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/GaYTegSo2pY"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--bg-void)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${ACCENT_BORDER}`,
              borderRadius: "24px",
              backdropFilter: "blur(12px)",
              padding: "72px 48px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "400px",
                height: "200px",
                background: `radial-gradient(ellipse, rgba(0,255,136,0.1) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>{solution.icon}</div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  lineHeight: 1.15,
                }}
              >
                Ready to Organize Your<br />Care Operations?
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 40px" }}>
                Work with Lux Automaton to deploy a custom Care OS for your team. Your workflows, your staff, your way.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={solution.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: ACCENT,
                    color: "#020408",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "16px 32px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: `0 0 28px rgba(0,255,136,0.4)`,
                  }}
                >
                  Explore Lux Care OS →
                </a>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    color: ACCENT,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "15px 32px",
                    borderRadius: "8px",
                    border: `1px solid ${ACCENT_BORDER}`,
                    textDecoration: "none",
                  }}
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-status-card { display: none !important; }
          .what-grid { grid-template-columns: 1fr !important; }
          .what-grid > div:first-child { display: none !important; }
          .fivewh-grid { grid-template-columns: 1fr 1fr !important; }
          .eco-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .fivewh-grid { grid-template-columns: 1fr !important; }
          .usecases-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
        .fivewh-card:hover {
          border-color: rgba(0,255,136,0.3) !important;
          transform: translateY(-3px);
        }
        .feature-card:hover {
          border-color: rgba(0,255,136,0.25) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
