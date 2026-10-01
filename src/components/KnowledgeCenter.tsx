"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { CUSTOMER_KNOWLEDGE, KNOWLEDGE_CATEGORIES } from "@/lib/customerKnowledge"

function getSupportApiBase() {
  const configured =
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API_URL ||
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API ||
    ""
  if (configured) return configured.replace(/\/$/, "")
  if (typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(window.location.hostname)) {
    return "http://Asas-Mac-mini.local:18789"
  }
  return ""
}

type LiveArticle = {
  id: string
  title: string
  summary: string
  body: string
  tags?: string[]
  product_area?: string
  created_at?: string
}

export default function KnowledgeCenter({ categoryOnly }: { categoryOnly?: string }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [liveArticles, setLiveArticles] = useState<LiveArticle[]>([])
  const [selectedLiveId, setSelectedLiveId] = useState("")
  const [liveSource, setLiveSource] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("article") || ""
    setSelectedLiveId(id)
  }, [])

  useEffect(() => {
    const api = getSupportApiBase()
    if (!api) return
    fetch(api + "/portal/knowledge?limit=100")
      .then(response => {
        if (!response.ok) throw new Error("Knowledge feed unavailable")
        return response.json()
      })
      .then(payload => {
        if (Array.isArray(payload?.articles)) {
          setLiveArticles(payload.articles)
          setLiveSource(true)
        }
      })
      .catch(() => {
        setLiveArticles([])
        setLiveSource(false)
      })
  }, [])

  const selectedLive = liveArticles.find(article => article.id === selectedLiveId)

  const staticArticles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CUSTOMER_KNOWLEDGE.filter(article => {
      const categoryMatch = categoryOnly
        ? article.category === categoryOnly
        : category === "All" || article.category === category
      const text = [article.title, article.summary, article.purpose, ...article.steps, ...article.tips]
        .join(" ")
        .toLowerCase()
      return categoryMatch && (!q || text.includes(q))
    })
  }, [query, category, categoryOnly])

  const filteredLive = useMemo(() => {
    const q = query.trim().toLowerCase()
    return liveArticles.filter(article => {
      const liveCategory = article.product_area || "Live Knowledge"
      const categoryMatch = categoryOnly
        ? liveCategory === categoryOnly
        : category === "All" || category === "Live Knowledge" || liveCategory === category
      const text = [article.title, article.summary, article.body, ...(article.tags || [])]
        .join(" ")
        .toLowerCase()
      return categoryMatch && (!q || text.includes(q))
    })
  }, [liveArticles, query, category, categoryOnly])

  if (selectedLive) {
    return (
      <div className="knowledge-center">
        <button className="knowledge-live-back" onClick={() => {
          setSelectedLiveId("")
          window.history.replaceState({}, "", window.location.pathname)
        }}>
          ← Back to Knowledge Center
        </button>
        <article className="knowledge-live-article">
          <span>{selectedLive.product_area || "Live Knowledge"}</span>
          <h1>{selectedLive.title}</h1>
          <p>{selectedLive.summary}</p>
          <div>{selectedLive.body}</div>
        </article>
      </div>
    )
  }

  const total = staticArticles.length + filteredLive.length

  return (
    <div className="knowledge-center">
      <div className="knowledge-source">
        <span className={liveSource ? "live" : ""} />
        {liveSource ? "Live Hermes Knowledge + built-in guides" : "Built-in customer guides"}
      </div>

      <div className="knowledge-search">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search: install, USB, updates, Flow, support…"
          aria-label="Search knowledge articles"
        />
        {!categoryOnly && (
          <select value={category} onChange={event => setCategory(event.target.value)}>
            {KNOWLEDGE_CATEGORIES.map(value => <option key={value}>{value}</option>)}
            {liveArticles.length > 0 && <option>Live Knowledge</option>}
          </select>
        )}
        <span>{total} article{total === 1 ? "" : "s"}</span>
      </div>

      {filteredLive.length > 0 && (
        <>
          <div className="knowledge-live-heading">
            <p className="lux-eyebrow">LATEST FROM LUX SUPPORT</p>
            <h2>Live Knowledge Articles</h2>
          </div>
          <div className="knowledge-grid live">
            {filteredLive.map(article => (
              <button
                key={article.id}
                className="knowledge-card"
                onClick={() => {
                  setSelectedLiveId(article.id)
                  window.history.replaceState({}, "", "?article=" + encodeURIComponent(article.id))
                }}
              >
                <span>{article.product_area || "Live Knowledge"}</span>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <small>{article.created_at ? new Date(article.created_at).toLocaleDateString() : "Published by Lux Support"}</small>
                <strong>Read live guide →</strong>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="knowledge-live-heading">
        <p className="lux-eyebrow">CORE GUIDES</p>
        <h2>Lux Agent Walkthroughs</h2>
      </div>
      <div className="knowledge-grid">
        {staticArticles.map(article => (
          <Link key={article.id} href={"/knowledge/" + article.id} className="knowledge-card">
            <span>{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <small>Updated {article.updated}</small>
            <strong>Read guide →</strong>
          </Link>
        ))}
      </div>

      {!total && (
        <div className="knowledge-empty">
          <h2>No article matched that search.</h2>
          <p>Try a simpler search, or submit a support case and tell us what you were trying to do.</p>
          <Link className="lux-button primary" href="/support">Contact Support</Link>
        </div>
      )}
    </div>
  )
}
