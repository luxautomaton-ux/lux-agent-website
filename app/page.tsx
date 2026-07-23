"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { prefixPath } from "@/lib/prefix";

const pathways = [
  { label: "Build", title: "AI systems that belong to you", copy: "Private agents, coding environments, business operating systems, and portable local intelligence.", href: "/products", tone: "cyan" },
  { label: "Learn", title: "Go from curious to capable", copy: "Hands-on workshops, founder notes, books, and practical labs for people ready to make something real.", href: "/workshops", tone: "violet" },
  { label: "Grow", title: "A community that keeps moving", copy: "Weekly intelligence, new videos, live build sessions, and a place to share what you are creating.", href: "/community", tone: "mint" },
];

const worlds = [
  {
    id: "founder",
    label: "Founder",
    signal: "Build the operating system behind your ambition.",
    title: "Turn your next idea into a system.",
    copy: "Start with private AI, a practical build plan, and a place to keep the work moving after the first spark.",
    product: "Lux Business",
    productHref: "/products/lux-business",
    workshop: "AI Foundations for Founders",
    workshopHref: "/workshops",
    media: "Founder Notes on Lux TV",
    mediaHref: "/lux-tv",
    image: "/images/lux-world-hero.png",
    accent: "cyan",
  },
  {
    id: "creator",
    label: "Creator",
    signal: "Create the work. Keep the ownership.",
    title: "Make ideas visible—and make them yours.",
    copy: "Prototype, write, publish, and turn your creative energy into a repeatable practice with LANA and the Lux toolset.",
    product: "LANA",
    productHref: "/products/lana",
    workshop: "LANA Content Command Center",
    workshopHref: "/workshops",
    media: "Build Breakdowns on Lux TV",
    mediaHref: "/lux-tv",
    image: "/images/lana-banner.jpg",
    accent: "violet",
  },
  {
    id: "team",
    label: "Team",
    signal: "Give your whole team a better way to move.",
    title: "Connect the work without losing the human part.",
    copy: "Equip your team with private tools, clear workflows, and an AI system that supports the way you already do your best work.",
    product: "Lux Agent USB",
    productHref: "/products/lux-agent-usb",
    workshop: "Build Your First AI Business",
    workshopHref: "/workshops",
    media: "System Walkthroughs on Lux TV",
    mediaHref: "/lux-tv",
    image: "/images/lux-coder-card.png",
    accent: "mint",
  },
  {
    id: "kids",
    label: "Young Builder",
    signal: "Curiosity is a superpower. Let’s give it tools.",
    title: "A joyful first world for young AI creators.",
    copy: "Safe workshops, colorful projects, and a community made for kids who want to make stories, art, robots, and a better future.",
    product: "Lux AI Kids",
    productHref: "/products/lux-ai-kids",
    workshop: "AI Explorer Workshop",
    workshopHref: "/workshops",
    media: "Lux TV Kids",
    mediaHref: "/lux-tv-kids",
    image: "/images/lux-kids-world.png",
    accent: "kids",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [worldId, setWorldId] = useState("founder");
  const featured = PRODUCTS.filter((p) => ["lux-codex", "lux-business", "lux-agent-usb", "lux-coder", "lana", "lux-writeoff"].includes(p.id));
  const activeWorld = worlds.find((world) => world.id === worldId) ?? worlds[0];

  return (
    <div className="lux-world">
      <section className="world-hero">
        <video className="world-hero-video" autoPlay muted loop playsInline poster={prefixPath("/images/lux-world-hero.png")} aria-label="Lux Automaton introduction video">
          <source src={prefixPath("/videos/lux-automaton-intro.mp4")} type="video/mp4" />
        </video>
        <div className="world-hero-shade" />
        <div className="world-orbit orbit-a" /><div className="world-orbit orbit-b" />
        <div className="world-hero-content">
          <p className="world-kicker"><span /> Independent intelligence. Human ambition.</p>
          <h1>Build the future<br /><em>with AI.</em></h1>
          <p className="world-lede">Lux Automaton turns ideas into private AI systems, software, workshops, and operating playbooks—built by Asa, powered by LANA, and made for people ready to own what comes next.</p>
          <div className="world-actions">
            <Link className="world-button primary" href="/start-here">Enter Lux World <b>↗</b></Link>
            <Link className="world-button ghost" href="/products">Explore the ecosystem</Link>
          </div>
        </div>
        <div className="world-status"><span>01</span><p>Scroll to explore</p><i /></div>
      </section>

      <section className={`world-command-deck deck-${activeWorld.accent}`} aria-labelledby="world-command-title">
        <div className="command-deck-intro">
          <p>00 / MAKE IT YOURS</p>
          <h2 id="world-command-title">Your next step<br /><em>has a world.</em></h2>
          <p>Choose what you are building. Lux will point you toward the right tool, workshop, and signal to start with.</p>
          <div className="command-tabs" role="tablist" aria-label="Choose your Lux path">
            {worlds.map((world) => (
              <button key={world.id} role="tab" aria-selected={activeWorld.id === world.id} onClick={() => setWorldId(world.id)}>{world.label}</button>
            ))}
          </div>
        </div>
        <div className="command-console">
          <Image src={prefixPath(activeWorld.image)} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />
          <div className="command-console-shade" />
          <div className="command-console-copy">
            <span>{activeWorld.signal}</span>
            <h3>{activeWorld.title}</h3>
            <p>{activeWorld.copy}</p>
            <Link className="world-button primary" href={activeWorld.productHref}>Explore {activeWorld.product} <b>↗</b></Link>
          </div>
          <div className="command-route">
            <Link href={activeWorld.workshopHref}><small>01 / Learn</small><strong>{activeWorld.workshop}</strong><b>↗</b></Link>
            <Link href={activeWorld.mediaHref}><small>02 / Watch</small><strong>{activeWorld.media}</strong><b>↗</b></Link>
          </div>
        </div>
      </section>

      <aside className="signal-rail" aria-label="Page chapters">
        <a href="#vision"><b>01</b><span>Vision</span></a><a href="#systems"><b>02</b><span>Systems</span></a><a href="#learning"><b>03</b><span>Learning</span></a><a href="#dispatch"><b>04</b><span>Dispatch</span></a>
      </aside>

      <section id="vision" className="world-section world-manifesto">
        <div className="world-index">01 / THE THESIS</div>
        <div><h2>AI should create <em>leverage,</em><br />not dependency.</h2><p>We build private, practical systems that help founders, families, and communities do more—without giving away their ideas, data, or agency.</p></div>
        <div className="manifesto-stats"><span><strong>10+</strong> systems built</span><span><strong>Local</strong> first by design</span><span><strong>1</strong> connected ecosystem</span></div>
      </section>

      <section id="systems" className="world-section">
        <header className="world-section-head"><div><p>02 / THE ECOSYSTEM</p><h2>Tools that work<br /><em>like a team.</em></h2></div><Link href="/products">View every product ↗</Link></header>
        <div className="system-grid">
          {featured.map((product, index) => (
            <Link href={product.pageHref} key={product.id} className={`system-card system-${index + 1}`}>
              <div className="system-card-image">{product.heroImage || product.bgImage ? <Image src={prefixPath(product.heroImage || product.bgImage || "")} alt="" fill sizes="(max-width: 800px) 100vw, 40vw" /> : <div className="system-glyph">{product.icon}</div>}</div>
              <div className="system-card-copy"><span>{String(index + 1).padStart(2, "0")} · {product.status}</span><h3>{product.name}</h3><p>{product.tagline}</p><b>Explore system ↗</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="learning" className="world-section world-pathways">
        <header className="world-section-head"><div><p>03 / CHOOSE YOUR PATH</p><h2>There is a door<br /><em>for everyone.</em></h2></div></header>
        <div className="pathway-grid">{pathways.map((path) => <Link href={path.href} className={`pathway-card ${path.tone}`} key={path.label}><span>{path.label}</span><h3>{path.title}</h3><p>{path.copy}</p><b>Open pathway →</b></Link>)}</div>
        <Link href="/lux-ai-kids" className="kids-banner">
          <Image src={prefixPath("/images/lux-kids-world.png")} alt="Lux AI Kids mascot in a colorful creative AI lab" fill sizes="100vw" />
          <div className="kids-banner-shade" /><div className="kids-banner-copy"><span>NEW WORLD</span><h2>Lux AI Kids</h2><p>Where young creators learn AI, make stories, build robots, and solve real problems—safely.</p><b>Launch Kids World ↗</b></div>
        </Link>
      </section>

      <section id="dispatch" className="world-section world-dispatch">
        <div className="dispatch-image"><Image src={prefixPath("/images/founder-asa.png")} alt="Asa Pritchard, founder of Lux Automaton" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
      <div className="dispatch-copy"><p>04 / FROM THE FOUNDER</p><h2>“Don’t wait for the future.<br /><em>Build your part of it.</em>”</h2><p>Founder notes, build breakdowns, honest lessons, and weekly intelligence from inside the Lux lab.</p><div className="world-actions"><Link className="world-button primary" href="/founders">Read founder notes</Link><Link className="world-button ghost" href="/blog">Open the dispatch</Link></div></div>
      </section>

      <section className="world-newsletter" id="newsletter"><div><p>THE SIGNAL / WEEKLY</p><h2>One useful idea.<br />Every week.</h2></div><form onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }}>{joined ? <strong>You&apos;re on the list. Welcome to the signal.</strong> : <><label><span>Email address</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourworld.com" /></label><button>Join the signal →</button><small>Founder notes, workshops, product drops, and AI Kids updates. No noise.</small></>}</form></section>
    </div>
  );
}
