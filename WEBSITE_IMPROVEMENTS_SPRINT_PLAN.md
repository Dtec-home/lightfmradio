# Light FM Radio — Website Improvements Sprint Plan

> Source: Joshua Mbithi King'oo's "Website Improvement Recommendations" (2026-08-09).
> Grounded against the current codebase (not assumed) — each item below is marked
> **already satisfied**, **partially built**, or **net-new**, so effort isn't wasted
> rebuilding things that exist, and genuinely new work is scoped honestly.

---

## 1. Reality check — what's already there vs. what's new

| Ask | Status | Evidence |
|---|---|---|
| Sticky/always-visible header | ✅ Already satisfied | `components/Navbar.tsx` — `fixed top-0` with backdrop blur, visible on scroll on every page. No work needed. |
| Listen Live / CTA buttons with contrast | ✅ Mostly satisfied | Hero already has "Listen Now" + a second CTA; the recent token-fixing pass made `<Button>` render the true brand red at proper contrast. Just needs the CTA *set* changed (see Sprint 3). |
| Sermons/shows organized by category | ✅ Mostly satisfied | `prisma/schema.prisma`'s `Show` model already has a `category` field; `app/shows/page.tsx:73-76` already filters by it. This is a content/seeding task (are the right topics — prophecy, discipleship, salvation — actually in the data?), not a code task. |
| Testimonies as cards with photos/quotes | ✅ Partially satisfied | `components/NewsCard.tsx` already renders testimony/article cards. A **slider** specifically doesn't exist yet — `embla-carousel-react` is an installed dependency with a working `components/ui/carousel.tsx` wrapper that is currently unused anywhere. |
| Newsletter sign-up | ⚠️ Stub only | `app/news/page.tsx` has a working form UI that shows a success toast, but there is no backend — no database table, no API route, nothing is actually captured. |
| WhatsApp integration | ⚠️ Partial | `app/news/[id]/page.tsx` has a WhatsApp **share** button for articles. There is no WhatsApp **fellowship-group invite** link anywhere. |
| About Us page, Vision/Mission | ❌ Net-new | No `app/about/` route exists. Vision/Mission text currently lives as a 3-card block on the homepage (`app/page.tsx:258-273`) with different wording than what Joshua supplied. |
| Get Involved (prayer requests, giving, volunteering) | ❌ Net-new | No prayer-request form, no giving/donation page anywhere. `app/contact/page.tsx` has a "Give/Support Ministry" *dropdown option* on the general contact form — that's it. |
| Donation transparency ("funds support X") | ❌ Net-new | Nothing exists. |
| English/Kiswahili toggle | ❌ Net-new, large | No i18n library, no translated strings, nothing. This is a materially bigger effort than everything else combined — scoped as its own sprint with a scope decision flagged below. |
| Per-page SEO metadata | ❌ Real gap, worth fixing while we're in here | Every page (`app/page.tsx`, `app/shows/page.tsx`, `app/news/page.tsx`, `app/contact/page.tsx`) is a **Client Component** (`'use client'` at the top). Next.js only allows `export const metadata` in Server Components, so none of these can currently define their own title/description — every page silently inherits the root layout's metadata. Google currently sees the same title/description for the homepage, the shows page, and the contact page. |
| Image compression | ❌ Actively disabled | `next.config.mjs` has `images: { unoptimized: true }` — Next's built-in image optimization (resizing, format conversion, compression) is turned off entirely, not just misconfigured. |

---

## 2. Decisions needed before some tickets can be built (flagging, not assuming)

1. **Hero banner image (Sprint 3):** the current hero uses an abstract animated blob illustration (`components/illustrations/HeroIllustration.tsx`), not a photo. `/public` only has logo files and 6 generic gradient JPGs — no ministry/studio photography exists in the repo. If Joshua wants a real "bold banner image," someone needs to supply a photo (studio, congregation, presenter, etc.); otherwise Sprint 3 will keep the current illustration and just fix the copy/CTAs.
2. **Donation mechanism (Sprint 6):** "Support the Mission" / giving-transparency can be built as an **informational page** (bank/paybill details, current project, a "Support Ministry" contact-form path) without touching payment processing. Building an actual **checkout/payment integration** (M-Pesa, card, etc.) is a materially different, security-sensitive scope that needs an explicit provider decision from the client — this plan builds the informational version and flags real payment integration as a separate, later decision.
3. **Kiswahili scope (Sprint 8):** full bilingual site (every page, every string) vs. a lighter version (key pages only — Home, About, Get Involved). This changes the sprint size by roughly 3-4x. Sprint 8 below scopes the full version but should be confirmed before starting.

