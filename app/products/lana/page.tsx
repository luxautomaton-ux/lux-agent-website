"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { prefixPath } from "@/lib/prefix";

const BADGES = [
  "AI Operator",
  "Business Guide",
  "Workflow Memory",
  "Built by Lux Automaton",
];

const FEATURES = [
  {
    title: "Business Planning",
    desc: "LANA can help turn ideas into plans, offers, workflows, timelines, launch steps, and daily operating systems.",
  },
  {
    title: "Daily Task Guidance",
    desc: "LANA helps users decide what to work on, what to prioritize, and what needs follow-up.",
  },
  {
    title: "Lux Coder Support",
    desc: "LANA can help plan apps, write prompts, explain features, organize build tasks, and guide Lux Coder workflows.",
  },
  {
    title: "Lux Agent USB Support",
    desc: "LANA helps users run their portable AI business OS, activate Success Packs, track leads, and execute daily work.",
  },
  {
    title: "Success Pack Execution",
    desc: "LANA reads the business playbook and helps the user follow the right tasks, prompts, rules, goals, and workflows.",
  },
  {
    title: "Customer Follow-Up",
    desc: "LANA can help draft messages, organize leads, prepare outreach, create sales scripts, and remind users who needs attention.",
  },
  {
    title: "Content and Marketing",
    desc: "LANA can help create social posts, landing page copy, offers, video scripts, ads, emails, and brand messages.",
  },
  {
    title: "Documents and Reports",
    desc: "LANA can help write PDFs, proposals, guides, business plans, onboarding docs, release reports, and customer summaries.",
  },
  {
    title: "Research and Strategy",
    desc: "LANA can help compare tools, summarize information, plan next steps, and turn research into action.",
  },
  {
    title: "Founder Support",
    desc: "LANA helps the founder stay organized, protect ideas, build systems, track priorities, and move the business forward.",
  },
];

const COMPARISON = {
  regular: [
    "Start from a blank prompt",
    "Forget the business context",
    "Wait for the user to lead everything",
    "Give generic answers",
    "Do not understand the full system",
    "Are disconnected from products, workflows, and business goals",
  ],
  lana: [
    "Understands the Lux Automaton ecosystem",
    "Works with Success Packs",
    "Supports Lux Agent USB",
    "Helps guide Lux Coder builds",
    "Remembers workflows and operating rules",
    "Helps the user take action",
    "Speaks in business systems, not random answers",
    "Can support daily execution, sales, planning, content, and operations",
    "Feels like an operator, not a search box",
  ],
};

const ECOSYSTEM = [
  { name: "Lux Agent USB", desc: "LANA helps users run the portable AI business operating system.", href: "/products/lux-agent-usb" },
  { name: "Lux Coder", desc: "LANA helps plan, prompt, document, and organize software builds.", href: "/products/lux-coder" },
  { name: "Success Packs", desc: "LANA follows structured business recipes and turns them into daily action.", href: "/products/success-packs" },
  { name: "Lux WriteOff", desc: "LANA can help users organize expense and deduction workflows.", href: "/products/luxwriteoff" },
  { name: "Lux Budgeter", desc: "LANA can help users review money, budget goals, and cash-flow planning.", href: "/products/lux-budgeter" },
  { name: "Lux Care OS", desc: "LANA can help care teams follow operational workflows and daily task structure.", href: "/solutions/lux-care-os" },
  { name: "Epic Electric", desc: "LANA can help contractors organize leads, quotes, jobs, photos, and follow-up.", href: "/solutions/epic-electric" },
  { name: "Inland Circle Program OS", desc: "LANA can help program teams manage outreach, participants, reporting, and workflows.", href: "/solutions/inland-circle-program-o" },
];

const PERSONALITY = [
  "Clear",
  "Supportive",
  "Strategic",
  "Organized",
  "Direct",
  "Business-minded",
  "Builder-friendly",
  "Founder-aware",
  "Workflow-focused",
  "Human-centered",
];

const AUDIENCES = [
  "Founders building a company",
  "Small business owners running daily operations",
  "Creators managing content and offers",
  "Contractors tracking jobs and customers",
  "Consultants building client systems",
  "Agencies delivering projects",
  "Nonprofits managing programs",
  "Clinics organizing care workflows",
  "Developers using Lux Coder",
  "Beginners who need help understanding what to do next",
];

