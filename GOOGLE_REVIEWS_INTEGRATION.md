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

## Status: access approved, code implemented (2026-07-27)

Google approved the access request. Note there are two separate APIs in play — don't
confuse them:
- **Business Profile Performance API** — impressions/views/calls metrics only. Already
  enabled, but **not used here**; it has no reviews data.
- **`mybusiness.googleapis.com/v4`** (legacy "Google My Business API") — this is the
  one that actually serves `accounts.locations.reviews.list`. This is what the approval
  email unblocked.

### What's built

- `jsquare-frontend/src/lib/google-business/reviews.ts` — server-only module.
  Exchanges the stored refresh token for an access token, calls
  `GET https://mybusiness.googleapis.com/v4/{accounts/*/locations/*}/reviews`,
  transforms the response into the existing `GoogleReview[]` shape. Returns `null` on
  any missing env var or API error, so the site always has something to render.
- `jsquare-frontend/src/app/api/google-reviews/authorize/route.ts` +
  `.../callback/route.ts` — one-time local-only OAuth flow to mint the refresh token.
  Not linked from the site; the OAuth client's redirect URI is restricted to
  `http://localhost:3000`, so it can't be hit in production.
- `jsquare-frontend/scripts/list-google-business-locations.mjs` — one-off script
  (`npm run sync:list-locations`) that lists your Business Profile accounts/locations
  so you can find the exact `accounts/{accountId}/locations/{locationId}` resource
  name (the Maps share link isn't enough to derive this).
- `jsquare-frontend/src/app/page.tsx` now fetches `fetchLiveGoogleReviews()`
  server-side in parallel with the other page data and passes `reviews`/`stats` into
  `TestimonialsSection`. If the live fetch returns `null` (not configured yet, or an
  API hiccup), it silently falls back to the curated list already in
  `src/data/reviews.ts` — the site never breaks because of this integration.
- **How "live" it is**: the reviews `fetch()` participates in the page's existing ISR
  cache (`export const revalidate = 60` in `page.tsx`), so it re-fetches from Google in
  the background at most every 60 seconds under traffic — no cron job, no extra
  storage needed.
- `jsquare-frontend/.env.local.example` documents the 4 required env vars.

## Your turn — finishing local setup

Nothing above works yet without secrets only you can retrieve/mint. To go live:

1. Copy `jsquare-frontend/.env.local.example` to `jsquare-frontend/.env.local`.
2. In [Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials),
   open the **"J Square Website - Reviews Sync"** OAuth client and copy its **Client
   ID** and **Client Secret** into `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`
   in `.env.local`. (Paste these directly into the file — not into chat.)
3. Run `npm run dev` in `jsquare-frontend/`, then visit
   `http://localhost:3000/api/google-reviews/authorize` in your browser and sign in as
   `jsquarephotographysg@gmail.com` (the business account). You'll land on a page
   showing `GOOGLE_OAUTH_REFRESH_TOKEN=...` — copy that line into `.env.local`.
4. Run `npm run sync:list-locations`. It'll print something like:
   ```
   Account: J Square Photography (accounts/123456789)
     - J Square Photography
       GOOGLE_BUSINESS_LOCATION=accounts/123456789/locations/987654321
   ```
   Copy that `GOOGLE_BUSINESS_LOCATION=` line into `.env.local`.
5. Restart `npm run dev` and reload the site — the Client Stories section should now
   show live reviews. Check the terminal for `console.error` output if it's still
   showing the fallback list (most likely cause: a typo in one of the 4 env vars, or
   the location resource name).
6. When deploying, add all 4 vars as environment variables in Vercel (Production +
   Preview). Do **not** add a production redirect URI for the OAuth client — the
   refresh token is minted once, locally, and reused indefinitely (until revoked).

## Reference

- Reviews data file (offline fallback): `jsquare-frontend/src/data/reviews.ts`
- Live fetch module: `jsquare-frontend/src/lib/google-business/reviews.ts`
- Rendered by: `jsquare-frontend/src/components/sections/TestimonialsSection.tsx`
- Google Maps listing: https://maps.app.goo.gl/oGtyCP7yGniixQscA
- Google Cloud project name: "J Square Photography"
- Reviews API reference: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list
