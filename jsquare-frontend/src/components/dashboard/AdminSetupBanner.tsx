'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'

export function AdminSetupBanner() {
  const { profile, loading: profileLoading, refetch } = useProfile()
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null)
  const [promoting, setPromoting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Check if any admin exists in the system
  useEffect(() => {
    if (profileLoading || !profile) return
    if (profile.is_admin) {
      setHasAdmin(true)
      return
    }

    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/admin/setup')
        const data = await res.json()
        setHasAdmin(data.hasAdmin ?? false)
      } catch {
        setHasAdmin(false)
      }
    }
    checkAdmin()
  }, [profile, profileLoading])

  const handleSetup = async () => {
    setPromoting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/setup', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to set up admin.')
        if (res.status === 403) {
          // An admin already exists — hide the banner
          setHasAdmin(true)
        }
        return
      }

      setSuccess(true)
      refetch()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPromoting(false)
    }
  }

  // Don't show banner if loading, already admin, or admin already exists
  if (profileLoading || !profile || profile.is_admin || hasAdmin || success) {
    return null
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
            No admin has been set up yet.
          </p>
          <p className="text-blue-600 dark:text-blue-300 text-xs mt-0.5">
            Claim admin access to manage invite codes and users.
          </p>
        </div>
        <button
          onClick={handleSetup}
          disabled={promoting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 whitespace-nowrap"
        >
          {promoting ? 'Setting up...' : 'Become Admin'}
        </button>
      </div>
      {error && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}
