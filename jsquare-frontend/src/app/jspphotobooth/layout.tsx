import type { Metadata, Viewport } from 'next'
import { PhotoboothScaler } from './PhotoboothScaler'

export const metadata: Metadata = {
  title: 'J Square Photography — Photobooth',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function PhotoboothLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PhotoboothScaler bg="#0a0a0a">{children}</PhotoboothScaler>
}
