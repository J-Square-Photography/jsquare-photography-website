import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin, hash } = new URL(request.url)
  const code = searchParams.get('code')
  const token = searchParams.get('token')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/onboarding'

  const supabase = await createClient()

  // PKCE flow — exchange code for session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Token flow (invite, email confirm, recovery)
  if (token && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type as 'invite' | 'signup' | 'recovery' | 'email',
    })
    if (!error) {
      if (type === 'invite' || type === 'signup') {
        return NextResponse.redirect(`${origin}/onboarding`)
      }
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/reset-password`)
      }
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Auth error — redirect to login
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
