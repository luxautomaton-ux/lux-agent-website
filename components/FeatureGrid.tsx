interface FeatureGridProps {
  features: string[];
  accentColor: string;
  title?: string;
}

export default function FeatureGrid({ features, accentColor, title = "Key Features" }: FeatureGridProps) {
  return (
    <section
      style={{
        background: "var(--bg-base)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle accent glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: `radial-gradient(ellipse at center, color-mix(in srgb, ${accentColor} 3%, transparent) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
              background: `color-mix(in srgb, ${accentColor} 5%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
              borderRadius: "4px",
              padding: "5px 16px",
              marginBottom: "20px",
            }}
          >
            CAPABILITIES
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Feature pills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {features.map((feature, i) => (
            <FeaturePill key={i} feature={feature} accentColor={accentColor} />
          ))}
        </div>
      </div>
      <style>{`
        .feature-pill {
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important;
        }
        .feature-pill:hover {
          border-color: var(--hover-border) !important;
          box-shadow: 0 0 20px var(--hover-glow) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </section>
  );
}

function FeaturePill({ feature, accentColor }: { feature: string; accentColor: string }) {
  return (
    <div
      className="feature-pill"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        padding: "20px 24px",
        "--hover-border": `color-mix(in srgb, ${accentColor} 33%, transparent)`,
        "--hover-glow": `color-mix(in srgb, ${accentColor} 10%, transparent)`,
      } as React.CSSProperties}
    >
      {/* Diamond bullet */}
      <span
        style={{
          color: accentColor,
          fontSize: "0.85rem",
          lineHeight: 1.6,
          flexShrink: 0,
          textShadow: `0 0 10px color-mix(in srgb, ${accentColor} 53%, transparent)`,
        }}
      >
        ◆
      </span>

      <span
        style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: 1.5,
        }}
      >
        {feature}
      </span>
    </div>
  );
}
