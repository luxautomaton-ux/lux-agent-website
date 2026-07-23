import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NEWS_STORIES } from "@/lib/news";
import { prefixPath } from "@/lib/prefix";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return NEWS_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = NEWS_STORIES.find((s) => s.slug === slug);
  if (!story) return {};

  return {
    title: `${story.title} | Lux Automaton Dispatch`,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = NEWS_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", background: "var(--bg-void)" }} className="circuit-grid">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: "32px", position: "relative", zIndex: 1 }}>
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--cyan)",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
            className="hover:underline"
          >
            ← Back to all updates
          </Link>
        </div>

        {/* Article Header */}
        <header style={{ marginBottom: "40px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--cyan)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {story.category}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{story.date}</span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>•</span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                background: "rgba(0, 229, 255, 0.1)",
                color: "var(--cyan)",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 229, 255, 0.2)",
              }}
            >
              {story.source}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            {story.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              marginBottom: "32px",
            }}
          >
            {story.subtitle}
          </p>

          {/* Author info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ position: "relative", width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              <Image
                src={prefixPath(story.author.image)}
                alt={story.author.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem" }}>{story.author.name}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{story.author.role}</div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "450px",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            zIndex: 1,
            background: "rgba(2, 4, 8, 0.4)",
          }}
        >
          <Image
            src={prefixPath(story.image)}
            alt={story.title}
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Article Body */}
        <article
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {story.content.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "24px" }}>
              {paragraph}
            </p>
          ))}
        </article>

        {/* LinkedIn Engagement Widget */}
        <div
          style={{
            padding: "32px",
            marginBottom: "48px",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
          className="glass-card"
        >


          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px" }}>
            Join the conversation on LinkedIn
          </h3>
          <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.5 }}>
            This article was compiled from updates posted to our official feeds. Jump over to LinkedIn to share your thoughts, ask questions, or connect with us directly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <a
              href={story.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, var(--cyan) 0%, var(--blue) 100%)",
                color: "var(--bg-void)",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.25)",
                transition: "all 0.2s ease",
              }}
              className="hover:opacity-90 hover:scale-[1.01]"
            >
              Discuss on LinkedIn ↗
            </a>
            
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "13px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              className="hover:border-[var(--cyan)] hover:bg-[rgba(0,229,255,0.02)]"
            >
              All Articles
            </Link>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div
          style={{
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid var(--border-subtle)",
            background: "linear-gradient(135deg, rgba(10,18,32,0.6) 0%, rgba(6,11,20,0.8) 100%)",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Subtle radial glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle at center, rgba(0, 255, 136, 0.08) 0%, transparent 70%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div style={{ maxWidth: "500px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "10px" }}>
                Ready to deploy custom AI systems?
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>
                Let&apos;s build secure, private, and localized workflows for your business operations. Book a diagnostic and onboarding call today.
              </p>
            </div>
            <div>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--green)",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(0,255,136,0.25)",
                  transition: "all 0.2s ease",
                }}
                className="hover:opacity-90 whitespace-nowrap"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
