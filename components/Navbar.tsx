"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { prefixPath } from "@/lib/prefix";

const PRODUCTS_ITEMS = [
  { href: "/products/lux-codex", name: "Lux Codex", icon: "🧠", desc: "The Core AI OS" },
  { href: "/products/lux-coder", name: "Lux Coder", icon: "💻", desc: "Developer Agent Terminal" },
  { href: "/products/lana", name: "LANA", icon: "🌌", desc: "Interactive AI Soul & Partner" },
  { href: "/products/lux-agent-usb", name: "Lux Agent USB", icon: "💾", desc: "Portable OS Hardware" },
  { href: "/products/lux-business", name: "Lux Business", icon: "🏢", desc: "All-in-One Enterprise Hub" },
  { href: "/products/lux-ai-kids", name: "Lux AI Kids", icon: "🌈", desc: "Kids AI Learning Platform" },
  { href: "/products/lux-tv", name: "Lux TV", icon: "▶", desc: "Video Network" },
  { href: "/products/lux-marketing-studio", name: "Lux Marketing Studio", icon: "◆", desc: "Campaign OS" },
  { href: "/products/luxwriteoff", name: "Lux WriteOff", icon: "💸", desc: "Tax & Expense Deduction OS" },
  { href: "/products/lux-budgeter", name: "Lux Budgeter", icon: "📈", desc: "Financial Scenario Forecaster" },
  { href: "/products/success-packs", name: "Success Packs", icon: "📦", desc: "Done-For-You Workflow Kits" },
];

