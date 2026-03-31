import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Cormorant_Garamond } from 'next/font/google'
import MotionProvider from '@/components/motion/MotionProvider'
import PageTransition from '@/components/motion/PageTransition'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'ByBops',
  description: 'Photography by Sahib Boparai',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable} h-full antialiased bg-base`}
    >
      <body className="min-h-full flex flex-col text-text-primary">
        <MotionProvider>
          <PageTransition>{children}</PageTransition>
        </MotionProvider>
      </body>
    </html>
  )
}
