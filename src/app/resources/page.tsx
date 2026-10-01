import Link from "next/link"

const resources = [
  ["Getting Started", "Understand Desktop, USB, packs, agents, approvals, and the Lux operating model.", "/how-it-works"],
  ["Success Packs", "Explore profession-ready workflows, templates, training, and playbooks.", "/success-packs"],
  ["Memory Packs", "Build richer long-term context and reusable knowledge for your AI team.", "/memory-packs"],
  ["Product Guide", "Browse every current Lux Agent product and capability.", "/products"],
  ["Privacy", "See how Lux approaches data control, local-first workflows, and owner approval.", "/privacy"],
  ["Company", "Learn about Lux Agent and the Lux Automaton company behind it.", "/about"],
]

export const metadata = { title: "Resources" }

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-hero office-resources">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy"><p className="lux-eyebrow">RESOURCES</p><h1>Learn the system.<br /><span>Use it with confidence.</span></h1><p>Guides, product pages, packs, privacy information, and practical ways to understand how Lux Agent works.</p></div>
      </section>
      <section className="resource-grid">
        {resources.map(([title, body, href]) => <article key={title}><h2>{title}</h2><p>{body}</p><Link href={href}>Open resource →</Link></article>)}
      </section>
    </main>
  )
}
