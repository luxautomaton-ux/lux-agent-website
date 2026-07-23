import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";
import { PRODUCTS } from "@/lib/products";
import PageHero from "@/components/PageHero";
import FiveWHSection from "@/components/FiveWHSection";
import FeatureGrid from "@/components/FeatureGrid";
import EcosystemBanner from "@/components/EcosystemBanner";
import ProductPageCTA from "@/components/ProductPageCTA";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} — AI Product Ecosystem | Lux Automaton`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const isExternal = product.ctaHref.startsWith("http");
  const primaryCta = {
    label: product.ctaLabel,
    href: product.ctaHref,
    external: isExternal,
  };

  const secondaryCta = {
    label: "Explore Ecosystem",
    href: "/products",
  };

  // Get other products for the ecosystem banner
  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => ({
    name: p.name,
    icon: p.icon.trim(),
    href: p.pageHref,
  }));

  const accentColor = product.accentColor;

  return (
    <div style={{ paddingTop: "72px", background: "var(--bg-void)", minHeight: "100vh" }}>
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Ecosystem Product"
        headline={product.name}
        subheadline={product.tagline}
        accentColor={accentColor}
        bgImage={product.bgImage}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        status={product.status}
        icon={product.icon.trim()}
      />

      {/* 2. What It Is Section */}
      <section
        style={{
          background: "var(--bg-base)",
          padding: "100px 24px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "60px",
          }}
          className="what-it-is-grid"
        >
          {/* Left Column: WHAT IT IS label */}
          <div>
            <div
              style={{
                fontSize: "8rem",
                fontWeight: 900,
                color: `${accentColor}10`,
                lineHeight: 0.8,
                fontFamily: "var(--font-mono, monospace)",
                userSelect: "none",
                marginBottom: "20px",
              }}
            >
              W
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: accentColor,
                background: `${accentColor}0d`,
                border: `1px solid ${accentColor}33`,
                borderRadius: "4px",
                padding: "5px 16px",
                display: "inline-flex",
              }}
            >
              WHAT IT IS
            </div>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginTop: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              The Core Purpose
            </h2>
          </div>

          {/* Right Column: Descriptions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-primary)",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              {product.description}
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}
            >
              {product.fiveWH.what.body}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section
        style={{
          background: "var(--bg-void)",
          padding: "100px 24px",
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 50% 50%, ${accentColor}08 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}0d`,
              border: `1px solid ${accentColor}33`,
              borderRadius: "4px",
              padding: "5px 16px",
              marginBottom: "32px",
              display: "inline-flex",
            }}
          >
            THE CHALLENGE & WHY
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            &ldquo;{product.fiveWH.why.headline}&rdquo;
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            {product.fiveWH.why.body}
          </p>
        </div>
      </section>

      {/* 4. 5W+H Section */}
      <FiveWHSection fiveWH={product.fiveWH} accentColor={accentColor} />

      {/* 5. Feature Grid */}
      <FeatureGrid features={product.features} accentColor={accentColor} title={`${product.name} Key Capabilities`} />

      {/* 6. Dynamic Coder Podcast & Video */}
      {product.slug === "lux-coder" && (
        <>
          {/* Podcast Section */}
          <section
            style={{
              background: "var(--bg-void)",
              padding: "100px 24px",
              position: "relative",
              borderTop: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: "60px",
                alignItems: "center",
              }}
              className="podcast-grid"
            >
              {/* Left Side: Photo */}
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                <Image
                  src={prefixPath("/images/lux-coder-banner.png")}
                  alt="Lux Coder Podcast Cover"
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: accentColor,
                    color: "#000",
                    fontWeight: 900,
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: "4px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  🎙️ Podcast
                </div>
              </div>

              {/* Right Side: Description + Player */}
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: accentColor,
                    marginBottom: "16px",
                  }}
                >
                  LUX CODER PODCAST
                </div>
                <h3
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    margin: "0 0 20px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Hear It From the Builders
                </h3>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                  }}
                >
                  A real conversation about AI-powered development, building smarter with Lux Coder, and what the future of coding looks like for founders and developers.
                </p>

                {/* Custom Audio Box */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${accentColor}33`,
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: `0 0 30px ${accentColor}0d`,
                  }}
                >
                  <audio controls style={{ width: "100%" }}>
                    <source src="/podcast-episode.m4a" type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginTop: "14px",
                      textAlign: "center",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Episode 01 &middot; Lux Coder Deep Dive &middot; AI-Powered Development for Builders
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* YouTube Section */}
          <section
            style={{
              background: "var(--bg-base)",
              padding: "100px 24px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: accentColor,
                  background: `${accentColor}0d`,
                  border: `1px solid ${accentColor}33`,
                  borderRadius: "4px",
                  padding: "5px 16px",
                  marginBottom: "20px",
                  display: "inline-flex",
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
                See Lux Coder in Action
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
                Watch a live walkthrough showing how Lux Coder accelerates builds and manages complex codebases inside VS Code.
              </p>

              {/* Video container with cyan glow */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${accentColor}44`,
                  boxShadow: `0 0 40px ${accentColor}22`,
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/LEdcHrIkzpg"
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
        </>
      )}

      {/* 7. Dynamic Agent Video */}
      {product.slug === "lux-agent" && (
        <section
          style={{
            background: "var(--bg-base)",
            padding: "100px 24px",
            textAlign: "center",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: accentColor,
                background: `${accentColor}0d`,
                border: `1px solid ${accentColor}33`,
                borderRadius: "4px",
                padding: "5px 16px",
                marginBottom: "20px",
                display: "inline-flex",
              }}
            >
              DEMO VIDEO
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
              See Lux Agent in Action
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
              Watch how Lux Agent runs operational workflows, coordinates business tasks, and automates processes in your own private environment.
            </p>

            {/* Video container with green glow */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${accentColor}44`,
                boxShadow: `0 0 40px ${accentColor}22`,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/6UR3aupSWCI"
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
      )}

      {/* 8. Ecosystem Connection */}
      <EcosystemBanner
        connectionText={`As a key element of the Lux Automaton suite, ${product.name} integrates with our other systems to help automate leads, code pipelines, and tax/expense intelligence.`}
        accentColor={accentColor}
        products={otherProducts}
      />

      {/* 9. Disclaimer Box */}
      {(product.slug === "luxwriteoff" || product.slug === "lux-budgeter") && (
        <section style={{ background: "var(--bg-void)", padding: "40px 24px" }}>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "rgba(255, 107, 0, 0.05)",
              border: "1px solid rgba(255, 107, 0, 0.2)",
              borderRadius: "12px",
              padding: "24px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--orange)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Financial Disclaimer
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {product.slug === "luxwriteoff"
                  ? "Lux WriteOff helps organize expense information. It does not replace a licensed tax professional, CPA, or legal tax/financial advice."
                  : "Lux Budgeter helps organize budget and cash flow forecasting information. It does not replace a licensed financial advisor, CPA, or professional financial planning advice."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 10. Product CTA */}
      <ProductPageCTA
        headline={product.status === "coming-soon" ? "Get Early Access" : "Get in Touch"}
        subheadline={product.status === "coming-soon" ? "Join the waitlist to receive priority access when launch begins." : "Deploy this solution and start accelerating your business workflows."}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        accentColor={accentColor}
      />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .what-it-is-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .podcast-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
