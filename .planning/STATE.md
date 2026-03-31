# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Clients land on the site and immediately feel the luxury, dark aesthetic — and book a session.
**Current focus:** Phase 2: Schema + Data Layer

## Current Position

Phase: 2 of 10 (Schema + Data Layer)
Plan: 0 of 2 in current phase
Status: Ready to plan
Last activity: 2026-03-31 — Phase 1 complete (design system, schemas, lib path, domMax, useCache, cn())

Progress: [█░░░░░░░░░] 10%

## Performance Metrics

**Velocity:**
- Total plans completed: 1
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Design System | 1/1 | — | — |

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

- shadcn init must run before Phase 4 nav install (not a blocker yet)
- NEXT_PUBLIC_CALENDLY_URL must be set in .env.local before Phase 8

## Session Continuity

Last session: 2026-03-31
Stopped at: Phase 1 complete — 6 commits on master, build passes clean
Resume file: None
