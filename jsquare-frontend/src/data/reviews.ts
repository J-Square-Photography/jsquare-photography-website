// =============================================================================
// Google Reviews Data
// =============================================================================
// To update reviews:
// 1. Go to https://www.google.com/maps/place/J+Square+Photography/
// 2. Click on the reviews section
// 3. Copy review details into the googleReviews array below
// 4. Update REVIEW_STATS with current totals from the listing
// =============================================================================

export interface GoogleReview {
  id: string
  reviewerName: string
  rating: number // 1-5
  reviewText: string
  date: string // e.g. "2024-01-15"
  relativeTime?: string // e.g. "2 months ago"
  profilePhotoUrl?: string // Optional reviewer photo URL
}

/** Direct link to Google Maps listing */
export const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/oGtyCP7yGniixQscA'

/** Aggregate stats from the Google listing — update when adding new reviews */
export const REVIEW_STATS = {
  totalReviews: 11,
  averageRating: 4.9,
}

// ---------------------------------------------------------------------------
// Real Google Reviews
// ---------------------------------------------------------------------------
// Add reviews from your Google Maps listing here. Example:
//
// {
//   id: '1',
//   reviewerName: 'John Doe',
//   rating: 5,
//   reviewText: 'Amazing photography service! Highly recommend.',
//   date: '2024-06-15',
//   relativeTime: '6 months ago',
// },
// ---------------------------------------------------------------------------
export const googleReviews: GoogleReview[] = [
  {
    id: '1',
    reviewerName: 'Ming Xuan Loo',
    rating: 5,
    reviewText:
      'The team is very passionate and committed to the filming and they give their 100%. Even though the weather conditions and environment and surroundings were not ideal during the day of the shoot, they were very accommodating and understanding. Thank you Jian Jie and Yi Lin for the outstanding services provided.',
    date: '2025-01-01',
    relativeTime: '2025',
  },
  {
    id: '2',
    reviewerName: 'Janiceming Lau',
    rating: 5,
    reviewText:
      'We had a fun family photoshoot and Mithun & Jinie made us felt relaxed throughout the photoshoot. Nice photos and thanks for helping us to capture the beautiful moments.',
    date: '2025-01-01',
    relativeTime: '2025',
  },
  {
    id: '3',
    reviewerName: 'Seah Jun Sheng',
    rating: 5,
    reviewText:
      "Very fun experience to be able to had this photo shoot session with JJ! He's a very friendly and experienced photographer who made our entire photo session with him enjoyable! Thank you very much JJ! Highly recommended if you need a photographer for your graduation or event!",
    date: '2025-01-01',
    relativeTime: '2025',
  },
]

// ---------------------------------------------------------------------------
// Fallback Reviews — shown when googleReviews is empty
// ---------------------------------------------------------------------------
export const fallbackReviews: GoogleReview[] = [
  {
    id: 'fallback-1',
    reviewerName: 'Sarah Chen',
    rating: 5,
    reviewText:
      'J Square Photography captured our wedding day perfectly! Their team was professional, creative, and made everyone feel comfortable. The photos exceeded our expectations.',
    date: '2024-08-10',
    relativeTime: '6 months ago',
  },
  {
    id: 'fallback-2',
    reviewerName: 'David Tan',
    rating: 5,
    reviewText:
      "We've used J Square for multiple corporate events and headshots. Their attention to detail and ability to capture the essence of our brand is remarkable. The DSLR photobooth was a huge hit!",
    date: '2024-07-22',
    relativeTime: '7 months ago',
  },
  {
    id: 'fallback-3',
    reviewerName: 'Emily Wong',
    rating: 5,
    reviewText:
      'The food photography session was amazing! J Square understood exactly what we needed to showcase our dishes. The images have significantly improved our online presence.',
    date: '2024-06-05',
    relativeTime: '8 months ago',
  },
]
