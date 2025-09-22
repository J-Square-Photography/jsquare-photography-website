import Image from 'next/image'
import Link from 'next/link'
import { getLatestStories } from '@/lib/wordpress/api'

export const FeaturedStory = async () => {
  const stories = await getLatestStories(1)

  // Fallback placeholder story
  const placeholderStory = {
    id: '1',
    title: 'Behind the Lens: Capturing Authentic Moments',
    slug: 'behind-the-lens-authentic-moments',
    content: '<p>In the world of professional photography, authenticity has become the golden standard. Gone are the days of overly posed, stiff portraits that fail to capture the essence of the moment. Today\'s clients seek genuine emotions, spontaneous laughter, and the unscripted beauty of real life. As photographers, we\'ve evolved our approach to embrace this shift, focusing on creating an environment where our subjects feel comfortable enough to be themselves. This journey toward authentic photography has transformed not just our work, but our entire philosophy about what it means to capture memories.</p>',
    date: '2024-01-20',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop',
        altText: 'Camera and photography equipment'
      }
    }
  }

  const featuredStory = stories[0] || placeholderStory

  // Strip HTML tags from content for excerpt
  const excerpt = featuredStory.content
    .replace(/<[^>]*>/g, '')
    .substring(0, 200) + '...'

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            {featuredStory.featuredImage && (
              <Image
                src={featuredStory.featuredImage.node.sourceUrl}
                alt={featuredStory.featuredImage.node.altText || featuredStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-sm font-light tracking-wider text-gray-600 dark:text-gray-400 mb-4">
              LATEST STORY
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4">
              {featuredStory.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6">
              {excerpt}
            </p>
            <Link
              href={`/stories/${featuredStory.slug}`}
              className="inline-flex items-center text-sm font-light tracking-wider text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              Read Full Story
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
      </div>
    </section>
  )
}