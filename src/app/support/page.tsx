import Link from "next/link"
import SupportPortal from "@/components/SupportPortal"

export const metadata = {
  title: "Support",
  description: "Open a Lux Agent support case, check case status, search Knowledge Articles, and get guided help for Desktop, USB, packs, setup, and updates.",
}

export default function SupportPage() {
  return (
    <main>
      <section className="page-hero office-resources">
        <div className="page-hero-overlay" />
        <div className="page-hero-copy">
          <p className="lux-eyebrow">LUX CUSTOMER SUPPORT</p>
          <h1>Need help?<br /><span>We&apos;ll guide you.</span></h1>
          <p>
            Start with a step-by-step article, or open a case for the Lux customer-success team.
            Your case flows into the Hermes support workspace for triage, follow-up, and resolution.
          </p>
          <div className="home-actions">
            <Link className="lux-button primary" href="/knowledge">Search Knowledge Articles</Link>
            <Link className="lux-button secondary" href="/getting-started">Start Here Guide</Link>
          </div>
        </div>
      </section>

      <section className="support-quick-path">
        <div><b>1</b><strong>Search the guide</strong><span>Most setup and how-to questions are already documented.</span></div>
        <div><b>2</b><strong>Try the steps</strong><span>Follow the article one step at a time.</span></div>
        <div><b>3</b><strong>Open a case</strong><span>If you still need help, tell the Lux team what happened.</span></div>
        <div><b>4</b><strong>Track your case</strong><span>Use your case ID and email to check status.</span></div>
      </section>

      <SupportPortal />
    </main>
  )
}
