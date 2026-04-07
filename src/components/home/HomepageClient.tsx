'use client'

import { useEffect, useLayoutEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CATEGORY_ORDER } from '@/lib/homepage-data'
import type { HomePageContent, Photo } from '@/lib/sanity/queries'

interface HomepageClientProps {
  homepage: HomePageContent
  photosByCategory: Record<string, Photo[]>
}

export default function HomepageClient({ photosByCategory }: HomepageClientProps) {
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis()

    const lenisRafCallback = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(lenisRafCallback)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenisRafCallback)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [reducedMotion])

  const activeCategories = CATEGORY_ORDER.filter(
    (cat) => (photosByCategory[cat] ?? []).length > 0
  )

  if (reducedMotion) {
    return (
      <main>
        <section className="min-h-screen flex items-center justify-center">
          <p>Homepage — monitor section</p>
        </section>

        {activeCategories.map((cat) => (
          <section key={cat} className="min-h-screen flex items-center justify-center">
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
      <section className="min-h-screen">
        {/* monitor stub */}
      </section>

      {activeCategories.map((cat) => (
        <section key={cat} className="min-h-screen">
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
