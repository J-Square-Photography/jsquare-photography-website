import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE || 'live'

  // Try Supabase session refresh - don't crash the site if it fails
  let user = null
  let supabaseResponse = NextResponse.next({ request })

  try {
    const session = await updateSession(request)
    user = session.user
    supabaseResponse = session.supabaseResponse
  } catch {
    // Supabase unavailable - continue without auth
  }

  // These routes always bypass site-mode redirects
  const bypassPrefixes = ['/card', '/api/vcard', '/login', '/register', '/forgot-password', '/reset-password', '/onboarding', '/dashboard']
  const isBypassRoute = bypassPrefixes.some(prefix => pathname.startsWith(prefix))

  // Auth route protection: redirect unauthenticated users away from dashboard
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from login/register to dashboard
  if (pathname === '/login' || pathname === '/register') {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Site mode handling - bypass card/auth/dashboard routes
  if (!isBypassRoute) {
    if (siteMode === 'coming-soon') {
      if (
        pathname.startsWith('/coming-soon') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')
      ) {
        return supabaseResponse
      }
      return NextResponse.redirect(new URL('/coming-soon', request.url))
    }

    if (siteMode === 'under-construction') {
      if (
        pathname.startsWith('/under-construction') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')
      ) {
        return supabaseResponse
      }
      return NextResponse.redirect(new URL('/under-construction', request.url))
    }

    if (siteMode === 'live') {
      if (pathname.startsWith('/coming-soon')) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      if (pathname.startsWith('/under-construction')) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
