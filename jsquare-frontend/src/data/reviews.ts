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
  totalReviews: 13,
  averageRating: 4.9,
}

// ---------------------------------------------------------------------------
// Real Google Reviews
// ---------------------------------------------------------------------------
// Manually synced from https://maps.app.goo.gl/oGtyCP7yGniixQscA — last synced 2026-07-08.
// Add reviews from your Google Maps listing here. Example:
//
// {
//   id: '1',
//   reviewerName: 'John Doe',
//   rating: 5,
//   reviewText: 'Amazing photography service! Highly recommend.',
//   date: '2024-06-15',
// },
// ---------------------------------------------------------------------------
export const googleReviews: GoogleReview[] = [
  {
    id: '1',
    reviewerName: 'Toh Toh',
    rating: 5,
    reviewText:
      'I had a great experience with J Square Photography! The whole process was smooth, professional, and enjoyable from start to finish. A special shoutout to JJ, who was incredibly patient, friendly, and attentive throughout the session. He made us feel comfortable in front of the camera and guided us naturally, which made the experience stress free and fun. His attention to detail and dedication really showed in the final photos. They turned out even better than we expected. Thank you, JJ, for the excellent service and beautiful memories. Highly recommend J Square Photography, especially if you have the chance to work with JJ!',
    date: '2026-07-01',
  },
  {
    id: '2',
    reviewerName: 'Chiang Jia Leong',
    rating: 5,
    reviewText:
      'Fun experience and professional photos taken, would recommend their services to others',
    date: '2026-06-01',
  },
  {
    id: '3',
    reviewerName: 'jun long',
    rating: 5,
    reviewText:
      'Great customer service! Jian Jie and his team gave me a great experience, will return again for their services!',
    date: '2025-11-01',
  },
  {
    id: '4',
    reviewerName: 'Ming Xuan Loo',
    rating: 5,
    reviewText:
      'The team is very passionate and committed to the filming and they give their 100%. Even though the weather conditions and environment and surroundings were not ideal during the day of the shoot, they were very accomodating and understanding. Thank you Jian Jie and Yi Lin for the outstanding services provided.',
    date: '2025-07-01',
  },
  {
    id: '5',
    reviewerName: 'janiceming lau',
    rating: 5,
    reviewText:
      'We had a fun family photoshoot and Mithun & Jinie made us felt relaxed throughout the photoshoot. Nice photos and thanks for helping us to capture the beautiful moments.',
    date: '2025-07-01',
  },
  {
    id: '6',
    reviewerName: 'Marcus Teo',
    rating: 5,
    reviewText:
      'The videographer, Jian Jie is very passionate, committed to making sure that the same day edit is full of content, he goes an extra mile to make sure that the video is ready on time even thou there is a delay in the schedule. The photographer, Chi Ling is also very passionate in her work and is very detail oriented. She is also very friendly and always does her best to make sure that every photo is perfect. I would recommend their services to others as they both are very willing to go above and beyond to make sure that the photos and videos turn out great.',
    date: '2024-07-01',
  },
  {
    id: '7',
    reviewerName: 'Wong',
    rating: 5,
    reviewText:
      "Jian Jie and his team offers one of the most amazing services! They are kind, understanding and genuinely care for the customers! When he was engaged, not only did he offer an unbeatable price, but accommodated when the event hours extended and also at an incredible rate! Loved his service to everyone and he shot beautiful photos!! He will also ensure that guests that come to his photo booth are always happy! He would help them with poses too and even props so that they look their best! He also talks to the event organisers to ensure that everything is ok! In fact, I still remember that when it rained during the event, Jian Jie and his team never once complained and efficiently moved the props indoors while continuing the high spirited nature of the event. This shows huge professionalism of his team because everyone is still smiling and genuine in their work. Would definitely get his team again for future events!",
    date: '2024-07-01',
  },
  {
    id: '8',
    reviewerName: 'Seah Jun Sheng',
    rating: 5,
    reviewText:
      "Very fun experience to be able to had this photo shoot session with JJ! He's a very friendly and experienced photographer who made our entire photo session with him enjoyable! Thank you very much JJ! Highly recommended if you need a photographer for your graduation or event!",
    date: '2024-07-01',
  },
  {
    id: '9',
    reviewerName: 'Lenny',
    rating: 5,
    reviewText:
      "Jsquare has delivered excellence in his work, and met my expectations within a week of booking for a family photoshoot. Photographer is patient and resourceful, and the assistant has been of great help! They're ready for any shoots!",
    date: '2024-07-01',
  },
  {
    id: '10',
    reviewerName: 'Sarika Nishaini',
    rating: 4,
    reviewText:
      'The team was very friendly and provided quality service. They tried to capture as much as they can. The photo quality was good. Some shots were really outstanding.',
    date: '2024-07-01',
  },
  {
    id: '11',
    reviewerName: 'Alex Rex',
    rating: 5,
    reviewText: 'Great service at competitive prices! Worth it!',
    date: '2024-07-01',
  },
  {
    id: '12',
    reviewerName: 'Bhavani Vijay',
    rating: 5,
    reviewText:
      'Jian Jie, our photographer was very friendly and provided excellent service. He tried to capture as much as he can. The photo quality were good. Will definitely engage them again!',
    date: '2023-07-01',
  },
  {
    id: '13',
    reviewerName: 'Junan Lim',
    rating: 5,
    reviewText:
      'It was really a pleasure to meet JJ and Team from JSquare Photography! They were extremely friendly and a joy to work with! Special mentions to JJ for accommodating to our late requests of designing the photo frames and for all the super prompt replies. They are a fantastic team who not only will deliver the best photo booth experience, but also delight guests with their enthusiasm and spirit. Engage them if you do not want to worry about anything on the actual day of event! You guys have our thumbs up! - Jun An (Event Organizer for MNC Company)',
    date: '2023-07-01',
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
