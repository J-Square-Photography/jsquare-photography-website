'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

const SERVICES = [
  { icon: '📸', title: 'Photobooth Hire', desc: 'Full setup & on-site operator for your event' },
  { icon: '🖨️', title: 'Strip Prints', desc: 'Instant 2R strip prints — ready in seconds' },
  { icon: '🖼️', title: '4R Photo Prints', desc: 'Large format prints with custom event frames' },
  { icon: '💾', title: 'Digital Copies', desc: 'All photos delivered digitally after the event' },
]

export default function Scene4Services() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.pb-service-card')
      gsap.set(cards ?? [], { opacity: 0, y: 50, scale: 0.92 })

      const tl = gsap.timeline()

      tl.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.2)

      if (cards && cards.length > 0) {
        tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, 0.7)
      }

      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.6)
      tl.fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 2.0)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, background: t.bg, overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${t.gridColor} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: t.vignette, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: 70, left: 40, right: 40, height: 1, background: t.line }} />

      {/* Header */}
      <div
        ref={headerRef}
        style={{ opacity: 0, position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}
      >
        <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: 8, color: t.textMuted, textTransform: 'uppercase', marginBottom: 14 }}>
          Services
        </div>
        <div style={{ fontSize: 60, fontWeight: 200, letterSpacing: 5, color: t.text, textTransform: 'uppercase', lineHeight: 1, marginBottom: 20 }}>
          What We Offer
        </div>
        <div style={{ width: 60, height: 1, background: t.lineBright, margin: '0 auto' }} />
      </div>

      {/* Cards */}
      <div
        style={{
          position: 'absolute', top: 380, left: 32, right: 32,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, zIndex: 10,
        }}
      >
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="pb-service-card"
            style={{
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 16,
              padding: '36px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 18, lineHeight: 1 }}>{service.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: t.text, letterSpacing: 1, marginBottom: 12 }}>
              {service.title}
            </div>
            <div style={{ fontSize: 13, fontWeight: 300, color: t.textMuted, lineHeight: 1.7 }}>
              {service.desc}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        style={{
          opacity: 0, position: 'absolute', top: 960, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 10,
        }}
      >
        <div
          style={{
            padding: '20px 60px',
            border: `1px solid ${t.lineBright}`,
            color: t.text,
            fontSize: 13, fontWeight: 300, letterSpacing: 5,
            textTransform: 'uppercase', textAlign: 'center',
          }}
        >
          Book Your Event Today
        </div>
        <div style={{ fontSize: 12, fontWeight: 300, letterSpacing: 2, color: t.textDim }}>
          jsquarephotography.com
        </div>
      </div>

      {/* Bottom logo */}
      <div
        ref={bottomRef}
        style={{
          opacity: 0, position: 'absolute', bottom: 80, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10,
        }}
      >
        <div style={{ width: 200, height: 1, background: t.line }} />
        <Image
          src={t.logoSrc}
          alt="J Square Photography"
          width={200} height={44}
          style={{ objectFit: 'contain', width: 200, height: 'auto', opacity: 0.4 }}
        />
        <div style={{ width: 200, height: 1, background: t.line }} />
      </div>
    </div>
  )
}
