'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { CameraHero } from './CameraHero'
import { useTheme } from 'next-themes'

interface SceneProps {
  className?: string
}

export const Scene = ({ className = '' }: SceneProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'white'
        }} />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{
          position: [0, 0, 10],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[theme === 'dark' ? '#0a0a0a' : '#fafafa']} />
        <Suspense fallback={null}>
          {/* Softer, more subtle lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
          />

          {/* 3D Camera Model */}
          <CameraHero />
        </Suspense>
      </Canvas>
    </div>
  )
}