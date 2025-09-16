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

      {/* Additional sections will go here */}
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 dark:text-white mb-8">
            COMING SOON
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            The new J Square Photography experience is being crafted.
            <br />
            A cinematic journey through our portfolio awaits.
          </p>
        </div>
      </section>
    </main>
  )
}
