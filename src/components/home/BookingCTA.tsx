'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function BookingCTA() {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants

  return (
    <section className="py-24 px-6 text-center">
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-8"
      >
        <h2 className="font-display font-light text-text-primary text-3xl md:text-5xl leading-snug">
          Let&apos;s create something
          <br />
          worth remembering
        </h2>

        <Link
          href="/booking"
          className="border border-gold text-gold hover:bg-gold hover:text-base transition-colors duration-300 px-8 py-3 text-sm tracking-widest uppercase"
        >
          Book a Session
        </Link>
      </m.div>
    </section>
  )
}
