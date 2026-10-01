import Link from "next/link"

export const metadata = {
  title: "Getting Started",
  description: "A simple beginner walkthrough for choosing, buying, downloading, installing, and using Lux Agent.",
}

const steps = [
  ["1", "Choose a Success Pack", "Pick the field closest to your business. The Success Pack already contains the industry team setup, workflows, prompts, outcomes, and safety rules.", "/build", "Choose My Success Pack"],
  ["2", "Add Memory Packs — optional", "Memory Packs add extra knowledge. You can skip them and add them later. Your Success Pack works without them.", "/build", "Add Optional Memory"],
  ["3", "Keep the included team or customize", "LANA and the professional standard team are already included. Only choose Premium Team Customization if you want custom departments, names, personas, roles, or voice style.", "/build", "Review My Team"],
  ["4", "Choose Desktop, USB, or both", "Desktop is the full home/office experience. USB is the portable travel companion. Pick both if you want the same approved setup in both places.", "/build", "Choose Install Location"],
  ["5", "Review and checkout", "Confirm the Success Pack, Memory Packs, team choice, and install target. Then complete payment so your Lux entitlement can be created.", "/build", "Review My Lux"],
  ["6", "Download and install", "Use the approved installer. After the required operating-system approval, Lux guides you through activation and applies your signed setup.", "/download", "Download Lux Agent"],
]

export default function GettingStartedPage() {
  return (
    <main>
      <section className="getting-started-hero">
        <p className="lux-eyebrow">START HERE</p>
        <h1>Lux Agent setup,<br /><span>one simple step at a time.</span></h1>
        <p>No technical background is required. Follow the numbers in order. If you get stuck, the Knowledge Center and Lux Support are one click away.</p>
      </section>

      <section className="getting-started-steps">
        {steps.map(([number, title, body, href, label]) => (
          <article key={number}>
            <b>{number}</b>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
              <Link href={href}>{label} →</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="after-install-guide">
        <div>
          <p className="lux-eyebrow">AFTER INSTALLATION</p>
          <h2>Your first 15 minutes with Lux Agent.</h2>
        </div>
        <ol>
          <li><b>1</b><span><strong>Meet LANA.</strong> Tell her your business name and what you want help with first.</span></li>
          <li><b>2</b><span><strong>Confirm your Success Pack.</strong> Make sure the correct industry setup is active.</span></li>
          <li><b>3</b><span><strong>Review your team.</strong> See the included Sales, Marketing, Operations, Finance, Research, Automation, and Content roles.</span></li>
          <li><b>4</b><span><strong>Try one simple request.</strong> Ask LANA for a one-day action plan or a customer follow-up draft.</span></li>
          <li><b>5</b><span><strong>Learn approvals.</strong> Lux prepares work, but sensitive actions stay behind your approval.</span></li>
          <li><b>6</b><span><strong>Know where help lives.</strong> Use Knowledge Articles for how-to guidance and Support for cases.</span></li>
        </ol>
      </section>

      <section className="home-final-cta">
        <p className="lux-eyebrow">YOU DON&apos;T HAVE TO FIGURE IT OUT ALONE</p>
        <h2>Need help at any step?</h2>
        <p>Search the Knowledge Center or send the Lux customer-success team a case.</p>
        <div className="home-actions">
          <Link className="lux-button primary" href="/knowledge">Knowledge Articles</Link>
          <Link className="lux-button secondary" href="/support">Open Support</Link>
        </div>
      </section>
    </main>
  )
}
