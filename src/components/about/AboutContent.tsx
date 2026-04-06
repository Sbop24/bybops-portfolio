'use client'

import Image from 'next/image'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import type { AboutData } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'
import { FALLBACK_ABOUT_IMAGE_URL } from '@/lib/sanity/placeholders'

const FALLBACK_BODY = [
  {
    _type: 'block',
    _key: 'f1',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'f1s',
        text: 'Based in Vancouver, BC, I work across automotive, landscape, portrait, and event photography, drawn to the details that hold still long enough to mean something. Every frame starts with light and ends with patience.',
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'f2',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'f2s',
        text: "When I'm not chasing golden hour on the Sea-to-Sky, I'm in the city looking for geometry in glass and concrete. The camera changes what you notice; that is the whole point.",
      },
    ],
    markDefs: [],
  },
  {
    _type: 'block',
    _key: 'f3',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'f3s',
        text: 'I shoot for clients who care about craft, people who understand that a single well-made image is worth more than a hundred careless ones.',
      },
    ],
    markDefs: [],
  },
]

const imageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const blockVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 text-base leading-relaxed text-text-secondary md:text-lg">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-text-primary mb-4 text-2xl font-light md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-text-primary mb-3 text-xl font-light md:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-2 border-gold pl-6 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-text-primary">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
}

interface AboutContentProps {
  data: AboutData
}

export default function AboutContent({ data }: AboutContentProps) {
  const prefersReduced = useReducedMotion()
  const imgV = prefersReduced ? staticVariants : imageVariants
  const headV = prefersReduced ? staticVariants : headingVariants
  const blkV = prefersReduced ? staticVariants : blockVariants

  const imageUrl =
    getImageUrl(data.profileImage, { width: 1200, height: 1600, quality: 85 }) ??
    FALLBACK_ABOUT_IMAGE_URL
  const imageAlt = data.profileImageAlt ?? 'Sahib Boparai - photographer'
  const title = data.title ?? 'Eye for the quiet moment'
  const body = (data.body && data.body.length > 0 ? data.body : FALLBACK_BODY) as PortableTextBlock[]

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <m.div
        variants={imgV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </m.div>

      <div className="flex flex-col">
        <m.p
          variants={headV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-xs uppercase tracking-widest text-text-secondary"
        >
          About
        </m.p>

        <m.h1
          variants={headV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-text-primary mb-10 text-3xl font-light leading-snug md:text-5xl"
        >
          {title}
        </m.h1>

        <m.div
          variants={blkV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PortableText value={body} components={portableTextComponents} />
        </m.div>
      </div>
    </div>
  )
}
