import Image from 'next/image'
import type { Photo } from '@/lib/sanity/queries'

interface CategoryRowProps {
  category: string
  photos: Photo[]
  onOpen: () => void
}

export default function CategoryRow({ category, photos, onOpen }: CategoryRowProps) {
  if (photos.length === 0) return null

  return (
    <section className="mb-16">
      <button
        onClick={onOpen}
        className="group mb-6 flex items-baseline gap-4 cursor-pointer"
      >
        <h2 className="font-display text-3xl md:text-4xl text-text-primary">
          {category}
        </h2>
        <span className="text-sm text-text-secondary group-hover:text-gold transition-colors duration-200">
          View All &rarr;
        </span>
      </button>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {photos.slice(0, 6).map((photo) => (
          <button
            key={photo._id}
            onClick={onOpen}
            className="relative shrink-0 w-64 md:w-80 aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group/card"
          >
            <Image
              src={photo.image.asset.url ?? ''}
              alt={photo.altText}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              sizes="(max-width: 768px) 256px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
              <p className="text-text-primary text-sm font-light">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
