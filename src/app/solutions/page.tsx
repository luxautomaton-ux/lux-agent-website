import Link from "next/link"

const solutions = [
  ["Founders & Owners", "Daily planning, research, follow-up, documents, reports, and a clearer operating rhythm."],
  ["Sales & Customer Follow-Up", "Draft outreach, manage conversations, track next steps, and keep opportunities moving."],
  ["Marketing & Content", "Create campaigns, content plans, social assets, research, and repeatable publishing workflows."],
  ["Operations & Administration", "Turn recurring work into checklists, automations, approvals, files, and owner-ready reports."],
  ["Knowledge & Documents", "Read, summarize, search, organize, and turn documents into useful business context."],
  ["Desktop + Travel", "Use the full Lux Agent experience at home or office and take a portable companion on the road."],
]

export const metadata = { title: "Solutions" }

export default function SolutionsPage() {
  return (
    <main>
      <section className="page-hero office-solutions">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy">
          <p className="lux-eyebrow">REAL WORK · REAL RESULTS</p>
          <h1>Lux Agent is built around <span>what you are trying to get done.</span></h1>
          <p>Choose the business problem first. Lux Agent connects the right agents, tools, memory, workflows, and approvals around it.</p>
          <Link className="lux-button primary" href="/products">Explore Products</Link>
        </div>
      </section>
      <section className="solution-grid">
        {solutions.map(([title, body], index) => (
          <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p><Link href="/products">See the tools →</Link></article>
        ))}
      </section>
    </main>
  )
}
