import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

export const metadata = {
  title: "Books by Asa Spade — Lux Automaton",
  description: "Explore the published works of Asa Spade, including 'AI Business Terms for Newbies', 'Find the Problem, Be the Solution', and 'Investing in Me'. Guides to business operations, problem-solving, and personal transformation.",
};

const BOOKS_DATA = [
  {
    title: "AI Business Terms for Newbies",
    subtitle: "Understanding AI Terminology & Systems",
    coverImage: "/images/book-cover-business-terms.jpg",
    description: "The essential primer for founders, managers, and builders who need to speak the language of modern AI systems without getting lost in technical jargon. Demystifies machine learning, LLMs, agents, and automation infrastructure.",
    accentColor: "var(--cyan)",
    gradient: "linear-gradient(135deg, #00e5ff 0%, #030512 100%)",
    amazonUrl: "https://www.amazon.com/AI-Business-Terms-Newbies-Understanding-ebook/dp/B0FXFHPTY9?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "Deconstructs complex AI terms into actionable business concepts",
      "Perfect for executive decision-makers and non-technical founders",
      "Covers agentic workflows, model types, tokenomics, and prompt design",
      "Includes real-world implementation playbooks"
    ]
  },
  {
    title: "Find the Problem, Be the Solution",
    subtitle: "Operational Frameworks for Builders",
    coverImage: "/images/book-cover-problem-solution.jpg",
    description: "A tactical guide to identifying system bottlenecks, operational inefficiencies, and workflow gaps in businesses. Learn how to design solutions, build automations, and establish repeatable playbooks that scale.",
    accentColor: "var(--orange)",
    gradient: "linear-gradient(135deg, #ff6b00 0%, #030512 100%)",
    amazonUrl: "https://www.amazon.com/Find-Problem-Be-Solution-Solutions-ebook/dp/B0FXPC7MXB?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "Root-cause analysis methodologies for modern operations",
      "How to convert chaos into structured system logic",
      "Frameworks for scoping, building, and launching automations",
      "Case studies of transformation in local contractor and service models"
    ]
  },
  {
    title: "Investing in Me",
    subtitle: "Your Transformation Ticket to Money & Freedom",
    coverImage: "/images/book-cover-invest-me.jpg",
    description: "A powerful perspective shift on personal development, capital allocation, and skill acquisition. Explores why investing in your own capabilities is the highest-leverage financial decision you can make.",
    accentColor: "var(--green)",
    gradient: "linear-gradient(135deg, #00ff88 0%, #030512 100%)",
    amazonUrl: "https://www.amazon.com/Investing-Me-Transformation-Ticket-Money-ebook/dp/B0FSHXJL9F?ref_=ast_author_dp_rw&th=1&psc=1&dib=eyJ2IjoiMSJ9.qjiQRGwzjsM4uZvsfw6RYBqVAOvIV6jEAFDqD_7dPULGjHj071QN20LucGBJIEps.EWW_Rv5o7fcVX4sGZreNX7S0rhCzfKkzioQJcWc_IR4&dib_tag=AUTHOR",
    bullets: [
      "The compound interest of compounding personal skills",
      "How to build a high-income digital skill portfolio",
      "Strategies for escaping operational plateaus",
      "Wealth-building frameworks that prioritize leverage over hours"
    ]
  }
];

