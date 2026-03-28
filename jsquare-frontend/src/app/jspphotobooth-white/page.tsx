'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSceneCycle } from '../jspphotobooth/hooks/useSceneCycle'
import { TRANSITION_DURATION, TOTAL_SCENES } from '../jspphotobooth/constants'
import { PhotoboothThemeProvider, LIGHT_THEME } from '../jspphotobooth/PhotoboothTheme'
import Scene1Hero from '../jspphotobooth/scenes/Scene1Hero'
import Scene2Gallery from '../jspphotobooth/scenes/Scene2Gallery'
import Scene3Showcase from '../jspphotobooth/scenes/Scene3Showcase'
import Scene4Services from '../jspphotobooth/scenes/Scene4Services'
import Scene5Review from '../jspphotobooth/scenes/Scene5Review'
import Scene6Linktree from '../jspphotobooth/scenes/Scene6Linktree'

const SCENES = [Scene1Hero, Scene2Gallery, Scene3Showcase, Scene4Services, Scene5Review, Scene6Linktree]

const IMAGE_PATHS = [
  '/photobooth/strip-halloween-1.png',
  '/photobooth/strip-halloween-2.png',
  '/photobooth/strip-midautumn-1.png',
  '/photobooth/strip-midautumn-2.png',
  '/photobooth/google-qr.png',
  '/photobooth/linktree-qr.png',
  '/jsquare_landscape_dark.png',
]

export default function PhotoboothWhitePage() {
  const { scene, isTransitioning } = useSceneCycle()

  useEffect(() => {
    IMAGE_PATHS.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  const ActiveScene = SCENES[scene]

  return (
    <PhotoboothThemeProvider theme={LIGHT_THEME}>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION / 2000 }}
        >
          <ActiveScene />
        </motion.div>
      </AnimatePresence>

      {/* Scene indicator dots */}
      <div
        style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 100, pointerEvents: 'none',
        }}
      >
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === scene ? 20 : 6, height: 6, borderRadius: 3,
              background: i === scene ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.2)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Cinematic fade-to-white overlay */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#F0EEE9', pointerEvents: 'none', zIndex: 50 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: TRANSITION_DURATION / 2000, ease: 'easeInOut' }}
      />
    </PhotoboothThemeProvider>
  )
}
