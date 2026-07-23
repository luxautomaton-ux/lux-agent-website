"use client";

import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";


const FOOTER_LINKS = {
  Products: [
    { label: "Lux Codex", href: "/products/lux-codex" },
    { label: "Lux Coder", href: "/products/lux-coder" },
    { label: "LANA", href: "/products/lana" },
    { label: "Lux Agent USB", href: "/products/lux-agent-usb" },
    { label: "Lux Business", href: "/products/lux-business" },
    { label: "Lux AI Kids", href: "/products/lux-ai-kids" },
    { label: "Lux TV", href: "/products/lux-tv" },
    { label: "Lux Marketing Studio", href: "/products/lux-marketing-studio" },
    { label: "Lux WriteOff", href: "/products/luxwriteoff" },
    { label: "Lux Budgeter", href: "/products/lux-budgeter" },
    { label: "Success Packs", href: "/products/success-packs" },
  ],
  Solutions: [
    { label: "Lux Care OS", href: "/solutions/lux-care-os" },
    { label: "Epic Electric", href: "/solutions/epic-electric" },
    { label: "Inland Circle", href: "/solutions/inland-circle" },
    { label: "Contractor OS", href: "/solutions/contractor-os" },
    { label: "Creator OS", href: "/solutions/creator-os" },
    { label: "Small Business OS", href: "/solutions/small-business-os" },
  ],
  Resources: [
    { label: "Lux AI Kids", href: "/lux-ai-kids" },
    { label: "Lux TV", href: "/lux-tv" },
    { label: "Lux TV Kids", href: "/lux-tv-kids" },
    { label: "Blog", href: "/blog" },
    { label: "Community", href: "/community" },
    { label: "Start Here", href: "/start-here" },
    { label: "Ask LANA", href: "/ask-lana" },
    { label: "Workshops Hub", href: "/workshops" },
    { label: "Problem Library", href: "/library" },
    { label: "Question Library", href: "/library" },
    { label: "Founder Story", href: "/founders" },
    { label: "Weekly Intelligence", href: "#newsletter" },
    { label: "Admin Studio", href: "/admin" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Business Registration", href: "https://www.bizapedia.com/or/lux-automaton-llc.html" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-void)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "64px 24px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background circuit grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.25))",
                }}
              >
                <Image
                  src={prefixPath("/images/logo.png")}
                  alt="Lux Automaton"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: "var(--text-primary)",
                    textTransform: "uppercase",
                  }}
                >
                  Lux <span style={{ color: "var(--cyan)" }}>Automaton</span>
                </div>
              </div>
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              Private AI systems for builders, founders, and small businesses.
              Automate smarter. Move faster. Own your stack.
            </p>
            <div
              style={{
                marginTop: "24px",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cyan)",
                fontWeight: 700,
              }}
            >
              Automate · Innovate · Accelerate
            </div>
            <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link
                href="https://www.youtube.com/channel/UCcYnAZw0QnS6dD1n-7vpwdA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "6px 12px",
                  borderRadius: "2px",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.color = "var(--cyan)";
                  e.currentTarget.style.background = "rgba(0, 229, 255, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                }}
              >
                <span style={{ color: "#ff0000" }}>▶</span> YouTube Channel
              </Link>
              <Link
                href="https://www.linkedin.com/company/lux-automaton-saas/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "6px 12px",
                  borderRadius: "2px",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.color = "var(--cyan)";
                  e.currentTarget.style.background = "rgba(0, 229, 255, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                }}
              >
                <span style={{ color: "#0a66c2", fontWeight: "bold" }}>in</span> LinkedIn Page
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--cyan)",
                  marginBottom: "20px",
                }}
              >
                {group}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Neon divider */}
        <div className="neon-line" style={{ marginBottom: "32px" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © {year} Lux Automaton LLC. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
            }}
          >
            <div className="status-dot" />
            All systems operational
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
