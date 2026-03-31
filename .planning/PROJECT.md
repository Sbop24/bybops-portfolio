# ByBops Portfolio

## What This Is

A personal photography portfolio and client booking site for Sahib Boparai (ByBops). Showcases automotive, portrait, nature, and event photography, enables session bookings via Calendly, and includes a hidden shop for presets and prints.

## Core Value

Clients land on the site and immediately feel the luxury, dark aesthetic — and book a session.

## Requirements

### Validated

- ✓ Design system established — dark luxury tokens (gold, ivory, near-black), Cormorant Garamond display font, Tailwind v4 @theme — Phase 1
- ✓ Sanity schemas defined — photo, workProject, shopItem, about singleton, masonryGallery, featuredWorkSection — Phase 1

### Active

- [ ] Sanity Studio accessible at /studio with singleton sidebar structure
- [ ] All data queries typed and wired (Photo, AboutData, ShopItemData) with placeholder fallbacks
- [ ] Page transitions between routes (fade with AnimatePresence)
- [ ] Fixed navigation: transparent on home hero, solid after scroll / on inner pages
- [ ] Home page complete: HeroSection, FeaturedWork (Sanity data), CarAnimation, AboutSnippet, BookingCTA
- [ ] Gallery page: category rows + slide-in drawer
- [ ] About page: editorial two-column layout with PortableText
- [ ] Booking page: Calendly embed
- [ ] Shop page: hidden product grid (not in nav, accessible via /shop directly)
- [ ] Production build: zero errors, all pages verified

### Out of Scope

- Public shop link in nav — shop exists but hidden until inventory is ready
- @sanity/vision plugin — not installed, do not import
- User authentication — no accounts or logins
- CMS for nav/footer — content is hardcoded

## Context

- Stack: Next.js 16.2.1, React 19, TypeScript 5, Tailwind v4 (CSS @theme only), Framer Motion 12 (LazyMotion/domMax), Sanity v5, Geist + Cormorant Garamond fonts, Vercel deployment
- Aesthetic reference: Audemars Piguet — dark luxury, sparse gold accents, editorial typography
- Brand: "ByBops" (By + Boparai)
- All animated components use `m.div` not `motion.div` (LazyMotion requirement)
- @portabletext/react already installed (v6.0.3) — do NOT reinstall
- Tailwind v4: ALL tokens in @theme block in globals.css — no tailwind.config.ts
- @/* alias maps to ./src/* ONLY — lib/sanity is at src/lib/sanity/

## Constraints

- **Tech stack**: Tailwind v4 — CSS @theme only, no tailwind.config.ts
- **Framer Motion**: LazyMotion with domMax — use m.div not motion.div everywhere
- **Sanity**: No @sanity/vision — do not add to sanity.config.ts
- **Next.js**: Use 'use cache' directive (not cache: 'force-cache') — requires experimental.useCache: true (already set)
- **shadcn**: Must run `npx shadcn@latest init` before any `add` command (Phase 4)
- **21st.dev**: Check for component matches before building from scratch (Phase 4 Nav, Phase 9 ProductCard already identified)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind v4 with @theme CSS | Project was scaffolded with v4 — no config file needed | ✓ Good |
| LazyMotion with domMax | domMax required for drag (FeaturedWork) and useScroll (CarAnimation) | ✓ Good |
| galleryImage → photo schema rename | Cleaner naming, aligns with content model | ✓ Good |
| about as singleton | Only one about page, no list needed in CMS | ✓ Good |
| Shop page hidden from nav | Shop not ready to launch, preserve route for future | — Pending |
| 21st.dev nav component (ali-imam/navbar) | Saves time, matches scroll pattern needed | — Pending |

---
*Last updated: 2026-03-31 after Phase 1 complete*
