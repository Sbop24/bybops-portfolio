'use client'
import { m } from 'framer-motion'
import { CATEGORY_ORDER } from '@/lib/homepage-data'

interface HUDMenuProps {
  activeCategoryIndex: number
}

const bracketClass = 'absolute w-4 h-4 border-[#C8A44E]/20'
const textClass = 'text-[10px] uppercase tracking-[0.3em] font-mono text-white/30'
const goldTextClass = 'text-[10px] uppercase tracking-[0.3em] font-mono text-[#C8A44E]'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export default function HUDMenu({ activeCategoryIndex }: HUDMenuProps) {
  return (
    <m.div
      className="absolute inset-0 pointer-events-none select-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Corner brackets */}
      <m.div variants={itemVariants} className={`${bracketClass} top-3 left-3 border-t border-l`} aria-hidden="true" />
      <m.div variants={itemVariants} className={`${bracketClass} top-3 right-3 border-t border-r`} aria-hidden="true" />
      <m.div variants={itemVariants} className={`${bracketClass} bottom-3 left-3 border-b border-l`} aria-hidden="true" />
      <m.div variants={itemVariants} className={`${bracketClass} bottom-3 right-3 border-b border-r`} aria-hidden="true" />

      {/* Top center — brand */}
      <m.div variants={itemVariants} className="absolute top-4 left-0 right-0 flex justify-center">
        <span className={textClass}>BYBOPS.CA</span>
      </m.div>

      {/* Left side — category list */}
      <m.div variants={itemVariants} className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {CATEGORY_ORDER.map((cat, i) => (
          <span
            key={cat}
            className={i === activeCategoryIndex ? goldTextClass : textClass}
          >
            {String(i + 1).padStart(2, '0')} {cat}
          </span>
        ))}
      </m.div>

      {/* Bottom right — scroll indicator */}
      <m.div variants={itemVariants} className="absolute bottom-5 right-6 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A44E] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A44E]" />
        </span>
        <span className={textClass}>Scroll to explore</span>
      </m.div>
    </m.div>
  )
}
