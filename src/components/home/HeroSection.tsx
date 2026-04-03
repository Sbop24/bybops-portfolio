'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'

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

export default function HeroSection() {
  const prefersReduced = useReducedMotion()
  const label = prefersReduced ? staticVariants : labelVariants
  const heading = prefersReduced ? staticVariants : headingVariants
  const arrow = prefersReduced ? staticVariants : arrowVariants

  const scrollToWork = () =>
    document.getElementById('featured-work')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    })

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Hero background — car photography"
        fill
        priority
        className="object-cover object-center"
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
          className="mb-4 text-[10px] md:mb-6 md:text-xs uppercase tracking-widest text-text-secondary"
        >
          Photography by Sahib Boparai
        </m.p>

        <m.h1
          variants={heading}
          initial="hidden"
          animate="visible"
          className="font-light text-text-primary text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none"
        >
          Moments
          <br />
          Worth Keeping
        </m.h1>
      </div>

      {/* Scroll CTA */}
      <m.button
        variants={arrow}
        initial="hidden"
        animate="visible"
        onClick={scrollToWork}
        aria-label="Scroll to selected work"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
      >
        <m.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={prefersReduced ? {} : { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-gold"
          >
            <path d="M4 7l6 6 6-6" />
          </svg>
        </m.div>
        <span className="text-[10px] uppercase tracking-widest text-text-secondary">
          Scroll
        </span>
      </m.button>
    </section>
  )
}
