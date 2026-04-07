'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CATEGORY_ORDER } from '@/lib/homepage-data'
import type { HomePageContent, Photo } from '@/lib/sanity/queries'

// Register GSAP ScrollTrigger plugin at module level to avoid SSR warnings
gsap.registerPlugin(ScrollTrigger)

interface HomepageClientProps {
  homepage: HomePageContent
  photosByCategory: Record<string, Photo[]>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HomepageClient({ homepage, photosByCategory }: HomepageClientProps) {
  const reducedMotion = useReducedMotion()

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
