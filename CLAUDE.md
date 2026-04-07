# CLAUDE.md - Photography Portfolio

## Project Overview

- Owner: Sahib Boparai
- Stack: Next.js 16.2.1 App Router, Tailwind CSS v4, Framer Motion 12, Sanity v5, Cormorant Garamond + Geist fonts
- Purpose: High-end photography portfolio website with Sanity-managed content
- Started: 2026-03-28

## Next.js App Router Rules

- Server Components are the default. Only add `'use client'` when hooks, browser APIs, or animation are required.
- Push data fetching up to Server Components whenever possible.
- Use `async/await` directly in Server Components. Do not fetch page data with `useEffect`.
- Use `next/image` for every image and set `sizes` to match real breakpoints.
- Use page `metadata` exports for SEO.
- Keep Sanity token usage server-side only.

## Sanity Rules

- Use `defineType`, `defineField`, and `defineArrayMember` for schema files.
- Keep GROQ queries in `src/lib/sanity/queries.ts`.
- Project only the fields that components actually need.
- Keep Sanity image references intact and build transformed URLs at render time.
- Use `sanityFetch` with cache metadata instead of `cache: 'no-store'`, unless explicitly debugging.

## Motion Rules

- Any file using Framer Motion components or hooks must start with `'use client'`.
- Keep animation in dedicated Client Components and pass server-fetched data as props.
- Respect `prefers-reduced-motion`.
- Do not reintroduce page-level route fades without runtime verification. The current `PageTransition` is intentionally a no-op because the prior wrapper caused hidden-screen regressions on live navigation.

## Portfolio Image Rules

- Every real photo in Sanity should have alt text.
- Use `next/image` with `object-cover` for consistent framing.
- Mark only a single hero image as `priority` per page.
- Keep placeholder support isolated to fallback paths only.

## Tailwind Rules

- Use Tailwind utilities directly.
- Stay mobile-first.
- Avoid inline style props for standard spacing, color, and typography.

## Git Rules

- Commit after each meaningful unit of work.
- Use `type(scope): description` commit messages.
- Never commit `.env.local`, tokens, or machine-local config.
- Before marking work done or pushing, run the relevant integrity checks and fix failures first.

## Dev Workflow Rules

- For app changes, default to `npm run lint`, `npm run build`, and a route/runtime smoke test.
- Restart the dev server when Sanity schema changes.
- Use local verification before publishing and live verification after deployment.
- Do not brute-force fixes. Verify them.

## Current Live Constraints

- `bybops.ca` still needs browser-level inspection for the site-wide "not fully secure" warning.
- Production may still be serving an older booking-page build.
- Chrome DevTools MCP has been added to the user-level Codex config and requires a Codex restart before use.

## Updates Log

| Date | Change |
| --- | --- |
| 2026-03-28 | CLAUDE.md created. |
| 2026-03-31 | Base portfolio build phases completed: design system, schemas, queries, navigation, homepage, gallery, about, booking, shop, and verification. |
| 2026-04-03 | Sanity and DNS/security follow-up work completed. |
| 2026-04-05 | CMS truthfulness cleanup, token hardening, Sanity image pipeline cleanup, gallery drawer accessibility, and keyboard/reduced-motion polish completed. |
| 2026-04-05 | Integrity workflow tightened: code changes are expected to clear lint, production build, and relevant runtime smoke tests before completion or push. |
| 2026-04-06 | Homepage CMS drift reduced further, explicit content ordering added, singleton/fallback cleanup completed, and local ignore rules hardened. |
| 2026-04-06 | ByBops logo black-screen regression fixed. `PageTransition` is now intentionally a no-op after the previous route wrapper caused hidden-screen behavior on live navigation. |
| 2026-04-06 | Current live priorities are deployment alignment for `bybops.ca`, security-warning diagnosis, and browser-level verification before redesign work. |
| 2026-04-07 | Homepage redesign continuation completed through monitor intro, category flow, testimonials, and booking sequence. Scroll architecture was corrected by removing nested sticky inside GSAP pin and moving initial monitor scale into GSAP state. |
| 2026-04-07 | Realistic monitor shell pass completed: flex-column stand/base layout to prevent clipping, dark-room cinematic styling, and checkpoint handoff captured in HANDOFF_2026-04-07_BREAK.md for pause-safe resume. |
