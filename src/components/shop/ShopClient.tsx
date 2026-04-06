'use client'

import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { staticVariants } from '@/lib/motion'
import type { ShopItemData } from '@/lib/sanity/queries'
import ProductCard from './ProductCard'

const FILTERS = ['All', 'Presets', 'Prints'] as const
type Filter = (typeof FILTERS)[number]

interface ShopClientProps {
  items: ShopItemData[]
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ShopClient({ items }: ShopClientProps) {
  const [filter, setFilter] = useState<Filter>('All')
  const prefersReduced = useReducedMotion()

  const filtered = items.filter((item) => {
    if (filter === 'All') return true
    if (filter === 'Presets') return item.type === 'preset'
    return item.type === 'print'
  })

  const container = prefersReduced ? staticVariants : containerVariants
  const card = prefersReduced ? staticVariants : cardVariants

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-6 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm tracking-widest uppercase transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
              filter === f ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <m.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
      >
        {filtered.map((item) => (
          <m.div key={item._id} variants={card}>
            <ProductCard item={item} />
          </m.div>
        ))}
      </m.div>

      {filtered.length === 0 && (
        <p className="text-text-secondary text-sm text-center py-12">
          No items in this category yet.
        </p>
      )}
    </>
  )
}
