'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

export default function Scene5Review() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const topBadgeRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)
  const qrWrapRef = useRef<HTMLDivElement>(null)
  const scanTextRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const starEls = starsRef.current?.querySelectorAll('.pb-star')
      gsap.set(starEls ?? [], { scale: 0, opacity: 0 })
      gsap.set(qrWrapRef.current, { scale: 0.85, opacity: 0 })

      const tl = gsap.timeline()

      tl.fromTo(topBadgeRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.1)
      tl.fromTo(line1Ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, 0.3)
      tl.fromTo(line2Ref.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' }, 0.65)

      if (starEls && starEls.length > 0) {
        tl.to(starEls, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 1.0)
      }

      tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 1.6)
      tl.fromTo(promptRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 1.9)
      tl.to(qrWrapRef.current, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }, 2.1)

      gsap.to(qrWrapRef.current, {
        boxShadow: '0 0 50px 12px rgba(128,128,128,0.25)',
        duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3,
      })

      tl.fromTo(scanTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 3.0)
      tl.fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 3.5)
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
          Share Your Experience
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 230, left: 0, right: 0, textAlign: 'center', padding: '0 30px', zIndex: 10 }}>
        <div ref={line1Ref} style={{ fontSize: 64, fontWeight: 200, letterSpacing: 2, color: t.text, textTransform: 'uppercase', lineHeight: 1.1, clipPath: 'inset(0 100% 0 0)', marginBottom: 6 }}>
          Loved Your
        </div>
        <div ref={line2Ref} style={{ fontSize: 64, fontWeight: 200, letterSpacing: 2, color: t.text, textTransform: 'uppercase', lineHeight: 1.1, clipPath: 'inset(0 100% 0 0)', marginBottom: 40 }}>
          Experience?
        </div>

        {/* Stars */}
        <div ref={starsRef} style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 40 }}>
          {[1,2,3,4,5].map((n) => (
            <span key={n} className="pb-star" style={{ fontSize: 48, color: t.text, lineHeight: 1, display: 'inline-block' }}>★</span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div ref={dividerRef} style={{ position: 'absolute', top: 660, left: 60, right: 60, height: 1, background: t.line, transformOrigin: 'left center', zIndex: 10 }} />

      {/* QR section */}
      <div style={{ position: 'absolute', top: 700, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div ref={promptRef} style={{ opacity: 0, fontSize: 15, fontWeight: 300, letterSpacing: 4, color: t.textMuted, textTransform: 'uppercase', marginBottom: 32 }}>
          Scan to Leave a Review
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="pb-scan-pulse-ring" style={{ position: 'absolute', width: 310, height: 310, borderRadius: 12, border: `1px solid ${t.scanRingColor}`, animationDelay: '0s', pointerEvents: 'none' }} />
          <div className="pb-scan-pulse-ring" style={{ position: 'absolute', width: 310, height: 310, borderRadius: 12, border: `1px solid ${t.scanRingColor}`, animationDelay: '0.9s', pointerEvents: 'none' }} />

          <div ref={qrWrapRef} style={{ borderRadius: 12, overflow: 'hidden', background: '#FFFFFF', padding: 12, boxShadow: '0 0 0px 0px rgba(128,128,128,0)' }}>
            <Image src="/photobooth/google-qr.png" alt="Scan to leave a Google Review" width={280} height={280} style={{ display: 'block' }} />
          </div>
        </div>

        <div ref={scanTextRef} style={{ opacity: 0, textAlign: 'center', marginTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: 2, color: t.textDim, lineHeight: 1.8 }}>
            Google Reviews<br />Your feedback means the world to us
          </div>
        </div>
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
