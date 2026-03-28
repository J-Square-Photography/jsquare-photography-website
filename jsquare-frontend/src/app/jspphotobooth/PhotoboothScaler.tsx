'use client'
import { useEffect, useState } from 'react'

const DESIGN_W = 540
const DESIGN_H = 1920

export function PhotoboothScaler({
  bg,
  children,
}: {
  bg: string
  children: React.ReactNode
}) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Lock all scrolling on the document
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.margin = '0'
    document.body.style.padding = '0'

    const updateScale = () => {
      const scaleX = window.innerWidth / DESIGN_W
      const scaleY = window.innerHeight / DESIGN_H
      // Fit the design inside the viewport — use smaller of the two scales
      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.margin = ''
      document.body.style.padding = ''
    }
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: bg,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          position: 'relative',
          overflow: 'hidden',
          background: bg,
          flexShrink: 0,
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
