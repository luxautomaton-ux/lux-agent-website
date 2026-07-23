"use client";

import { useState } from "react";
import { prefixPath } from "@/lib/prefix";

const INQUIRY_TYPES = [
  "General Question",
  "Sales Inquiry",
  "Partnership Inquiry",
  "Technical Support",
  "Press / Media",
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    inquiry: INQUIRY_TYPES[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire to /api/partners or a form backend (e.g., Resend, Formspree)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      {/* ── HERO ── */}
      <section
        className="circuit-grid"
        style={{
          padding: "80px 24px 100px",
          backgroundImage: `linear-gradient(to right, rgba(3, 5, 18, 0.92) 0%, rgba(3, 5, 18, 0.82) 60%, rgba(3, 5, 18, 0.55) 100%), url(${prefixPath("/images/page-hero-circuit.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "8%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: "24px", display: "inline-flex" }}>
            Get in Touch
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
              maxWidth: "600px",
            }}
          >
            Let&apos;s Build{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--blue-bright))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Something.
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}
          >
            Questions, partnerships, custom solutions — we read every message.
            Typical response within 24 hours.
          </p>
        </div>
      </section>

      <div className="neon-line" />

      {/* ── MAIN CONTENT ── */}
      <section
        className="circuit-grid"
        style={{ padding: "80px 24px 120px", background: "var(--bg-base)" }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "64px",
            position: "relative",
            zIndex: 1,
          }}
          className="contact-grid"
        >
          {/* Left — Contact Info */}
          <div>
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: "32px",
                letterSpacing: "-0.01em",
              }}
            >
              Ways to Connect
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                {
                  icon: "✉️",
                  label: "Email",
                  value: "hello@luxautomaton.com",
                  color: "var(--cyan)",
                },
                {
                  icon: "⚡",
                  label: "Sales",
                  value: "sales@luxautomaton.com",
                  color: "var(--blue-bright)",
                },
                {
                  icon: "🤝",
                  label: "Partnerships",
                  value: "partners@luxautomaton.com",
                  color: "var(--green)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card"
                  style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: item.color,
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 600 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div
              style={{
                marginTop: "40px",
                padding: "20px 24px",
                borderRadius: "10px",
                border: "1px solid var(--border-subtle)",
                background: "rgba(0, 229, 255, 0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div className="status-dot" />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--green)",
                  }}
                >
                  Team Online
                </span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                We typically respond within 24 hours on business days.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {status === "sent" ? (
              <div
                className="glass-card"
                style={{
                  padding: "64px",
                  textAlign: "center",
                  border: "1px solid rgba(0, 255, 136, 0.3)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✅</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "12px",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  We&apos;ll be in touch within 24 hours. Keep building.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card"
                style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Asa Pritchard"
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="hello@example.com"
                  />
                </div>

                <FormField
                  label="Company (optional)"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                />

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--cyan)",
                      marginBottom: "8px",
                    }}
                  >
                    Inquiry Type
                  </label>
                  <select
                    name="inquiry"
                    value={formState.inquiry}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--cyan)",
                      marginBottom: "8px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us what you need..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{
                    justifyContent: "center",
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "wait" : "pointer",
                  }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

function FormField({ label, name, value, onChange, required, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--cyan)",
          marginBottom: "8px",
        }}
      >
        {label} {required && <span style={{ color: "var(--cyan)" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)")}
        onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)")}
      />
    </div>
  );
}
