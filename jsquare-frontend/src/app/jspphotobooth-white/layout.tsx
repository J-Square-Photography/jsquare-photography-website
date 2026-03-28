import type { Metadata, Viewport } from 'next'
import { PhotoboothScaler } from '../jspphotobooth/PhotoboothScaler'

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

export default function PhotoboothWhiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PhotoboothScaler bg="#F0EEE9">{children}</PhotoboothScaler>
}
