export default function GalleryLoading() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12">
      <div className="h-12 w-48 bg-surface rounded animate-pulse mb-4" />
      <div className="h-4 w-64 bg-surface rounded animate-pulse mb-16" />

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="mb-16">
          <div className="h-8 w-32 bg-surface rounded animate-pulse mb-6" />
          <div className="flex gap-4">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="shrink-0 w-64 md:w-80 aspect-[4/3] bg-surface rounded-sm animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
