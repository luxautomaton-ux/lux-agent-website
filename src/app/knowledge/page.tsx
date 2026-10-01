import Link from "next/link"
import KnowledgeCenter from "@/components/KnowledgeCenter"

export const metadata = {
  title: "Knowledge Articles",
  description: "Search Lux Agent help articles for setup, Desktop, USB, Success Packs, Memory Packs, LANA, updates, troubleshooting, privacy, and support.",
}

export default function KnowledgePage() {
  return (
    <main>
      <section className="knowledge-hero">
        <div>
          <p className="lux-eyebrow">LUX KNOWLEDGE CENTER</p>
          <h1>Answers without the guesswork.</h1>
          <p>
            Search beginner-friendly walkthroughs, tips, troubleshooting, setup instructions,
            update guidance, and product education. Published articles from the Lux support team
            appear here automatically.
          </p>
          <div className="home-actions">
            <Link className="lux-button primary" href="/getting-started">I&apos;m New — Start Here</Link>
            <Link className="lux-button secondary" href="/support">Open Support</Link>
          </div>
        </div>
      </section>

      <section className="knowledge-section">
        <KnowledgeCenter />
      </section>
    </main>
  )
}
