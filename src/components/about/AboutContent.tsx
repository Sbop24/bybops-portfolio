'use client'

import Image from 'next/image'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import type { AboutData } from '@/lib/sanity/queries'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800'

const FALLBACK_BODY = [
  {
    _type: 'block',
    _key: 'f1',
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: 'f1s',
        text: 'Based in Vancouver, BC, I work across automotive, landscape, portrait, and event photography — drawn to the details that hold still long enough to mean something. Every frame starts with light and ends with patience.',
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
        text: "When I'm not chasing golden hour on the Sea-to-Sky, I'm in the city looking for geometry in glass and concrete. The camera changes what you notice — that's the whole point.",
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
        text: 'I shoot for clients who care about craft — people who understand that a single well-made image is worth more than a hundred careless ones.',
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
      <p className="text-text-secondary leading-relaxed text-base md:text-lg mb-6">
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display font-light text-text-primary text-2xl md:text-3xl mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display font-light text-text-primary text-xl md:text-2xl mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-8 text-text-secondary italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-text-primary font-medium">{children}</strong>
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

  const imageUrl = data.profileImage?.asset?.url ?? PLACEHOLDER_IMAGE
  const body = (data.body && data.body.length > 0 ? data.body : FALLBACK_BODY) as PortableTextBlock[]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
      {/* Left: sticky profile image */}
      <m.div
        variants={imgV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
          <Image
            src={imageUrl}
            alt="Sahib Boparai — photographer"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </m.div>

      {/* Right: text content */}
      <div className="flex flex-col">
        <m.p
          variants={headV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-text-secondary mb-4"
        >
          About
        </m.p>

        <m.h1
          variants={headV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-light text-text-primary text-3xl md:text-5xl leading-snug mb-10"
        >
          Eye for the quiet moment
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
