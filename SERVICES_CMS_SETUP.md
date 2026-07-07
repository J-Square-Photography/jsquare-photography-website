# Services CMS Setup (SCF + WPGraphQL)

Step-by-step guide to build the **Services** custom post type so the website's
"Our Services" section pulls from WordPress instead of the hardcoded fallback.

> **Status today:** The site renders `FALLBACK_SERVICES` (in
> `jsquare-frontend/src/lib/wordpress/api.ts`, ~lines 495–660). Once this CPT
> exists and is populated, the frontend automatically uses CMS data — no code
> change needed (it already queries `services` / `serviceBy`).

The frontend queries **exact** names. They must match or the query breaks.
Your existing `aboutUs` group already proves the SCF→GraphQL bridge works.

---

## 0. Prerequisites (verify active)

- **Secure Custom Fields (SCF)** — active
- **WPGraphQL** — active
- **WPGraphQL for ACF** (the SCF/ACF→GraphQL bridge) — active
  *(your `aboutUs` group resolves in GraphQL, so this is already working)*

---

## 1. Register the `service` Post Type

SCF → **Post Types** → **Add New** (or `functions.php`). Settings:

| Setting | Value |
|---|---|
| Post Type Key | `service` |
| Plural / Singular labels | `Services` / `Service` |
| **Show in GraphQL** | ✅ **Yes** |
| **GraphQL Single Name** | `service` |
| **GraphQL Plural Name** | `services` |
| Public | Yes (or "Show in UI" = yes if you prefer non-public) |
| Supports | `title`, `editor`, `excerpt`, `thumbnail`, `page-attributes` |
| Menu icon | `dashicons-camera` (optional) |

> `page-attributes` is required — the query sorts by **menu order** (`MENU_ORDER`).
> `thumbnail` enables the **Featured Image** (this is where each service photo goes).

**Equivalent `functions.php` (if you prefer code):**

```php
add_action('init', function () {
    register_post_type('service', [
        'labels' => ['name' => 'Services', 'singular_name' => 'Service'],
        'public'              => true,
        'show_ui'             => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'service',
        'graphql_plural_name' => 'services',
        'supports'            => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'],
        'menu_icon'           => 'dashicons-camera',
        'has_archive'         => false,
    ]);
});
```

---

## 2. Create the "Service Details" Field Group

SCF → **Field Groups** → **Add New**. Name it **Service Details**.

**Group settings (bottom of the page):**
- **Show in GraphQL** → ✅ Yes
- **GraphQL Field Name** → `serviceDetails`
- **Location** → Post Type **is equal to** `service`

**Fields** (GraphQL Field Name on each must match exactly):

| # | Field Label | Field Type | **GraphQL Field Name** | Notes |
|---|---|---|---|---|
| 1 | Short Description | Textarea | `shortDescription` | shown on the card |
| 2 | Features List | **Repeater** | `featuresList` | add ONE sub-field ↓ |
| 2a | └ Feature Item | Text | `featureItem` | sub-field of the repeater |
| 3 | Pricing Info | Text | `pricingInfo` | e.g. `From $388` |
| 4 | Service Category | **Select** | `serviceCategory` | choices below |
| 5 | WhatsApp Message Override | Textarea | `whatsappMessageOverride` | optional |
| 6 | CTA Text | Text | `ctaText` | e.g. `Get Quote` |
| 7 | Service Icon | Text | `serviceIcon` | optional |
| 8 | Service Gallery | **Gallery** | `serviceGallery` | optional, detail page |

**Field #4 "Service Category" choices** (Select field → Choices box, format `value : Label`):
```
main : Core Specialty
additional : Additional Service
```
> This single field decides whether the card appears under **Core Specialties**
> (`main`) or **Additional Services** (`additional`).

---

## 3. Create the 7 Service Posts

Services → **Add New** for each. Set **Title**, **Featured Image**, the post
**body** (editor = `content`), the **Excerpt**, and the Service Details fields.

**Menu Order** controls display order (lower = first). Suggested order shown.

### Image ratio depends on category
- **`main` (Core Specialties):** crop to **4:3** → upload ~**1600×1200**
- **`additional`:** crop to **3:2** → upload ~**1600×1067**

---

### Core Specialties (`serviceCategory = main`)

**1. Event Photography** — menu order `10`
- Slug: `event-photography`
- Excerpt: `Professional event photography tailored to your budget`
- shortDescription: `Professional event photography with photographers matched to your budget and style.`
- pricingInfo: `From $150/hr` · ctaText: `Get Quote`
- featuresList:
  - Photographer matched to your preferred skill level
  - Filtered and edited photos delivered within 2 weeks
  - High-resolution digital delivery
  - Backup equipment on every shoot
  - Second shooter available for large events

