import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/jsquare_landscape_white.png"
              alt="J Square Photography"
              width={180}
              height={72}
              className="h-14 w-auto mb-6"
            />
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Professional photography and videography services in Singapore.
              Capturing moments, creating memories since 2017.
            </p>
            <div className="flex space-x-4 pt-4">
              {/* Social Links */}
              <a
                href="https://www.instagram.com/jsquarephotographysg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/jsquarephotographySG/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@jsquarephotography"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-light mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Testimonials
                </a>
              </li>
              <li>
                <Link href="/clients" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-light mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/dslr-photobooth" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  DSLR Photobooth
                </Link>
              </li>
              <li>
                <Link href="/services/event-photography" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Event Photography
                </Link>
              </li>
              <li>
                <Link href="/services/event-videography" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Event Videography
                </Link>
              </li>
              <li>
                <Link href="/services/wedding-photography-videography" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Wedding Coverage
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-photography" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Corporate Headshots
                </Link>
              </li>
              <li>
                <Link href="/services/food-photography" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                  Food Photography
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-light mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-sm font-light">Phone</p>
                  <a href="tel:+6580373735" className="text-white hover:text-gray-300 transition-colors">
                    +65 8037 3735
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-sm font-light">Email</p>
                  <a href="mailto:Jsquarephotographysg@gmail.com" className="text-white hover:text-gray-300 transition-colors text-sm">
                    Jsquarephotographysg@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-sm font-light">Location</p>
                  <p className="text-white">Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-light text-center md:text-left">
              © {currentYear} J Square Photography. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}