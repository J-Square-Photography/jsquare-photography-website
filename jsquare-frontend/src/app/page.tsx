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

    </main>
  )
}
