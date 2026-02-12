import { createClient } from '@supabase/supabase-js'

/**
 * Server-side only Supabase client using the service role key.
 * This bypasses Row Level Security — use only in trusted server contexts.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
      'Add it to your .env.local (or Vercel env vars) from the Supabase dashboard: ' +
      'Settings > API > service_role key.'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
