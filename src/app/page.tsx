import { getFeaturedPhotos, getParallaxStrips } from '@/lib/sanity/queries'
import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import ParallaxStrip from '@/components/home/ParallaxStrip'
import AboutSnippet from '@/components/home/AboutSnippet'
import BookingCTA from '@/components/home/BookingCTA'

export default async function HomePage() {
  const [featuredPhotos, parallaxStrips] = await Promise.all([getFeaturedPhotos(), getParallaxStrips()])

  return (
    <main>
      <HeroSection />
      <FeaturedWork photos={featuredPhotos} />

      {parallaxStrips.map((strip, index) => (
        <ParallaxStrip
          key={`${strip.altText}-${index}`}
          src={strip.image.asset.url ?? 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600'}
          alt={strip.altText}
          variant={strip.variant}
          heightClass={strip.heightClass}
        />
      ))}

      <AboutSnippet />

      <BookingCTA />
    </main>
  )
}
