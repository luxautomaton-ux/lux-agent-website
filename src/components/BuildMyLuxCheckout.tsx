"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { MemoryPackRecord, SuccessPackRecord } from "@/lib/customerSetup"

const P = "/lux-agent-website"

type SavedSetup = {
  successId: string
  memoryIds: string[]
  customTeam: boolean
  customDepartments: string[]
  customNotes: string
  target: "desktop" | "usb" | "both"
}

export default function BuildMyLuxCheckout() {
  const [setup, setSetup] = useState<SavedSetup | null>(null)
  const [success, setSuccess] = useState<SuccessPackRecord | null>(null)
  const [memory, setMemory] = useState<MemoryPackRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = window.localStorage.getItem("lux-build-my-lux")
    if (!raw) {
      setLoading(false)
      return
    }
    try {
      const saved = JSON.parse(raw) as SavedSetup
      setSetup(saved)
      Promise.all([
        fetch(P + "/data/lux-success-packs-100.json").then(r => r.json()),
        fetch(P + "/data/lux-memory-packs-100.json").then(r => r.json()),
      ]).then(([successCatalog, memoryCatalog]) => {
        setSuccess(
          successCatalog.packs.find((pack: SuccessPackRecord) => pack.id === saved.successId) ?? null,
        )
        setMemory(
          memoryCatalog.packs.filter((pack: MemoryPackRecord) => saved.memoryIds.includes(pack.id)),
        )
        setLoading(false)
      })
    } catch {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <main className="builder-checkout"><p>Loading your Lux setup…</p></main>
  }

  if (!setup || !success) {
    return (
      <main className="builder-checkout empty">
        <h1>No Lux setup found.</h1>
        <p>Build your configuration first, then return to checkout.</p>
        <Link className="lux-button primary" href="/build">Build My Lux</Link>
      </main>
    )
  }

  const targetLabel =
    setup.target === "both" ? "Lux Agent Desktop + USB" :
    setup.target === "usb" ? "Lux Agent USB" :
    "Lux Agent Desktop"

  return (
    <main className="builder-checkout">
      <section className="builder-checkout-heading">
        <Link href="/build">← Edit setup</Link>
        <p className="lux-eyebrow">BUILD MY LUX · CHECKOUT</p>
        <h1>Review your Lux setup.</h1>
        <p>
          Your configuration is saved. Checkout will create the entitlement needed
          for the signed setup and installer handoff.
        </p>
      </section>

      <div className="builder-checkout-grid">
        <section className="builder-order-summary">
          <article>
            <span>SUCCESS PACK</span>
            <h2>{success.name}</h2>
            <p>{success.oneLiner}</p>
          </article>
          <article>
            <span>MEMORY ADD-ONS</span>
            <h2>{memory.length} selected</h2>
            <p>{memory.length ? memory.map(pack => pack.short_name).join(" · ") : "None selected"}</p>
          </article>
          <article>
            <span>TEAM</span>
            <h2>LANA + professional standard team</h2>
            <p>{setup.customTeam ? "Premium team customization added" : "Generic business team included"}</p>
          </article>
          <article>
            <span>INSTALL TARGET</span>
            <h2>{targetLabel}</h2>
            <p>Signed setup handoff after entitlement verification.</p>
          </article>

          {setup.customTeam && (
            <div className="checkout-premium">
              <strong>Premium customization</strong>
              <span>{setup.customDepartments.join(" · ") || "Departments selected during Builder review"}</span>
              {setup.customNotes && <p>{setup.customNotes}</p>}
            </div>
          )}
        </section>
        <aside className="builder-checkout-form">
          <p className="lux-eyebrow">CUSTOMER DETAILS</p>
          <h2>Continue with this setup</h2>
          <p className="checkout-price-note">
            Final pricing uses the current Success Pack, Memory Pack, install-target,
            and premium-customization pricing table.
          </p>

          <form
            onSubmit={event => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const customer = {
                name: String(data.get("name") || ""),
                email: String(data.get("email") || ""),
                business: String(data.get("business") || ""),
              }
              window.localStorage.setItem("lux-build-my-lux-customer", JSON.stringify(customer))
              const subject = encodeURIComponent("Build My Lux checkout request")
              const memoryLine = memory.map(pack => pack.name).join(", ") || "None"
              const body = encodeURIComponent(
                `Build My Lux Checkout\n\nCustomer: ${customer.name}\nEmail: ${customer.email}\nBusiness: ${customer.business}\n\nSuccess Pack: ${success.name}\nMemory Packs: ${memoryLine}\nInstall: ${targetLabel}\nPremium Custom Team: ${setup.customTeam ? "Yes" : "No"}\nDepartments: ${setup.customDepartments.join(", ") || "Standard team"}\n\nPlease send the secure payment/entitlement next step.`,
              )
              window.location.href = `mailto:luxagent@gmail.com?subject=${subject}&body=${body}`
            }}
          >
            <label>
              Full name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@company.com" />
            </label>
            <label>
              Business
              <input name="business" placeholder="Business name" />
            </label>

            <div className="checkout-total">
              <span>Setup configuration</span>
              <strong>Pricing at secure checkout</strong>
            </div>

            <button className="lux-button primary" type="submit">
              Continue to Payment / Entitlement →
            </button>
            <small>
              This preview currently hands the order into the existing Lux payment-request flow.
              Automated processor capture and signed entitlement issuance are the remaining production gate.
            </small>
          </form>
        </aside>
      </div>
    </main>
  )
}
