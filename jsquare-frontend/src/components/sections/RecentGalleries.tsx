import Image from 'next/image'
import Link from 'next/link'
import { getGalleries } from '@/lib/wordpress/api'

export const RecentGalleries = async () => {
  const { galleries } = await getGalleries(6)

  // Fallback placeholder galleries if no WordPress content
  const placeholderGalleries = [
    {
      id: '1',
      title: 'Elegant Wedding at Sentosa',
      slug: 'elegant-wedding-sentosa',
      excerpt: 'A beautiful beachfront wedding',
      content: '',
      date: '2024-01-15',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
          altText: 'Wedding photography'
        }
      },
      categories: { nodes: [{ name: 'Weddings', slug: 'weddings' }] }
    },
    {
      id: '2',
      title: 'Corporate Event - Tech Summit',
      slug: 'corporate-tech-summit',
      excerpt: 'Annual technology conference',
      content: '',
      date: '2024-01-10',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
          altText: 'Corporate event'
        }
      },
      categories: { nodes: [{ name: 'Corporate', slug: 'corporate' }] }
    },
    {
      id: '3',
      title: 'Portrait Session - Urban Style',
      slug: 'portrait-urban-style',
      excerpt: 'Modern portrait photography',
      content: '',
      date: '2024-01-08',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop',
          altText: 'Portrait photography'
        }
      },
      categories: { nodes: [{ name: 'Portraits', slug: 'portraits' }] }
    },
    {
      id: '4',
      title: 'Garden Wedding Celebration',
      slug: 'garden-wedding-celebration',
      excerpt: 'Romantic garden venue',
      content: '',
      date: '2024-01-05',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop',
          altText: 'Garden wedding'
        }
      },
      categories: { nodes: [{ name: 'Weddings', slug: 'weddings' }] }
    },
    {
      id: '5',
      title: 'Product Launch Event',
      slug: 'product-launch-event',
      excerpt: 'Exciting product reveal',
      content: '',
      date: '2024-01-03',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=1000&fit=crop',
          altText: 'Product launch'
        }
      },
      categories: { nodes: [{ name: 'Events', slug: 'events' }] }
    },
    {
      id: '6',
      title: 'Family Portrait Session',
      slug: 'family-portrait-session',
      excerpt: 'Capturing family moments',
      content: '',
      date: '2024-01-01',
      featuredImage: {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=1000&fit=crop',
          altText: 'Family portrait'
        }
      },
      categories: { nodes: [{ name: 'Family', slug: 'family' }] }
    }
  ]

  const displayGalleries = galleries && galleries.length > 0 ? galleries : placeholderGalleries

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
          {displayGalleries.map((gallery) => (
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
                  quality={90}
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