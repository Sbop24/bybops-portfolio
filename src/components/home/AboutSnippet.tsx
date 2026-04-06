'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import { getImageUrl } from '@/lib/sanity/image'
import type { AboutData } from '@/lib/sanity/queries'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800'
const FALLBACK_PARAGRAPHS = [
  'Based in Vancouver, BC, I work across automotive, landscape, and street photography, drawn to the details that hold still long enough to mean something.',
  "When I'm not chasing golden hour on the Sea-to-Sky, I'm in the city looking for geometry in glass and concrete.",
]

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

interface PortableTextChild {
  _type?: string
  text?: string
}

interface PortableTextBlockLike {
  _type?: string
  style?: string
  children?: PortableTextChild[]
}

interface AboutSnippetProps {
  about: AboutData
}

function extractParagraphs(body: unknown[] | null) {
  const blocks = (body ?? []) as PortableTextBlockLike[]
  const paragraphs = blocks
    .filter((block) => block._type === 'block' && (!block.style || block.style === 'normal'))
    .map((block) =>
      (block.children ?? [])
        .filter((child) => child._type === 'span' && child.text)
        .map((child) => child.text?.trim() ?? '')
        .join('')
        .trim()
    )
    .filter(Boolean)

  return paragraphs.length > 0 ? paragraphs.slice(0, 2) : FALLBACK_PARAGRAPHS
}

export default function AboutSnippet({ about }: AboutSnippetProps) {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants
  const imageUrl = getImageUrl(about.profileImage, { width: 900, height: 675, quality: 85 }) ?? FALLBACK_IMAGE
  const imageAlt = about.profileImageAlt ?? 'Sahib Boparai - photographer'
  const title = about.title ?? 'Eye for the quiet moment'
  const paragraphs = extractParagraphs(about.body)

  return (
    <section className="px-6 py-8 md:px-12 md:py-10">
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm md:aspect-[3/2]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest text-text-secondary">About</p>

          <h2 className="text-text-primary text-xl font-light leading-snug md:text-2xl">
            {title}
          </h2>

          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph}-${index}`} className="text-xs leading-relaxed text-text-secondary md:text-sm">
              {paragraph}
            </p>
          ))}

          <Link
            href="/about"
            className="mt-1 self-start rounded-sm text-sm tracking-wide text-text-primary transition-colors duration-200 hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Read More {'->'}
          </Link>
        </div>
      </m.div>
    </section>
  )
}
