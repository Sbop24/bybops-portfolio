'use client'

import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import { getImageUrl } from '@/lib/sanity/image'
import type { HomePageContent } from '@/lib/sanity/queries'

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

interface HeroSectionProps {
  content: HomePageContent
}

export default function HeroSection({ content }: HeroSectionProps) {
  const prefersReduced = useReducedMotion()
  const label = prefersReduced ? staticVariants : labelVariants
  const heading = prefersReduced ? staticVariants : headingVariants
  const arrow = prefersReduced ? staticVariants : arrowVariants
  const heroImageUrl = getImageUrl(content.heroImage, { width: 1800, quality: 85 }) ?? HERO_IMAGE
  const heroAltText = content.heroAltText ?? 'Hero background - car photography'
  const heroLabel = content.heroLabel ?? 'Photography by Sahib Boparai'
  const heroHeadingLineOne = content.heroHeadingLineOne ?? 'Moments'
  const heroHeadingLineTwo = content.heroHeadingLineTwo ?? 'Worth Keeping'

  const scrollToWork = () =>
    document.getElementById('featured-work')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    })

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <Image
        src={heroImageUrl}
        alt={heroAltText}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <m.p
          variants={label}
          initial="hidden"
          animate="visible"
          className="mb-4 text-[10px] uppercase tracking-widest text-text-secondary md:mb-6 md:text-xs"
        >
          {heroLabel}
        </m.p>

        <m.h1
          variants={heading}
          initial="hidden"
          animate="visible"
          className="font-light text-text-primary text-4xl leading-none sm:text-5xl md:text-7xl lg:text-8xl"
        >
          {heroHeadingLineOne}
          <br />
          {heroHeadingLineTwo}
        </m.h1>
      </div>

      <m.button
        variants={arrow}
        initial="hidden"
        animate="visible"
        onClick={scrollToWork}
        aria-label="Scroll to selected work"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
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
