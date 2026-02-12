import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/admin/setup
 *
 * Check if any admin exists in the system.
 */
export async function GET() {
  try {
    const adminClient = createAdminClient()

    const { data: existingAdmins, error } = await adminClient
      .from('profiles')
      .select('id')
      .eq('is_admin', true)
      .limit(1)

    if (error) {
      return NextResponse.json({ hasAdmin: false }, { status: 500 })
    }

    return NextResponse.json({ hasAdmin: existingAdmins && existingAdmins.length > 0 })
  } catch {
    return NextResponse.json({ hasAdmin: false }, { status: 500 })
  }
}

/**
 * POST /api/admin/setup
 *
 * One-time admin bootstrap endpoint.
 * Promotes the currently authenticated user to admin,
 * but ONLY if there are zero existing admins in the system.
 * Once an admin exists, this endpoint permanently stops working.
 */
export async function POST() {
  try {
    // 1. Verify the caller is authenticated
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in.' },
        { status: 401 }
      )
    }

    // 2. Use admin client (bypasses RLS) to check if any admins exist
    const adminClient = createAdminClient()

    const { data: existingAdmins, error: queryError } = await adminClient
      .from('profiles')
      .select('id')
      .eq('is_admin', true)
      .limit(1)

    if (queryError) {
      console.error('Admin status check failed:', queryError)
      return NextResponse.json(
        { error: 'Failed to check admin status.', details: queryError.message },
        { status: 500 }
      )
    }

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json(
        { error: 'An admin already exists. Contact an existing admin to grant you access.' },
        { status: 403 }
      )
    }

    // 3. No admins exist — promote this user
    const { error: updateError } = await adminClient
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', user.id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to grant admin access.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'You are now an admin! Refresh the page to see the Admin tab.',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
