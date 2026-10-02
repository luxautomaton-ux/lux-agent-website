import type { MemoryPackRecord } from "./customerSetup"

const accents = ["#8b5cf6", "#06b6d4", "#3b82f6", "#22c55e", "#f59e0b", "#ec4899"]

const CUSTOMER_TEAM_NAMES: Record<string, string> = {
  "LANA": "LANA · Executive Coordinator",
  "Dre": "Sales Agent",
  "Tyrone": "Marketing Agent",
  "Andre Vaughn": "Operations Agent",
  "Chuck Cole": "Automation & Build Agent",
  "Anna": "Finance Agent",
  "Jasmine": "Research Agent",
  "Roman": "Social & Content Agent",
}

const ROLE_IMPACT: Record<string, string> = {
  "LANA": "Uses this memory to understand the situation faster, route work with better context, and keep the whole team aligned.",
  "Dre": "Uses the added context when shaping offers, follow-up, customer conversations, and sales decisions.",
  "Tyrone": "Uses the added context to make campaigns, positioning, hooks, and marketing plans fit the business better.",
  "Andre Vaughn": "Uses the added context to turn plans into stronger routines, checklists, schedules, and operating handoffs.",
  "Chuck Cole": "Uses the added context when building workflows, automations, sites, tools, and technical handoffs.",
  "Anna": "Uses the added context to organize pricing, budgets, reports, and finance-related decision support more appropriately.",
  "Jasmine": "Uses the added context to frame research, compare sources, spot opportunities, and return more relevant findings.",
  "Roman": "Uses the added context to make content, captions, calendars, and public-facing drafts sound more consistent with the business.",
}

export function memoryPackNumber(pack: Pick<MemoryPackRecord, "id">) {
  const match = pack.id.match(/^MP(\d{3})_/i)
  return match ? Number(match[1]) : 0
}

export function memoryPackSlug(pack: Pick<MemoryPackRecord, "id">) {
  return pack.id.replaceAll("_", "-").toLowerCase()
}

export function memoryPackImage(pack: Pick<MemoryPackRecord, "id">) {
  const n = memoryPackNumber(pack)
  return n > 0
    ? `/lux-agent-website/packs/memory-official/${String(n).padStart(3, "0")}.webp`
    : "/lux-agent-website/brand/products/memory-packs.webp"
}

export function memoryPackAccent(pack: Pick<MemoryPackRecord, "id">) {
  const n = Math.max(1, memoryPackNumber(pack))
  return accents[(n - 1) % accents.length]
}

export function memoryPackTeam(pack: MemoryPackRecord) {
  return (pack.recommended_team_focus || []).map(name => ({
    sourceName: name,
    displayName: CUSTOMER_TEAM_NAMES[name] || name,
    impact: ROLE_IMPACT[name] || `Uses ${pack.short_name || pack.name} as extra context when working in this role.`,
  }))
}

export function memoryPackWhen(pack: MemoryPackRecord) {
  return [
    `When your active Success Pack works, but the team needs deeper understanding around ${pack.short_name || pack.name}.`,
    "When you keep repeating the same preferences, standards, judgment calls, or background information.",
    "When several agents need the same extra context instead of learning it separately in each conversation.",
    "When you want better continuity and comprehension without changing the profession-specific Success Pack.",
  ]
}

export function memoryPackWhy(pack: MemoryPackRecord) {
  return `A Success Pack tells the Lux team what kind of business work to perform and gives it a repeatable playbook. ${pack.name} adds another layer of reusable knowledge: ${pack.description} That extra layer can improve context, consistency, comprehension, and decision support across the agents that use it.`
}

export function memoryPackDifference(pack: MemoryPackRecord) {
  return {
    without: [
      "The Success Pack still gives the team its profession, workflows, outcomes, prompts, and safety rules.",
      "Agents can complete tasks, but they rely more heavily on the information you repeat in the current conversation.",
      "Preferences, judgment patterns, and specialized background may not carry consistently from one agent or workflow to the next.",
      "The team has a solid operating playbook, but less reusable depth around this specific subject.",
    ],
    with: [
      `${pack.short_name || pack.name} becomes reusable context the team can reference alongside the active Success Pack.`,
      "LANA can route work with more of the customer's standards, preferences, and subject context already available.",
      "Specialist agents can interpret requests with greater continuity instead of starting from a blank slate each time.",
      "The team can produce more consistent drafts, recommendations, research, and follow-up while keeping the same approval boundaries.",
    ],
  }
}
