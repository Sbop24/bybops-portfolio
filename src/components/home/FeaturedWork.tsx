'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'

interface CoverImage {
  alt: string
  image: { asset: { url: string } }
}

interface Project {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  coverImage: CoverImage
}

interface FeaturedWorkProps {
  projects: Project[]
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

const staticVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? staticVariants : containerVariants
  const card = prefersReduced ? staticVariants : cardVariants

  return (
    <section className="py-20 px-6 md:px-12">
      <p className="mb-10 text-xs uppercase tracking-widest text-accent">Selected Work</p>

      {/* Drag-to-scroll row */}
      <div ref={dragRef} className="overflow-hidden">
        <m.div
          drag="x"
          dragConstraints={dragRef}
          dragElastic={0.1}
          className="flex gap-6 cursor-grab active:cursor-grabbing w-max"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <m.div
              key={project._id}
              variants={card}
              whileHover={prefersReduced ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-72 md:w-96 shrink-0 overflow-hidden rounded-sm"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={project.coverImage.image.asset.url}
                alt={project.coverImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 384px"
                draggable={false}
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Card text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-accent font-light text-xl mb-1">{project.title}</h3>
                <p className="text-muted text-sm leading-snug line-clamp-2">{project.summary}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
