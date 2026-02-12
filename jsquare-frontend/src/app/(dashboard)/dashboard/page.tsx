'use client'

import { useProfile } from '@/hooks/useProfile'
import { QRCodeDisplay } from '@/components/dashboard/QRCodeDisplay'
import { AdminSetupBanner } from '@/components/dashboard/AdminSetupBanner'
import Link from 'next/link'

export default function DashboardPage() {
  const { profile, loading } = useProfile()

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    )
  }

  if (!profile) return null

  const cardUrl = `https://jsquarephotography.com/card/${profile.username}`
  const isSetup = profile.full_name && !profile.username.startsWith('user_')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your digital business card</p>
      </div>

      <AdminSetupBanner />

      {/* Status banner */}
      {!isSetup && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            Complete your profile to make your card live.{' '}
            <Link href="/dashboard/profile" className="underline">Edit profile</Link>
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card URL + QR */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Card</h2>

          <div className="flex items-center gap-2">
            <input
              readOnly
              value={cardUrl}
              className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
            />
            <button
              onClick={() => navigator.clipboard.writeText(cardUrl)}
              className="px-3 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Copy
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${profile.is_published ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-gray-600 dark:text-gray-400">
              {profile.is_published ? 'Published' : 'Not published'}
            </span>
            {!profile.is_published && (
              <Link href="/dashboard/settings" className="text-black dark:text-white underline ml-1">
                Enable
              </Link>
            )}
          </div>

          <Link
            href={`/card/${profile.username}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:underline"
          >
            Preview card
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>

        {/* QR Code */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">QR Code</h2>
          <QRCodeDisplay url={cardUrl} />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: '/dashboard/profile', label: 'Edit Profile', desc: 'Name, bio, contacts' },
          { href: '/dashboard/portfolio', label: 'Portfolio', desc: 'Manage photos' },
          { href: '/dashboard/videos', label: 'Videos', desc: 'YouTube/Vimeo' },
          { href: '/dashboard/links', label: 'Links', desc: 'Custom links' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-gray-400 dark:hover:border-gray-600 transition"
          >
            <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
