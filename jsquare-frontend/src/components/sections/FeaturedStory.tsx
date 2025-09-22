import Image from 'next/image'
import Link from 'next/link'
import { getLatestStories } from '@/lib/wordpress/api'

export const FeaturedStory = async () => {
  const stories = await getLatestStories(1)
  const featuredStory = stories[0]

  if (!featuredStory) {
    return null
  }

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