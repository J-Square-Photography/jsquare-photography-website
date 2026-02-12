'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { clients, type Client } from '@/data/clients'

gsap.registerPlugin(ScrollTrigger)

function ClientCard({ client }: { client: Client }) {
  const inner = (
    <>
      {client.logoUrl ? (
        <div className="relative w-full aspect-[3/2] mb-4">
          <Image
            src={client.logoUrl}
            alt={client.name}
            fill
            className="object-contain dark:brightness-0 dark:invert"
          />
        </div>
      ) : (
        <div className="w-full aspect-[3/2] mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-lg font-light text-gray-500 dark:text-gray-400 text-center px-4">
            {client.name}
          </span>
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center truncate">
        {client.name}
      </h3>
      {client.category && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
          {client.category}
        </p>
      )}
    </>
  )

  const baseClasses =
    'client-card group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow'

  if (client.website) {
    return (
      <a
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {inner}
      </a>
    )
  }

  return <div className={baseClasses}>{inner}</div>
}

export default function ClientsPageContent() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.client-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <ThemeToggle />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 dark:text-white mb-4">
            Our Clients
          </h1>
          <p className="text-lg font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;re proud to have worked with these amazing brands, organisations,
            and individuals.
          </p>
        </div>
      </section>

      {/* Client Grid */}
      <section className="pb-32 px-6">
        <div className="container mx-auto">
          {clients.length > 0 ? (
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 font-light text-lg">
                Client logos coming soon &mdash; stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 dark:text-white mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how we can capture your next event, product, or
            special moment.
          </p>
          <a
            href="https://wa.me/6580373735"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-light tracking-wider hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
