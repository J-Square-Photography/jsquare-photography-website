'use client'

import { useState } from 'react'
import { ProfileForm } from '@/components/dashboard/ProfileForm'
import { SocialLinksForm } from '@/components/dashboard/SocialLinksForm'
import { ImageUploader } from '@/components/dashboard/ImageUploader'
import { useProfile } from '@/hooks/useProfile'

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile()
  const [tab, setTab] = useState<'info' | 'socials'>('info')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Update your card information</p>
      </div>

      {/* Photo uploads */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Profile Photo</h3>
          <ImageUploader
            bucket="profile-photos"
            currentUrl={profile?.profile_photo_url}
            onUpload={(url) => updateProfile({ profile_photo_url: url })}
            aspectHint="Square (1:1)"
          />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cover Image</h3>
          <ImageUploader
            bucket="cover-images"
            currentUrl={profile?.cover_image_url}
            onUpload={(url) => updateProfile({ cover_image_url: url })}
            aspectHint="Wide (16:9)"
          />
        </div>
      </div>

      {/* Tab selector */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setTab('info')}
            className={`px-6 py-3 text-sm font-medium transition ${
              tab === 'info'
                ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setTab('socials')}
            className={`px-6 py-3 text-sm font-medium transition ${
              tab === 'socials'
                ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Social Links
          </button>
        </div>
        <div className="p-6">
          {tab === 'info' ? <ProfileForm /> : <SocialLinksForm />}
        </div>
      </div>
    </div>
  )
}
