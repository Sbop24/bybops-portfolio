# ByBops Portfolio

## What This Is

A personal photography portfolio and client booking site for Sahib Boparai (ByBops). It showcases automotive, portrait, nature, and event photography, supports session bookings through Calendly, and includes a hidden shop for future presets and prints.

## Core Value

Clients land on the site and immediately feel the luxury, dark aesthetic and want to book a session.

## Current Product State

Completed:

- Public portfolio routes are built
- Sanity Studio is embedded at `/studio`
- Homepage, gallery, about, booking, and hidden shop all exist
- CMS truthfulness cleanup is complete
- Sanity token hardening is complete
- Sanity image pipeline cleanup is complete
- Gallery drawer accessibility is complete
- Keyboard focus and reduced-motion polish are complete
- Homepage content drift has been reduced
- Explicit ordering controls exist for photos and shop items
- ByBops logo navigation regression is fixed locally and pushed

Still active:

- Live production deployment must be checked against the latest verified branch
- The site-wide security warning on `bybops.ca` must be diagnosed and fixed
- Browser-level verification is needed after Codex restarts with Chrome DevTools MCP
- Homepage redesign planning should happen before major visual changes

## Constraints

- Tailwind v4 with CSS `@theme`
- Sanity-backed content model
- Mobile-first implementation
- No secrets committed to the repo
- All meaningful code changes must be verified before push
- Route-level page transitions are currently disabled on purpose because the previous wrapper caused hidden-screen behavior on live navigation

## Last Updated

2026-04-06
