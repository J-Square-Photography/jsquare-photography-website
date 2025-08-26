'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Mesh, Group, Vector2 } from 'three'
import { Text, Float, RoundedBox } from '@react-three/drei'

export const CameraHero = () => {
  const groupRef = useRef<Group>(null)
  const bodyRef = useRef<Mesh>(null)
  const lensRef = useRef<Mesh>(null)
  const [mousePos, setMousePos] = useState(new Vector2(0, 0))
  
  // Smooth mouse following with React Spring
  const [springs, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    config: { 
      mass: 1, 
      tension: 170, 
      friction: 26 
    }
  }))

  // Mouse tracking with useFrame
  useFrame((state) => {
    // Get normalized mouse coordinates (-1 to 1)
    const x = state.mouse.x
    const y = state.mouse.y
    
    // Very subtle mouse following movement
    api.start({
      rotation: [-y * 0.1, x * 0.15, 0],
      position: [x * 0.1, y * 0.1, 0]
    })
    
    // Floating animation
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.6) * 0.002
    }
    
    // Lens rotation animation  
    if (lensRef.current) {
      lensRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <animated.group 
        ref={groupRef} 
        rotation={springs.rotation}
        position={springs.position}
      >
        {/* Camera Body */}
        <RoundedBox
          ref={bodyRef}
          args={[2.5, 1.8, 1.5]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial 
            color="#3a3a3c" 
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Camera Lens */}
        <mesh
          ref={lensRef}
          position={[0, 0, 0.8]}
          castShadow
        >
          <cylinderGeometry args={[0.8, 0.9, 0.6, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Lens Glass */}
        <mesh position={[0, 0, 1.05]}>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
          <meshStandardMaterial 
            color="#000000"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Brand Badge */}
        <RoundedBox
          args={[0.8, 0.3, 0.05]}
          radius={0.02}
          position={[0, 0.6, 0.8]}
        >
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        
        {/* Subtle "J" branding on camera */}
        <Text
          position={[0, 0.6, 0.82]}
          fontSize={0.15}
          color="#3a3a3c"
          anchorX="center"
          anchorY="middle"
        >
          J²
        </Text>
        
        {/* Viewfinder */}
        <RoundedBox
          args={[0.6, 0.4, 0.3]}
          radius={0.05}
          position={[0, 0.8, -0.3]}
        >
          <meshStandardMaterial 
            color="#3a3a3c"
            metalness={0.6}
            roughness={0.4}
          />
        </RoundedBox>
        
        {/* Camera Strap Connection Points */}
        <mesh position={[-1.1, 0.7, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        <mesh position={[1.1, 0.7, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Subtle particle effects when hovered */}
        <mesh position={[0, 0, 2]} visible={false}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </animated.group>
    </Float>
  )
}