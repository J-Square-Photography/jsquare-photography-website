'use client'
import { useState, useEffect } from 'react'
import { SCENE_DURATIONS, TRANSITION_DURATION, TOTAL_SCENES } from '../constants'

export function useSceneCycle() {
  const [scene, setScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const sceneDuration = SCENE_DURATIONS[scene]
    // Start fade-to-black before scene ends
    const fadeStart = sceneDuration - TRANSITION_DURATION

    const fadeTimer = setTimeout(() => {
      setIsTransitioning(true)
    }, fadeStart)

    const switchTimer = setTimeout(() => {
      setScene((s) => (s + 1) % TOTAL_SCENES)
      setIsTransitioning(false)
    }, sceneDuration)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(switchTimer)
    }
  }, [scene])

  return { scene, isTransitioning }
}
