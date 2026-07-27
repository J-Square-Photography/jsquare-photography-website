import { NextResponse } from 'next/server'

const SCOPE = 'https://www.googleapis.com/auth/business.manage'

/**
 * One-time developer setup route: visit this locally to start the Google
 * consent flow that mints GOOGLE_OAUTH_REFRESH_TOKEN. Not linked from
 * anywhere in the site UI — the OAuth client's redirect URI is restricted
 * to http://localhost:3000, so this only ever works in local dev.
 */
export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  if (!clientId) {
    return NextResponse.json(
      { error: 'GOOGLE_OAUTH_CLIENT_ID is not set in .env.local' },
      { status: 500 }
    )
  }

  const redirectUri = `${new URL(request.url).origin}/api/google-reviews/callback`

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', SCOPE)
  authUrl.searchParams.set('access_type', 'offline')
  authUrl.searchParams.set('prompt', 'consent')

  return NextResponse.redirect(authUrl.toString())
}
