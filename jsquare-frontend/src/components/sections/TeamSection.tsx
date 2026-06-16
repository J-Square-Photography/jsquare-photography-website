'use client'

import { useEffect, useRef, useLayoutEffect, useState } from 'react'
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
  details?: string
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Open/close animation state
  useEffect(() => {
    if (selectedMember) {
      // Slight delay so the element is mounted before animating in
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
    }
  }, [selectedMember])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedMember ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedMember])

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
    const cards = cardsRef.current

    if (!section || !cards) return

    let ctx: any
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (cards.children.length > 0) {
          const teamCards = gsap.utils.toArray(cards.children)
          gsap.set(teamCards, { autoAlpha: 1 })
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
    }, 100)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [members])

  const defaultMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Tan Jian Jie',
      role: 'Founder, Photographer & Videographer',
      bio: 'Started J Square with a single camera and a relentless eye for the moment in-between moments — the ones people feel but rarely see',
      details: 'Jian Jie founded J Square Photography in 2017 with a vision to capture authentic, unscripted moments. With nearly a decade of experience across weddings, corporate events, and commercial shoots, he brings both technical precision and a storyteller\'s instinct to every project.\n\nHis approach is simple: blend into the background, stay present, and be ready when real emotion surfaces. That philosophy has made him a trusted partner for clients who want images that last beyond the moment.',
      imageUrl: '/team-jj.png',
      social: {
        instagram: 'jsquarephotographysg',
        linkedin: 'company/j-square-photography',
      }
    },
    {
      id: '2',
      name: 'Ju Kong',
      role: 'Photographer',
      bio: 'An eye for detail and a passion for capturing authentic moments',
      details: 'Ju Kong brings a sharp eye for detail and a calm presence on set that puts subjects at ease. Specialising in event and portrait photography, he has a talent for finding the frame within the chaos of a live event.\n\nHis background in documentary-style shooting means he never misses a candid — every image feels lived-in, never staged.'
    },
    {
      id: '3',
      name: 'Eliza',
      role: 'Photographer',
      bio: 'Bringing creative vision and technical expertise to every shoot',
      details: 'Eliza\'s background in fine arts gives her photography a distinctive quality — compositions that feel intentional without ever feeling stiff. She excels in both studio and on-location work, adapting quickly to light and environment.\n\nWhether it\'s a corporate headshot or a full event coverage, Eliza delivers images with consistent polish and a creative edge.'
    }
  ]

  const displayMembers = members || defaultMembers

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 bg-gray-50 dark:bg-gray-950"
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
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member) => (
            <div key={member.id} className="group relative">
              {/* Image Container */}
              <div
                className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-white dark:bg-gray-900 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-5xl font-light text-gray-400 dark:text-gray-500 select-none">
                      {member.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSelectedMember(null)}
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Card */}
          <div
            className={`relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl transition-all duration-300 ${
              isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full md:w-2/5 flex-shrink-0 aspect-[3/4] md:aspect-auto min-h-[220px]">
              {selectedMember.imageUrl ? (
                <Image
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span className="text-6xl font-light text-gray-400 dark:text-gray-500 select-none">
                    {selectedMember.name.split(' ').map(w => w[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-1">
                {selectedMember.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                {selectedMember.role}
              </p>

              <div className="w-10 h-px bg-gray-300 dark:bg-gray-600 my-6" />

              <div className="space-y-4">
                {(selectedMember.details || selectedMember.bio || '').split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>

              {selectedMember.social && (
                <div className="flex space-x-3 mt-8">
                  {selectedMember.social.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMember.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                  )}
                  {selectedMember.social.linkedin && (
                    <a
                      href={`https://linkedin.com/${selectedMember.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
