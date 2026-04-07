'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { CategoryKey, CATEGORY_COPY } from '@/lib/homepage-data'
import type { Photo } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

interface CategoryRevealProps {
  category: CategoryKey
  index: number
  photo: Photo
  onExpand: () => void
  reducedMotion: boolean
}

export default function CategoryReveal({
  category,
  index,
  photo,
  onExpand,
  reducedMotion,
}: CategoryRevealProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const { label, tagline } = CATEGORY_COPY[category]
  const imageUrl = getImageUrl(photo.image)

  // GSAP wiring is handled in HomepageClient — this component just provides the DOM structure
  // The frame starts small and expands via GSAP scrub

  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        data-category={category}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <button
          type="button"
          onClick={onExpand}
          className="relative w-full max-w-3xl aspect-[16/9] group cursor-pointer active:scale-[0.98] transition-transform"
          aria-label={`View ${label} gallery`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={photo.altText ?? label}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-4 left-4 text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-1">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="font-display text-3xl text-white">{label}</h2>
            <p className="text-sm text-white/60 mt-1">{tagline}</p>
          </div>
        </button>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      data-category={category}
      className="min-h-screen flex items-center justify-center relative"
      id={`category-${category.toLowerCase()}`}
    >
      {/* The expanding frame — starts contained, GSAP expands it */}
      <div
        ref={frameRef}
        data-frame={category}
        className="relative overflow-hidden cursor-pointer group"
        style={{
          width: '40%',
          height: '50vh',
          boxShadow: 'inset 0 0 0 1px rgba(200, 164, 78, 0.2)',
        }}
        onClick={onExpand}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onExpand()
        }}
        aria-label={`Explore ${label} — click to view gallery`}
      >
        {/* Category photo */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={photo.altText ?? label}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover scale-[1.15] group-hover:scale-[1.05] transition-transform duration-700"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Category info — fades in during GSAP expand */}
        <m.div
          className="absolute bottom-6 left-6 pointer-events-none"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-1">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-none">{label}</h2>
          <p className="text-sm text-white/60 mt-2">{tagline}</p>
        </m.div>

        {/* "View Gallery" hover hint — bottom right */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8A44E]">
            View Gallery →
          </span>
        </div>
      </div>
    </section>
  )
}
