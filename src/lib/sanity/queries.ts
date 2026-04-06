import { cacheLife, cacheTag } from 'next/cache'
import { sanityClient } from './client'
import {
  FALLBACK_HERO_IMAGE_URL,
  FALLBACK_PARALLAX_STRIP_URL,
} from './placeholders'

// --- Types ---

export interface CmsImageAsset {
  _ref?: string
  _type?: 'reference'
  url?: string
}

export interface CmsImage {
  asset?: CmsImageAsset | null
  hotspot?: object
  crop?: object
}

export interface Photo {
  _id: string
  title: string
  slug: string
  image: CmsImage
  category: 'Cars' | 'Couples' | 'Nature' | 'Event'
  altText: string
  featured: boolean
  displayOrder?: number | null
}

export interface AboutData {
  title: string | null
  body: unknown[] | null
  profileImageAlt: string | null
  profileImage: CmsImage | null
}

export type ParallaxVariant = 'slide-right' | 'slide-left' | 'vertical'

export interface ParallaxStripData {
  image: CmsImage
  altText: string
  variant: ParallaxVariant
  heightClass: string
}

export interface ShopItemData {
  _id: string
  title: string
  slug: string
  type: 'preset' | 'print'
  price: number
  image: CmsImage
  description: string | null
  available: boolean
  displayOrder?: number | null
}

export interface HomePageContent {
  heroImage: CmsImage | null
  heroAltText: string | null
  heroLabel: string | null
  heroHeadingLineOne: string | null
  heroHeadingLineTwo: string | null
  bookingHeadingLineOne: string | null
  bookingHeadingLineTwo: string | null
  bookingButtonLabel: string | null
  parallaxStrips: ParallaxStripData[]
}

// --- GROQ Fragments ---

const PHOTO_FRAGMENT = `
  _id,
  title,
  "slug": slug.current,
  image { asset, hotspot, crop },
  category,
  altText,
  featured,
  displayOrder
`

const ABOUT_TAG = 'sanity:about'
const HOME_PAGE_TAG = 'sanity:home-page'
const PHOTO_TAG = 'sanity:photo'
const FEATURED_PHOTO_TAG = 'sanity:photo:featured'
const SHOP_TAG = 'sanity:shop-item'

// --- Placeholder Data ---

