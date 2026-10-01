import Link from "next/link"
import { notFound } from "next/navigation"
import { CUSTOMER_KNOWLEDGE, getKnowledgeArticle } from "@/lib/customerKnowledge"

export function generateStaticParams() {
  return CUSTOMER_KNOWLEDGE.map(article => ({ id: article.id }))
}

export const dynamicParams = false

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getKnowledgeArticle(id)
  if (!article) notFound()

  const related = (article.related ?? [])
    .map(getKnowledgeArticle)
    .filter(Boolean)

  return (
    <main className="knowledge-article-page">
      <section className="knowledge-article-hero">
        <Link href="/knowledge">← Knowledge Center</Link>
        <span>{article.category}</span>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <small>Updated {article.updated}</small>
      </section>

      <section className="knowledge-article-content">
        <article className="knowledge-purpose">
          <h2>What this is for</h2>
          <p>{article.purpose}</p>
        </article>

        <article>
          <h2>Step-by-step</h2>
          <ol>
            {article.steps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="knowledge-tips">
          <h2>Tips</h2>
          <ul>{article.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
        </article>
      </section>

      {related.length > 0 && (
        <section className="knowledge-related">
          <h2>Related help</h2>
          <div>
            {related.map(item => item && (
              <Link href={"/knowledge/" + item.id} key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="knowledge-help-cta">
        <h2>Still need help?</h2>
        <p>Send the issue to Lux Support. Your case can be triaged by the customer-success team in Hermes Desktop.</p>
        <Link className="lux-button primary" href="/support">Submit a Support Case</Link>
      </section>
    </main>
  )
}
