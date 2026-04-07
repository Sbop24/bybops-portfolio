'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CATEGORY_ORDER, HERO_COPY, SCROLL_STAGES } from '@/lib/homepage-data'
import { getImageUrl } from '@/lib/sanity/image'
import type { HomePageContent, Photo } from '@/lib/sanity/queries'
import MonitorFrame from './MonitorFrame'
import HUDMenu from './HUDMenu'

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
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis()

    const lenisRafCallback = (time: number) => lenis.raf(time)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(lenisRafCallback)

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const ctx = gsap.context(() => {
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
            scale: 3.5,
            duration: 1,
            ease: 'none',
          }, 0.35)
          .to('.monitor-bezel, .monitor-stand, .monitor-glow', {
            opacity: 0,
            duration: 0.4,
            ease: 'none',
          }, 0.35)
          .to('.monitor-bezel', {
            borderRadius: 0,
            duration: 0.3,
            ease: 'none',
          }, 0.7)
      }, monitorRef)

      ctxRef.current = ctx
    }

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenisRafCallback)
      ctxRef.current?.revert()
    }
  }, [reducedMotion])

  // Suppress unused warning — will be used when category scroll tracking is wired up
  void setActiveCategoryIndex

  const activeCategories = CATEGORY_ORDER.filter(
    (cat) => (photosByCategory[cat] ?? []).length > 0
  )

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

        {activeCategories.map((cat) => (
          <section
            key={cat}
            className="min-h-screen flex items-center justify-center"
          >
            <p>{cat} — category section</p>
          </section>
        ))}

        <section className="min-h-screen flex items-center justify-center">
          <p>Testimonials section</p>
        </section>

        <section className="min-h-screen flex items-center justify-center">
          <p>Booking section</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Monitor section — pinned, GSAP zoom */}
      <section
        id="monitor-section"
        className="min-h-screen"
      >
        <div
          id="monitor-wrapper"
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        >
          <MonitorFrame ref={monitorRef}>
            {heroScreenContent}
            {/* HUD overlay */}
            <HUDMenu activeCategoryIndex={activeCategoryIndex} />
          </MonitorFrame>
        </div>
      </section>

      <div id="categories-section" />
      {activeCategories.map((cat) => (
        <section
          key={cat}
          className="min-h-screen"
        >
          {/* {cat} category stub */}
        </section>
      ))}

      <section className="min-h-screen">
        {/* testimonials stub */}
      </section>

      <section className="min-h-screen">
        {/* booking stub */}
      </section>
    </main>
  )
}
