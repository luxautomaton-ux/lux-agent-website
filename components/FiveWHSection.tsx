import type { FiveWH } from "@/lib/products";

interface FiveWHSectionProps {
  fiveWH: FiveWH;
  accentColor: string;
}

const CARDS = [
  { key: "who" as const, letter: "W", label: "WHO" },
  { key: "what" as const, letter: "W", label: "WHAT" },
  { key: "when" as const, letter: "W", label: "WHEN" },
  { key: "where" as const, letter: "W", label: "WHERE" },
  { key: "why" as const, letter: "W", label: "WHY" },
  { key: "how" as const, letter: "H", label: "HOW" },
];

export default function FiveWHSection({ fiveWH, accentColor }: FiveWHSectionProps) {
  return (
    <section
      style={{
        background: "var(--bg-void)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circuit grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
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
        {/* Section label */}
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
            5W+H FRAMEWORK
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              margin: "0",
              letterSpacing: "-0.02em",
            }}
          >
            Everything You Need to Know
          </h2>
        </div>

        {/* 6-card grid */}
        <div
          className="fivewh-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {CARDS.map(({ key, letter, label }) => {
            const card = fiveWH[key];
            return (
              <FiveWHCard
                key={key}
                letter={letter}
                label={label}
                headline={card.headline}
                body={card.body}
                accentColor={accentColor}
              />
            );
          })}
        </div>
      </div>

      {/* Responsive and hover styles via style tag */}
      <style>{`
        .fivewh-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
        }
        .fivewh-card:hover {
          border-color: var(--hover-border) !important;
          box-shadow: 0 0 30px var(--hover-glow), 0 8px 40px rgba(0,0,0,0.4) !important;
          transform: translateY(-3px) !important;
        }
        @media (max-width: 1024px) {
          .fivewh-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .fivewh-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

interface FiveWHCardProps {
  letter: string;
  label: string;
  headline: string;
  body: string;
  accentColor: string;
}

function FiveWHCard({ letter, label, headline, body, accentColor }: FiveWHCardProps) {
  return (
    <div
      className="fivewh-card"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        "--hover-border": `color-mix(in srgb, ${accentColor} 33%, transparent)`,
        "--hover-glow": `color-mix(in srgb, ${accentColor} 13%, transparent)`,
      } as React.CSSProperties}
    >


      {/* Label pill */}
      <div
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: accentColor,
          background: `color-mix(in srgb, ${accentColor} 7%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
          borderRadius: "4px",
          padding: "3px 10px",
          display: "inline-block",
          marginBottom: "16px",
        }}
      >
        {label}
      </div>

      {/* Big letter */}
      <div
        style={{
          fontSize: "4rem",
          fontWeight: 900,
          color: accentColor,
          lineHeight: 0.85,
          marginBottom: "16px",
          textShadow: `0 0 20px color-mix(in srgb, ${accentColor} 33%, transparent)`,
        }}
      >
        {letter}
      </div>

      {/* Headline */}
      <h3
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          margin: "0 0 12px",
          lineHeight: 1.3,
        }}
      >
        {headline}
      </h3>

      {/* Body */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}
