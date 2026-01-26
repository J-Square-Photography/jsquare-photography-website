import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getServiceBySlug, getServices } from '@/lib/wordpress/api'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { PricingTable } from '@/components/ui/PricingTable'
import {
  generateServiceWhatsAppLink,
  DEFAULT_WHATSAPP_NUMBER,
} from '@/lib/utils/whatsapp'

// Revalidate every 60 seconds
export const revalidate = 60

// Generate static paths for all services
export async function generateStaticParams() {
  const services = await getServices()

  return services.map((service) => ({
    slug: service.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const description =
    service.serviceDetails?.shortDescription ||
    service.excerpt ||
    `Learn more about our ${service.title} service at J Square Photography`

  return {
    title: `${service.title} | J Square Photography`,
    description,
    openGraph: {
      title: service.title,
      description,
      images: service.featuredImage?.node?.sourceUrl
        ? [{ url: service.featuredImage.node.sourceUrl }]
        : [],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const imageUrl =
    service.featuredImage?.node?.sourceUrl ||
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=800&fit=crop'

  const features = service.serviceDetails?.featuresList || []
  const gallery = service.serviceDetails?.serviceGallery || []
  const pricing = service.serviceDetails?.pricingInfo
  const pricingTiers = service.serviceDetails?.pricingTiers || []
  const ctaText = service.serviceDetails?.ctaText || 'Get Quote'
  const customMessage = service.serviceDetails?.whatsappMessageOverride
  const whatsappLink = generateServiceWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    service.title,
    customMessage
  )

  // Parse content HTML to plain text for better display
  const contentText = service.content
    ?.replace(/<[^>]*>?/gm, '')
    .replace(/\n\n+/g, '\n')
    .trim()

  return (
    <>
      <Navigation />
      <ThemeToggle />
      <main className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] w-full">
          <Image
            src={imageUrl}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Breadcrumbs */}
          <div className="absolute top-24 left-0 right-0 z-10 px-6">
            <div className="container mx-auto">
              <nav className="flex items-center space-x-2 text-sm text-white/90">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
                <span>/</span>
                <span className="text-white font-medium">{service.title}</span>
              </nav>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4">
                {service.title}
              </h1>
              {service.serviceDetails?.shortDescription && (
                <p className="text-xl text-white/90 font-light max-w-3xl">
                  {service.serviceDetails.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              {contentText && (
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                    About This Service
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed whitespace-pre-line">
                      {contentText}
                    </p>
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      >
                        <svg
                          className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 font-light">
                          {feature.featureItem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Table */}
              {pricingTiers.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                    Pricing
                  </h2>
                  <PricingTable tiers={pricingTiers} />
                </div>
              )}

              {/* Gallery */}
              {gallery.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image.sourceUrl}
                          alt={image.altText || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Pricing Card */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-6">
                  {pricing && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Pricing
                      </h3>
                      <p className="text-3xl font-light text-gray-900 dark:text-white">
                        {pricing}
                      </p>
                    </div>
                  )}

                  {/* WhatsApp CTA */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-light text-center flex items-center justify-center gap-2 mb-4"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {ctaText}
                  </a>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Click to send us a message on WhatsApp
                  </p>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Need Customization?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-4">
                    We can tailor this service to meet your specific needs and
                    requirements.
                  </p>
                  <Link
                    href="/#contact"
                    className="text-sm text-gray-900 dark:text-white font-medium hover:underline"
                  >
                    Contact us for a custom quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services CTA */}
        <div className="bg-gray-50 dark:bg-gray-950 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">
              Explore Our Other Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light mb-8 max-w-2xl mx-auto">
              Discover the full range of photography and videography services we
              offer
            </p>
            <Link
              href="/#services"
              className="inline-block px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-light"
            >
              View All Services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
