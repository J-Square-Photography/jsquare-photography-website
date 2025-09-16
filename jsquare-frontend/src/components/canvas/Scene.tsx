'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { CameraHero } from './CameraHero'

interface SceneProps {
  className?: string
}

export const Scene = ({ className = '' }: SceneProps) => {
  const [mounted, setMounted] = useState(false)

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
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        style={{
          background: 'white'
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* 3D Camera Model */}
          <CameraHero />
        </Suspense>
      </Canvas>
    </div>
  )
}