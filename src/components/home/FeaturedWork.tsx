'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import type { Photo } from '@/lib/sanity/queries'

interface FeaturedWorkProps {
  photos: Photo[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FeaturedWork({ photos }: FeaturedWorkProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? staticVariants : containerVariants
  const card = prefersReduced ? staticVariants : cardVariants

  return (
    <section id="featured-work" className="py-12 md:py-20 px-4 md:px-12">
      <p className="mb-6 md:mb-10 text-xs uppercase tracking-widest text-text-primary">
        Selected Work
      </p>

      {/* Drag-to-scroll row — touch-action allows horizontal swipe on mobile */}
      <div
        ref={dragRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide md:overflow-hidden"
      >
        <m.div
          drag="x"
          dragConstraints={dragRef}
          dragElastic={0.1}
          style={{ touchAction: 'pan-x' }}
          className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing w-max"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {photos.map((photo) => (
            <m.div
              key={photo._id}
              variants={card}
              whileHover={prefersReduced ? {} : { boxShadow: '0 20px 40px rgba(200,164,78,0.12)' }}
              transition={{ duration: 0.3 }}
              className="group relative w-56 sm:w-72 md:w-96 shrink-0 overflow-hidden rounded-sm aspect-[3/4]"
            >
              <Image
                src={photo.image.asset.url ?? ''}
                alt={photo.altText}
                fill
                className="object-cover motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-out motion-safe:group-hover:scale-105"
                sizes="(max-width: 480px) 224px, (max-width: 768px) 288px, 384px"
                draggable={false}
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Gold gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(200,164,78,0.15)] to-transparent opacity-0 motion-safe:transition-opacity motion-safe:duration-400 motion-safe:group-hover:opacity-100 pointer-events-none" />

              {/* Card text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-text-primary font-light text-lg md:text-xl mb-1">{photo.title}</h3>
                <p className="text-text-secondary text-xs md:text-sm leading-snug">{photo.category}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
