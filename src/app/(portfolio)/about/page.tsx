import type { Metadata } from 'next'
import { getAbout } from '@/lib/sanity/queries'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About | ByBops',
  description: 'The story behind the lens — Sahib Boparai, Vancouver-based photographer.',
}

export default async function AboutPage() {
  const about = await getAbout()

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20">
      <AboutContent data={about} />
    </main>
  )
}
