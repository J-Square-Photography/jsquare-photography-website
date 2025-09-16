'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const CameraHero = () => {
  const frameRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Track mouse movement for subtle parallax effect
  useFrame((state) => {
    // Get mouse position from state
    const x = state.mouse.x
    const y = state.mouse.y

    // Smooth mouse tracking
    mouseRef.current.x += (x - mouseRef.current.x) * 0.08
    mouseRef.current.y += (y - mouseRef.current.y) * 0.08

    if (frameRef.current) {
      // Subtle tilt based on mouse position
      frameRef.current.rotation.y = mouseRef.current.x * 0.15
      frameRef.current.rotation.x = -mouseRef.current.y * 0.1

      // Very subtle position shift for depth
      frameRef.current.position.x = mouseRef.current.x * 0.5
      frameRef.current.position.y = mouseRef.current.y * 0.3
    }
  })

  // Photo frame dimensions (16:9 aspect ratio)
  const frameWidth = 4.5
  const frameHeight = 2.5
  const frameThickness = 0.15
  const borderWidth = 0.2

  return (
    <group ref={frameRef} position={[0, 0, -2]}>
      {/* Outer frame border */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[frameWidth + borderWidth, frameHeight + borderWidth, frameThickness]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Inner frame (the photo area) - slightly recessed */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[frameWidth - 0.1, frameHeight - 0.1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Subtle glass effect overlay */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[frameWidth - 0.1, frameHeight - 0.1]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          metalness={0}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
    </group>
  )
}