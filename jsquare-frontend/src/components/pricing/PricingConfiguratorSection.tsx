'use client'

import { useRef, useLayoutEffect } from 'react'
import { PricingConfigurator } from './PricingConfigurator'

// Dynamic import for GSAP to avoid SSR issues
let gsap: any
let ScrollTrigger: any

if (typeof window !== 'undefined') {
  gsap = require('gsap').gsap
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

export const PricingConfiguratorSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const initGSAP = () => {
      if (!gsap) {
        gsap = require('gsap').gsap
        ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
      }
    }

    initGSAP()

    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    let ctx: any
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const elements = content.children
        gsap.set(elements, { autoAlpha: 1 })

        gsap.from(elements, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        })
      }, section)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [])

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 px-6 bg-white dark:bg-black"
    >
      <div className="container mx-auto" ref={contentRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-4">
            Build Your Quote
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select your service, skill level, and duration to see real-time pricing.
            Send your configuration directly to us on WhatsApp.
          </p>
        </div>

        {/* Configurator */}
        <PricingConfigurator />
      </div>
    </section>
  )
}
