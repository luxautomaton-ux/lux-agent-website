import Link from "next/link"
import KnowledgeCenter from "@/components/KnowledgeCenter"
import UpdatesCenter from "@/components/UpdatesCenter"

export const metadata = {
  title: "Updates & What’s New",
  description: "See Lux Agent customer-facing release notes, what changed, what to do next, and the Knowledge Articles connected to each update.",
}

export default function UpdatesPage() {
  return (
    <main>
      <section className="updates-hero">
        <div>
          <p className="lux-eyebrow">UPDATES & WHAT&apos;S NEW</p>
          <h1>Know what changed.<br /><span>Know what to do next.</span></h1>
          <p>
            When a Lux update rolls out, this page explains the customer-facing changes
            and points you directly to the help articles for the new experience.
          </p>
          <div className="update-callout">
            <strong>In Lux Agent Desktop</strong>
            <span>When an update is available, the in-app update notice highlights it. Open the notice, review the changes, then choose Update Now.</span>
          </div>
        </div>
      </section>

      <section className="updates-feed">
        <div className="section-heading">
          <div><p className="lux-eyebrow">LATEST CUSTOMER UPDATES</p><h2>What&apos;s new in Lux.</h2></div>
        </div>
        <UpdatesCenter />
      </section>

      <section className="update-kb-section">
        <div className="section-heading">
          <div>
            <p className="lux-eyebrow">UPDATE KNOWLEDGE ARTICLES</p>
            <h2>Help for the latest changes.</h2>
          </div>
          <Link href="/knowledge">All Knowledge Articles →</Link>
        </div>
        <KnowledgeCenter categoryOnly="Updates" />
      </section>
    </main>
  )
}
