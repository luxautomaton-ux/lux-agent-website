export type KnowledgeArticle = {
  id: string
  title: string
  summary: string
  body: string
  product_area: string
  tags: string[]
  updated_at: string
}

export type CustomerUpdate = {
  id: string
  version: string
  title: string
  summary: string
  date: string
  product: string
  highlights: string[]
  knowledgeArticleIds: string[]
}

const TODAY = "2026-10-01"

export const starterKnowledge: KnowledgeArticle[] = [
  {
    id: "getting-started-five-steps",
    title: "Getting started with Lux Agent in 5 simple steps",
    summary: "Choose your Success Pack, add optional memory, review your team, choose Desktop or USB, then install.",
    product_area: "Getting Started",
    tags: ["setup", "beginner", "desktop", "usb"],
    updated_at: TODAY,
    body: "1. Choose a Success Pack that matches your business.\n2. Add Memory Packs only if you want extra knowledge.\n3. Keep the included professional team or request premium customization.\n4. Choose Lux Agent Desktop, USB, or both.\n5. Review, checkout, download, and follow the guided installer. LANA is included automatically.",
  },
  {
    id: "success-packs-explained",
    title: "What is a Success Pack?",
    summary: "Success Packs are prebuilt industry AI team setups with workflows, prompts, outcomes, and safety rules.",
    product_area: "Success Packs",
    tags: ["success pack", "industry", "team"],
    updated_at: TODAY,
    body: "Start with a Success Pack. It gives LANA and the standard Lux team a profession-specific operating playbook. You do not need to build an agent from scratch unless your field is not covered or you want a premium custom team.",
  },
  {
    id: "memory-packs-explained",
    title: "What is a Memory Pack?",
    summary: "Memory Packs add optional knowledge and team boosts without replacing your active Success Pack.",
    product_area: "Memory Packs",
    tags: ["memory", "knowledge", "add-on"],
    updated_at: TODAY,
    body: "Memory Packs are optional enhancements. They can add knowledge, use cases, team focus, prompts, and guardrails. Keep one Success Pack active and layer Memory Packs on top when useful.",
  },
  {
    id: "lana-and-standard-team",
    title: "Meet LANA and your included professional AI team",
    summary: "LANA is always included and coordinates a generic business-ready team for sales, marketing, operations, finance, research, automation, and content.",
    product_area: "AI Team",
    tags: ["lana", "agents", "team", "voice"],
    updated_at: TODAY,
    body: "LANA is the executive coordinator. The standard team uses professional role identities and warm, clear, customer-service-oriented behavior. Premium customization can change departments, names, personas, role details, and voice style.",
  },
  {
    id: "desktop-tour",
    title: "Lux Agent Desktop: first-day walkthrough",
    summary: "A beginner tour of LANA, your team, files, workflows, approvals, and business tools.",
    product_area: "Desktop",
    tags: ["desktop", "tour", "beginner"],
    updated_at: TODAY,
    body: "Open Lux Agent Desktop and start with LANA. Complete your business profile, confirm your active Success Pack, review your team, and test one simple request. Use approvals for anything that sends, publishes, purchases, deletes, or changes external systems.",
  },
  {
    id: "usb-travel-guide",
    title: "Lux Agent USB: create and use your travel setup",
    summary: "How to prepare a compatible USB drive and carry a selected Lux setup away from your main computer.",
    product_area: "USB",
    tags: ["usb", "travel", "portable"],
    updated_at: TODAY,
    body: "Create the USB from Lux Agent Desktop after purchase. Connect a compatible drive, choose the approved setup, review what will travel, let Lux prepare and verify the drive, then safely eject it. Desktop remains the main home or office system.",
  },
  {
    id: "build-my-lux-guide",
    title: "Build My Lux: choose the right setup",
    summary: "A step-by-step guide to the website configurator.",
    product_area: "Build My Lux",
    tags: ["builder", "setup", "success pack", "memory"],
    updated_at: TODAY,
    body: "Step 1: choose your Success Pack. Step 2: add optional Memory Packs. Step 3: keep the included professional team or request premium customization. Step 4: choose Desktop, USB, or both. Step 5: review and checkout.",
  },
  {
    id: "update-lux-agent",
    title: "How to update Lux Agent safely",
    summary: "Use the in-app Update notification, review what changed, install, and verify the new version.",
    product_area: "Updates",
    tags: ["update", "version", "desktop"],
    updated_at: TODAY,
    body: "When Lux Agent detects an update, the Update notification is highlighted. Open it, review the change list, choose Update Now, and let the app finish. If a restart is required, reopen Lux Agent and confirm the version. Check the Updates page for customer-facing release notes and linked knowledge articles.",
  },
  {
    id: "support-case-guide",
    title: "How to open and track a Lux Support case",
    summary: "Send a case to the Lux customer-success team and use your case ID to check status.",
    product_area: "Support",
    tags: ["support", "case", "help"],
    updated_at: TODAY,
    body: "Open Support, choose the closest category, enter your email, subject, and a clear description. Include what you expected, what happened, and anything you already tried. Save the case ID. You can use the case ID plus the same email address to check status.",
  },
  {
    id: "approvals-and-privacy",
    title: "Approvals, privacy, and staying in control",
    summary: "Understand what Lux can prepare automatically and what should still require your approval.",
    product_area: "Safety & Privacy",
    tags: ["approvals", "privacy", "security"],
    updated_at: TODAY,
    body: "Lux can prepare drafts, plans, research, and internal work automatically. Consequential actions such as sending, publishing, purchasing, deleting, exporting sensitive data, or changing external systems should stay behind explicit human approval unless the customer has deliberately configured a narrower approved automation.",
  },
  {
    id: "update-lux-agent",
    title: "How to update Lux Agent safely",
    summary: "Use the in-app Update notification, review what changed, install, and verify the new version.",
    product_area: "Updates",
    tags: ["update", "version", "desktop"],
    updated_at: TODAY,
    body: "When Lux Agent detects an update, the Update notification is highlighted. Open it, review the change list, choose Update Now, and let the app finish. If a restart is required, reopen Lux Agent and confirm the version. Check the Updates page for customer-facing release notes and linked knowledge articles.",
  },
  {
    id: "support-case-guide",
    title: "How to open and track a Lux Support case",
    summary: "Send a case to the Lux customer-success team and use your case ID to check status.",
    product_area: "Support",
    tags: ["support", "case", "help"],
    updated_at: TODAY,
    body: "Open Support, choose the closest category, enter your email, subject, and a clear description. Include what you expected, what happened, and anything you already tried. Save the case ID. You can use the case ID plus the same email address to check status.",
  },
  {
    id: "approvals-and-privacy",
    title: "Approvals, privacy, and staying in control",
    summary: "Understand what Lux can prepare automatically and what should still require your approval.",
    product_area: "Safety & Privacy",
    tags: ["approvals", "privacy", "security"],
    updated_at: TODAY,
    body: "Lux can prepare drafts, plans, research, and internal work automatically. Consequential actions such as sending, publishing, purchasing, deleting, exporting sensitive data, or changing external systems should stay behind explicit human approval unless the customer has deliberately configured a narrower approved automation.",
  },
  {
    id: "voice-troubleshooting",
    title: "Voice is not working: quick troubleshooting",
    summary: "Check microphone permission, audio output, selected voice, and restart the voice session.",
    product_area: "Troubleshooting",
    tags: ["voice", "microphone", "audio"],
    updated_at: TODAY,
    body: "Confirm Lux Agent has microphone permission, confirm the correct input/output device is selected, make sure another app is not holding the microphone, end the current voice session, and start a fresh one. If the issue continues, open a Support case and include your operating system and what you already tried.",
  },
  {
    id: "backup-and-recovery",
    title: "Back up and recover your Lux setup",
    summary: "Protect your business configuration, packs, and important files before major changes.",
    product_area: "Recovery",
    tags: ["backup", "recovery", "vault"],
    updated_at: TODAY,
    body: "Before major updates or migrations, use the supported backup/recovery tools for your Lux environment. Keep business files and setup exports in your approved storage location. Never copy credentials into a support ticket or setup manifest.",
  },
]

