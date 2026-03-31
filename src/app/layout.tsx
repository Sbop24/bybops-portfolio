import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Cormorant_Garamond, Geist } from 'next/font/google'
import MotionProvider from '@/components/motion/MotionProvider'
import PageTransition from '@/components/motion/PageTransition'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", "bg-base", GeistSans.variable, GeistMono.variable, cormorant.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col text-text-primary">
        <MotionProvider>
          <PageTransition>{children}</PageTransition>
        </MotionProvider>
      </body>
    </html>
  )
}
