'use client'

import { useState, useEffect } from 'react'
import { useProfile, type Profile } from '@/hooks/useProfile'
import { profileSchema } from '@/lib/validations/profile'

export function ProfileForm() {
  const { profile, saving, updateProfile } = useProfile()
  const [form, setForm] = useState({
    full_name: '',
    job_title: '',
    bio: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    contact_email: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        job_title: profile.job_title || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        whatsapp: profile.whatsapp || '',
        telegram: profile.telegram || '',
        contact_email: profile.contact_email || '',
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const result = profileSchema.safeParse(form)
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    const { error: saveError } = await updateProfile(form as Partial<Profile>)
    if (saveError) {
      setError(saveError)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">Profile saved!</div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
          <input type="text" required value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
          <input type="text" value={form.job_title} onChange={e => setForm(p => ({ ...p, job_title: e.target.value }))} className={inputClass} placeholder="e.g. Photographer & Videographer" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
        <textarea
          rows={3}
          value={form.bio}
          onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
          className={inputClass}
          placeholder="Tell visitors about yourself..."
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">{form.bio.length}/500</p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputClass} placeholder="+65 9123 4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp</label>
            <input type="tel" value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} className={inputClass} placeholder="+65 9123 4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telegram</label>
            <input type="text" value={form.telegram} onChange={e => setForm(p => ({ ...p, telegram: e.target.value }))} className={inputClass} placeholder="@username" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
            <input type="email" value={form.contact_email} onChange={e => setForm(p => ({ ...p, contact_email: e.target.value }))} className={inputClass} placeholder="contact@example.com" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  )
}
