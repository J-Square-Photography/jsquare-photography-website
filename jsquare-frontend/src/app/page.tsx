import { Hero } from "@/components/ui/Hero"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={
        <div className="h-screen bg-white flex items-center justify-center">
          <div className="text-[#3a3a3c] text-lg font-light">Loading...</div>
        </div>
      }>
        <Hero />
      </Suspense>
      
      {/* Additional sections will go here */}
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extralight text-[#3a3a3c] mb-8">
            COMING SOON
          </h2>
          <p className="text-lg text-[#3a3a3c]/70 font-light leading-relaxed">
            The new J Square Photography experience is being crafted.
            <br />
            A cinematic journey through our portfolio awaits.
          </p>
        </div>
      </section>
    </main>
  )
}
