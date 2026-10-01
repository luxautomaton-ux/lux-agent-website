import ProductGrid from "@/components/ProductGrid"

export const metadata = {
  title: "Products",
  description: "Explore the Lux Agent ecosystem: Desktop, USB, Memory Packs, Success Packs, Flow, Messages, Reader, Warm Connect, Verify, Agent Builder, Money Suite, and Viewer.",
}

export default function ProductsPage() {
  return (
    <main>
      <section className="page-hero office-products">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy">
          <p className="lux-eyebrow">THE LUX AGENT ECOSYSTEM</p>
          <h1>One AI workforce.<br /><span>Multiple ways to get work done.</span></h1>
          <p>Start with Lux Agent Desktop, add portable access, memory, playbooks, communication, automation, verification, and specialized business tools as you grow.</p>
        </div>
      </section>
      <section className="ecosystem-showcase">
        <div>
          <p className="lux-eyebrow">ONE ECOSYSTEM</p>
          <h2>The Lux Agent product family.</h2>
          <p>Desktop, portable access, AI tools, memory, workflow automation, verification, communication, and business systems—designed to work together.</p>
        </div>
        <img src="/lux-agent-website/brand/products/lux-ecosystem.webp" alt="Lux ecosystem product family" />
      </section>
      <section className="home-product-section">
        <div className="section-heading">
          <div><p className="lux-eyebrow">ALL PRODUCTS</p><h2>Build the Lux Agent setup that fits your work.</h2></div>
        </div>
        <ProductGrid />
      </section>
    </main>
  )
}
