# Codex Homepage Redesign: Critical Recommendations

**Document Purpose**: Address architectural gaps and implementation details for the ByBops homepage redesign before execution. This ensures smooth implementation and avoids rework.

---

## Critical Architecture Decisions

### 1. Scroll Pinning + Core Web Vitals Strategy
**Issue**: Scroll-linked animations and pinned sections can hurt CLS (Cumulative Layout Shift) and LCP (Largest Contentful Paint) on slow connections.

**Recommendation**:
- Define a Core Web Vitals performance budget before implementation:
  - LCP: < 2.5s
  - CLS: < 0.1
  - INP: < 200ms
- Use `usePerformanceObserver` or Vercel's analytics to measure scroll stage transitions for CLS violations
- Pre-load the hero image with `priority` in Next Image to claim it as the LCP candidate
- Test the featured-work reveal sequence specifically for layout shifts during image swaps

**Acceptance Criteria**: `npm run build` output shows no CLS warnings; real-device testing on 4G shows stable scroll performance.

---

### 2. Data Fetching: Server vs. Client Split
**Issue**: Cinematic scroll control requires client hooks, but homepage data should be fetched server-side per Next.js rules.

**Recommendation**:
- **Architecture Pattern**:
  - `page.tsx` (Server Component): Fetch `homePageContent` and `getFeaturedPhotos()` in parallel with `Promise.all()`
  - Pass both as props to `<HomepageClient>` (Client Component)
  - `HomepageClient`: Own all scroll progress state, animation state, and viewport transforms
  
- **Implementation**:
  ```typescript
  // page.tsx (Server)
  const [homepage, featured] = await Promise.all([
    getHomePageContent(),
    getFeaturedPhotos()
  ]);
  return <HomepageClient homepage={homepage} featured={featured} />;
  ```

- **Why this matters**: Keeps Sanity token server-side only, enables incremental static generation, isolates client motion logic cleanly for testing.

**Acceptance Criteria**: `HomepageClient` receives data as immutable props; no `useEffect` in it for data fetching.

---

### 3. Navigation State Regression Prevention
**Issue**: Previous route wrapper caused hidden-screen opacity regressions. New client shell must not repeat this.

**Recommendation**:
- **Hard Boundaries**:
  - Scroll pinning logic and transforms must live only in `HomepageClient`, **not** in layout wrappers or root-level `MotionProvider`
  - `PageTransition` remains a no-op (confirmed in CLAUDE.md)
  - Do not create a new wrapper around the app layout even if it feels clean
  
- **Testing Safeguard**:
  - After building `HomepageClient`, manually test navigation:
    - Load homepage
    - Click logo or navigate to `/booking`
    - Return to homepage via browser back button
    - Verify no hidden-screen flash, no opacity artifacts
  - This is a regression-prevention gate; do not skip

**Acceptance Criteria**: Navigation transitions are smooth on all pages; the homepage shell does not persist state across route changes.

---

### 4. Hero CTA Destination Clarity
**Issue**: Plan mentions *"button destination: `/booking`"* but also a booking CTA section at page bottom. Ambiguous.

**Recommendation**:
- **Define two distinct CTAs**:
  1. **Hero CTA** (`Explore the Motion`): Scrolls user to featured-work reveal section (anchor, not navigate)
     - Smooth scroll with `window.scrollTo({ behavior: 'smooth', top: featuredWorkRef })` or Framer Motion scroll trigger
     - Keeps user on homepage, progresses the cinematic sequence
  2. **Booking CTA** (`Book a Session`): Navigates to `/booking` (hard nav)
     - Lives in the bottom booking section
     - Explicit route change
  
- **Why this matters**: Hero CTA advances the user through the cinematic experience; booking CTA is the conversion goal. They serve different purposes.

**Acceptance Criteria**: Hero button scrolls; booking button navigates. Test both in manual verification.

---

## Implementation Details

### 5. Mobile Breakpoint & Motion Simplification Thresholds
**Issue**: *"Simplified pinning on mobile"* is vague. Missing explicit breakpoints and motion reduction rules.

**Recommendation**:
- **Breakpoints**:
  - Desktop: `>= 1024px` (full pinned sequences)
  - Tablet: `768px to 1023px` (medium pinned, shorter scroll ranges)
  - Mobile: `< 768px` (minimal pinning)

