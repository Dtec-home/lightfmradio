# Light FM Radio — UI/UX Handbook Audit & Sprint Plan

> Audited against `~/Music/UI_UX_HANDBOOK.md` by reading the actual implementation (not docs).
> Stack found: Next.js 16 (App Router) + Tailwind v4 + shadcn/ui (new-york, Radix primitives) +
> framer-motion + next-themes. This is exactly the handbook's reference stack — the gaps are in
> **discipline** (tokens not tuned, Layer 2 abandoned by Layer 3), not tooling choice.

---

## 1. Audit findings

Findings are grouped by handbook section, each with **file:line evidence** and a verdict.

### Part I — Visual system

| § | Rule | Verdict | Evidence |
|---|---|---|---|
| 3.1 | Colors authored in OKLCH | ❌ FAIL | `app/globals.css:8-97` — every token is hex (`#eae3d5`, `#be1821`, …). `styles/globals.css` (a second, **unused, dead** copy — not imported anywhere, confirmed via grep) is also hex. |
| 3.2 | Brand-tinted, soft, low-opacity shadows | ❌ FAIL | No `--shadow-*` tokens exist anywhere in `app/globals.css`. Components that reference `shadow-xs`/`shadow-md`/`shadow-lg` (e.g. `button.tsx:16`, `dialog.tsx`) fall back to Tailwind's flat default black shadow. |
| 3.3 | One `--radius`, rest derived | ✅ PASS | `app/globals.css:47,130-133` — single `--radius: 0.625rem` with `radius-sm/md/lg/xl` via `calc()`. |
| 3.4 | Tight tracking + a real, *loaded* display font | ⚠️ PARTIAL | Fonts are loaded correctly via `next/font` (`app/layout.tsx:2,8-11`) — the handbook's "declared but not loaded" bug is **avoided**. But there is no `--tracking-normal` anywhere and no `letter-spacing` on `body` (`app/globals.css:144-152`) — the tightened-tracking rule is simply absent. |
| 3.5 | Semantic roles, used sparingly, one CTA color | ❌ FAIL (systemic) | The `primary` token is **not used as a CTA color anywhere**. It's used as a neutral section-background wash: `<section className="py-24 bg-primary">` (`app/page.tsx:188,301`, `app/news/page.tsx:141`, `app/shows/page.tsx:139`, `app/contact/page.tsx:319`, `components/Footer.tsx:8`) and as form-input backgrounds (`app/contact/page.tsx:219-284`). Every real CTA in the product instead hand-codes `bg-accent` (18+ occurrences across `app/page.tsx`, `app/news/*`, `app/shows/*`, `app/contact/page.tsx`, `app/admin/**`, `components/Player.tsx`, `components/ShowCard.tsx`). Meanwhile `components/ui/button.tsx:12` still defines the shadcn `default` variant as `bg-primary` — so the actual `<Button>` component would render the wrong (beige/near-invisible) color if anyone used it. Nobody does (see §4.7 below), which is *why* nobody has noticed. In dark mode this is worse: `--primary: #1a202c` is **byte-identical** to `--card: #1a202c` (`app/globals.css:66,70`) — a primary surface/button would be invisible against a card. |
| 3.6 | States via `color-mix`/opacity of existing tokens | ⚠️ PARTIAL | Mostly fine — hover/active states use Tailwind opacity modifiers (`bg-accent/90`, `bg-accent/10`, etc.), which satisfies the spirit of the rule. But there are direct token violations: `components/NewsCard.tsx:24` (`whileHover={{ borderColor: '#F5A623' }}` — invented raw hex, not a token), `components/ShowCard.tsx:39` (hand-written `rgba(245,166,35,...)` gradient), and `components/Player.tsx:32` (`bg-red-500` for the LIVE badge — a raw Tailwind palette color instead of `bg-destructive`/`bg-accent`). |

### Part I — Composition rules (§4)

