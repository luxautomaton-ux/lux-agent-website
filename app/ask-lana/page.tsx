"use client";

import { useState } from "react";
import Link from "next/link";

interface ResultCard {
  title: string;
  type: "Product" | "Solution" | "Workshop" | "Library Guide";
  description: string;
  link: string;
  icon: string;
}

const PRESET_QUERIES = [
  { text: "I waste too much time on manual tasks", category: "productivity" },
  { text: "I need a CRM to manage clients", category: "sales" },
  { text: "Is my customer data safe with AI?", category: "security" },
  { text: "How to automate client invoicing?", category: "finance" },
  { text: "What is a private local model?", category: "technical" },
];

const SEARCH_DATABASE: { keywords: string[]; results: ResultCard[] }[] = [
  {
    keywords: ["time", "manual", "waste", "productivity", "workflows", "slow", "automate"],
    results: [
      {
        title: "LANA - The AI Operator",
        type: "Product",
        description: "Your proactive AI coordinator that executes workflows, builds SOP playbooks, and automates tasks directly.",
        link: "/products/lana",
        icon: "💜",
      },
      {
        title: "Build Your First AI Business",
        type: "Workshop",
        description: "Learn to deploy autonomous systems to coordinate outreach, run intake, and free up 15+ hours weekly.",
        link: "/workshops",
        icon: "🎓",
      },
      {
        title: "Success Packs & Business Recipes",
        type: "Solution",
        description: "DFY workflow maps, templates, and triggers to run administrative tasks automatically.",
        link: "/products/success-packs",
        icon: "📦",
      },
    ],
  },
  {
    keywords: ["crm", "client", "sales", "leads", "outreach", "pipeline", "deals"],
    results: [
      {
        title: "Lux Business Hub",
        type: "Product",
        description: "Run your entire pipeline: LLC setup, lead capture, CRM pipeline management, and payment triggers.",
        link: "/products/lux-business",
        icon: "🏢",
      },
      {
        title: "Contractor OS",
        type: "Solution",
        description: "A customized operations suite for job dispatch, estimate automation, and client feedback follow-ups.",
        link: "/solutions/contractor-os",
        icon: "🛠️",
      },
    ],
  },
  {
    keywords: ["data", "safe", "hipaa", "privacy", "secure", "gdpr", "local", "leak"],
    results: [
      {
        title: "Lux Codex neural OS",
        type: "Product",
        description: "Private local database engine that runs open-source LLMs locally, ensuring zero data leaves your network.",
        link: "/products/lux-codex",
        icon: "🧠",
      },
      {
        title: "Lux Care OS",
        type: "Solution",
        description: "A private, HIPAA-aware care operations system built for clinics, care programs, and patient support networks.",
        link: "/solutions/lux-care-os",
        icon: "🏥",
      },
      {
        title: "Why Local-First AI Matters",
        type: "Library Guide",
        description: "Understand the security pitfalls of standard cloud APIs and how non-custodial environments protect IP.",
        link: "/library",
        icon: "📖",
      },
    ],
  },
  {
    keywords: ["invoice", "tax", "billing", "writeoff", "expense", "budget", "finance", "deduction"],
    results: [
      {
        title: "Lux WriteOff",
        type: "Product",
        description: "AI-powered expense intelligence that scans receipts, auto-deducts write-offs, and prepares tax folders.",
        link: "/products/lux-writeoff",
        icon: "💰",
      },
      {
        title: "Lux Budgeter",
        type: "Product",
        description: "Interactive budgeting dashboard displaying business cash flow forecasts, variances, and milestones.",
        link: "/products/lux-budgeter",
        icon: "📊",
      },
    ],
  },
  {
    keywords: ["what", "local", "model", "llm", "how", "serverless", "non-custodial"],
    results: [
      {
        title: "AI Operating System Core Concepts",
        type: "Library Guide",
        description: "A NotebookLM-style guide explaining how private local servers can execute complex model queries offline.",
        link: "/library",
        icon: "📖",
      },
      {
        title: "Lux Coder Suite",
        type: "Product",
        description: "VS Code extension incorporating multi-model neural engines and offline wiki indexing for developers.",
        link: "/products/lux-coder",
        icon: "💻",
      },
    ],
  },
];

export default function AskLanaPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultCard[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const words = searchQuery.toLowerCase().split(/\s+/);
    const matchedResults: ResultCard[] = [];
    const seenTitles = new Set<string>();

    SEARCH_DATABASE.forEach((entry) => {
      const match = entry.keywords.some((kw) => words.some((word) => word.includes(kw) || kw.includes(word)));
      if (match) {
        entry.results.forEach((res) => {
          if (!seenTitles.has(res.title)) {
            seenTitles.add(res.title);
            matchedResults.push(res);
          }
        });
      }
    });

    setResults(matchedResults);
    setSearched(true);
  };

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
        position: "relative",
        overflow: "hidden",
      }}
      className="circuit-grid"
    >
      <div
        style={{
          maxWidth: "760px",
          width: "100%",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            LANA Intelligence Center
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: "16px",
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            What are you trying to <span className="gradient-text">solve today?</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.5 }}>
            Describe your business problem, security question, or automation challenge. LANA will locate the correct tool or guide.
          </p>
        </div>

        {/* Search Console */}
        <div
          style={{
            position: "relative",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.3rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </div>
          <input
            type="text"
            placeholder="Type your challenge (e.g. 'I waste too much time' or 'data security')..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(17, 24, 39, 0.7)",
              border: "1px solid var(--border-active)",
              borderRadius: "14px",
              padding: "18px 24px 18px 56px",
              fontSize: "1.05rem",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              outline: "none",
              boxShadow: "0 0 20px rgba(108, 71, 255, 0.05)",
              transition: "all 0.2s ease",
            }}
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Preset prompts */}
        {!searched && (
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
                fontFamily: "var(--font-mono)",
              }}
            >
              Common challenges to ask:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PRESET_QUERIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(item.text)}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "8px",
                    padding: "12px 18px",
                    color: "var(--text-secondary)",
                    textAlign: "left",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="hover:scale-101 hover:border-active"
                >
                  <span>{item.text}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--lux-cyan)", fontFamily: "var(--font-mono)" }}>
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results section */}
        {searched && (
          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--lux-cyan)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "20px",
                fontFamily: "var(--font-mono)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Search Results</span>
              <span>{results.length} system match{results.length !== 1 && "es"}</span>
            </div>

            {results.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {results.map((res, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(17, 24, 39, 0.5)",
                      border: "1px solid rgba(108, 71, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "20px 24px",
                      display: "flex",
                      gap: "20px",
                      alignItems: "flex-start",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:border-active"
                  >
                    <span style={{ fontSize: "2rem", flexShrink: 0 }}>{res.icon}</span>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                        <h3
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-display)",
                          }}
                        >
                          {res.title}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "10px",
                            background: "rgba(0, 212, 255, 0.08)",
                            color: "var(--lux-cyan)",
                            fontFamily: "var(--font-mono)",
                            textTransform: "uppercase",
                          }}
                        >
                          {res.type}
                        </span>
                      </div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "12px" }}>
                        {res.description}
                      </p>
                      <Link
                        href={res.link}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "var(--lux-cyan)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Explore Recommendation →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "rgba(17, 24, 39, 0.3)",
                  border: "1px dashed var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "48px 24px",
                  textAlign: "center",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }}>🌌</span>
                No specific matches. Try searching &quot;waste time&quot;, &quot;CRM&quot;, &quot;HIPAA&quot;, or &quot;invoices&quot;.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
