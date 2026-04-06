# Codex Homepage Redesign Plan V1

## Summary

Replace the current stacked homepage with a scroll-led cinematic experience that starts in a framed monitor/device, zooms into the work, then resolves into testimonials and a booking CTA. The redesign stays inside the current Next.js and Sanity codebase, reuses existing CMS-fed imagery where possible, avoids Sanity schema changes in v1, and keeps motion concentrated in the hero and work sequence with simplified behavior on mobile and reduced-motion devices.

## Key Changes

### Homepage architecture

- Replace the homepage flow in `src/app/page.tsx` from `Hero -> FeaturedWork -> ParallaxStrips -> About -> Booking` to:
  1. pinned hero/device intro
  2. immersive featured photography reveal
  3. testimonial section
  4. booking CTA section
- Remove the homepage `AboutSnippet` and `ParallaxStrip` sections from v1 of the redesigned homepage. The `About` page remains the destination for personal/story content.
- Keep the existing global nav, but treat it as part of the cinematic homepage shell: transparent over the opening hero and allowed to become solid after the first viewport / once scroll progress leaves the intro zone.

### Motion and interaction model

- Build a dedicated homepage client shell that owns scroll progress and staged animation state for desktop.
- Desktop experience:
  - opening hero is a framed monitor/device centered in the viewport with headline, subheadline, and CTA
  - scroll stage 1: monitor/device subtly scales and the content inside it becomes the visual focus
  - scroll stage 2: the frame expands / recedes so the user feels like they are entering the screen rather than scrolling past it
  - scroll stage 3: release into a pinned featured-work reveal driven by the existing featured photos, with 3-4 staged image, title, and caption transitions instead of a draggable grid
  - scroll stage 4: settle into calmer testimonial and booking sections with polished entrance motion, not heavy pinned choreography
- Mobile experience:
  - preserve the same story and section order, but simplify pinning and heavy transforms
  - keep the monitor/device motif, but use shorter progress ranges and fewer layered transforms
  - avoid long pinned sections or complex cross-axis choreography on mobile
- Reduced motion:
  - disable pinned transformation and large scroll-linked movement
  - render a visually consistent but mostly static sequence so all content remains accessible and readable
- Do not reintroduce page-level route fades or wrappers that can affect navigation state across routes.

### Content and copy

- Reuse current Sanity content sources without schema changes:
  - use `homePageContent.heroImage` as the device/hero image source
  - use `getFeaturedPhotos()` as the work reveal source, preserving CMS order
- Keep these hero strings fixed in code for v1:
  - headline: `More Than a Still Frame`
  - subheadline: `A cinematic photography experience designed to move with you.`
  - hero CTA: `Explore the Motion`
- Keep testimonial content as static placeholder data in code for v1. Design it to look credible and easy to swap later.
- Keep the booking section fixed in code for v1:
  - section headline: `Bring the Vision Into Frame`
  - button text: `Book a Session`
  - button destination: `/booking`
- Keep the existing ByBops palette in `src/app/globals.css` as the design system source of truth.

### Internal interfaces and data contracts

- No public API changes.
- No Sanity schema changes in v1.
- Add only internal component contracts for:
  - homepage motion stages / scroll progress mapping
  - static testimonial placeholder objects
  - featured reveal items derived from existing `Photo` objects

## Test Plan

- `npm run lint`
- `npm run build`
- Desktop manual verification:
  - homepage loads with monitor/device intro
  - scroll feels like a transformation, not a basic stacked scroll
  - featured work reveals from existing CMS photos in a controlled sequence
  - testimonials and booking sections are reachable and readable
  - hero CTA scrolls into the reveal sequence correctly
  - booking button routes to `/booking`
- Mobile manual verification:
  - section order remains intact
  - motion is simplified but still premium
  - no broken pinning, overlap, or trapped scroll
- Reduced-motion verification:
  - content is fully accessible without large transforms
  - no hidden or unreadable sections
- Regression verification:
  - top-left `ByBops` logo still behaves correctly on `/` and when returning from `/booking`
  - no hidden-screen / opacity shell regressions on the homepage
  - homepage still renders when CMS content falls back to placeholders

## Assumptions and Defaults

- The "whole-page" cinematic feel is achieved by concentrating the most complex motion in the hero and featured-work sequence, with calmer testimonial and booking sections for stability.
- Homepage `About` content is intentionally removed from v1 to keep the landing page focused on visual impact and booking conversion.
- Testimonials remain static placeholders in code until real quotes exist.
- Existing CMS imagery is sufficient for v1. No new Sanity fields are required before implementation.
- The current dark and gold ByBops palette remains unchanged for this redesign.
