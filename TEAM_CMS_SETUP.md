# Team Members CMS Setup (SCF + WPGraphQL)

Step-by-step guide to build the **Team Members** custom post type so the
"Meet Our Team" section pulls from WordPress instead of the hardcoded
fallback — the same pattern already used for Services and About.

> **Status today:** The frontend now calls `getTeamMembers()`
> (`jsquare-frontend/src/lib/wordpress/api.ts`) and passes the result into
> `<TeamSection members={...} />` (`src/app/page.tsx`). If WordPress has no
> `team_member` posts yet (or the query fails), it silently falls back to the
> 3 hardcoded members baked into `TeamSection.tsx`. No further frontend code
> changes are needed — once the CPT exists and is populated, the site
> switches to CMS data automatically.

The frontend queries **exact** names below. They must match or the query
breaks (same as the `services` / `serviceBy` bridge already working).

---

## 0. Prerequisites (verify active)

- **Secure Custom Fields (SCF)** — active
- **WPGraphQL** — active
- **WPGraphQL for ACF** — active

---

## 1. Register the `team_member` Post Type

SCF → **Post Types** → **Add New** (or `functions.php`). Settings:

| Setting | Value |
|---|---|
| Post Type Key | `team_member` |
| Plural / Singular labels | `Team Members` / `Team Member` |
| **Show in GraphQL** | ✅ **Yes** |
| **GraphQL Single Name** | `teamMember` |
| **GraphQL Plural Name** | `teamMembers` |
| Public | Yes (or "Show in UI" = yes if you prefer non-public) |
| Supports | `title`, `thumbnail`, `page-attributes` |
| Menu icon | `dashicons-groups` (optional) |

> `page-attributes` is required — the query sorts by **menu order**
> (`MENU_ORDER`), same as Services.
> `thumbnail` enables the **Featured Image** (this is each member's photo).
> The member's **name** is just the post title — no separate name field.

**Equivalent `functions.php` (if you prefer code):**

```php
add_action('init', function () {
    register_post_type('team_member', [
        'labels' => ['name' => 'Team Members', 'singular_name' => 'Team Member'],
        'public'              => true,
        'show_ui'             => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teamMember',
        'graphql_plural_name' => 'teamMembers',
        'supports'            => ['title', 'thumbnail', 'page-attributes'],
        'menu_icon'           => 'dashicons-groups',
        'has_archive'         => false,
    ]);
});
```

---

## 2. Create the "Team Member Details" Field Group

SCF → **Field Groups** → **Add New**. Name it **Team Member Details**.

**Group settings (bottom of the page):**
- **Show in GraphQL** → ✅ Yes
- **GraphQL Field Name** → `teamMemberDetails`
- **Location** → Post Type **is equal to** `team_member`

**Fields** (GraphQL Field Name on each must match exactly):

| # | Field Label | Field Type | **GraphQL Field Name** | Notes |
|---|---|---|---|---|
| 1 | Role | Text | `role` | e.g. `Founder, Photographer & Videographer` |
| 2 | Short Bio | Textarea | `bio` | One-liner shown on the card |
| 3 | Full Details | Textarea (or WYSIWYG) | `details` | Longer bio shown in the modal. Use a blank line between paragraphs. |
| 4 | Instagram Handle | Text | `instagramHandle` | Just the handle, no `@` or URL — e.g. `jsquarephotographysg` |
| 5 | LinkedIn Handle | Text | `linkedinHandle` | Path after `linkedin.com/`, e.g. `company/j-square-photography` |

All fields optional except **Role**.

---

## 3. Create the Team Member Posts

Team Members → **Add New** for each. Set the **Title** (this is the display
name), **Featured Image**, and the Team Member Details fields.

**Menu Order** controls display order (lower = first).

### 1. Tan Jian Jie — menu order `10`
- Featured Image: upload `jsquare-frontend/public/team-jj.png` to the Media Library
- role: `Founder, Photographer & Videographer`
- bio: `Started J Square with a single camera and a relentless eye for the moment in-between moments — the ones people feel but rarely see`
- details:
  ```
  Jian Jie founded J Square Photography in 2017 with a vision to capture authentic, unscripted moments. With nearly a decade of experience across weddings, corporate events, and commercial shoots, he brings both technical precision and a storyteller's instinct to every project.

  His approach is simple: blend into the background, stay present, and be ready when real emotion surfaces. That philosophy has made him a trusted partner for clients who want images that last beyond the moment.
  ```
- instagramHandle: `jsquarephotographysg`
- linkedinHandle: `company/j-square-photography`

### 2. Ju Kong — menu order `20`
- Featured Image: none currently (card shows initials fallback until a photo is provided)
- role: `Photographer`
- bio: `An eye for detail and a passion for capturing authentic moments`
- details:
  ```
  Ju Kong brings a sharp eye for detail and a calm presence on set that puts subjects at ease. Specialising in event and portrait photography, he has a talent for finding the frame within the chaos of a live event.

  His background in documentary-style shooting means he never misses a candid — every image feels lived-in, never staged.
  ```

### 3. Eliza — menu order `30`
- Featured Image: none currently (card shows initials fallback until a photo is provided)
- role: `Photographer`
- bio: `Bringing creative vision and technical expertise to every shoot`
- details:
  ```
  Eliza's background in fine arts gives her photography a distinctive quality — compositions that feel intentional without ever feeling stiff. She excels in both studio and on-location work, adapting quickly to light and environment.

  Whether it's a corporate headshot or a full event coverage, Eliza delivers images with consistent polish and a creative edge.
  ```

> Add any new hires the same way — no code changes needed, they just appear
> on the site in menu-order.

---

## 4. Verify it works

After creating the CPT + at least one published Team Member, run this
against `https://backend.jsquarephotography.com/graphql` (WPGraphQL's
GraphiQL IDE, or ask Claude to re-probe):

```graphql
{
  teamMembers(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      id
      title
      featuredImage { node { sourceUrl altText } }
      teamMemberDetails {
        role
        bio
        details
        instagramHandle
        linkedinHandle
      }
    }
  }
}
```

**Pass criteria:**
- `teamMembers` returns your nodes (not a "Cannot query field" error)
- `teamMemberDetails` is **not null** and field names resolve

If `teamMembers` works but `teamMemberDetails` is null → the field group's
**Show in GraphQL** toggle or **GraphQL Field Name** is wrong.

---

## 5. Done

Once verified, the homepage "Meet Our Team" section switches to CMS data
automatically — the hardcoded 3-member array in `TeamSection.tsx` stays as a
safety net for when WordPress is unreachable or has no published members yet.

**Next CMS target (same pattern):** Testimonials CPT and the Site Settings
options page — see `CMS_INTEGRATION_GUIDE.md` §3b, §4c–g.
