'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'

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

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? staticVariants : containerVariants
  const card = prefersReduced ? staticVariants : cardVariants

  return (
    <section className="py-20 px-6 md:px-12">
      <p className="mb-10 text-xs uppercase tracking-widest text-text-primary">Selected Work</p>

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
            <Link key={project._id} href={`/projects/${project.slug.current}`}>
              <m.div
                variants={card}
                whileHover={prefersReduced ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-72 md:w-96 shrink-0 overflow-hidden rounded-sm aspect-[3/4]"
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
                  <h3 className="text-text-primary font-light text-xl mb-1">{project.title}</h3>
                  <p className="text-text-secondary text-sm leading-snug line-clamp-2">{project.summary}</p>
                </div>
              </m.div>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  )
}
