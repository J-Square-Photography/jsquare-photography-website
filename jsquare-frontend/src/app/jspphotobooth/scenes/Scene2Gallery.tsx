'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

const STRIPS = [
  { src: '/photobooth/strip-halloween-1.png', alt: 'Admiralty Halloween 2025', rotate: -9, x: 8 },
  { src: '/photobooth/strip-halloween-2.png', alt: 'Admiralty Halloween 2025 group', rotate: -3, x: 143 },
  { src: '/photobooth/strip-midautumn-1.png', alt: 'Mid-Autumn Festival 2023', rotate: 3, x: 275 },
  { src: '/photobooth/strip-midautumn-2.png', alt: 'Mid-Autumn Festival 2023 group', rotate: 9, x: 405 },
]

export default function Scene2Gallery() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const stripShadow =
    t.bg === '#0a0a0a'
      ? '0 20px 60px rgba(0,0,0,0.85)'
      : '0 20px 60px rgba(0,0,0,0.2)'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const strips = containerRef.current?.querySelectorAll('.pb-strip')
      gsap.set(strips ?? [], { opacity: 0 })

      const tl = gsap.timeline()

      tl.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.2)
      tl.fromTo(ruleRef.current, { width: 0 }, { width: 120, duration: 0.8, ease: 'power2.inOut' }, 0.5)

      if (strips && strips.length > 0) {
        strips.forEach((strip, i) => {
          const fromX = i < 2 ? -700 : 700
          const fromRotate = i < 2 ? -35 : 35
          tl.fromTo(
            strip,
            { x: fromX, rotate: fromRotate, opacity: 0 },
            { x: 0, rotate: STRIPS[i].rotate, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
            0.4 + i * 0.15
          )
        })
      }

      tl.fromTo(taglineRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 1.8)
      tl.fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 2.2)

      if (strips && strips.length > 0) {
        strips.forEach((strip, i) => {
          gsap.to(strip, {
            y: i % 2 === 0 ? -10 : 10,
            duration: 3 + i * 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: 2 + i * 0.3,
          })
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, background: t.bg, overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, background: t.radialGlow, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: 70, left: 40, right: 40, height: 1, background: t.line }} />

      {/* Header */}
      <div
        ref={headerRef}
        style={{ opacity: 0, position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}
      >
        <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: 8, color: t.textMuted, textTransform: 'uppercase', marginBottom: 14 }}>
          Portfolio
        </div>
        <div style={{ fontSize: 64, fontWeight: 200, letterSpacing: 8, color: t.text, textTransform: 'uppercase', lineHeight: 1 }}>
          Our Work
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <div ref={ruleRef} style={{ height: 1, width: 0, background: t.lineBright }} />
        </div>
      </div>

      {/* Strip fan */}
      <div style={{ position: 'absolute', top: 380, left: 0, width: 540, height: 760 }}>
        {STRIPS.map((strip, i) => (
          <div
            key={strip.src}
            className="pb-strip"
            style={{
              position: 'absolute',
              left: strip.x,
              top: 40,
              width: 128,
              height: 384,
              transform: `rotate(${strip.rotate}deg)`,
              transformOrigin: 'bottom center',
              boxShadow: stripShadow,
              zIndex: i + 1,
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <Image src={strip.src} alt={strip.alt} fill style={{ objectFit: 'cover' }} sizes="128px" />
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        style={{ opacity: 0, position: 'absolute', bottom: 280, left: 0, right: 0, textAlign: 'center', padding: '0 40px', zIndex: 10 }}
      >
        <div style={{ fontSize: 26, fontWeight: 200, letterSpacing: 4, color: t.text, textTransform: 'uppercase', marginBottom: 18 }}>
          Capturing Your Finest Moments
        </div>
        <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: 2, color: t.textMuted }}>
          Instant prints · Custom event frames · Digital copies
        </div>
      </div>

      {/* Bottom */}
      <div
        ref={bottomRef}
        style={{ opacity: 0, position: 'absolute', bottom: 80, left: 40, right: 40, zIndex: 10 }}
      >
        <div style={{ height: 1, background: t.line, marginBottom: 14 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, fontWeight: 300, letterSpacing: 3, color: t.textDim }}>J SQUARE PHOTOGRAPHY</span>
          <span style={{ fontSize: 10, fontWeight: 300, letterSpacing: 3, color: t.textDim }}>SG</span>
        </div>
      </div>
    </div>
  )
}
