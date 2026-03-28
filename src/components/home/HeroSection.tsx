'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800'

const labelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
}

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.6 } },
}

const arrowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 1.2 } },
}

const staticVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion()
  const label = prefersReduced ? staticVariants : labelVariants
  const heading = prefersReduced ? staticVariants : headingVariants
  const arrow = prefersReduced ? staticVariants : arrowVariants

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Hero background — car photography"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <m.p
          variants={label}
          initial="hidden"
          animate="visible"
          className="mb-6 text-xs uppercase tracking-widest text-muted"
        >
          Photography by Sahib Boparai
        </m.p>

        <m.h1
          variants={heading}
          initial="hidden"
          animate="visible"
          className="font-light text-accent text-5xl md:text-7xl lg:text-8xl leading-none"
        >
          Moments
          <br />
          Worth Keeping
        </m.h1>
      </div>

      {/* Scroll indicator */}
      <m.div
        variants={arrow}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-muted"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </m.div>
    </section>
  )
}
