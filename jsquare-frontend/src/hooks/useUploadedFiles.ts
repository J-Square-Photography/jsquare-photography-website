'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface UploadedFile {
  id: string
  profile_id: string
  file_url: string
  file_name: string
  file_type: string
  file_size_bytes: number
  display_order: number
}

export function useUploadedFiles() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchFiles = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data } = await supabase
      .from('uploaded_files')
      .select('*')
      .eq('profile_id', user.id)
      .order('display_order')

    if (data) setFiles(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  const addFile = useCallback(async (fileUrl: string, fileName: string, fileType: string, fileSizeBytes: number) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('uploaded_files')
      .insert({
        profile_id: user.id,
        file_url: fileUrl,
        file_name: fileName,
        file_type: fileType,
        file_size_bytes: fileSizeBytes,
        display_order: files.length,
      })
      .select()
      .single()

    if (!error && data) setFiles(prev => [...prev, data])
    return { error: error?.message || null }
  }, [supabase, files.length])

  const removeFile = useCallback(async (id: string) => {
    const { error } = await supabase.from('uploaded_files').delete().eq('id', id)
    if (!error) setFiles(prev => prev.filter(f => f.id !== id))
    return { error: error?.message || null }
  }, [supabase])

  return { files, loading, addFile, removeFile, refetch: fetchFiles }
}
