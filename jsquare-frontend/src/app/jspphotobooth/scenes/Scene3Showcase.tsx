'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

const STATS = [
  { number: '100+', label: 'Events Covered' },
  { number: '9+',   label: 'Years Experience' },
  { number: '50+',  label: 'Clients Served' },
  { number: '4.9',  label: 'Average Rating' },
]

const QUALITIES = [
  'Instant Prints in Seconds',
  'Professional On-Site Operator',
  'Custom Event Overlays & Frames',
  'Digital Copies Included',
  'Same-Day Setup',
  'Flexible Packages',
]

export default function Scene3Showcase() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const qualitiesRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statEls = containerRef.current?.querySelectorAll('.pb-stat')
      const qualEls = containerRef.current?.querySelectorAll('.pb-quality')
      gsap.set(statEls ?? [], { opacity: 0, y: 40, scale: 0.9 })
      gsap.set(qualEls ?? [], { opacity: 0, x: -30 })

      const tl = gsap.timeline()

      // Header
      tl.fromTo(
        headerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.out' },
        0.2
      )

      // Rule
      tl.fromTo(
        ruleRef.current,
        { width: 0 },
        { width: 80, duration: 0.8, ease: 'power2.inOut' },
        0.9
      )

      // Stats pop in
      if (statEls && statEls.length > 0) {
        tl.to(
          statEls,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.5)',
          },
          1.1
        )
      }

      // Quality list
      if (qualEls && qualEls.length > 0) {
        tl.to(
          qualEls,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          2.0
        )
      }

      // Bottom
      tl.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        2.9
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        background: t.bg,
        overflow: 'hidden',
      }}
    >
      {/* Background subtle glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: t.radialGlow,
          pointerEvents: 'none',
        }}
      />

      {/* Top line */}
      <div style={{ position: 'absolute', top: 70, left: 40, right: 40, height: 1, background: t.line }} />

      {/* Header */}
      <div
        ref={headerRef}
        style={{
          position: 'absolute',
          top: 110,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10,
          clipPath: 'inset(0 100% 0 0)',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: 8, color: t.textMuted, textTransform: 'uppercase', marginBottom: 14 }}>
          Why Choose Us
        </div>
        <div style={{ fontSize: 58, fontWeight: 200, letterSpacing: 5, color: t.text, textTransform: 'uppercase', lineHeight: 1 }}>
          By The Numbers
        </div>
      </div>

      {/* Rule */}
      <div style={{ position: 'absolute', top: 285, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <div
          ref={ruleRef}
          style={{ height: 1, width: 0, background: t.lineBright }}
        />
      </div>

      {/* Stats 2×2 grid */}
      <div
        style={{
          position: 'absolute',
          top: 330,
          left: 32,
          right: 32,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          zIndex: 10,
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.number}
            className="pb-stat"
            style={{
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 16,
              padding: '36px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 46,
                fontWeight: 200,
                color: t.text,
                lineHeight: 1,
                marginBottom: 12,
                letterSpacing: -1,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: t.textMuted,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quality checklist */}
      <div
        ref={qualitiesRef}
        style={{
          position: 'absolute',
          top: 820,
          left: 40,
          right: 40,
          zIndex: 10,
        }}
      >
        <div style={{ height: 1, background: t.line, marginBottom: 28 }} />
        {QUALITIES.map((q) => (
          <div
            key={q}
            className="pb-quality"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 20,
              marginBottom: 4,
              borderBottom: `1px solid ${t.line}`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: t.text,
                flexShrink: 0,
                opacity: 0.7,
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 300, color: t.text, letterSpacing: 1 }}>
              {q}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom logo */}
      <div
        ref={bottomRef}
        style={{
          opacity: 0,
          position: 'absolute',
          bottom: 70,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          zIndex: 10,
        }}
      >
        <div style={{ height: 1, width: 220, background: t.line }} />
        <Image
          src={t.logoSrc}
          alt="J Square Photography"
          width={200}
          height={44}
          style={{ objectFit: 'contain', width: 200, height: 'auto', opacity: 0.4 }}
        />
        <div style={{ height: 1, width: 220, background: t.line }} />
      </div>
    </div>
  )
}
