'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  imageUrl: string
  rating: number
  service: string
}

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah & Michael Chen',
      role: 'Wedding Couple',
      content: 'J Square Photography captured our wedding day perfectly! Their team was professional, creative, and made everyone feel comfortable. The photos exceeded our expectations - every moment was beautifully documented. We couldn\'t be happier with our choice!',
      imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop',
      rating: 5,
      service: 'Wedding Photography'
    },
    {
      id: '2',
      name: 'David Tan',
      role: 'Marketing Director',
      company: 'Tech Innovators Pte Ltd',
      content: 'We\'ve used J Square for multiple corporate events and headshots. Their attention to detail and ability to capture the essence of our brand is remarkable. The DSLR photobooth was a huge hit at our annual dinner!',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 5,
      service: 'Corporate Events'
    },
    {
      id: '3',
      name: 'Emily Wong',
      role: 'Restaurant Owner',
      company: 'Flavours of Asia',
      content: 'The food photography session was amazing! J Square understood exactly what we needed to showcase our dishes. The images have significantly improved our online presence and menu presentation. Highly recommend!',
      imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      rating: 5,
      service: 'Food Photography'
    },
    {
      id: '4',
      name: 'James & Lisa Thompson',
      role: 'Anniversary Celebration',
      content: 'The team captured our 25th anniversary celebration beautifully. The event videography was cinematic and emotional - we\'ll treasure this video forever. Their professionalism and creativity made our special day even more memorable.',
      imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=400&h=400&fit=crop',
      rating: 5,
      service: 'Event Videography'
    },
    {
      id: '5',
      name: 'Rachel Lim',
      role: 'HR Manager',
      company: 'Global Finance Corp',
      content: 'J Square handled our company\'s headshot session for 200+ employees. They were efficient, professional, and delivered excellent results within our tight deadline. Everyone loved their photos!',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 5,
      service: 'Corporate Headshots'
    }
  ]

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
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [testimonials.length])

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
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about their experience with J Square Photography
          </p>
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
                {/* Client Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800">
                    <Image
                      src={testimonials[activeIndex].imageUrl}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating Stars */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light mb-6 leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Client Info */}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[activeIndex].role}
                      {testimonials[activeIndex].company && `, ${testimonials[activeIndex].company}`}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {testimonials[activeIndex].service}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Navigation Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-gray-900 dark:bg-white'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Events Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">7+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900 dark:text-white mb-2">5.0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}