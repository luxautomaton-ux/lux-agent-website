import Link from "next/link"

export const metadata = { title: "Pricing" }

const offers = [
  ["Lux Agent Desktop", "Core software", "Main Mac/Windows AI workspace", "/download"],
  ["Lux Agent USB", "Travel companion", "Downloadable portable environment for your own compatible USB drive", "/products/usb"],
  ["Memory Packs", "Add-on", "Expandable business memory and reusable context", "/memory-packs"],
  ["Success Packs", "Add-on", "Industry and outcome-specific workflows, templates, and training", "/success-packs"],
]

export default function PricingPage() {
  return (
    <main>
      <section className="page-hero office-pricing">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy"><p className="lux-eyebrow">SIMPLE PRODUCT PATHS</p><h1>Start with Desktop.<br /><span>Add what your work needs.</span></h1><p>The refreshed Lux Agent model is software-first and subscription-ready. Physical founder-edition hardware can remain a limited premium option without making shipping the core business.</p></div>
      </section>
      <section className="pricing-grid">
        {offers.map(([title, type, body, href]) => <article key={title}><span>{type}</span><h2>{title}</h2><p>{body}</p><Link className="lux-button secondary" href={href}>Learn more</Link></article>)}
      </section>
      <section className="pricing-note"><h2>Launch pricing will be published with the approved release.</h2><p>This build intentionally avoids presenting old physical-USB prices as the current Lux Agent commercial model.</p></section>
    </main>
  )
}
