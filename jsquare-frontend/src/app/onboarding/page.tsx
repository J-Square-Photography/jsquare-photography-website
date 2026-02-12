'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { usernameSchema } from '@/lib/validations/username'

export default function OnboardingPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Check if user already has a username set (not a temp one)
  useEffect(() => {
    const checkExisting = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (data?.username && !data.username.startsWith('user_')) {
        router.push('/dashboard')
      }
    }
    checkExisting()
  }, [supabase, router])

  // Debounced availability check
  useEffect(() => {
    if (username.length < 3) {
      setAvailable(null)
      return
    }

    const validation = usernameSchema.safeParse(username)
    if (!validation.success) {
      setError(validation.error.issues[0].message)
      setAvailable(null)
      return
    }

    setError('')
    setChecking(true)

    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .maybeSingle()

      setAvailable(!data)
      setChecking(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [username, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!available) return

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username: username.toLowerCase() })
      .eq('id', user.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/jsquare_landscape_dark.png"
            alt="J Square Photography"
            width={200}
            height={60}
            className="mx-auto dark:hidden"
          />
          <Image
            src="/jsquare_landscape_white.png"
            alt="J Square Photography"
            width={200}
            height={60}
            className="mx-auto hidden dark:block"
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Choose your username
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
            This will be your card URL: <strong>jsquarephotography.com/card/{username || 'username'}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition"
                  placeholder="e.g. JJ, johndoe, studio123"
                  maxLength={30}
                />
                {username.length >= 3 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checking ? (
                      <span className="text-gray-400 text-sm">checking...</span>
                    ) : available === true ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : available === false ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : null}
                  </span>
                )}
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {available === false && !error && (
                <p className="text-red-500 text-sm mt-1">This username is taken</p>
              )}
              {available === true && (
                <p className="text-green-600 text-sm mt-1">Username available!</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !available}
              className="w-full py-2.5 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
