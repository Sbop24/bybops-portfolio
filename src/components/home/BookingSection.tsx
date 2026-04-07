'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BOOKING_COPY } from '@/lib/homepage-data'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export default function BookingSection() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined' || window.innerWidth < 1024) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  const v = prefersReduced ? reducedMotionVariants : variants

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-16 md:px-12"
      aria-labelledby="booking-heading"
    >
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2
          id="booking-heading"
          className="font-display text-3xl md:text-5xl text-text-primary leading-tight mb-12"
        >
          {BOOKING_COPY.heading}
        </h2>

        <Link
          href={BOOKING_COPY.href}
          className="inline-block rounded-sm border border-gold px-8 py-4 text-sm tracking-widest text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          {BOOKING_COPY.button}
        </Link>
      </m.div>
    </section>
  )
}