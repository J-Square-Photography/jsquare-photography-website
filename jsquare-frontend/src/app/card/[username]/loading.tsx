export default function CardLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto">
        {/* Cover image skeleton */}
        <div className="h-48 bg-gray-200 animate-pulse" />

        {/* Profile photo skeleton */}
        <div className="flex justify-center -mt-16">
          <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse border-4 border-white" />
        </div>

        {/* Content skeleton */}
        <div className="px-6 pt-4 space-y-6">
          <div className="text-center space-y-2">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-40 mx-auto" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-32 mx-auto" />
          </div>
          <div className="h-16 bg-gray-200 animate-pulse rounded" />
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