const POWERFUL_BULLETS = [
  "She understands the Lux Automaton ecosystem",
  "She can work across products and workflows",
  "She supports business planning and execution",
  "She helps users take the next step",
  "She can explain technical ideas in simple language",
  "She works with Success Packs",
  "She supports Lux Coder builds",
  "She can guide Lux Agent USB workflows",
  "She helps create documents, content, and plans",
  "She brings structure to scattered ideas",
  "She is designed for real business use",
];

const COMMANDS = [
  {
    cmd: "LANA, help me plan my day.",
    response: "Scanning current schedule and pending tasks... You have 3 high-priority follow-ups for Epic Electric and 2 outstanding draft proposals for Lux Care OS. I recommend starting with the follow-ups to lock in today's scheduling. Here is a proposed timeline: 9:00 AM - Outreach; 10:30 AM - Proposal drafts. Let's move.",
  },
  {
    cmd: "LANA, turn this idea into a business offer.",
    response: "Let's structure it. Based on your inputs, we will define: (1) Core Value Proposition, (2) Pricing Tiers (I suggest a 3-tier structure), (3) Delivery Mechanism, and (4) The Guarantee. I am drafting a proposal template now in your documents folder. Let me know when you are ready to review.",
  },
  {
    cmd: "LANA, help me build this feature in Lux Coder.",
    response: "I've analyzed the codebase. To implement this feature, we need to create a new component in components/CustomUI.tsx and link it to the main page. I have drafted the prompt sequence for Lux Coder to write the component and unit tests. Run the task now?",
  },
  {
    cmd: "LANA, create a follow-up message for this lead.",
    response: "Drafting: 'Hi [Name], loved our conversation yesterday about scaling your field service operations. I've prepared a custom estimate for the Epic Electric system setup we discussed. Let's connect on Thursday to review.' I have queued this in your CRM dashboard.",
  },
  {
    cmd: "LANA, organize my Success Pack tasks.",
    response: "Success Pack 'Restaurant Operating Playbook' loaded. Active tasks: (1) Staff onboarding workflow checklist, (2) Inventory tracking templates, (3) Daily checkout report SOP. I've mapped these to your Monday-Wednesday pipeline. What should we tackle first?",
  },
];
export default function LanaProductPage() {
  const [activeCommandIndex, setActiveCommandIndex] = useState<number | null>(null);
  const [typedResponse, setTypedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [prevActiveCommandIndex, setPrevActiveCommandIndex] = useState<number | null>(null);

  if (activeCommandIndex !== prevActiveCommandIndex) {
    setPrevActiveCommandIndex(activeCommandIndex);
    if (activeCommandIndex !== null) {
      setIsTyping(true);
      setTypedResponse("");
    }
  }

  useEffect(() => {
    if (activeCommandIndex === null) return;
    const fullText = COMMANDS[activeCommandIndex].response;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setTypedResponse(fullText.substring(0, idx));
      if (idx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [activeCommandIndex]);

  return (
    <div style={{ background: "var(--bg-void)", minHeight: "100vh", color: "var(--text-primary)", paddingTop: "72px" }}>
      {/* HERO SECTION */}
      <section style={{ position: "relative", minHeight: "680px", display: "flex", alignItems: "center", overflow: "hidden", borderBottom: "1px solid rgba(0, 229, 255, 0.1)" }}>
        {/* Background Image Overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${prefixPath("/images/page-hero-cyber.jpg")})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0, opacity: 0.2 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(3,5,18,0.95) 0%, rgba(3,5,18,0.85) 60%, rgba(6,11,20,0.95) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(128, 0, 255, 0.08) 50%, transparent 70%)", zIndex: 2, pointerEvents: "none", filter: "blur(40px)" }} />
        
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 3 }}>
          <div className="grid-split" style={{ gap: "60px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", gap: "10px", alignItems: "center", color: "var(--cyan)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", background: "rgba(0, 229, 255, 0.08)", border: "1px solid rgba(0, 229, 255, 0.2)", borderRadius: "4px", padding: "5px 14px", marginBottom: "24px" }}>
                <span>💜</span> LANA AI OPERATOR
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "20px" }}>
                Meet LANA — <br/>
                <span style={{ background: "linear-gradient(135deg, var(--cyan) 0%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>The Heart of Lux Automaton.</span>
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "600px" }}>
                LANA is more than an assistant. She is the AI operator, guide, memory, workflow partner, and execution engine that helps builders, founders, and business owners turn scattered ideas into real systems.
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "48px" }}>
                <Link href="#meet-lana" className="btn-primary" style={{ background: "linear-gradient(135deg, var(--cyan) 0%, #a855f7 100%)", color: "#000", boxShadow: "0 0 30px rgba(168, 85, 247, 0.35)", padding: "14px 32px" }}>
                  Meet LANA
                </Link>
                <Link href="/products/lux-agent-usb" className="btn-outline" style={{ border: "1px solid rgba(0, 229, 255, 0.3)" }}>
                  Explore Lux Agent USB
                </Link>
              </div>

              {/* Badges Grid */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {BADGES.map((b) => (
                  <span key={b} style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.04)", border: "1px solid var(--border-subtle)", borderRadius: "6px", padding: "6px 14px" }}>
                    ◆ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Image Container */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-30px", background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none", filter: "blur(30px)" }} />
              <div style={{ width: "100%", maxWidth: "420px", height: "clamp(300px, 55vw, 460px)", position: "relative", zIndex: 1, borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
                <Image
                  src={prefixPath("/images/lana-blazer.png")}
                  alt="LANA AI Avatar"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHAT IS LANA? */}
      <section id="meet-lana" style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid-split" style={{ gap: "60px", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "8rem", fontWeight: 900, color: "rgba(0, 229, 255, 0.04)", lineHeight: 0.8, fontFamily: "monospace", userSelect: "none" }}>W</div>
              <div className="section-label" style={{ marginBottom: "24px" }}>What Is LANA?</div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "24px" }}>The Core Purpose</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                <p>
                  LANA is the intelligent assistant layer inside the Lux Automaton ecosystem. She helps users think, plan, organize, build, follow up, and execute. Instead of starting every task from scratch, LANA remembers the system, understands the workflow, and helps guide the user toward the next best move.
                </p>
                <p>
                  LANA connects the human side of the business with the technical side of the system.
                </p>
                <p>
                  She can help you write, build, plan, research, organize, sell, follow up, create documents, guide daily tasks, and activate Success Packs.
                </p>
                <div style={{ background: "rgba(0, 229, 255, 0.03)", borderLeft: "3px solid var(--cyan)", padding: "16px 20px", borderRadius: "0 8px 8px 0", marginTop: "12px", color: "var(--text-primary)", fontWeight: 600 }}>
                  “LANA is the voice of the system. She is the one who helps turn the Lux Automaton tools into action.”
                </div>
              </div>
            </div>

            {/* Pointing visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "440px", height: "clamp(200px, 40vw, 300px)", position: "relative", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 229, 255, 0.15)", boxShadow: "0 10px 30px rgba(0, 229, 255, 0.05)" }}>
                <Image
                  src={prefixPath("/images/lana-bubbles.jpg")}
                  alt="LANA guiding operations"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY LANA EXISTS */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>Why LANA Exists</div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "24px" }}>Beyond the Blank Chat Box.</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "40px" }}>
            Most AI tools wait for you to know exactly what to ask. That is the problem. Business owners, founders, creators, and builders usually do not need another blank chat box. They need help thinking through the work, remembering the details, staying organized, and moving forward.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", textAlign: "left" }}>
            {[
              "What should I do next?",
              "What did we already build?",
              "What task matters today?",
              "What customer needs follow-up?",
              "What document needs to be created?",
              "What system needs to be improved?",
              "What offer should I make?",
              "What should I build with Lux Coder?",
            ].map((q) => (
              <div key={q} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "var(--cyan)", fontSize: "1.2rem" }}>?</span>
                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT LANA CAN DO */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Capabilities</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>What LANA Can Do</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              LANA helps across the full business workflow — from idea to execution.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "24px" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: "clamp(20px, 4vw, 32px)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "16px", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ fontSize: "1.4rem", color: "var(--cyan)", marginBottom: "16px" }}>◆</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: SAMPLE LANA COMMANDS (INTERACTIVE CONSOLE) */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Interactive Preview</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>What You Can Ask LANA</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Click on a command card below to see LANA formulate a direct response in real time.
            </p>
          </div>

          <div className="console-grid">
            {/* Commands list */}
            <div className="console-commands">
              {COMMANDS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCommandIndex(i)}
                  className={`console-btn ${activeCommandIndex === i ? "active" : ""}`}
                >
                  {c.cmd}
                </button>
              ))}
            </div>

            {/* Screen */}
            <div className="console-screen">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "1rem" }}>🤖</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--cyan)", textTransform: "uppercase" }}>LANA_CONSOLE_V2.0</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }} />
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                </div>
              </div>

              {activeCommandIndex === null ? (
                <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)" }}>
                  <p style={{ fontSize: "0.9rem" }}>Select a command on the left to begin session</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
                  <div style={{ alignSelf: "flex-end", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px 8px 0 8px", padding: "10px 14px", fontSize: "0.85rem", color: "var(--text-primary)", maxWidth: "80%" }}>
                    {COMMANDS[activeCommandIndex].cmd}
                  </div>
                  <div style={{ alignSelf: "flex-start", background: "rgba(0, 229, 255, 0.04)", border: "1px solid rgba(0, 229, 255, 0.15)", borderRadius: "0 8px 8px 8px", padding: "12px 16px", fontSize: "0.85rem", color: "var(--text-primary)", maxWidth: "85%", lineHeight: 1.6 }}>
                    {typedResponse}
                    {isTyping && <span className="console-cursor">█</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          .console-cursor {
            animation: blink 0.8s infinite;
            color: var(--cyan);
            margin-left: 2px;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}</style>
      </section>

      {/* SECTION 4: HOW LANA IS DIFFERENT */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>The Difference</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>How LANA Is Different from Regular AI</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              Regular AI answers questions. LANA helps run the system.
            </p>
          </div>

          <div className="grid-split-rev" style={{ gap: "40px" }}>
            {/* Regular AI */}
            <div className="glass-card" style={{ padding: "clamp(20px, 5vw, 40px)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "16px", background: "rgba(239, 68, 68, 0.01)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ef4444", marginBottom: "24px" }}>Regular AI Chatbots</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {COMPARISON.regular.map((c, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <span style={{ color: "#ef4444", fontWeight: "bold" }}>✕</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LANA */}
            <div className="glass-card" style={{ padding: "clamp(20px, 5vw, 40px)", border: "1px solid rgba(0, 229, 255, 0.25)", borderRadius: "16px", background: "rgba(0, 229, 255, 0.02)", boxShadow: "0 0 35px rgba(0, 229, 255, 0.05)" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--cyan)", marginBottom: "24px" }}>LANA OS Operator</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {COMPARISON.lana.map((c, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    <span style={{ color: "var(--cyan)", fontWeight: "bold" }}>✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LANA INSIDE THE ECOSYSTEM */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="section-label" style={{ marginBottom: "20px" }}>Connective Tissue</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "16px" }}>LANA Connects Everything</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
              LANA makes the ecosystem feel like one connected business machine.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "20px" }}>
            {ECOSYSTEM.map((e, idx) => (
              <Link key={idx} href={e.href} style={{ textDecoration: "none", display: "block" }}>
                <div className="glass-card nav-dropdown-item" style={{ padding: "clamp(20px, 3.5vw, 28px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", background: "rgba(255,255,255,0.01)", height: "100%", transition: "all 0.2s" }}>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--cyan)", marginBottom: "10px" }}>{e.name}</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{e.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: LANA'S PERSONALITY */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid-split-rev" style={{ gap: "60px", alignItems: "center" }}>
            {/* Visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "440px", height: "clamp(200px, 40vw, 300px)", position: "relative", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(168, 85, 247, 0.15)", boxShadow: "0 10px 30px rgba(168, 85, 247, 0.05)" }}>
                <Image
                  src={prefixPath("/images/lana-nametag.png")}
                  alt="LANA personality context"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div>
              <div className="section-label" style={{ marginBottom: "20px" }}>Brand Voice</div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "20px" }}>Built with Personality, Purpose, and Care</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "32px", fontSize: "1.05rem" }}>
                LANA was designed to feel different. She is professional enough for business, but warm enough to feel like a real partner. She can help explain complex work in simple language, organize chaos, and push the user forward without making the system feel cold or robotic.
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {PERSONALITY.map((p) => (
                  <span key={p} style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--cyan)", border: "1px solid rgba(0, 229, 255, 0.2)", background: "rgba(0, 229, 255, 0.04)", borderRadius: "6px", padding: "8px 16px" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHO LANA IS FOR */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid-split" style={{ gap: "60px", alignItems: "center" }}>
            <div>
              <div className="section-label" style={{ marginBottom: "20px" }}>Target Audience</div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "20px" }}>Who LANA Is For</h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "32px", fontSize: "1.05rem" }}>
                LANA is built for people who have ideas, responsibilities, and work to move forward. She is especially powerful for users who are talented but overloaded.
              </p>

              <div className="grid-2col" style={{ gap: "14px" }}>
                {AUDIENCES.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ color: "var(--cyan)" }}>◆</span>
                    <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food truck photo context */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "440px", height: "clamp(200px, 40vw, 300px)", position: "relative", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0, 229, 255, 0.15)", boxShadow: "0 10px 30px rgba(0, 229, 255, 0.05)" }}>
                <Image
                  src={prefixPath("/images/lana-foodtruck.jpg")}
                  alt="LANA in food truck context"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LANA AS ASA'S PRIDE AND JOY */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "20px" }}>💜</div>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "24px" }}>The Pride and Joy of Lux Automaton</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <p>
              LANA is not just another feature inside Lux Automaton. She is one of the main reasons the system exists. She represents the belief that AI should not only be powerful — it should be useful, personal, organized, and connected to real life.
            </p>
            <p>
              Lux Automaton was built to help people who have vision but need structure. LANA is the guide that helps bring that vision into motion. She is the assistant, the operator, the planner, the builder partner, and the system voice.
            </p>
            <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", borderTop: "1px solid var(--border-subtle)", marginTop: "24px", paddingTop: "24px" }}>
              <p style={{ color: "var(--text-primary)", fontWeight: 700, fontStyle: "italic", maxWidth: "600px" }}>
                “LANA is the heart of the operation — the part of Lux Automaton that makes the technology feel alive.”
              </p>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--cyan)", textTransform: "uppercase", marginTop: "12px" }}>
                — Asa Pritchard, Founder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHAT MAKES LANA POWERFUL */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid-split" style={{ gap: "60px", alignItems: "center" }}>
            <div>
              <div className="section-label" style={{ marginBottom: "20px" }}>Key Strengths</div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "24px" }}>What Makes LANA Powerful</h2>
              
              <div className="grid-2col" style={{ gap: "16px" }}>
                {POWERFUL_BULLETS.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--cyan)", fontWeight: "bold" }}>✓</span>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle glow container */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="glass-card" style={{ padding: "clamp(20px, 5vw, 40px)", border: "1px solid rgba(0, 229, 255, 0.15)", borderRadius: "20px", background: "rgba(0, 229, 255, 0.01)", textAlign: "center", boxShadow: "0 0 30px rgba(0, 229, 255, 0.03)" }}>
                <span style={{ fontSize: "2.5rem" }}>⚙️</span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: "16px", marginBottom: "12px" }}>Ecosystem-Aware Intelligence</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Unlike disconnected models, LANA has active runtime context of Lux Coder setups, USB hardware configurations, and local system guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: TRUST AND BOUNDARIES */}
      <section style={{ padding: "80px 24px", background: "var(--bg-base)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "rgba(255,107,0,0.03)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "12px", padding: "28px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "8px" }}>
                Clinical & System Responsibility Notice
              </h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                LANA helps users organize, create, plan, and execute. She is designed to support better decisions, not replace the user’s judgment, licensed professionals, legal advice, financial advice, medical advice, or safety-critical expertise. For regulated industries like healthcare, finance, legal, and electrical work, LANA should be used as an operations and workflow assistant with proper human review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 24px", background: "var(--bg-void)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: "clamp(30px, 6vw, 60px) clamp(20px, 5vw, 40px)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: "24px", textAlign: "center", background: "rgba(6,11,20,0.85)", position: "relative", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.05) 0%, transparent 60%)", zIndex: 0, pointerEvents: "none" }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="section-label" style={{ marginBottom: "20px", display: "inline-flex" }}>Meet LANA</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "16px" }}>Meet the AI Operator Behind Lux Automaton.</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 40px" }}>
                LANA helps turn ideas into plans, plans into systems, and systems into daily action. She is the guide that connects Lux Coder, Lux Agent USB, Success Packs, and the full Lux Automaton ecosystem.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                <Link href="/products/lux-agent-usb" className="btn-primary" style={{ background: "linear-gradient(135deg, var(--cyan) 0%, #a855f7 100%)", color: "#000", boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)", padding: "14px 32px" }}>
                  Explore Lux Agent USB
                </Link>
                <Link href="/products/lux-coder" className="btn-outline" style={{ border: "1px solid rgba(0,229,255,0.3)" }}>
                  Build with Lux Coder
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "24px", fontStyle: "italic" }}>
                LANA is not just here to answer. She is here to help you move.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
