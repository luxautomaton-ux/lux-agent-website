import Link from "next/link"

export const metadata = { title: "Company" }

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero office-company">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy"><p className="lux-eyebrow">LUX AGENT · BY LUX AUTOMATON</p><h1>Built to give people <span>more leverage, not more complexity.</span></h1><p>Lux Agent is the customer-facing AI workforce and business operating environment created by Lux Automaton. The product is designed around practical work, private control, human approvals, and a connected ecosystem of tools.</p></div>
      </section>
      <section className="company-grid">
        <article><h2>Lux Agent is the product.</h2><p>Desktop, USB, LANA, agents, packs, and connected tools make up the Lux Agent experience customers use.</p></article>
        <article><h2>Lux Automaton is the company behind it.</h2><p>Lux Automaton designs, builds, tests, and evolves the software, systems, workflows, and product ecosystem.</p></article>
        <article><h2>Local-first where it matters.</h2><p>The system is designed to keep business context and private information under customer control, using connected services only where appropriate.</p></article>
        <article><h2>Verification is part of the operating model.</h2><p>Lux treats testing, evidence, approvals, and release gates as part of building reliable AI software—not as an afterthought.</p></article>
      </section>
      <section className="home-final-cta"><h2>See the Lux Agent ecosystem.</h2><Link className="lux-button primary" href="/products">Explore Products</Link></section>
    </main>
  )
}
