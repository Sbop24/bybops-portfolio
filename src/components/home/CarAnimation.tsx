'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export default function CarAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-10%', '60%'])

  return (
    <section ref={ref} className="relative h-[40vh] overflow-hidden">
      <m.div style={{ x }} className="absolute inset-0 w-[120%]">
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600"
          alt="Car in motion"
          fill
          sizes="120vw"
          className="object-cover object-center"
        />
      </m.div>
    </section>
  )
}
