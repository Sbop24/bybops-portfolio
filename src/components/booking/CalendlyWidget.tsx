'use client'

import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function CalendlyWidget() {
  const prefersReduced = useReducedMotion()
  const v = prefersReduced ? staticVariants : variants
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  if (!calendlyUrl) {
    return (
      <m.div
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="border border-border rounded-sm p-12 text-center"
      >
        <p className="text-text-secondary text-sm mb-2">Booking calendar coming soon.</p>
        <p className="text-text-secondary text-xs">
          In the meantime, reach out directly to schedule a session.
        </p>
      </m.div>
    )
  }

  return (
    <m.div
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full"
    >
      <iframe
        src={calendlyUrl}
        title="Book a session"
        className="w-full border-0 rounded-sm bg-surface"
        style={{ minHeight: '700px' }}
        loading="lazy"
      />
    </m.div>
  )
}
