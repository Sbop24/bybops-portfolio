import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import AboutSnippet from '@/components/home/AboutSnippet'

const featuredProjects = [
  {
    _id: '1',
    title: 'Pursuit',
    slug: { current: 'pursuit' },
    summary: 'A series on machines in motion — the art of the chase.',
    coverImage: {
      alt: 'Sports car on track',
      image: { asset: { url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800' } },
    },
  },
  {
    _id: '2',
    title: 'Iron & Speed',
    slug: { current: 'iron-and-speed' },
    summary: 'Classic automotive forms captured at golden hour.',
    coverImage: {
      alt: 'Classic car in profile',
      image: { asset: { url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' } },
    },
  },
  {
    _id: '3',
    title: 'Wild Light',
    slug: { current: 'wild-light' },
    summary: 'Landscapes at the edge of day — where light becomes subject.',
    coverImage: {
      alt: 'Mountain landscape at dawn',
      image: { asset: { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800' } },
    },
  },
  {
    _id: '4',
    title: 'Grid & Glass',
    slug: { current: 'grid-and-glass' },
    summary: 'Urban geometry and the texture of city life after dark.',
    coverImage: {
      alt: 'City skyline at night',
      image: { asset: { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800' } },
    },
  },
]

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedWork projects={featuredProjects} />
      <AboutSnippet />
    </main>
  )
}
