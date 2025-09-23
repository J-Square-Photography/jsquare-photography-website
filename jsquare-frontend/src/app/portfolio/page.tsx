import { Navigation } from "@/components/navigation/Navigation"
import { Footer } from "@/components/sections/Footer"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { getGalleries } from "@/lib/wordpress/api"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: 'Portfolio | J Square Photography',
  description: 'Browse our photography portfolio showcasing weddings, events, portraits and commercial projects in Singapore.',
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const { galleries } = await getGalleries(20) // Fetch more galleries for portfolio page

  // Category filter options
  const categories = [
    { name: 'All', slug: 'all' },
    { name: 'Weddings', slug: 'weddings' },
    { name: 'Corporate', slug: 'corporate' },
    { name: 'Portraits', slug: 'portraits' },
    { name: 'Events', slug: 'events' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <ThemeToggle />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center bg-white dark:bg-black">
          <div className="relative text-center z-10">
            <h1 className="text-5xl md:text-7xl font-extralight mb-4 text-gray-900 dark:text-white">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-700 dark:text-white/80">
              Capturing moments that last forever
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 px-6 bg-white dark:bg-black">
          <div className="container mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            {galleries && galleries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleries.map((gallery) => (
                  <Link
                    key={gallery.id}
                    href={`/portfolio/${gallery.slug}`}
                    className="group relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    {gallery.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={gallery.featuredImage.node.sourceUrl}
                        alt={gallery.featuredImage.node.altText || gallery.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-light mb-2">{gallery.title}</h3>
                        {gallery.categories?.nodes?.[0] && (
                          <p className="text-sm opacity-80">
                            {gallery.categories.nodes[0].name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // Placeholder galleries if no WordPress content
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="group relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <Image
                      src={`https://images.unsplash.com/photo-${
                        [
                          '1519741497674-611481863552',
                          '1540575467063-178a50c2df87',
                          '1531746020798-e6953c6e8e04',
                          '1511285560929-e80d1b2a8a2f',
                          '1606216794138-b2e9a57c3c9f',
                          '1519167758481-ac2b39a44bdc'
                        ][i - 1]
                      }?w=800&h=1000&fit=crop`}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-light mb-2">Sample Gallery {i}</h3>
                        <p className="text-sm opacity-80">
                          Add content in WordPress
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                Load More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}