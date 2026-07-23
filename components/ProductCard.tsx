"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { prefixPath } from "@/lib/prefix";


interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const monthlyPrice = product.prices.find((p) => p.interval === "month");

  return (
    <>
      <Link
        href={product.pageHref}
        style={{ display: "block", textDecoration: "none", width: "100%" }}
      >
        <div
          className="product-photo-card"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            width: "100%",
            border: featured
              ? `1px solid color-mix(in srgb, ${product.accentColor} 53%, transparent)`
              : `1px solid color-mix(in srgb, ${product.accentColor} 27%, transparent)`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6)`,
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* ── Background photo ── */}
          {product.bgImage ? (
            <div
              className="product-card-photo"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${prefixPath(product.bgImage)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.5s ease",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, #060916 0%, color-mix(in srgb, ${product.accentColor} 13%, transparent) 100%)`,
              }}
            />
          )}

          {/* ── Gradient overlay: dark vignette left+bottom ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(3,5,18,0.92) 0%, rgba(3,5,18,0.55) 55%, rgba(3,5,18,0.15) 100%), " +
                "linear-gradient(to top, rgba(3,5,18,0.95) 0%, transparent 50%)",
            }}
          />

          {/* ── Accent top-right glow ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "140px",
              height: "140px",
              background: `radial-gradient(circle at top right, color-mix(in srgb, ${product.accentColor} 16%, transparent), transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* ── Status badge — top left ── */}
          <div style={{ position: "absolute", top: "14px", left: "16px", zIndex: 2 }}>
            <StatusBadge status={product.status} />
          </div>

          {/* ── Icon — top right ── */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "14px",
              zIndex: 2,
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: `linear-gradient(135deg, color-mix(in srgb, ${product.accentColor} 20%, transparent), color-mix(in srgb, ${product.accentColor} 7%, transparent))`,
              border: `1px solid color-mix(in srgb, ${product.accentColor} 27%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.icon}
          </div>

          {/* ── Bottom-left content ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "18px 18px 16px",
              zIndex: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              {/* Tagline */}
              <div
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: product.accentColor,
                  marginBottom: "4px",
                }}
              >
                {product.tagline}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                {product.name}
              </h3>

              {/* Price */}
              <div style={{ fontSize: "0.78rem", fontWeight: 700 }}>
                {monthlyPrice ? (
                  <span style={{ color: "#ffffff" }}>
                    {formatPrice(monthlyPrice.amount)}
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>/mo</span>
                  </span>
                ) : (
                  <span style={{ color: product.accentColor, fontSize: "0.68rem" }}>
                    {product.status === "coming-soon" ? "Coming Soon" : "Live Now"}
                  </span>
                )}
              </div>
            </div>

            {/* CTA button */}
            <div
              style={{
                flexShrink: 0,
                background: `linear-gradient(135deg, ${product.accentColor}, color-mix(in srgb, ${product.accentColor} 73%, transparent))`,
                color: "#000",
                padding: "8px 14px",
                borderRadius: "7px",
                fontSize: "0.62rem",
                fontWeight: 800,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                boxShadow: `0 4px 16px color-mix(in srgb, ${product.accentColor} 27%, transparent)`,
              }}
            >
              {product.ctaLabel}
            </div>
          </div>
        </div>
      </Link>
      <style>{`
        .product-photo-card {
          aspect-ratio: 16 / 6;
        }
        @media (max-width: 1200px) {
          .product-photo-card {
            aspect-ratio: 16 / 7.5;
          }
        }
        @media (max-width: 990px) {
          .product-photo-card {
            aspect-ratio: 16 / 8.5;
          }
        }
        @media (max-width: 768px) {
          .product-photo-card {
            aspect-ratio: 16 / 9;
          }
        }
        @media (max-width: 480px) {
          .product-photo-card {
            aspect-ratio: 16 / 10;
          }
        }
        .product-photo-card:hover .product-card-photo {
          transform: scale(1.05);
        }
        .product-photo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.8) !important;
        }
      `}</style>
    </>
  );
}

function StatusBadge({ status }: { status: Product["status"] }) {
  const config = {
    live: { label: "LIVE", bg: "rgba(0, 255, 136, 0.15)", color: "var(--green)", dot: "var(--green)" },
    beta: { label: "BETA", bg: "rgba(0, 229, 255, 0.15)", color: "var(--cyan)", dot: "var(--cyan)" },
    "coming-soon": { label: "SOON", bg: "rgba(255, 107, 0, 0.15)", color: "var(--orange)", dot: "var(--orange)" },
  }[status];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: config.bg,
        border: `1px solid ${config.dot}55`,
        borderRadius: "4px",
        padding: "4px 10px",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: config.dot,
          boxShadow: `0 0 6px ${config.dot}`,
        }}
      />
      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", color: config.color }}>
        {config.label}
      </span>
    </div>
  );
}
