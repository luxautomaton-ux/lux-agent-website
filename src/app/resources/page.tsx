import Link from "next/link"

const resources = [
  ["Getting Started", "Follow the beginner setup from Success Pack selection through download and installation.", "/getting-started"],
  ["Knowledge Articles", "Search step-by-step help for Desktop, USB, packs, updates, voice, privacy, and troubleshooting.", "/knowledge"],
  ["Support", "Open a customer support case or check the status of an existing case.", "/support"],
  ["Updates & What’s New", "See customer-facing release notes and the help articles connected to each update.", "/updates"],
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
