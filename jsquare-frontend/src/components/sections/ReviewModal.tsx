'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GOOGLE_MAPS_URL, type GoogleReview } from '@/data/reviews'
import { getInitials, getRelativeTime } from '@/lib/utils/reviews'

interface ReviewModalProps {
  review: GoogleReview
  onClose: () => void
}

export const ReviewModal = ({ review, onClose }: ReviewModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Portal straight to <body>: TestimonialsSection wraps its content in a
  // `relative z-10` container, which forms its own stacking context — a
  // fixed-position child nested inside it is compared against the site nav
  // (fixed z-50) at that container's z-10, not the child's own z-index, so
  // it loses regardless of how high the child's own z-index is set. A portal
  // sidesteps this entirely by mounting outside that ancestor altogether.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          {/* Avatar */}
          <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800">
            {review.profilePhotoUrl ? (
              <Image
                src={review.profilePhotoUrl}
                alt={review.reviewerName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-3xl font-light select-none">
                {getInitials(review.reviewerName)}
              </div>
            )}
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Full quote */}
          <blockquote className="text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6">
            &ldquo;{review.reviewText}&rdquo;
          </blockquote>

          {/* Reviewer Info */}
          <div className="mb-4">
            <div className="font-medium text-gray-900 dark:text-white">
              {review.reviewerName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getRelativeTime(review.date)}
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View on Google Maps
          </a>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
