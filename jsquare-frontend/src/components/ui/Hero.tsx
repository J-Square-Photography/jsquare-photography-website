'use client'

import { useEffect, useRef, useState } from 'react'
import { Scene } from '@/components/canvas/Scene'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTheme } from 'next-themes'

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMotionPrompt, setShowMotionPrompt] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if mobile and iOS
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      setIsMobile(mobile)

      // Show motion prompt for iOS devices
      if (iOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setShowMotionPrompt(true)
      }
    }

    checkMobile()
  }, [])

  const handleMotionPermission = async () => {
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission()
      if (response === 'granted') {
        setShowMotionPrompt(false)
      }
    } catch (error) {
      console.error('Motion permission error:', error)
    }
  }

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const logo = logoRef.current

    if (!hero || !title || !subtitle || !logo) return

    // Initial state
    gsap.set([title, subtitle, logo], { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    })

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.to(logo, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(subtitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    // Parallax effect for text
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(title, { x: -x * 30, y: -y * 20, duration: 0.5, ease: 'power2.out' });
      gsap.to(subtitle, { x: -x * 20, y: -y * 15, duration: 0.5, ease: 'power2.out' });
      gsap.to(logo, { x: -x * 10, y: -y * 10, duration: 0.5, ease: 'power2.out' });
    };

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        const x = (event.gamma || 0) / 45; // Range: -1 to 1
        const y = (event.beta || 0) / 45; // Range: -1 to 1

        gsap.to(title, { x: -x * 30, y: -y * 20, duration: 0.5, ease: 'power2.out' });
        gsap.to(subtitle, { x: -x * 20, y: -y * 15, duration: 0.5, ease: 'power2.out' });
        gsap.to(logo, { x: -x * 10, y: -y * 10, duration: 0.5, ease: 'power2.out' });
      }
    };

    if (isMobile) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Scroll-driven parallax
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to([title, subtitle, logo], {
          y: progress * -100,
          opacity: 1 - progress * 0.8,
          duration: 0.1
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    }
  }, [isMobile])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-200">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full filter blur-[128px]" />
      </div>
      {/* WebGL Scene Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Scene className="w-full h-full" />
      </div>

      {/* Content Overlay - Adjusted for better composition */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none pt-20" style={{ zIndex: 10 }}>
        {/* Logo - switches based on theme */}
        <div ref={logoRef} className="mb-8">
          {mounted && (
            <Image
              src={theme === 'dark' ? "/jsquare_landscape_white.png" : "/jsquare_landscape_dark.png"}
              alt="J Square Photography"
              width={300}
              height={120}
              priority
              className="h-20 w-auto opacity-90"
            />
          )}
        </div>

        {/* Main Title - Enhanced */}
        <div ref={titleRef} className="mb-6">
          <h1 className="relative">
            <span className="block text-6xl md:text-8xl lg:text-9xl font-extralight text-gray-900 dark:text-white tracking-wider leading-none mb-2">
              CAPTURING
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white tracking-wide">
              MOMENTS
            </span>
            {/* Decorative line */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gray-900 dark:via-white to-transparent opacity-40" />
          </h1>
        </div>

        {/* Subtitle - Enhanced */}
        <div ref={subtitleRef} className="max-w-2xl mx-auto mt-8">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed tracking-wide">
            Professional photography & videography services
          </p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-light">Since 2017</span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-light">Singapore</span>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-light text-gray-500 dark:text-gray-400 tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border border-gray-400 dark:border-gray-600 rounded-full flex justify-center relative overflow-hidden">
              <div className="absolute w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full animate-scroll-indicator"></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-indicator {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(16px);
              opacity: 0;
            }
          }
          .animate-scroll-indicator {
            animation: scroll-indicator 2s ease-in-out infinite;
            top: 8px;
          }
        `}</style>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-black/20 pointer-events-none" style={{ zIndex: 5 }} />

      {/* Motion permission prompt for iOS */}
      {showMotionPrompt && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={handleMotionPermission}
            className="px-6 py-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Tap to enable motion controls
              </span>
            </div>
          </button>
        </div>
      )}
    </section>
  )
}