import type { Metadata } from 'next'
import CalendlyWidget from '@/components/booking/CalendlyWidget'

export const metadata: Metadata = {
  title: 'Book a Session | ByBops',
  description: 'Schedule a photography session with Sahib Boparai.',
}

export default function BookingPage() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20">
      <h1 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
        Book a Session
      </h1>
      <p className="text-text-secondary text-sm mb-12 max-w-md">
        Pick a time that works for you. Automotive, portrait, event — let&apos;s make it happen.
      </p>

      <CalendlyWidget />
    </main>
  )
}
