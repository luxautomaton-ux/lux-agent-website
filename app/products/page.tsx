import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products — Lux Automaton",
  description:
    "Explore the full Lux Automaton AI product ecosystem: Lux Agent USB, Lux Coder, Lux Agent, Lux WriteOff, Lux Budgeter, and Success Packs. Private AI tools for founders and businesses.",
};

export default function ProductsPage() {
  const liveProducts = PRODUCTS.filter((p) => p.status === "live");
  const comingSoonProducts = PRODUCTS.filter((p) => p.status === "coming-soon");

  return (
    <div style={{ paddingTop: "72px" }}>
      <ProductsHero />
      <EcosystemOverview />
      <LiveProductsSection products={liveProducts} />
      <ComingSoonSection products={comingSoonProducts} />
      <EcosystemValueSection />
      <ProductsBottomCTA />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────
function ProductsHero() {
  return (
    <section
      style={{
        padding: "90px 24px 100px",
        backgroundImage: `linear-gradient(to right, rgba(3, 5, 18, 0.92) 0%, rgba(3, 5, 18, 0.82) 60%, rgba(3, 5, 18, 0.55) 100%), url(${prefixPath("/images/page-hero-circuit.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circuit grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(26, 109, 255, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 500px",
          gap: "80px",
          alignItems: "center",
        }}
        className="products-hero-grid"
      >
        {/* Left copy */}
        <div>
          <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
            The Ecosystem
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Powerful AI Tools.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--electric), var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One Connected System.
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              maxWidth: "540px",
              marginBottom: "44px",
            }}
          >
            Each product is built to stand alone or work together. Your AI stack compounds the more you use it.
            Start with one tool. Build your full operating system over time.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "56px" }}>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/contact" className="btn-outline">
              Book a Demo
            </Link>
          </div>

          {/* Quick stat row */}
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            {[
              { value: "6", label: "AI Products" },
              { value: "2", label: "Live Now" },
              { value: "1", label: "Ecosystem" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: "var(--cyan)",
                    lineHeight: 1,
                    textShadow: "0 0 20px rgba(0,229,255,0.4)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Lux Coder card image */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 0 60px rgba(0, 229, 255, 0.08)",
          }}
          className="products-hero-image"
        >
          <Image
            src={prefixPath("/images/lux-coder-card.png")}
            alt="Lux Coder — AI coding suite"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .products-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .products-hero-image { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── ECOSYSTEM OVERVIEW ────────────────────────────────────────
function EcosystemOverview() {
  const items = [
    { icon: "💾", name: "Lux Agent USB", role: "Portable AI business OS for productivity anywhere" },
    { icon: "</>", name: "Lux Coder", role: "Code faster. Build smarter. Ship everything." },
    { icon: "🤖", name: "Lux Agent", role: "Your personal AI assistant for work and life" },
    { icon: "💰", name: "Lux WriteOff", role: "Maximize deductions. Automate tax write-offs." },
    { icon: "📊", name: "Lux Budgeter", role: "Budget smarter. See cash flow. Stay in control." },
    { icon: "📦", name: "Success Packs", role: "Done-for-you systems, SOPs, and playbooks." },
  ];

  return (
    <section
      style={{
        padding: "60px 24px",
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ display: "inline-flex", marginBottom: "16px" }}>
            Our Ecosystem
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Powerful AI Tools. One Connected System.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "16px",
          }}
          className="ecosystem-overview-grid"
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="glass-card"
              style={{
                padding: "24px 16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(0, 229, 255, 0.08)",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "0.02em",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {item.role}
              </div>
              <Link
                href="#products"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--cyan)",
                  textDecoration: "none",
                }}
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .ecosystem-overview-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .ecosystem-overview-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

// ─── LIVE PRODUCTS ────────────────────────────────────────────
function LiveProductsSection({ products }: { products: ReturnType<typeof PRODUCTS.filter> }) {
  return (
    <section
      id="products"
      className="circuit-grid"
      style={{ padding: "100px 24px", background: "var(--bg-surface)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <div className="status-dot" />
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--green)",
              }}
            >
              Live Now · Available Today
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Start Here
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "500px", lineHeight: 1.7 }}>
            These products are live, tested, and ready to use right now.
          </p>
        </div>

        <div
          className="product-grid-2"
          style={{
            gap: "20px",
          }}
        >

          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMING SOON ──────────────────────────────────────────────
function ComingSoonSection({ products }: { products: ReturnType<typeof PRODUCTS.filter> }) {
  return (
    <section style={{ padding: "80px 24px 100px", background: "var(--bg-base)", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label" style={{ display: "inline-flex", marginBottom: "14px" }}>
            On the Roadmap
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Coming Soon
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "540px", lineHeight: 1.7 }}>
            The rest of the ecosystem is in active development. Join the waitlist for early access.
          </p>
        </div>

        <div
          className="product-grid-2"
          style={{
            gap: "20px",
          }}
        >

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ECOSYSTEM VALUE SECTION ──────────────────────────────────
function EcosystemValueSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label" style={{ display: "inline-flex", marginBottom: "16px" }}>
            Ecosystem Value
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Built to Scale.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built to Last.
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontSize: "0.95rem",
            }}
          >
            The Lux Automaton ecosystem represents thousands of hours of focused development and real-world business value.
          </p>
        </div>

        {/* Ecosystem value infographic */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 0 60px rgba(0, 229, 255, 0.08)",
            marginBottom: "60px",
          }}
        >
          <Image
            src={prefixPath("/images/ecosystem-value.png")}
            alt="Lux Automaton Ecosystem Value — development hours, build value, and estimated sale value"
            width={1280}
            height={720}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Value stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            { label: "Total Dev Hours", value: "3,700–5,100+", icon: "⏱", color: "var(--cyan)" },
            { label: "Total Build Value", value: "$472K–$920K", icon: "💎", color: "var(--blue-bright)" },
            { label: "Ecosystem Sale Value", value: "$1.2M–$2.5M", icon: "📈", color: "var(--green)" },
            { label: "Products in Ecosystem", value: "6 Tools", icon: "⚡", color: "var(--orange)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{ padding: "28px 24px", textAlign: "center" }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}66`,
                  marginBottom: "6px",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            marginTop: "24px",
            fontStyle: "italic",
          }}
        >
          ✦ All figures shown are strategic estimates for branding and planning purposes.
        </p>
      </div>
    </section>
  );
}

// ─── WHY LUX AUTOMATON ────────────────────────────────────────
function ProductsBottomCTA() {
  const reasons = [
    { icon: "🔒", title: "Local-first control", body: "Your data stays private and under your control." },
    { icon: "🧠", title: "Multi-model flexibility", body: "Use the best AI models for every task, on your terms." },
    { icon: "⚡", title: "Business workflow automation", body: "Automate repetitive work and scale with confidence." },
    { icon: "🚀", title: "Client-ready delivery", body: "Deliver real value to clients faster with AI systems." },
  ];

  return (
    <>
      {/* Why section */}
      <section
        className="circuit-grid"
        style={{ padding: "100px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-label" style={{ display: "inline-flex", marginBottom: "16px" }}>
              Why Lux Automaton
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              AI That Works the Way You Do.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
              marginBottom: "80px",
            }}
          >
            {reasons.map((r) => (
              <div key={r.title} className="glass-card" style={{ padding: "32px 28px", display: "flex", gap: "20px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(0, 229, 255, 0.08)",
                    border: "1px solid rgba(0, 229, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}
                >
                  {r.icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {r.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div
            style={{
              textAlign: "center",
              padding: "60px 40px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Not sure where to start?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "36px",
                lineHeight: 1.7,
                maxWidth: "480px",
                margin: "0 auto 36px",
                fontSize: "0.95rem",
              }}
            >
              Talk to us. We&apos;ll help you map your workflow to the right combination of tools.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: "0.9rem", padding: "14px 32px" }}>
                Book a Strategy Call →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