- **Mobile Motion Rules**:
  - No full-viewport pinning in scroll stage 1–3
  - Hero monitor/device: scale down from center only, no large transforms
  - Featured reveal: render as a scrollable stack, not a pinned carousel
  - Testimonials & booking: normal flow, entrance animations only (fade/slide in on view)
  - Max pinned height on mobile: 1 viewport; if more complex, break into separate scroll sections

- **Implementation Hook**:
  ```typescript
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pinDuration = isMobile ? 0.8 : 2.0; // scroll progress range
  ```

**Acceptance Criteria**: Mobile manual test shows no broken pinning, no trapped scroll, no layout overlaps.

---

### 6. Reduced-Motion Detection & Fallback Rendering
**Issue**: "Disable pinned transformation" doesn't specify hook, fallback behavior, or accessibility design.

**Recommendation**:
- **Centralized Hook** (new file: `src/hooks/useReducedMotion.ts`):
  ```typescript
  export function useReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false);
    useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(mq.matches);
      mq.addEventListener('change', (e) => setPrefersReduced(e.matches));
    }, []);
    return prefersReduced;
  }
  ```

- **Fallback Rendering in HomepageClient**:
  - If `prefersReduced` is true:
    - Skip scroll-linked transforms (no `useScroll`, no `transform`)
    - Keep all staged animations (fade/slide in on mount or scroll view)
    - Render the same visual order, just without transforms
    - All content remains readable and at full opacity
  
- **Example**: Featured-work section becomes a scrollable list instead of a pinned reveal, but images and titles still fade in on view.

**Acceptance Criteria**: Test with `prefers-reduced-motion: reduce` in browser DevTools. All sections readable, no large transforms, animations are entrance-only.

---

### 7. Testimonial Data Structure & Swap Strategy
**Issue**: *"Static placeholder data"* needs explicit structure, location, and swap path.

**Recommendation**:
- **Data Structure** (new file: `src/lib/testimonials.ts`):
  ```typescript
  export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    image?: string; // optional later
  }

  export const HOMEPAGE_TESTIMONIALS: Testimonial[] = [
    {
      id: 'testimonial-1',
      quote: 'Sahib captured moments I didn't know I needed.',
      author: 'Alex Chen',
      role: 'Couple Session',
    },
    {
      id: 'testimonial-2',
      quote: 'The energy and creativity were unmatched.',
      author: 'Jordan Liu',
      role: 'Brand Campaign',
    },
    // Add 2–3 more for variety
  ];
  ```

- **Swap Path** (when real quotes arrive):
  - Replace `HOMEPAGE_TESTIMONIALS` array with a Sanity query from a new `testimonial` doc type
  - Or add a `testimonials` array field to the `homePageContent` singleton
  - No component refactoring needed; just swap the data source

- **v2 Note**: Document this swap plan in a comment in the component so the next dev knows the integration point.

**Acceptance Criteria**: Testimonial section renders 3–4 distinct placeholder quotes; structure is reusable.

---

### 8. Alt Text for CMS Images
**Issue**: Portfolio rules require alt text on all photos. Unclear if `getFeaturedPhotos()` includes it or what the fallback is.

**Recommendation**:
- **Update `getFeaturedPhotos()` query** (in `src/lib/sanity/queries.ts`):
  ```typescript
  export const getFeaturedPhotosQuery = `
    *[_type == "photo" && featured] | order(featuredOrder asc) {
      _id,
      title,
      slug,
      "imageUrl": image.asset->url,
      alt, // <-- ADD THIS FIELD
      description
    }
  `;
  ```

- **Fallback**: If a photo in Sanity has no alt text, use `title` as fallback:
  ```typescript
  const altText = photo.alt || photo.title || 'Featured photography';
  ```

- **Testing**: Before declaring the homepage done, audit every featured photo in Sanity:
  - Run `npm run build` to catch missing alt warnings
  - Verify each photo has a meaningful alt string

**Acceptance Criteria**: Zero alt-text warnings in `npm run build`; all featured images pass lighthouse accessibility audit.

---

### 9. Commit Strategy for Monolithic Redesign
**Issue**: Plan reads as one big change. Unclear how to break it into reviewable units.

