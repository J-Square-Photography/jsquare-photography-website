'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from "@/components/navigation/Navigation"
import { Footer } from "@/components/sections/Footer"
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters"
import { GalleryGrid } from "@/components/portfolio/GalleryGrid"
import { getGalleries } from "@/lib/wordpress/api"
import { PortfolioFilters as Filters, SkillLevel, EventType } from "@/lib/wordpress/types"
import type { GalleryPost } from "@/lib/wordpress/api"

// Client component - data fetched on client side
// Removed force-dynamic to allow static generation

export default function PortfolioPage() {
  const [galleries, setGalleries] = useState<GalleryPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [endCursor, setEndCursor] = useState<string | undefined>()
  const [filters, setFilters] = useState<Filters>({
    skillLevel: 'all',
    eventType: 'all'
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  // Load galleries on mount
  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true)
      try {
        const { galleries: fetchedGalleries, hasNextPage, endCursor: cursor } = await getGalleries(20)
        setGalleries(fetchedGalleries)
        setHasMore(hasNextPage)
        setEndCursor(cursor)
      } catch (error) {
        console.error('Error loading galleries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGalleries()
  }, [])

  // Initialize filters from URL params
  useEffect(() => {
    const skillLevel = (searchParams.get('skill') as SkillLevel) || 'all'
    const eventType = (searchParams.get('event') as EventType) || 'all'

    setFilters({ skillLevel, eventType })
  }, [searchParams])

  // Update URL when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)

    const params = new URLSearchParams()
    if (newFilters.skillLevel !== 'all') {
      params.set('skill', newFilters.skillLevel)
    }
    if (newFilters.eventType !== 'all') {
      params.set('event', newFilters.eventType)
    }

    const queryString = params.toString()
    router.push(queryString ? `/portfolio?${queryString}` : '/portfolio', { scroll: false })
  }

  // Filter galleries based on current filters
  const filteredGalleries = useMemo(() => {
    return galleries.filter(gallery => {
      // For skill level filtering
      const matchesSkillLevel =
        filters.skillLevel === 'all' || // Show all when filter is 'all'
        gallery.portfolioDetails?.skillLevel?.includes(filters.skillLevel) // Match specific skill level

      // For event type filtering
      const matchesEventType =
        filters.eventType === 'all' || // Show all when filter is 'all'
        gallery.portfolioDetails?.eventType?.includes(filters.eventType) // Match specific event type

      return matchesSkillLevel && matchesEventType
    })
  }, [galleries, filters])

  // Show only real CMS galleries — no fake placeholders.
  const displayGalleries = filteredGalleries

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[25vh] flex items-center justify-center bg-white dark:bg-black">
          <div className="relative text-center z-10">
            <h1 className="text-5xl md:text-7xl font-extralight mb-2 text-gray-900 dark:text-white">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-700 dark:text-white/80">
              Capturing moments that last forever
            </p>
          </div>
        </section>

        {/* Portfolio Grid with Filters */}
        <section className="py-10 px-6 bg-white dark:bg-black">
          <div className="container mx-auto">
            {/* Filters */}
            <PortfolioFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Gallery Grid — or a clean empty state when there's no real content yet */}
            {!loading && displayGalleries.length === 0 ? (
              <div className="text-center py-24">
                <svg
                  className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-extralight text-gray-900 dark:text-white mb-2">
                  {galleries.length === 0 ? 'Galleries coming soon' : 'No galleries match your filters'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light">
                  {galleries.length === 0
                    ? 'New work is on the way — check back shortly.'
                    : 'Try adjusting or clearing the filters above.'}
                </p>
              </div>
            ) : (
              <GalleryGrid
                galleries={displayGalleries}
                loading={loading}
              />
            )}

            {/* Load More Button */}
            {!loading && hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={async () => {
                    setLoadingMore(true)
                    try {
                      const { galleries: moreGalleries, hasNextPage, endCursor: cursor } = await getGalleries(20, endCursor)
                      setGalleries(prev => [...prev, ...moreGalleries])
                      setHasMore(hasNextPage)
                      setEndCursor(cursor)
                    } catch (error) {
                      console.error('Error loading more galleries:', error)
                    } finally {
                      setLoadingMore(false)
                    }
                  }}
                  disabled={loadingMore}
                  className="px-8 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}