'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PreviewAccessForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Invalid preview code')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 font-light transition-colors"
      >
        Have a preview code?
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter preview code"
          autoFocus
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white font-light text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
        />
        <button
          type="submit"
          disabled={loading || !password}
          className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-light hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Enter'}
        </button>
        <button
          type="button"
          onClick={() => { setIsOpen(false); setError(''); setPassword('') }}
          className="px-3 py-2 rounded-lg text-sm font-light text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500 font-light">{error}</p>
      )}
    </form>
  )
}
