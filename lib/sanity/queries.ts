import { sanityClient } from './client'

// --- Types ---

export interface ImageDimensions {
  aspectRatio: number
  width: number
  height: number
}

export interface PortfolioImageProjection {
  image: {
    asset: {
      _ref: string
      _type: string
    }
    hotspot?: object
    crop?: object
  }
  alt: string
  title: string | null
  caption: string | null
  dimensions: ImageDimensions | null
}

export interface FeaturedProject {
  _id: string
  title: string
  slug: string
  summary: string | null
  coverImage: PortfolioImageProjection | null
}

export interface GalleryImageResult {
  _id: string
  tags: string[] | null
  photo: PortfolioImageProjection | null
}

// --- Queries ---

const portfolioImageFragment = `
  image,
  alt,
  title,
  caption,
  "dimensions": image.asset->metadata.dimensions {
    aspectRatio,
    width,
    height
  }
`

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  return sanityClient.fetch(
    `*[_type == "featuredWorkSection"][0] {
      "projects": projects[]-> {
        _id,
        title,
        "slug": slug.current,
        summary,
        "coverImage": coverImage {
          ${portfolioImageFragment}
        }
      }
    }.projects`,
  )
}

export async function getGalleryImages(): Promise<GalleryImageResult[]> {
  return sanityClient.fetch(
    `*[_type == "galleryImage" && isVisible == true] {
      _id,
      tags,
      "photo": photo {
        ${portfolioImageFragment}
      }
    }`,
  )
}
