import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { getGalleries, getLatestStories, getGalleryBySlug, getGalleriesByCategory, GalleryPost, StoryPost } from '@/lib/wordpress/api'

export const useGalleries = (first = 10, after?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['galleries', first, after],
    () => getGalleries(first, after),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    galleries: data?.galleries || [],
    hasNextPage: data?.hasNextPage || false,
    endCursor: data?.endCursor,
    isLoading,
    error,
    refetch: mutate
  }
}

export const useGallery = (slug: string) => {
  const { data, error, isLoading } = useSWR(
    slug ? ['gallery', slug] : null,
    () => getGalleryBySlug(slug),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    gallery: data,
    isLoading,
    error
  }
}

export const useLatestStories = (first = 6) => {
  const { data, error, isLoading } = useSWR(
    ['stories', first],
    () => getLatestStories(first),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  )

  return {
    stories: data || [],
    isLoading,
    error
  }
}

export const useGalleriesByCategory = (categorySlug: string, first = 10) => {
  const { data, error, isLoading } = useSWR(
    categorySlug ? ['galleries-category', categorySlug, first] : null,
    () => getGalleriesByCategory(categorySlug, first),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  )

  return {
    galleries: data || [],
    isLoading,
    error
  }
}

// Hook for optimistic updates when new content is published
export const useContentUpdates = () => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  
  useEffect(() => {
    // Listen for webhook notifications or polling
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return { lastUpdated }
}