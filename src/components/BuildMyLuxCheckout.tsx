"use client"

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import successCatalogData from "../../public/data/lux-success-packs-100.json"
import memoryCatalogData from "../../public/data/lux-memory-packs-100.json"
import type { MemoryPackRecord, SuccessPackRecord } from "@/lib/customerSetup"
import type { SandboxCustomer, SandboxSetup } from "@/lib/buildMyLuxSandbox"

const P = "/lux-agent-website"
const CHECKOUT_API_URL = process.env.NEXT_PUBLIC_LUX_CHECKOUT_API_URL?.trim() ||
  "https://khyzmyvrfjwwnbvwfhhk.supabase.co/functions/v1/lux-agent-checkout"

type CheckoutStatus = {
  enabled: boolean
  chargesAllowed: boolean
  activeCatalogItems: number
}

type SuccessCatalog = { count?: number; packs: SuccessPackRecord[] }
type MemoryCatalog = { count?: number; packs: MemoryPackRecord[] }

const successCatalog = successCatalogData as SuccessCatalog
const memoryCatalog = memoryCatalogData as MemoryCatalog

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function useStorageString(key: string) {
  return useSyncExternalStore(
    subscribeStorage,
    () => window.localStorage.getItem(key),
    () => null,
  )
}

function useLocalAcceptanceAvailable() {
  return useSyncExternalStore(
    () => () => {},
    () => ["127.0.0.1", "localhost"].includes(window.location.hostname),
    () => false,
  )
}

function parseSetup(raw: string | null): SandboxSetup | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw) as Partial<SandboxSetup>
    if (
      typeof value.successId !== "string" ||
      !Array.isArray(value.memoryIds) ||
      !["desktop", "usb", "both"].includes(String(value.target))
    ) return null

    return {
      successId: value.successId,
      generalTeamMode: Boolean(value.generalTeamMode),
      memoryIds: value.memoryIds.filter((id): id is string => typeof id === "string"),
      customTeam: Boolean(value.customTeam),
      customDepartments: Array.isArray(value.customDepartments)
        ? value.customDepartments.filter((name): name is string => typeof name === "string")
        : [],
      customNotes: typeof value.customNotes === "string" ? value.customNotes : "",
      target: value.target as SandboxSetup["target"],
    }
  } catch {
    return null
  }
}

export default function BuildMyLuxCheckout() {
  const formRef = useRef<HTMLFormElement>(null)
  const rawSetup = useStorageString("lux-build-my-lux")
  const localAcceptance = useLocalAcceptanceAvailable()
  const setup = useMemo(() => parseSetup(rawSetup), [rawSetup])
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus | null>(null)
  const [checkoutMessage, setCheckoutMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    fetch(CHECKOUT_API_URL, { method: "GET", cache: "no-store" })
      .then(async response => response.ok ? await response.json() as CheckoutStatus : null)
      .then(value => { if (active) setCheckoutStatus(value) })
      .catch(() => { if (active) setCheckoutStatus(null) })
    return () => { active = false }
  }, [])

  const success = setup
    ? successCatalog.packs.find(pack => pack.id === setup.successId) ?? null
    : null

  const memory = setup
    ? memoryCatalog.packs.filter(pack => setup.memoryIds.includes(pack.id))
    : []

  if (!setup || (!success && !setup.generalTeamMode)) {
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

  const customerFromForm = (): SandboxCustomer | null => {
    const form = formRef.current
    if (!form || !form.reportValidity()) return null
    const data = new FormData(form)
    return {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      business: String(data.get("business") || ""),
    }
  }

  const saveCustomer = (customer: SandboxCustomer) => {
    window.localStorage.setItem("lux-build-my-lux-customer", JSON.stringify(customer))
  }

  return (
    <main className="builder-checkout">
      <section className="builder-checkout-heading">
        <Link href="/build">← Edit setup</Link>
        <p className="lux-eyebrow">BUILD MY LUX · CHECKOUT</p>
        <h1>Review your Lux setup.</h1>
        <p>
          Your configuration is saved. Production checkout will create the entitlement needed
          for the signed setup and installer handoff.
        </p>
      </section>

      <div className="builder-checkout-grid">
        <section className="builder-order-summary">
          <article>
            <span>{success ? "SUCCESS PACK" : "OPERATING MODE"}</span>
            <h2>{success?.name ?? "General Business Team"}</h2>
            <p>{success?.oneLiner ?? "Eight coordinated business roles with no industry specialization required."}</p>
          </article>
          <article>
            <span>MEMORY ADD-ONS</span>
            <h2>{memory.length} selected</h2>
            <p>{memory.length ? memory.map(pack => pack.short_name).join(" · ") : "None selected"}</p>
          </article>
          <article>
            <span>TEAM</span>
            <h2>LANA + 7 professional agents</h2>
            <p>{setup.customTeam ? "Premium team customization added on top of the core team" : "Complete generic business team included"}</p>
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
            Final pricing comes from the approved launch catalog for your Success Pack,
            Memory Packs, install target, and any premium customization.
          </p>

          <form
            ref={formRef}
            onSubmit={async event => {
              event.preventDefault()
              const customer = customerFromForm()
              if (!customer || submitting) return
              saveCustomer(customer)
              if (!checkoutStatus?.enabled || !checkoutStatus.chargesAllowed) {
                setCheckoutMessage("Secure checkout is staged but not activated until launch pricing is published.")
                return
              }

              setSubmitting(true)
              setCheckoutMessage("")
              try {
                const response = await fetch(CHECKOUT_API_URL, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    customer,
                    setup,
                    returnPathPrefix: window.location.pathname.startsWith(P) ? P : "",
                  }),
                })
                const result = await response.json() as { url?: string; error?: string }
                if (!response.ok || !result.url) {
                  throw new Error(result.error || "Secure checkout is not available.")
                }
                window.location.assign(result.url)
              } catch (error) {
                setCheckoutMessage(error instanceof Error ? error.message : "Secure checkout is not available.")
                setSubmitting(false)
              }
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
              <span>Launch catalog</span>
              <strong>{checkoutStatus?.enabled ? "Secure checkout ready" : "Pricing activates at launch"}</strong>
            </div>

            <button className="lux-button primary" type="submit" disabled={submitting || !checkoutStatus?.enabled}>
              {submitting ? "Opening secure checkout…" : checkoutStatus?.enabled ? "Continue to Secure Payment →" : "Checkout Activates With Launch Pricing"}
            </button>
            {checkoutMessage && <p className="checkout-status-message" role="status">{checkoutMessage}</p>}

            {localAcceptance && (
              <button
                className="lux-button secondary local-acceptance-button"
                type="button"
                onClick={() => {
                  const customer = customerFromForm()
                  if (!customer) return
                  saveCustomer(customer)
                  const prefix = window.location.pathname.startsWith(P) ? P : ""
                  window.location.href = prefix + "/checkout/mock-pay"
                }}
              >
                Run Local Acceptance Checkout
              </button>
            )}

            <small>
              Secure checkout and entitlement infrastructure are staged behind the approved launch catalog.
              The localhost-only acceptance checkout moves no money and creates no production entitlement.
            </small>
          </form>
        </aside>
      </div>
    </main>
  )
}
