'use client'

export default function BookingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h2 className="font-display text-2xl text-text-primary mb-4">Something went wrong</h2>
      <p className="text-text-secondary mb-8">Could not load the booking page.</p>
      <button
        onClick={reset}
        className="border border-gold text-gold hover:bg-gold hover:text-base transition-colors duration-300 px-6 py-2 text-sm tracking-widest uppercase"
      >
        Try Again
      </button>
    </main>
  )
}
