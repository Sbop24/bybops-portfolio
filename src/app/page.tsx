import { getAbout, getFeaturedPhotos, getHomePageContent } from '@/lib/sanity/queries'
import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import ParallaxStrip from '@/components/home/ParallaxStrip'
import AboutSnippet from '@/components/home/AboutSnippet'
import BookingCTA from '@/components/home/BookingCTA'
import { getImageUrl } from '@/lib/sanity/image'

export default async function HomePage() {
  const [featuredPhotos, homePageContent, about] = await Promise.all([
    getFeaturedPhotos(),
    getHomePageContent(),
    getAbout(),
  ])

  return (
    <main>
      <HeroSection content={homePageContent} />
      <FeaturedWork photos={featuredPhotos} />

      {homePageContent.parallaxStrips.map((strip, index) => (
        <ParallaxStrip
          key={`${strip.altText}-${index}`}
          src={getImageUrl(strip.image, { width: 2000, quality: 85 }) ?? 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600'}
          alt={strip.altText}
          variant={strip.variant}
          heightClass={strip.heightClass}
        />
      ))}

      <AboutSnippet about={about} />

      <BookingCTA content={homePageContent} />
    </main>
  )
}