**2. Event Videography** — menu order `20`
- Slug: `event-videography`
- Excerpt: `Cinematic event videography in 1080p`
- shortDescription: `Cinematic 1080p event videography — from documentary coverage to full cinematic productions.`
- pricingInfo: `From $200/hr` · ctaText: `Get Quote`
- featuresList:
  - 1080p video capture with professional audio
  - Highlight reel (2–3 min), filtered and edited, delivered within 2 weeks
  - Full event footage delivered digitally
  - Basic colour grading and basic audio enhancement

**3. DSLR Photobooth** — menu order `30`  ← *featured image: `dslr-photobooth-4x3.jpg`*
- Slug: `dslr-photobooth`
- Excerpt: `Professional DSLR photobooth with instant prints`
- shortDescription: `High-quality DSLR photobooth with instant prints, custom templates, and a dedicated crew.`
- pricingInfo: `From $388` · ctaText: `Get Quote`
- featuresList:
  - Professional DSLR camera with studio lighting
  - Industry standard printer with high-quality, fast printing
  - Unlimited prints (Packages A & B)
  - Range of backdrops for your selection
  - Complimentary props provided
  - Customised graphic designs for photo frame templates
  - Print formats: Strips and 4R with selectable templates
  - Professional media crew on-site (Package A)
  - LCD panel display customisation (Package A)
- Body (`content`): copy the full multi-package description from the
  `fallback-3` entry in `api.ts` (Packages A/B/C details).

---

### Additional Services (`serviceCategory = additional`)

**4. Wedding Photography & Videography** — menu order `40`
- Slug: `wedding-photography-videography`
- Excerpt: `Complete wedding photo and video coverage`
- shortDescription: `Complete wedding coverage from preparations to reception, tailored to your vision.`
- pricingInfo: `Custom packages` · ctaText: `Get Quote`
- featuresList:
  - Full-day coverage (up to 10 hours)
  - Pre-wedding consultation and timeline planning
  - Two photographers + videographer
  - Cinematic highlight film and full ceremony edit
  - Online gallery and USB drive delivery
  - Engagement shoot included

**5. Corporate Photography** — menu order `50`
- Slug: `corporate-photography`
- Excerpt: `Professional headshots and corporate event coverage`
- shortDescription: `Professional headshots, team photos, and corporate event coverage.`
- pricingInfo: `Contact for pricing` · ctaText: `Get Quote`
- featuresList:
  - Individual and team headshots
  - On-location or studio setting
  - Corporate event and conference coverage
  - Office and facility photography
  - Express turnaround available
  - Brand-consistent editing and retouching

**6. Food Photography** — menu order `60`
- Slug: `food-photography`
- Excerpt: `Mouth-watering food photography for menus and marketing`
- shortDescription: `Stunning food photography for menus, websites, and social media campaigns.`
- pricingInfo: `From $400` · ctaText: `Get Quote`
- featuresList:
  - Professional food styling guidance
  - Multiple angles and compositions per dish
  - Natural and studio lighting setups
  - High-resolution images for print and web
  - Social-media-ready crops and formats
  - Flat-lay and lifestyle compositions

**7. Film Production** — menu order `70`
- Slug: `film-production`
- Excerpt: `End-to-end video production for brands and businesses`
- shortDescription: `End-to-end video production — commercials, promos, and branded content.`
- pricingInfo: `Custom quote` · ctaText: `Get Quote`
- featuresList:
  - Pre-production planning and storyboarding
  - Professional crew and cinema-grade equipment
  - Scriptwriting assistance
  - Editing, colour grading, and sound design
  - Motion graphics and titling
  - Delivered in multiple formats and aspect ratios

> Full `content` body text for each service is in the matching `fallback-N`
> entry in `jsquare-frontend/src/lib/wordpress/api.ts` — copy it verbatim.

---

## 4. Verify it works

After creating the CPT + at least one published Service, run this against
`https://backend.jsquarephotography.com/graphql` (WPGraphQL's GraphiQL IDE, or ask Claude to re-probe):

```graphql
{
  services(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      slug
      title
      featuredImage { node { sourceUrl } }
      serviceDetails {
        shortDescription
        serviceCategory
        pricingInfo
        ctaText
        featuresList { featureItem }
      }
    }
  }
}
```

**Pass criteria:**
- `services` returns your nodes (not a "Cannot query field" error)
- `serviceDetails` is **not null** and field names resolve
- `serviceCategory` returns `main` / `additional`

If `services` works but `serviceDetails` is null → the field group's
**Show in GraphQL** toggle or **GraphQL Field Name** is wrong.

---

## 5. Done

Once verified, the homepage "Our Services" section and `/services/[slug]`
pages switch to CMS data automatically. The `FALLBACK_SERVICES` array stays as
a safety net for when WordPress is unreachable.

**Next CMS targets (same pattern):** Team Members CPT, Testimonials CPT, and a
Site Settings options page — see `CMS_INTEGRATION_GUIDE.md` §3–5.
