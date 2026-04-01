export default function AboutLoading() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        {/* Image skeleton */}
        <div className="w-full aspect-[3/4] rounded-sm bg-surface animate-pulse" />

        {/* Text skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-3 w-16 bg-surface animate-pulse rounded" />
          <div className="h-10 w-3/4 bg-surface animate-pulse rounded" />
          <div className="h-10 w-1/2 bg-surface animate-pulse rounded mb-6" />
          <div className="h-4 w-full bg-surface animate-pulse rounded" />
          <div className="h-4 w-full bg-surface animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-surface animate-pulse rounded" />
          <div className="h-4 w-full bg-surface animate-pulse rounded mt-4" />
          <div className="h-4 w-4/5 bg-surface animate-pulse rounded" />
        </div>
      </div>
    </main>
  )
}
