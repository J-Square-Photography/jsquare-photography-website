'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useProfile } from '@/hooks/useProfile'
import { usernameSchema } from '@/lib/validations/username'

export default function SettingsPage() {
  const { profile, updateProfile } = useProfile()
  const router = useRouter()
  const supabase = createClient()

  // Published toggle
  const [isPublished, setIsPublished] = useState(false)

  // Username change
  const [newUsername, setNewUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameSuccess, setUsernameSuccess] = useState(false)

  // Password change
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Delete
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      setIsPublished(profile.is_published)
      setNewUsername(profile.username)
    }
  }, [profile])

  const togglePublished = async () => {
    const next = !isPublished
    setIsPublished(next)
    await updateProfile({ is_published: next })
  }

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setUsernameError('')
    setUsernameSuccess(false)

    const result = usernameSchema.safeParse(newUsername)
    if (!result.success) {
      setUsernameError(result.error.issues[0].message)
      return
    }

    setSaving(true)

    // Check availability
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', newUsername.toLowerCase())
      .neq('id', profile?.id || '')
      .maybeSingle()

    if (existing) {
      setUsernameError('This username is taken')
      setSaving(false)
      return
    }

    const { error } = await updateProfile({ username: newUsername.toLowerCase() })
    if (error) {
      setUsernameError(error)
    } else {
      setUsernameSuccess(true)
      setTimeout(() => setUsernameSuccess(false), 3000)
    }
    setSaving(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordError(error.message)
    } else {
      setPasswordSuccess(true)
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(false), 3000)
    }
    setSaving(false)
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return
    // Note: Full account deletion requires a server-side function.
    // For now, we unpublish and clear the profile.
    await updateProfile({ is_published: false, bio: '', full_name: 'Deleted User' })
    await supabase.auth.signOut()
    router.push('/')
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account</p>
      </div>

      {/* Published toggle */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Card Published</h3>
            <p className="text-xs text-gray-500 mt-1">When disabled, visitors will see a 404 page</p>
          </div>
          <button
            onClick={togglePublished}
            className={`relative w-12 h-6 rounded-full transition ${isPublished ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${isPublished ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Username change */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Change Username</h3>
        {usernameError && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4">{usernameError}</div>}
        {usernameSuccess && <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm mb-4">Username updated!</div>}
        <form onSubmit={handleUsernameChange} className="flex gap-3">
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value.replace(/\s/g, ''))}
            className={inputClass}
            maxLength={30}
          />
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm whitespace-nowrap"
          >
            Update
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Card URL: jsquarephotography.com/card/{newUsername || 'username'}
        </p>
      </div>

      {/* Password change */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
        {passwordError && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4">{passwordError}</div>}
        {passwordSuccess && <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm mb-4">Password updated!</div>}
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={inputClass} placeholder="New password" />
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClass} placeholder="Confirm new password" />
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Delete account */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-6">
        <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Delete Account</h3>
        <p className="text-xs text-gray-500 mb-4">This action cannot be undone. Type DELETE to confirm.</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={deleteConfirm}
            onChange={e => setDeleteConfirm(e.target.value)}
            className={inputClass}
            placeholder="Type DELETE"
          />
          <button
            onClick={handleDeleteAccount}
            disabled={deleteConfirm !== 'DELETE'}
            className="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 text-sm whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
