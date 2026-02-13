import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'
import { getLatestStories } from '@/lib/wordpress/api'

export const metadata: Metadata = {
  title: 'Blog | J Square Photography',
  description:
    'Stories, tips, and behind-the-scenes insights from J Square Photography — a media company based in Singapore.',
}

const PLACEHOLDER_STORIES = [
  {
    id: '1',
    title: 'Behind the Lens: Capturing Authentic Moments',
    slug: 'behind-the-lens-authentic-moments',
    content:
      '<p>In the world of professional photography, authenticity has become the golden standard. Gone are the days of overly posed, stiff portraits that fail to capture the essence of the moment. Today\'s clients seek genuine emotions, spontaneous laughter, and the unscripted beauty of real life.</p>',
    date: '2024-01-20',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=500&fit=crop',
        altText: 'Camera and photography equipment',
      },
    },
  },
  {
    id: '2',
    title: 'Wedding Photography: Planning Your Perfect Day',
    slug: 'wedding-photography-planning',
    content:
      '<p>Your wedding day is one of the most important days of your life, and having the right photographer can make all the difference. From choosing the perfect golden-hour timing to scouting locations that complement your theme, careful planning ensures every precious moment is beautifully preserved.</p>',
    date: '2024-01-10',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop',
        altText: 'Wedding photography',
      },
    },
  },
  {
    id: '3',
    title: 'Corporate Events: Making Every Shot Count',
    slug: 'corporate-events-photography',
    content:
      '<p>Corporate event photography requires a unique blend of professionalism and creativity. Whether it\'s a product launch, annual dinner, or team-building retreat, capturing the energy of the room while maintaining a polished look is what sets great corporate photography apart.</p>',
    date: '2024-01-05',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
        altText: 'Corporate event photography',
      },
    },
  },
]

export default async function BlogPage() {
  const cmsStories = await getLatestStories(12)
  const stories = cmsStories.length > 0 ? cmsStories : PLACEHOLDER_STORIES

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="max-w-2xl mb-16">
            <p className="text-sm font-light tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              OUR BLOG
            </p>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Stories & Insights
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Behind-the-scenes stories, photography tips, and insights from our
              work across Singapore.
            </p>
          </div>

          {/* Featured Post */}
          {stories.length > 0 && (
            <Link
              href={`/blog/${stories[0].slug}`}
              className="group block mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
                  {stories[0].featuredImage && (
                    <Image
                      src={stories[0].featuredImage.node.sourceUrl}
                      alt={
                        stories[0].featuredImage.node.altText ||
                        stories[0].title
                      }
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="lg:pl-4">
                  <p className="text-sm font-light tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    LATEST
                  </p>
                  <h2 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {stories[0].title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-4">
                    {stories[0].content
                      .replace(/<[^>]*>/g, '')
                      .substring(0, 200)}
                    ...
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-light">
                    {new Date(stories[0].date).toLocaleDateString('en-SG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* More Stories Grid */}
          {stories.length > 1 && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-8">
                <h3 className="text-lg font-light text-gray-500 dark:text-gray-400">
                  More Stories
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.slice(1).map((story) => (
                  <Link
                    key={story.id}
                    href={`/blog/${story.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 mb-4">
                      {story.featuredImage && (
                        <Image
                          src={story.featuredImage.node.sourceUrl}
                          alt={
                            story.featuredImage.node.altText || story.title
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-light mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-2">
                      {story.content
                        .replace(/<[^>]*>/g, '')
                        .substring(0, 120)}
                      ...
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-light">
                      {new Date(story.date).toLocaleDateString('en-SG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
