import { Hero } from "@/components/ui/Hero"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <Suspense fallback={
        <div className="h-screen bg-white dark:bg-black flex items-center justify-center">
          <div className="text-gray-900 dark:text-white text-lg font-light">Loading...</div>
        </div>
      }>
        <Hero />
      </Suspense>

      {/* Coming Soon Section */}
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 dark:text-white mb-8">
            COMING SOON
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-12">
            The new J Square Photography experience is being crafted.
            <br />
            A cinematic journey through our portfolio awaits.
          </p>

          {/* Contact Links */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.instagram.com/jsquarephotography"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-light"
            >
              Follow on Instagram
            </a>
            <a
              href="mailto:info@jsquarephotography.com"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-light"
            >
              Get in Touch
            </a>
          </div>

          {/* Footer Info */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 J Square Photography. Professional photography & videography services since 2017.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
