# CLAUDE.md — Photography Portfolio

## Project Overview
- **Owner:** Sahib Boparai
- **Stack:** Next.js 16.2.1 App Router, Tailwind CSS v4, Framer Motion 12, Sanity v5, Cormorant Garamond + Geist fonts, clsx + tailwind-merge
- **Purpose:** High-end photography portfolio website with Sanity-managed content
- **Started:** 2026-03-28

---

## Next.js App Router Rules

- Server Components are the default. Never add `'use client'` unless the component uses hooks, browser APIs, or animation.
- Push all data fetching up to Server Components. Never fetch inside Client Components when the parent can pass data as props.
- Use `async/await` directly in Server Components — no `useEffect` for data loading.
- All dynamic routes use `generateStaticParams` for static generation where content is managed via Sanity.
- Use `next/image` for every image, always. Set `sizes` prop to match actual rendered breakpoints. Never use raw `<img>`.
- Use the `metadata` export (not `<Head>`) for all SEO. Every page exports a `generateMetadata` function.
- Route groups (`(folder)`) for layout separation between the portfolio, studio, and any admin areas.
- Loading and error boundaries: every dynamic route segment gets a `loading.tsx` and `error.tsx`.
- Never put Sanity client config or token in a Client Component file. Keep it server-side only.

---

## Sanity v3 Rules

### Schema Syntax
- Always use `defineType` and `defineField` — never plain object literals for schema definitions.
- Name types in `camelCase` (e.g., `photoProject`, `galleryImage`). Title in Title Case.
- Every document type must have a `slug` field with `isUnique` validation.
- Use `defineArrayMember` inside array fields — never inline object shapes.

### GROQ Queries
- Never fetch full documents. Always project only the fields the component needs.
- Portable Text fields: always dereference with `[]` and include asset references (`asset->`).
- Image fields: always dereference the asset: `image { asset->, alt, caption }`.
- Slugs: dereference with `slug.current` in projections, not the full slug object.
- All queries live in `lib/sanity/queries.ts` — never write GROQ inline in a component or page.
- Use `sanityFetch` with appropriate `tags` for on-demand revalidation. Never use `cache: 'no-store'` unless explicitly debugging.
- Type every query return with a TypeScript interface generated from the schema (use `sanity typegen` if available).

### Image Handling via Sanity
- Use `@sanity/image-url` (`urlFor`) for all Sanity image transformations.
- Set explicit width/height via the builder: `urlFor(image).width(1200).height(800).url()`.
- Use `.format('webp')` on all `urlFor` calls unless a specific format is required.
- Use `.quality(85)` as the default. Lower to `70` for gallery thumbnails.
- Never store the full asset URL string directly — always store the Sanity image reference object and build URLs at render time.
- Use Sanity's image hotspot/crop fields for art direction on portrait vs. landscape crops.

---

## Framer Motion Rules

### Server/Client Boundaries
- Any file that uses `motion.*`, `useAnimation`, `useInView`, `AnimatePresence`, or any Framer hook **must** have `'use client'` as the first line.
- Never import `motion` from `framer-motion` in a Server Component file — it will silently fail or throw at runtime.
- Wrap animated sections in a dedicated Client Component. Pass data from the Server Component as props — never co-locate data fetching with animation logic.
- Use `LazyMotion` with `domAnimation` at the layout level to reduce bundle size. Do not import the full `framer-motion` bundle.

### Animation Patterns
- Define variants in a `const` outside the component (not inline JSX) to prevent re-creation on every render.
- Use `viewport={{ once: true }}` on scroll-triggered animations — photography portfolios should not re-animate on scroll-up.
- Gallery entrance animations: stagger children with `staggerChildren: 0.08`. Keep individual durations under 0.5s.
- Page transitions: use `AnimatePresence` at the layout level, not inside individual pages.
- Respect `prefers-reduced-motion`: wrap all animation variants with a check or use Framer's built-in `useReducedMotion` hook.

---

## Photography Portfolio Image Rules

- Every photo in Sanity must have: `alt` text (required, validated), `caption` (optional), `category`, and a `project` reference.
- Aspect ratios are locked per context: hero images 16:9, gallery grid 4:3, detail view unconstrained.
- Lazy load all gallery images below the fold. Use `loading="lazy"` on `next/image` (default) and do not override with `priority` unless it is a hero/LCP image.
- Mark only the single largest hero image per page as `priority` on `next/image` — never mark grid thumbnails.
- Use Tailwind's `object-cover` and `object-position` for consistent framing across variable source ratios.
- Gallery grid: CSS Grid, not Flexbox. Use `grid-cols-2 md:grid-cols-3` as the base pattern.
- Never use placeholder blur without a generated `blurDataURL` from Sanity's image pipeline.

