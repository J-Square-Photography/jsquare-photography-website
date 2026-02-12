'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface EmbeddedVideo {
  id: string
  profile_id: string
  video_url: string
  title: string
  display_order: number
}

export function useEmbeddedVideos() {
  const [videos, setVideos] = useState<EmbeddedVideo[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchVideos = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data } = await supabase
      .from('embedded_videos')
      .select('*')
      .eq('profile_id', user.id)
      .order('display_order')

    if (data) setVideos(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchVideos() }, [fetchVideos])

  const addVideo = useCallback(async (videoUrl: string, title: string = '') => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('embedded_videos')
      .insert({ profile_id: user.id, video_url: videoUrl, title, display_order: videos.length })
      .select()
      .single()

    if (!error && data) setVideos(prev => [...prev, data])
    return { error: error?.message || null }
  }, [supabase, videos.length])

  const removeVideo = useCallback(async (id: string) => {
    const { error } = await supabase.from('embedded_videos').delete().eq('id', id)
    if (!error) setVideos(prev => prev.filter(v => v.id !== id))
    return { error: error?.message || null }
  }, [supabase])

  const reorder = useCallback(async (reordered: EmbeddedVideo[]) => {
    setVideos(reordered)
    const updates = reordered.map((v, i) => ({ id: v.id, display_order: i, profile_id: v.profile_id, video_url: v.video_url }))
    await supabase.from('embedded_videos').upsert(updates)
  }, [supabase])

  return { videos, loading, addVideo, removeVideo, reorder, refetch: fetchVideos }
}
