'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import type { HomePageContent } from '@/lib/sanity/queries'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

interface BookingCTAProps {
  content: HomePageContent
}

export default function BookingCTA({ content }: BookingCTAProps) {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants
  const headingLineOne = content.bookingHeadingLineOne ?? "Let's create something"
  const headingLineTwo = content.bookingHeadingLineTwo ?? 'worth remembering'
  const buttonLabel = content.bookingButtonLabel ?? 'Book a Session'

  return (
    <section className="px-6 py-20 text-center md:py-24">
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 md:gap-8"
      >
        <h2 className="font-display text-text-primary text-2xl font-light leading-snug sm:text-3xl md:text-5xl">
          {headingLineOne}
          <br />
          {headingLineTwo}
        </h2>

        <Link
          href="/booking"
          className="rounded-sm border border-gold px-8 py-3 text-xs tracking-widest text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base md:text-sm"
        >
          {buttonLabel}
        </Link>
      </m.div>
    </section>
  )
}
