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
