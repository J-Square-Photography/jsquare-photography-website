'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useProfile } from '@/hooks/useProfile'

interface InviteCode {
  id: string
  code: string
  created_by: string | null
  used_by: string | null
  used_at: string | null
  created_at: string
  expires_at: string | null
  used_by_profile?: { full_name: string; email: string } | null
}

interface UserProfile {
  id: string
  username: string
  email: string
  full_name: string
  is_admin: boolean
  is_published: boolean
  created_at: string
}

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default function AdminPage() {
  const { profile, loading: profileLoading } = useProfile()
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<'codes' | 'users'>('codes')
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchInviteCodes = useCallback(async () => {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      // Fetch used_by profile info for used codes
      const usedCodes = data.filter(c => c.used_by)
      if (usedCodes.length > 0) {
        const userIds = usedCodes.map(c => c.used_by)
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds)

        const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])
        const enriched = data.map(code => ({
          ...code,
          used_by_profile: code.used_by ? profileMap.get(code.used_by) || null : null,
        }))
        setInviteCodes(enriched)
      } else {
        setInviteCodes(data)
      }
    }
  }, [supabase])

  const fetchUsers = useCallback(async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, email, full_name, is_admin, is_published, created_at')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setUsers(data)
    }
  }, [supabase])

  useEffect(() => {
    if (profileLoading) return
    if (!profile?.is_admin) {
      router.replace('/dashboard')
      return
    }

    const load = async () => {
      setLoading(true)
      await Promise.all([fetchInviteCodes(), fetchUsers()])
      setLoading(false)
    }
    load()
  }, [profile, profileLoading, router, fetchInviteCodes, fetchUsers])

  const handleGenerateCode = async () => {
    setGenerating(true)
    setError('')
    const code = generateCode()

    const { error } = await supabase
      .from('invite_codes')
      .insert({ code, created_by: profile!.id })

    if (error) {
      setError('Failed to generate code. Try again.')
    } else {
      setSuccess(`Code ${code} generated!`)
      setTimeout(() => setSuccess(''), 3000)
      await fetchInviteCodes()
    }
    setGenerating(false)
  }

  const handleDeleteCode = async (id: string) => {
    const { error } = await supabase
      .from('invite_codes')
      .delete()
      .eq('id', id)

    if (!error) {
      setInviteCodes(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleCopyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleToggleAdmin = async (userId: string, currentIsAdmin: boolean) => {
    if (userId === profile!.id) return // Can't demote yourself

    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !currentIsAdmin })
      .eq('id', userId)

    if (!error) {
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, is_admin: !currentIsAdmin } : u
      ))
    }
  }

  if (profileLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile?.is_admin) return null

  const activeCodes = inviteCodes.filter(c => !c.used_by)
  const usedCodes = inviteCodes.filter(c => c.used_by)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage invite codes, users, and admin access.</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('codes')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'codes'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Invite Codes
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'users'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Users ({users.length})
        </button>
      </div>

      {/* Invite Codes Tab */}
      {activeTab === 'codes' && (
        <div className="space-y-6">
          {/* Generate Code */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Invite Code</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Create a one-time use code to invite a new user.</p>
              </div>
              <button
                onClick={handleGenerateCode}
                disabled={generating}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate Code'}
              </button>
            </div>
          </div>

          {/* Active Codes */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Codes ({activeCodes.length})
              </h2>
            </div>
            {activeCodes.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                No active invite codes. Generate one above.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {activeCodes.map((invite) => (
                  <div key={invite.id} className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-mono font-medium text-gray-900 dark:text-white">
                        {invite.code}
                      </code>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(invite.created_at).toLocaleDateString()}
                      </span>
                      {invite.expires_at && (
                        <span className="text-xs text-amber-600 dark:text-amber-400">
                          Expires {new Date(invite.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCode(invite.code, invite.id)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition"
                      >
                        {copiedId === invite.id ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleDeleteCode(invite.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Used Codes */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Used Codes ({usedCodes.length})
              </h2>
            </div>
            {usedCodes.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                No codes have been used yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {usedCodes.map((invite) => (
                  <div key={invite.id} className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-mono text-gray-500 dark:text-gray-400 line-through">
                        {invite.code}
                      </code>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Used by {invite.used_by_profile?.full_name || invite.used_by_profile?.email || 'Unknown'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {invite.used_at ? new Date(invite.used_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Published</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.full_name || '-'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {user.username}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.is_published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {user.is_published ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleToggleAdmin(user.id, user.is_admin)}
                        disabled={user.id === profile!.id}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition ${
                          user.is_admin
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        } ${user.id === profile!.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {user.is_admin ? 'Admin' : 'User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
