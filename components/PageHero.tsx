import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

export interface PageHeroProps {
  eyebrow: string;
  headline: string;
  subheadline: string;
  accentColor: string;
  bgImage?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
  status?: "live" | "beta" | "coming-soon";
  icon?: string;
}

const STATUS_CONFIG = {
  live: { label: "LIVE", bg: "rgba(0,255,136,0.12)", color: "var(--green)", dot: "var(--green)" },
  beta: { label: "BETA", bg: "rgba(0,229,255,0.12)", color: "var(--cyan)", dot: "var(--cyan)" },
  "coming-soon": { label: "COMING SOON", bg: "rgba(255,107,0,0.12)", color: "var(--orange)", dot: "var(--orange)" },
};

export default function PageHero({
  eyebrow,
  headline,
  subheadline,
  accentColor,
  bgImage,
  primaryCta,
  secondaryCta,
  status,
  icon,
}: PageHeroProps) {
  const statusConfig = status ? STATUS_CONFIG[status] : null;

  return (
    <section className="hero-container" style={{ "--hero-accent": accentColor } as React.CSSProperties}>
      {/* Background image */}
      {bgImage && (
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: `url(${prefixPath(bgImage)})`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        className="hero-overlay"
        style={{
          background: bgImage
            ? "linear-gradient(to right, rgba(3,5,18,0.92) 0%, rgba(3,5,18,0.78) 60%, rgba(3,5,18,0.55) 100%)"
            : `linear-gradient(135deg, rgba(3,5,18,1) 0%, rgba(6,11,20,0.95) 100%)`,
        }}
      />

      {/* Circuit grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Accent radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle at center, ${accentColor}18 0%, transparent 65%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle at center, ${accentColor}0d 0%, transparent 70%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="hero-content-wrapper">
        <div className="hero-text-block">
          {/* Status badge */}
          {statusConfig && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.dot}55`,
                borderRadius: "4px",
                padding: "5px 14px",
                backdropFilter: "blur(10px)",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: statusConfig.dot,
                  boxShadow: `0 0 8px ${statusConfig.dot}`,
                }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: statusConfig.color,
                  textTransform: "uppercase",
                }}
              >
                {statusConfig.label}
              </span>
            </div>
          )}

          {/* Eyebrow */}
          <div
            className="hero-eyebrow"
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: accentColor,
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {icon && <span style={{ fontSize: "1.2rem" }}>{icon}</span>}
            {eyebrow}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.08,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "620px",
              margin: "0 0 40px",
            }}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }} className="hero-ctas">
            <Link
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              className="hero-btn-primary"
            >
              {primaryCta.label}
              {primaryCta.external && <span style={{ fontSize: "0.9em" }}>↗</span>}
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="hero-btn-secondary"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom edge neon line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`,
          zIndex: 3,
        }}
      />
      <style>{`
        .hero-container {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-void);
        }
        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-content-wrapper {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 24px 80px;
        }
        .hero-text-block {
          max-width: 760px;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--hero-accent);
          color: var(--bg-void) !important;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 0 24px var(--hero-accent), 0 4px 20px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        .hero-btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--hero-accent);
          color: var(--text-primary) !important;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .hero-container {
            min-height: 480px;
          }
          .hero-content-wrapper {
            padding: 80px 20px 60px;
            text-align: center;
          }
          .hero-text-block {
            margin: 0 auto;
          }
          .hero-text-block p {
            margin: 0 auto 30px !important;
          }
          .hero-eyebrow {
            justify-content: center !important;
          }
          .hero-ctas {
            justify-content: center !important;
          }
          .hero-overlay {
            background: linear-gradient(180deg, rgba(3,5,18,0.85) 0%, rgba(3,5,18,0.95) 100%) !important;
          }
        }
      `}</style>
    </section>
  );
}
