import Link from "next/link";

interface ProductPageCTAProps {
  headline: string;
  subheadline?: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
  accentColor: string;
  disclaimer?: string;
}

export default function ProductPageCTA({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  accentColor,
  disclaimer,
}: ProductPageCTAProps) {
  return (
    <section
      style={{
        background: "var(--bg-void)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Outer neon glow rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background: `radial-gradient(circle at center, color-mix(in srgb, ${accentColor} 10%, transparent) 0%, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Glassmorphic banner */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
            borderRadius: "24px",
            backdropFilter: "blur(16px)",
            padding: "72px 48px",
            textAlign: "center",
            boxShadow: `0 0 60px color-mix(in srgb, ${accentColor} 10%, transparent), 0 0 120px color-mix(in srgb, ${accentColor} 5%, transparent), inset 0 1px 0 rgba(255,255,255,0.06)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner circuit grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              borderRadius: "24px",
              pointerEvents: "none",
            }}
          />

          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${accentColor} 50%, transparent), transparent)`,
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: accentColor,
                background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
                borderRadius: "4px",
                padding: "5px 16px",
                marginBottom: "28px",
              }}
            >
              GET IN TOUCH
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                margin: "0 0 20px",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {headline}
            </h2>

            {subheadline && (
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  maxWidth: "560px",
                  margin: "0 auto 40px",
                  lineHeight: 1.7,
                }}
              >
                {subheadline}
              </p>
            )}

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: disclaimer ? "28px" : "0",
              }}
            >
              <Link
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor} 80%, black) 100%)`,
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  padding: "16px 36px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: `0 0 30px color-mix(in srgb, ${accentColor} 35%, transparent), 0 4px 20px rgba(0,0,0,0.3)`,
                  transition: "all 0.2s ease",
                }}
              >
                {primaryCta.label}
                {primaryCta.external && <span>↗</span>}
              </Link>

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: `1px solid color-mix(in srgb, ${accentColor} 35%, transparent)`,
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    padding: "15px 32px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {/* Disclaimer */}
            {disclaimer && (
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                {disclaimer}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
