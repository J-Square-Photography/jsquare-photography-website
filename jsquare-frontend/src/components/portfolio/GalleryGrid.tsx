'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GalleryPost } from '@/lib/wordpress/api'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryGridProps {
  galleries: GalleryPost[]
  loading?: boolean
}

export function GalleryGrid({ galleries, loading }: GalleryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-900 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-light text-gray-600 dark:text-gray-400">
          No galleries found matching your filters.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Try adjusting your filter settings.
        </p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {galleries.map((gallery, index) => (
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={`/portfolio/${gallery.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900"
            >
              {gallery.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={gallery.featuredImage.node.sourceUrl}
                  alt={gallery.featuredImage.node.altText || gallery.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-light mb-2">{gallery.title}</h3>

                  {/* Display filters info */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {gallery.portfoliodetails?.skilllevel?.[0] && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded capitalize">
                        {gallery.portfoliodetails.skilllevel[0]}
                      </span>
                    )}
                    {gallery.portfoliodetails?.eventtype?.[0] && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded capitalize">
                        {gallery.portfoliodetails.eventtype[0]}
                      </span>
                    )}
                    {gallery.portfoliodetails?.location && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded">
                        {gallery.portfoliodetails.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}