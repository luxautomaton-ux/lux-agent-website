import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"
import memoryCatalogData from "../../../../public/data/lux-memory-packs-index.json"
import type { MemoryPackRecord } from "@/lib/customerSetup"
import MemoryPackLoadLink from "@/components/MemoryPackLoadLink"
import {
  memoryPackAccent,
  memoryPackDifference,
  memoryPackImage,
  memoryPackNumber,
  memoryPackSlug,
  memoryPackTeam,
  memoryPackWhen,
  memoryPackWhy,
} from "@/lib/memoryPackVisual"
import { getMemoryPack, memoryPacks as legacyMemoryPacks } from "@/lib/packData"

type Catalog = { count: number; packs: MemoryPackRecord[] }
const catalog = memoryCatalogData as Catalog

function getPack(id: string) {
  return catalog.packs.find(pack => pack.id === id || memoryPackSlug(pack) === id)
}

export function generateStaticParams() {
  const modern = catalog.packs.map(pack => ({ slug: memoryPackSlug(pack) }))
  const legacy = legacyMemoryPacks.map(pack => ({ slug: pack.slug }))
  const seen = new Set<string>()
  return [...modern, ...legacy].filter(item => {
    if (seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getPack(slug)
  if (pack) {
    return {
      title: pack.name + " | Lux Agent Memory Packs",
      description: pack.description + " Learn how this Memory Pack enhances an active Lux Agent Success Pack.",
    }
  }

  const legacy = getMemoryPack(slug)
  if (!legacy) return {}
  return {
    title: legacy.title + " | Lux Agent Memory Packs",
    description: legacy.summary,
  }
}

export default async function MemoryPackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getPack(slug)

  if (!pack) {
    const legacy = getMemoryPack(slug)
    if (!legacy) notFound()

    return (
      <main className="site-page pack-detail-page">
        <section className="pack-detail-hero" style={{ "--accent": legacy.accent } as CSSProperties}>
          <div>
            <Link href="/memory-packs">Memory Packs</Link>
            <h1>{legacy.title}</h1>
            <p>{legacy.summary}</p>
            <div className="pack-detail-actions">
              <Link href="/build?step=memory">Open Build My Lux</Link>
              <Link href="/success-packs">Match with Success Packs</Link>
            </div>
          </div>
          <img src={legacy.image} alt={legacy.title} />
        </section>
        <section className="pack-detail-columns">
          <div><h2>What it improves.</h2><ul>{legacy.outcomes.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h2>Workflows it remembers.</h2><ul>{legacy.workflows.map(item => <li key={item}>{item}</li>)}</ul></div>
        </section>
      </main>
    )
  }

  const image = memoryPackImage(pack)
  const accent = memoryPackAccent(pack)
  const number = memoryPackNumber(pack)
  const whenToUse = memoryPackWhen(pack)
  const whyItHelps = memoryPackWhy(pack)
  const difference = memoryPackDifference(pack)
  const team = memoryPackTeam(pack)
  const firstPrompt = pack.starter_prompts?.[0]

  return (
    <main className="site-page success-blueprint-page memory-blueprint-page" style={{ "--pack-accent": accent } as CSSProperties}>
      <section className="success-blueprint-hero">
        <div className="success-blueprint-hero-copy">
          <Link className="success-blueprint-back" href="/memory-packs">← All Memory Packs</Link>
          <div className="success-blueprint-kicker">
            <span>MEMORY PACK #{String(number).padStart(3, "0")}</span>
            <span>{pack.category}</span>
          </div>
          <h1>{pack.name}</h1>
          <p className="success-blueprint-lede">{pack.description}</p>
          <div className="success-blueprint-hero-actions">
            <MemoryPackLoadLink className="site-btn primary" packId={pack.id}>Add This Memory Pack</MemoryPackLoadLink>
            <Link className="site-btn secondary" href="/success-packs">Choose a Success Pack First</Link>
          </div>
          <p className="success-blueprint-disclaimer">
            Memory Packs enhance the context available to your Lux agents. They do not replace the active Success Pack, create guaranteed outcomes, or remove approval and professional-review requirements.
          </p>
        </div>

        <div className="success-blueprint-hero-art">
          <Image
            src={image}
            alt={pack.name}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <div className="success-blueprint-hero-shade" />
          <div className="success-blueprint-art-caption">
            <span>{pack.category}</span>
            <strong>Extra context + deeper comprehension for your active Success Pack</strong>
          </div>
        </div>
      </section>

      <section className="success-blueprint-six">
        <article>
          <span>WHO</span>
          <h2>Who benefits?</h2>
          <p>Customers who already have an active Success Pack and want their Lux team to understand this subject with more depth, continuity, and reusable context.</p>
        </article>
        <article>
          <span>WHAT</span>
          <h2>What is a Memory Pack?</h2>
          <p>A reusable knowledge layer that sits on top of the active Success Pack. The Success Pack teaches the team the profession and workflow; the Memory Pack adds deeper understanding around a specific subject.</p>
        </article>
        <article>
          <span>WHEN</span>
          <h2>When should you add it?</h2>
          <ul>{whenToUse.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>WHY</span>
          <h2>Why does it help?</h2>
          <p>{whyItHelps}</p>
        </article>
        <article>
          <span>WHERE</span>
          <h2>Where does it work?</h2>
          <p>Use it with Lux Agent Desktop, Lux Agent USB, or both. The same Memory Pack can support LANA and the specialist roles included in the customer setup.</p>
        </article>
        <article>
          <span>HOW</span>
          <h2>How does it pair with a Success Pack?</h2>
          <p>The Success Pack remains the active operating playbook. This Memory Pack becomes additional context the team can use while planning, writing, researching, routing, and reviewing work inside that playbook.</p>
        </article>
      </section>

      <section className="success-blueprint-section">
        <div className="success-blueprint-section-head">
          <p className="lux-eyebrow">WHAT THIS ADDS</p>
          <h2>More than a workflow: deeper understanding around the work.</h2>
          <p>
            Your Success Pack tells the agents what kind of business they are helping run. A Memory Pack gives them extra context they would not otherwise have as a reusable layer.
          </p>
        </div>

        <div className="memory-capability-grid">
          <article><span>01</span><h3>Comprehension</h3><p>The team has more background for interpreting requests instead of relying only on the current prompt.</p></article>
          <article><span>02</span><h3>Continuity</h3><p>Important subject context can stay available across related workflows rather than being re-explained every time.</p></article>
          <article><span>03</span><h3>Consistency</h3><p>LANA and specialist agents can work from the same extra layer instead of each making a different assumption.</p></article>
          <article><span>04</span><h3>Decision Support</h3><p>The team has a better frame for recommendations, planning, drafts, and follow-up while the customer keeps final approval.</p></article>
          <article><span>05</span><h3>Task Routing</h3><p>LANA can better understand which teammate should use the context and how it relates to the active Success Pack.</p></article>
          <article><span>06</span><h3>Reusable Knowledge</h3><p>The extra subject knowledge can support multiple tasks without changing the profession-specific Success Pack underneath it.</p></article>
        </div>
      </section>

      <section className="success-blueprint-compare">
        <div className="success-compare-card without">
          <p className="lux-eyebrow">SUCCESS PACK ALONE</p>
          <h2>The team has the operating playbook.</h2>
          <ul>{difference.without.map(item => <li key={item}>{item}</li>)}</ul>
        </div>

        <div className="success-compare-card with">
          <p className="lux-eyebrow">SUCCESS PACK + THIS MEMORY PACK</p>
          <h2>The playbook gains another layer of understanding.</h2>
          <ul>{difference.with.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="success-blueprint-section">
        <div className="success-blueprint-section-head">
          <p className="lux-eyebrow">WHO GETS SMARTER</p>
          <h2>How the shared memory helps the team.</h2>
          <p>These are the customer-facing Lux roles that can use this pack. The pack does not turn them into new agents; it gives the existing agents more relevant context for their own lanes.</p>
        </div>

        <div className="memory-agent-impact-grid">
          {team.map(agent => (
            <article key={agent.sourceName}>
              <span>{agent.displayName}</span>
              <p>{agent.impact}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="success-blueprint-section split">
        <div>
          <p className="lux-eyebrow">WHEN IT EARNS ITS PLACE</p>
          <h2>Useful ways this Memory Pack can help.</h2>
          <div className="memory-use-case-list">
            {(pack.use_cases || []).map((item, index) => (
              <article key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="success-blueprint-first-chat">
          <p className="lux-eyebrow">TRY IT WITH LANA</p>
          <h2>Your first Memory Pack prompt.</h2>
          {firstPrompt && <blockquote>{firstPrompt}</blockquote>}
          <p>Then try these:</p>
          <div className="success-blueprint-prompts">
            {(pack.starter_prompts || []).slice(1, 5).map(prompt => <p key={prompt}>{prompt}</p>)}
          </div>
        </div>
      </section>

      <section className="success-blueprint-safety">
        <div>
          <p className="lux-eyebrow">GUARDRAILS STAY ON</p>
          <h2>More context does not mean unlimited authority.</h2>
          <p>Memory helps the team understand more. It does not authorize the team to invent facts, send messages, publish, buy, delete, or make consequential decisions without the existing approval rules.</p>
        </div>
        <ul>{(pack.guardrails || []).map(rule => <li key={rule}>{rule}</li>)}</ul>
      </section>

      <section className="memory-pairing-explainer">
        <div>
          <p className="lux-eyebrow">THE SIMPLE WAY TO THINK ABOUT IT</p>
          <h2>Success Pack = what the team does. Memory Pack = what the team knows better.</h2>
          <p>
            The Success Pack gives LANA and the team the profession, outcomes, workflows, prompts, and operating rules. {pack.name} adds reusable subject knowledge that helps those same agents interpret the work with more context. They are designed to stack together—not compete with each other.
          </p>
        </div>
        <div className="memory-pair-formula" aria-label="Success Pack plus Memory Pack equals a stronger Lux Agent setup">
          <span>Success Pack</span><b>+</b><span>Memory Pack</span><b>=</b><strong>More capable Lux context</strong>
        </div>
      </section>

      <section className="success-blueprint-final">
        <div>
          <p className="lux-eyebrow">ADD THE EXTRA LAYER</p>
          <h2>Add {pack.short_name || pack.name} to Build My Lux.</h2>
          <p>If you already selected a Success Pack, that selection stays in place. This Memory Pack is added on top of it, then you can keep choosing optional Memory Packs before reviewing your team and install target.</p>
        </div>
        <MemoryPackLoadLink className="site-btn primary" packId={pack.id}>Add This Memory Pack →</MemoryPackLoadLink>
      </section>
    </main>
  )
}
