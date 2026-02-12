'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface CustomLink {
  id: string
  profile_id: string
  title: string
  url: string
  display_order: number
}

export function useCustomLinks() {
  const [links, setLinks] = useState<CustomLink[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchLinks = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data } = await supabase
      .from('custom_links')
      .select('*')
      .eq('profile_id', user.id)
      .order('display_order')

    if (data) setLinks(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchLinks() }, [fetchLinks])

  const addLink = useCallback(async (title: string, url: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('custom_links')
      .insert({ profile_id: user.id, title, url, display_order: links.length })
      .select()
      .single()

    if (!error && data) setLinks(prev => [...prev, data])
    return { error: error?.message || null }
  }, [supabase, links.length])

  const updateLink = useCallback(async (id: string, title: string, url: string) => {
    const { error } = await supabase.from('custom_links').update({ title, url }).eq('id', id)
    if (!error) setLinks(prev => prev.map(l => l.id === id ? { ...l, title, url } : l))
    return { error: error?.message || null }
  }, [supabase])

  const removeLink = useCallback(async (id: string) => {
    const { error } = await supabase.from('custom_links').delete().eq('id', id)
    if (!error) setLinks(prev => prev.filter(l => l.id !== id))
    return { error: error?.message || null }
  }, [supabase])

  const reorder = useCallback(async (reordered: CustomLink[]) => {
    setLinks(reordered)
    const updates = reordered.map((l, i) => ({ id: l.id, display_order: i, profile_id: l.profile_id, title: l.title, url: l.url }))
    await supabase.from('custom_links').upsert(updates)
  }, [supabase])

  return { links, loading, addLink, updateLink, removeLink, reorder, refetch: fetchLinks }
}
