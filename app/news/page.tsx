"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_STORIES, NewsStory } from "@/lib/news";
import { prefixPath } from "@/lib/prefix";

interface QuestionBreakdown {
  why: string;
  who: string;
  affect: string;
  help: string;
}

// Generate the 4 customized questions for each story
function getAnalysisPillars(story: NewsStory): QuestionBreakdown {
  const titleLower = story.title.toLowerCase();

  if (titleLower.includes("courses") || titleLower.includes("democratizing")) {
    return {
      why: "Traditional education teaches generic prompts instead of practical AI business implementation. This course hub fills that void.",
      who: "Founders, developers, and career changers who want to build real systems rather than generic wrappers.",
      affect: "It enables you or your staff to build custom CRM engines and local configurations, saving tens of thousands in agency fees.",
      help: "Yes. Study AI Courses is built by Lux Automaton to offer hands-on syllabi and direct developer templates.",
    };
  } else if (titleLower.includes("writeoff") || titleLower.includes("savings")) {
    return {
      why: "1099 professionals leave an average of $4,000 on the table every year due to manual, complex tracking procedures.",
      who: "Freelancers, independent contractors, consultants, and business owners managing business expenses.",
      affect: "AI expense tracking automates deductor categorization, ensuring audit safety and significant yearly cash savings.",
      help: "Yes. Lux WriteOff is built directly into our ecosystem to parse receipts and sync statements privately.",
    };
  } else if (titleLower.includes("sprawl") || titleLower.includes("ecosystem")) {
    return {
      why: "SaaS subscriptions create massive data silo issues. Disconnected tools lead to manual duplication and lost efficiency.",
      who: "Growing teams and startups who spend thousands on separate subscriptions that do not communicate.",
      affect: "Consolidating databases under a unified operating system shares context memory and accelerates execution rates.",
      help: "Yes. Lux Codex and LANA are built specifically to serve as the unifying neural core of your business.",
    };
  } else if (titleLower.includes("healthcare") || titleLower.includes("clinic")) {
    return {
      why: "Standard cloud AI platforms violate healthcare compliance. Clinics require secure, local-first architectures.",
      who: "Clinic coordinators, care program managers, and security-centric nonprofit operations.",
      affect: "It automates patient intakes and scheduling without sending medical files to public servers.",
      help: "Yes. Lux Care OS coordinates patient communications and staff tasks in a private, secure environment.",
    };
  } else if (titleLower.includes("local-first") || titleLower.includes("leaks")) {
    return {
      why: "Sending proprietary codebase files or client lists to public API nodes exposes businesses to intellectual property loss.",
      who: "Security leads, CTOs, enterprise founders, and legally regulated service providers.",
      affect: "Deploying local models ensures compliance, eliminates subscription latency, and guarantees total data safety.",
      help: "Yes. Lux Codex runs high-performance open-source models inside your secure, non-custodial local runtime.",
    };
  } else if (titleLower.includes("usb") || titleLower.includes("drive")) {
    return {
      why: "Field sales teams and remote operations need operational access without relying on public network availability.",
      who: "Remote contractors, field technicians, and traveling executives.",
      affect: "You carry your CRM, document scripts, and local models on an encrypted physical key that runs anywhere offline.",
      help: "Yes. Lux Agent USB packages your complete system environment on secure, portable physical drives.",
    };
  } else {
    return {
      why: "AI architectures are shifting from simple text queries to multi-agent database orchestrations.",
      who: "Forward-thinking business leaders, developers, and operational executives.",
      affect: "Automating glue scripts bridges systems in real time, shortening weeks of vendor integration to hours.",
      help: "Yes. Lux Coder and LANA connect to your database schemas to execute continuous integration.",
    };
  }
}

export default function NewsPortalPage() {
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(NEWS_STORIES[0] || null);

  const pillars = selectedStory ? getAnalysisPillars(selectedStory) : null;

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
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        
        {/* Title */}
        <div style={{ marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px", display: "inline-flex" }}>
            LANA Intelligence Feed
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-display)",
            }}
          >
            LANA <span className="gradient-text">Weekly Intelligence</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "8px" }}>
            Real-world AI challenges, problem research, and custom business breakdowns.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr",
            gap: "40px",
          }}
          className="news-grid-layout"
        >
          {/* Left Column: Feed list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxHeight: "80vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
            className="custom-scrollbar"
          >
            {NEWS_STORIES.map((story) => {
              const isSelected = selectedStory?.slug === story.slug;
              return (
                <div
                  key={story.slug}
                  onClick={() => setSelectedStory(story)}
                  style={{
                    background: isSelected ? "rgba(108, 71, 255, 0.06)" : "rgba(17, 24, 39, 0.4)",
                    border: isSelected ? "1px solid var(--lux-cyan)" : "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  className="hover:border-active"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "var(--lux-cyan)",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                      }}
                    >
                      {story.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{story.date}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: isSelected ? "var(--lux-cyan)" : "var(--text-primary)",
                      lineHeight: 1.3,
                      marginBottom: "6px",
                    }}
                  >
                    {story.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.8rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {story.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Article & Analysis Pillars */}
          {selectedStory && pillars ? (
            <div
              style={{
                background: "rgba(17, 24, 39, 0.55)",
                border: "1px solid rgba(108, 71, 255, 0.15)",
                borderRadius: "16px",
                padding: "36px",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Header Details */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "var(--lux-mint)",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      border: "1px solid rgba(0, 255, 163, 0.2)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {selectedStory.category}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{selectedStory.date}</span>
                </div>
                <h2
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                    fontFamily: "var(--font-display)",
                    marginBottom: "8px",
                  }}
                >
                  {selectedStory.title}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                  <div style={{ position: "relative", width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
                    <Image
                      src={prefixPath(selectedStory.author.image || "/images/founder-asa.png")}
                      alt={selectedStory.author.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {selectedStory.author.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{selectedStory.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Analysis Pillars (The 4 Custom Questions) */}
              <div
                style={{
                  background: "rgba(11, 15, 25, 0.7)",
                  border: "1px solid rgba(108, 71, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--lux-cyan)", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                  LANA Custom Research & Analysis
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--lux-white)", marginBottom: "4px" }}>
                    1. Why does this matter?
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {pillars.why}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--lux-white)", marginBottom: "4px" }}>
                    2. Who should care?
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {pillars.who}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--lux-white)", marginBottom: "4px" }}>
                    3. How does it affect my business?
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {pillars.affect}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--lux-mint)", marginBottom: "4px" }}>
                    4. Can Lux help?
                  </h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {pillars.help}
                  </p>
                </div>
              </div>

              {/* Full Content */}
              <div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  {selectedStory.summary}
                </p>
                {selectedStory.content.map((p, idx) => (
                  <p key={idx} style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "16px" }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* LinkedIn Link */}
              {selectedStory.linkedinUrl && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    href={selectedStory.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--lux-cyan)",
                      textDecoration: "none",
                      border: "1px solid rgba(0, 212, 255, 0.2)",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      background: "rgba(0, 212, 255, 0.02)",
                    }}
                  >
                    View on LinkedIn ↗
                  </Link>
                </div>
              )}
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
              Select an intelligence story from the feed list.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
