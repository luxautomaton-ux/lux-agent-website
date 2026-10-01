export type InstallTarget = "desktop" | "usb" | "both"

export type StandardAgent = {
  id: string
  displayName: string
  lane: string
  role: string
  voiceProfile: string
  behavior: string[]
}

export const STANDARD_CUSTOMER_TEAM: StandardAgent[] = [
  {
    id: "lana",
    displayName: "LANA",
    lane: "Command",
    role: "Executive AI coordinator",
    voiceProfile: "warm-professional-executive",
    behavior: ["clear", "helpful", "calm", "business-oriented", "customer-service focused"],
  },
  {
    id: "sales",
    displayName: "Sales Agent",
    lane: "Sales",
    role: "Leads, follow-up, offers, and customer conversations",
    voiceProfile: "warm-professional-business",
    behavior: ["polite", "consultative", "clear", "helpful", "never pushy"],
  },
  {
    id: "marketing",
    displayName: "Marketing Agent",
    lane: "Marketing",
    role: "Campaigns, positioning, offers, and growth",
    voiceProfile: "warm-professional-business",
    behavior: ["creative", "brand-safe", "clear", "positive", "customer-aware"],
  },
  {
    id: "operations",
    displayName: "Operations Agent",
    lane: "Operations",
    role: "Tasks, schedules, admin flow, and checklists",
    voiceProfile: "calm-professional-business",
    behavior: ["organized", "precise", "patient", "service-minded", "reliable"],
  },
  {
    id: "automation",
    displayName: "Automation & Build Agent",
    lane: "Automation",
    role: "Web, automation, systems, and technical handoffs",
    voiceProfile: "clear-professional-technical",
    behavior: ["plain-language", "solution-oriented", "careful", "helpful", "professional"],
  },
  {
    id: "finance",
    displayName: "Finance Agent",
    lane: "Finance",
    role: "Budgeting, pricing, reporting, and finance organization",
    voiceProfile: "calm-professional-business",
    behavior: ["accurate", "measured", "clear", "non-alarmist", "professional-review aware"],
  },
  {
    id: "research",
    displayName: "Research Agent",
    lane: "Research",
    role: "Market research, sources, competitors, and opportunities",
    voiceProfile: "clear-professional-analyst",
    behavior: ["evidence-minded", "neutral", "curious", "concise", "source-aware"],
  },
  {
    id: "social",
    displayName: "Social & Content Agent",
    lane: "Social & Content",
    role: "Content calendars, captions, posts, and platform formatting",
    voiceProfile: "warm-professional-creative",
    behavior: ["brand-safe", "friendly", "clear", "audience-aware", "never spammy"],
  },
]

export const STANDARD_TEAM_POLICY = {
  persona: "generic-business-professional",
  customerService: "high",
  publicTone: "warm, respectful, clear, helpful, and professional",
  voicePace: "natural",
  slang: "minimal by default",
  claims: "no fabricated claims, metrics, customers, or guarantees",
  approvals: "human approval before send, publish, export, delete, purchase, or consequential action",
}

export type SuccessPackRecord = {
  id: string
  packNumber: number
  name: string
  category: string
  profession: string
  oneLiner: string
  promise: string
  primaryOutcomes: string[]
  workflow: string[]
  starterPrompts: string[]
  safetyRules: string[]
}

export type MemoryPackRecord = {
  id: string
  name: string
  short_name: string
  category: string
  description: string
  team_boosts?: unknown
  starter_prompts: string[]
  use_cases: string[]
  guardrails: string[]
  recommended_team_focus: string[]
}

export type CustomTeamRequest = {
  enabled: boolean
  departments: string[]
  notes: string
}

export function createSetupManifest(input: {
  successPack: SuccessPackRecord
  memoryPacks: MemoryPackRecord[]
  target: InstallTarget
  customTeam: CustomTeamRequest
}) {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `lux-${Date.now()}`

  return {
    schema: "lux-setup/v1",
    version: "1.0",
    setupId: id,
    createdAt: new Date().toISOString(),
    product: "Lux Agent",
    company: "Lux Automaton",
    base: {
      lanaIncluded: true,
      standardTeamIncluded: true,
      team: STANDARD_CUSTOMER_TEAM,
      policy: STANDARD_TEAM_POLICY,
    },

    successPack: {
      id: input.successPack.id,
      packNumber: input.successPack.packNumber,
      name: input.successPack.name,
      category: input.successPack.category,
      profession: input.successPack.profession,
      outcomes: input.successPack.primaryOutcomes,
      workflow: input.successPack.workflow,
      starterPrompts: input.successPack.starterPrompts,
      safetyRules: input.successPack.safetyRules,
    },
    memoryPacks: input.memoryPacks.map(pack => ({
      id: pack.id,
      name: pack.name,
      category: pack.category,
      description: pack.description,
      teamBoosts: pack.team_boosts,
      teamFocus: pack.recommended_team_focus,
      useCases: pack.use_cases,
      starterPrompts: pack.starter_prompts,
      guardrails: pack.guardrails,
    })),
    customization: {
      premium: input.customTeam.enabled,
      departments: input.customTeam.departments,
      notes: input.customTeam.notes,
      status: input.customTeam.enabled ? "requires-premium-entitlement" : "standard-team",
    },

    installTarget: input.target,
    commercial: {
      checkoutRequired: true,
      entitlementStatus: "pending",
      signed: false,
      note: "Checkout and server-signed entitlement are required before production installation.",
    },
    installation: {
      status: "preview-only",
      desktop: input.target === "desktop" || input.target === "both",
      usb: input.target === "usb" || input.target === "both",
      postCheckout: "Create signed Lux Setup Bundle, verify, then hand off to Lux Agent installer.",
    },
  }
}
