'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? undefined : { opacity: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
