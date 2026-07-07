# Google Reviews Integration — Progress & Plan

Goal: replace the manually-maintained review list in `jsquare-frontend/src/data/reviews.ts`
with a live sync from J Square Photography's real Google Business Profile listing
(https://maps.app.goo.gl/oGtyCP7yGniixQscA — 4.9★, 13 reviews as of 2026-07-08).

## Why this approach (chosen over alternatives)

Considered 4 options: Google Business Profile API, Google Places API (Place Details),
no-code widgets (Elfsight/EmbedSocial), and scraper APIs (Outscraper/SerpApi).

**Decision: Google Business Profile API.** Reasons:
- Places API caps at 5 reviews (Google's hard limit, chosen by their own "relevance"
  algorithm, not configurable) — fewer than the 13 real reviews we already have.
- Business Profile API can pull up to 50 reviews (paginated) since we own the listing.
- No-code widgets don't match the site's custom-styled testimonial cards and add a
  recurring subscription cost.
- Scraper APIs violate Google's ToS and risk getting blocked.

Tradeoff accepted: Business Profile API requires a Google-approved access request
(days to weeks), vs. Places API which works immediately. Decided the wait is worth it
for higher review count + no ongoing cost.

## Current status (as of 2026-07-08)

- [x] Manually synced all 13 real reviews from the Google Maps listing into
      `jsquare-frontend/src/data/reviews.ts` (`googleReviews` array) as a stopgap.
      `REVIEW_STATS` updated to `{ totalReviews: 13, averageRating: 4.9 }`.
      Verified rendering in `TestimonialsSection.tsx` (13 carousel dots, correct
      relative-time computation).
- [x] Created Google Cloud project: **"J Square Photography"**.
- [x] Enabled APIs: `My Business Account Management API`, `My Business Business
      Information API`.
- [x] Configured OAuth consent screen (now called **Google Auth Platform** in Cloud
      Console UI): User type = **External**, Publishing status = **Testing**.
      Test users added: `jianjie95@gmail.com`, `jsquarephotographysg@gmail.com`.
- [x] Created OAuth Client ID (type: Web application, name: "J Square Website -
      Reviews Sync").
      - Authorized JavaScript origins: `http://localhost:3000`
      - Authorized redirect URIs: `http://localhost:3000/api/google-reviews/callback`
        (route doesn't exist in the codebase yet — to be built, see below)
      - **Client ID / Secret generated but NOT YET saved to `.env.local`** — user is
        holding off pasting them in until ready to resume this work.
- [x] **Submitted the Business Profile API access request** via
      https://developers.google.com/my-business/content/prereqs
      — **status: pending Google approval** (typically days to a few weeks).

## Blocked on

Google approving the access request for the actual reviews-serving API
(`mybusiness.googleapis.com`, the legacy "Google My Business API" v4 — this is
separate from the two APIs already enabled, and is gated/hidden until approval).
**Nothing else can proceed until this comes through.** No action needed from the user
while waiting — just check inbox/Cloud Console notifications periodically.

## Next steps once access is approved

1. User pastes `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` into
   `jsquare-frontend/.env.local` (gitignored — follow existing pattern like
   `SUPABASE_SERVICE_ROLE_KEY`).
2. Look up J Square Photography's Business Profile **location resource name**
   (`accounts/{accountId}/locations/{locationId}`) needed to query reviews for the
   right listing.
3. Build `/api/google-reviews/callback` route in the Next.js app — receives the
   OAuth authorization code, exchanges it for tokens.
4. Run a **one-time manual authorization flow** (visit the Google consent URL,
   approve as the business owner) to mint a long-lived **refresh token**. Store the
   refresh token server-side (env var, not committed).
5. Build the sync logic: server-side fetch using the refresh token → Business
   Profile API `reviews` endpoint → transform into `GoogleReview[]` shape → replace
   (or supplement) the manual `googleReviews` array in `reviews.ts`. Likely as a
   scheduled job / build-time fetch, not live client-side (avoid exposing tokens to
   the browser).
6. Decide sync cadence (e.g., re-fetch on each deploy, or a cron/revalidate route).

## Reference

- Reviews data file: `jsquare-frontend/src/data/reviews.ts`
- Rendered by: `jsquare-frontend/src/components/sections/TestimonialsSection.tsx`
- Google Maps listing: https://maps.app.goo.gl/oGtyCP7yGniixQscA
- Google Cloud project name: "J Square Photography"
- Business Profile API prerequisites/access request:
  https://developers.google.com/my-business/content/prereqs
