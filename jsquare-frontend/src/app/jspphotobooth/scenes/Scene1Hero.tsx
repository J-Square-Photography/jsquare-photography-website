'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { usePhotoboothTheme } from '../PhotoboothTheme'

export default function Scene1Hero() {
  const t = usePhotoboothTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLDivElement>(null)
  const word2Ref = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const subtagRef = useRef<HTMLDivElement>(null)
  const topBadgeRef = useRef<HTMLDivElement>(null)
  const bottomInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power3.out' },
        0
      )

      gsap.to(logoRef.current, {
        filter: 'drop-shadow(0 0 28px rgba(128,128,128,0.35))',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 2.2,
      })

      tl.fromTo(
        topBadgeRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.5
      )

      tl.fromTo(
        word1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
        1.2
      )

      tl.fromTo(
        word2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out' },
        1.55
      )

      tl.fromTo(
        ruleRef.current,
        { width: 0, opacity: 0 },
        { width: 280, opacity: 1, duration: 1.1, ease: 'power2.inOut' },
        2.4
      )

      tl.fromTo(
        taglineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        2.7
      )

      tl.fromTo(
        subtagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        3.1
      )

      tl.fromTo(
        bottomInfoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power2.out' },
        3.5
      )

      gsap.to(flashRef.current, {
        opacity: 0.14,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
        ease: 'none',
        delay: 5,
      })

      gsap.to(flashRef.current, {
        opacity: 0.1,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
        ease: 'none',
        delay: 8,
      })
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Bokeh blobs */}
      <div aria-hidden="true">
        {[
          { w: 300, h: 300, top: '5%',  left: '62%', op: 0.055, dur: '18s', del: '0s',   cls: 'pb-bokeh-drift-a' },
          { w: 220, h: 220, top: '22%', left: '-4%', op: 0.045, dur: '22s', del: '-6s',  cls: 'pb-bokeh-drift-b' },
          { w: 340, h: 340, top: '56%', left: '58%', op: 0.04,  dur: '25s', del: '-3s',  cls: 'pb-bokeh-drift-a' },
          { w: 190, h: 190, top: '72%', left: '8%',  op: 0.065, dur: '15s', del: '-9s',  cls: 'pb-bokeh-drift-b' },
          { w: 260, h: 260, top: '88%', left: '38%', op: 0.035, dur: '20s', del: '-4s',  cls: 'pb-bokeh-drift-a' },
          { w: 170, h: 170, top: '38%', left: '78%', op: 0.055, dur: '17s', del: '-12s', cls: 'pb-bokeh-drift-b' },
          { w: 320, h: 320, top: '12%', left: '18%', op: 0.035, dur: '23s', del: '-7s',  cls: 'pb-bokeh-drift-a' },
          { w: 150, h: 150, top: '62%', left: '28%', op: 0.045, dur: '14s', del: '-2s',  cls: 'pb-bokeh-drift-b' },
        ].map((b, i) => (
          <span
            key={i}
            className={b.cls}
            style={{
              position: 'absolute',
              width: b.w,
              height: b.h,
              top: b.top,
              left: b.left,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${t.bokehColor} 0%, transparent 70%)`,
              opacity: b.op,
              filter: 'blur(60px)',
              animationDuration: b.dur,
              animationDelay: b.del,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${t.gridColor.replace('0.1)', '0.018)')} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor.replace('0.1)', '0.018)')} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Top line */}
      <div style={{ position: 'absolute', top: 70, left: 40, right: 40, height: 1, background: t.line }} />

      {/* Top badge */}
      <div
        ref={topBadgeRef}
        style={{
          opacity: 0,
          position: 'absolute',
          top: 112,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            border: `1px solid ${t.line}`,
            padding: '8px 24px',
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: 6,
            color: t.textMuted,
            textTransform: 'uppercase',
          }}
        >
          J Square Photography
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 30px',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div ref={logoRef} style={{ opacity: 0, marginBottom: 60 }}>
          <Image
            src={t.logoSrc}
            alt="J Square Photography"
            width={360}
            height={78}
            priority
            style={{ objectFit: 'contain', width: 360, height: 'auto' }}
          />
        </div>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: t.line }} />
          <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: 4, color: t.textDim }}>✦</div>
          <div style={{ flex: 1, height: 1, background: t.line }} />
        </div>

        <div
          ref={word1Ref}
          style={{
            fontSize: 98,
            fontWeight: 100,
            letterSpacing: 20,
            color: t.text,
            lineHeight: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            clipPath: 'inset(0 100% 0 0)',
            paddingLeft: 20,
          }}
        >
          PHOTO
        </div>

        <div
          ref={word2Ref}
          style={{
            fontSize: 98,
            fontWeight: 100,
            letterSpacing: 20,
            color: t.text,
            lineHeight: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            clipPath: 'inset(0 100% 0 0)',
            marginBottom: 28,
            paddingLeft: 20,
          }}
        >
          BOOTH
        </div>

        <div
          ref={ruleRef}
          style={{ height: 1, width: 0, background: t.lineBright, marginBottom: 32 }}
        />

        <div
          ref={taglineRef}
          style={{
            opacity: 0,
            fontSize: 17,
            fontWeight: 300,
            letterSpacing: 6,
            color: t.text,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Professional Event Photography
        </div>

        <div
          ref={subtagRef}
          style={{
            opacity: 0,
            fontSize: 12,
            fontWeight: 200,
            letterSpacing: 3,
            color: t.textMuted,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Capture · Preserve · Celebrate
        </div>
      </div>

      {/* Bottom info */}
      <div
        ref={bottomInfoRef}
        style={{
          opacity: 0,
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        <div style={{ height: 1, width: 240, background: t.line }} />
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {['Photobooth', 'Photography', 'Videography'].map((s) => (
            <span key={s} style={{ fontSize: 10, fontWeight: 300, letterSpacing: 2, color: t.textDim, textTransform: 'uppercase' }}>
              {s}
            </span>
          ))}
        </div>
        <div style={{ height: 1, width: 240, background: t.line }} />
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 40, right: 40, height: 1, background: t.line }} />

      {/* Flash overlay */}
      <div
        ref={flashRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: t.flashColor,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
    </div>
  )
}
