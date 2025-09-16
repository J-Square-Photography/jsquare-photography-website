'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const CameraHero = () => {
  const viewfinderRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const orientationRef = useRef({ beta: 0, gamma: 0 })
  const [hasPermission, setHasPermission] = useState(false)
  const { viewport } = useThree()
  const [time, setTime] = useState(0)
  const [useMouse, setUseMouse] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setUseMouse(true);
      window.removeEventListener('mousemove', handleMouseMove);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Setup device orientation for mobile
  useEffect(() => {
    // Handle device orientation
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // Beta: -180 to 180 (front-back tilt)
        // Gamma: -90 to 90 (left-right tilt)
        // Normalize values to -1 to 1 range
        const normalizedBeta = Math.max(-1, Math.min(1, event.beta / 45))
        const normalizedGamma = Math.max(-1, Math.min(1, event.gamma / 45))

        orientationRef.current.beta = normalizedBeta
        orientationRef.current.gamma = normalizedGamma
      }
    }

    // Check if iOS and needs permission
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const needsPermission = isIOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function'

    if (needsPermission) {
      // iOS devices need permission
      const requestPermission = async () => {
        try {
          const response = await (DeviceOrientationEvent as any).requestPermission()
          if (response === 'granted') {
            setHasPermission(true)
            window.addEventListener('deviceorientation', handleOrientation)
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error)
        }
      }

      // Add click handler to request permission on iOS
      const handleClick = () => {
        if (!hasPermission) {
          requestPermission()
        }
      }

      window.addEventListener('click', handleClick)
      requestPermission() // Try to request immediately

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
        window.removeEventListener('click', handleClick)
      }
    } else {
      // Android and other devices don't need permission
      setHasPermission(true)
      window.addEventListener('deviceorientation', handleOrientation)

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [hasPermission])

  // Track mouse movement or gyroscope and animate viewfinder
  useFrame((state, delta) => {
    let x, y

    if (useMouse) {
      // Use mouse for desktop
      x = state.mouse.x
      y = state.mouse.y
    } else if (hasPermission) {
      // Use gyroscope data for mobile
      x = orientationRef.current.gamma
      y = orientationRef.current.beta
    } else {
      // Fallback to mouse if no permissions
      x = state.mouse.x;
      y = state.mouse.y;
    }

    // Smooth tracking
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