"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import successCatalogData from "../../public/data/lux-success-packs-index.json"
import memoryCatalogData from "../../public/data/lux-memory-packs-index.json"
import { successPackAccent, successPackImage, successPackSlug } from "@/lib/successPackVisual"
import { memoryPackAccent, memoryPackImage, memoryPackNumber, memoryPackSlug } from "@/lib/memoryPackVisual"
import {
  createSetupManifest,
  STANDARD_CUSTOMER_TEAM,
  type InstallTarget,
  type MemoryPackRecord,
  type SuccessPackRecord,
} from "@/lib/customerSetup"

const P = "/lux-agent-website"
const steps = ["Success Pack", "Memory Packs", "Team", "Install", "Review"]
const departments = [
  "Marketing",
  "Sales",
  "Customer Service",
  "HR",
  "Operations",
  "Finance",
  "Research",
  "Technology",
]

const TEAM_CARD_VISUALS: Record<string, {
  background: string
  headline: string
  value: string
  outputs: string[]
  tag: string
}> = {
  lana: {
    background: P + "/brand/office-command.png",
    headline: "Command the whole operation.",
    value: "LANA turns goals into plans, routes work to the right department, keeps approvals visible, and helps the team move as one business instead of eight disconnected tools.",
    outputs: ["Daily priorities", "Team coordination", "Approvals & follow-through"],
    tag: "EXECUTIVE COMMAND",
  },
  sales: {
    background: P + "/brand/office-reception.png",
    headline: "Turn interest into organized follow-up.",
    value: "The Sales Agent helps organize leads, shape offers, draft follow-up, and keep customer conversations moving without losing the human review step.",
    outputs: ["Lead follow-up", "Offer support", "Customer conversations"],
    tag: "SALES",
  },
  marketing: {
    background: P + "/brand/office-lounge.png",
    headline: "Give the business a consistent market voice.",
    value: "The Marketing Agent helps position the business, plan campaigns, develop offers, and keep growth work connected to what the company is actually trying to sell.",
    outputs: ["Campaign plans", "Positioning", "Growth ideas"],
    tag: "MARKETING",
  },
  operations: {
    background: P + "/brand/office-boardroom.png",
    headline: "Keep the business organized behind the scenes.",
    value: "The Operations Agent turns plans into schedules, checklists, recurring routines, and clean handoffs so important work does not live only in conversation.",
    outputs: ["Schedules", "Checklists", "Operational handoffs"],
    tag: "OPERATIONS",
  },
  automation: {
    background: P + "/brand/office-command.png",
    headline: "Make repeatable work easier to execute.",
    value: "The Automation & Build Agent helps translate processes into workflows, technical handoffs, tools, and connected systems while keeping sensitive actions behind approval gates.",
    outputs: ["Workflow design", "Automation handoffs", "Technical coordination"],
    tag: "AUTOMATION + BUILD",
  },
  finance: {
    background: P + "/brand/office-executive.png",
    headline: "Bring more structure to the money side.",
    value: "The Finance Agent helps organize pricing, budgets, cash-flow thinking, reporting, and finance-related preparation so the owner can make better-informed decisions.",
    outputs: ["Pricing support", "Budget organization", "Reporting prep"],
    tag: "FINANCE",
  },
  research: {
    background: P + "/brand/office-hallway.png",
    headline: "Ground decisions in better information.",
    value: "The Research Agent helps compare sources, study markets, track competitors, and surface useful opportunities so the rest of the team has evidence to work with.",
    outputs: ["Market research", "Competitor checks", "Opportunity discovery"],
    tag: "RESEARCH",
  },
  social: {
    background: P + "/brand/office-lounge.png",
    headline: "Keep content moving without losing the brand.",
    value: "The Social & Content Agent helps organize calendars, draft posts and captions, adapt ideas to different platforms, and keep public-facing content aligned with the business.",
    outputs: ["Content calendars", "Posts & captions", "Platform formatting"],
    tag: "SOCIAL + CONTENT",
  },
}

type SuccessCatalog = { count: number; packs: SuccessPackRecord[] }
type MemoryCatalog = { count: number; packs: MemoryPackRecord[] }

const SUCCESS_CATALOG = successCatalogData as SuccessCatalog
const MEMORY_CATALOG = memoryCatalogData as MemoryCatalog

