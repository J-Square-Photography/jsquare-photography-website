import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { code } = await request.json()

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ valid: false, error: 'Invite code is required' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data: invite, error } = await supabase
    .from('invite_codes')
    .select('id, used_by, expires_at')
    .eq('code', code.trim())
    .single()

  if (error || !invite) {
    return NextResponse.json({ valid: false, error: 'Invalid invite code' })
  }

  if (invite.used_by) {
    return NextResponse.json({ valid: false, error: 'This invite code has already been used' })
  }

  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, error: 'This invite code has expired' })
  }

  return NextResponse.json({ valid: true })
}
