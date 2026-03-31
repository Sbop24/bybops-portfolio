---
phase: 02-schema-data-layer
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - sanity.config.ts
  - src/lib/sanity/queries.ts
  - src/app/studio/[[...tool]]/page.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Sanity Studio loads at /studio in the browser"
    - "About, Featured Work, and Gallery appear as pinned singletons in the Studio sidebar"
    - "Photo, Work Project, and Shop Item document types appear below the divider"
    - "All 4 query functions (getFeaturedPhotos, getPhotosByCategory, getAbout, getShopItems) are exported and typed"
    - "Placeholder photos render on the home page when Sanity returns empty data"
    - "npm run build passes with zero TypeScript errors"
  artifacts:
    - path: "sanity.config.ts"
      provides: "Singleton sidebar structure for Sanity Studio"
      contains: "structureTool"
    - path: "src/lib/sanity/queries.ts"
      provides: "Typed GROQ queries with placeholder fallbacks"
      exports: ["getFeaturedPhotos", "getPhotosByCategory", "getAbout", "getShopItems", "Photo", "AboutData", "ShopItemData"]
    - path: "src/app/studio/[[...tool]]/page.tsx"
      provides: "Embedded Sanity Studio route"
      contains: "NextStudio"
  key_links:
    - from: "src/lib/sanity/queries.ts"
      to: "src/lib/sanity/client.ts"
      via: "named import sanityClient"
      pattern: "import.*sanityClient.*from.*client"
    - from: "src/app/studio/[[...tool]]/page.tsx"
      to: "sanity.config.ts"
      via: "config import for NextStudio"
      pattern: "import config from.*sanity\\.config"
    - from: "sanity.config.ts"
      to: "sanity/schemaTypes/index.ts"
      via: "schemaTypes import"
      pattern: "import.*schemaTypes.*from.*schemaTypes"
---

<objective>
Wire the full CMS data layer for the ByBops portfolio: add singleton sidebar structure to Sanity Studio, rewrite all GROQ queries with proper TypeScript interfaces and placeholder fallbacks, and create the /studio route so the Studio is accessible in the browser.

Purpose: After this plan, the CMS is fully functional — singletons are editable in Studio, queries return typed data with graceful fallbacks, and the Studio is embedded in the Next.js app.

Output: 3 files modified/created. Sanity Studio accessible at /studio. All query functions exported and typed.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/STATE.md

Existing files to read before modifying:
@sanity.config.ts
@src/lib/sanity/client.ts
@src/lib/sanity/queries.ts
@sanity/schemaTypes/index.ts
</context>

<stack_gotchas>
- `'use cache'` directive works because `experimental: { useCache: true }` is already in next.config.ts
- `@sanity/vision` is NOT installed -- do NOT add it to sanity.config.ts plugins
- `src/lib/sanity/client.ts` uses a NAMED export `sanityClient` (not a default export)
- All queries use `'use cache'` -- NOT `revalidate` or `cache: 'force-cache'`
- Studio page must be at `src/app/studio/[[...tool]]/page.tsx` (catch-all route for Sanity Studio routing)
- Singleton schemas already use `__experimental_actions` in their definitions (Phase 1)
- The schemaTypes index exports `featuredWorkSection` (not `featuredWork`) -- use this exact name in the sidebar filter
</stack_gotchas>

<tasks>

<task type="auto">
  <name>Task 1: Add singleton sidebar structure to sanity.config.ts</name>
  <files>sanity.config.ts</files>
  <action>
Replace the current `sanity.config.ts` with singleton sidebar structure. The file currently has a bare `structureTool()` call with no custom structure.

