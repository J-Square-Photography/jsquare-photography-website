import { NextResponse } from 'next/server'

/**
 * Receives the OAuth authorization code from /api/google-reviews/authorize,
 * exchanges it for tokens, and displays the refresh_token once for manual
 * copy into .env.local. One-time developer setup step, not part of the
 * running site.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  if (!code) {
    return NextResponse.json({ error: 'Missing "code" query param' }, { status: 400 })
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET not set in .env.local' },
      { status: 500 }
    )
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${url.origin}/api/google-reviews/callback`,
      grant_type: 'authorization_code',
    }),
  })

  const tokens = (await tokenRes.json()) as { refresh_token?: string; error?: string }

  if (!tokenRes.ok) {
    return NextResponse.json(tokens, { status: tokenRes.status })
  }

  if (!tokens.refresh_token) {
    return new NextResponse(
      '<pre>No refresh_token was returned. Google only issues one on first consent ' +
        '(or when access is re-requested with prompt=consent, which this flow already does).\n\n' +
        'Revoke the app\'s prior access at https://myaccount.google.com/permissions and try ' +
        '/api/google-reviews/authorize again.</pre>',
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new NextResponse(
    '<pre>Success. Copy the line below into jsquare-frontend/.env.local, then close this tab ' +
      "and clear it from your browser/terminal history if you'd rather not leave it lying around:\n\n" +
      `GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}</pre>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
