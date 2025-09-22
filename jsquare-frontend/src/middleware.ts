import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE || 'live'
  const pathname = request.nextUrl.pathname

  // In coming-soon mode, redirect everything to /coming-soon
  if (siteMode === 'coming-soon') {
    // Allow access to coming-soon page, API routes, and static assets
    if (
      pathname.startsWith('/coming-soon') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('.') // Allow static files
    ) {
      return NextResponse.next()
    }

    // Redirect all other routes to coming-soon
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }

  // In under-construction mode, redirect everything to /under-construction
  if (siteMode === 'under-construction') {
    // Allow access to under-construction page, API routes, and static assets
    if (
      pathname.startsWith('/under-construction') ||
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('.') // Allow static files
    ) {
      return NextResponse.next()
    }

    // Redirect all other routes to under-construction
    return NextResponse.redirect(new URL('/under-construction', request.url))
  }

  // In live mode, prevent access to /coming-soon and /under-construction
  if (siteMode === 'live') {
    if (pathname.startsWith('/coming-soon')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (pathname.startsWith('/under-construction')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}