---

## Tailwind CSS Rules

- Use Tailwind utility classes directly — no custom CSS files unless a value is truly not achievable with utilities.
- Define the color palette, font families, and spacing scale extensions in `tailwind.config.ts` under `theme.extend` — never hardcode hex values in class names.
- Responsive-first: always write mobile styles first, then `md:`, `lg:` overrides.
- No inline `style` props for spacing, color, or typography — use utilities.
- `clsx` or `cn` (shadcn pattern) for conditional class merging — never string concatenation.

---

## Git Rules

- Commit after every meaningful unit of work (component complete, schema defined, query working).
- Commit message format: `type(scope): description` — e.g., `feat(gallery): add staggered entrance animation`.
- Never commit `.env.local`, Sanity tokens, or API keys.
- Run `npm run build` before any commit that touches a Server/Client Component boundary change — boundary mistakes only surface at build time, not dev.

---

## Dev Workflow Rules

- After every code change, run `npm run dev` and verify in browser before marking done.
- If a Sanity schema changes, restart the dev server — schema changes do not hot reload.
- Use `npm run build && npm run start` to catch any App Router/SSR issues that don't appear in dev mode.
- Sanity Studio runs at `/studio` via the embedded route — never deploy it to a separate project.

---

## File Structure Conventions

```
app/
  (portfolio)/        # Public-facing portfolio routes
  studio/[[...tool]]/ # Embedded Sanity Studio
  layout.tsx          # Root layout with LazyMotion wrapper
components/
  ui/                 # Stateless, server-safe UI primitives
  motion/             # All 'use client' animated components
  gallery/            # Gallery-specific components
lib/
  sanity/
    client.ts         # Sanity client (server-only)
    queries.ts        # All GROQ queries
    image.ts          # urlFor builder helper
  utils.ts            # cn() and shared utilities
sanity/
  schemas/            # All defineType schema files
  sanity.config.ts
```

---

## Updates Log

| Date | Change |
| --- | --- |
| 2026-03-28 | CLAUDE.md created. Covers Next.js App Router, Sanity v3, Framer Motion, image handling, Tailwind, Git, and file structure. |
| 2026-03-31 | Stack corrected to Next.js 16.2.1, Tailwind v4, Sanity v5. Phase 1 fixes applied: domMax, useCache, lib path moved, gold tokens, Cormorant font, cn() utility, photo/about/shopItem schemas. Build passes. |
| 2026-03-31 | Framer Motion rule updated: use domMax (not domAnimation). lib/sanity now at src/lib/sanity/ — use @/ alias. |
| 2026-03-31 | Phases 3-5 complete: page transitions, navigation, home page. shadcn initialized. Nav built from scratch (21st.dev unavailable). shadcn overwrites --font-sans — fix after init. |
| 2026-03-31 | Phase 6 complete: gallery page with 4 category rows, slide-in drawer (spring animation), loading/error boundaries. scrollbar-hide utility added. Placeholder gallery data (12 photos). |
| 2026-03-31 | Phase 7 complete: about page with two-column editorial layout (sticky image left, PortableText right), scroll-triggered reveals, fallback lorem ipsum. PortableTextBlock cast needed for type safety. |
| 2026-04-01 | Phase 8 complete: booking page with Calendly iframe embed. Placeholder fallback when NEXT_PUBLIC_CALENDLY_URL not set. |
| 2026-04-01 | Phase 9 complete: hidden shop page with ProductCard, ShopClient (All/Presets/Prints filter tabs), staggered grid animation, sold-out overlay. robots noindex set. |
| 2026-04-01 | Phase 10 complete: final verification passed. Build clean, all 6 routes return 200, no motion.div usage, gold accents confirmed. ALL 10 PHASES DONE — ready for deployment. |
| 2026-04-01 | Homepage overhaul: (1) Created reusable ParallaxStrip.tsx with slide-right, slide-left, and vertical variants — replaces CarAnimation.tsx. (2) page.tsx updated to use 3 ParallaxStrip instances (Chiron right-slide h-[45vh], sports car left-slide h-[32vh], mountain vertical h-[40vh]), extending page length significantly. (3) AboutSnippet.tsx made compact: aspect ratio 3/4→4/3, padding py-14→py-8, text trimmed. (4) Nav.tsx ByBops logo fixed: switched to anchor + router.push() with explicit scroll reset for reliable home navigation from all routes. (5) Mobile-first pass: HeroSection uses h-[100svh], text scales text-4xl sm:text-5xl md:text-7xl; FeaturedWork cards w-56 on mobile with touch-action pan-x; BookingCTA text scales down; all parallax strips have responsive heights. |
