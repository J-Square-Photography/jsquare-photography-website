import { Hero } from "@/components/ui/Hero"
import { Navigation } from "@/components/navigation/Navigation"
import { RecentGalleries } from "@/components/sections/RecentGalleries"
import { AboutSection } from "@/components/sections/AboutSection"
import { TeamSection } from "@/components/sections/TeamSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { FeaturedStory } from "@/components/sections/FeaturedStory"
import { Footer } from "@/components/sections/Footer"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Suspense } from "react"
import {
  getAboutSectionContent,
  getMainServices,
  getAdditionalServices,
} from "@/lib/wordpress/api"

// Revalidate this page every 60 seconds
export const revalidate = 60

export default async function Home() {
  // Fetch all data in parallel
  const [aboutContent, mainServices, additionalServices] = await Promise.all([
    getAboutSectionContent(),
    getMainServices(),
    getAdditionalServices(),
  ])

  return (
    <>
      <Navigation />
      <ThemeToggle />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Suspense fallback={
          <div className="h-screen bg-white dark:bg-black flex items-center justify-center">
            <div className="text-gray-900 dark:text-white text-lg font-light">Loading...</div>
          </div>
        }>
          <Hero />
        </Suspense>

        {/* About Section */}
        <Suspense fallback={<div className="h-96 bg-white dark:bg-black" />}>
          <AboutSection content={aboutContent || undefined} />
        </Suspense>

        {/* Portfolio Section */}
        <section id="portfolio">
          <Suspense fallback={<div className="h-96" />}>
            <RecentGalleries />
          </Suspense>
        </section>

        {/* Services Section */}
        <Suspense fallback={<div className="h-96 bg-white dark:bg-black" />}>
          <ServicesSection
            mainServices={mainServices}
            additionalServices={additionalServices}
          />
        </Suspense>

        {/* Team Section */}
        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-950" />}>
          <TeamSection />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-950" />}>
          <TestimonialsSection />
        </Suspense>

        {/* Stories Section */}
        <section id="stories">
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedStory />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-gray-900 dark:bg-black">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8">
              Let's Create Together
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to capture your special moments? Get in touch with us to discuss your photography
              and videography needs. We're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/6580373735"
                className="px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors rounded-lg font-light flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href="mailto:Jsquarephotographysg@gmail.com"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors rounded-lg font-light flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Response within 24 hours • Available 7 days a week
            </p>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
