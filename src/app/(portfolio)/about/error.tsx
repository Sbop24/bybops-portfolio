'use client'

export default function AboutError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h2 className="font-display text-2xl text-text-primary mb-4">Something went wrong</h2>
      <p className="text-text-secondary mb-8">Could not load the about page.</p>
      <button
        onClick={reset}
        className="border border-gold text-gold hover:bg-gold hover:text-base transition-colors duration-300 px-6 py-2 text-sm tracking-widest uppercase rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        Try Again
      </button>
    </main>
  )
}
