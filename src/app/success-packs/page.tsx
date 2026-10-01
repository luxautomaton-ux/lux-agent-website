import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SiteCTA, SiteHero } from '@/components/SitePageKit'
import { memoryBySlug, successPacks } from '@/lib/packData'

export const metadata = {
  title: 'Success Packs | Lux Agent USB',
  description: 'Browse featured Lux Agent Success Packs and use Build My Lux to choose from the complete 100-pack profession library.',
}

export default function SuccessPacksPage() {
  return (
    <main className="site-page">
      <SiteHero
        title="Success Packs teach LANA the profession."
        body="Choose the customer type, then LANA understands the language, workflows, daily needs, and best Memory Packs for that business."
        image="/lux-agent-website/generated-pages/success-packs-hero.png"
        primary={{ href: '/build', label: 'Build My Lux — Browse All 100' }}
        secondary={{ href: '/memory-packs', label: 'View Memory Packs' }}
        stats={[
          { value: '100', label: 'Success Packs' },
          { value: '4+', label: 'Memory matches' },
          { value: 'LANA', label: 'Profession guide' },
          { value: 'USB', label: 'Customer ready' },
        ]}
      />

      <section className="pack-library-section">
        <div className="site-section-head">
          <h2>20 featured Success Pack examples.</h2>
          <p>These are featured examples. Build My Lux contains the full 100-pack profession library and starts the customer setup with the Success Pack first.</p>
        </div>
        <div className="pack-library-grid">
          {successPacks.map(pack => (
            <Link
              key={pack.slug}
              href={`/success-packs/${pack.slug}`}
              className="pack-library-card"
              style={{ '--accent': pack.accent } as CSSProperties}
            >
              <img src={pack.image} alt={pack.title} />
              <div>
                <span>{pack.category}</span>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <small>
                  Memory match: {pack.recommendedMemory?.slice(0, 2).map(slug => memoryBySlug.get(slug)?.title.replace(' Memory Pack', '').replace(' Pack', '')).join(' + ')}
                </small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteCTA
        title="Success Packs become stronger with the right Memory Packs."
        body="Start with the profession, then add memory for sales, money, marketing, operations, research, and delivery."
        href="/build"
        label="Build My Lux"
      />
    </main>
  )
}
