import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'
import { getLatestStories } from '@/lib/wordpress/api'

const PLACEHOLDER_STORIES = [
  {
    id: '1',
    title: 'Behind the Lens: Capturing Authentic Moments',
    slug: 'behind-the-lens-authentic-moments',
    content:
      '<p>In the world of professional photography, authenticity has become the golden standard. Gone are the days of overly posed, stiff portraits that fail to capture the essence of the moment. Today\'s clients seek genuine emotions, spontaneous laughter, and the unscripted beauty of real life. As photographers, we\'ve evolved our approach to embrace this shift, focusing on creating an environment where our subjects feel comfortable enough to be themselves.</p><p>This journey toward authentic photography has transformed not just our work, but our entire philosophy about what it means to capture memories. We believe that the best photographs are the ones that transport you back to that exact moment — the warmth of a smile, the sparkle in someone\'s eyes, the spontaneous burst of laughter that no amount of directing could replicate.</p><p>At J Square Photography, we\'ve developed techniques that blend seamlessly into your event, allowing us to capture candid moments without disrupting the natural flow. From weddings to corporate events, our approach remains the same: be present, be patient, and let the story unfold naturally.</p><p>The results speak for themselves. When clients receive their gallery, the most common reaction we hear is, "I didn\'t even know you were taking that photo!" — and that\'s exactly the point. The best moments in life aren\'t posed; they\'re lived. And our job is simply to preserve them.</p>',
    date: '2024-01-20',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop',
        altText: 'Camera and photography equipment',
      },
    },
  },
  {
    id: '2',
    title: 'Wedding Photography: Planning Your Perfect Day',
    slug: 'wedding-photography-planning',
    content:
      '<p>Your wedding day is one of the most important days of your life, and having the right photographer can make all the difference. From choosing the perfect golden-hour timing to scouting locations that complement your theme, careful planning ensures every precious moment is beautifully preserved.</p><p>We recommend scheduling a pre-wedding consultation at least 3 months before the big day. This gives us time to understand your vision, visit the venue, and plan our approach to ensure nothing is missed.</p><p>Singapore offers a wealth of stunning locations for wedding photography — from the lush greenery of the Botanic Gardens to the dramatic skyline views at Marina Bay. Each venue brings its own charm and character, and our team knows how to make the most of every setting.</p><p>On the day itself, we work discreetly alongside your wedding coordinator to capture everything from the intimate getting-ready moments to the grand celebration. Our goal is to tell the complete story of your day, one frame at a time.</p>',
    date: '2024-01-10',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
        altText: 'Wedding photography',
      },
    },
  },
  {
    id: '3',
    title: 'Corporate Events: Making Every Shot Count',
    slug: 'corporate-events-photography',
    content:
      '<p>Corporate event photography requires a unique blend of professionalism and creativity. Whether it\'s a product launch, annual dinner, or team-building retreat, capturing the energy of the room while maintaining a polished look is what sets great corporate photography apart.</p><p>Understanding the objectives of the event is crucial. Are the photos for internal communications, social media, or press releases? Each purpose demands a different approach, and knowing the intended use helps us deliver exactly what you need.</p><p>We\'ve had the privilege of covering corporate events for a wide range of organisations across Singapore, from startups to multinational companies. Our experience means we know how to handle the fast pace, the changing lighting conditions, and the key moments that matter most to your stakeholders.</p><p>Every corporate event tells a story — of teamwork, achievement, and shared purpose. Our role is to capture that story with images that reflect the professionalism and energy of your organisation.</p>',
    date: '2024-01-05',
    featuredImage: {
      node: {
        sourceUrl:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
        altText: 'Corporate event photography',
      },
    },
  },
]

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cmsStories = await getLatestStories(50)
  const allStories = cmsStories.length > 0 ? cmsStories : PLACEHOLDER_STORIES
  const story = allStories.find((s) => s.slug === slug)

  if (!story) {
    return { title: 'Post Not Found | J Square Photography' }
  }

  return {
    title: `${story.title} | J Square Photography`,
    description: story.content.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const cmsStories = await getLatestStories(50)
  const allStories = cmsStories.length > 0 ? cmsStories : PLACEHOLDER_STORIES
  const story = allStories.find((s) => s.slug === slug)

  if (!story) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
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
            All Stories
          </Link>

          <p className="text-sm text-gray-400 dark:text-gray-500 font-light mb-4">
            {new Date(story.date).toLocaleDateString('en-SG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight">
            {story.title}
          </h1>

          {story.featuredImage && (
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 mb-12">
              <Image
                src={story.featuredImage.node.sourceUrl}
                alt={story.featuredImage.node.altText || story.title}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <article
            className="prose prose-gray dark:prose-invert prose-lg max-w-none font-light leading-relaxed
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:font-light prose-p:leading-relaxed
              prose-headings:font-light prose-a:text-gray-900 dark:prose-a:text-white
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-light tracking-wider text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              All Stories
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
