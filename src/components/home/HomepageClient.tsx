'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CATEGORY_ORDER, HERO_COPY, SCROLL_STAGES, type CategoryKey } from '@/lib/homepage-data'
import { getImageUrl } from '@/lib/sanity/image'
import type { HomePageContent, Photo } from '@/lib/sanity/queries'
import MonitorFrame from './MonitorFrame'
import HUDMenu from './HUDMenu'
import CategoryReveal from './CategoryReveal'
import CategoryOverlay from './CategoryOverlay'
import TestimonialsSection from './TestimonialsSection'
import BookingSection from './BookingSection'

// Register GSAP ScrollTrigger plugin at module level to avoid SSR warnings
gsap.registerPlugin(ScrollTrigger)

interface HomepageClientProps {
  homepage: HomePageContent
  photosByCategory: Record<string, Photo[]>
}

export default function HomepageClient({ homepage, photosByCategory }: HomepageClientProps) {
  const reducedMotion = useReducedMotion()
  const monitorRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [overlayCategory, setOverlayCategory] = useState<string | null>(null)

  // Pause/resume Lenis when overlay opens or closes
  useEffect(() => {
    if (overlayCategory) {
      lenisRef.current?.stop()
    } else {
      lenisRef.current?.start()
    }
  }, [overlayCategory])

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis()
    lenisRef.current = lenis

    const lenisRafCallback = (time: number) => lenis.raf(time)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(lenisRafCallback)

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      // Document-scoped context so category frames (outside monitorRef) are reachable
      const ctx = gsap.context(() => {
        // Set initial state — monitor starts small / distant
        gsap.set('#monitor-wrapper', { scale: 0.62, transformOrigin: 'center center' })

        // Monitor zoom timeline
        const monitorTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#monitor-section',
            start: 'top top',
            end: `+=${SCROLL_STAGES.monitor}`,
            pin: true,
            scrub: 1,
          },
        })

        monitorTl
          .to('#monitor-wrapper', {
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          }, 0)
          .to('.monitor-bezel, .monitor-stand, .monitor-glow', {
            opacity: 0,
            duration: 0.3,
            ease: 'power1.in',
          }, 0.68)
          .to('.monitor-bezel', {
            borderRadius: 0,
            duration: 0.25,
            ease: 'none',
          }, 0.75)

        // Category expanding frames
        const activeCategories = CATEGORY_ORDER.filter(
          (cat) => (photosByCategory[cat] ?? []).length > 0
        )

        activeCategories.forEach((cat) => {
          const frame = document.querySelector(`[data-frame="${cat}"]`)
          if (!frame) return

          gsap.timeline({
            scrollTrigger: {
              trigger: `#category-${cat.toLowerCase()}`,
              start: 'top top',
              end: `+=${SCROLL_STAGES.categoryEach}`,
              pin: true,
              scrub: 1,
            },
          }).fromTo(
            frame,
            { width: '40%', height: '50vh' },
            { width: '92%', height: '88vh', duration: 1, ease: 'none' },
            0.25
          )
        })
      })

      ctxRef.current = ctx
    }

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(lenisRafCallback)
      ctxRef.current?.revert()
    }
  }, [reducedMotion, photosByCategory])

  // Suppress unused warning — will be used when category scroll tracking is wired up
  void setActiveCategoryIndex

  const activeCategories = CATEGORY_ORDER.filter(
    (cat) => (photosByCategory[cat] ?? []).length > 0
  )

  const overlayPhoto = overlayCategory
    ? (photosByCategory[overlayCategory]?.[0] ?? null)
    : null

  const heroImageUrl = getImageUrl(homepage.heroImage)

  const heroScreenContent = (
    <div className="relative w-full h-full">
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={homepage.heroAltText ?? 'ByBops hero'}
          fill
          priority
          sizes="(max-width: 768px) 95vw, 85vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          onLoad={() => {
            if (typeof window !== 'undefined') {
              import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => {
                ST.refresh()
              }).catch(() => {})
            }
          }}
        />
      ) : (
        <div className="w-full h-full bg-[#111]" />
      )}

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero copy — centered in screen */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4 leading-tight">
          {HERO_COPY.headline}
        </h1>
        <p className="text-white/70 text-sm md:text-base max-w-md mb-8">
          {HERO_COPY.subheadline}
        </p>
        <button
          type="button"
          onClick={() => {
            document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#C8A44E] border border-[#C8A44E]/30 px-6 py-3 hover:bg-[#C8A44E]/10 transition-colors"
        >
          {HERO_COPY.cta}
        </button>
      </div>
    </div>
  )

  if (reducedMotion) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center">
          <MonitorFrame>
            {heroScreenContent}
          </MonitorFrame>
        </section>

        <div id="categories-section-reduced">
          {activeCategories.map((cat, i) => (
            <CategoryReveal
              key={cat}
              category={cat}
              index={i}
              photo={photosByCategory[cat][0]}
              onExpand={() => setOverlayCategory(cat)}
              reducedMotion={true}
            />
          ))}
        </div>

        <TestimonialsSection />

        <BookingSection />

        <CategoryOverlay
          category={overlayCategory as CategoryKey | null}
          photo={overlayPhoto}
          onClose={() => setOverlayCategory(null)}
        />
      </main>
    )
  }

  return (
    <main>
      {/* Monitor section — GSAP pins this entire section; inner wrapper must NOT be sticky */}
      <section
        id="monitor-section"
        className="min-h-[100dvh]"
      >
        <div
          id="monitor-wrapper"
          className="h-[100dvh] flex items-center justify-center"
        >
          <MonitorFrame ref={monitorRef}>
            {heroScreenContent}
            {/* HUD overlay */}
            <HUDMenu activeCategoryIndex={activeCategoryIndex} />
          </MonitorFrame>
        </div>
      </section>

      {/* Categories section */}
      <div id="categories-section">
        {activeCategories.map((cat, i) => (
          <CategoryReveal
            key={cat}
            category={cat}
            index={i}
            photo={photosByCategory[cat][0]}
            onExpand={() => setOverlayCategory(cat)}
            reducedMotion={false}
          />
        ))}
      </div>

      <TestimonialsSection />

      <BookingSection />

      <CategoryOverlay
        category={overlayCategory as CategoryKey | null}
        photo={overlayPhoto}
        onClose={() => setOverlayCategory(null)}
      />
    </main>
  )
}
