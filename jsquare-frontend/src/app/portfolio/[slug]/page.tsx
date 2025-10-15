import { Navigation } from "@/components/navigation/Navigation"
import { Footer } from "@/components/sections/Footer"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { GalleryWithLightbox } from "@/components/gallery/GalleryWithLightbox"
import { getGalleryBySlug, getGalleries } from "@/lib/wordpress/api"
import { extractImagesFromContent } from "@/lib/wordpress/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Use ISR (Incremental Static Regeneration)
// Revalidate gallery pages every 60 seconds
export const revalidate = 60

export async function generateStaticParams() {
  const { galleries } = await getGalleries(100)

  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const gallery = await getGalleryBySlug(params.slug)

  if (!gallery) {
    return {
      title: 'Gallery Not Found | J Square Photography',
    }
  }

  return {
    title: `${gallery.title} | J Square Photography`,
    description: gallery.excerpt || `View our ${gallery.title} photography gallery`,
  }
}

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = await getGalleryBySlug(params.slug)

  if (!gallery) {
    notFound()
  }

  // Extract images from WordPress content (gallery blocks, images, etc.)
  const extractedImages = extractImagesFromContent(gallery.content)

  // Use extracted images, or fall back to featured image with caption field
  const galleryImages = extractedImages.length > 0
    ? extractedImages
    : (gallery.featuredImage ? [{
        ...gallery.featuredImage.node,
        caption: ''
      }] : [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <Navigation />
      <ThemeToggle />

      <main className="pt-20">
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background with Ken Burns effect */}
          <div className="absolute inset-0">
            {gallery.featuredImage?.node?.sourceUrl && (
              <Image
                src={gallery.featuredImage.node.sourceUrl}
                alt={gallery.featuredImage.node.altText || gallery.title}
                fill
                className="object-cover animate-slow-zoom"
                priority
                sizes="100vw"
              />
            )}
          </div>

          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent dark:from-black/70 dark:via-black/40 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 dark:from-black/20 dark:via-transparent dark:to-black/20" />

          {/* Content with entrance animation */}
          <div className="relative text-center text-black dark:text-white z-10 px-6 max-w-5xl mx-auto animate-fade-in-up">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xl mb-8 text-black drop-shadow-md hover:text-black/80 dark:text-white dark:hover:text-white/80 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>

            {/* Decorative line */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-black/50 to-transparent dark:via-white/50 mx-auto mb-8" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight mb-6 tracking-wider leading-tight">
              {gallery.title}
            </h1>

            {gallery.categories?.nodes?.[0] && (
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-black/30 dark:bg-white/30" />
                <p className="text-lg font-light text-black/80 dark:text-white/80 uppercase tracking-widest">
                  {gallery.categories.nodes[0].name}
                </p>
                <div className="h-px w-12 bg-black/30 dark:bg-white/30" />
              </div>
            )}

            {/* Scroll indicator */}
            <div className="absolute bottom-[-2rem] left-0 right-0 flex justify-center">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-black/50 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
          </div>
        </section>

        {/* Gallery Info Section with Stats */}
        <section className="py-16 px-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {/* Stats */}
              <div className="group">
                <div className="text-3xl font-extralight text-gray-900 dark:text-white mb-2">
                  {galleryImages.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Photos
                </div>
              </div>

              {gallery.portfoliodetails?.skilllevel?.[0] && (
                <div className="group">
                  <div className="text-3xl font-extralight text-gray-900 dark:text-white mb-2 capitalize">
                    {gallery.portfoliodetails.skilllevel[0]}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Skill Level
                  </div>
                </div>
              )}

              {gallery.portfoliodetails?.eventtype?.[0] && (
                <div className="group">
                  <div className="text-3xl font-extralight text-gray-900 dark:text-white mb-2 capitalize">
                    {gallery.portfoliodetails.eventtype[0]}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Event Type
                  </div>
                </div>
              )}

              <div className="group">
                <div className="text-3xl font-extralight text-gray-900 dark:text-white mb-2">
                  {gallery.portfoliodetails?.location || 'Singapore'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </div>
              </div>
            </div>

            {/* Description */}
            {gallery.excerpt && (
              <div className="mt-12 max-w-3xl mx-auto">
                <div
                  className="prose prose-lg dark:prose-invert mx-auto text-center leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: gallery.excerpt }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Image Grid Section */}
        <section className="py-20 px-6 relative bg-white dark:bg-black">

          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 dark:text-white mb-4">
                Gallery Collection
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto" />
            </div>

            {galleryImages.length > 0 ? (
              <GalleryWithLightbox
                images={galleryImages}
                galleryTitle={gallery.title}
              />
            ) : (
              // Enhanced placeholder
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      <svg className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-400 dark:text-gray-600 text-center">
                        Gallery content will appear here
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Contact CTA */}
        <section className="py-32 px-6 bg-white dark:bg-black">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 text-gray-900 dark:text-white">
                Ready to Create Magic?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                Every photograph tells a story. Let us help you tell yours with stunning visuals that capture the essence of your special moments.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="https://wa.me/6580373735"
                  className="group relative px-12 py-4 bg-gray-900 text-white dark:bg-white dark:text-black overflow-hidden transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Start a Conversation
                  </span>
                </Link>

                <Link
                  href="/portfolio"
                  className="group px-12 py-4 border-2 border-gray-900 text-gray-900 dark:border-white dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  Explore More Galleries
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />


    </div>
  )
}