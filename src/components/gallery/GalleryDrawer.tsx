'use client'

import { useEffect, useCallback, useId, useRef } from 'react'
import Image from 'next/image'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Photo } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

interface GalleryDrawerProps {
  category: string | null
  photos: Photo[]
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 300 } },
  exit: { x: '100%', transition: { duration: 0.3 } },
}

export default function GalleryDrawer({ category, photos, onClose }: GalleryDrawerProps) {
  const prefersReduced = useReducedMotion()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  const getFocusableElements = useCallback(() => {
    if (!panelRef.current) return []

    return Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null)
  }, [])

  useEffect(() => {
    if (!category) return

    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ''
      lastFocusedElementRef.current?.focus()
    }
  }, [category])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()

      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    },
    [getFocusableElements, onClose],
  )

  useEffect(() => {
    if (category) {
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [category, handleKey])

  return (
    <AnimatePresence>
      {category && (
        <>
          {/* Backdrop */}
          <m.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <m.div
            ref={panelRef}
            variants={prefersReduced ? undefined : panelVariants}
            initial={prefersReduced ? { opacity: 0 } : 'hidden'}
            animate={prefersReduced ? { opacity: 1 } : 'visible'}
            exit={prefersReduced ? { opacity: 0 } : 'exit'}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-[85vw] lg:w-[70vw] bg-base overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10 bg-base/95 backdrop-blur-md border-b border-border">
              <h2 id={titleId} className="font-display text-2xl md:text-3xl text-text-primary">
                {category}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 p-2"
                aria-label="Close drawer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6 md:p-10">
              {photos.map((photo, i) => (
                <m.div
                  key={photo._id}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.08 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm group"
                >
                  <Image
                    src={getImageUrl(photo.image, { width: 800, height: 600, quality: 70 }) ?? ''}
                    alt={photo.altText}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-text-primary text-sm font-light">{photo.title}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
