import type { Metadata } from 'next'
import { getShopItems } from '@/lib/sanity/queries'
import ShopClient from '@/components/shop/ShopClient'

export const metadata: Metadata = {
  title: 'Shop | ByBops',
  description: 'Presets and prints by Sahib Boparai.',
  robots: { index: false, follow: false },
}

export default async function ShopPage() {
  const items = await getShopItems()

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20">
      <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
        Shop
      </h1>
      <p className="text-text-secondary text-sm mb-12 max-w-md">
        Curated presets and limited-edition prints.
      </p>

      <ShopClient items={items} />
    </main>
  )
}
