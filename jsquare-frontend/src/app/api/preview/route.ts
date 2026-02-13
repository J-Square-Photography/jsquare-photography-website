import { NextRequest, NextResponse } from 'next/server'

function generateToken(password: string): string {
  return Buffer.from(`preview:${password}`).toString('base64')
}

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const expectedPassword = process.env.PREVIEW_PASSWORD

  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ error: 'Invalid preview code' }, { status: 401 })
  }

  const token = generateToken(expectedPassword)
  const isProduction = process.env.NODE_ENV === 'production'

  const response = NextResponse.json({ success: true })
  response.cookies.set('preview-access', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('preview-access', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  return response
}
