import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"
import successCatalogData from "../../../../public/data/lux-success-packs-index.json"
import type { SuccessPackRecord } from "@/lib/customerSetup"
import SuccessPackLoadLink from "@/components/SuccessPackLoadLink"
import { successPackAccent, successPackImage, successPackSlug, successPackWhen, successPackWhy } from "@/lib/successPackVisual"

type Catalog = { count: number; packs: SuccessPackRecord[] }
const catalog = successCatalogData as Catalog

function getPack(id: string) {
  return catalog.packs.find(pack => pack.id === id || successPackSlug(pack) === id)
}

export function generateStaticParams() {
  return catalog.packs.map(pack => ({ slug: successPackSlug(pack) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getPack(slug)
  if (!pack) return {}

  return {
    title: `${pack.name} | Lux Agent Success Packs`,
    description: pack.oneLiner,
  }
}

export default async function SuccessPackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pack = getPack(slug)
  if (!pack) notFound()

  const image = successPackImage(pack)
  const accent = successPackAccent(pack.packNumber)
  const whenToUse = successPackWhen(pack)
  const whyItHelps = successPackWhy(pack)
  const firstPrompt = pack.starterPrompts[0]

  return (
    <main className="site-page success-blueprint-page" style={{ "--pack-accent": accent } as CSSProperties}>
      <section className="success-blueprint-hero">
        <div className="success-blueprint-hero-copy">
          <Link className="success-blueprint-back" href="/success-packs">← All Success Packs</Link>
          <div className="success-blueprint-kicker">
            <span>SUCCESS PACK #{String(pack.packNumber).padStart(3, "0")}</span>
            <span>{pack.category}</span>
          </div>
          <h1>{pack.name}</h1>
          <p className="success-blueprint-lede">{pack.oneLiner}</p>
          <div className="success-blueprint-hero-actions">
            <SuccessPackLoadLink className="site-btn primary" packId={pack.id}>Load This Success Pack</SuccessPackLoadLink>
            <Link className="site-btn secondary" href="/memory-packs">Add Memory Packs</Link>
          </div>
          <p className="success-blueprint-disclaimer">
            Success Packs organize your AI team and workflows. They improve structure and consistency; they do not guarantee revenue or business outcomes.
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
            <span>{pack.profession}</span>
            <strong>{pack.primaryOutcomes.slice(0, 2).join(" • ")}</strong>
          </div>
        </div>
      </section>

      <section className="success-blueprint-six">
        <article>
          <span>WHO</span>
          <h2>Who is this for?</h2>
          <p>Built for a {pack.profession} who wants a more organized way to use LANA and the Lux team.</p>
        </article>
        <article>
          <span>WHAT</span>
          <h2>What is it?</h2>
          <p>A profession-specific operating playbook that gives the team outcomes, workflows, starter prompts, and safety rules before the work begins.</p>
        </article>
        <article>
          <span>WHEN</span>
          <h2>When should you use it?</h2>
          <ul>{whenToUse.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>WHY</span>
          <h2>Why does it matter?</h2>
          <p>{whyItHelps}</p>
        </article>
        <article>
          <span>WHERE</span>
          <h2>Where does it work?</h2>
          <p>Use it with Lux Agent Desktop, Lux Agent USB, or a combined setup. Your Business HQ gives the pack company context; the pack gives the team profession context.</p>
        </article>
        <article>
          <span>HOW</span>
          <h2>How do you make it useful?</h2>
          <p>Complete Business HQ, load the pack, start with one clear outcome, let LANA route the work, review the result, and repeat the workflow until it becomes part of your normal operating rhythm.</p>
        </article>
      </section>

      <section className="success-blueprint-section">
        <div className="success-blueprint-section-head">
          <p className="lux-eyebrow">WHAT YOU ARE BUYING</p>
          <h2>A ready-made business operating starting point.</h2>
          <p>
            The pack is not another chatbot. It gives your existing Lux agents a shared playbook for the work this profession does most often.
          </p>
        </div>

        <div className="success-blueprint-outcomes">
          {pack.primaryOutcomes.map((outcome, index) => (
            <article key={outcome}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{outcome}</h3>
              <p>LANA can use this as a named outcome when she creates plans, assignments, checklists, and follow-up work for your team.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="success-blueprint-compare">
        <div className="success-compare-card without">
          <p className="lux-eyebrow">WITHOUT A SUCCESS PACK</p>
          <h2>Your agents are generalists.</h2>
          <ul>
            <li>LANA can still help, but she starts with general business context.</li>
            <li>You explain more of the profession, customer, workflow, and desired outcome in each request.</li>
            <li>The team has no single profession-specific workflow to start from.</li>
            <li>Useful prompts and repeatable routines depend more heavily on how much context you provide.</li>
            <li>Agents can solve individual tasks, but the work is less standardized across the team.</li>
          </ul>
        </div>

        <div className="success-compare-card with">
          <p className="lux-eyebrow">WITH THIS SUCCESS PACK</p>
          <h2>Your agents start with the same playbook.</h2>
          <ul>
            <li>LANA begins with the language and operating goals of a {pack.profession}.</li>
            <li>The team has named outcomes to plan around: {pack.primaryOutcomes.slice(0, 3).join(", ")}.</li>
            <li>Starter prompts give you immediate examples instead of a blank chat box.</li>
            <li>Workflows create a repeatable path from request → assignment → review → saved output.</li>
            <li>Safety rules remain attached to the pack, so speed does not replace approvals or professional review.</li>
          </ul>
        </div>
      </section>

      <section className="success-blueprint-section split">
        <div>
          <p className="lux-eyebrow">YOUR SUCCESS PATH</p>
          <h2>How to use this pack successfully.</h2>
          <ol className="success-blueprint-timeline">
            <li><span>1</span><div><strong>Complete Business HQ.</strong><p>Tell LANA what the business does, who it serves, where it operates, your offers, tone, rules, and current priorities.</p></div></li>
            <li><span>2</span><div><strong>Load the {pack.name}.</strong><p>Make this the active profession playbook so the whole team starts from the same operating context.</p></div></li>
            <li><span>3</span><div><strong>Choose one outcome first.</strong><p>Start with one measurable business problem instead of asking the team to improve everything at once.</p></div></li>
            <li><span>4</span><div><strong>Use the first 7-day plan.</strong><p>Ask LANA for a short action plan, then let her assign bounded work to the right teammates.</p></div></li>
            <li><span>5</span><div><strong>Save what works.</strong><p>Store useful outputs in Lux Vault/knowledge, add Memory Packs only when deeper reusable context would help.</p></div></li>
            <li><span>6</span><div><strong>Review every week.</strong><p>Keep the workflows that create value, improve the weak ones, and never treat AI output as proof of revenue or compliance.</p></div></li>
          </ol>
        </div>

        <div className="success-blueprint-first-chat">
          <p className="lux-eyebrow">START HERE</p>
          <h2>Your first chat.</h2>
          <blockquote>{firstPrompt}</blockquote>
          <p>Then pick one of these next prompts:</p>
          <div className="success-blueprint-prompts">
            {pack.starterPrompts.slice(1, 5).map(prompt => <p key={prompt}>{prompt}</p>)}
          </div>
        </div>
      </section>

      <section className="success-blueprint-section">
        <div className="success-blueprint-section-head">
          <p className="lux-eyebrow">WORKFLOWS INCLUDED</p>
          <h2>A simple operating rhythm the team can repeat.</h2>
        </div>
        <div className="success-blueprint-workflows">
          {pack.workflow.map((item, index) => (
            <article key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="success-blueprint-safety">
        <div>
          <p className="lux-eyebrow">SAFETY + TRUST</p>
          <h2>Move faster without pretending.</h2>
          <p>The pack gives the team structure, but it never turns drafts into facts or removes your approval boundaries.</p>
        </div>
        <ul>
          {pack.safetyRules.map(rule => <li key={rule}>{rule}</li>)}
        </ul>
      </section>

      <section className="success-blueprint-final">
        <div>
          <p className="lux-eyebrow">READY TO BUILD?</p>
          <h2>Load {pack.name} into Build My Lux.</h2>
          <p>It will be preselected when you return to the builder. Then add optional Memory Packs, review your team, choose Desktop or USB, and finish your setup.</p>
        </div>
        <SuccessPackLoadLink className="site-btn primary" packId={pack.id}>Load This Success Pack →</SuccessPackLoadLink>
      </section>
    </main>
  )
}
