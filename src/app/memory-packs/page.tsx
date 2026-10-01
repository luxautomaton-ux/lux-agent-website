import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SiteCTA, SiteHero } from '@/components/SitePageKit'
import { memoryPacks } from '@/lib/packData'

export const metadata = {
  title: 'Memory Packs | Lux Agent USB',
  description: 'Browse featured Lux Agent Memory Packs and use Build My Lux to add from the complete 100-pack enhancement library.',
}

export default function MemoryPacksPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Memory Packs make LANA smarter."
        body="Memory Packs give LANA durable business knowledge: how the owner sells, markets, follows up, organizes files, delivers client work, manages money, and routes tasks."
        image="/lux-agent-website/generated-pages/memory-packs-hero.png"
        primary={{ href: '/build', label: 'Build My Lux — Browse All 100' }}
        secondary={{ href: '/success-packs', label: 'View Success Packs' }}
        stats={[
          { value: '100', label: 'Memory Packs' },
          { value: 'Core', label: 'Business brain' },
          { value: 'Agent', label: 'Routing help' },
          { value: 'Local', label: 'Saved context' },
        ]}
      />

      <section className="pack-library-section">
        <div className="site-section-head">
          <h2>20 featured Memory Pack examples.</h2>
          <p>These are featured examples. Build My Lux contains the full 100-pack enhancement library after the customer chooses a Success Pack.</p>
        </div>
        <div className="pack-library-grid">
          {memoryPacks.map(pack => (
            <Link
              key={pack.slug}
              href={`/memory-packs/${pack.slug}`}
              className="pack-library-card"
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <div>
                <span>{pack.category}</span>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <small>Pairs with: {pack.pairsWith?.slice(0, 3).join(', ')}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteCTA
        title="Memory turns one chat into a business brain."
        body="The right memory helps LANA remember the customer’s voice, workflows, files, offers, and daily operating patterns."
        href="/build"
        label="Build My Lux"
      />
    </main>
  )
}
