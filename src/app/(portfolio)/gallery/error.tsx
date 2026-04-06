'use client'

export default function GalleryError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-3xl text-text-primary mb-4">
        Something went wrong
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        We couldn&apos;t load the gallery. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 border border-gold text-gold text-sm uppercase tracking-widest hover:bg-gold/10 transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        Try Again
      </button>
    </main>
  )
}
