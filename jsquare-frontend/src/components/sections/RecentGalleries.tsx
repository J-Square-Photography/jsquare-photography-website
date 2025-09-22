import Image from 'next/image'
import Link from 'next/link'
import { getGalleries } from '@/lib/wordpress/api'

export const RecentGalleries = async () => {
  const { galleries } = await getGalleries(6)

  if (!galleries || galleries.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 dark:text-white mb-4">
            Recent Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            Explore our latest photography sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <Link
              key={gallery.id}
              href={`/portfolio/${gallery.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {gallery.featuredImage && (
                <Image
                  src={gallery.featuredImage.node.sourceUrl}
                  alt={gallery.featuredImage.node.altText || gallery.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-light mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {gallery.title}
                </h3>
                {gallery.categories.nodes.length > 0 && (
                  <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    {gallery.categories.nodes[0].name}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-sm font-light tracking-wider text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            View All Work
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}