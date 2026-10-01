import Link from "next/link"

export const metadata = { title: "Features" }

const features = [
  ["AI Team", "LANA coordinates specialist agents across research, communication, operations, technology, and business work."],
  ["Voice + Chat", "Talk or type naturally, ask questions, create drafts, plan work, and move from conversation to action."],
  ["Files + Knowledge", "Search, summarize, organize, and work with business files, documents, knowledge, and reusable context."],
  ["Workflows", "Automate repeatable tasks with visible steps, connected tools, approvals, and reusable operating recipes."],
  ["Memory", "Use Memory Packs and business context to help Lux Agent retain the information and operating rules that matter."],
  ["Approvals", "Keep human control over sensitive actions such as sending, publishing, purchasing, installing, or sharing."],
  ["Business Tools", "Connect practical tools for messages, reading, relationships, verification, money, and other business workflows."],
  ["Desktop + Travel", "Use the full Desktop environment at home or office and an optional portable USB companion when you travel."],
]

export default function FeaturesPage() {
  return (
    <main>
      <section className="page-hero office-products">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy"><p className="lux-eyebrow">LUX AGENT FEATURES</p><h1>A complete AI workspace <span>built around real work.</span></h1><p>Lux Agent combines people-like coordination, practical tools, memory, workflows, approvals, and connected software in one operating environment.</p><Link className="lux-button primary" href="/download">Get Lux Agent</Link></div>
      </section>
      <section className="solution-grid">
        {features.map(([title, body], i) => <article key={title}><span>0{i+1}</span><h2>{title}</h2><p>{body}</p></article>)}
      </section>
    </main>
  )
}
