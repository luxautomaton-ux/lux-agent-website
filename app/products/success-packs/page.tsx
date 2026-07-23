"use client";

import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";
import PageHero from "@/components/PageHero";
import FiveWHSection from "@/components/FiveWHSection";
import FeatureGrid from "@/components/FeatureGrid";
import EcosystemBanner from "@/components/EcosystemBanner";
import ProductPageCTA from "@/components/ProductPageCTA";

const PACKS = [
  {
    title: "AI Marketing Mastery Success Pack",
    img: "/images/pack-ai-marketing.jpg",
    desc: "Unlock the secrets of AI-driven growth. The ultimate AD & AI marketing course pre-loaded with automated CRM workflows, local SEO rules, reviews, and client acquisition playbooks.",
    features: ["Automated CRM workflows", "Ad campaign templates", "Review generation playbooks", "Marketing calendars"]
  },
  {
    title: "Electrical Contractor Success Pack",
    img: "/images/pack-electrical-contractor.jpg",
    desc: "Everything you need to run and grow your electrical contracting business. Pre-loaded with crucial business tools, field estimation sheets, scheduling checklists, and job review workflows.",
    features: ["Job tracking pipelines", "Estimate calculators", "Review request scripts", "Before/after photo SOPs"]
  },
  {
    title: "Doctor Success Pack",
    img: "/images/pack-doctor.jpg",
    desc: "Unlock your practice's full potential with modern data management, secure patient intake coordination workflows, and administrative SOPs.",
    features: ["Patient intake templates", "Clinic dashboard rules", "Staff scheduling checklists", "Compliance operation SOPs"]
  },
  {
    title: "Music Label Success Pack",
    img: "/images/pack-music-label.jpg",
    desc: "Your essential toolkit for the modern artist and music executive. Pre-built contracts, licensing templates, A&R trackers, demo pipelines, and global distribution playbooks.",
    features: ["Pre-built licensing contracts", "A&R pipeline trackers", "Distribution playbooks", "Marketing templates"]
  },
  {
    title: "Real Estate Success Pack",
    img: "/images/pack-real-estate.jpg",
    desc: "Your blueprint, your brand, your breakthrough. Done-for-you systems, AI tools, branding, and automation templates built for real estate agents and brokers.",
    features: ["Lead follow-up automation", "Property listing checklists", "Branding system templates", "Client management CRM"]
  },
  {
    title: "Founder Command Center Pack",
    img: "/images/pack-founder.jpg",
    desc: "Everything you need to create, connect, and elevate your personal brand and business. Pre-built templates, CRM pipelines, and founder-focused operating rules.",
    features: ["Plug-in ready setups", "Founder CRM recipes", "Asset trackers", "Strategic planning SOPs"]
  },
  {
    title: "DJ O.G. One Rip City Command Pack",
    img: "/images/pack-rip-city.jpg",
    desc: "Culture and music command pack. Done-for-you systems, AI tools, branding, and automation templates built for creators, media operators, and DJs.",
    features: ["Branding system templates", "Show planning checklists", "Social media campaigns", "Sponsor pitch decks"]
  }
];

const FIVE_WH = {
  who: {
    headline: "For Business Owners Who Need Results Now — Not in 6 Months",
    body: "New entrepreneurs who need a system fast. Established business owners tired of reinventing the wheel. Restaurant owners, contractors, consultants, coaches, service businesses, and operators in any industry who want proven playbooks they can deploy immediately.",
  },
  what: {
    headline: "Done-For-You Business Workflows, SOPs & Playbooks",
    body: "Success Packs are pre-built business operating systems for specific industries and functions. Each pack includes workflow maps, SOP templates, CRM pipeline setups, content calendars, client delivery frameworks, and Lux Agent-ready automation recipes — all ready to deploy.",
  },
  when: {
    headline: "When You Launch, Scale, or Systematize Your Business",
    body: "Day one of a new business. When you hire your first team member. When you're losing time to disorganization. When a new client type requires a new process. Success Packs are designed to be deployed fast — not studied. Pick your pack, install the system, execute.",
  },
  where: {
    headline: "Digital Delivery — Works with Lux Agent or Standalone",
    body: "Access your Success Packs immediately after purchase via digital download. Deploy them directly into Lux Agent for AI-powered execution, or use the templates and SOPs manually with your existing tools. Industry-specific packs are available for restaurants, contractors, real estate, healthcare, and more.",
  },
  why: {
    headline: "Because Building Systems from Scratch Is Expensive and Slow",
    body: "Every hour you spend building a workflow from zero is an hour you're not generating revenue. Success Packs give you battle-tested systems built from real-world business operations — so you skip the trial and error and go straight to execution.",
  },
  how: {
    headline: "Choose Your Pack. Deploy. Execute.",
    body: "Browse packs by industry or function. Purchase the pack that fits your business. Receive instant digital access to all templates, SOPs, workflow maps, and Lux Agent recipes. Follow the deployment guide to install your new system. Start executing the same day — with a proven process behind every action.",
  },
};

const FEATURES = [
  "Done-for-you business playbooks",
  "Repeatable SOP templates",
  "Industry-specific workflow systems",
  "Client delivery frameworks",
  "CRM & pipeline recipes",
  "Lux Agent-ready integrations",
];

