# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Clients land on the site and immediately feel the luxury, dark aesthetic — and book a session.
**Current focus:** Phase 6: Gallery Page

## Current Position

Phase: 6 of 10 (Gallery Page)
Plan: 0 of 1 in current phase
Status: Ready to plan
Last activity: 2026-03-31 — Phase 5 complete (CarAnimation, BookingCTA, Sanity data wiring)

Progress: [█████░░░░░] 50%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
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

## Accumulated Context

### Decisions

- Phase 1: Tailwind v4 @theme only — no tailwind.config.ts. Token names auto-map: --color-gold → bg-gold, text-gold
- Phase 1: @/* alias maps to ./src/* only — lib/sanity moved to src/lib/sanity/
- Phase 1: domMax required (not domAnimation) — fixes drag + useScroll
- Phase 1: galleryImage.ts deleted, replaced by photo.ts
- Phase 1: about.ts is a singleton with __experimental_actions

### Pending Todos

None.

### Blockers/Concerns

- shadcn init complete (Phase 4) — button.tsx, components.json, tw-animate-css added
- NEXT_PUBLIC_CALENDLY_URL must be set in .env.local before Phase 8

## Session Continuity

Last session: 2026-03-31
Stopped at: Phase 5 complete — CarAnimation, BookingCTA, Sanity wiring, build passes clean
Resume file: None