Replace the entire file contents with:

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'bybops-portfolio',
  title: 'Bybops Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
            S.listItem().title('Featured Work').child(S.document().schemaType('featuredWorkSection').documentId('featuredWorkSection')),
            S.listItem().title('Gallery').child(S.document().schemaType('masonryGallery').documentId('masonryGallery')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['about', 'featuredWorkSection', 'masonryGallery'].includes(item.getId() ?? '')
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
```

Do NOT add `@sanity/vision` or any other plugin -- only `structureTool` with the custom structure.
  </action>
  <verify>
    <automated>cd C:/Users/bopar/bybops-portfolio && npx tsc --noEmit --pretty 2>&1 | head -20</automated>
  </verify>
  <done>sanity.config.ts has singleton sidebar with About, Featured Work, Gallery pinned above divider. TypeScript compiles without errors.</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite queries.ts with typed interfaces and placeholder fallbacks</name>
  <files>src/lib/sanity/queries.ts</files>
  <action>
Completely replace `src/lib/sanity/queries.ts`. The current file has old interfaces (PortfolioImageProjection, FeaturedProject, GalleryImageResult) and queries that do not match the updated schemas from Phase 1.

Replace the entire file with:

```ts
import { sanityClient } from './client'

// --- Types ---

export interface Photo {
  _id: string
  title: string
  slug: string
  image: { asset: { _ref: string; url?: string }; hotspot?: object; crop?: object }
  category: 'Automotive' | 'Portrait' | 'Nature' | 'Event'
  altText: string
  featured: boolean
}

export interface AboutData {
  body: unknown[] | null
  profileImage: { asset: { _ref: string; url?: string } } | null
}

export interface ShopItemData {
  _id: string
  title: string
  slug: string
  type: 'preset' | 'print'
  price: number
  image: { asset: { _ref: string; url?: string } }
  description: string | null
  available: boolean
}

// --- GROQ Fragments ---

const PHOTO_FRAGMENT = `
  _id,
  title,
  "slug": slug.current,
  image { asset-> { _ref, url }, hotspot, crop },
  category,
  altText,
  featured
`

// --- Placeholder Data ---

const PLACEHOLDER_PHOTOS: Photo[] = [
  { _id: '1', title: 'Pursuit', slug: 'pursuit', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800' } }, category: 'Automotive', altText: 'Sports car on track', featured: true },
  { _id: '2', title: 'Iron & Speed', slug: 'iron-and-speed', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' } }, category: 'Automotive', altText: 'Classic car in profile', featured: true },
  { _id: '3', title: 'Wild Light', slug: 'wild-light', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' } }, category: 'Nature', altText: 'Mountain landscape at dawn', featured: true },
  { _id: '4', title: 'Grid & Glass', slug: 'grid-and-glass', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' } }, category: 'Event', altText: 'City skyline at night', featured: true },
]

// --- Query Functions ---

export async function getFeaturedPhotos(): Promise<Photo[]> {
  'use cache'
  const data = await sanityClient.fetch<Photo[]>(
    `*[_type == "photo" && featured == true] { ${PHOTO_FRAGMENT} }`
  )
  return data ?? PLACEHOLDER_PHOTOS
}

export async function getPhotosByCategory(): Promise<Record<string, Photo[]>> {
  'use cache'
  const photos = await sanityClient.fetch<Photo[]>(`*[_type == "photo"] { ${PHOTO_FRAGMENT} }`)
  const all = photos ?? []
  return {
    Automotive: all.filter((p) => p.category === 'Automotive'),
    Portrait: all.filter((p) => p.category === 'Portrait'),
    Nature: all.filter((p) => p.category === 'Nature'),
    Event: all.filter((p) => p.category === 'Event'),
  }
}

export async function getAbout(): Promise<AboutData> {
  'use cache'
  const data = await sanityClient.fetch<AboutData>(`*[_type == "about"][0] { body, profileImage { asset-> } }`)
  return data ?? { body: null, profileImage: null }
}

export async function getShopItems(): Promise<ShopItemData[]> {
  'use cache'
  const data = await sanityClient.fetch<ShopItemData[]>(
    `*[_type == "shopItem"] { _id, title, "slug": slug.current, type, price, image { asset-> }, description, available }`
  )
  return data ?? []
}
```

Key changes from old file:
- Old interfaces (PortfolioImageProjection, FeaturedProject, GalleryImageResult) replaced with Photo, AboutData, ShopItemData
- Old functions (getFeaturedProjects, getGalleryImages) replaced with getFeaturedPhotos, getPhotosByCategory, getAbout, getShopItems
- Every function uses `'use cache'` directive
- Every function has `?? fallback` so empty Sanity returns degrade gracefully
- PLACEHOLDER_PHOTOS array provides Unsplash images for dev without Sanity content
  </action>
  <verify>
    <automated>cd C:/Users/bopar/bybops-portfolio && npx tsc --noEmit --pretty 2>&1 | head -20</automated>
  </verify>
  <done>queries.ts exports 4 query functions and 3 interfaces. All functions use 'use cache' and return fallback data on empty Sanity responses. TypeScript compiles without errors.</done>
</task>

<task type="auto">
  <name>Task 3: Create Sanity Studio route at /studio</name>
  <files>src/app/studio/[[...tool]]/page.tsx</files>
  <action>
Create the directory `src/app/studio/[[...tool]]/` and add `page.tsx`.

The catch-all route `[[...tool]]` is required so Sanity Studio's internal routing (desk tool, vision tool, etc.) works correctly.

File contents:

```tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Notes:
- Import path `../../../../sanity.config` is correct: page.tsx is 4 levels deep (src/app/studio/[[...tool]]/)
- `dynamic = 'force-dynamic'` prevents Next.js from trying to statically generate the Studio page
- `NextStudio` comes from `next-sanity/studio` (already installed as next-sanity@12.2.1)
  </action>
  <verify>
    <automated>cd C:/Users/bopar/bybops-portfolio && npx tsc --noEmit --pretty 2>&1 | head -20</automated>
  </verify>
  <done>Studio route exists at src/app/studio/[[...tool]]/page.tsx. Imports NextStudio with the project config. TypeScript compiles without errors.</done>
</task>

</tasks>

<verification>
After all 3 tasks complete, run the full build to confirm everything wires together:

```bash
cd C:/Users/bopar/bybops-portfolio && npm run build
```

Build must pass with zero errors. This catches:
- TypeScript type mismatches between queries and schemas
- Import path issues (sanity.config from studio route, client from queries)
- Any 'use cache' directive issues
- Next.js route compilation for the studio catch-all

Then start dev server and verify /studio loads:

```bash
cd C:/Users/bopar/bybops-portfolio && npm run dev
```

Visit http://localhost:3000/studio -- Sanity Studio should render with the sidebar showing About, Featured Work, Gallery as pinned singletons.
</verification>

<success_criteria>
1. `npm run build` passes -- zero TypeScript errors
2. `/studio` loads in browser and shows Sanity Studio UI
3. About, Featured Work, Gallery appear as pinned singletons in Studio sidebar
4. All 4 query functions (getFeaturedPhotos, getPhotosByCategory, getAbout, getShopItems) exported and typed correctly
5. Placeholder photos available as fallback when Sanity returns empty
</success_criteria>

<output>
After completion, create `.planning/phases/02-schema-data-layer/02-01-SUMMARY.md`

Commit message: `feat(cms): wire studio singleton structure, rewrite queries`
</output>
