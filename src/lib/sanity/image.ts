import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const builder =
  projectId && dataset
    ? createImageUrlBuilder({
        projectId,
        dataset,
      })
    : null

interface ImageUrlOptions {
  width?: number
  height?: number
  quality?: number
}

interface ImageAssetRef {
  _ref?: string
  url?: string
}

interface ImageWithAsset {
  asset?: ImageAssetRef | null
}

export function urlFor(source: SanityImageSource) {
  if (!builder) return null
  return builder.image(source)
}

export function getImageUrl(
  source: (SanityImageSource & ImageWithAsset) | null | undefined,
  { width, height, quality = 85 }: ImageUrlOptions = {},
) {
  if (!source) return null

  const asset = source.asset

  if (asset?._ref && builder) {
    let image = builder.image(source).format('webp').quality(quality)

    if (width) image = image.width(width)
    if (height) image = image.height(height)

    return image.url()
  }

  if (asset?.url) {
    return asset.url
  }

  return null
}
