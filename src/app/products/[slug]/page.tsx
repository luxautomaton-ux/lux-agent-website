import Link from "next/link"
import { notFound } from "next/navigation"
import ProductGrid from "@/components/ProductGrid"
import { getLuxProduct, LUX_PRODUCTS } from "@/lib/luxProducts"

export function generateStaticParams() {
  return LUX_PRODUCTS.map(product => ({ slug: product.slug }))
}
export const dynamicParams = false

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getLuxProduct(slug)
  if (!product) notFound()

  return (
    <main>
      <section className="product-detail-hero">
        <div className="product-detail-bg" style={{ backgroundImage: "url('" + (product.hero || "/lux-agent-website/brand/office-executive.png") + "')" }} />
        <div className="product-detail-shade" />
        <div className="product-detail-copy">
          <p className="lux-eyebrow">{product.eyebrow}</p>
          <h1>{product.name}</h1>
          <h2>{product.short}</h2>
          <p>{product.description}</p>
          <div className="home-actions">
            {product.status !== "Coming Soon" ? <Link className="lux-button primary" href={product.primaryHref}>{product.primaryLabel}</Link> : <span className="lux-button disabled">Coming Soon</span>}
            <Link className="lux-button secondary" href="/products">All Products</Link>
          </div>
          <div className="product-bullets">
            {product.bullets.map(item => <span key={item}>✓ {item}</span>)}
          </div>
        </div>
        {product.image && <div className="product-detail-art"><img src={product.image} alt={product.name} /></div>}
      </section>

      <section className="product-story-grid">
        {product.sections.map((section, index) => (
          <article key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      {product.slug === "desktop" && (
        <section className="feature-media">
          <div>
            <p className="lux-eyebrow">LANA INSIDE LUX AGENT</p>
            <h2>The animated LANA experience stays part of the product story.</h2>
            <p>Voice, chat, planning, file work, tools, and agent coordination come together inside the Desktop experience.</p>
          </div>
          <video src="/lux-agent-website/aiMotion.mp4" autoPlay muted loop playsInline poster="/lux-agent-website/brand/lana-locked.png" />
        </section>
      )}

      <section className="related-products">
        <div className="section-heading"><div><p className="lux-eyebrow">KEEP BUILDING</p><h2>Connect it to the rest of Lux Agent.</h2></div></div>
        <ProductGrid limit={4} />
      </section>
    </main>
  )
}
