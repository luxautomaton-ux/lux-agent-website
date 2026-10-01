import Link from "next/link"

export const metadata = { title: "How It Works" }

const steps = [
  ["Start with Lux Agent Desktop", "Install the main workspace on your Mac or Windows computer after the approved release is published."],
  ["Meet LANA", "Tell LANA about your business, priorities, working style, tools, and what you want the AI team to help accomplish."],
  ["Add context", "Connect files, Business HQ information, Memory Packs, and operating rules so the team can work with useful context."],
  ["Choose tools and packs", "Add Success Packs, workflows, communication, Reader, Warm Connect, Verify, and other Lux tools as needed."],
  ["Work with approvals", "Let Lux automate repeatable work while you stay in control of sensitive actions and final decisions."],
  ["Take Lux on the go", "When useful, create an optional Lux Agent USB travel environment on your own compatible drive."],
]

export default function HowItWorksPage() {
  return (
    <main>
      <section className="page-hero office-solutions">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy"><p className="lux-eyebrow">HOW LUX AGENT WORKS</p><h1>Context in. <span>Coordinated work out.</span></h1><p>Lux Agent learns how you work, gives LANA the right context, connects the right tools and agents, and keeps humans in the approval loop.</p></div>
      </section>
      <section className="product-story-grid">
        {steps.map(([title, body], i) => <article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{body}</p></article>)}
      </section>
      <section className="home-final-cta"><h2>See what Lux Agent can do.</h2><div className="home-actions"><Link className="lux-button primary" href="/features">Explore Features</Link><Link className="lux-button secondary" href="/products">Browse Products</Link></div></section>
    </main>
  )
}
