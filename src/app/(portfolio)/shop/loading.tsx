export default function ShopLoading() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-20">
      <div className="h-10 w-32 bg-surface animate-pulse rounded mb-4" />
      <div className="h-4 w-64 bg-surface animate-pulse rounded mb-12" />
      <div className="flex gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-16 bg-surface animate-pulse rounded" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <div className="aspect-square bg-surface animate-pulse rounded-sm mb-3" />
            <div className="h-4 w-24 bg-surface animate-pulse rounded mb-2" />
            <div className="h-3 w-20 bg-surface animate-pulse rounded" />
          </div>
        ))}
      </div>
    </main>
  )
}
