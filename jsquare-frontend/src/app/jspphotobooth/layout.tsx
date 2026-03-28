import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'J Square Photography — Photobooth',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 540,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function PhotoboothLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 540,
          height: 1920,
          position: 'relative',
          overflow: 'hidden',
          background: '#0a0a0a',
          flexShrink: 0,
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
        }}
      >
        {children}
      </div>
    </div>
  )
}
