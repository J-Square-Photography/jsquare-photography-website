'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraHero } from './CameraHero'
import { Environment } from '@react-three/drei'

interface SceneProps {
  className?: string
}

export const Scene = ({ className = '' }: SceneProps) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        shadows
        camera={{ 
          position: [0, 0, 5], 
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
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Soft ambient lighting for photography aesthetic */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Subtle point light for depth */}
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.3} 
            color="#3a3a3c"
          />
          
          {/* Professional studio environment */}
          <Environment preset="studio" />
          
          {/* Hero camera model */}
          <CameraHero />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none" />
    </div>
  )
}