const SOLUTIONS_ITEMS = [
  { href: "/solutions/lux-care-os", name: "Lux Care OS", icon: "🏥", desc: "Clinics & Care Providers" },
  { href: "/solutions/epic-electric", name: "Epic Electric", icon: "⚡", desc: "Electrical & Field Trade" },
  { href: "/solutions/inland-circle", name: "Inland Circle", icon: "🌐", desc: "Community & Nonprofit Ops" },
  { href: "/solutions/contractor-os", name: "Contractor OS", icon: "🛠️", desc: "Independent Field Operatives" },
  { href: "/solutions/creator-os", name: "Creator OS", icon: "🎨", desc: "Media Creators & Studios" },
  { href: "/solutions/small-business-os", name: "Small Business OS", icon: "🏬", desc: "Retail & Local Commerce" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"products" | "solutions" | null>(null);
  
  // Mobile accordion states
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  
  const pathname = usePathname();

  /* eslint-disable react-hooks/set-state-in-effect -- route changes intentionally reset transient navigation UI */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
    setMobileSolutionsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(6, 9, 19, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(108, 71, 255, 0.15)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src={prefixPath("/images/logo.png")}
            alt="Lux Automaton Logo"
            width={40}
            height={40}
            style={{
              borderRadius: "8px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(108, 71, 255, 0.3))",
            }}
          />
          <div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: "var(--text-primary)",
                lineHeight: 1,
                textTransform: "uppercase",
                fontFamily: "var(--font-display)",
              }}
            >
              Lux <span style={{ color: "var(--lux-cyan)" }}>Automaton</span>
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                marginTop: "2px",
                fontFamily: "var(--font-mono)",
              }}
            >
              The AI Operating System
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ alignItems: "center", gap: "4px" }}>
          {/* Home */}
          <Link
            href="/"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              border: pathname === "/" ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: pathname.startsWith("/products") ? "var(--lux-cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/products") ? "rgba(0, 212, 255, 0.06)" : "transparent",
                border: pathname.startsWith("/products") ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Products
              <span style={{ fontSize: "0.55rem", transition: "transform 0.2s", transform: activeDropdown === "products" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {activeDropdown === "products" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "12px",
                  width: "480px",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <div
                  style={{
                    background: "rgba(11, 15, 25, 0.98)",
                    border: "1px solid rgba(108, 71, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(108, 71, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    padding: "16px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {PRODUCTS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                      className="nav-dropdown-item"
                    >
                      <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }} className="nav-dropdown-item-title">
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "1px" }}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: pathname.startsWith("/solutions") ? "var(--lux-cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/solutions") ? "rgba(0, 212, 255, 0.06)" : "transparent",
                border: pathname.startsWith("/solutions") ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Solutions
              <span style={{ fontSize: "0.55rem", transition: "transform 0.2s", transform: activeDropdown === "solutions" ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {activeDropdown === "solutions" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  paddingTop: "12px",
                  width: "480px",
                  animation: "fadeIn 0.2s ease-out",
                }}
              >
                <div
                  style={{
                    background: "rgba(11, 15, 25, 0.98)",
                    border: "1px solid rgba(108, 71, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(108, 71, 255, 0.05)",
                    backdropFilter: "blur(20px)",
                    padding: "16px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                      className="nav-dropdown-item"
                    >
                      <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }} className="nav-dropdown-item-title">
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "1px" }}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Workshops */}
          <Link
            href="/workshops"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/workshops" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/workshops" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              border: pathname === "/workshops" ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Workshops
          </Link>

          <Link
            href="/lux-tv"
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/lux-tv" ? "#ffffff" : "var(--text-secondary)",
              background: pathname === "/lux-tv" ? "rgba(229, 9, 20, 0.85)" : "transparent",
              border: pathname === "/lux-tv" ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Lux TV
          </Link>

          <Link
            href="/lux-tv-kids"
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/lux-tv-kids" ? "#151040" : "var(--text-secondary)",
              background: pathname === "/lux-tv-kids" ? "#ffe45c" : "transparent",
              border: pathname === "/lux-tv-kids" ? "1px solid rgba(255, 228, 92, 0.35)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Kids TV
          </Link>

          {/* Ask LANA */}
          <Link
            href="/ask-lana"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/ask-lana" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/ask-lana" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              border: pathname === "/ask-lana" ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Ask LANA
          </Link>

          {/* News */}
          <Link
            href="/blog"
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname.startsWith("/blog") ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname.startsWith("/blog") ? "rgba(0, 212, 255, 0.06)" : "transparent",
              border: pathname.startsWith("/blog") ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Blog
          </Link>

          {/* Community */}
          <Link
            href="/community"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/community" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/community" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              border: pathname === "/community" ? "1px solid rgba(0, 212, 255, 0.15)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            Community
          </Link>

          {/* Lux AI Kids */}
          <Link
            href="/lux-ai-kids"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              color: pathname === "/lux-ai-kids" ? "#ffe45c" : "var(--text-secondary)",
              background: pathname === "/lux-ai-kids" ? "rgba(255, 228, 92, 0.08)" : "transparent",
              border: pathname === "/lux-ai-kids" ? "1px solid rgba(255, 228, 92, 0.3)" : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            AI Kids
          </Link>

          {/* Start Here highlighted CTA */}
          <Link
            href="/start-here"
            style={{
              marginLeft: "12px",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#0b0f19",
              background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)",
              boxShadow: "0 0 16px rgba(0, 212, 255, 0.25)",
              border: "none",
              transition: "all 0.2s ease",
            }}
          >
            Start Here
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            background: "transparent",
            border: "1px solid var(--border-subtle)",
            borderRadius: "6px",
            padding: "8px",
            cursor: "pointer",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "20px",
                height: "2px",
                background: mobileOpen && i === 1 ? "transparent" : "var(--lux-cyan)",
                borderRadius: "1px",
                transition: "all 0.2s ease",
                transform:
                  mobileOpen && i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : mobileOpen && i === 2
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(6, 9, 19, 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxHeight: "calc(100vh - 72px)",
            overflowY: "auto",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              display: "block",
            }}
          >
            Home
          </Link>

          {/* Products Mobile Accordion */}
          <div>
            <button
              onClick={() => setMobileProductsOpen((prev) => !prev)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: pathname.startsWith("/products") ? "var(--lux-cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/products") ? "rgba(0, 212, 255, 0.06)" : "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>Products</span>
              <span style={{ fontSize: "0.8rem", transition: "transform 0.2s", transform: mobileProductsOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {mobileProductsOpen && (
              <div style={{ paddingLeft: "16px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                {PRODUCTS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: pathname === item.href ? "var(--lux-cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Mobile Accordion */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((prev) => !prev)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: pathname.startsWith("/solutions") ? "var(--lux-cyan)" : "var(--text-secondary)",
                background: pathname.startsWith("/solutions") ? "rgba(0, 212, 255, 0.06)" : "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>Solutions</span>
              <span style={{ fontSize: "0.8rem", transition: "transform 0.2s", transform: mobileSolutionsOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </button>

            {mobileSolutionsOpen && (
              <div style={{ paddingLeft: "16px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: pathname === item.href ? "var(--lux-cyan)" : "var(--text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/workshops"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/workshops" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/workshops" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              display: "block",
            }}
          >
            Workshops
          </Link>

          <Link
            href="/lux-tv"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/lux-tv" ? "#ffffff" : "var(--text-secondary)",
              background: pathname === "/lux-tv" ? "rgba(229, 9, 20, 0.85)" : "transparent",
              display: "block",
            }}
          >
            Lux TV
          </Link>

          <Link
            href="/lux-tv-kids"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/lux-tv-kids" ? "#151040" : "var(--text-secondary)",
              background: pathname === "/lux-tv-kids" ? "#ffe45c" : "transparent",
              display: "block",
            }}
          >
            Kids TV
          </Link>

          <Link
            href="/ask-lana"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/ask-lana" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/ask-lana" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              display: "block",
            }}
          >
            Ask LANA
          </Link>

          <Link
            href="/blog"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname.startsWith("/blog") ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname.startsWith("/blog") ? "rgba(0, 212, 255, 0.06)" : "transparent",
              display: "block",
            }}
          >
            Blog
          </Link>

          <Link
            href="/community"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/community" ? "var(--lux-cyan)" : "var(--text-secondary)",
              background: pathname === "/community" ? "rgba(0, 212, 255, 0.06)" : "transparent",
              display: "block",
            }}
          >
            Community
          </Link>

          <Link
            href="/lux-ai-kids"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              color: pathname === "/lux-ai-kids" ? "#ffe45c" : "var(--text-secondary)",
              background: pathname === "/lux-ai-kids" ? "rgba(255, 228, 92, 0.08)" : "transparent",
              display: "block",
            }}
          >
            Lux AI Kids
          </Link>

          <Link
            href="/start-here"
            style={{
              marginTop: "8px",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "0.95rem",
              fontWeight: 700,
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
              color: "#0b0f19",
              background: "linear-gradient(135deg, var(--lux-cyan) 0%, var(--lux-mint) 100%)",
              display: "block",
            }}
          >
            Start Here
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .nav-dropdown-item:hover {
          background: rgba(108, 71, 255, 0.08) !important;
        }
        .nav-dropdown-item:hover .nav-dropdown-item-title {
          color: var(--lux-cyan) !important;
        }
        .desktop-nav {
          display: flex !important;
        }
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
