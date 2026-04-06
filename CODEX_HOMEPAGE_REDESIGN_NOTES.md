# Codex Homepage Redesign Notes

## Locked Decisions

- Brand: `ByBops`
- Tone: premium, interactive, tech-forward, cinematic
- Hero headline: `More Than a Still Frame`
- Hero subheadline: `A cinematic photography experience designed to move with you.`
- Hero CTA: `Explore the Motion`
- Booking heading: `Bring the Vision Into Frame`
- Booking button: `Book a Session`
- Homepage flow:
  1. monitor/device intro
  2. Cars reveal
  3. Nature reveal
  4. Couples reveal
  5. Event reveal
  6. 3 testimonials one by one
  7. booking CTA
- Motion scope:
  - desktop: strong cinematic sequence across the page
  - mobile: simplified version of the same story
  - reduced motion: accessible non-pinned fallback
- Category image source: real CMS-backed category photos
- Testimonial source: code placeholders in v1
- About section: removed from homepage in v1
- HUD direction: hybrid premium HUD with game-inspired cues, not full gimmick game UI

## Reconciled Recommendations

- Keep the server/client split recommended in the repo note, but use `getPhotosByCategory()` instead of `getFeaturedPhotos()` for the category sequence.
- Keep scroll logic inside `HomepageClient` only. Do not move it into layout, `MotionProvider`, or `PageTransition`.
- Keep the hero CTA as an in-page progression control and the booking CTA as the hard conversion action to `/booking`.
- Use the existing Framer `useReducedMotion` hook already used across the repo instead of introducing a parallel custom hook unless a concrete limitation appears during implementation.
- Preserve the current ByBops palette in `src/app/globals.css` as the only color source of truth.

## Mistakes and Lessons Learned

- Do not treat "cinematic editorial" as a generic vibe label when the user is actually referring to a specific video workflow.
- Do not assume concept tools like Stitch can solve complex motion architecture; use them for visual direction, not as the source of truth for interaction-heavy builds.
- Lock the actual scroll story early:
  - where the intro starts
  - what the monitor shows
  - the exact category order
  - how testimonials enter
  - what the CTA does
- Check repo truth before accepting recommendation docs at face value:
  - `altText` was already in the Sanity contract
  - Framer `useReducedMotion` was already used in the codebase
- Keep docs synchronized after planning so decisions, revisions, and final direction are not lost between sessions.
