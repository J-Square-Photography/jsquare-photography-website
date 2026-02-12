'use client'

import { useState } from 'react'
import { useCustomLinks } from '@/hooks/useCustomLinks'

export default function LinksPage() {
  const { links, loading, addLink, updateLink, removeLink } = useCustomLinks()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return
    await addLink(title, url)
    setTitle('')
    setUrl('')
  }

  const startEdit = (id: string, currentTitle: string, currentUrl: string) => {
    setEditingId(id)
    setEditTitle(currentTitle)
    setEditUrl(currentUrl)
  }

  const saveEdit = async (id: string) => {
    await updateLink(id, editTitle, editUrl)
    setEditingId(null)
  }

  if (loading) {
    return <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Links</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Add custom links to your card</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm"
                placeholder="e.g. My Portfolio Website"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL *</label>
              <input
                type="url"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition text-sm"
          >
            Add Link
          </button>
        </form>
      </div>

      {links.length > 0 && (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
              {editingId === link.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                  />
                  <input
                    type="url"
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(link.id)} className="text-sm font-medium text-black dark:text-white">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-sm text-gray-500">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{link.title}</p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                  </div>
                  <button
                    onClick={() => startEdit(link.id, link.title, link.url)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {links.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No links yet. Add your first link above.</p>
      )}
    </div>
  )
}
