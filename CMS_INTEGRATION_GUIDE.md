# CMS Integration Guide — J Square Photography

> Making every hardcoded section CMS-editable via **Secure Custom Fields (SCF)** + **WPGraphQL**.

---

## Table of Contents

1. [Current State Summary](#1-current-state-summary)
2. [WordPress Plugin Setup](#2-wordpress-plugin-setup)
3. [Custom Post Types](#3-custom-post-types)
4. [SCF Field Groups per Section](#4-scf-field-groups-per-section)
5. [GraphQL Queries](#5-graphql-queries)
6. [Frontend Code Changes](#6-frontend-code-changes)
7. [Section-by-Section Checklist](#7-section-by-section-checklist)

---

## 1. Current State Summary

| Section | File(s) | Status | Notes |
|---------|---------|--------|-------|
| **Hero** | `Hero.tsx` | Hardcoded | Title, subtitle, "Since 2017", "Singapore" |
| **About** | `AboutSection.tsx`, `api.ts` | Partial CMS | Fetches from WP `about-us` page + ACF `aboutUs` group; falls back to hardcoded defaults |
| **Recent Galleries** | `RecentGalleries.tsx`, `api.ts` | CMS with fallback | Fetches posts with category `gallery` |
| **Services** | `ServicesSection.tsx`, `api.ts` | CMS with fallback | Custom post type `service` with `serviceDetails` ACF group; `FALLBACK_SERVICES` array in api.ts |
| **Team** | `TeamSection.tsx` | Hardcoded | 4 placeholder members with Unsplash images |
| **Testimonials** | `TestimonialsSection.tsx` | Hardcoded | 5 placeholder testimonials + trust-badge stats |
| **Pricing** | `api.ts` | Hardcoded | 3 arrays: `PHOTOGRAPHY_PRICING_TIERS`, `VIDEOGRAPHY_PRICING_TIERS`, `PHOTOBOOTH_PRICING_TIERS` |
| **Featured Story** | `FeaturedStory.tsx`, `api.ts` | CMS with fallback | Fetches posts with category `story` |
| **Contact** | `page.tsx` (lines 80-114) | Hardcoded | CTA heading, description, WhatsApp number, email |
| **Footer** | `Footer.tsx` | Hardcoded | Company tagline, social URLs, phone, email, location, service list |

**Already connected to CMS (no work needed):** Galleries, Services (CPT), About (partial), Stories.

**Needs CMS integration:** Hero, Team, Testimonials, Pricing, Contact, Footer, trust-badge stats.

---

## 2. WordPress Plugin Setup

### Required Plugins

| Plugin | Purpose | Install |
|--------|---------|---------|
| **Secure Custom Fields (SCF)** | Create field groups for every section | WP Admin → Plugins → Add New → "Secure Custom Fields" |
| **WPGraphQL** | Expose WP data via `/graphql` | WP Admin → Plugins → Add New → "WPGraphQL" |
| **WPGraphQL for ACF** | Expose ACF/SCF field groups in GraphQL schema | WP Admin → Plugins → Add New → "WPGraphQL for ACF" |

### Configuration Checklist

1. **WPGraphQL** → Settings → set GraphQL endpoint to `/graphql` (already configured as `https://backend.jsquarephotography.com/graphql`).
2. **WPGraphQL for ACF** → No extra config needed; each SCF field group must have **"Show in GraphQL"** enabled and a **GraphQL Type Name** set.
3. When creating SCF field groups, always set:
   - **Show in GraphQL** → Yes
   - **GraphQL Field Name** → camelCase identifier (e.g. `heroContent`)

---

## 3. Custom Post Types

### 3a. Team Members CPT

Register in theme `functions.php` or via a CPT plugin:

```php
// functions.php
add_action('init', function () {
    register_post_type('team_member', [
        'labels' => [
            'name'          => 'Team Members',
            'singular_name' => 'Team Member',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'teamMember',
        'graphql_plural_name'   => 'teamMembers',
        'supports'     => ['title', 'thumbnail', 'page-attributes'],
        'menu_icon'    => 'dashicons-groups',
    ]);
});
```

### 3b. Testimonials CPT

```php
add_action('init', function () {
    register_post_type('testimonial', [
        'labels' => [
            'name'          => 'Testimonials',
            'singular_name' => 'Testimonial',
        ],
        'public'       => false,
        'show_ui'      => true,
        'show_in_graphql'       => true,
        'graphql_single_name'   => 'testimonial',
        'graphql_plural_name'   => 'testimonials',
        'supports'     => ['title', 'thumbnail', 'page-attributes'],
        'menu_icon'    => 'dashicons-format-quote',
    ]);
});
```

> **Note:** The Services CPT already exists and works with GraphQL (`services` query).

---

## 4. SCF Field Groups per Section

### 4a. Hero Section

**Field Group:** "Hero Content"
**Location:** Options page (create a WP Options Page, or attach to a "Site Settings" page)
**GraphQL Field Name:** `heroContent`

| Field Name | Field Type | GraphQL Key | Current Hardcoded Value |
|------------|-----------|-------------|------------------------|
| `hero_title_line_1` | Text | `heroTitleLine1` | `CAPTURING` |
| `hero_title_line_2` | Text | `heroTitleLine2` | `MOMENTS` |
| `hero_subtitle` | Text | `heroSubtitle` | `Professional photography & videography services` |
| `hero_since_year` | Text | `heroSinceYear` | `Since 2017` |
| `hero_location` | Text | `heroLocation` | `Singapore` |

**Alternative — use an ACF Options Page:**

```php
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title'      => 'Site Settings',
        'menu_title'      => 'Site Settings',
        'menu_slug'       => 'site-settings',
        'capability'      => 'edit_posts',
        'show_in_graphql' => true,
    ]);
}
```

### 4b. Team Members

**Field Group:** "Team Member Details"
**Location:** Post Type == `team_member`
**GraphQL Field Name:** `teamMemberDetails`

| Field Name | Field Type | GraphQL Key | Notes |
|------------|-----------|-------------|-------|
| `role` | Text | `role` | e.g. "Lead Photographer & Creative Director" |
| `bio` | Textarea | `bio` | Short biography |
| `instagram_handle` | Text | `instagramHandle` | Optional |
| `linkedin_handle` | Text | `linkedinHandle` | Optional |
| `display_order` | Number | `displayOrder` | For sorting |

> The member's **name** is the post title; the **photo** is the featured image.

### 4c. Testimonials

**Field Group:** "Testimonial Details"
**Location:** Post Type == `testimonial`
**GraphQL Field Name:** `testimonialDetails`

| Field Name | Field Type | GraphQL Key | Notes |
|------------|-----------|-------------|-------|
| `client_role` | Text | `clientRole` | e.g. "Wedding Couple", "Marketing Director" |
| `company` | Text | `company` | Optional |
| `quote` | Textarea | `quote` | The testimonial text |
| `rating` | Number (1-5) | `rating` | Star rating |
| `service_tag` | Text | `serviceTag` | e.g. "Wedding Photography" |

> The client **name** is the post title; the client **photo** is the featured image.

### 4d. Trust-Badge Stats

**Field Group:** "Trust Badge Stats"
**Location:** Options page (same "Site Settings" page as Hero)
**GraphQL Field Name:** `trustBadgeStats`

| Field Name | Field Type | GraphQL Key | Current Hardcoded Value |
|------------|-----------|-------------|------------------------|
| `events_covered` | Text | `eventsCovered` | `500+` |
| `years_experience` | Text | `yearsExperience` | `7+` |
| `happy_clients` | Text | `happyClients` | `1000+` |
| `average_rating` | Text | `averageRating` | `5.0` |

### 4e. Pricing Tables

**Field Group:** "Pricing Configuration"
**Location:** Options page ("Site Settings")
**GraphQL Field Name:** `pricingConfig`

Use a **Repeater** field for each service type:

| Field Name | Field Type | GraphQL Key | Notes |
|------------|-----------|-------------|-------|
| `photography_tiers` | Repeater | `photographyTiers` | Each row: `label` (Text), `rates` (Repeater of `duration` + `price`) |
| `videography_tiers` | Repeater | `videographyTiers` | Same structure |
| `photobooth_tiers` | Repeater | `photoboothTiers` | Same structure |

**Repeater inner structure (per tier):**

```
tier_label        (Text)     — e.g. "Beginner (Student)"
tier_rates        (Repeater)
  ├── duration    (Text)     — e.g. "1 Hour"
  └── price       (Text)     — e.g. "$30"
```

### 4f. Contact Section

**Field Group:** "Contact Section"
**Location:** Options page ("Site Settings")
**GraphQL Field Name:** `contactSection`

| Field Name | Field Type | GraphQL Key | Current Hardcoded Value |
|------------|-----------|-------------|------------------------|
| `contact_heading` | Text | `contactHeading` | `Let's Create Together` |
| `contact_description` | Textarea | `contactDescription` | `Ready to capture your special moments? ...` |
| `whatsapp_number` | Text | `whatsappNumber` | `6580373735` |
| `email_address` | Email | `emailAddress` | `Jsquarephotographysg@gmail.com` |
| `response_note` | Text | `responseNote` | `Response within 24 hours • Available 7 days a week` |

### 4g. Footer

**Field Group:** "Footer Settings"
**Location:** Options page ("Site Settings")
**GraphQL Field Name:** `footerSettings`

| Field Name | Field Type | GraphQL Key | Current Hardcoded Value |
|------------|-----------|-------------|------------------------|
| `company_tagline` | Textarea | `companyTagline` | `Professional photography and videography...` |
| `phone_number` | Text | `phoneNumber` | `+65 8037 3735` |
| `email` | Email | `email` | `Jsquarephotographysg@gmail.com` |
| `location` | Text | `location` | `Singapore` |
| `instagram_url` | URL | `instagramUrl` | `https://instagram.com/jsquarephotography` |
| `facebook_url` | URL | `facebookUrl` | `https://facebook.com/jsquarephotography` |
| `youtube_url` | URL | `youtubeUrl` | `https://youtube.com/@jsquarephotography` |

---

## 5. GraphQL Queries

### 5a. Site Settings (Hero, Contact, Footer, Stats, Pricing)

This assumes an ACF Options Page named "Site Settings" with `show_in_graphql => true`.

```graphql
query GetSiteSettings {
  siteSettings {
    heroContent {
      heroTitleLine1
      heroTitleLine2
      heroSubtitle
      heroSinceYear
      heroLocation
    }
    contactSection {
      contactHeading
      contactDescription
      whatsappNumber
      emailAddress
      responseNote
    }
    footerSettings {
      companyTagline
      phoneNumber
      email
      location
      instagramUrl
      facebookUrl
      youtubeUrl
    }
    trustBadgeStats {
      eventsCovered
      yearsExperience
      happyClients
      averageRating
    }
    pricingConfig {
      photographyTiers {
        tierLabel
        tierRates {
          duration
          price
        }
      }
      videographyTiers {
        tierLabel
        tierRates {
          duration
          price
        }
      }
      photoboothTiers {
        tierLabel
        tierRates {
          duration
          price
        }
      }
    }
  }
}
```

> **Note:** The exact root query name (`siteSettings`) depends on how WPGraphQL for ACF exposes options pages. Check your GraphQL IDE (e.g. WPGraphQL's built-in GraphiQL) after setup.

### 5b. Team Members

```graphql
query GetTeamMembers {
  teamMembers(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      teamMemberDetails {
        role
        bio
        instagramHandle
        linkedinHandle
        displayOrder
      }
    }
  }
}
```

### 5c. Testimonials

```graphql
query GetTestimonials {
  testimonials(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      testimonialDetails {
        clientRole
        company
        quote
        rating
        serviceTag
      }
    }
  }
}
```

---

## 6. Frontend Code Changes

### 6a. New Types — `types.ts`

Add to `jsquare-frontend/src/lib/wordpress/types.ts`:

```typescript
// ── Team Member ──────────────────────────────────────────
export interface TeamMember {
  id: string
  name: string          // from post title
  role: string
  bio?: string
  imageUrl?: string     // from featuredImage.node.sourceUrl
  social?: {
    instagram?: string
    linkedin?: string
  }
}

// ── Testimonial ──────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string          // from post title
  role: string
  company?: string
  content: string       // the quote
  imageUrl: string      // from featuredImage.node.sourceUrl
  rating: number
  service: string
}

// ── Trust Badge Stats ────────────────────────────────────
export interface TrustBadgeStats {
  eventsCovered: string
  yearsExperience: string
  happyClients: string
  averageRating: string
}

// ── Hero Content ─────────────────────────────────────────
export interface HeroContent {
  titleLine1: string
  titleLine2: string
  subtitle: string
  sinceYear: string
  location: string
}

// ── Contact Section ──────────────────────────────────────
export interface ContactSection {
  heading: string
  description: string
  whatsappNumber: string
  emailAddress: string
  responseNote: string
}

// ── Footer Settings ──────────────────────────────────────
export interface FooterSettings {
  companyTagline: string
  phoneNumber: string
  email: string
  location: string
  instagramUrl: string
  facebookUrl: string
  youtubeUrl: string
}
```

### 6b. New Fetchers — `api.ts`

Add to `jsquare-frontend/src/lib/wordpress/api.ts`:

```typescript
// ── Team Members ─────────────────────────────────────────

const GET_TEAM_MEMBERS = `
  query GetTeamMembers {
    teamMembers(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        featuredImage {
          node { sourceUrl altText }
        }
        teamMemberDetails {
          role
          bio
          instagramHandle
          linkedinHandle
          displayOrder
        }
      }
    }
  }
`;

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const data: any = await graphqlClient.request(GET_TEAM_MEMBERS);
    if (!data?.teamMembers?.nodes?.length) return [];
    return data.teamMembers.nodes.map((node: any) => ({
      id: node.id,
      name: node.title,
      role: node.teamMemberDetails?.role ?? '',
      bio: node.teamMemberDetails?.bio,
      imageUrl: node.featuredImage?.node?.sourceUrl,
      social: {
        instagram: node.teamMemberDetails?.instagramHandle,
        linkedin: node.teamMemberDetails?.linkedinHandle,
      },
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

// ── Testimonials ─────────────────────────────────────────

const GET_TESTIMONIALS = `
  query GetTestimonials {
    testimonials(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        featuredImage {
          node { sourceUrl altText }
        }
        testimonialDetails {
          clientRole
          company
          quote
          rating
          serviceTag
        }
      }
    }
  }
`;

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const data: any = await graphqlClient.request(GET_TESTIMONIALS);
    if (!data?.testimonials?.nodes?.length) return [];
    return data.testimonials.nodes.map((node: any) => ({
      id: node.id,
      name: node.title,
      role: node.testimonialDetails?.clientRole ?? '',
      company: node.testimonialDetails?.company,
      content: node.testimonialDetails?.quote ?? '',
      imageUrl: node.featuredImage?.node?.sourceUrl ?? '',
      rating: node.testimonialDetails?.rating ?? 5,
      service: node.testimonialDetails?.serviceTag ?? '',
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

// ── Site Settings (Hero, Contact, Footer, Stats) ─────────

const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    siteSettings {
      heroContent {
        heroTitleLine1
        heroTitleLine2
        heroSubtitle
        heroSinceYear
        heroLocation
      }
      contactSection {
        contactHeading
        contactDescription
        whatsappNumber
        emailAddress
        responseNote
      }
      footerSettings {
        companyTagline
        phoneNumber
        email
        location
        instagramUrl
        facebookUrl
        youtubeUrl
      }
      trustBadgeStats {
        eventsCovered
        yearsExperience
        happyClients
        averageRating
      }
    }
  }
`;

export const getSiteSettings = async () => {
  try {
    const data: any = await graphqlClient.request(GET_SITE_SETTINGS);
    const s = data?.siteSettings;
    return {
      hero: s?.heroContent ? {
        titleLine1: s.heroContent.heroTitleLine1 ?? 'CAPTURING',
        titleLine2: s.heroContent.heroTitleLine2 ?? 'MOMENTS',
        subtitle: s.heroContent.heroSubtitle ?? 'Professional photography & videography services',
        sinceYear: s.heroContent.heroSinceYear ?? 'Since 2017',
        location: s.heroContent.heroLocation ?? 'Singapore',
      } : null,
      contact: s?.contactSection ? {
        heading: s.contactSection.contactHeading ?? "Let's Create Together",
        description: s.contactSection.contactDescription ?? '',
        whatsappNumber: s.contactSection.whatsappNumber ?? '6580373735',
        emailAddress: s.contactSection.emailAddress ?? 'Jsquarephotographysg@gmail.com',
        responseNote: s.contactSection.responseNote ?? '',
      } : null,
      footer: s?.footerSettings ?? null,
      stats: s?.trustBadgeStats ?? null,
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return { hero: null, contact: null, footer: null, stats: null };
  }
};
```

### 6c. Component Prop Updates

#### `Hero.tsx`

```diff
+ import { HeroContent } from '@/lib/wordpress/types'

- export const Hero = () => {
+ interface HeroProps { content?: HeroContent }
+ export const Hero = ({ content }: HeroProps) => {

  // Replace hardcoded strings with:
- CAPTURING
+ {content?.titleLine1 ?? 'CAPTURING'}

- MOMENTS
+ {content?.titleLine2 ?? 'MOMENTS'}

- Professional photography & videography services
+ {content?.subtitle ?? 'Professional photography & videography services'}

- Since 2017
+ {content?.sinceYear ?? 'Since 2017'}

- Singapore
+ {content?.location ?? 'Singapore'}
```

#### `TeamSection.tsx`

Already accepts `members?: TeamMember[]` — no interface change needed. Just pass data from the CMS instead of relying on `defaultMembers`.

#### `TestimonialsSection.tsx`

```diff
+ import { Testimonial, TrustBadgeStats } from '@/lib/wordpress/types'

- export const TestimonialsSection = () => {
+ interface TestimonialsSectionProps {
+   testimonials?: Testimonial[]
+   stats?: TrustBadgeStats
+ }
+ export const TestimonialsSection = ({ testimonials: cmsTestimonials, stats }: TestimonialsSectionProps) => {

  // Keep existing hardcoded array as fallback:
  const fallbackTestimonials: Testimonial[] = [ /* existing array */ ];
  const displayTestimonials = cmsTestimonials?.length ? cmsTestimonials : fallbackTestimonials;

  // For trust badges, replace hardcoded values:
- <div className="...">500+</div>
+ <div className="...">{stats?.eventsCovered ?? '500+'}</div>
  // ...same pattern for other stats
```

#### `Footer.tsx`

```diff
+ import { FooterSettings } from '@/lib/wordpress/types'

- export const Footer = () => {
+ interface FooterProps { settings?: FooterSettings }
+ export const Footer = ({ settings }: FooterProps) => {

  // Replace hardcoded strings:
- Professional photography and videography services in Singapore...
+ {settings?.companyTagline ?? 'Professional photography and videography services in Singapore. Capturing moments, creating memories since 2017.'}

- href="https://instagram.com/jsquarephotography"
+ href={settings?.instagramUrl ?? 'https://instagram.com/jsquarephotography'}

  // Same pattern for facebookUrl, youtubeUrl, phoneNumber, email, location
```

#### Contact section in `page.tsx`

Extract the inline contact section into either a separate `ContactSection` component or pass props inline:

```diff
+ // In the server component data fetch:
+ const siteSettings = await getSiteSettings();

  // In JSX, replace hardcoded contact values:
- Let's Create Together
+ {siteSettings.contact?.heading ?? "Let's Create Together"}

- href="https://wa.me/6580373735"
+ href={`https://wa.me/${siteSettings.contact?.whatsappNumber ?? '6580373735'}`}

- href="mailto:Jsquarephotographysg@gmail.com"
+ href={`mailto:${siteSettings.contact?.emailAddress ?? 'Jsquarephotographysg@gmail.com'}`}
```

### 6d. Page Wiring — `page.tsx`

Update `src/app/page.tsx` to fetch all new data:

```typescript
import {
  getAboutSectionContent,
  getMainServices,
  getAdditionalServices,
  getTeamMembers,       // NEW
  getTestimonials,      // NEW
  getSiteSettings,      // NEW
} from "@/lib/wordpress/api"

export default async function Home() {
  const [
    aboutContent,
    mainServices,
    additionalServices,
    teamMembers,        // NEW
    testimonials,       // NEW
    siteSettings,       // NEW
  ] = await Promise.all([
    getAboutSectionContent(),
    getMainServices(),
    getAdditionalServices(),
    getTeamMembers(),
    getTestimonials(),
    getSiteSettings(),
  ])

  return (
    <>
      <Navigation />
      <ThemeToggle />
      <main>
        <Hero content={siteSettings.hero ?? undefined} />
        <AboutSection content={aboutContent || undefined} />
        <RecentGalleries />
        <ServicesSection mainServices={mainServices} additionalServices={additionalServices} />
        <TeamSection members={teamMembers.length ? teamMembers : undefined} />
        <TestimonialsSection
          testimonials={testimonials.length ? testimonials : undefined}
          stats={siteSettings.stats ?? undefined}
        />
        <FeaturedStory />
        {/* Contact section — use siteSettings.contact */}
        <Footer settings={siteSettings.footer ?? undefined} />
      </main>
    </>
  )
}
```

### 6e. Pricing — `api.ts`

Replace the three hardcoded `PricingTier[]` arrays with a CMS fetch:

```typescript
export const getPricingTiers = async (): Promise<{
  photography: PricingTier[];
  videography: PricingTier[];
  photobooth: PricingTier[];
}> => {
  try {
    const data: any = await graphqlClient.request(GET_SITE_SETTINGS);
    const pricing = data?.siteSettings?.pricingConfig;
    const mapTiers = (raw: any[]): PricingTier[] =>
      (raw ?? []).map((t: any) => ({
        label: t.tierLabel,
        rates: (t.tierRates ?? []).map((r: any) => ({
          duration: r.duration,
          price: r.price,
        })),
      }));

    return {
      photography: mapTiers(pricing?.photographyTiers) || PHOTOGRAPHY_PRICING_TIERS,
      videography: mapTiers(pricing?.videographyTiers) || VIDEOGRAPHY_PRICING_TIERS,
      photobooth: mapTiers(pricing?.photoboothTiers) || PHOTOBOOTH_PRICING_TIERS,
    };
  } catch {
    return {
      photography: PHOTOGRAPHY_PRICING_TIERS,
      videography: VIDEOGRAPHY_PRICING_TIERS,
      photobooth: PHOTOBOOTH_PRICING_TIERS,
    };
  }
};
```

Keep the existing hardcoded arrays as fallbacks.

---

## 7. Section-by-Section Checklist

Use this checklist when implementing. Each section follows the same pattern:

1. **WordPress:** Create CPT / field group in SCF
2. **WordPress:** Populate with real data
3. **Frontend:** Add GraphQL query + fetcher in `api.ts`
4. **Frontend:** Add/update types in `types.ts`
5. **Frontend:** Update component to accept props (keep hardcoded defaults as fallback)
6. **Frontend:** Wire data in `page.tsx`
7. **Test:** Verify data appears; verify fallback works when WP is unavailable

### Hero

- [ ] Create ACF Options Page "Site Settings" (if not exists)
- [ ] Add "Hero Content" field group to options page
- [ ] Populate hero fields in WP Admin
- [ ] Add `HeroContent` type to `types.ts`
- [ ] Add `getSiteSettings()` query to `api.ts`
- [ ] Update `Hero.tsx` to accept `content?: HeroContent` prop
- [ ] Pass data from `page.tsx`

### Team Members

- [ ] Register `team_member` CPT in `functions.php`
- [ ] Create "Team Member Details" field group in SCF
- [ ] Add real team members in WP Admin
- [ ] Add `TeamMember` type to `types.ts` (interface already exists in `TeamSection.tsx` — move to `types.ts`)
- [ ] Add `GET_TEAM_MEMBERS` query + `getTeamMembers()` to `api.ts`
- [ ] Pass fetched members from `page.tsx` to `<TeamSection members={...} />`

### Testimonials

- [ ] Register `testimonial` CPT in `functions.php`
- [ ] Create "Testimonial Details" field group in SCF
- [ ] Add real testimonials in WP Admin
- [ ] Add `Testimonial` + `TrustBadgeStats` types to `types.ts`
- [ ] Add `GET_TESTIMONIALS` query + `getTestimonials()` to `api.ts`
- [ ] Update `TestimonialsSection.tsx` to accept `testimonials` + `stats` props
- [ ] Pass data from `page.tsx`

### Pricing

- [ ] Add "Pricing Configuration" repeater fields to "Site Settings" options page
- [ ] Populate pricing tiers in WP Admin
- [ ] Add `getPricingTiers()` to `api.ts`
- [ ] Update `services/[slug]/page.tsx` to fetch pricing from CMS
- [ ] Keep `PHOTOGRAPHY_PRICING_TIERS` etc. as fallback

### Contact Section

- [ ] Add "Contact Section" field group to "Site Settings" options page
- [ ] Populate contact fields in WP Admin
- [ ] Add `ContactSection` type to `types.ts`
- [ ] Pass `siteSettings.contact` into the contact section JSX in `page.tsx`

### Footer

- [ ] Add "Footer Settings" field group to "Site Settings" options page
- [ ] Populate footer fields in WP Admin
- [ ] Add `FooterSettings` type to `types.ts`
- [ ] Update `Footer.tsx` to accept `settings?: FooterSettings` prop
- [ ] Pass `siteSettings.footer` from `page.tsx`

### Trust-Badge Stats

- [ ] Add "Trust Badge Stats" field group to "Site Settings" options page
- [ ] Populate stats in WP Admin
- [ ] Pass `siteSettings.stats` to `TestimonialsSection`

---

## Key File Reference

| File | Path (from `jsquare-frontend/src/`) |
|------|-------------------------------------|
| API layer | `lib/wordpress/api.ts` |
| Types | `lib/wordpress/types.ts` |
| Homepage | `app/page.tsx` |
| Hero | `components/ui/Hero.tsx` |
| About | `components/sections/AboutSection.tsx` |
| Services | `components/sections/ServicesSection.tsx` |
| Team | `components/sections/TeamSection.tsx` |
| Testimonials | `components/sections/TestimonialsSection.tsx` |
| Footer | `components/sections/Footer.tsx` |
| Recent Galleries | `components/sections/RecentGalleries.tsx` |
| Featured Story | `components/sections/FeaturedStory.tsx` |
| Pricing Table | `components/ui/PricingTable.tsx` |
| Service Detail | `app/services/[slug]/page.tsx` |
| WP Hooks | `hooks/useWordPress.ts` |
| Env config | `.env.local` (`NEXT_PUBLIC_WORDPRESS_API_URL`) |
