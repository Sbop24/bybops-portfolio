# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Clients land on the site and immediately feel the luxury, dark aesthetic — and book a session.
**Current focus:** Phase 8: Booking Page

## Current Position

Phase: 8 of 10 (Booking Page)
Plan: 0 of 1 in current phase
Status: Ready to plan
Last activity: 2026-03-31 — Phase 7 complete (About page with two-column layout + PortableText)

Progress: [███████░░░] 70%

## Performance Metrics

**Velocity:**
- Total plans completed: 6
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Design System | 1/1 | — | — |
| 2. Schema + Data Layer | 1/1 | — | — |
| 3. Page Transitions | 1/1 | — | — |
| 4. Navigation | 1/1 | — | — |
| 5. Home Page Completion | 1/1 | — | — |
| 6. Gallery Page | 1/1 | — | — |
| 7. About Page | 1/1 | — | — |

## Accumulated Context

### Decisions

- Phase 1: Tailwind v4 @theme only — no tailwind.config.ts. Token names auto-map: --color-gold → bg-gold, text-gold
- Phase 1: @/* alias maps to ./src/* only — lib/sanity moved to src/lib/sanity/
- Phase 1: domMax required (not domAnimation) — fixes drag + useScroll
- Phase 1: galleryImage.ts deleted, replaced by photo.ts
- Phase 1: about.ts is a singleton with __experimental_actions
- Phase 6: Gallery uses server component page → GalleryClient ('use client') → CategoryRow + GalleryDrawer
- Phase 6: Drawer uses spring animation (damping 30, stiffness 300), Escape key + backdrop close
- Phase 6: scrollbar-hide CSS utility added to globals.css
- Phase 6: getPhotosByCategory() falls back to PLACEHOLDER_GALLERY when Sanity is empty
- Phase 7: AboutContent uses PortableTextBlock cast for body type safety
- Phase 7: Sticky image uses lg:top-28 to clear fixed nav + portfolio pt-20

### Pending Todos

None.

### Blockers/Concerns

- shadcn init complete (Phase 4) — button.tsx, components.json, tw-animate-css added
- NEXT_PUBLIC_CALENDLY_URL must be set in .env.local before Phase 8

## Session Continuity

Last session: 2026-03-31
Stopped at: Phase 7 complete — About page with two-column editorial layout, PortableText, scroll reveals
Resume file: None
