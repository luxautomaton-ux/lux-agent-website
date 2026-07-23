import Link from "next/link";

interface EcosystemBannerProps {
  connectionText: string;
  accentColor: string;
  products: Array<{ name: string; icon: string; href: string }>;
}

export default function EcosystemBanner({ connectionText, accentColor, products }: EcosystemBannerProps) {
  return (
    <section
      style={{
        background: "var(--bg-base)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
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

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "300px",
          background: `radial-gradient(ellipse at center, color-mix(in srgb, ${accentColor} 5%, transparent) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
            background: `color-mix(in srgb, ${accentColor} 5%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
            borderRadius: "4px",
            padding: "5px 16px",
            marginBottom: "24px",
          }}
        >
          THE LUX ECOSYSTEM
        </div>

        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          Part of a Unified Ecosystem
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: "640px",
            margin: "0 auto 56px",
            lineHeight: 1.7,
          }}
        >
          {connectionText}
        </p>

        {/* Product chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <ProductChip key={product.href} product={product} accentColor={accentColor} />
          ))}
        </div>
      </div>
      <style>{`
        .product-chip {
          transition: all 0.25s ease !important;
        }
        .product-chip:hover {
          border-color: var(--hover-border) !important;
          background: var(--hover-bg) !important;
          box-shadow: 0 0 20px var(--hover-glow) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </section>
  );
}

function ProductChip({
  product,
  accentColor,
}: {
  product: { name: string; icon: string; href: string };
  accentColor: string;
}) {
  const isExternal = product.href.startsWith("http");
  return (
    <Link
      href={product.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="product-chip"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "50px",
        padding: "12px 22px",
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        color: "var(--text-primary)",
        "--hover-border": `color-mix(in srgb, ${accentColor} 33%, transparent)`,
        "--hover-bg": `color-mix(in srgb, ${accentColor} 5%, transparent)`,
        "--hover-glow": `color-mix(in srgb, ${accentColor} 10%, transparent)`,
      } as React.CSSProperties}
    >
      <span style={{ fontSize: "1.1rem" }}>{product.icon}</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{product.name}</span>
      {isExternal && (
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>↗</span>
      )}
    </Link>
  );
}
