import type { GoogleReview } from '@/data/reviews'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const REVIEWS_API_BASE = 'https://mybusiness.googleapis.com/v4'

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
}

interface GoogleApiReviewer {
  displayName?: string
  profilePhotoUrl?: string
  isAnonymous?: boolean
}

interface GoogleApiReview {
  reviewId: string
  reviewer?: GoogleApiReviewer
  starRating?: string
  comment?: string
  createTime: string
  updateTime: string
}

interface GoogleApiReviewsResponse {
  reviews?: GoogleApiReview[]
  averageRating?: number
  totalReviewCount?: number
  nextPageToken?: string
}

export interface LiveReviewsResult {
  reviews: GoogleReview[]
  stats: { totalReviews: number; averageRating: number }
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) return null

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) {
    console.error('Google OAuth token refresh failed:', res.status, await res.text())
    return null
  }

  const data = (await res.json()) as { access_token?: string }
  return data.access_token ?? null
}

/**
 * Fetch live reviews from the Google Business Profile API (mybusiness.googleapis.com/v4).
 * Returns null when not configured (missing env vars) or on any API error, so
 * callers can fall back to the static reviews in src/data/reviews.ts.
 */
export async function fetchLiveGoogleReviews(): Promise<LiveReviewsResult | null> {
  const location = process.env.GOOGLE_BUSINESS_LOCATION // e.g. "accounts/123/locations/456"
  if (!location) return null

  try {
    const accessToken = await getAccessToken()
    if (!accessToken) return null

    const res = await fetch(`${REVIEWS_API_BASE}/${location}/reviews?pageSize=50`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      // Page-level `revalidate` (see app/page.tsx) caps this to whichever is smaller.
      next: { revalidate: 21600 },
    })

    if (!res.ok) {
      console.error('Google Business Profile reviews fetch failed:', res.status, await res.text())
      return null
    }

    const data = (await res.json()) as GoogleApiReviewsResponse

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r) => r.comment && r.starRating && STAR_RATING_MAP[r.starRating])
      .map((r) => ({
        id: r.reviewId,
        reviewerName: r.reviewer?.isAnonymous
          ? 'Google User'
          : r.reviewer?.displayName ?? 'Google User',
        rating: STAR_RATING_MAP[r.starRating as string],
        reviewText: r.comment as string,
        date: r.createTime,
        profilePhotoUrl: r.reviewer?.isAnonymous ? undefined : r.reviewer?.profilePhotoUrl,
      }))

    if (reviews.length === 0) return null

    return {
      reviews,
      stats: {
        totalReviews: data.totalReviewCount ?? reviews.length,
        // Google's averageRating is a float32-precision value (e.g. 4.900000095367432)
        // — round to 1 decimal to match the site's existing rating display style.
        averageRating: data.averageRating ? Math.round(data.averageRating * 10) / 10 : 5,
      },
    }
  } catch (error) {
    console.error('Error fetching live Google reviews:', error)
    return null
  }
}
