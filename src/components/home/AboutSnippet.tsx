'use client'

import { m, useReducedMotion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const staticVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutSnippet() {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants

  return (
    <section className="py-24 px-6 md:px-12 max-w-2xl">
      <m.p
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-4 text-xs uppercase tracking-widest text-muted"
      >
        About
      </m.p>

      <m.p
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-accent font-light text-2xl md:text-3xl leading-relaxed"
      >
        I photograph the details others walk past — machines, landscapes, and the geometry of everyday life.
      </m.p>
    </section>
  )
}
