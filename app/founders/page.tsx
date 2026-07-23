"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "AI Strategy" | "Development" | "Security" | "Product Deep Dive";
  styleType: "Style 1 (Founder Focus)" | "Style 2 (LANA AI News)" | "Style 3 (Co-Pilot Session)";
  image: string;
  youtubeUrl?: string;
}

const EPISODES: Episode[] = [
  {
    id: "future-non-custodial",
    title: "The Future of Non-Custodial AI Operating Systems",
    description: "Asa Pritchard and LANA break down why custodial SaaS models expose business intelligence, and how local runtime solves lock-in.",
    duration: "24:15",
    category: "AI Strategy",
    styleType: "Style 3 (Co-Pilot Session)",
    image: "/images/style3a.png",
  },
  {
    id: "clinic-intake-automation",
    title: "How We Automated Clinic Intakes Safely Under HIPAA Guidelines",
    description: "LANA covers the case study of Lux Care OS: setting up secure local boundaries so client health records never leave the private local server.",
    duration: "18:40",
    category: "Security",
    styleType: "Style 2 (LANA AI News)",
    image: "/images/style2.png",
  },
  {
    id: "vs-code-neural-hack",
    title: "Inside Lux Coder: VS Code Extensions & Persistent Memory Wikis",
    description: "A developer walkthrough explaining how to connect open source LLMs inside your editor and build a compounding codebase context database.",
    duration: "32:10",
    category: "Development",
    styleType: "Style 1 (Founder Focus)",
    image: "/images/style1.jpg",
  },
  {
    id: "saas-is-dead",
    title: "Why Traditional Subscriptions Are Dead: Build Your Own Platform",
    description: "Exploring the compounding returns of deploying unified AI systems that run CRM, invoicing, budgets, and scheduling in a singular database.",
    duration: "22:50",
    category: "AI Strategy",
    styleType: "Style 3 (Co-Pilot Session)",
    image: "/images/style3b.png",
  },
  {
    id: "local-models-low-power",
    title: "Running Enterprise-Grade Local LLMs on Consumer Hardware",
    description: "A technical analysis detailing how quantization allows developers to execute llama-3 parameters locally at near-zero operating costs.",
    duration: "28:35",
    category: "Development",
    styleType: "Style 1 (Founder Focus)",
    image: "/images/style1b.jpg",
  },
];

export default function FoundersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<Episode | null>(null);

  const filteredEpisodes = selectedCategory === "All"
    ? EPISODES
    : EPISODES.filter(ep => ep.category === selectedCategory);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-void)",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
      className="circuit-grid"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Founder Bio Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr",
            gap: "48px",
            alignItems: "center",
            marginBottom: "80px",
            background: "rgba(17, 24, 39, 0.45)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "20px",
            padding: "48px",
            backdropFilter: "blur(10px)",
          }}
          className="founder-hero-grid"
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden", border: "2px solid var(--lux-indigo)" }}>
            <Image
              src={prefixPath("/images/founder-asa.png")}
              alt="Asa Spade Pritchard - Founder of Lux Automaton"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "16px" }}>
              Our Founder
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                fontFamily: "var(--font-display)",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              Asa Spade <span className="gradient-text">Pritchard</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.02rem", lineHeight: 1.7, marginBottom: "20px" }}>
              I build private AI operating systems because I believe business owners shouldn&apos;t have to sell their competitive data to stay modern. Subscription sprawl and SaaS vendors harvest your client lists, your finances, and your IP.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "28px" }}>
              At Lux Automaton, we are building a unified ecosystem—a private suite where your tools share a single persistent memory window, and you retain complete ownership of your technology stack.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/start-here" className="btn-primary" style={{ textDecoration: "none" }}>
                Begin OS Onboarding →
              </Link>
              <Link href="https://www.youtube.com/channel/UCcYnAZw0QnS6dD1n-7vpwdA" target="_blank" className="btn-outline" style={{ textDecoration: "none" }}>
                Subscribe to Asa TV
              </Link>
            </div>
          </div>
        </div>

        {/* Video Grid Section */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
            <div>
              <div className="section-label" style={{ marginBottom: "12px" }}>
                Asa TV
              </div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Episodes & Technical Walkthroughs
              </h2>
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", gap: "8px" }}>
              {["All", "AI Strategy", "Development", "Security", "Product Deep Dive"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    background: selectedCategory === cat ? "rgba(108, 71, 255, 0.12)" : "rgba(255, 255, 255, 0.02)",
                    border: selectedCategory === cat ? "1px solid var(--lux-cyan)" : "1px solid rgba(255, 255, 255, 0.05)",
                    color: selectedCategory === cat ? "var(--lux-cyan)" : "var(--text-secondary)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Episode Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                style={{
                  background: "rgba(17, 24, 39, 0.4)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                }}
                className="hover:scale-102 hover:border-active"
              >
                {/* Thumbnail Layer */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    width: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveVideo(ep)}
                >
                  <Image
                    src={prefixPath(ep.image)}
                    alt={ep.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(6, 9, 19, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(6, 9, 19, 0.4)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(6, 9, 19, 0.2)"}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(0, 212, 255, 0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 16px rgba(0, 212, 255, 0.5)",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem", color: "#0b0f19", marginLeft: "3px" }}>▶</span>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                      background: "rgba(11, 15, 25, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      fontSize: "0.75rem",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {ep.duration}
                  </div>
                </div>

                {/* Content info */}
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "var(--lux-mint)",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                      }}
                    >
                      {ep.category}
                    </span>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {ep.styleType}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1.3,
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveVideo(ep)}
                  >
                    {ep.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                    {ep.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(6, 9, 19, 0.85)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "24px",
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              style={{
                maxWidth: "800px",
                width: "100%",
                background: "var(--bg-base)",
                border: "1px solid var(--border-active)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "16px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "var(--text-primary)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  zIndex: 2,
                }}
              >
                ✕
              </button>

              <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
                {/* Simulated Player View */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--lux-cyan)",
                  }}
                >
                  <span style={{ fontSize: "2.5rem", animation: "pulse 1.5s infinite" }}>▶</span>
                  <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: "12px", color: "var(--text-primary)" }}>
                    Playing: {activeVideo.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
                    Length: {activeVideo.duration}
                  </div>
                </div>
              </div>

              <div style={{ padding: "24px" }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--lux-cyan)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    display: "inline-block",
                    marginBottom: "8px",
                  }}
                >
                  {activeVideo.category}
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: "8px" }}>
                  {activeVideo.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @media (max-width: 768px) {
          .founder-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
