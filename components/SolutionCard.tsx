"use client";

import Link from "next/link";
import type { Solution } from "@/lib/solutions";
import { prefixPath } from "@/lib/prefix";

interface SolutionCardProps {
  solution: Solution;
  layout?: "grid" | "full"; // grid = compact card, full = expanded page section
}

const POWERED_BY_MAP: Record<string, string[]> = {
  "lux-care-os": ["Lux Agent", "Lux Coder", "Success Packs"],
  "epic-electric": ["Lux Agent USB", "Lux Agent", "Success Packs", "Lux Coder"],
  "inland-circle-program-o": ["Lux Agent", "Lux Coder", "Lux Agent USB", "Success Packs"],
};

export default function SolutionCard({ solution, layout = "grid" }: SolutionCardProps) {
  const ctaHref = solution.externalUrl || solution.primaryCta.href;
  const isExternal = !!solution.externalUrl;
  const ctaLabel = solution.externalUrl ? "Visit Live Site" : solution.primaryCta.label;
  const bullets = layout === "full" ? solution.useCases : solution.useCases.slice(0, 4);
  const poweredBy = POWERED_BY_MAP[solution.slug] || ["Lux Agent", "Lux Coder"];

  if (layout === "grid") {
    return (
      <div
        className="glass-card solution-card"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: `1px solid color-mix(in srgb, ${solution.accentColor} 20%, transparent)`,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          padding: 0,
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${solution.accentColor}, transparent)`,
            opacity: 0.6,
            zIndex: 2,
          }}
        />

        {/* Rectangle Hero Style Banner */}
        {solution.bgImage && (
          <div
            style={{
              height: "200px",
              position: "relative",
              backgroundImage: `linear-gradient(to bottom, rgba(3, 5, 18, 0.4) 0%, rgba(3, 5, 18, 0.95) 100%), url(${prefixPath(solution.bgImage)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "24px 24px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Header row: icon + category */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", zIndex: 1 }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `color-mix(in srgb, ${solution.accentColor} 18%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${solution.accentColor} 44%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                  backdropFilter: "blur(8px)",
                }}
              >
                {solution.icon}
              </div>

              {/* Category badge */}
              <div
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: solution.accentColor,
                  background: `color-mix(in srgb, ${solution.accentColor} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${solution.accentColor} 33%, transparent)`,
                  borderRadius: "4px",
                  padding: "5px 10px",
                  lineHeight: 1.4,
                  textAlign: "right",
                  maxWidth: "160px",
                  backdropFilter: "blur(8px)",
                }}
              >
                {solution.category}
              </div>
            </div>

            {/* Title & Tagline at the bottom of the banner */}
            <div style={{ zIndex: 1 }}>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                  lineHeight: 1.1,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                {solution.name}
              </h3>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: solution.accentColor,
                  margin: 0,
                  textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                }}
              >
                {solution.tagline}
              </p>
            </div>
          </div>
        )}

        {/* Card Content Area */}
        <div
          style={{
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          {/* Description */}
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
            {solution.description}
          </p>

          {/* Bullets (Use Cases) */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {bullets.map((bullet) => (
              <li
                key={bullet}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: solution.accentColor, fontSize: "0.6rem", flexShrink: 0, marginTop: "4px" }}>◆</span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Powered by row */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
            {poweredBy.map((product) => (
              <span
                key={product}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "4px",
                  padding: "3px 8px",
                }}
              >
                {product}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ paddingTop: "8px" }}>
            <Link
              href={ctaHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--bg-void)",
                background: solution.accentColor,
                transition: "opacity 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px color-mix(in srgb, ${solution.accentColor} 40%, transparent)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {ctaLabel} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Expanded layout="full" page detail view
  return (
    <div
      className="glass-card solution-card"
      style={{
        padding: "48px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        border: `1px solid color-mix(in srgb, ${solution.accentColor} 20%, transparent)`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        backgroundImage: solution.bgImage 
          ? `linear-gradient(to right, rgba(3, 5, 18, 0.96) 0%, rgba(3, 5, 18, 0.88) 45%, rgba(3, 5, 18, 0.25) 85%, rgba(3, 5, 18, 0.1) 100%), url(${prefixPath(solution.bgImage)})` 
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${solution.accentColor}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle at top right, color-mix(in srgb, ${solution.accentColor} 8%, transparent), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header row — icon + category */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `color-mix(in srgb, ${solution.accentColor} 9%, transparent)`,
            border: `1px solid color-mix(in srgb, ${solution.accentColor} 27%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            flexShrink: 0,
          }}
        >
          {solution.icon}
        </div>

        {/* Category badge */}
        <div
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: solution.accentColor,
            background: `color-mix(in srgb, ${solution.accentColor} 8%, transparent)`,
            border: `1px solid color-mix(in srgb, ${solution.accentColor} 20%, transparent)`,
            borderRadius: "4px",
            padding: "5px 10px",
            lineHeight: 1.4,
            textAlign: "right",
            maxWidth: "160px",
          }}
        >
          {solution.category}
        </div>
      </div>

      {/* Title & tagline */}
      <div>
        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            marginBottom: "6px",
            lineHeight: 1.1,
          }}
        >
          {solution.name}
        </h3>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: solution.accentColor,
          }}
        >
          {solution.tagline}
        </p>
      </div>

      {/* Description */}
      <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.75 }}>
        {solution.description}
      </p>

      {/* Problem it solves */}
      <div
        style={{
          background: `color-mix(in srgb, ${solution.accentColor} 4%, transparent)`,
          border: `1px solid color-mix(in srgb, ${solution.accentColor} 13%, transparent)`,
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: solution.accentColor,
            marginBottom: "10px",
          }}
        >
          The Problem It Solves
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7 }}>
          {solution.problem}
        </p>
      </div>

      {/* Bullets (Use Cases) */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
        {bullets.map((bullet) => (
          <li
            key={bullet}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: solution.accentColor, fontSize: "0.6rem", flexShrink: 0, marginTop: "4px" }}>◆</span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Powered by row */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {poweredBy.map((product) => (
          <span
            key={product}
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px",
              padding: "3px 8px",
            }}
          >
            {product}
          </span>
        ))}
      </div>

      {/* Disclaimer */}
      {solution.disclaimer && (
        <p
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "16px",
            fontStyle: "italic",
          }}
        >
          ⚠ {solution.disclaimer}
        </p>
      )}

      {/* CTA */}
      <div style={{ marginTop: "auto", paddingTop: "8px" }}>
        <Link
          href={ctaHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--bg-void)",
            background: solution.accentColor,
            transition: "opacity 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.85";
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px color-mix(in srgb, ${solution.accentColor} 40%, transparent)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {ctaLabel} →
        </Link>
      </div>

      <style>{`
        .solution-card:hover {
          border-color: rgba(from ${solution.accentColor} r g b / 0.35) !important;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
