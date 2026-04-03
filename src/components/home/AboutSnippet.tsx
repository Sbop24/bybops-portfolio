'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function AboutSnippet() {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants

  return (
    <section className="py-8 px-6 md:py-10 md:px-12">
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-5xl"
      >
        {/* Left: portrait image — smaller aspect ratio so it doesn't dominate */}
        <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800"
            alt="Photographer with camera"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

        {/* Right: text */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-text-secondary">About</p>

          <h2 className="font-light text-text-primary text-xl md:text-2xl leading-snug">
            Eye for the quiet moment
          </h2>

          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            Based in Vancouver, BC, I work across automotive, landscape, and street photography — drawn to the details that hold still long enough to mean something.
          </p>

          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            When I&apos;m not chasing golden hour on the Sea-to-Sky, I&apos;m in the city looking for geometry in glass and concrete.
          </p>

          <Link
            href="/gallery"
            className="self-start text-sm text-text-primary tracking-wide hover:text-text-secondary transition-colors duration-200 mt-1"
          >
            View Gallery →
          </Link>
        </div>
      </m.div>
    </section>
  )
}
