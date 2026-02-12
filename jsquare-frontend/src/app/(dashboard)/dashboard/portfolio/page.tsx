'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePortfolioImages } from '@/hooks/usePortfolioImages'
import { ImageUploader } from '@/components/dashboard/ImageUploader'

export default function PortfolioPage() {
  const { images, loading, addImage, removeImage, updateCaption } = usePortfolioImages()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [captionText, setCaptionText] = useState('')

  const handleUpload = async (url: string) => {
    await addImage(url)
  }

  const startEditCaption = (id: string, current: string) => {
    setEditingId(id)
    setCaptionText(current)
  }

  const saveCaption = async (id: string) => {
    await updateCaption(id, captionText)
    setEditingId(null)
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio gallery images</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Add Image</h3>
        <ImageUploader bucket="portfolio-images" onUpload={handleUpload} aspectHint="Any aspect ratio" />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="relative aspect-square">
                <Image src={img.image_url} alt={img.caption || 'Portfolio'} fill className="object-cover" />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                {editingId === img.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={captionText}
                      onChange={e => setCaptionText(e.target.value)}
                      className="flex-1 text-xs px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
                      autoFocus
                    />
                    <button onClick={() => saveCaption(img.id)} className="text-xs text-black dark:text-white font-medium">Save</button>
                  </div>
                ) : (
                  <p
                    className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => startEditCaption(img.id, img.caption)}
                  >
                    {img.caption || 'Click to add caption'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No portfolio images yet. Upload your first image above.</p>
      )}
    </div>
  )
}
