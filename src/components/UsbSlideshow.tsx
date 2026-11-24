'use client'

import React, { useState, useEffect, useRef } from 'react'

const SLIDES = [
  { img: '/lux-agent-website/usb-slide-1.jpg', alt: 'Premium USB drive with smart LCD display' },
  { img: '/lux-agent-website/usb-slide-2.jpg', alt: 'USB drive showing data transfer speeds' },
  { img: '/lux-agent-website/usb-slide-3.jpg', alt: 'USB drive dual interface Type-A and Type-C' },
  { img: '/lux-agent-website/usb-slide-4.jpg', alt: 'USB drive intelligent temperature management' },
  { img: '/lux-agent-website/usb-slide-5.jpg', alt: 'USB drive premium zinc alloy construction' },
  { img: '/lux-agent-website/usb-slide-6.jpg', alt: 'USB drive high speed data transfer' },
  { img: '/lux-agent-website/usb-slide-7.jpg', alt: 'Premium USB drive product overview' },
]

const FEATURES = [
  { icon: '📺', title: 'Smart LCD Display', desc: 'See storage capacity, read/write speeds, transfer progress, and drive temperature at a glance.' },
  { icon: '🧊', title: 'AI Temperature Control', desc: 'Built-in AI balances speed and heat — no overheating during long transfers.' },
  { icon: '⚡', title: '1090 MB/s Speed', desc: 'USB 3.2 Gen 2 — transfer 1GB files in about one second.' },
  { icon: '🔒', title: 'LDPC Error Correction', desc: 'Auto-detects and repairs data errors, protecting your business files.' },
  { icon: '🔌', title: 'Dual USB-A + USB-C', desc: 'Works with laptops, desktops, phones, tablets, TVs, and car systems.' },
  { icon: '💎', title: 'Premium TLC Memory', desc: 'Higher density, better durability, and stable performance over time.' },
]

export default function UsbSlideshow() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function goTo(index: number) {
    setCurrent(index)
    resetTimer()
  }

  function goNext() {
    setCurrent(prev => (prev + 1) % SLIDES.length)
    resetTimer()
  }

  function goPrev() {
    setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
    resetTimer()
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div style={{ marginBottom: 80 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 100, color: '#FBBF24', fontWeight: 600, fontSize: 13, marginBottom: 18 }}>
          💾 Premium Hardware Included
        </div>
        <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 12 }}>Built on a <span style={{ color: '#FBBF24' }}>Professional-Grade</span> USB Drive</h2>
        <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
          Every preloaded Lux Agent USB ships on a premium solid-state drive with a built-in smart display, AI temperature management, and 1090 MB/s transfer speeds. This is not a basic thumb drive. Release pending — not yet shipping.
        </p>
      </div>

      {/* Slideshow */}
      <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 32px', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(251,191,36,0.2)', background: '#111' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1464/600', overflow: 'hidden' }}>
          {SLIDES.map((slide, i) => (
            <img
              key={slide.img}
              src={slide.img}
              alt={slide.alt}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === current ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Left arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            style={{
              position: 'absolute', top: '50%', left: 14, transform: 'translateY(-50%)', zIndex: 10,
              width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', fontSize: 22, fontWeight: 700, lineHeight: 1,
              background: 'rgba(0,0,0,0.65)', color: '#fff',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >‹</button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            aria-label="Next slide"
            style={{
              position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', zIndex: 10,
              width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer', fontSize: 22, fontWeight: 700, lineHeight: 1,
              background: 'rgba(0,0,0,0.65)', color: '#fff',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >›</button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: '14px 0', background: 'rgba(0,0,0,0.4)' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 10, height: 10, borderRadius: 10,
                border: 'none', cursor: 'pointer', padding: 0,
                background: i === current ? '#FBBF24' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 800, margin: '0 auto' }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{ padding: '16px 18px', background: 'var(--bg-elevated)', borderRadius: 14, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{f.title}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