---

## 3. Sprint breakdown

### Sprint 1 — Copy pass: Vision, Mission, CTA language
**Files:** `app/page.tsx` only. **No dependencies, safe to run first/standalone.**

- Replace the homepage's "Our Mission" / "Our Vision" card copy (`app/page.tsx:261-273`) with Joshua's supplied text:
  - **Vision:** "To be a beacon of hope through media, shining the light of Christ across nations, transforming lives, and preparing hearts for His soon return."
  - **Mission:** "Light FM Radio exists to proclaim the everlasting gospel through radio and digital platforms, nurturing faith, sharing testimonies, and equipping believers with Bible-centered teachings. By harnessing the power of media, we connect communities, inspire discipleship, and invite all to experience the joy of salvation in Jesus Christ."
  - Keep the middle "Our Method" card as-is (not contradicted by the new copy, adds useful detail) unless Joshua wants a strict 2-card Vision/Mission layout instead of 3 — flag this as a quick confirm, default to keeping 3 cards.
- Pass over button/link labels site-wide for action-driven language per Joshua's examples: "Listen Now" → **"Start Listening"** or keep "Listen Live" (pick one consistently, see Sprint 3), "Give/Support Ministry" dropdown option → keep, add a real **"Support the Mission"** CTA (built in Sprint 3/6), contact form intent options could gain **"Send Prayer Request"** once Sprint 5 lands.

**Acceptance:** homepage renders the new Vision/Mission text; no functional changes, pure copy.

---

### Sprint 2 — Navigation & information architecture
**Files:** `components/Navbar.tsx`, new `app/about/page.tsx`, new `app/about/layout.tsx`, new `app/get-involved/page.tsx`, new `app/get-involved/layout.tsx`. **Blocks Sprint 3 (hero's "Support the Mission" button needs a destination) and Sprint 5 (Get Involved page is where prayer requests/giving live).**

1. Scaffold `app/about/page.tsx` — About Us page: ministry background, the Vision/Mission copy from Sprint 1 (reused, not duplicated — pull from a shared constant), leadership/history if supplied.
2. Scaffold `app/get-involved/page.tsx` — landing page linking out to: prayer request (Sprint 5), WhatsApp Bible study group (Sprint 5), giving/donation transparency (Sprint 6), volunteer info (reuse the existing "I Want to Volunteer" contact-form path or give it its own section).
3. Restructure `components/Navbar.tsx`'s `navItems` array into Joshua's 4-5 categories:
   - **About Us** → `/about` (new)
   - **Listen Live** → not a route, a *player action*: wire this nav item to call `usePlayer()`'s `setIsPlaying(true)` directly (the player context/audio element already exists globally via `context/PlayerContext.tsx`, this just needs a nav trigger instead of only the persistent bottom bar's own play button) and scroll to top if not already home. This makes "Listen Live" a real one-click action, not just a relabeled link.
   - **Teachings & Testimonies** → a dropdown/mega-menu (Radix `navigation-menu.tsx` is already installed and unused — good fit here) with two links: "Teachings" → `/shows`, "Testimonies" → `/news`. Keeps both existing, well-built pages intact rather than merging routes.
   - **Get Involved** → `/get-involved` (new)
   - **Contact** → `/contact` (rename from current "Respond" label, same route)
4. Mobile menu: same restructure, dropdown becomes an expandable sub-list.

**Acceptance:** nav has exactly 5 top-level items matching the above; both new pages exist (can be minimal/placeholder content at this stage, filled in by Sprints 4-6); "Listen Live" actually starts playback from any page.

---

### Sprint 3 — Homepage hero redesign
**Files:** `app/page.tsx`, possibly `components/illustrations/HeroIllustration.tsx`. **Depends on Sprint 2** (the "Support the Mission" button needs `/get-involved` to exist).