export const starterUpdates: CustomerUpdate[] = [
  {
    id: "build-my-lux-launch",
    version: "2026.10",
    title: "Build My Lux guided setup is here",
    summary: "Customers can now choose a Success Pack first, add Memory Packs, keep the included team or request premium customization, then choose Desktop, USB, or both.",
    date: TODAY,
    product: "Lux Agent Website",
    highlights: ["Five-step beginner setup", "100 Success Packs", "100 Memory Packs", "Premium team customization path"],
    knowledgeArticleIds: ["getting-started-five-steps", "build-my-lux-guide"],
  },
  {
    id: "customer-support-center",
    version: "2026.10",
    title: "Lux Customer Support Center",
    summary: "The website now includes case creation, case-status lookup, Knowledge Articles, and a direct path into the Lux support team.",
    date: TODAY,
    product: "Lux Support",
    highlights: ["Open a support case", "Track case status", "Published Knowledge Articles", "Resolved cases can become KB drafts"],
    knowledgeArticleIds: ["support-case-guide"],
  },
  {
    id: "updates-center",
    version: "2026.10",
    title: "Updates and release guidance",
    summary: "Lux Agent customers now have a dedicated place to see what changed and jump straight to the help articles for each update.",
    date: TODAY,
    product: "Lux Agent Desktop",
    highlights: ["What's New page", "Linked help articles", "In-app update guidance", "Customer-facing release notes"],
    knowledgeArticleIds: ["update-lux-agent"],
  },
]
