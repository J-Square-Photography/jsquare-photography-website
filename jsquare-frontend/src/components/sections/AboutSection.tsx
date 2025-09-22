'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface AboutSectionProps {
  content?: {
    title: string
    description: string
    imageUrl?: string
  }
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const image = imageRef.current

    if (!section || !text || !image) return

    // Parallax effect for image
    gsap.fromTo(
      image,
      { y: -50 },
      {
        y: 50,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    // Fade in animation for text
    gsap.fromTo(
      text.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Default content if not from WordPress
  const defaultContent = {
    title: 'About J Square Photography',
    description: `With over 7 years of experience capturing life's precious moments,
    J Square Photography specializes in creating timeless visual stories.
    From intimate weddings to corporate events, we bring a unique perspective
    and artistic vision to every shoot. Our commitment to excellence and
    attention to detail ensures that every photograph tells a story worth remembering.`,
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=1000&fit=crop'
  }

  const displayContent = content || defaultContent

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-white dark:bg-black"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white">
              {displayContent.title}
            </h2>
            <div className="h-px w-20 bg-gray-900 dark:bg-white opacity-30" />
            <p className="text-lg font-light text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {displayContent.description}
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-light tracking-wider text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Get in Touch
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {displayContent.imageUrl && (
                <Image
                  src={displayContent.imageUrl}
                  alt="About J Square Photography"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-gray-900/10 dark:border-white/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}