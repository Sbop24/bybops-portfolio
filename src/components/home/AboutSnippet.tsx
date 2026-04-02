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
    <section className="py-14 px-6 md:px-12">
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Left: portrait image */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800"
            alt="Photographer with camera"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: text */}
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-text-secondary">About</p>

          <h2 className="font-light text-text-primary text-2xl md:text-3xl leading-snug">
            Eye for the quiet moment
          </h2>

          <p className="text-sm text-text-secondary leading-relaxed">
            Based in Vancouver, BC, I work across automotive, landscape, and street photography — drawn to the details that hold still long enough to mean something. Every frame starts with light and ends with patience.
          </p>

          <p className="text-sm text-text-secondary leading-relaxed">
            When I&apos;m not chasing golden hour on the Sea-to-Sky, I&apos;m in the city looking for geometry in glass and concrete. The camera changes what you notice — that&apos;s the whole point.
          </p>

          <Link
            href="/gallery"
            className="self-start text-sm text-text-primary tracking-wide hover:text-text-secondary transition-colors duration-200"
          >
            View Gallery →
          </Link>
        </div>
      </m.div>
    </section>
  )
}
