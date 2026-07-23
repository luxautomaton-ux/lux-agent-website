"use client";

import { useState } from "react";
import Link from "next/link";

interface QAPair {
  id: string;
  question: string;
  category: "Infrastructure" | "Automation" | "Privacy & Security" | "Ecosystem";
  answer: string;
  solutionPackHook?: string;
  relatedProduct?: {
    name: string;
    link: string;
  };
}

const QA_ITEMS: QAPair[] = [
  {
    id: "what-is-local-model",
    question: "What is a local model, and why should I run one?",
    category: "Infrastructure",
    answer: "A local model is an artificial intelligence model (like Llama-3 or Mistral) that runs directly on your own computer hardware or local office server, rather than on a third-party server (like OpenAI or Anthropic). Running models locally means your prompts, databases, and customer records never leave your physical machine, protecting your business data from leaks and harvesting. It also eliminates recurring API fees and works fully offline.",
    relatedProduct: { name: "Lux Codex neural OS", link: "/products/lux-codex" },
  },
  {
    id: "how-do-i-automate-business",
    question: "How do I automate my business operations without coding?",
    category: "Automation",
    answer: "You can automate business operations by deploying pre-configured system playbooks (we call them Success Packs). These packs map out the database triggers, pipeline transitions, and client messaging templates needed for specific industries. By connecting these playbooks with an AI Operator like LANA, the system runs your routines—monitoring calendars, drafting emails, updating CRMs—automatically using simple natural language rules.",
    solutionPackHook: "Explore our ready-to-deploy Success Packs catalog.",
  },
  {
    id: "is-customer-data-safe",
    question: "Is my customer and patient data safe with cloud-based AI?",
    category: "Privacy & Security",
    answer: "Generally, no. Standard cloud-based AI tools operate under terms of service that allow them to process your inputs on public servers and, in many cases, use your business interactions to train future models. For regulated industries like healthcare (HIPAA compliance), law, or financial services, sending patient notes or contracts to public cloud nodes is a violation. Private, non-custodial environments solve this by executing all calculations locally.",
    relatedProduct: { name: "Lux Care OS", link: "/solutions/lux-care-os" },
  },
  {
    id: "setup-offline-ai",
    question: "Do I need expensive hardware to set up offline AI systems?",
    category: "Infrastructure",
    answer: "No. Modern open-source models are highly optimized through quantization (compressing model sizes). A standard modern consumer laptop or office desktop computer can run lightweight, highly capable models for document analysis, coding, and scheduling with fast responses. For heavier enterprise multi-tenant pipelines, a single secure local server node is sufficient to power your entire team.",
    relatedProduct: { name: "Lux Agent USB", link: "/products/lux-agent-usb" },
  },
  {
    id: "what-is-success-pack",
    question: "What is a Success Pack and how does it integrate?",
    category: "Ecosystem",
    answer: "A Success Pack is a done-for-you package containing workflow maps, SOPs, pipeline templates, and automation scripts tailored to a specific business role (like contractors, nonprofit clinics, or creators). Once downloaded, they plug directly into your Lux Agent or local database, turning theoretical AI capabilities into pre-built, repeatable business systems from day one.",
    solutionPackHook: "Browse our active business templates.",
  },
];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(QA_ITEMS[0]?.id || null);

  const filteredQA = QA_ITEMS.filter((qa) => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          qa.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || qa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>
            Knowledgebase
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              marginBottom: "16px",
              fontFamily: "var(--font-display)",
            }}
          >
            Problem & <span className="gradient-text">Question Library</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.5 }}>
            A Stack Overflow / NotebookLM styled reference library addressing local AI setup, security compliance, and automation.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", fontSize: "1.2rem", pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Search problems, questions, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(17, 24, 39, 0.7)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "10px",
              padding: "14px 20px 14px 48px",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              fontFamily: "var(--font-body)",
              outline: "none",
            }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
          {["All", "Infrastructure", "Automation", "Privacy & Security", "Ecosystem"].map((cat) => (
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

        {/* Q&A Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredQA.length > 0 ? (
            filteredQA.map((qa) => {
              const isExpanded = expandedId === qa.id;
              return (
                <div
                  key={qa.id}
                  style={{
                    background: "rgba(17, 24, 39, 0.45)",
                    border: isExpanded ? "1px solid var(--border-active)" : "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                  }}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : qa.id)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          color: "var(--lux-mint)",
                          fontFamily: "var(--font-mono)",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {qa.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: isExpanded ? "var(--lux-cyan)" : "var(--text-primary)",
                          fontFamily: "var(--font-display)",
                          lineHeight: 1.3,
                        }}
                      >
                        {qa.question}
                      </h3>
                    </div>
                    <span style={{ fontSize: "1.2rem", color: "var(--text-muted)", transform: isExpanded ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                      ＋
                    </span>
                  </button>

                  {/* Accordion Content body */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: "0 24px 24px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                        animation: "slideDown 0.25s ease-out",
                      }}
                    >
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, paddingTop: "16px" }}>
                        {qa.answer}
                      </p>

                      {/* Hook/Product Links */}
                      {(qa.relatedProduct || qa.solutionPackHook) && (
                        <div
                          style={{
                            marginTop: "20px",
                            padding: "14px 18px",
                            background: "rgba(108, 71, 255, 0.04)",
                            border: "1px solid rgba(108, 71, 255, 0.1)",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "12px",
                          }}
                        >
                          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                            {qa.solutionPackHook || `Recommended Core Tool for this: ${qa.relatedProduct?.name}`}
                          </span>
                          {qa.relatedProduct ? (
                            <Link
                              href={qa.relatedProduct.link}
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: "var(--lux-cyan)",
                                textDecoration: "none",
                              }}
                            >
                              Explore Product →
                            </Link>
                          ) : (
                            <Link
                              href="/products/success-packs"
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: "var(--lux-mint)",
                                textDecoration: "none",
                              }}
                            >
                              Browse Success Packs →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
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
              No guides match your search term.
            </div>
          )}
        </div>

      </div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