**Recommendation**:
- **Commit Breakdown** (in this order):
  1. **Commit 1**: `feat(homepage): Create HomepageClient shell with scroll progress state`
     - Adds `src/components/home/HomepageClient.tsx`
     - Empty child sections, basic scroll listener, no motion yet
     - `page.tsx` wired to use it
  
  2. **Commit 2**: `feat(homepage): Build monitor/device hero and stage 1 zoom animation`
     - Hero component with framed device visuals
     - Scroll-to-scale logic with stage boundaries
     - Mobile/reduced-motion fallback
  
  3. **Commit 3**: `feat(homepage): Implement featured-work reveal sequence (stages 2–3)`
     - Refactor existing `FeaturedWork` for pinned reveal
     - 3–4 staged image transitions
     - Mobile simplification
  
  4. **Commit 4**: `feat(homepage): Add testimonial carousel and booking CTA section`
     - Testimonial component with placeholder data
     - Booking section with proper button routing
  
  5. **Commit 5**: `test(homepage): Verify lint, build, and manual smoke tests`
     - Run full test suite
     - Manual desktop/mobile/reduced-motion verification
     - Regression test (logo, booking nav, fallback content)

- **Why this matters**: Each commit is reviewable, testable, and reversible. Makes debugging easier if a regression appears.

**Acceptance Criteria**: Five clean, atomic commits in the PR; each commit passes `npm run lint && npm run build`.

---

## Extended Test Plan

### Core Web Vitals Verification
- [ ] LCP: Hero image loads in < 2.5s on 4G throttling
- [ ] CLS: No layout shifts during featured-work image swaps
- [ ] INP: Scroll interactions respond in < 200ms

### Scroll & Animation Verification
- [ ] Desktop: Monitor/device enters scale smoothly at scroll 0%
- [ ] Desktop: Featured work reveals in 3–4 staged transitions
- [ ] Desktop: Testimonials fade in as user scrolls, no pinning
- [ ] Mobile: No pinned sections trap scroll or break momentum
- [ ] Mobile: Hero scales down gracefully; featured list renders as scrollable
- [ ] Reduced motion: All content readable without transforms; entrance animations present

### Accessibility & Regression Verification
- [ ] No alt-text warnings in `npm run build`
- [ ] Testimonial section renders without errors
- [ ] Hero and booking CTAs respond to keyboard + screen reader
- [ ] `prefers-reduced-motion: reduce` fully accessible
- [ ] ByBops logo still navigates correctly on `/` and after returning from `/booking`
- [ ] No hidden-screen flashes on route transitions
- [ ] Featured photo fallbacks render if Sanity query times out

### CMS Fallback Verification
- [ ] Homepage renders with placeholder images if `homePageContent` query fails
- [ ] Featured photos gracefully degrade if query returns fewer than 3 items

---

## Decision Checklist for Codex

Before writing code, confirm:
- [ ] **Data Fetching**: Server Component fetch in `page.tsx`, pass to Client Component `HomepageClient`
- [ ] **Hero CTA**: Scrolls to featured-work section (not navigate)
- [ ] **Booking CTA**: Navigates to `/booking`
- [ ] **Mobile Breakpoint**: 768px threshold; pinning disabled below
- [ ] **Reduced Motion Hook**: Centralized in `src/hooks/useReducedMotion.ts`
- [ ] **Testimonials**: Place in `src/lib/testimonials.ts`, structure as `Testimonial[]` array
- [ ] **Alt Text Query**: Updated `getFeaturedPhotosQuery` includes `alt` field
- [ ] **Commits**: Plan 5 atomic commits before starting
- [ ] **No Layout Wrappers**: Scroll logic stays in `HomepageClient`, not layout
- [ ] **Performance Budget**: CLS < 0.1, LCP < 2.5s, INP < 200ms

---

## Notes for the Dev

- This redesign is ambitious but achievable within Next.js + Sanity constraints.
- Keep the implementation lean: fewer layers = fewer regressions.
- Test reduced-motion early and often—it's a hard accessibility requirement.
- The hero CTA scroll anchor is the linchpin of the UX; nail it before moving to featured reveal.
- After all 5 commits, run the full test suite and site manual verification before merging.

Good luck, Codex. 🚀
