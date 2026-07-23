"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

interface Message {
  id: string;
  sender: "user" | "lana";
  text: string;
  timestamp: Date;
}

function generateId(): string {
  return Math.random().toString(36).substring(7);
}

function createMessage(sender: "user" | "lana", text: string): Message {
  return {
    id: generateId(),
    sender,
    text,
    timestamp: new Date(),
  };
}

function getInitialMessages(): Message[] {
  return [
    {
      id: "welcome",
      sender: "lana",
      text: "Hello! I'm Lana, your Lux Automaton Customer Service Assistant. How can I help you today? You can ask me about our products, solutions, custom options, or Asa Spade's books!",
      timestamp: new Date(),
    },
  ];
}

export default function LanaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Show welcome tooltip after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage = createMessage("user", textToSend);

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowTooltip(false);

    // Simulate Lana typing and responding
    setTimeout(() => {
      const lanaResponseText = getLanaResponse(textToSend);
      const lanaMessage = createMessage("lana", lanaResponseText);
      setMessages((prev) => [...prev, lanaMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getLanaResponse = (input: string): string => {
    const text = input.toLowerCase();

    // Books matching
    if (
      text.includes("book") ||
      text.includes("author") ||
      text.includes("asa") ||
      text.includes("spade") ||
      text.includes("write") ||
      text.includes("read") ||
      text.includes("investing") ||
      text.includes("business terms") ||
      text.includes("problem")
    ) {
      return "I can definitely help you with Asa Spade's books! He has authored three notable guides:\n\n1. **AI Business Terms for Newbies** — Explaining advanced AI concepts in simple language.\n2. **Find the Problem, Be the Solution** — Operational frameworks for problem-solving.\n3. **Investing in Me** — High-impact personal development and growth strategies.\n\nYou can explore them all on our [Books Page](/books) or visit his [Amazon Author Store](https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks).";
    }

    // Lux Coder matching
    if (text.includes("coder") || text.includes("lux coder")) {
      return "Lux Coder is our premium AI coding suite. It is designed to help builders and developers turn concepts into functional codebases. \n\nCheck out the [Lux Coder details](/products/lux-coder) or explore the live platform at [Lux Coder Live](https://luxautomaton-ux.github.io/lux-coder-website).";
    }

    // Lux Agent matching
    if (text.includes("agent") || text.includes("lux agent")) {
      if (text.includes("usb")) {
        return "The Lux Agent USB is our portable hardware option that runs offline-first local AI operations. Read more on the [Lux Agent USB page](/products/lux-agent-usb).";
      }
      return "Lux Agent is your personal AI operational assistant. It connects to your files and workflows. You can read details on the [Lux Agent page](/products/lux-agent) or visit the live app at [Lux Agent Live](https://luxautomaton-ux.github.io/lux-agent-website).";
    }

    // Lux Care OS matching
    if (text.includes("care") || text.includes("care os")) {
      return "Lux Care OS is our operational suite for clinic management and team coordination. It integrates SOPs and workflows to reduce admin load. Read details on the [Lux Care OS page](/solutions/lux-care-os) or view the [Live Site](https://luxautomaton-ux.github.io/lux-care-os-website).";
    }

    // Inland Circle matching
    if (text.includes("inland") || text.includes("circle") || text.includes("program") || text.includes("program o")) {
      return "Inland Circle Program OS (Program O) is built specifically for nonprofit and community operations, managing volunteer coordination and participant intake. Read more on the [Inland Circle Program OS page](/solutions/inland-circle-program-o).";
    }

    // Epic Electric matching
    if (text.includes("electric") || text.includes("epic")) {
      return "Epic Electric is our contractor-focused business system. It manages leads, schedules, quotes, and checkouts directly in the field. Learn more on the [Epic Electric page](/solutions/epic-electric).";
    }

    // Lux WriteOff matching
    if (text.includes("writeoff") || text.includes("expense") || text.includes("tax")) {
      return "Lux WriteOff organizes expense intelligence using smart classification. Read about it on the [Lux WriteOff page](/products/luxwriteoff). *Note: This is an organization tool and does not replace professional tax advice.*";
    }

    // Lux Budgeter matching
    if (text.includes("budget") || text.includes("budgeter")) {
      return "Lux Budgeter provides structured cash-flow planning tools for small businesses. Read about it on the [Lux Budgeter page](/products/lux-budgeter).";
    }

    // Success Packs matching
    if (text.includes("pack") || text.includes("packs") || text.includes("success")) {
      return "Success Packs are templates and playbooks that install custom operational systems into your business fast. Check out [Success Packs](/products/success-packs) for more info.";
    }

    // YouTube matching
    if (text.includes("youtube") || text.includes("channel") || text.includes("video") || text.includes("walkthrough") || text.includes("stream")) {
      return "You can check out our walk-through videos and system demos on our [YouTube Channel](https://www.youtube.com/channel/UCcYnAZw0QnS6dD1n-7vpwdA)! We post guide videos for Lux Coder, Lux Agent, and our custom solutions.";
    }

    // LinkedIn matching
    if (text.includes("linkedin") || text.includes("social") || text.includes("company page") || text.includes("linkedin page")) {
      return "Join our professional community and follow our updates on our [LinkedIn Page](https://www.linkedin.com/company/lux-automaton-saas/)!";
    }

    // Business info matching
    if (text.includes("business") || text.includes("llc") || text.includes("corporation") || text.includes("legal entity") || text.includes("registration") || text.includes("bizapedia")) {
      return "Lux Automaton is officially registered as **Lux Automaton LLC** in the state of Oregon. You can view our public corporate record on our [Business Registration profile](https://www.bizapedia.com/or/lux-automaton-llc.html).";
    }

    // Team / Founder matching
    if (text.includes("founder") || text.includes("team") || text.includes("pritchard") || text.includes("dooley") || text.includes("torrey") || text.includes("partner")) {
      return "Lux Automaton is led by founder **Asa Pritchard** and partner **Torrey Dooley**. You can view their profiles on our home page or visit their LinkedIn profiles:\n- [Asa Pritchard (Founder)](https://www.linkedin.com/in/asapritchard/)\n- [Torrey Dooley (Partner)](https://www.linkedin.com/in/torrey-dooley-bsn-rn-b43a5038/)";
    }

    // Pricing matching
    if (text.includes("price") || text.includes("pricing") || text.includes("cost") || text.includes("pay")) {
      return "We support custom system deployments based on your team size and operational complexity. You can learn more or request a custom setup on the [Contact page](/contact).";
    }

    // Lana matching
    if (text.includes("lana") || text.includes("who are you")) {
      return "I'm Lana, the virtual assistant here at Lux Automaton. I guide clients through our product catalogs, custom solutions, and books. How can I help you today?";
    }

    // Fallback
    return "I want to make sure I give you the best information. Feel free to ask about our **products** (Lux Coder, Lux Agent, WriteOff), **solutions** (Care OS, Epic Electric, Program OS), or **Asa's books**. You can also reach out directly on our [Contact page](/contact).";
  };

  const renderMessageText = (text: string) => {
    // A simple parser that handles bold and links
    // Replace markdown formatting with react elements
    const formattedText = text.split("\n").map((line, lineIdx) => {
      const lineParts: React.ReactNode[] = [];
      let tempIndex = 0;
      
      // Parse links and bold within this line
      const cleanLine = line;
      let lineMatch;
      
      // We will do a regex match for links first
      const itemRegex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
      
      while ((lineMatch = itemRegex.exec(cleanLine)) !== null) {
        const matchStart = lineMatch.index;
        
        if (matchStart > tempIndex) {
          lineParts.push(cleanLine.substring(tempIndex, matchStart));
        }

        if (lineMatch[0].startsWith("**")) {
          // Bold
          lineParts.push(
            <strong key={`bold-${lineIdx}-${matchStart}`} style={{ color: "var(--text-primary)", fontWeight: 700 }}>
              {lineMatch[2]}
            </strong>
          );
        } else {
          // Link
          const href = lineMatch[4];
          const isExternal = href.startsWith("http");
          lineParts.push(
            <Link
              key={`link-${lineIdx}-${matchStart}`}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                color: "var(--cyan)",
                textDecoration: "underline",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cyan)")}
            >
              {lineMatch[3]}
            </Link>
          );
        }
        tempIndex = itemRegex.lastIndex;
      }
      
      if (tempIndex < cleanLine.length) {
        lineParts.push(cleanLine.substring(tempIndex));
      }

      return (
        <p key={`line-${lineIdx}`} style={{ margin: "0 0 8px 0", lineHeight: 1.5 }}>
          {lineParts.length > 0 ? lineParts : cleanLine}
        </p>
      );
    });

    return formattedText;
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div
            style={{
              background: "rgba(6, 11, 20, 0.95)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              borderRadius: "2px",
              padding: "10px 14px",
              maxWidth: "220px",
              fontSize: "0.8rem",
              color: "var(--text-primary)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 229, 255, 0.1)",
              backdropFilter: "blur(12px)",
              position: "relative",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "0.7rem",
              }}
            >
              ✕
            </button>
            <div style={{ fontWeight: 700, color: "var(--cyan)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%", display: "inline-block" }}></span>
              Lana Online
            </div>
            <div>Hi! Ask me anything about our AI systems, solutions, or Asa&apos;s books.</div>
          </div>
        )}

        {/* Floating Avatar Trigger */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowTooltip(false);
          }}
          aria-label="Toggle Support Chat"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--bg-void)",
            border: isOpen ? "2px solid var(--cyan)" : "2px solid rgba(0, 229, 255, 0.4)",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            boxShadow: isOpen 
              ? "0 0 25px rgba(0, 229, 255, 0.4)" 
              : "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 229, 255, 0.15)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            padding: 0,
            outline: "none",
          }}
          className="lana-trigger-btn"
        >
          <Image
            src={prefixPath("/images/lana.png")}
            alt="Lana Support Specialist"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.3s",
            }}
            sizes="64px"
          />
          {/* Pulse Indicator */}
          {!isOpen && (
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "12px",
                height: "12px",
                background: "var(--green)",
                borderRadius: "50%",
                border: "2px solid var(--bg-void)",
                boxShadow: "0 0 8px var(--green)",
                zIndex: 2,
              }}
            />
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "380px",
            height: "520px",
            background: "rgba(6, 11, 20, 0.96)",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            borderRadius: "2px", // Sharp HUD corners
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 255, 0.05)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            animation: "dialogSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Tech HUD corner details */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "10px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "10px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "10px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "10px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "10px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "10px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "10px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "10px", background: "var(--cyan)" }} />

          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid rgba(0, 229, 255, 0.15)",
              background: "rgba(3, 5, 18, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid var(--cyan)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={prefixPath("/images/lana.png")}
                  alt="Lana Avatar"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="40px"
                />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  Lana
                  <span style={{ width: "6px", height: "6px", background: "var(--green)", borderRadius: "50%", display: "inline-block" }}></span>
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Ecosystem Specialist
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                width: "28px",
                height: "28px",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--cyan)";
                e.currentTarget.style.color = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              background: "rgba(3, 5, 18, 0.4)",
            }}
          >
            {messages.map((msg) => {
              const isLana = msg.sender === "lana";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isLana ? "flex-start" : "flex-end",
                    maxWidth: "85%",
                    alignSelf: isLana ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      background: isLana ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 229, 255, 0.08)",
                      border: isLana ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 229, 255, 0.2)",
                      borderRadius: "2px",
                      padding: "10px 14px",
                      color: isLana ? "var(--text-secondary)" : "var(--text-primary)",
                      fontSize: "0.85rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {isLana ? renderMessageText(msg.text) : msg.text}
                  </div>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--text-muted)",
                      marginTop: "4px",
                      padding: "0 4px",
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "2px",
                  padding: "10px 14px",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "4px" }}>Lana is typing</span>
                <span className="dot" style={{ width: "4px", height: "4px", background: "var(--cyan)", borderRadius: "50%", animation: "bounce 1.4s infinite 0s" }}></span>
                <span className="dot" style={{ width: "4px", height: "4px", background: "var(--cyan)", borderRadius: "50%", animation: "bounce 1.4s infinite 0.2s" }}></span>
                <span className="dot" style={{ width: "4px", height: "4px", background: "var(--cyan)", borderRadius: "50%", animation: "bounce 1.4s infinite 0.4s" }}></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Options */}
          <div
            style={{
              padding: "10px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              background: "rgba(3, 5, 18, 0.6)",
            }}
          >
            {[
              { label: "💡 Products", query: "Tell me about Lux products" },
              { label: "🏥 Solutions", query: "What client solutions do you offer?" },
              { label: "📚 Books Page", query: "Where are Asa Spade's books?" },
              { label: "✉️ Custom Setups", query: "How do custom setups work?" },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(btn.query)}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "2px",
                  padding: "6px 10px",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.background = "rgba(0, 229, 255, 0.03)";
                  e.currentTarget.style.color = "var(--cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(0, 229, 255, 0.15)",
              background: "rgba(3, 5, 18, 0.9)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Lana about systems, books, custom setups..."
              style={{
                flex: 1,
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "2px",
                padding: "8px 12px",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
            <button
              type="submit"
              style={{
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid var(--cyan)",
                borderRadius: "2px",
                padding: "8px 16px",
                color: "var(--cyan)",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--cyan)";
                e.currentTarget.style.color = "var(--bg-void)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 229, 255, 0.1)";
                e.currentTarget.style.color = "var(--cyan)";
              }}
            >
              SEND
            </button>
          </form>
        </div>
      )}

      {styleTag}
    </>
  );
}

// Inline responsive keyframes & animations
const styleTag = (
  <style>{`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes dialogSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .lana-trigger-btn:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 6px 25px rgba(0, 229, 255, 0.3);
    }
    .lana-trigger-btn:active {
      transform: scale(0.95);
    }
  `}</style>
);
