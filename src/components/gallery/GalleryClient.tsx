'use client'

import { useState, useCallback } from 'react'
import type { Photo } from '@/lib/sanity/queries'
import CategoryRow from './CategoryRow'
import GalleryDrawer from './GalleryDrawer'

interface GalleryClientProps {
  photosByCategory: Record<string, Photo[]>
}

const CATEGORIES = ['Cars', 'Couples', 'Nature', 'Event'] as const

export default function GalleryClient({ photosByCategory }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const handleClose = useCallback(() => setActiveCategory(null), [])
  const hasPhotos = CATEGORIES.some((category) => (photosByCategory[category] ?? []).length > 0)

  if (!hasPhotos) {
    return (
      <div className="rounded-sm border border-border px-6 py-12 text-center">
        <p className="mb-2 text-sm text-text-primary">Gallery content is being updated.</p>
        <p className="text-xs text-text-secondary">
          Add photo documents in Sanity to populate the category rows here.
        </p>
      </div>
    )
  }

  return (
    <>
      {CATEGORIES.map((cat) => (
        <CategoryRow
          key={cat}
          category={cat}
          photos={photosByCategory[cat] ?? []}
          onOpen={() => setActiveCategory(cat)}
        />
      ))}

      <GalleryDrawer
        category={activeCategory}
        photos={activeCategory ? (photosByCategory[activeCategory] ?? []) : []}
        onClose={handleClose}
      />
    </>
  )
}
