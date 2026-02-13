'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  googleReviews,
  fallbackReviews,
  GOOGLE_MAPS_URL,
  REVIEW_STATS,
  type GoogleReview,
} from '@/data/reviews'

gsap.registerPlugin(ScrollTrigger)

/** First letter(s) of a name, used as avatar fallback */
function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const reviews: GoogleReview[] =
    googleReviews.length > 0 ? googleReviews : fallbackReviews

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate section title
    gsap.fromTo(
      section.querySelector('.testimonials-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [reviews.length])

  const current = reviews[activeIndex]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-200/50 dark:from-gray-800/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-200/50 dark:from-gray-800/50 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-4">
            Client Stories
          </h2>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Don&apos;t just take our word for it &mdash; hear what our clients
            have to say about their experience with J Square Photography
          </p>

          {/* Google Reviews badge */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Google "G" logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Google Reviews
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {REVIEW_STATS.averageRating} ({REVIEW_STATS.totalReviews})
            </span>
          </a>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800">
                    {current.profilePhotoUrl ? (
                      <Image
                        src={current.profilePhotoUrl}
                        alt={current.reviewerName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-light select-none">
                        {getInitials(current.reviewerName)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating Stars — always render 5 */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < current.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light mb-6 leading-relaxed">
                    &ldquo;{current.reviewText}&rdquo;
                  </blockquote>

                  {/* Reviewer Info */}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {current.reviewerName}
                    </div>
                    {current.relativeTime && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {current.relativeTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-gray-900 dark:bg-white'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* View all on Google link */}
        <div className="text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-light text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View all reviews on Google
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Events Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">9+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">{REVIEW_STATS.averageRating}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
