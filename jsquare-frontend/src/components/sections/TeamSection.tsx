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

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  imageUrl?: string
  social?: {
    instagram?: string
    linkedin?: string
  }
}

interface TeamSectionProps {
  members?: TeamMember[]
}

export const TeamSection = ({ members }: TeamSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
    const cards = cardsRef.current

    if (!section || !cards) return

    // Small delay to ensure DOM is ready
    let ctx: any
    const timer = setTimeout(() => {
      // Create GSAP context for proper cleanup
      ctx = gsap.context(() => {
        // Animate cards on scroll
        if (cards.children.length > 0) {
          const teamCards = gsap.utils.toArray(cards.children)

          // Ensure cards are visible
          gsap.set(teamCards, { autoAlpha: 1 })

          // Animate from hidden
          gsap.from(teamCards, {
            autoAlpha: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards,
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
  }, [members])

  // Default team data if not from WordPress
  const defaultMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Tan Jian Jie',
      role: 'Founder, Photographer & Videographer',
      bio: 'Started J Square with a single camera and a relentless eye for the moment in-between moments — the ones people feel but rarely see',
      imageUrl: '/team-jj.png'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Videographer & Editor',
      bio: 'Specializing in cinematic wedding films and documentaries',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      role: 'Drone Operator & Photographer',
      bio: 'Capturing unique perspectives from above',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop'
    },
    {
      id: '4',
      name: 'Emily Watson',
      role: 'Post-Production Specialist',
      bio: 'Bringing stories to life through expert editing',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop'
    }
  ]

  const displayMembers = members || defaultMembers

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gray-50 dark:bg-gray-950"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Creative professionals dedicated to capturing your most important moments
            with artistry and precision
          </p>
        </div>

        {/* Team Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMembers.map((member) => (
            <div
              key={member.id}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-white dark:bg-gray-900">
                {member.imageUrl && (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {member.social && (
                    <div className="flex space-x-3">
                      {member.social.instagram && (
                        <a
                          href={`https://instagram.com/${member.social.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                          </svg>
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-sm text-gray-500 dark:text-gray-500 font-light">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}