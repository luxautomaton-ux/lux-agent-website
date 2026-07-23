"use client";

import { useState } from "react";
import Link from "next/link";

interface Recommendation {
  role: string;
  headline: string;
  workshop: {
    title: string;
    desc: string;
    link: string;
  };
  product: {
    name: string;
    desc: string;
    link: string;
    icon: string;
  };
  successPack: {
    name: string;
    desc: string;
  };
  ctaText: string;
  ctaLink: string;
}

const RECOMMENDATIONS: Record<string, Recommendation> = {
  founder: {
    role: "Founder & Builder",
    headline: "Form, Automate, and Scale Your Venture with Multi-Agent Systems",
    workshop: {
      title: "Build Your First AI Business",
      desc: "Learn to deploy autonomous systems to coordinate outreach, handle lead capture, and manage financials.",
      link: "/workshops",
    },
    product: {
      name: "Lux Business",
      desc: "Entity formation, automated billing, CRM client pipeline, and transaction intelligence in a unified dashboard.",
      link: "/products/lux-business",
      icon: "🏢",
    },
    successPack: {
      name: "Creator OS",
      desc: "Pre-configured systems for automated social posting, pipeline tracking, and contractor onboarding templates.",
    },
    ctaText: "Book a Founder Consultation",
    ctaLink: "/contact",
  },
  local: {
    role: "Local Business Owner",
    headline: "Eliminate Administrative Overhead and Supercharge Local Sales",
    workshop: {
      title: "AI Automation for Small Business",
      desc: "Step-by-step systems to automate client intake, scheduling, invoice reviews, and customer support queries.",
      link: "/workshops",
    },
    product: {
      name: "Lux Codex",
      desc: "A secure, local-first database processor that runs open-source LLMs locally, ensuring patient/customer records stay private.",
      link: "/products/lux-codex",
      icon: "🧠",
    },
    successPack: {
      name: "Small Business OS",
      desc: "Ready-to-deploy POS triggers, automated review generators, and inventory tracking assistants.",
    },
    ctaText: "Schedule a Local OS Demo",
    ctaLink: "/contact",
  },
  contractor: {
    role: "Independent Contractor",
    headline: "Mobile Invoicing, Client Tracking, and Expense Intelligence",
    workshop: {
      title: "AI for Contractors & Trades",
      desc: "Field scheduling, auto-estimating drafts, and capturing on-site expense write-offs using your phone.",
      link: "/workshops",
    },
    product: {
      name: "Lux Agent USB",
      desc: "Your entire AI operating system on a hardware drive. Plug into any machine and execute offline scheduling/CRM workflows.",
      link: "/products/lux-agent-usb",
      icon: "💾",
    },
    successPack: {
      name: "Contractor OS",
      desc: "Estimate estimators, material costs calculators, and automatic follow-up triggers for completed jobs.",
    },
    ctaText: "Request Agent USB Key",
    ctaLink: "/contact",
  },
  nonprofit: {
    role: "Nonprofit / Community Leader",
    headline: "Organize Volunteer Networks and Deliver Local Care Operations Safely",
    workshop: {
      title: "AI for Nonprofits & Clinic Operations",
      desc: "Designing HIPAA-compliant volunteer databases, grant draft structures, and resource-sharing schedules.",
      link: "/workshops",
    },
    product: {
      name: "LANA Productivity",
      desc: "Connects your SOP instructions, volunteers databases, and care documentation so the system updates tasks proactively.",
      link: "/products/lana",
      icon: "🌌",
    },
    successPack: {
      name: "Inland Circle Program OS",
      desc: "HIPAA-aligned task trackers, program coordinators, and community mailing blast generators.",
    },
    ctaText: "Join Inland Circle Program",
    ctaLink: "/contact",
  },
  developer: {
    role: "Developer / App Builder",
    headline: "Build High-Performance AI Applications Without Subscription Lock-In",
    workshop: {
      title: "Build AI Apps Without Coding",
      desc: "Learn to bind open-source AI endpoints, local files, and web APIs together to form complex production-grade apps.",
      link: "/workshops",
    },
    product: {
      name: "Lux Coder",
      desc: "The professional AI developer command center in VS Code. Saved context wiki, sub-agents, and code diff auditing.",
      link: "/products/lux-coder",
      icon: "💻",
    },
    successPack: {
      name: "Lux Codex Masterclass",
      desc: "Codebase schemas, mock API routes, and container orchestration templates for private model hosting.",
    },
    ctaText: "Download Coder Suite",
    ctaLink: "https://luxautomaton-ux.github.io/lux-coder-website",
  },
};

