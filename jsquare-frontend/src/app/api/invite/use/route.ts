import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const { code, userId } = await request.json()

  if (!code || !userId) {
    return NextResponse.json({ error: 'Missing code or userId' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  // Verify the code exists and is unused
  const { data: invite, error: fetchError } = await adminClient
    .from('invite_codes')
    .select('id, used_by')
    .eq('code', code.trim())
    .single()

  if (fetchError || !invite) {
    return NextResponse.json({ error: 'Invalid invite code' }, { status: 400 })
  }

  if (invite.used_by) {
    return NextResponse.json({ error: 'Code already used' }, { status: 400 })
  }

  // Mark as used with admin client (bypasses RLS)
  const { error: updateError } = await adminClient
    .from('invite_codes')
    .update({ used_by: userId, used_at: new Date().toISOString() })
    .eq('id', invite.id)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to mark code as used' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
