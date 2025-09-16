import { Hero } from "@/components/ui/Hero"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Suspense } from "react"

export default function ComingSoonPage() {
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

          {/* Primary Contact Links */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://wa.me/6580373735"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-light flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                <path d="M12 2C6.486 2 2 6.486 2 12c0 1.747.449 3.388 1.234 4.815L2 22l5.321-1.201A9.94 9.94 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18c-1.628 0-3.156-.481-4.434-1.308l-.318-.196-3.299.745.762-3.185-.21-.337A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:info@jsquarephotography.com"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-light flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>

          {/* Social Media Links */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/jsquarephotographysg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              <span className="text-xs">Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/jsquarephotographySG/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs">Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/j-square-photography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-xs">LinkedIn</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/JSquarePhotography"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Telegram"
            >
              <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-xs">Telegram</span>
            </a>

            {/* Carousell */}
            <a
              href="https://www.carousell.sg/jsquarephotography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Carousell"
            >
              <svg className="w-6 h-6 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xs">Carousell</span>
            </a>

            {/* Website */}
            <a
              href="https://jsquarephotography.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Website"
            >
              <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-xs">Website</span>
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