1. Swap hero CTAs (`app/page.tsx:107-124`) from "Listen Now" / "Accept Jesus" to **"Listen Live"** (same play-trigger behavior as the new nav item, kept consistent — reuse the same handler) and **"Support the Mission"** (→ `/get-involved`). Keep "Accept Jesus" as a CTA further down the page in the existing Gospel section (`app/page.tsx:~360-390`) rather than deleting it — it's a real, valuable evangelistic CTA, just not one of the two hero buttons Joshua specified.
2. Tighten the hero intro copy to be shorter/more inspiring per the ask — current copy ("Welcome to the no. 1 leading online family christian radio station in east africa.") is functional but flat; replace with 1-2 punchier sentences pulled from the new Mission statement's tone.
3. If a real photo asset is supplied (see Decision #1 above), swap `HeroIllustration` for an `next/image`-based banner; otherwise leave the current animated illustration in place — it's already well-built and token-consistent.

**Acceptance:** hero shows "Listen Live" + "Support the Mission" as the two primary buttons; clicking "Listen Live" actually starts audio playback.

---

### Sprint 4 — Content organization: topics + testimony slider
**Files:** `app/shows/page.tsx`, `app/news/page.tsx` (or a new homepage testimony-slider section in `app/page.tsx`), `prisma/seed.ts`. **No dependency on other sprints, can run in parallel with 2/3.**

1. Audit the actual `category` values currently seeded for shows (`prisma/seed.ts`) against Joshua's suggested topics (prophecy, discipleship, salvation) — this is a data/content task, adjust seed data or give the admin panel's category field a suggested-values list so future entries stay consistent.
2. Build a testimony slider using the already-installed, already-unused `components/ui/carousel.tsx` (Embla-based) — likely placed on the homepage as a rotating highlight of 4-6 featured testimonies (`Article.featured = true` already exists as a schema field, use it), in addition to (not replacing) the full grid on `/news`.

**Acceptance:** homepage has a working testimony carousel using real article data; show categories are confirmed to match the intended topic taxonomy.

---

### Sprint 5 — Community & engagement: prayer requests + WhatsApp fellowship
**Files:** `prisma/schema.prisma` (new `PrayerRequest` model), new `app/api/prayer-request/route.ts`, new section within `app/get-involved/page.tsx` (from Sprint 2), `components/Footer.tsx`. **Depends on Sprint 2** (needs the Get Involved page to exist as a home for this).

1. Add a `PrayerRequest` Prisma model (name, contact info, request text, `isConfidential` boolean, `createdAt`) and a migration.
2. Build a prayer-request form (reuse `react-hook-form` + `zod` + the `Input`/`Textarea`/`Button` primitives already standardized in the recent UI/UX pass) on `/get-involved`, POSTing to a new `app/api/prayer-request` route that writes to the DB (and optionally emails the admin via the existing `nodemailer` dependency already used by `app/api/contact`).
3. Add a basic admin view for submitted prayer requests (mirrors the existing `app/admin/articles`/`app/admin/shows` list pattern) so requests are actually seen by someone, not just written to a database no one reads.
4. Add a WhatsApp Bible-study group invite: a real `wa.me`/WhatsApp group-invite link as a CTA on `/get-involved` and in `components/Footer.tsx` (the footer already has social icons with `aria-label`s from the recent UI/UX pass — add WhatsApp as a 5th, consistent with the existing pattern).

**Acceptance:** submitting a prayer request creates a real database row and is visible in `/admin`; a working WhatsApp group link is reachable from the footer and the Get Involved page.

---

### Sprint 6 — Giving/donation transparency + real newsletter backend
**Files:** `prisma/schema.prisma` (new `NewsletterSubscriber` model, optional `GivingProject` model), new `app/api/newsletter/route.ts`, `app/news/page.tsx` (wire the existing stub to the real endpoint), new section within `app/get-involved/page.tsx`. **Depends on Sprint 2.**

1. **Newsletter — make the existing stub real:** add a `NewsletterSubscriber` model, an `app/api/newsletter` POST route, and wire `app/news/page.tsx`'s already-built form (currently just shows a toast) to actually persist the email. Low effort since the entire UI already exists.
2. **Giving/donation transparency section** on `/get-involved`: per Joshua's example ("Funds currently support PA system purchase for Lionhill SDA Church"), this needs at least one piece of real content — either a static, admin-editable text block for now, or (larger scope) a `GivingProject` model with a title/description/progress field editable from `/admin`, matching the existing Shows/Articles admin pattern. Recommend starting with the admin-editable model since the admin CRUD pattern already exists and is cheap to replicate.
3. Ship the informational giving page (bank/paybill/mobile-money details as static content, or a "Contact us about giving" path reusing the existing contact form's "giving" category) — **explicitly not a payment checkout flow** per Decision #2 above.

**Acceptance:** newsletter signups persist to the database; `/get-involved` shows a real, admin-updatable "here's what your support is funding right now" block.

---

### Sprint 7 — Technical & SEO
**Files:** `next.config.mjs`, new `app/shows/layout.tsx`, `app/news/layout.tsx`, `app/contact/layout.tsx`, `app/about/layout.tsx`, `app/get-involved/layout.tsx` (Server Component wrappers). **Independent, can run anytime, ideally last so it can pick up final copy from Sprints 1-6.**

1. **Fix per-page SEO metadata:** since `app/page.tsx`, `app/shows/page.tsx`, `app/news/page.tsx`, `app/contact/page.tsx` are Client Components and can't export `metadata` directly, add a thin Server Component `layout.tsx` per route segment that exports the page-specific `title`/`description`/`keywords`/Open Graph data and simply renders `{children}`. This is the standard Next.js App Router pattern for this exact situation — no need to convert the pages themselves to Server Components.
2. **Re-enable image optimization:** investigate why `images.unoptimized: true` was set in `next.config.mjs` — most likely because station/article art comes from an external AzuraCast domain not allowlisted. Fix properly via `images.remotePatterns` listing the actual external hosts (check `NEXT_PUBLIC_API_URL`/station art domains in `hooks/useNowPlaying.ts` and `context/PlayerContext.tsx`), then remove `unoptimized: true` so the `next/image` migration from the recent UI/UX pass actually delivers compression/format conversion instead of just acting as a labeled `<img>`.
3. Mobile pass: confirm the persistent player bar and nav (already fixed/safe-area-aware from the recent UI/UX pass) hold up on the new pages (`/about`, `/get-involved`) once built.

**Acceptance:** `view-source` on `/shows`, `/news`, `/contact`, `/about`, `/get-involved` each show distinct `<title>`/meta description; Lighthouse's image-optimization audit passes; `npm run build` clean.

---

### Sprint 8 — English/Kiswahili language toggle (large, scope-confirm first)
**Files:** touches nearly every page — new `next-intl` (or equivalent) setup, `messages/en.json` + `messages/sw.json`, i18n-aware routing (`app/[locale]/...` restructure), a language-switcher component in `components/Navbar.tsx`. **Do this last — depends on all copy from Sprints 1-6 being finalized first, since every string written before this sprint needs a Swahili translation afterward.**

1. Confirm scope per Decision #3 above (full-site vs. key-pages-only).
2. Introduce `next-intl` (standard, well-supported App Router i18n library), restructure routes under a `[locale]` segment (this is the biggest mechanical change — every existing route moves under `app/[locale]/`).
3. Extract all user-facing strings into locale message files; translate to Kiswahili (needs a fluent translator — not something to machine-translate for a ministry's core message without human review, given the theological/cultural sensitivity of the content).
4. Add a language switcher to `components/Navbar.tsx`.

**Acceptance:** every in-scope page renders correctly in both `/en/...` and `/sw/...`, with a working switcher that preserves the current page across the toggle.

---

## 4. Suggested sequencing

```
Sprint 1 (copy, standalone)
Sprint 4 (content org, standalone) ──┐
                                       │
Sprint 2 (nav + new pages, blocking) ─┼──► Sprint 3 (hero) ──► Sprint 7 (SEO/technical, last)
                                       │
                                       ├──► Sprint 5 (prayer + WhatsApp)
                                       └──► Sprint 6 (giving + newsletter)
                                                                    │
                                                                    ▼
                                                    Sprint 8 (i18n — after all copy is final)
```

Sprints 1 and 4 have no dependencies and can start immediately. Sprint 2 is the structural blocker for 3, 5, and 6 (all three need the new routes/nav to exist). Sprint 7 should run last so its metadata pass reflects final copy. Sprint 8 should run last of all, since it translates whatever text exists at that point — running it earlier means re-translating every time copy changes.
