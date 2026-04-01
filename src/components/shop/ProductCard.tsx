import Image from 'next/image'
import type { ShopItemData } from '@/lib/sanity/queries'

interface ProductCardProps {
  item: ShopItemData
}

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <div className={`group ${!item.available ? 'opacity-50' : ''}`}>
      <div className="relative aspect-square overflow-hidden rounded-sm mb-3">
        <Image
          src={item.image.asset.url ?? ''}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-text-primary text-xs uppercase tracking-widest">Sold Out</span>
          </div>
        )}
      </div>
      <h3 className="text-text-primary text-sm font-light mb-1">{item.title}</h3>
      <div className="flex items-center gap-2">
        <span className="text-text-secondary text-xs uppercase">{item.type}</span>
        <span className="text-text-secondary text-xs">·</span>
        <span className="text-gold text-sm">${item.price} CAD</span>
      </div>
    </div>
  )
}
