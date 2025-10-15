'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from "@/components/navigation/Navigation"
import { Footer } from "@/components/sections/Footer"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
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
        gallery.portfoliodetails?.skilllevel?.includes(filters.skillLevel) // Match specific skill level

      // For event type filtering
      const matchesEventType =
        filters.eventType === 'all' || // Show all when filter is 'all'
        gallery.portfoliodetails?.eventtype?.includes(filters.eventType) // Match specific event type

      return matchesSkillLevel && matchesEventType
    })
  }, [galleries, filters])

  // Use placeholder galleries if no WordPress content and not loading
  const displayGalleries = useMemo(() => {
    if (!loading && galleries.length === 0) {
      // Return placeholder galleries with mock filter data
      return [1, 2, 3, 4, 5, 6].map(i => ({
        id: `placeholder-${i}`,
        title: `Sample Gallery ${i}`,
        slug: `sample-gallery-${i}`,
        excerpt: '',
        content: '',
        date: new Date().toISOString(),
        featuredImage: {
          node: {
            sourceUrl: `https://images.unsplash.com/photo-${
              [
                '1519741497674-611481863552',
                '1540575467063-178a50c2df87',
                '1531746020798-e6953c6e8e04',
                '1511285560929-e80d1b2a8a2f',
                '1606216794138-b2e9a57c3c9f',
                '1519167758481-ac2b39a44bdc'
              ][i - 1]
            }?w=800&h=1000&fit=crop`,
            altText: `Gallery ${i}`
          }
        },
        categories: {
          nodes: [{ name: 'Sample', slug: 'sample' }]
        },
        portfoliodetails: {
          skilllevel: [['beginner', 'novice', 'enthusiast', 'professional', 'director', 'beginner'][i - 1]],
          eventtype: [['weddings', 'events', 'photobooth', 'corporate', 'others', 'weddings'][i - 1]],
          location: 'Singapore'
        }
      }))
    }
    return filteredGalleries
  }, [loading, galleries, filteredGalleries])

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <ThemeToggle />

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

            {/* Gallery Grid */}
            <GalleryGrid
              galleries={displayGalleries}
              loading={loading}
            />

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