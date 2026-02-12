'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '@/lib/supabase/storage'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

interface ImageUploaderProps {
  bucket: 'profile-photos' | 'cover-images' | 'portfolio-images'
  currentUrl?: string
  onUpload: (url: string) => void
  aspectHint?: string
}

export function ImageUploader({ bucket, currentUrl, onUpload, aspectHint }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file || !user) return

    setError('')
    setUploading(true)
    setPreview(URL.createObjectURL(file))

    try {
      const { url } = await uploadFile(bucket, user.id, file)
      onUpload(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [bucket, user, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    disabled: uploading,
  })

  const displayUrl = preview || currentUrl

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition ${
          isDragActive
            ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {displayUrl ? (
          <div className="relative aspect-video">
            <Image src={displayUrl} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <p className="text-white text-sm font-medium">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Drop image here or click to browse</p>
            {aspectHint && <p className="text-xs text-gray-400 mt-1">{aspectHint}</p>}
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black dark:border-white" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
