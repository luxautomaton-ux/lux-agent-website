'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import BuildMyLuxCheckout from '@/components/BuildMyLuxCheckout'

const PRODUCTS: Record<string, { name: string; price: string; type: string; accent: string; icon: string; desc: string; features: string[]; note?: string }> = {
  prod_download: {
    name: 'Digital Download', price: '$299', type: 'one-time', accent: '#60A5FA', icon: '💻',
    desc: 'Lux Agent OS digital download — set it up yourself on your own USB drive or computer.',
    features: ['Lux Agent OS digital download', 'LANA basic', 'Business HQ', 'CRM basic', 'Lux Vault basic', 'Training Workshop', 'Start Here Guide', 'Success Pack preview', 'Local/private mode', 'Setup instructions'],
  },
  prod_usb_starter: {
    name: 'Preloaded USB', price: '$499', type: 'one-time', accent: '#A275FF', icon: '💾',
    desc: 'Premium solid-state USB drive with Lux Agent OS pre-installed and ready to launch.',
    features: ['Premium USB drive included', 'Lux Agent OS pre-installed', 'LANA basic', 'Business HQ', 'CRM basic', 'Lux Vault basic', 'Success Pack preview', 'Training Workshop', 'Start Here Guide', 'Privacy-first setup', 'Ready-to-launch folder structure'],
    note: 'Ships within 3–5 business days.',
  },
  prod_usb_business: {
    name: 'Business Setup', price: '$999', type: 'one-time', accent: '#2DD4BF', icon: '💼',
    desc: 'Preloaded USB plus a guided setup session with custom Success Pack and CRM configuration.',
    features: ['Everything in Preloaded USB', 'Custom Business HQ setup', 'One full Success Pack', 'CRM starter setup', 'Website starter setup', 'First 30-day business plan', 'Training walkthrough', 'Privacy settings walkthrough'],
    note: 'Ships within 3–5 business days. Setup session scheduled after delivery.',
  },
  prod_usb_pro: {
    name: 'Pro Setup', price: '$1,999', type: 'one-time', accent: '#FBBF24', icon: '🏆',
    desc: 'Full done-with-you business system — built around your goals with 90-day support.',
    features: ['Everything in Business Setup', 'Personalized Success Pack', 'Money Suite setup', 'Web Intelligence setup', 'Website & lead system setup', '90-day business plan', 'AI Team setup', 'Lux Budgeter setup', 'Lux WriteOff setup', 'Training session', 'Launch checklist'],
    note: 'Ships within 3–5 business days. Includes onboarding session.',
  },
  sub_money_suite: {
    name: 'Money Suite', price: '$79/mo', type: 'monthly', accent: '#34D399', icon: '💰',
    desc: 'Take control of your business finances with AI-powered budgeting, write-off tracking, money leak detection, and CPA-ready reports.',
    features: ['Lux Budgeter Pro', 'Money Leak Finder', 'Lux WriteOff Pro', 'Receipt Tracker', 'Business License Coach', 'Money Reports', 'Tax & Money Vault', 'CPA-ready export packet'],
    note: 'Requires Lux Agent USB (any tier). Cancel anytime.',
  },
  sub_full_business: {
    name: 'Full Business OS', price: '$149/mo', type: 'monthly', accent: '#A275FF', icon: '⚡',
    desc: 'The complete AI-powered business operating system — Money Suite plus Web Intelligence, advanced lead research, competitor reports, and monthly business review workflows.',
    features: ['Everything in Money Suite', 'Web Intelligence Pro', 'Advanced lead research', 'Competitor reports', 'Vendor/tool savings reports', 'Success Pack advanced execution', 'AI Team advanced reports', 'Monthly business review workflows'],
    note: 'Requires Lux Agent USB (any tier). Cancel anytime. Best value for serious operators.',
  },
  addon_website: {
    name: 'Website Setup', price: '$499–$2,500', type: 'add-on', accent: '#60A5FA', icon: '🌐',
    desc: 'Dedicated website or landing page build powered by Lux Coder — LANA plans, Chuck Cole executes.',
    features: ['Website planning with LANA', 'Landing page copy', 'Offer structure', 'Lead capture setup', 'Mobile-friendly design', 'Review before publish'],
    note: 'Final price based on scope. Book a call to discuss your needs.',
  },
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') || ''
  const productId = searchParams.get('product_id') || ''
  const product = PRODUCTS[productId]

  if (source === 'build-my-lux') {
    return <BuildMyLuxCheckout />
  }

  if (!product) {
    return (
      <main style={{ paddingTop: 120, paddingBottom: 100 }}>
        <section className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
          <h1 style={{ fontSize: 36, marginBottom: 16 }}>Choose a Plan</h1>
          <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 32 }}>
            Visit our pricing page to see all available plans and pick the one that fits your business.
          </p>
          <Link href="/store" className="btn btn-primary">View Pricing</Link>
        </section>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      <div style={{ position: 'absolute', top: '8%', right: '5%', width: 400, height: 400, background: `radial-gradient(circle, ${product.accent}10 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      <section className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>

        <div className="grid grid-2" style={{ gap: 40, alignItems: 'flex-start' }}>

          {/* Product details */}
          <div>
            <Link href="/store" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              ← Back to Pricing
            </Link>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{product.icon}</div>
            <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>{product.name}</h1>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: product.accent }}>{product.price}</span>
              {product.type === 'monthly' && <span style={{ fontSize: 16, color: 'var(--text-dim)', marginLeft: 4 }}>per month</span>}
              {product.type === 'one-time' && <span style={{ fontSize: 16, color: 'var(--text-dim)', marginLeft: 4 }}>one-time</span>}
            </div>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 24 }}>{product.desc}</p>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>What&apos;s Included</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {product.features.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15 }}>
                  <span style={{ color: product.accent, flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'var(--text-dim)' }}>{f}</span>
                </li>
              ))}
            </ul>

            {product.note && (
              <p style={{ fontSize: 13, color: 'var(--text-dim)', opacity: 0.7, fontStyle: 'italic' }}>
                ℹ️ {product.note}
              </p>
            )}
          </div>

          {/* Order form */}
          <div className="card" style={{ padding: 32, position: 'sticky', top: 100, borderTop: `3px solid ${product.accent}` }}>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Get {product.name}</h2>

            <form
              onSubmit={e => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const data = new FormData(form)
                const name = data.get('name') as string
                const email = data.get('email') as string
                const phone = data.get('phone') as string
                const business = data.get('business') as string

                const subject = encodeURIComponent(`Order: ${product.name} (${product.price})`)
                const body = encodeURIComponent(
                  `New Order Request\n\nProduct: ${product.name}\nPrice: ${product.price}\nType: ${product.type}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${business}\n\nPlease send payment instructions.`
                )
                window.location.href = `mailto:luxagent@gmail.com?subject=${subject}&body=${body}`
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>Full Name *</label>
                <input name="name" required placeholder="Your name" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>Email *</label>
                <input name="email" type="email" required placeholder="you@email.com" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>Phone</label>
                <input name="phone" placeholder="(optional)" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6, display: 'block' }}>Business Name</label>
                <input name="business" placeholder="Your business" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              </div>

              <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', margin: '4px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700 }}>
                  <span>Total</span>
                  <span style={{ color: product.accent }}>{product.price}</span>
                </div>
                {product.type === 'monthly' && (
                  <p style={{ fontSize: 12, color: 'var(--text-dim)', margin: '4px 0 0', opacity: 0.7 }}>Billed monthly. Cancel anytime.</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, fontSize: 16, textAlign: 'center' }}>
                {product.type === 'monthly' ? `Subscribe — ${product.price}` : `Order — ${product.price}`}
              </button>

              <p style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center', opacity: 0.5, margin: 0, lineHeight: 1.5 }}>
                You&apos;ll receive payment instructions via email. Your information is private and never shared.
              </p>
            </form>
          </div>
        </div>

      </section>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main style={{ paddingTop: 120, paddingBottom: 100 }}>
        <section className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)' }}>Loading...</p>
        </section>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
