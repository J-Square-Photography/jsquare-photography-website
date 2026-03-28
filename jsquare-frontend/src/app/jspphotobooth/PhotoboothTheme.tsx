'use client'
import { createContext, useContext } from 'react'

export interface PBTheme {
  bg: string
  text: string
  textMuted: string
  textDim: string
  textFaint: string
  line: string
  lineBright: string
  card: string
  cardBorder: string
  bokehColor: string
  gridColor: string
  flashColor: string
  scanRingColor: string
  qrBg: string
  // prebuilt gradient strings
  gradOverlay: string
  vignette: string
  radialGlow: string
  logoSrc: string
}

export const DARK_THEME: PBTheme = {
  bg: '#0a0a0a',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.45)',
  textDim: 'rgba(255,255,255,0.25)',
  textFaint: 'rgba(255,255,255,0.1)',
  line: 'rgba(255,255,255,0.1)',
  lineBright: 'rgba(255,255,255,0.55)',
  card: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.12)',
  bokehColor: 'rgba(255,255,255,1)',
  gridColor: 'rgba(255,255,255,0.1)',
  flashColor: '#FFFFFF',
  scanRingColor: 'rgba(255,255,255,0.45)',
  qrBg: '#FFFFFF',
  gradOverlay:
    'linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.15) 45%, rgba(10,10,10,0.82) 72%, #0a0a0a 100%)',
  vignette:
    'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(10,10,10,0.95) 80%)',
  radialGlow:
    'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)',
  logoSrc: '/jsquare_landscape_white.png',
}

export const LIGHT_THEME: PBTheme = {
  bg: '#F0EEE9',
  text: '#0a0a0a',
  textMuted: 'rgba(10,10,10,0.5)',
  textDim: 'rgba(10,10,10,0.3)',
  textFaint: 'rgba(10,10,10,0.12)',
  line: 'rgba(0,0,0,0.1)',
  lineBright: 'rgba(0,0,0,0.4)',
  card: 'rgba(0,0,0,0.04)',
  cardBorder: 'rgba(0,0,0,0.1)',
  bokehColor: 'rgba(60,60,60,1)',
  gridColor: 'rgba(0,0,0,0.12)',
  flashColor: '#000000',
  scanRingColor: 'rgba(0,0,0,0.3)',
  qrBg: '#FFFFFF',
  gradOverlay:
    'linear-gradient(to bottom, rgba(240,238,233,0.1) 0%, rgba(240,238,233,0.15) 45%, rgba(240,238,233,0.88) 72%, #F0EEE9 100%)',
  vignette:
    'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(240,238,233,0.95) 80%)',
  radialGlow:
    'radial-gradient(circle, rgba(0,0,0,0.025) 0%, transparent 70%)',
  logoSrc: '/jsquare_landscape_dark.png',
}

const PhotoboothThemeContext = createContext<PBTheme>(DARK_THEME)

export function PhotoboothThemeProvider({
  theme,
  children,
}: {
  theme: PBTheme
  children: React.ReactNode
}) {
  return (
    <PhotoboothThemeContext.Provider value={theme}>
      {children}
    </PhotoboothThemeContext.Provider>
  )
}

export function usePhotoboothTheme() {
  return useContext(PhotoboothThemeContext)
}
