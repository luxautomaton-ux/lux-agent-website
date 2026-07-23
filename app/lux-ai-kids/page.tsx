"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefixPath } from "@/lib/prefix";

const missions = [
  { icon:"✦", title:"AI Explorer", age:"Ages 7–10", copy:"Meet friendly AI, learn what it can do, and train your first tiny helper.", color:"pink" },
  { icon:"◉", title:"Art Studio", age:"Ages 8–13", copy:"Turn big imagination into characters, posters, worlds, and visual stories.", color:"blue" },
  { icon:"▰", title:"Storyteller Lab", age:"Ages 9–14", copy:"Write a hero, direct a scene, and bring an original story to life with video.", color:"purple" },
  { icon:"⌁", title:"Robot Builders", age:"Ages 10–15", copy:"Design a helpful robot and solve a problem in your home or community.", color:"green" },
];

export default function LuxAiKidsPage(){
  const [email,setEmail]=useState(""); const [joined,setJoined]=useState(false);
  return <div className="kids-world">
    <section className="kids-hero">
      <div className="kids-cloud cloud-1"/><div className="kids-cloud cloud-2"/>
      <div className="kids-hero-copy"><p className="kids-pill">A safe place for bold young minds</p><h1>Learn AI.<br/><span>Build tomorrow.</span><br/>Change the world.</h1><p>Creative workshops, joyful videos, smart stories, and real-world challenges for the next generation of builders.</p><div className="kids-actions"><a href="#missions">Pick a mission ✦</a><Link href="/contact">For parents & educators</Link></div><div className="kids-trust"><span>✓ Project-based</span><span>✓ Human-guided</span><span>✓ Safety-first</span></div></div>
      <div className="kids-hero-art"><Image src={prefixPath("/images/lux-kids-world.png")} alt="Lux AI Kids guide welcoming young creators to an AI lab" fill priority sizes="(max-width: 900px) 100vw, 55vw"/></div>
    </section>
    <section className="kids-ticker"><span>CREATE</span><b>✦</b><span>QUESTION</span><b>✦</b><span>BUILD</span><b>✦</b><span>SHARE</span><b>✦</b><span>HELP</span></section>
    <section id="missions" className="kids-section"><header><p>CHOOSE YOUR ADVENTURE</p><h2>What will you make first?</h2><span>Every workshop ends with something real you can show, share, or improve.</span></header><div className="mission-grid">{missions.map((m,i)=><article className={`mission-card ${m.color}`} key={m.title}><div className="mission-number">0{i+1}</div><div className="mission-icon">{m.icon}</div><small>{m.age}</small><h3>{m.title}</h3><p>{m.copy}</p><button>Open mission →</button></article>)}</div></section>
    <section className="kids-video-zone"><div><p>WATCH · TRY · CREATE</p><h2>Lux Kids TV</h2><p>Short videos that turn “How does that work?” into “Look what I made!” New experiments, creative challenges, and studio visits every week.</p><Link href="/lux-tv-kids">Open Lux TV Kids ▶</Link></div><div className="kids-screen"><video controls playsInline poster={prefixPath("/images/lux-kids-poster.png")} aria-label="Lux AI Kids promotional video"><source src={prefixPath("/videos/lux-ai-kids-promo.mp4")} type="video/mp4" /></video><span>PLAY FILM</span></div></section>
    <section className="kids-section kids-journal"><header><p>THE CURIOSITY JOURNAL</p><h2>Big questions. Bright ideas.</h2></header><div className="kids-story-grid"><article><span>AI 101</span><h3>Can a computer have an imagination?</h3><p>A kid-friendly look at patterns, prompts, and where brand-new ideas really begin.</p><b>Read together →</b></article><article><span>MAKE A DIFFERENCE</span><h3>Five problems in your neighborhood AI could help solve</h3><p>Start with kindness, curiosity, and a notebook. The best technology begins by noticing.</p><b>Start the challenge →</b></article><article><span>FUTURE JOBS</span><h3>Meet the robot coach, prompt director, and AI safety detective</h3><p>Tomorrow’s coolest jobs might not have names yet. You could help invent them.</p><b>Explore careers →</b></article></div></section>
    <section className="kids-grownups"><div><p>GROWN-UPS’ CORNER</p><h2>Creative confidence,<br/>with guardrails.</h2></div><div><p>Lux AI Kids is designed for guided, age-appropriate learning. Workshops emphasize critical thinking, privacy, consent, source-checking, and using AI to help people—not replace human judgment.</p><ul><li>Clear age bands and learning goals</li><li>No unsupervised public publishing</li><li>Printable activity and conversation guides</li><li>School, library, and community workshop options</li></ul><Link href="/contact">Bring Lux AI Kids to your community →</Link></div></section>
    <section className="kids-letter"><div><p>THE LUX LAB LETTER</p><h2>Projects for curious kids,<br/>notes for caring grown-ups.</h2></div><form onSubmit={e=>{e.preventDefault();if(email)setJoined(true)}}>{joined?<strong>Welcome to the lab! Your first mission is on its way.</strong>:<><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="grownup@email.com"/><button>Join free →</button><small>One thoughtful email each week. Unsubscribe anytime.</small></>}</form></section>
  </div>
}
