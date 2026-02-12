'use client'

import { useState, useEffect } from 'react'
import { useProfile, type Profile } from '@/hooks/useProfile'

const socialFields = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/username' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@username' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@username' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/username' },
  { key: 'behance', label: 'Behance', placeholder: 'https://behance.net/username' },
] as const

export function SocialLinksForm() {
  const { profile, saving, updateProfile } = useProfile()
  const [form, setForm] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (profile) {
      const socials: Record<string, string> = {}
      socialFields.forEach(f => { socials[f.key] = (profile as unknown as Record<string, string>)[f.key] || '' })
      setForm(socials)
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const { error: saveError } = await updateProfile(form as Partial<Profile>)
    if (saveError) {
      setError(saveError)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">Social links saved!</div>
      )}

      {socialFields.map(field => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
          <input
            type="url"
            value={form[field.key] || ''}
            onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : 'Save Social Links'}
        </button>
      </div>
    </form>
  )
}
