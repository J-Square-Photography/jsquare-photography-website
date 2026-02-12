'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Profile {
  id: string
  username: string
  email: string
  full_name: string
  job_title: string
  bio: string
  profile_photo_url: string
  cover_image_url: string
  phone: string
  whatsapp: string
  telegram: string
  contact_email: string
  instagram: string
  linkedin: string
  facebook: string
  tiktok: string
  youtube: string
  twitter: string
  behance: string
  accent_color: string
  theme_preset: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!error && data) {
      setProfile(data)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!profile) return { error: 'No profile loaded' }
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id)

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null)
    }
    setSaving(false)
    return { error: error?.message || null }
  }, [profile, supabase])

  return { profile, loading, saving, updateProfile, refetch: fetchProfile }
}
