import Link from "next/link"
import { LUX_PRODUCTS } from "@/lib/luxProducts"

export default function ProductGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? LUX_PRODUCTS.slice(0, limit) : LUX_PRODUCTS
  return (
    <div className="lux-product-grid">
      {items.map(product => (
        <article className="lux-product-card" key={product.slug}>
          <div className="lux-product-art">
            {product.image && <img src={product.image} alt={product.name + " product artwork"} />}
            <span className={"lux-status " + product.status.toLowerCase().replace(" ", "-")}>{product.status}</span>
          </div>
          <div className="lux-product-card-body">
            <p className="lux-eyebrow">{product.eyebrow}</p>
            <h3>{product.name}</h3>
            <p>{product.short}</p>
            <ul>
              {product.bullets.slice(0, 3).map(item => <li key={item}>{item}</li>)}
            </ul>
            <Link href={"/products/" + product.slug}>
              {product.status === "Coming Soon" ? "Preview" : "Learn more"} <span>→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
