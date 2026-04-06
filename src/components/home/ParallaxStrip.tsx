'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

type Variant = 'slide-right' | 'slide-left' | 'vertical'

interface ParallaxStripProps {
  src: string
  alt: string
  /** Animation style — slide-right, slide-left, or vertical */
  variant?: Variant
  /** Tailwind height classes, e.g. "h-[40vh] md:h-[50vh]" */
  heightClass?: string
}

export default function ParallaxStrip({
  src,
  alt,
  variant = 'slide-right',
  heightClass = 'h-[40vh] md:h-[50vh]',
}: ParallaxStripProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Horizontal: image travels dramatically across the frame for a strong editorial strip effect.
  const xRight = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-10%', '60%']
  )
  const xLeft = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['10%', '-60%']
  )
  // Vertical: classic slow-drift depth parallax
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-15%', '15%']
  )

  const isVertical = variant === 'vertical'

  const motionStyle = isVertical
    ? { y }
    : variant === 'slide-left'
    ? { x: xLeft }
    : { x: xRight }

  return (
    <section ref={ref} className={`relative ${heightClass} overflow-hidden`}>
      <m.div
        style={motionStyle}
        className={
          isVertical
            ? 'absolute w-full h-[130%] -top-[15%] left-0'
            : 'absolute inset-0 w-[120%]'
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isVertical ? '100vw' : '120vw'}
          className="object-cover object-center"
          draggable={false}
        />
      </m.div>
    </section>
  )
}
