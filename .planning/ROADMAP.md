# Roadmap: ByBops Portfolio

## Overview

Ten-phase build of a dark-luxury photography portfolio. Starts with design system and CMS foundations, adds navigation and page transitions, completes all content pages (gallery, about, booking, shop), and ends with a full production verification pass.

## Phases

- [x] **Phase 1: Design System + Infrastructure** - Tailwind tokens, Cormorant font, domMax, useCache, cn(), lib path, schema prep
- [ ] **Phase 2: Schema + Data Layer** - sanity.config.ts singleton structure, queries.ts rewrite, /studio route
- [ ] **Phase 3: Page Transitions** - AnimatePresence fade between routes
- [ ] **Phase 4: Navigation** - Transparent-to-solid fixed nav via 21st.dev component
- [ ] **Phase 5: Home Page Completion** - CarAnimation, BookingCTA, wire Sanity data to FeaturedWork
- [ ] **Phase 6: Gallery Page** - Category rows + slide-in drawer
- [ ] **Phase 7: About Page** - Editorial two-column layout with PortableText
- [ ] **Phase 8: Booking Page** - Calendly embed
- [ ] **Phase 9: Shop Page (Hidden)** - Product grid via 21st.dev card, hidden from nav
- [ ] **Phase 10: Final Build + Full Verification** - Production build, all pages verified, mobile check

## Phase Details

### Phase 1: Design System + Infrastructure
**Goal**: Establish the complete design foundation — tokens, fonts, motion setup, path aliases, and schema prep so every subsequent phase builds on a stable base
**Depends on**: Nothing (first phase)
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. Build passes with zero TypeScript errors
  2. Gold/ivory palette visible on home page
  3. Cormorant Garamond renders on hero headline
  4. No console errors on first load
**Plans**: 1 plan

Plans:
- [x] 01-01: Design system tokens, fonts, motion, lib path, schemas

---

### Phase 2: Schema + Data Layer
**Goal**: Wire the full CMS — singleton sidebar in Sanity Studio, typed GROQ queries with placeholder fallbacks, and the /studio route accessible in development
**Depends on**: Phase 1
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. `npm run build` passes with zero TypeScript errors
  2. `/studio` loads in browser and shows Sanity Studio
  3. About, Featured Work, Gallery singletons appear as pinned items in Studio sidebar
  4. All query functions (getFeaturedPhotos, getAbout, getShopItems, getPhotosByCategory) are exported and typed
  5. Placeholder fallback data renders when Sanity returns empty
**Plans**: 1 plan

Plans:
- [ ] 02-01: Singleton sidebar structure, typed queries with fallbacks, /studio route

---

### Phase 3: Page Transitions
**Goal**: Smooth fade transitions between all routes using AnimatePresence in the root layout
**Depends on**: Phase 2
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. Navigating between pages fades out/in — no flash or jump
  2. No hydration errors in console
**Plans**: 1 plan

Plans:
- [ ] 03-01: PageTransition component + layout integration

---

### Phase 4: Navigation
**Goal**: Fixed navigation bar that is transparent over the home hero and becomes solid on scroll or on any inner page
**Depends on**: Phase 3
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. Nav is transparent at top of home page
  2. Nav becomes solid (bg-base) after scrolling 60px
  3. Nav is always solid on /gallery, /about, /booking
  4. Mobile hamburger opens and closes menu
  5. Shop link is NOT in nav
**Plans**: 1 plan

Plans:
- [ ] 04-01: shadcn init + 21st.dev navbar install + customization

---

### Phase 5: Home Page Completion
**Goal**: Complete the home page with CarAnimation, BookingCTA, and live Sanity data feeding FeaturedWork
**Depends on**: Phase 4
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. CarAnimation visible and parallax scrolls on home page
  2. BookingCTA section renders with gold-bordered button linking to /booking
  3. FeaturedWork receives real photos from Sanity (or placeholder fallback)
**Plans**: 1 plan

Plans:
- [ ] 05-01: CarAnimation, BookingCTA, page.tsx Sanity wiring

---

### Phase 6: Gallery Page
**Goal**: Gallery page with four category rows, each opening a full-screen slide-in drawer with the category's photos
**Depends on**: Phase 5
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. /gallery shows 4 category rows (Automotive, Portrait, Nature, Event)
  2. Clicking a row opens the slide-in drawer
  3. Drawer animates in from right, closes on backdrop or X click
  4. Loading and error states handled
**Plans**: 1 plan

Plans:
- [ ] 06-01: CategoryRow, GalleryDrawer, gallery page + loading/error states

---

### Phase 7: About Page
**Goal**: Editorial about page with two-column layout — sticky profile image left, PortableText content right, scroll-triggered reveals
**Depends on**: Phase 6
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. /about renders with two-column editorial layout on desktop
  2. Text blocks reveal on scroll
  3. Falls back to lorem ipsum if Sanity returns empty
**Plans**: 1 plan

Plans:
- [ ] 07-01: AboutContent component + about page

---

### Phase 8: Booking Page
**Goal**: Booking page with Calendly widget embedded via Next.js Script
**Depends on**: Phase 7
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. /booking loads without errors
  2. Calendly widget area renders (uses NEXT_PUBLIC_CALENDLY_URL env var)
**Plans**: 1 plan

Plans:
- [ ] 08-01: CalendlyWidget component + booking page

---

### Phase 9: Shop Page (Hidden)
**Goal**: Hidden shop page at /shop with product grid — not linked from nav or anywhere in the site
**Depends on**: Phase 8
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. /shop is accessible directly by URL
  2. Product grid renders with filter tabs (All / Presets / Prints)
  3. Unavailable products are greyed out
  4. Shop does NOT appear in nav on any page
**Plans**: 1 plan

Plans:
- [ ] 09-01: ProductCard, ShopFilter, shop page

---

### Phase 10: Final Build + Full Verification
**Goal**: Clean production build with all 6 routes verified, mobile tested, and full checklist passed
**Depends on**: Phase 9
**Requirements**: []
**Success Criteria** (what must be TRUE):
  1. `npm run build` produces zero errors and zero TypeScript errors
  2. All 6 pages reachable: /, /gallery, /about, /booking, /shop, /studio
  3. Mobile (375px): nav hamburger works, all pages readable
  4. Gold accent visible on CTAs and hover states
  5. All animated components use m.div not motion.div
**Plans**: 1 plan

Plans:
- [ ] 10-01: Final build, playwright full verification, mobile check

## Progress

**Execution Order:**
Phases execute in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System + Infrastructure | 1/1 | Complete | 2026-03-31 |
| 2. Schema + Data Layer | 0/1 | Not started | - |
| 3. Page Transitions | 0/1 | Not started | - |
| 4. Navigation | 0/1 | Not started | - |
| 5. Home Page Completion | 0/1 | Not started | - |
| 6. Gallery Page | 0/1 | Not started | - |
| 7. About Page | 0/1 | Not started | - |
| 8. Booking Page | 0/1 | Not started | - |
| 9. Shop Page (Hidden) | 0/1 | Not started | - |
| 10. Final Build + Full Verification | 0/1 | Not started | - |
