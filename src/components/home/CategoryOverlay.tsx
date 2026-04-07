'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CategoryKey, CATEGORY_COPY } from '@/lib/homepage-data'
import type { Photo } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

interface CategoryOverlayProps {
  category: CategoryKey | null
  photo: Photo | null
  onClose: () => void
}

export default function CategoryOverlay({ category, photo, onClose }: CategoryOverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [navigating, setNavigating] = useState(false)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (category) {
      document.addEventListener('keydown', onKey)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [category, onClose])

  // Focus close button when overlay opens
  useEffect(() => {
    if (category) {
      closeButtonRef.current?.focus()
    }
  }, [category])

  // Prevent body scroll when open
  useEffect(() => {
    if (category) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [category])

  // Focus trap — inert main content when overlay is open
  useEffect(() => {
    const main = document.querySelector('main')
    if (category) {
      main?.setAttribute('inert', '')
    } else {
      main?.removeAttribute('inert')
    }
    return () => { main?.removeAttribute('inert') }
  }, [category])

  const copy = category ? CATEGORY_COPY[category] : null
  const imageUrl = photo ? getImageUrl(photo.image) : null

  return (
    <AnimatePresence>
      {category && copy && photo && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`${copy.label} gallery preview`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-base/90 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Content */}
          <m.div
            className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Hero image */}
            {imageUrl && (
              <div className="relative w-full aspect-[16/9] mb-8">
                <Image
                  src={imageUrl}
                  alt={photo.altText ?? copy.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3">
              Photography
            </p>
            <h2 className="font-display text-5xl text-white mb-3">{copy.label}</h2>
            <p className="text-white/60 text-sm mb-8">{copy.tagline}</p>

            {/* View Gallery link */}
            <Link
              href="/gallery"
              onClick={() => setNavigating(true)}
              className="relative text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8A44E] border border-[#C8A44E]/30 px-8 py-3 hover:bg-[#C8A44E]/10 transition-colors flex items-center gap-3"
            >
              {navigating ? (
                <>
                  <span className="w-3 h-3 border border-[#C8A44E] border-t-transparent rounded-full animate-spin" />
                  Loading…
                </>
              ) : (
                'View Gallery'
              )}
            </Link>
          </m.div>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-colors text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A44E]"
            aria-label="Close overlay"
          >
            ✕
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
