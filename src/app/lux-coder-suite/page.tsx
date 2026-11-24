import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Lux Coder Suite | Your Personal AI Programmer',
  description: 'Have an idea? Lux Coder writes the code, tests it, and builds it for you while you watch.'
};

const TIERS = [
  { 
    id: 'prod_coder_starter', 
    name: 'Starter', 
    price: 49, 
    tag: 'Perfect for small personal projects and websites.',
    features: ['Build simple apps', 'Basic error fixing', 'Standard speed']
  },
  { 
    id: 'prod_coder_pro', 
    name: 'Pro', 
    price: 149, 
    tag: 'Ideal for business owners launching applications.',
    features: ['Build full businesses', 'Advanced logic', 'Priority speed'],
    recommended: true
  },
  { 
    id: 'prod_coder_business', 
    name: 'Business', 
    price: 299, 
    tag: 'For agencies and teams moving fast.',
    features: ['Unlimited projects', 'Custom workflows', 'Team sharing']
  },
  { 
    id: 'prod_coder_vip', 
    name: 'VIP', 
    price: 500, 
    tag: 'Priority support and advanced multi-agent features.',
    features: ['1-on-1 support', 'Custom AI models', 'White-glove setup']
  }
];

export default function LuxCoderSuitePage() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Decorative Blur Spheres for Premium Tech Vibe */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(162,117,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45,212,191,0.05) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* HERO SECTION */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: '100px', color: '#2DD4BF', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
            ⚡ The Missing Piece
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, margin: '0 0 16px', background: 'linear-gradient(to right, #fff, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
            Your Personal Programmer
          </h1>
          <p style={{ fontSize: 20, color: 'var(--text-dim)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            Have a brilliant app idea but don&apos;t know how to code? Lux Coder Suite listens to what you want in plain English, and builds the entire software for you automatically.
          </p>
        </div>

        {/* VALUE PROP GRID */}
        <div className="grid grid-3" style={{ gap: 24, marginBottom: 80 }}>
          
          <div className="card" style={{ background: 'rgba(26, 26, 30, 0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>No Experience Needed</h3>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              You don&apos;t need to learn complicated programming languages. Just type out what you want your app to do, and watch it come to life on your screen.
            </p>
          </div>

          <div className="card" style={{ background: 'rgba(26, 26, 30, 0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💰</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Save Thousands</h3>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Hiring a freelance developer can cost $5,000+ per project. Lux Coder builds unlimited projects for you for a one-time purchase.
            </p>
          </div>

          <div className="card" style={{ background: 'rgba(26, 26, 30, 0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛡️</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Total Idea Protection</h3>
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Unlike public AI tools, everything built with the Lux Coder Suite stays 100% private on your own computer. Your billion-dollar ideas are safe.
            </p>
          </div>

        </div>

        {/* COMPETITIVE ADVANTAGE SECTION */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16 }}>The Lux Advantage</h2>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto' }}>
              Why the world&apos;s most successful creators choose Lux Coder over standard AI tools.
            </p>
          </div>
          
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div className="card" style={{ background: 'rgba(26, 26, 30, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: 32, borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>🧠 It Remembers Everything</h3>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Unlike other tools where you start from scratch every time, Lux Coder has a built-in memory and project wiki. It remembers your business, your preferences, and your past conversations so you never have to repeat yourself.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(26, 26, 30, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: 32, borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>⚡ Never Get Blocked</h3>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Our proprietary multi-account rotation ensures you never hit annoying &ldquo;rate limits&rdquo; or &ldquo;usage caps&rdquo; right when you&apos;re in the middle of a big project. You stay online, always.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(26, 26, 30, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: 32, borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>🧠 Access The World&apos;s Best Brains</h3>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                Don&apos;t get locked into one AI. Lux Coder lets you seamlessly switch between the smartest models on the planet (like Claude Opus and DeepSeek) with a single click in our live Zen menu.
              </p>
            </div>

            <div className="card" style={{ background: 'rgba(26, 26, 30, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: 32, borderRadius: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>🖱️ Simple 1-Click Install</h3>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                No complicated terminal setups, no coding environments to configure. Our Mac installer sets everything up for you instantly so you can start building immediately.
              </p>
            </div>
          </div>
        </div>

        {/* PRICING SECTION */}
        <div id="pricing" style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Choose Your Subscription</h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 600, margin: '0 auto' }}>
            Unlock the power of your own personal AI development team. Release pending — request only. Nothing is charged before launch.
          </p>
        </div>

        <div className="grid grid-4" style={{ gap: 20, marginBottom: 80 }}>
          {TIERS.map(tier => (
            <div key={tier.name} className="card" style={{ 
              position: 'relative', 
              padding: 32, 
              display: 'flex', 
              flexDirection: 'column',
              border: tier.recommended ? '2px solid #2DD4BF' : '1px solid rgba(255,255,255,0.1)',
              background: tier.recommended ? 'linear-gradient(to bottom, rgba(45,212,191,0.05), rgba(26,26,30,0.8))' : 'rgba(26, 26, 30, 0.6)'
            }}>
              {tier.recommended && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#2DD4BF', color: '#000', fontSize: 11, fontWeight: 'bold', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{tier.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', minHeight: 40, marginBottom: 24 }}>{tier.tag}</p>
              
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 40, fontWeight: 800 }}>${tier.price}</span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/mo</span>
              </div>

              <ul style={{ padding: 0, margin: '0 0 32px', listStyle: 'none', flexGrow: 1 }}>
                {tier.features.map(feature => (
                  <li key={feature} style={{ fontSize: 14, color: 'var(--text-dim)', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#2DD4BF' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={`/checkout?product_id=${tier.id}`} 
                className={`btn ${tier.recommended ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', textAlign: 'center', padding: '12px' }}
              >
                Request {tier.name} · release pending
              </Link>
            </div>
          ))}
        </div>

        {/* PREVIEW */}
        <div style={{ textAlign: 'center', borderRadius: 28, padding: '60px 28px', border: '1px solid var(--border)', background: 'radial-gradient(700px 300px at 50% 0, rgba(45,212,191,0.1), transparent 70%)' }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>See It In Action</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            The interface is designed to look like a simple chat window, but it connects directly to your files.
          </p>
          <div style={{ maxWidth: 800, margin: '0 auto', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <img src="/lux-agent-website/brand-banner.png" alt="Lux Coder Interface Preview" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

      </section>
    </main>
  );
}
