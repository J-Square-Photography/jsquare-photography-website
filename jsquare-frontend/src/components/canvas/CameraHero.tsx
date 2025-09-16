'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const CameraHero = () => {
  const viewfinderRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()
  const [time, setTime] = useState(0)

  // Track mouse movement and animate viewfinder
  useFrame((state, delta) => {
    // Get mouse position from state
    const x = state.mouse.x
    const y = state.mouse.y

    // Smooth mouse tracking
    mouseRef.current.x += (x - mouseRef.current.x) * 0.08
    mouseRef.current.y += (y - mouseRef.current.y) * 0.08

    if (viewfinderRef.current) {
      // Subtle tilt based on mouse position
      viewfinderRef.current.rotation.y = mouseRef.current.x * 0.1
      viewfinderRef.current.rotation.x = -mouseRef.current.y * 0.08

      // Very subtle position shift for depth
      viewfinderRef.current.position.x = mouseRef.current.x * 0.3
      viewfinderRef.current.position.y = mouseRef.current.y * 0.2
    }

    // Update time for animations
    setTime(state.clock.elapsedTime)
  })

  // Viewfinder dimensions - much larger, almost full screen
  const width = 12
  const height = 7
  const cornerSize = 0.6

  return (
    <group ref={viewfinderRef} position={[0, 0, -1]}>
      {/* Viewfinder corners */}
      {/* Top-left corner */}
      <group position={[-width/2, height/2, 0]}>
        <mesh>
          <planeGeometry args={[cornerSize, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        <mesh>
          <planeGeometry args={[0.02, cornerSize]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
      </group>

      {/* Top-right corner */}
      <group position={[width/2, height/2, 0]}>
        <mesh position={[-cornerSize/2 + 0.01, 0, 0]}>
          <planeGeometry args={[cornerSize, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        <mesh position={[0, -cornerSize/2 + 0.01, 0]}>
          <planeGeometry args={[0.02, cornerSize]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
      </group>

      {/* Bottom-left corner */}
      <group position={[-width/2, -height/2, 0]}>
        <mesh position={[cornerSize/2 - 0.01, 0, 0]}>
          <planeGeometry args={[cornerSize, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        <mesh position={[0, cornerSize/2 - 0.01, 0]}>
          <planeGeometry args={[0.02, cornerSize]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
      </group>

      {/* Bottom-right corner */}
      <group position={[width/2, -height/2, 0]}>
        <mesh>
          <planeGeometry args={[cornerSize, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        <mesh>
          <planeGeometry args={[0.02, cornerSize]} />
          <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
      </group>

      {/* Center crosshair */}
      <group>
        <mesh>
          <planeGeometry args={[0.4, 0.01]} />
          <meshBasicMaterial color="#ff0000" opacity={0.5} transparent />
        </mesh>
        <mesh>
          <planeGeometry args={[0.01, 0.4]} />
          <meshBasicMaterial color="#ff0000" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Focus brackets - animated */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.5, 0.52, 4]} />
        <meshBasicMaterial color="#00ff00" opacity={0.6} transparent />
      </mesh>

      {/* Camera info indicators - using simple geometry instead of text */}
      {/* Top left - ISO indicator */}
      <group position={[-width/2 + 0.5, height/2 - 0.3, 0]}>
        <mesh>
          <planeGeometry args={[0.3, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Top center - Aperture indicator */}
      <group position={[0, height/2 - 0.3, 0]}>
        <mesh>
          <ringGeometry args={[0.08, 0.1, 6]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Top right - Shutter indicator */}
      <group position={[width/2 - 0.5, height/2 - 0.3, 0]}>
        <mesh>
          <planeGeometry args={[0.2, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <planeGeometry args={[0.1, 0.02]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      </group>

      {/* Bottom indicators */}
      <group position={[-width/2 + 0.5, -height/2 + 0.3, 0]}>
        <mesh>
          <circleGeometry args={[0.05, 8]} />
          <meshBasicMaterial color="#00ff00" opacity={0.7} transparent />
        </mesh>
      </group>

      <group position={[width/2 - 0.5, -height/2 + 0.3, 0]}>
        <mesh>
          <circleGeometry args={[0.04, 4]} />
          <meshBasicMaterial color="#ff0000" opacity={0.7} transparent />
        </mesh>
      </group>

      {/* Grid lines */}
      {[-width/6, width/6].map((x, i) => (
        <mesh key={`v-${i}`} position={[x, 0, 0]}>
          <planeGeometry args={[0.005, height]} />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
        </mesh>
      ))}
      {[-height/6, height/6].map((y, i) => (
        <mesh key={`h-${i}`} position={[0, y, 0]}>
          <planeGeometry args={[width, 0.005]} />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
        </mesh>
      ))}
    </group>
  )
}