# Codex Homepage Redesign Plan V2

## Summary

Implement the homepage as a single server-fed `HomepageClient` experience that uses a pinned monitor/device intro with a hybrid premium HUD, then scroll-transitions through four real-photo category reveals in this exact order: `Cars -> Nature -> Couples -> Event`, then three testimonials revealed one by one, then a booking CTA. This plan incorporates the recommendations from `CODEX_HOMEPAGE_REDESIGN_RECOMMENDATIONS.md`, with adjustments where repo truth already differs.

## Key Changes

### Architecture and data flow

- Replace the current homepage assembly in `src/app/page.tsx` with a server/client split:
  - server fetches `getHomePageContent()` and `getPhotosByCategory()` in parallel
  - pass immutable props into a new `HomepageClient`
  - all scroll state, breakpoints, pinning, and transform logic live only inside `HomepageClient`
- Do not place homepage scroll logic in layout, `MotionProvider`, or `PageTransition`. `PageTransition` stays a no-op.
- Remove homepage `ParallaxStrip` and homepage `AboutSnippet` from the redesign. About stays on `/about`.

### Scroll stages and motion spec

- Desktop breakpoints:
  - desktop: `>= 1024px`
  - tablet: `768px-1023px`
  - mobile: `< 768px`
- Desktop scroll stages:
  1. intro monitor/device frame with hero copy and visible HUD menu
  2. monitor zoom-in / frame recede transition
  3. category reveal sequence across four equal story beats
  4. testimonial sequence across three equal story beats
  5. booking CTA release and settle
- HUD/menu behavior:
  - hybrid game-inspired UI, premium not gimmicky
  - visible long enough to register before the zoom transition
  - categories listed and auto-highlighted with scroll; no click interaction required
  - do not keep the full HUD visible after the category sequence begins unless a very light category indicator remains
- Category reveal behavior:
  - one dominant image/moment per category
  - no grid, carousel, or stacked editorial card wall
  - each category gets title plus short code-defined support line
  - transitions are opacity, scale, and position based, not layout-shifting swaps
- Hero CTA:
  - label stays `Explore the Motion`
  - scrolls to the beginning of the category/reveal sequence, not `/booking`
- Booking CTA:
  - heading stays `Bring the Vision Into Frame`
  - button label stays `Book a Session`
  - navigates to `/booking`

### Mobile, reduced motion, and performance

- Mobile behavior is simplified:
  - no long multi-viewport pinning
  - monitor/device motif remains, but transforms are shorter and lighter
  - categories render as a premium sequential scroll stack, not a fully pinned desktop clone
  - testimonials and booking remain in normal document flow with entrance motion only
- Reduced motion:
  - use Framer Motion's built-in `useReducedMotion` consistently, not a new custom hook
  - disable pinning and scroll-linked transforms
  - keep the same content order with gentle reveal-on-view only
- Performance budget:
  - LCP `< 2.5s`
  - CLS `< 0.1`
  - INP `< 200ms`
- Performance safeguards:
  - hero image remains `priority`
  - all revealed images render inside reserved aspect-ratio containers
  - transitions must avoid height and flow changes during swaps
  - validate with Lighthouse, DevTools, and real-device throttling; do not rely on `npm run build` for CLS proof

### Content, assets, and interfaces

- Reuse the existing palette from `src/app/globals.css` unchanged.
- Use exact code-defined hero copy:
  - `More Than a Still Frame`
  - `A cinematic photography experience designed to move with you.`
  - `Explore the Motion`
- Category image source:
  - derive one representative image per category from `getPhotosByCategory()`
  - use the first ordered item in each category as the deterministic category hero
  - if a category is empty, fall back to the existing placeholder gallery item for that category
- Testimonials:
  - add `src/lib/testimonials.ts`
  - define `Testimonial` type and exactly 3 placeholder testimonials for v1
  - components consume that array so a future Sanity swap only changes the data source
- Accessibility:
  - `altText` already exists in the `Photo` type and query fragment, so no Sanity query shape change is required
  - when rendering category hero images, fall back from `photo.altText` to `photo.title` if needed

### Commit and docs strategy

- Implement in five commits:
  1. server/client homepage shell and data split
  2. monitor/device intro plus HUD plus hero CTA
  3. category reveal sequence
  4. testimonials plus booking finale
  5. verification, regression checks, and doc sync
- After implementation, update repo docs:
  - sync the final decisions into `CODEX_HOMEPAGE_REDESIGN_RECOMMENDATIONS.md`
  - add the redesign outcome and final architecture notes to the relevant handoff and project docs
  - add a short mistakes and lessons learned note so the same prompt-planning and architecture misses are not repeated

## Public and Internal Interfaces

- No public API changes.
- No Sanity schema changes in v1.
- New internal interfaces:
  - `HomepageClientProps`
  - a derived `CategoryRevealItem` shape based on the existing `Photo`
  - `Testimonial` and `HOMEPAGE_TESTIMONIALS` in `src/lib/testimonials.ts`

## Test Plan

- `npm run lint`
- `npm run build`
- Desktop verification:
  - monitor/device intro renders correctly
  - HUD/menu is visible and readable before the zoom
  - hero CTA scrolls into the reveal sequence
  - categories appear in exact order: Cars, Nature, Couples, Event
  - each category uses one real CMS-backed image and transitions without visible layout shifts
  - testimonials reveal one by one
  - booking button routes to `/booking`
- Mobile verification:
  - no trapped scroll
  - no broken pinning
  - simplified transforms still feel premium
- Reduced-motion verification:
  - all content is readable and reachable with heavy transforms disabled
- Regression verification:
  - homepage navigation does not reintroduce hidden-screen or opacity bugs
  - top-left `ByBops` logo still behaves correctly from `/` and `/booking`
  - fallbacks render if category data is missing
- Performance verification:
  - Lighthouse and throttled-device pass for LCP, CLS, and INP targets
  - no major shifts during category transitions

## Assumptions and Defaults

- Recommendation file guidance is accepted, except where repo truth already provides a better fit:
  - use `getPhotosByCategory()` instead of `getFeaturedPhotos()` for the category sequence
  - use Framer's existing `useReducedMotion` rather than introducing a separate hook
  - no alt-text query refactor is needed because `altText` is already in the photo contract
- Docs synchronization and lessons-learned notes happen during execution, since the planning turn could not edit tracked files.