export default function BooksPage() {
  return (
    <div
      style={{
        background: "var(--bg-void)",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Background neon grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Cybernetic Accent Glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 255, 136, 0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Typographic Brutalism Hero */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
            backgroundImage: `linear-gradient(to bottom, rgba(3, 5, 18, 0.65) 0%, rgba(3, 5, 18, 0.95) 100%), url(${prefixPath("/images/page-hero-waves.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
            padding: "60px 24px",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "16px",
              textShadow: "0 0 10px rgba(0, 229, 255, 0.3)",
            }}
          >
            FOUNDER WRITINGS & SYSTEM GUIDES
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              textTransform: "uppercase",
              margin: "0 auto 24px",
              maxWidth: "960px",
            }}
          >
            SYSTEMIZE YOUR MIND. <br />
            <span
              style={{
                background: "linear-gradient(90deg, var(--cyan) 0%, var(--green) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SCALE YOUR OPERATIONS.
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: "680px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Explore three foundational texts by Asa Spade mapping the mindset shifts, operational frameworks, and technological terms required to excel in the digital era.
          </p>

          <Link
            href="https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks?ccs_id=38f36404-7665-4be6-a20f-64ca320170d3"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "14px 28px",
            }}
          >
            Visit Amazon Author Store ↗
          </Link>
        </div>

        {/* Books List Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "96px",
          }}
        >
          {BOOKS_DATA.map((book, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={book.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "64px",
                  alignItems: "center",
                }}
                className="book-section"
              >
                {/* 3D CSS Interactive Book Cover Column */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    order: isEven ? 1 : 2,
                    perspective: "1000px", // Enables 3D context
                  }}
                  className="book-cover-container"
                >
                  <div
                    style={{
                      position: "relative",
                      width: "240px",
                      height: "360px",
                      transformStyle: "preserve-3d",
                      transform: "rotateY(-15deg) rotateX(10deg)",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer",
                    }}
                    className="book-3d"
                  >
                    {/* Front Cover */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "2px 8px 8px 2px",
                        transform: "translateZ(12px)",
                        boxShadow: "5px 5px 20px rgba(0,0,0,0.6)",
                        backfaceVisibility: "hidden",
                        zIndex: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={prefixPath(book.coverImage)}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="240px"
                      />
                    </div>

                    {/* Spine Panel */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: "-24px",
                        width: "24px",
                        background: "rgba(10, 15, 28, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRight: "none",
                        transform: "rotateY(-90deg) translateZ(0px)",
                        transformOrigin: "right center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          transform: "rotate(90deg)",
                          whiteSpace: "nowrap",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.6)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                      >
                        {book.title} — ASA SPADE
                      </div>
                    </div>

                    {/* Page Thickness Effect (Right side) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: "-10px",
                        width: "20px",
                        background: "linear-gradient(90deg, #d2d2d2 0%, #f4f4f4 50%, #b5b5b5 100%)",
                        border: "1px solid rgba(0,0,0,0.1)",
                        transform: "rotateY(90deg) translateZ(0px)",
                        transformOrigin: "left center",
                        backgroundImage: "repeating-linear-gradient(0deg, #e5e5e5, #e5e5e5 2px, #f5f5f5 2px, #f5f5f5 4px)",
                      }}
                    />

                    {/* Back Cover */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#080c16",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px 2px 2px 8px",
                        transform: "translateZ(-12px) rotateY(180deg)",
                        boxShadow: "-5px 5px 20px rgba(0,0,0,0.6)",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.6rem", lineHeight: 1.5 }}>
                        This text is part of the Lux Automaton knowledge catalog. Systemized instructions for high-performance operators.
                      </div>
                      <div style={{ fontSize: "0.7rem", color: book.accentColor, textAlign: "center" }}>
                        LUX AUTOMATON SYSTEMS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div
                  style={{
                    order: isEven ? 2 : 1,
                  }}
                  className="book-details"
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: book.accentColor,
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📘 SYSTEM CATALOG</span>
                    <span style={{ width: "4px", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "50%" }} />
                    <span>BOOK {index + 1}</span>
                  </div>

                  <h2
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight: 900,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {book.title}
                  </h2>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      marginBottom: "24px",
                    }}
                  >
                    {book.subtitle}
                  </div>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      marginBottom: "28px",
                    }}
                  >
                    {book.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "36px",
                    }}
                  >
                    {book.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <span style={{ color: book.accentColor, fontWeight: "bold", userSelect: "none" }}>◆</span>
                        <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <Link
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        padding: "12px 24px",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        borderColor: book.accentColor,
                        boxShadow: `0 0 15px ${book.accentColor}22`,
                      }}
                    >
                      Buy on Amazon ↗
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Author Store Banner */}
        <div
          style={{
            marginTop: "120px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(0, 229, 255, 0.15)",
            padding: "48px",
            borderRadius: "2px", // Sharp HUD corners
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0, 229, 255, 0.05)",
          }}
          className="store-banner"
        >
          {/* HUD Brackets */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "12px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "12px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "1px", height: "12px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "1px", background: "var(--cyan)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "12px", background: "var(--cyan)" }} />

          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            Access the Entire Catalog
          </h3>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              maxWidth: "540px",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            All paperback and digital formats are available directly on the Amazon Store. Acquire tools to support your team, scale your infrastructure, and refine your processes.
          </p>

          <Link
            href="https://www.amazon.com/stores/Asa-Spade/author/B0FXSJZW8Z/allbooks?ccs_id=38f36404-7665-4be6-a20f-64ca320170d3"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "12px 24px",
            }}
          >
            Open Amazon Author Store ↗
          </Link>
        </div>
      </div>

      {/* Page Styles for 3D rotation, transitions and responsive styling */}
      <style>{`
        .book-3d:hover {
          transform: rotateY(-35deg) rotateX(15deg) translateZ(10px) !important;
          box-shadow: 15px 15px 35px rgba(0, 0, 0, 0.8) !important;
        }
        @media (max-width: 992px) {
          .book-section {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .book-cover-container {
            order: 1 !important;
          }
          .book-details {
            order: 2 !important;
            text-align: center;
          }
          .book-details div {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