export default function StartHerePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-void)",
        paddingTop: "120px",
        paddingBottom: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      className="circuit-grid"
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            Discovery Advisor
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Start Your <span className="gradient-text">Lux OS Journey</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Select your role below and LANA will dynamically construct your AI business roadmap, products bundle, and workshops recommendation.
          </p>
        </div>

        {/* Roles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginBottom: "48px",
          }}
        >
          {Object.entries(RECOMMENDATIONS).map(([key, rec]) => {
            const isSelected = selectedRole === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedRole(key)}
                style={{
                  background: isSelected ? "rgba(108, 71, 255, 0.12)" : "rgba(17, 24, 39, 0.6)",
                  border: isSelected ? "2px solid var(--lux-cyan)" : "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "24px 16px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: isSelected ? "0 0 20px rgba(0, 212, 255, 0.15)" : "none",
                }}
                className="hover:scale-102"
              >
                <span style={{ fontSize: "2rem" }}>
                  {key === "founder" ? "🚀" : key === "local" ? "🏬" : key === "contractor" ? "🛠️" : key === "nonprofit" ? "🏥" : "💻"}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: isSelected ? "var(--lux-cyan)" : "var(--text-primary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {rec.role}
                </span>
              </button>
            );
          })}
        </div>

        {/* Recommendation Content */}
        {selectedRole ? (
          <div
            style={{
              background: "rgba(17, 24, 39, 0.55)",
              border: "1px solid rgba(108, 71, 255, 0.15)",
              borderRadius: "16px",
              padding: "40px",
              backdropFilter: "blur(12px)",
              animation: "fadeIn 0.4s ease-out",
            }}
          >
            <div style={{ borderBottom: "1px solid rgba(108, 71, 255, 0.1)", paddingBottom: "24px", marginBottom: "32px" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--lux-cyan)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Custom Roadmap: {RECOMMENDATIONS[selectedRole].role}
              </div>
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                  fontFamily: "var(--font-display)",
                }}
              >
                {RECOMMENDATIONS[selectedRole].headline}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "32px",
                marginBottom: "40px",
              }}
              className="roadmap-grid"
            >
              {/* Left Column — Learning & playbooks */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>🎓</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--lux-white)", fontFamily: "var(--font-display)" }}>
                      Recommended Workshop
                    </h3>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "12px" }}>
                    {RECOMMENDATIONS[selectedRole].workshop.desc}
                  </p>
                  <Link
                    href={RECOMMENDATIONS[selectedRole].workshop.link}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--lux-cyan)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    className="hover:underline"
                  >
                    View Workshop Syllabus →
                  </Link>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.2rem" }}>📦</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--lux-white)", fontFamily: "var(--font-display)" }}>
                      Recommended Playbook
                    </h3>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {RECOMMENDATIONS[selectedRole].successPack.desc}
                  </p>
                </div>
              </div>

              {/* Right Column — Product Recommendation */}
              <div
                style={{
                  background: "rgba(11, 15, 25, 0.6)",
                  border: "1px solid rgba(108, 71, 255, 0.12)",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "2rem" }}>{RECOMMENDATIONS[selectedRole].product.icon}</span>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {RECOMMENDATIONS[selectedRole].product.name}
                      </h4>
                      <span style={{ fontSize: "0.68rem", color: "var(--lux-mint)", fontFamily: "var(--font-mono)" }}>
                        Core Infrastructure
                      </span>
                    </div>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "20px" }}>
                    {RECOMMENDATIONS[selectedRole].product.desc}
                  </p>
                </div>
                <Link
                  href={RECOMMENDATIONS[selectedRole].product.link}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-active)",
                    color: "var(--lux-cyan)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    background: "rgba(0, 212, 255, 0.04)",
                    transition: "all 0.2s ease",
                  }}
                  className="btn-outline"
                >
                  Explore {RECOMMENDATIONS[selectedRole].product.name}
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                href={RECOMMENDATIONS[selectedRole].ctaLink}
                style={{
                  padding: "14px 36px",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textDecoration: "none",
                  color: "#0b0f19",
                  background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)",
                  boxShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
                  transition: "all 0.2s ease",
                }}
                className="btn-primary"
              >
                {RECOMMENDATIONS[selectedRole].ctaText}
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "rgba(17, 24, 39, 0.3)",
              border: "1px dashed var(--border-subtle)",
              borderRadius: "16px",
              padding: "60px 24px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "16px" }}>🌌</span>
            Please select your organizational profile above to generate recommendations.
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .roadmap-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
