'use client'

import { useState } from 'react'
import { useEmbeddedVideos } from '@/hooks/useEmbeddedVideos'
import { isValidVideoUrl, getEmbedUrl } from '@/lib/utils/video-embed'

export default function VideosPage() {
  const { videos, loading, addVideo, removeVideo } = useEmbeddedVideos()
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidVideoUrl(url)) {
      setError('Please enter a valid YouTube or Vimeo URL')
      return
    }

    const result = await addVideo(url, title)
    if (result?.error) {
      setError(result.error)
    } else {
      setUrl('')
      setTitle('')
    }
  }

  if (loading) {
    return <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Videos</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Add YouTube or Vimeo videos to your card</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <form onSubmit={handleAdd} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video URL *</label>
            <input
              type="url"
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm"
              placeholder="Optional title"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition text-sm"
          >
            Add Video
          </button>
        </form>
      </div>

      {videos.length > 0 && (
        <div className="space-y-4">
          {videos.map((video) => {
            const embedUrl = getEmbedUrl(video.video_url)
            return (
              <div key={video.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {embedUrl && (
                  <div className="aspect-video">
                    <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
                  </div>
                )}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{video.title || 'Untitled'}</p>
                    <p className="text-xs text-gray-500 truncate max-w-md">{video.video_url}</p>
                  </div>
                  <button
                    onClick={() => removeVideo(video.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No videos yet. Add your first video above.</p>
      )}
    </div>
  )
}