const PLACEHOLDER_PHOTOS: Photo[] = [
  { _id: '1', title: 'Pursuit', slug: 'pursuit', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800' } }, category: 'Cars', altText: 'Sports car on track', featured: true },
  { _id: '2', title: 'Iron & Speed', slug: 'iron-and-speed', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' } }, category: 'Cars', altText: 'Classic car in profile', featured: true },
  { _id: '3', title: 'Wild Light', slug: 'wild-light', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' } }, category: 'Nature', altText: 'Mountain landscape at dawn', featured: true },
  { _id: '4', title: 'Grid & Glass', slug: 'grid-and-glass', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' } }, category: 'Event', altText: 'City skyline at night', featured: true },
]

const PLACEHOLDER_GALLERY: Record<string, Photo[]> = {
  Cars: [
    { _id: 'p1', title: 'Pursuit', slug: 'pursuit', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800' } }, category: 'Cars', altText: 'Sports car on track', featured: false },
    { _id: 'p2', title: 'Iron & Speed', slug: 'iron-and-speed', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' } }, category: 'Cars', altText: 'Classic car in profile', featured: false },
    { _id: 'p3', title: 'Midnight Run', slug: 'midnight-run', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' } }, category: 'Cars', altText: 'Car on empty road at night', featured: false },
  ],
  Couples: [
    { _id: 'p4', title: 'Stillness', slug: 'stillness', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800' } }, category: 'Couples', altText: 'Portrait in natural light', featured: false },
    { _id: 'p5', title: 'Frame', slug: 'frame', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800' } }, category: 'Couples', altText: 'Studio portrait', featured: false },
    { _id: 'p6', title: 'Golden Hour', slug: 'golden-hour', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800' } }, category: 'Couples', altText: 'Portrait at golden hour', featured: false },
  ],
  Nature: [
    { _id: 'p7', title: 'Wild Light', slug: 'wild-light', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' } }, category: 'Nature', altText: 'Mountain landscape at dawn', featured: false },
    { _id: 'p8', title: 'Cascades', slug: 'cascades', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800' } }, category: 'Nature', altText: 'Waterfall in forest', featured: false },
    { _id: 'p9', title: 'Still Water', slug: 'still-water', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800' } }, category: 'Nature', altText: 'Calm lake at sunrise', featured: false },
  ],
  Event: [
    { _id: 'p10', title: 'Grid & Glass', slug: 'grid-and-glass', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' } }, category: 'Event', altText: 'City skyline at night', featured: false },
    { _id: 'p11', title: 'Stage Light', slug: 'stage-light', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800' } }, category: 'Event', altText: 'Concert stage lighting', featured: false },
    { _id: 'p12', title: 'Celebration', slug: 'celebration', image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800' } }, category: 'Event', altText: 'Festival crowd at night', featured: false },
  ],
}

const PLACEHOLDER_PARALLAX_STRIPS: ParallaxStripData[] = [
  {
    image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600' } },
    altText: 'Bugatti Chiron detail — car photography',
    variant: 'slide-right',
    heightClass: 'h-[45vh] md:h-[55vh]',
  },
  {
    image: { asset: { _ref: '', url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600' } },
    altText: 'Sports car on an open road',
    variant: 'slide-left',
    heightClass: 'h-[32vh] md:h-[40vh]',
  },
  {
    image: { asset: { _ref: '', url: FALLBACK_PARALLAX_STRIP_URL } },
    altText: 'Mountain landscape at golden hour',
    variant: 'vertical',
    heightClass: 'h-[40vh] md:h-[50vh]',
  },
]

const PLACEHOLDER_HOME_PAGE_CONTENT: HomePageContent = {
  heroImage: {
    asset: {
      _ref: '',
      url: FALLBACK_HERO_IMAGE_URL,
    },
  },
  heroAltText: 'Hero background - car photography',
  heroLabel: 'Photography by Sahib Boparai',
  heroHeadingLineOne: 'Moments',
  heroHeadingLineTwo: 'Worth Keeping',
  bookingHeadingLineOne: "Let's create something",
  bookingHeadingLineTwo: 'worth remembering',
  bookingButtonLabel: 'Book a Session',
  parallaxStrips: PLACEHOLDER_PARALLAX_STRIPS,
}

function getOrderedCategoryPhotos(photos: Photo[], category: Photo['category']) {
  return photos.filter((photo) => photo.category === category)
}

// --- Query Functions ---

export async function getFeaturedPhotos(): Promise<Photo[]> {
  'use cache'
  cacheLife('hours')
  cacheTag(PHOTO_TAG, FEATURED_PHOTO_TAG)

  const data = await sanityClient.fetch<Photo[]>(
    `*[_type == "photo" && featured == true] | order(coalesce(displayOrder, 9999) asc, _updatedAt desc, _createdAt desc) { ${PHOTO_FRAGMENT} }`
  )
  return data && data.length > 0 ? data : PLACEHOLDER_PHOTOS
}

export async function getPhotosByCategory(): Promise<Record<string, Photo[]>> {
  'use cache'
  cacheLife('hours')
  cacheTag(PHOTO_TAG)

  const photos = await sanityClient.fetch<Photo[]>(
    `*[_type == "photo"] | order(category asc, coalesce(displayOrder, 9999) asc, _updatedAt desc, _createdAt desc) { ${PHOTO_FRAGMENT} }`
  )
  const all = photos ?? []
  if (all.length === 0) return PLACEHOLDER_GALLERY
  return {
    Cars: getOrderedCategoryPhotos(all, 'Cars'),
    Couples: getOrderedCategoryPhotos(all, 'Couples'),
    Nature: getOrderedCategoryPhotos(all, 'Nature'),
    Event: getOrderedCategoryPhotos(all, 'Event'),
  }
}

export async function getAbout(): Promise<AboutData> {
  'use cache'
  cacheLife('days')
  cacheTag(ABOUT_TAG)

  const data = await sanityClient.fetch<AboutData>(
    `*[_type == "about" && _id == "about"][0] {
      title,
      body,
      profileImageAlt,
      profileImage { asset, hotspot, crop }
    }`
  )
  return data ?? { title: null, body: null, profileImageAlt: null, profileImage: null }
}

export async function getHomePageContent(): Promise<HomePageContent> {
  'use cache'
  cacheLife('days')
  cacheTag(HOME_PAGE_TAG)

  const data = await sanityClient.fetch<HomePageContent>(
    `*[_type == "featuredWorkSection" && _id == "featuredWorkSection"][0] {
      heroImage { asset, hotspot, crop },
      heroAltText,
      heroLabel,
      heroHeadingLineOne,
      heroHeadingLineTwo,
      bookingHeadingLineOne,
      bookingHeadingLineTwo,
      bookingButtonLabel,
      parallaxStrips[] {
        image { asset, hotspot, crop },
        altText,
        variant,
        heightClass
      }
    }`
  )

  if (!data) return PLACEHOLDER_HOME_PAGE_CONTENT

  return {
    ...PLACEHOLDER_HOME_PAGE_CONTENT,
    ...data,
    parallaxStrips:
      data.parallaxStrips && data.parallaxStrips.length > 0
        ? data.parallaxStrips
        : PLACEHOLDER_PARALLAX_STRIPS,
  }
}

export async function getShopItems(): Promise<ShopItemData[]> {
  'use cache'
  cacheLife('hours')
  cacheTag(SHOP_TAG)

  const data = await sanityClient.fetch<ShopItemData[]>(
    `*[_type == "shopItem"] | order(available desc, coalesce(displayOrder, 9999) asc, _updatedAt desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      type,
      price,
      image { asset, hotspot, crop },
      description,
      available,
      displayOrder
    }`
  )
  return data ?? []
}