| # | Rule | Verdict | Evidence |
|---|---|---|---|
| 4.3 | Cards as the default container | ❌ FAIL | `components/ui/card.tsx` has **zero imports** anywhere in `app/` or `components/` outside itself. Every "card" (newsletter box, contact info box, article/show cards) is a hand-rolled `<div className="bg-card border border-border rounded-lg p-8 ...">`, with radius drifting between `rounded-lg`, `rounded-xl`, `rounded-2xl` depending on file. |
| 4.5 | Animation CSS-first, fast (100–200ms), subtle | ❌ FAIL | `framer-motion` (`motion.`) is used in 12 files for nearly *all* animation, including simple fades/slides that `tw-animate-css` (already a dependency) could handle in CSS. Durations are frequently 500–800ms (`Player.tsx:15` `duration:0.5`, `page.tsx` hero `duration:0.8`), well above the 100–200ms guidance for UI micro-interactions. The `animate-in`/`fade-in`/`zoom-in` utilities are only reachable today because Radix primitives (`select.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, …) use them internally — but those primitives are barely used in the actual pages either. |
| 4.6 | Empty / loading / error states as first-class | ❌ FAIL | No `loading.tsx`, `error.tsx`, or `not-found.tsx` anywhere under `app/` (confirmed via `find`). `app/news/page.tsx:43,53,55` tracks a `loading` boolean but **never renders it** — no skeleton, no spinner; `components/ui/skeleton.tsx` has zero real usage. Fetch failures are silently swallowed (`.catch(() => setLoading(false))`) with no user-visible error state. Only the "no results" empty state (`app/news/page.tsx:126-136`) is actually designed. |
| 4.7 | Variants over one-off classes | ❌ FAIL (systemic) | `Button`/`Card` are effectively dead components at the product level (only consumed internally by other shadcn primitives like `calendar.tsx`, `sidebar.tsx`, `carousel.tsx` — never by a page or feature component). Every button in `app/page.tsx`, `app/news/**`, `app/shows/**`, `app/contact/page.tsx`, `app/admin/**`, `components/Player.tsx`, `components/ShowCard.tsx`, `components/Footer.tsx` is a hand-copied Tailwind class string, so padding/radius/hover treatment silently drift between files instead of living in one variant table. |
| 4.8 | Visible focus ring on every interactive element | ❌ FAIL | Form inputs strip the native outline and replace it with only a border-color change: `focus:outline-none focus:border-accent` (`app/contact/page.tsx:219,234,249,262,284`, `app/news/page.tsx:159`) — no ring, no offset, likely under WCAG 2.4.11's minimum focus-appearance area. Icon-only controls (play/pause, mute, mobile nav toggle) have no `aria-label` at all (see §12 below), so focus is visually present but not announced. |
| 4.9 | Dark mode complete and non-negotiable | ❌ FAIL | `app/layout.tsx:103` — `<ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" ...>`. Dark mode is **forced off**; there is no theme toggle anywhere in the UI (`grep` for `ThemeToggle`/`setTheme` outside `next-themes` internals returns nothing). All `.dark` tokens in `app/globals.css:63-98` are dead code today, and (per §3.5 above) contain an actual bug — primary/card collision — that would surface the moment dark mode is ever turned on. |

### Part II — Design discipline

| § | Rule | Verdict | Evidence |
|---|---|---|---|
| 12 | Accessible names on controls (WCAG 4.1.2) | ❌ FAIL | Zero `aria-label` in any product page/component — the only 4 occurrences in the whole repo are inside unused `ui/` primitives (`spinner.tsx`, `breadcrumb.tsx`, `pagination.tsx`, `sidebar.tsx`). Concretely broken: play/pause button (`components/Player.tsx:60-71`), mute button (`components/Player.tsx:76-82`), volume slider (`components/Player.tsx:83-90`, no label), mobile nav toggle (`components/Navbar.tsx:49-54`, no `aria-label`, no `aria-expanded`/`aria-controls` despite controlling a disclosure). |
| 12 | Respect `prefers-reduced-motion` | ❌ FAIL | `grep` for `prefers-reduced-motion`/`useReducedMotion` returns nothing, despite framer-motion (which ships `useReducedMotion()` for free) driving animation on every page. |
| 12 | Form validation / `aria-invalid` | ❌ FAIL | `react-hook-form`, `zod`, and `@hookform/resolvers` are installed dependencies but the contact form (`app/contact/page.tsx`) is hand-rolled with raw `useState`/`<input>` — no validation states, no `aria-invalid`, no inline errors. The form-building tools the stack already paid for are unused. |
| 13 | Safe areas on fixed UI | ❌ FAIL | The persistent player bar is `fixed bottom-6 ...` (`components/Player.tsx:12`) with no `env(safe-area-inset-bottom)` handling — on notched/gesture-nav phones it can sit under or flush against the home indicator. |
| 13 | Touch targets ≥ 44/48px | ⚠️ PARTIAL | Large CTAs (`px-8 py-4`) clear the bar. The mobile nav toggle (`components/Navbar.tsx:49-54`, `p-2` + 24px icon ≈ 32px total) does not. |
| 13 | `next/image` for real-world perf | ❌ FAIL | Every image in the product (`Navbar`, `Footer`, `Player`, `RecentlyPlayed`, `UpNext`, hero illustration, `app/page.tsx`) is a raw `<img>`; `next/image` is imported nowhere. No layout-shift protection, no automatic optimization/lazy-loading. |
| 14 | Automated accessibility/visual-regression gate | ❌ FAIL | `package.json` has no axe-core/Pa11y/Lighthouse-CI and no Playwright/Chromatic visual-snapshot tooling — nothing in CI would catch any of the above regressing further. |

### What's already solid (keep doing this)

- Font loading is done correctly via `next/font` — avoids the handbook's #1 named bug (§3.4).
- Radius system is a proper single-knob token (§3.3).
- Hover/active states mostly use opacity-of-token, not invented colors (§3.6) — a few exceptions noted above.
- Radix primitives are in place and correctly used *within* `components/ui/` for the handful of times the app reaches for them (dialogs, accordions on the FAQ, etc.) — the accessibility infrastructure exists, it's just not wired to the product surfaces that need it most (Player, Navbar, forms).
- `react-hook-form` + `zod` + `@hookform/resolvers` are already installed — Sprint 3 is "wire it up," not "add a new dependency."

---

## 2. Root cause

One thread explains most of the failures: **Layer 3 (composition) stopped reading from Layer 2/1 and started hand-rolling styles.** `Button` and `Card` exist, are correctly built, and are simply never imported by a real page. Once that happened, every CTA, form field, and section wrapper became a one-off Tailwind string, which is also why the token system was never pressured into shape (no shadow tokens, no tracking, hex instead of OKLCH, primary/accent swapped) — nothing was actually *reading* the tokens that would have forced the issue.

**Fix order matters:** tune Layer 1 (tokens) before touching Layer 2/3, otherwise every component gets re-themed twice.

---

## 3. Sprint breakdown (for agent execution)

Each ticket is scoped to specific files so independent agents can run them with minimal collision. **Sprint 1 is a hard dependency for everything else** — run it first, alone. Sprints 2–4 can run in parallel across different agents once Sprint 1 lands (they touch disjoint files). Sprint 5 depends on Sprint 2 (needs `Button`/`Card` in place first). Sprint 6 is independent and can run anytime.

### Sprint 1 — Token foundation (Layer 1) · blocks all other sprints
**Files:** `app/globals.css`, `app/layout.tsx`, `components/theme-provider.tsx`. Delete: `styles/globals.css`.

1. **Convert the palette to OKLCH.** Keep the existing brand hues (Thunderbird red `#be1821`, Potters Clay `#8e6a30`, White Rock `#eae3d5`, Indian Khaki `#bcac8c`, navy `#1a2040`) — just re-author them as `oklch()` values (use oklch.com or tweakcn to convert, don't eyeball it) so tints/shades stay balanced.
2. **Fix the primary/accent inversion.** Re-map so `--primary` *is* the vivid brand red (what's currently `--accent`), and move today's beige `White Rock` role to `--muted`/a new `--surface` role for section washes. This makes `components/ui/button.tsx`'s `default` variant (`bg-primary`) finally match what every page already visually wants, and is the smallest possible change since Layer 3 already treats red as the CTA color everywhere.
3. **Add brand-tinted shadow tokens** (`--shadow-color`, `--shadow-sm/md/lg`) per §3.2, tuned to the red brand hue at 0.04–0.08 opacity, ~30px blur. Add the darker/deeper dark-mode variant.
4. **Add `--tracking-normal: -0.015em`** and apply via `body { letter-spacing: var(--tracking-normal); }`.
5. **Fix the dark-mode primary/card collision** (`--primary` currently equals `--card` exactly) — give dark-mode primary its own lighter value per the handbook's `.dark` example.
6. **Decide dark mode's fate and act on it**: the infrastructure (`next-themes`, full `.dark` token set) already exists. Recommendation: turn it on — remove `forcedTheme="light"` from `app/layout.tsx:103`, ship a real toggle in Sprint 2. If the team instead wants light-only by design, do the opposite: delete the `.dark` block and the `next-themes` dependency entirely rather than leaving dead, buggy code in place.
7. **Delete `styles/globals.css`** — confirmed dead (not imported anywhere); keep only `app/globals.css` as the single source of truth.

**Acceptance:** `npm run build` succeeds; `/12-point checklist` in the handbook §7 passes for OKLCH, shadows, radius, tracking; no other files touched.

---

### Sprint 2 — Component-layer consolidation (Layer 2 → Layer 3 discipline)
**Depends on:** Sprint 1. **Can run in parallel with Sprints 3–4** once Sprint 1 lands (touches a disjoint file set from those, aside from shared imports).

Split into per-surface tickets so multiple agents can work without file collisions:

- **2a — Chrome:** `components/Navbar.tsx`, `components/Player.tsx`, `components/Footer.tsx`. Replace hand-rolled buttons with `<Button variant="..." size="icon">` (play/pause, mute, mobile nav toggle, social links). This also fixes the sub-44px mobile nav touch target for free (use `size="icon"` not a bespoke `p-2`).
- **2b — Marketing pages:** `app/page.tsx`, `app/shows/page.tsx`, `app/shows/[id]/page.tsx`, `app/news/page.tsx`, `app/news/[id]/page.tsx`. Replace every hand-coded `className="px-8 py-4 bg-accent ..."` CTA with `<Button size="lg">`; replace hand-rolled `bg-card border rounded-lg p-8` boxes (newsletter box, etc.) with `<Card>`.
- **2c — Forms:** `app/contact/page.tsx`, `app/admin/**`. Replace raw `<input>`/`<textarea>`/`<button>` with `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/button.tsx` (this also sets up Sprint 3's validation work).
- **2d — Cards:** `components/ShowCard.tsx`, `components/NewsCard.tsx`. Rebuild on `<Card>` primitives; remove the raw `rgba()` gradient and the raw `#F5A623` hover color (both flagged in the audit) in favor of token classes (`from-accent/10`, `hover:border-accent`).

**Acceptance:** zero hand-written `bg-accent`/`bg-primary` button className strings remain outside `components/ui/`; `grep -rn "from '@/components/ui/button'"` and `.../card'` show real usage across `app/` and feature components.

---

### Sprint 3 — Accessibility pass
**Depends on:** Sprint 1 (tokens for focus rings). **Independent of Sprint 2** (can run in parallel), though re-run a quick pass after 2a/2c land since `<Button>`/`<Input>` already carry correct `focus-visible` styles for free.

1. `aria-label` on every icon-only control: play/pause (`Player.tsx`), mute (`Player.tsx`), mobile nav toggle (`Navbar.tsx`) — plus `aria-expanded`/`aria-controls` on the toggle for the disclosure it drives.
2. Fix input focus states: stop stripping `outline-none` and replacing it with a border-only change (`app/contact/page.tsx:219-284`, `app/news/page.tsx:159`) — once Sprint 2c moves these onto `components/ui/input.tsx`, this is inherited automatically (it already ships `focus-visible:ring-ring/50 focus-visible:ring-[3px]`); if run before 2c, add the ring utility directly.
3. Wire `react-hook-form` + `zod` (already installed, currently unused) into the contact form for real validation, inline error messages, and `aria-invalid` states.
4. Add `prefers-reduced-motion` handling: use framer-motion's `useReducedMotion()` hook (no new dependency) to drop/shorten transitions across the 12 files currently animating unconditionally.

**Acceptance:** run axe DevTools or Lighthouse against `/`, `/shows`, `/news`, `/contact` — zero critical a11y issues; every icon button has an accessible name; reduced-motion OS setting visibly changes animation behavior.

---

### Sprint 4 — State coverage (empty/loading/error)
**Depends on:** Sprint 1 only. **Independent of Sprints 2–3.**

1. Add `app/shows/loading.tsx`, `app/news/loading.tsx`, `app/contact/loading.tsx` using `components/ui/skeleton.tsx` (currently zero real usage).
2. Wire the already-tracked-but-unrendered `loading` state in `app/news/page.tsx:43` (and the equivalent in `app/shows/page.tsx`) to actually show skeleton cards instead of silently rendering nothing.
3. Add visible error UI for fetch failures — today `.catch(() => setLoading(false))` in `app/news/page.tsx:55` swallows errors with zero user feedback. Same pattern likely exists in `app/shows/page.tsx` and `hooks/useNowPlaying.ts` consumers — audit and fix.
4. Add `app/not-found.tsx` (none exists today).
5. Decide and act on the newsletter subscribe button (`app/news/page.tsx:161-167`) — it currently has no `onClick`/submit handler. Either wire it to a real endpoint or remove it; a dead-looking-live CTA is a Nielsen heuristic-9 violation (no error recovery because there's no feedback at all).

**Acceptance:** throttle network to "Slow 3G" in devtools on `/shows` and `/news` — skeletons visibly render before content; killing the `/api/articles` route (temporarily) shows a real error state, not a blank grid.

---

### Sprint 5 — Motion & token-compliance cleanup
**Depends on:** Sprint 2 (needs `Button`/`Card` landed so migrated markup doesn't get rewritten twice).

1. Migrate simple mount fades/slides (opacity/translate-only, no stagger) from `framer-motion` to `tw-animate-css` utilities (`animate-in fade-in slide-in-from-bottom-4`, etc.) per §4.5 — reserve framer-motion for the genuinely staggered/complex sequences (e.g. the home page's staggered grid reveals are a legitimate keep).
2. Tighten micro-interaction durations (hover/tap scale on buttons) toward 100–200ms; leave page-level reveal transitions as a deliberate, slower exception if desired, but make it a decision, not a default.
3. Replace remaining raw colors flagged in the audit: `bg-red-500` LIVE badge (`components/Player.tsx:32`) → `bg-destructive` or `bg-accent`; confirm no other raw Tailwind palette or hex colors remain (`grep -rnE "#[0-9a-fA-F]{3,8}|rgb\(|rgba\(" app components` should return nothing outside `components/ui/` and config files).
4. Swap raw `<img>` for `next/image` in `Navbar.tsx`, `Footer.tsx`, `Player.tsx`, `RecentlyPlayed.tsx`, `UpNext.tsx`, `HeroIllustration.tsx`, `app/page.tsx` — set explicit dimensions to kill layout shift.

**Acceptance:** Lighthouse performance score improves (image optimization); no raw hex/rgb colors outside `components/ui/`; `grep -c "motion\."` count per file drops for simple-fade cases.

---

### Sprint 6 — Mobile & safe areas
**Depends on:** Sprint 1 only. **Independent**, can run anytime, small/quick.

1. Add `env(safe-area-inset-bottom)` padding to the fixed player bar (`components/Player.tsx:12`) and any fixed mobile nav elements.
2. Confirm/fix `type="email"` on the contact-form email field and newsletter input for correct mobile keyboards (currently generic — verify `app/contact/page.tsx` and `app/news/page.tsx:157` inputs use proper `type`).
3. Re-verify touch targets site-wide ≥44px after Sprint 2a's `Button size="icon"` migration closes the mobile-nav-toggle gap.

**Acceptance:** test on an actual iOS device (or simulator) with the app added to home screen — player bar clears the home indicator; email fields bring up the `@`-optimized keyboard.

---

### Sprint 7 — Verification gate (ongoing, do last)
**Depends on:** Sprints 1–6 substantially complete (otherwise the gate fails immediately on pre-existing debt).

1. Add an automated accessibility check to CI — `@axe-core/playwright` or `pa11y-ci` against the key routes (`/`, `/shows`, `/news`, `/contact`).
2. Add a minimal Playwright visual-snapshot baseline for the same routes, in both themes if dark mode was enabled in Sprint 1.
3. Wire both into a `npm run` script and a CI job so future PRs regress loudly instead of silently (this closes the §14 "Regression" gate the handbook calls out as a real acceptance criterion, not just a nice-to-have).

**Acceptance:** CI fails on an intentionally reintroduced `aria-label` removal or a 5px layout shift, proving the gate actually catches regressions.

---

## 4. Suggested sequencing for agents

```
Sprint 1 (solo agent, blocking)
        │
        ├── Sprint 2 (4 sub-agents: 2a/2b/2c/2d, can run parallel to each other)
        ├── Sprint 3 (1 agent, parallel to Sprint 2)
        ├── Sprint 4 (1 agent, parallel to Sprint 2/3)
        └── Sprint 6 (1 agent, parallel to everything)
                │
                └── Sprint 5 (1 agent, after Sprint 2 lands)
                        │
                        └── Sprint 7 (1 agent, after everything lands)
```
