'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface PortfolioImage {
  id: string
  profile_id: string
  image_url: string
  caption: string
  display_order: number
}

export function usePortfolioImages() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchImages = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('profile_id', user.id)
      .order('display_order')

    if (data) setImages(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchImages() }, [fetchImages])

  const addImage = useCallback(async (imageUrl: string, caption: string = '') => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('portfolio_images')
      .insert({ profile_id: user.id, image_url: imageUrl, caption, display_order: images.length })
      .select()
      .single()

    if (!error && data) setImages(prev => [...prev, data])
    return { error: error?.message || null }
  }, [supabase, images.length])

  const removeImage = useCallback(async (id: string) => {
    const { error } = await supabase.from('portfolio_images').delete().eq('id', id)
    if (!error) setImages(prev => prev.filter(img => img.id !== id))
    return { error: error?.message || null }
  }, [supabase])

  const updateCaption = useCallback(async (id: string, caption: string) => {
    const { error } = await supabase.from('portfolio_images').update({ caption }).eq('id', id)
    if (!error) setImages(prev => prev.map(img => img.id === id ? { ...img, caption } : img))
    return { error: error?.message || null }
  }, [supabase])

  const reorder = useCallback(async (reordered: PortfolioImage[]) => {
    setImages(reordered)
    const updates = reordered.map((img, i) => ({ id: img.id, display_order: i, profile_id: img.profile_id, image_url: img.image_url }))
    await supabase.from('portfolio_images').upsert(updates)
  }, [supabase])

  return { images, loading, addImage, removeImage, updateCaption, reorder, refetch: fetchImages }
}
