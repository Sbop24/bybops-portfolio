import type { Metadata } from 'next'
import { getPhotosByCategory } from '@/lib/sanity/queries'
import GalleryClient from '@/components/gallery/GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery | ByBops',
  description: 'Browse the full photography portfolio by category.',
}

export default async function GalleryPage() {
  const photosByCategory = await getPhotosByCategory()

  return (
    <main className="min-h-screen px-6 py-12 md:px-12">
      <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
        Gallery
      </h1>
      <p className="text-text-secondary text-sm mb-16 max-w-md">
        A curated collection across automotive, portrait, nature, and event photography.
      </p>

      <GalleryClient photosByCategory={photosByCategory} />
    </main>
  )
}