const ECOSYSTEM_PRODUCTS = [
  { name: "Lux Agent USB", icon: "💾", href: "/products/lux-agent-usb" },
  { name: "Lux Coder", icon: "</> ", href: "/products/lux-coder" },
  { name: "Lux Agent", icon: "🤖", href: "/products/lux-agent" },
  { name: "LANA", icon: "💜", href: "/products/lana" },
  { name: "Lux WriteOff", icon: "💰", href: "/products/luxwriteoff" },
];

export default function SuccessPacksPage() {
  return (
    <div style={{ background: "var(--bg-void)", minHeight: "100vh", color: "var(--text-primary)", paddingTop: "72px" }}>
      
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="Ecosystem Product"
        headline="Success Packs"
        subheadline="Done-For-You Business Systems"
        accentColor="var(--cyan)"
        bgImage="/images/restaurant-success-pack.png"
        primaryCta={{ label: "Browse Success Packs", href: "#packs-catalog" }}
        secondaryCta={{ label: "Explore Ecosystem", href: "/products" }}
        status="live"
        icon="📦"
      />

      {/* 2. What It Is Section */}
      <section style={{ background: "var(--bg-base)", padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px" }} className="hero-grid">
          <div>
            <div style={{ fontSize: "8rem", fontWeight: 900, color: "rgba(0, 229, 255, 0.04)", lineHeight: 0.8, fontFamily: "monospace", userSelect: "none" }}>W</div>
            <div className="section-label" style={{ marginBottom: "20px" }}>What It Is</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "24px" }}>The Core Purpose</h2>
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", color: "var(--text-primary)", lineHeight: 1.7, fontWeight: 500, marginBottom: "24px" }}>
              Ready-made workflows and playbooks. Business recipes, SOPs, templates, and repeatable systems — pre-built so you can get results faster without starting from scratch.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
              Lux Automaton Success Packs install standard operating playbooks directly into your AI workflows. Instead of designing spreadsheets, calendars, and CRM columns from zero, you install a pre-configured solution built by operators who understand the industry.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SUCCESS PACKS CATALOG (NEW SECTION) */}
      <section id="packs-catalog" style={{ padding: "120px 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Catalog</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>Available Success Packs</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Plug in. Power up. Run your business with proven AI playbooks.
            </p>
          </div>

          <div className="packs-grid">
            {PACKS.map((pack, idx) => (
              <div 
                key={idx} 
                className="glass-card success-pack-card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column",
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
                  borderRadius: "24px", 
                  background: "rgba(6,11,20,0.4)",
                  overflow: "hidden",
                  height: "100%"
                }} 
              >
                {/* Visual Banner at the Top */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "1.6", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <Image src={prefixPath(pack.img)} alt={pack.title} fill style={{ objectFit: "cover" }} />
                </div>
                {/* Info Section below image */}
                <div style={{ padding: "32px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <span style={{ display: "inline-block", alignSelf: "flex-start", fontSize: "0.68rem", fontWeight: 700, color: "var(--cyan)", border: "1px solid rgba(0, 229, 255, 0.2)", background: "rgba(0, 229, 255, 0.04)", borderRadius: "4px", padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>SUCCESS PACK</span>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "16px", marginBottom: "16px" }}>{pack.title}</h3>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "28px", fontSize: "0.95rem", flexGrow: 1 }}>{pack.desc}</p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                    {pack.features.map((feat) => (
                      <div key={feat} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "var(--cyan)" }}>◆</span>
                        <span style={{ color: "var(--text-secondary)" }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FiveWHSection */}
      <FiveWHSection fiveWH={FIVE_WH} accentColor="var(--cyan)" />

      {/* 5. FeatureGrid */}
      <FeatureGrid features={FEATURES} accentColor="var(--cyan)" title="Core Capabilities" />

      {/* 6. EcosystemBanner */}
      <EcosystemBanner
        connectionText="Success Packs are pre-built to fit into your Lux Automaton products, letting you automate workflows immediately."
        accentColor="var(--cyan)"
        products={ECOSYSTEM_PRODUCTS}
      />

      {/* 7. Pricing/Offer Section */}
      <section style={{ padding: "100px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="glass-card" style={{ padding: "48px", border: "1px solid rgba(0, 229, 255, 0.2)", borderRadius: "20px", background: "rgba(6,11,20,0.6)" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "12px" }}>Get a Single Success Pack</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>Pre-configured playbooks for your business industry.</p>
            <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "8px" }}>$97</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "32px" }}>One-time Purchase Per Pack</div>
            <Link href="/contact" className="btn-primary" style={{ padding: "14px 40px" }}>
              Get Yours Today
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ProductPageCTA */}
      <ProductPageCTA
        headline="Rev up your business operations."
        subheadline="Choose your playbook, plug in, and let LANA guide your daily execution."
        accentColor="var(--cyan)"
        primaryCta={{ label: "Browse Success Packs", href: "#packs-catalog" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
 
      {/* Styles for grid responsiveness */}
      <style>{`
        .packs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        @media (max-width: 1024px) {
          .packs-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

    </div>
  );
}
