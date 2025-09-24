'use client'

import { useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'

// Dynamic import for GSAP to avoid SSR issues
let gsap: any
let ScrollTrigger: any

if (typeof window !== 'undefined') {
  gsap = require('gsap').gsap
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

interface Service {
  id: string
  title: string
  category: 'main' | 'additional'
  description: string
  features: string[]
  imageUrl: string
  price?: string
}

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const mainCardsRef = useRef<HTMLDivElement>(null)
  const additionalCardsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Re-initialize GSAP if needed
    const initGSAP = () => {
      if (!gsap) {
        gsap = require('gsap').gsap
        ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)
      }
    }

    initGSAP()

    const section = sectionRef.current
    const mainCards = mainCardsRef.current
    const additionalCards = additionalCardsRef.current

    if (!section) return

    // Small delay to ensure DOM is ready
    let ctx: any
    const timer = setTimeout(() => {
      // Create GSAP context for proper cleanup
      ctx = gsap.context(() => {
        // Animate main service cards
        if (mainCards && mainCards.children.length > 0) {
          const cards = gsap.utils.toArray(mainCards.children)

          // Set initial visibility to ensure content is visible
          gsap.set(cards, { autoAlpha: 1 })

          // Animate from hidden to visible
          gsap.from(cards, {
            autoAlpha: 0,
            y: 50,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainCards,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          })
        }

        // Animate additional service cards
        if (additionalCards && additionalCards.children.length > 0) {
          const cards = gsap.utils.toArray(additionalCards.children)

          // Set initial visibility
          gsap.set(cards, { autoAlpha: 1 })

          // Animate from hidden
          gsap.from(cards, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: additionalCards,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          })
        }
      }, section)
    }, 100) // Small delay for DOM

    return () => {
      clearTimeout(timer)
      if (ctx) {
        ctx.revert()
      }
    }
  }, [])

  const mainServices: Service[] = [
    {
      id: 'photobooth',
      title: 'DSLR Photobooth',
      category: 'main',
      description: 'Premium photobooth experience with professional DSLR cameras and instant prints',
      features: [
        'Professional DSLR quality photos',
        'Instant printing on-site',
        'Custom backdrop designs',
        'Digital copies for all guests',
        'Props and accessories included',
        'Online gallery access'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop',
      price: 'From $800'
    },
    {
      id: 'event-photography',
      title: 'Event Photography',
      category: 'main',
      description: 'Comprehensive event coverage capturing every important moment',
      features: [
        'Full day coverage available',
        'Multiple photographers option',
        'High-resolution edited images',
        'Quick turnaround time',
        'Online gallery with downloads',
        'Print packages available'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      price: 'From $1,200'
    },
    {
      id: 'event-videography',
      title: 'Event Videography',
      category: 'main',
      description: 'Cinematic video coverage bringing your event story to life',
      features: [
        '4K Ultra HD recording',
        'Multiple camera angles',
        'Drone footage available',
        'Professional audio recording',
        'Highlight reel included',
        'Full ceremony/event edit'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      price: 'From $1,500'
    }
  ]

  const additionalServices = [
    {
      id: 'weddings',
      title: 'Weddings',
      description: 'Complete wedding coverage from preparation to reception',
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop'
    },
    {
      id: 'corporate',
      title: 'Corporate Headshots',
      description: 'Professional headshots for teams and individuals',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop'
    },
    {
      id: 'food',
      title: 'Food Photography',
      description: 'Appetizing food imagery for restaurants and brands',
      imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop'
    },
    {
      id: 'film',
      title: 'Film Production',
      description: 'Short films, documentaries, and commercial videos',
      imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop'
    }
  ]

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 px-6 bg-white dark:bg-black"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From intimate portraits to grand events, we offer comprehensive photography
            and videography services tailored to capture your unique story
          </p>
        </div>

        {/* Main Services */}
        <div className="mb-24">
          <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-12 text-center">
            Core Specialties
          </h3>
          <div ref={mainCardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {mainServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-2xl font-light text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  {service.price && (
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
                      <span className="text-2xl font-light text-gray-900 dark:text-white">
                        {service.price}
                      </span>
                      <button className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 text-sm font-light">
                        Get Quote
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-12 text-center">
            Additional Services
          </h3>
          <div ref={additionalCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="group relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                  <p className="text-sm text-white/90 font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light mb-6">
              Need something specific? We customize our services to meet your unique requirements.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-light"
              >
                Discuss Your Project
              </a>
              <a
                href="/portfolio"
                className="px-8 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 font-light"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}