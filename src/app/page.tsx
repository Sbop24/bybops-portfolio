import { getFeaturedPhotos } from '@/lib/sanity/queries'
import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import CarAnimation from '@/components/home/CarAnimation'
import AboutSnippet from '@/components/home/AboutSnippet'
import BookingCTA from '@/components/home/BookingCTA'

export default async function HomePage() {
  const featuredPhotos = await getFeaturedPhotos()
  return (
    <main>
      <HeroSection />
      <FeaturedWork photos={featuredPhotos} />
      <CarAnimation />
      <AboutSnippet />
      <BookingCTA />
    </main>
  )
}
