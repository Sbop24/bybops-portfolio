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
