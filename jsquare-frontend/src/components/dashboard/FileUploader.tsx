'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '@/lib/supabase/storage'
import { useAuth } from '@/hooks/useAuth'

interface FileUploaderProps {
  onUpload: (url: string, fileName: string, fileType: string, fileSize: number) => void
}

export function FileUploader({ onUpload }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file || !user) return

    setError('')
    setUploading(true)

    try {
      const { url } = await uploadFile('uploaded-files', user.id, file)
      onUpload(url, file.name, file.type, file.size)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [user, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading,
  })

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg py-8 text-center cursor-pointer transition ${
          isDragActive
            ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black dark:border-white" />
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Drop PDF here or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">Max 20MB</p>
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
