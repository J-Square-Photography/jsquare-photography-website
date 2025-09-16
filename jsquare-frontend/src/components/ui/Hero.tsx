'use client'

import { useEffect, useRef } from 'react'
import { Scene } from '@/components/canvas/Scene'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-200">
      {/* WebGL Scene Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Scene className="w-full h-full" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none" style={{ zIndex: 10 }}>
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <Image
            src="/jsquared_landscape_dark.png"
            alt="J Square Photography"
            width={300}
            height={120}
            priority
            className="h-20 w-auto opacity-90"
          />
        </div>

        {/* Main Title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-gray-900 dark:text-white tracking-wider leading-none">
            CAPTURING
            <br />
            <span className="font-light">MOMENTS</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed tracking-wide">
            Professional photography & videography services
            <br />
            <span className="text-base">Since 2017</span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-black/20 pointer-events-none" style={{ zIndex: 5 }} />
    </section>
  )
}