export default function BuildMyLux() {
  const [step, setStep] = useState(0)
  const successCatalog = SUCCESS_CATALOG
  const memoryCatalog = MEMORY_CATALOG
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [successId, setSuccessId] = useState("")
  const [generalTeamMode, setGeneralTeamMode] = useState(false)
  const [memoryIds, setMemoryIds] = useState<string[]>([])
  const [memoryQuery, setMemoryQuery] = useState("")
  const [customTeam, setCustomTeam] = useState(false)
  const [customDepartments, setCustomDepartments] = useState<string[]>([])
  const [customNotes, setCustomNotes] = useState("")
  const [target, setTarget] = useState<InstallTarget>("desktop")
  const restored = useRef(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("lux-build-my-lux")
      const requestedStep = new URLSearchParams(window.location.search).get("step")
      if (saved) {
        try {
          const data = JSON.parse(saved)
          setSuccessId(data.successId ?? "")
          setGeneralTeamMode(Boolean(data.generalTeamMode))
          setMemoryIds(data.memoryIds ?? [])
          setCustomTeam(Boolean(data.customTeam))
          setCustomDepartments(data.customDepartments ?? [])
          setCustomNotes(data.customNotes ?? "")
          setTarget(data.target ?? "desktop")

          if (requestedStep === "memory" && (data.successId || data.generalTeamMode)) {
            setStep(1)
          } else if (requestedStep === "team" && (data.successId || data.generalTeamMode)) {
            setStep(2)
          }
        } catch {}
      } else if (requestedStep === "team") {
        setGeneralTeamMode(true)
        setStep(2)
      }
      restored.current = true
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!restored.current) return
    window.localStorage.setItem(
      "lux-build-my-lux",
      JSON.stringify({
        successId,
        generalTeamMode,
        memoryIds,
        customTeam,
        customDepartments,
        customNotes,
        target,
      }),
    )
  }, [successId, generalTeamMode, memoryIds, customTeam, customDepartments, customNotes, target])

  const successPacks = SUCCESS_CATALOG.packs
  const memoryPacks = MEMORY_CATALOG.packs
  const selectedSuccess = successPacks.find(pack => pack.id === successId)
  const selectedMemory = memoryPacks.filter(pack => memoryIds.includes(pack.id))
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(successPacks.map(pack => pack.category))).sort()],
    [successPacks],
  )

  const filteredSuccess = useMemo(() => {
    const q = query.trim().toLowerCase()
    return successPacks.filter(pack => {
      const categoryMatch = category === "All" || pack.category === category
      const text = [pack.name, pack.category, pack.profession, pack.oneLiner]
        .join(" ")
        .toLowerCase()
      return categoryMatch && (!q || text.includes(q))
    })
  }, [successPacks, query, category])

  const rankedMemory = useMemo(() => {
    const q = memoryQuery.trim().toLowerCase()
    const source = selectedSuccess
      ? [selectedSuccess.category, selectedSuccess.profession, ...selectedSuccess.primaryOutcomes]
          .join(" ")
          .toLowerCase()
      : ""
    const words = new Set(source.split(/[^a-z0-9]+/).filter(word => word.length > 3))
    return memoryPacks
      .filter(pack =>
        !q ||
        [pack.name, pack.category, pack.description, ...(pack.use_cases ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map(pack => {
        const haystack = [
          pack.category,
          pack.description,
          ...(pack.use_cases ?? []),
          ...(pack.recommended_team_focus ?? []),
        ]
          .join(" ")
          .toLowerCase()
        let score = 0
        words.forEach(word => {
          if (haystack.includes(word)) score += 1
        })
        return { pack, score }
      })
      .sort((a, b) => b.score - a.score || a.pack.name.localeCompare(b.pack.name))
  }, [memoryPacks, selectedSuccess, memoryQuery])

  const hasBaseSetup = Boolean(selectedSuccess || generalTeamMode)

  const manifest = hasBaseSetup
    ? createSetupManifest({
        successPack: selectedSuccess ?? null,
        memoryPacks: selectedMemory,
        target,
        customTeam: {
          enabled: customTeam,
          departments: customDepartments,
          notes: customNotes,
        },
      })
    : null

  const toggleMemory = (id: string) => {
    setMemoryIds(current =>
      current.includes(id) ? current.filter(value => value !== id) : [...current, id],
    )
  }

  const toggleDepartment = (name: string) => {
    setCustomDepartments(current =>
      current.includes(name) ? current.filter(value => value !== name) : [...current, name],
    )
  }

  const downloadPreview = () => {
    if (!manifest) return
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: "application/json",
    })
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = `lux-setup-${selectedSuccess?.id ?? "general-business-team"}.json`
    link.click()
    URL.revokeObjectURL(href)
  }

  const canContinue = step !== 0 || hasBaseSetup

  return (
    <div className="build-my-lux">
      <div className="build-progress">
        {steps.map((label, index) => (
          <button
            key={label}
            className={index === step ? "active" : index < step ? "done" : ""}
            onClick={() => {
              if (index === 0 || hasBaseSetup) setStep(index)
            }}
          >
            <span>{index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 1 · START WITH WHAT ALREADY WORKS</p>
            <h2>Choose your Success Pack.</h2>
            <p>
              A Success Pack is your prebuilt industry AI team. LANA, roles, workflows,
              starter prompts, outcomes, and safety rules are already organized for the field.
            </p>
          </div>

          <div className={"general-team-entry" + (generalTeamMode ? " selected" : "")}>
            <div>
              <p className="lux-eyebrow">NOT SURE OF YOUR INDUSTRY YET?</p>
              <h3>Start with the complete Lux Business Team.</h3>
              <p>
                Skip industry specialization for now. Get LANA plus Sales, Marketing, Operations,
                Automation, Finance, Research, and Social/Content as a general-purpose business team.
                You can add a Success Pack later when you know the field you want to specialize in.
              </p>
            </div>
            <div className="general-team-entry-price">
              <span>8-role team</span>
              <strong>Launch pricing</strong>
              <small>one-time</small>
              <button
                type="button"
                onClick={() => {
                  setGeneralTeamMode(true)
                  setSuccessId("")
                  setStep(1)
                }}
              >
                Build with the General Team →
              </button>
            </div>
          </div>

          <div className="build-or-divider"><span>OR CHOOSE AN INDUSTRY SUCCESS PACK</span></div>

          <div className="build-filters">
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search 100 Success Packs — real estate, restaurant, trucking…"
            />
            <select value={category} onChange={event => setCategory(event.target.value)}>
              {categories.map(value => <option key={value}>{value}</option>)}
            </select>
            <span>{filteredSuccess.length} of {successCatalog?.count ?? 100}</span>
          </div>

          <div className="success-pack-grid">
            {filteredSuccess.map(pack => {
              const selected = pack.id === successId
              const image = successPackImage(pack)
              const accent = successPackAccent(pack.packNumber)
              return (
                <article
                  key={pack.id}
                  className={"success-pack-choice rich" + (selected ? " selected" : "")}
                  style={{ "--pack-accent": accent } as CSSProperties}
                >
                  <div className="success-pack-card-art">
                    <Image
                      src={image}
                      alt={pack.name}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1050px) 33vw, 25vw"
                    />
                    <div className="success-pack-card-shade" />
                    <div className="success-pack-card-badges">
                      <span>#{String(pack.packNumber).padStart(3, "0")}</span>
                      <span>{pack.category}</span>
                    </div>
                  </div>
                  <div className="success-pack-card-copy">
                    <h3>{pack.name}</h3>
                    <p>{pack.oneLiner}</p>
                    <ul>
                      {pack.primaryOutcomes.slice(0, 3).map(outcome => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                    <div className="success-pack-card-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setSuccessId(pack.id)
                          setGeneralTeamMode(false)
                        }}
                        className={selected ? "selected-pack-action" : ""}
                      >
                        {selected ? "Selected ✓" : "Choose This Pack"}
                      </button>
                      <Link href={`/success-packs/${successPackSlug(pack)}`}>View Details →</Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {step === 1 && hasBaseSetup && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 2 · OPTIONAL KNOWLEDGE ENHANCEMENTS</p>
            <h2>Add Memory Packs.</h2>
            <p>
              {selectedSuccess
                ? `Your ${selectedSuccess.name} gives the team its profession, outcomes, workflows, prompts, and operating rules.`
                : "Your General Business Team gives you eight coordinated business roles without forcing you into an industry yet."}
              {" "}Memory Packs sit on top of that foundation and add reusable context so LANA and the specialist agents can understand
              selected subjects with more depth, continuity, and consistency.
            </p>
          </div>

          <div className="build-selected-bar">
            <strong>{selectedSuccess?.name ?? "General Business Team"}</strong>
            <span>{memoryIds.length} Memory Pack{memoryIds.length === 1 ? "" : "s"} added</span>
          </div>

          <div className="memory-pair-mini">
            <span>{selectedSuccess ? "Success Pack" : "Business Team"}</span>
            <b>+</b>
            <span>Memory Pack</span>
            <b>=</b>
            <strong>Profession workflow + deeper reusable knowledge</strong>
          </div>

          <div className="build-filters">
            <input
              value={memoryQuery}
              onChange={event => setMemoryQuery(event.target.value)}
              placeholder="Search 100 Memory Packs — voice, sales, research, discipline…"
            />
            <span>{rankedMemory.length} of {memoryCatalog.count}</span>
          </div>

          <div className="memory-pack-grid rich-grid">
            {rankedMemory.map(({ pack, score }, index) => {
              const selected = memoryIds.includes(pack.id)
              const recommended = index < 8 && score > 0
              const image = memoryPackImage(pack)
              const accent = memoryPackAccent(pack)
              const number = memoryPackNumber(pack)
              return (
                <article
                  key={pack.id}
                  className={"memory-pack-choice rich" + (selected ? " selected" : "")}
                  style={{ "--pack-accent": accent } as CSSProperties}
                >
                  <div className="success-pack-card-art">
                    <Image
                      src={image}
                      alt={pack.name}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1050px) 50vw, 33vw"
                    />
                    <div className="success-pack-card-shade" />
                    <div className="success-pack-card-badges">
                      <span>MEMORY #{String(number).padStart(3, "0")}</span>
                      <span>{recommended ? "Recommended" : pack.category}</span>
                    </div>
                  </div>

                  <div className="success-pack-card-copy">
                    <h3>{pack.short_name || pack.name}</h3>
                    <p>{pack.description}</p>
                    <ul>
                      {(pack.use_cases || []).slice(0, 3).map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="success-pack-card-actions">
                      <button
                        type="button"
                        onClick={() => toggleMemory(pack.id)}
                        className={selected ? "selected-pack-action" : ""}
                      >
                        {selected ? "Added ✓" : "+ Add Memory Pack"}
                      </button>
                      <Link href={`/memory-packs/${memoryPackSlug(pack)}`}>View Details →</Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {step === 2 && hasBaseSetup && (
        <section className="build-step">
          <div className="team-showcase-hero">
            <div>
              <p className="lux-eyebrow">STEP 3 · THE LUX BUSINESS TEAM</p>
              <h2>A whole business team.<br /><span>One coordinated Lux setup.</span></h2>
              <p>
                This is the core Lux Agent team: LANA plus seven specialist business departments.
                Use it as a general business team on its own, specialize it with a Success Pack,
                or deepen any department with Memory Packs.
              </p>
              <div className="team-value-pills">
                <span>8 coordinated roles</span>
                <span>LANA included</span>
                <span>General Business Mode</span>
                <span>Success Pack ready</span>
                <span>Memory Pack ready</span>
                <span>Professional customer-service tone</span>
              </div>
            </div>
            <div className="team-showcase-price">
              <span>COMPLETE TEAM</span>
              <strong>Launch pricing</strong>
              <small>one-time payment</small>
              <p>One purchase gives you a coordinated business team instead of a single custom role.</p>
            </div>
          </div>

          <div className="team-mode-explainer">
            <article>
              <span>GENERAL BUSINESS MODE</span>
              <strong>Start broad.</strong>
              <p>Use the eight-role team without choosing an industry. Good for founders who are still deciding what they want to build or who need a flexible business operating team.</p>
            </article>
            <article>
              <span>SUCCESS PACK ENHANCED</span>
              <strong>Specialize the team.</strong>
              <p>{selectedSuccess ? `Your selected ${selectedSuccess.name} gives these same departments industry-specific workflows, outcomes, prompts, and operating rules.` : "Add a Success Pack later when you want the team specialized for a particular field."}</p>
            </article>
            <article>
              <span>MEMORY PACK ENHANCED</span>
              <strong>Deepen what they know.</strong>
              <p>{selectedMemory.length ? `You already added ${selectedMemory.length} Memory Pack${selectedMemory.length === 1 ? "" : "s"} to give the team more reusable knowledge and context.` : "Memory Packs are optional add-ons that give selected agents more context, continuity, and subject understanding."}</p>
            </article>
          </div>

          <div className="team-department-grid">
            {STANDARD_CUSTOMER_TEAM.map(agent => {
              const visual = TEAM_CARD_VISUALS[agent.id]
              return (
                <article
                  className={"team-department-card" + (agent.id === "lana" ? " is-lana" : "")}
                  key={agent.id}
                  style={{ backgroundImage: `linear-gradient(180deg,rgba(4,10,18,.08),rgba(4,10,18,.88)),url("${visual?.background}")` }}
                >
                  <div className="team-department-art">
                    {agent.id === "lana" ? (
                      <img src={P + "/brand/lana-locked.png"} alt="LANA, Lux Agent executive coordinator" />
                    ) : (
                      <div className="team-department-monogram" aria-hidden="true">{visual?.tag?.slice(0, 1)}</div>
                    )}
                  </div>
                  <div className="team-department-copy">
                    <span>{visual?.tag ?? agent.lane}</span>
                    <h3>{agent.displayName}</h3>
                    <strong>{visual?.headline}</strong>
                    <p>{visual?.value}</p>
                    <ul>
                      {(visual?.outputs ?? []).map(item => <li key={item}>{item}</li>)}
                    </ul>
                    <small>{agent.voiceProfile.replaceAll("-", " ")}</small>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="team-included-summary">
            <div>
              <p className="lux-eyebrow">WHAT THE STANDARD TEAM GIVES YOU</p>
              <h3>A practical starting company structure—even if you are starting from zero.</h3>
              <p>
                You are not buying eight isolated chatbots. LANA coordinates the work across Sales,
                Marketing, Operations, Automation, Finance, Research, and Social/Content so the customer
                has a usable business structure from day one.
              </p>
            </div>
            <ul>
              <li>Executive coordination and daily prioritization</li>
              <li>Lead, marketing, and customer communication support</li>
              <li>Operational routines, checklists, and workflow support</li>
              <li>Finance organization and research support</li>
              <li>Content planning and public-facing draft support</li>
              <li>Ready to accept Success Packs and Memory Packs later</li>
            </ul>
          </div>

          <div className={"premium-team-panel" + (customTeam ? " enabled" : "")}>
            <div>
              <p className="lux-eyebrow">PREMIUM CUSTOMIZATION</p>
              <h3>Want a team built specifically for your company?</h3>
              <p>
                The complete standard team is included in your approved Lux setup. Upgrade only if you want to customize
                departments, names, personas, role details, or voice style through Lux Agent Builder.
              </p>
            </div>
            <label className="premium-toggle">
              <input
                type="checkbox"
                checked={customTeam}
                onChange={event => setCustomTeam(event.target.checked)}
              />
              <span>Customize my team · premium add-on</span>
            </label>

            {customTeam && (
              <div className="custom-team-options">
                <h4>Which departments should we customize?</h4>
                <div className="department-pills">
                  {departments.map(name => (
                    <button
                      key={name}
                      className={customDepartments.includes(name) ? "selected" : ""}
                      onClick={() => toggleDepartment(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <textarea
                  value={customNotes}
                  onChange={event => setCustomNotes(event.target.value)}
                  placeholder="Optional: Tell us what you want changed about the team."
                  rows={4}
                />
                <p>
                  This request stays inside the Lux Agent ecosystem and becomes the handoff
                  to the integrated Agent Builder before the final signed setup bundle is issued.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {step === 3 && hasBaseSetup && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 4 · CHOOSE WHERE LUX LIVES</p>
            <h2>Desktop, USB, or both.</h2>
            <p>
              Desktop is the full home or office experience. USB is the portable companion.
              The same setup can be entitled for both.
            </p>
          </div>

          <div className="install-target-grid">
            <button
              className={target === "desktop" ? "selected" : ""}
              onClick={() => setTarget("desktop")}
            >
              <img src={P + "/brand/products/lux-agent-desktop-frontback.webp"} alt="" />
              <h3>Lux Agent Desktop</h3>
              <p>Full Mac / Windows AI workspace.</p>
              <strong>{target === "desktop" ? "Selected ✓" : "Choose Desktop"}</strong>
            </button>
            <button
              className={target === "usb" ? "selected" : ""}
              onClick={() => setTarget("usb")}
            >
              <img src={P + "/brand/products/lux-agent-usb.webp"} alt="" />
              <h3>Lux Agent USB</h3>
              <p>Portable setup for your compatible USB drive.</p>
              <strong>{target === "usb" ? "Selected ✓" : "Choose USB"}</strong>
            </button>

            <button
              className={target === "both" ? "selected" : ""}
              onClick={() => setTarget("both")}
            >
              <div className="both-target-art">
                <img src={P + "/brand/products/lux-agent-desktop.webp"} alt="" />
                <img src={P + "/brand/products/lux-agent-usb.webp"} alt="" />
              </div>
              <h3>Desktop + USB</h3>
              <p>Full workspace plus portable travel companion.</p>
              <strong>{target === "both" ? "Selected ✓" : "Choose Both"}</strong>
            </button>
          </div>
        </section>
      )}

      {step === 4 && hasBaseSetup && manifest && (
        <section className="build-step">
          <div className="build-step-heading">
            <p className="lux-eyebrow">STEP 5 · REVIEW MY LUX</p>
            <h2>Your setup is ready for checkout.</h2>
            <p>
              Review the configuration before payment. Production installation will use a
              server-signed entitlement bundle; this browser preview never contains credentials.
            </p>
          </div>

          <div className="setup-review">
            <article>
              <span>{selectedSuccess ? "SUCCESS PACK" : "OPERATING MODE"}</span>
              <h3>{selectedSuccess?.name ?? "General Business Team"}</h3>
              <p>{selectedSuccess?.profession ?? "No industry specialization required"}</p>
            </article>
            <article>
              <span>MEMORY</span>
              <h3>{selectedMemory.length} Memory Pack{selectedMemory.length === 1 ? "" : "s"}</h3>
              <p>{selectedMemory.length ? selectedMemory.map(pack => pack.short_name).join(" · ") : "No add-ons selected"}</p>
            </article>
            <article>
              <span>TEAM</span>
              <h3>LANA + {STANDARD_CUSTOMER_TEAM.length - 1} professional agents · included in the core setup</h3>
              <p>{customTeam ? "Premium team customization requested in addition to the core team" : "Complete generic business team included"}</p>
            </article>
            <article>
              <span>INSTALL</span>
              <h3>{target === "both" ? "Desktop + USB" : target === "usb" ? "USB Travel" : "Desktop"}</h3>
              <p>Entitlement and installer handoff after checkout.</p>
            </article>
          </div>

          {customTeam && (
            <div className="premium-review">
              <strong>Premium Custom Team</strong>
              <span>{customDepartments.length ? customDepartments.join(" · ") : "Department choices pending"}</span>
              {customNotes && <p>{customNotes}</p>}
            </div>
          )}

          <div className="install-after-checkout">
            <h3>What happens after checkout</h3>
            <ol>
              <li><span>1</span><div><strong>Entitlement issued</strong><p>Your purchase is tied to your Lux account.</p></div></li>
              <li><span>2</span><div><strong>Signed Lux Setup generated</strong><p>Your business-team mode, optional Success Pack, Memory Packs, team policy, and install targets are sealed together.</p></div></li>
              <li><span>3</span><div><strong>Install to Lux Agent</strong><p>Desktop opens the signed setup and applies it after customer review.</p></div></li>
              <li><span>4</span><div><strong>Create USB when selected</strong><p>Desktop prepares the portable environment on the customer&apos;s compatible drive.</p></div></li>
            </ol>
          </div>

          <div className="build-review-actions">
            <button className="lux-button secondary" onClick={downloadPreview}>
              Download setup preview
            </button>
            <Link className="lux-button primary" href="/checkout?source=build-my-lux">
              Continue to Checkout →
            </Link>
          </div>
          <p className="setup-preview-note">
            The downloaded JSON is a configuration preview only. It is not a paid entitlement,
            signature, or executable installer.
          </p>
        </section>
      )}

      <div className="build-nav">
        <button
          className="lux-button secondary"
          disabled={step === 0}
          onClick={() => setStep(value => Math.max(0, value - 1))}
        >
          ← Back
        </button>
        {step < 4 && (
          <button
            className="lux-button primary"
            disabled={!canContinue}
            onClick={() => setStep(value => Math.min(4, value + 1))}
          >
            {step === 0 ? "Add Memory Packs" : step === 1 ? "Review Team" : step === 2 ? "Choose Install" : "Review Setup"} →
          </button>
        )}
      </div>
    </div>
  )
}
