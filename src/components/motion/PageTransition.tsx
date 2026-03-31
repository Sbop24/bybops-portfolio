'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, m } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
