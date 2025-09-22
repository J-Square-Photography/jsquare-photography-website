import { Hero } from "@/components/ui/Hero"
import { Navigation } from "@/components/navigation/Navigation"
import { RecentGalleries } from "@/components/sections/RecentGalleries"
import { AboutSection } from "@/components/sections/AboutSection"
import { TeamSection } from "@/components/sections/TeamSection"
import { FeaturedStory } from "@/components/sections/FeaturedStory"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Suspense } from "react"

export default function Home() {
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

        {/* Portfolio Section */}
        <section id="portfolio">
          <Suspense fallback={<div className="h-96" />}>
            <RecentGalleries />
          </Suspense>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Team Section */}
        <TeamSection />

        {/* Stories Section */}
        <section id="stories">
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedStory />
          </Suspense>
        </section>

        {/* Contact Section - Placeholder */}
        <section id="contact" className="py-32 px-6 bg-gray-900 dark:bg-black">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6590055429"
                className="px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors rounded-lg font-light"
              >
                WhatsApp Us
              </a>
              <a
                href="mailto:jsquare.photography@gmail.com"
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors rounded-lg font-light"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
