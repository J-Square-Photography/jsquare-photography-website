'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSceneCycle } from './hooks/useSceneCycle'
import { TRANSITION_DURATION, TOTAL_SCENES } from './constants'
import { PhotoboothThemeProvider, DARK_THEME } from './PhotoboothTheme'
import Scene1Hero from './scenes/Scene1Hero'
import Scene2Gallery from './scenes/Scene2Gallery'
import Scene3Showcase from './scenes/Scene3Showcase'
import Scene4Services from './scenes/Scene4Services'
import Scene5Review from './scenes/Scene5Review'
import Scene6Linktree from './scenes/Scene6Linktree'

const SCENES = [Scene1Hero, Scene2Gallery, Scene3Showcase, Scene4Services, Scene5Review, Scene6Linktree]

const IMAGE_PATHS = [
  '/photobooth/strip-halloween-1.png',
  '/photobooth/strip-halloween-2.png',
  '/photobooth/strip-midautumn-1.png',
  '/photobooth/strip-midautumn-2.png',
  '/photobooth/google-qr.png',
  '/photobooth/linktree-qr.png',
  '/jsquare_landscape_white.png',
]

export default function PhotoboothPage() {
  const { scene, isTransitioning } = useSceneCycle()

  useEffect(() => {
    IMAGE_PATHS.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  const ActiveScene = SCENES[scene]

  return (
    <PhotoboothThemeProvider theme={DARK_THEME}>
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
        {SCENES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === scene ? 20 : 6, height: 6, borderRadius: 3,
              background: i === scene ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Cinematic fade-to-black overlay */}
      <motion.div
        style={{ position: 'absolute', inset: 0, background: '#000000', pointerEvents: 'none', zIndex: 50 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: TRANSITION_DURATION / 2000, ease: 'easeInOut' }}
      />
    </PhotoboothThemeProvider>
  )
}
