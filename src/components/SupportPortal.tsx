"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"

type CreatedCase = {
  id: string
  status: string
  assigned_to?: string
  subject: string
}

type CaseStatus = {
  id: string
  category: string
  subject: string
  status: string
  priority: number
  assigned_to?: string
  created_at: string
  updated_at: string
}

const categories = [
  ["how_to", "How do I…?"],
  ["onboarding", "Setup / Onboarding"],
  ["desktop", "Lux Agent Desktop"],
  ["usb", "Lux Agent USB"],
  ["success_pack", "Success Pack"],
  ["memory_pack", "Memory Pack"],
  ["access", "Login / Access"],
  ["billing", "Billing"],
  ["bug", "Something is broken"],
  ["integration", "Connection / Integration"],
  ["feature_request", "Feature request"],
  ["other", "Other"],
]

const DEFAULT_SUPPORT_API = "https://lux-agent-api-337560675313.us-west1.run.app"

function supportApiBase() {
  if (typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(window.location.hostname)) {
    return "http://10.0.0.114:18789"
  }
  const configured =
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API_URL ||
    process.env.NEXT_PUBLIC_LUX_SUPPORT_API ||
    DEFAULT_SUPPORT_API
  return configured.replace(/\/$/, "")
}

export default function SupportPortal() {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [created, setCreated] = useState<CreatedCase | null>(null)
  const [lookupEmail, setLookupEmail] = useState("")
  const [lookupId, setLookupId] = useState("")
  const [checking, setChecking] = useState(false)
  const [caseStatus, setCaseStatus] = useState<CaseStatus | null>(null)
  const [lookupError, setLookupError] = useState("")
  const api = useMemo(() => supportApiBase(), [])

  async function submitCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError("")
    setCreated(null)
    const form = new FormData(event.currentTarget)
    const payload = {
      contact_email: String(form.get("email") || ""),
      category: String(form.get("category") || "other"),
      subject: String(form.get("subject") || ""),
      description: String(form.get("description") || ""),
      priority: Number(form.get("priority") || 2),
    }

    if (!api) {
      const subject = encodeURIComponent("Lux Support Request: " + payload.subject)
      const body = encodeURIComponent(
        `Email: ${payload.contact_email}\nCategory: ${payload.category}\nPriority: ${payload.priority}\n\n${payload.description}`,
      )
      window.location.href = `mailto:luxagent@gmail.com?subject=${subject}&body=${body}`
      setSending(false)
      return
    }

    try {
      const response = await fetch(api + "/portal/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data?.request) throw new Error(data?.error || "Could not create case.")
      const request = data.request
      setCreated({
        id: String(request.id),
        status: String(request.status || "open"),
        assigned_to: request.assigned_to,
        subject: request.subject || payload.subject,
      })
      setLookupEmail(payload.contact_email)
      setLookupId(String(request.id))
      event.currentTarget.reset()
    } catch (cause) {
      const reason = cause instanceof Error ? cause.message : "Could not create case."
      setError(reason + " Opening the support email fallback so you can still reach the team.")
      const subject = encodeURIComponent("Lux Support Request: " + payload.subject)
      const body = encodeURIComponent(
        `Email: ${payload.contact_email}\nCategory: ${payload.category}\nPriority: ${payload.priority}\n\n${payload.description}\n\nThe secure case API was unavailable when this request was submitted.`,
      )
      window.location.href = `mailto:luxagent@gmail.com?subject=${subject}&body=${body}`
    } finally {
      setSending(false)
    }
  }

  async function checkCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setChecking(true)
    setLookupError("")
    setCaseStatus(null)

    if (!api) {
      setLookupError("Live case status is available when the Lux Support service is connected.")
      setChecking(false)
      return
    }

    try {
      const url =
        api +
        "/portal/request/" +
        encodeURIComponent(lookupId.trim()) +
        "/status?contact_email=" +
        encodeURIComponent(lookupEmail.trim())
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok || !data?.request) throw new Error(data?.error || "Case not found.")
      setCaseStatus(data.request)
    } catch (cause) {
      setLookupError(cause instanceof Error ? cause.message : "Could not look up case.")
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="support-portal-grid">
      <section className="support-case-panel">
        <p className="lux-eyebrow">OPEN A CASE</p>
        <h2>Tell us what you need help with.</h2>
        <p>
          Your case goes into the Lux customer-success queue for triage in Hermes.
          Use clear details so the team can help you faster.
        </p>

        <form className="support-case-form" onSubmit={submitCase}>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@company.com" />
          </label>
          <div className="support-form-row">
            <label>
              What do you need help with?
              <select name="category" defaultValue="how_to">
                {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label>
              Priority
              <select name="priority" defaultValue="2">
                <option value="3">Low — question / request</option>
                <option value="2">Normal — I need help</option>
                <option value="1">High — I&apos;m blocked</option>
              </select>
            </label>
          </div>
          <label>
            Subject
            <input name="subject" required minLength={3} maxLength={180} placeholder="Short description of the issue" />
          </label>
          <label>
            Details
            <textarea
              name="description"
              required
              minLength={5}
              maxLength={8000}
              rows={7}
              placeholder="What were you trying to do? What happened? What did you expect? What have you already tried?"
            />
          </label>
          <button className="lux-button primary" type="submit" disabled={sending}>
            {sending ? "Creating case…" : "Create Support Case →"}
          </button>
          {error && <p className="support-error" role="alert">{error}</p>}
        </form>

        {created && (
          <div className="support-success">
            <strong>Case created ✓</strong>
            <span>Case ID: {created.id}</span>
            <span>Status: {created.status.replaceAll("_", " ")}</span>
            {created.assigned_to && <span>Assigned: {created.assigned_to}</span>}
            <small>Save the case ID and use the same email address to check status.</small>
          </div>
        )}
      </section>

      <aside className="support-side-stack">
        <section className="support-status-panel">
          <p className="lux-eyebrow">CHECK A CASE</p>
          <h2>See where your support case stands.</h2>
          <form onSubmit={checkCase}>
            <label>
              Case ID
              <input value={lookupId} onChange={event => setLookupId(event.target.value)} required placeholder="Case ID" />
            </label>
            <label>
              Email used on the case
              <input value={lookupEmail} onChange={event => setLookupEmail(event.target.value)} required type="email" placeholder="you@company.com" />
            </label>
            <button className="lux-button secondary" type="submit" disabled={checking}>
              {checking ? "Checking…" : "Check Status"}
            </button>
          </form>
          {lookupError && <p className="support-error" role="alert">{lookupError}</p>}
          {caseStatus && (
            <div className="case-status-card">
              <span>{caseStatus.category.replaceAll("_", " ")}</span>
              <h3>{caseStatus.subject}</h3>
              <strong>{caseStatus.status.replaceAll("_", " ")}</strong>
              <small>Last updated {new Date(caseStatus.updated_at).toLocaleString()}</small>
            </div>
          )}
        </section>

        <section className="support-help-panel">
          <p className="lux-eyebrow">GET HELP FASTER</p>
          <h2>Try the Knowledge Center first.</h2>
          <p>
            Step-by-step articles cover setup, Desktop, USB, Success Packs, Memory Packs,
            updates, voice, privacy, troubleshooting, and more.
          </p>
          <div className="support-help-links">
            <Link className="lux-button secondary" href="/knowledge">Search Knowledge Articles</Link>
            <Link className="lux-button secondary" href="/updates">See Updates & What&apos;s New</Link>
            <Link className="lux-button secondary" href="/build">Build My Lux</Link>
          </div>
        </section>
      </aside>
    </div>
  )
}
