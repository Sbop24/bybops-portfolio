import { getHomePageContent, getPhotosByCategory } from '@/lib/sanity/queries'
import HomepageClient from '@/components/home/HomepageClient'

export default async function HomePage() {
  const [homePageContent, photosByCategory] = await Promise.all([
    getHomePageContent(),
    getPhotosByCategory(),
  ])
  return <HomepageClient homepage={homePageContent} photosByCategory={photosByCategory} />
}
