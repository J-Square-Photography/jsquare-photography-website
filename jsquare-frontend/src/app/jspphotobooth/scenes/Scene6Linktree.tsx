'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

const LINKS = [
  'Website — jsquarephotography.com',
  'Instagram & Facebook',
  'WhatsApp & Telegram',
  'LinkedIn & Carousell',
]

export default function Scene6Linktree() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const topBadgeRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)
  const qrWrapRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const linkEls = linksRef.current?.querySelectorAll('.pb-link-item')
      gsap.set(qrWrapRef.current, { scale: 0.85, opacity: 0 })
      gsap.set(linkEls ?? [], { opacity: 0, x: -20 })

      const tl = gsap.timeline()

      tl.fromTo(topBadgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.1)
      tl.fromTo(line1Ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, 0.3)
      tl.fromTo(line2Ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, 0.65)
      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 1.2)
      tl.fromTo(promptRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.6)
      tl.to(qrWrapRef.current, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }, 1.9)

      // Breathing glow on QR
      gsap.to(qrWrapRef.current, {
        boxShadow: '0 0 50px 12px rgba(128,128,128,0.22)',
        duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.8,
      })

      // Link list
      if (linkEls && linkEls.length > 0) {
        tl.to(linkEls, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 2.8)
      }

      tl.fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 3.4)
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

      {/* Top badge */}
      <div
        ref={topBadgeRef}
        style={{ opacity: 0, position: 'absolute', top: 110, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}
      >
        <span style={{
          display: 'inline-block', border: `1px solid ${t.line}`,
          padding: '8px 24px', fontSize: 10, fontWeight: 300,
          letterSpacing: 6, color: t.textMuted, textTransform: 'uppercase',
        }}>
          Stay Connected
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center', padding: '0 30px', zIndex: 10 }}>
        <div ref={line1Ref} style={{ fontSize: 80, fontWeight: 200, letterSpacing: 6, color: t.text, textTransform: 'uppercase', lineHeight: 1.1, clipPath: 'inset(0 100% 0 0)', marginBottom: 6 }}>
          Find Us
        </div>
        <div ref={line2Ref} style={{ fontSize: 80, fontWeight: 200, letterSpacing: 6, color: t.text, textTransform: 'uppercase', lineHeight: 1.1, clipPath: 'inset(0 100% 0 0)', marginBottom: 0 }}>
          Online
        </div>
      </div>

      {/* Divider */}
      <div ref={dividerRef} style={{ position: 'absolute', top: 520, left: 60, right: 60, height: 1, background: t.line, transformOrigin: 'left center', zIndex: 10 }} />

      {/* QR section */}
      <div style={{ position: 'absolute', top: 555, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div ref={promptRef} style={{ opacity: 0, fontSize: 14, fontWeight: 300, letterSpacing: 4, color: t.textMuted, textTransform: 'uppercase', marginBottom: 28 }}>
          Scan to Visit Our Linktree
        </div>

        {/* QR with pulse rings */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="pb-scan-pulse-ring" style={{ position: 'absolute', width: 310, height: 310, borderRadius: 12, border: `1px solid ${t.scanRingColor}`, animationDelay: '0s', pointerEvents: 'none' }} />
          <div className="pb-scan-pulse-ring" style={{ position: 'absolute', width: 310, height: 310, borderRadius: 12, border: `1px solid ${t.scanRingColor}`, animationDelay: '0.9s', pointerEvents: 'none' }} />

          <div ref={qrWrapRef} style={{ borderRadius: 12, overflow: 'hidden', background: '#FFFFFF', padding: 12, boxShadow: '0 0 0px 0px rgba(128,128,128,0)' }}>
            <Image src="/photobooth/linktree-qr.png" alt="Scan to visit our Linktree" width={280} height={280} style={{ display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Link preview list */}
      <div
        ref={linksRef}
        style={{ position: 'absolute', top: 1150, left: 40, right: 40, zIndex: 10 }}
      >
        <div style={{ height: 1, background: t.line, marginBottom: 24 }} />
        <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: 5, color: t.textDim, textTransform: 'uppercase', marginBottom: 20 }}>
          All Our Socials &amp; Links
        </div>
        {LINKS.map((link) => (
          <div
            key={link}
            className="pb-link-item"
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              paddingBottom: 18, marginBottom: 4,
              borderBottom: `1px solid ${t.line}`,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.text, opacity: 0.6, flexShrink: 0 }} />
            <span style={{ fontSize: 15, fontWeight: 300, color: t.text, letterSpacing: 1 }}>{link}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div ref={footerRef} style={{ opacity: 0, position: 'absolute', bottom: 70, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, zIndex: 10 }}>
        <div style={{ width: 240, height: 1, background: t.line }} />
        <Image src={t.logoSrc} alt="J Square Photography" width={200} height={44} style={{ objectFit: 'contain', width: 200, height: 'auto', opacity: 0.35 }} />
        <div style={{ width: 240, height: 1, background: t.line }} />
      </div>
    </div>
  )
}
