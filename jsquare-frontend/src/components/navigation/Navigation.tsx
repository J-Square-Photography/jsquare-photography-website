'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    // Immediate visibility for transparent state
    setIsVisible(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#stories', label: 'Stories' },
    { href: '#contact', label: 'Contact' },
  ]

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80 // Navigation height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-3 md:py-4'
            : 'py-5 md:py-6'
        }`}
      >
        {/* Progressive glass effect - transparent to frosted */}
        <div className={`absolute inset-0 overflow-hidden transition-all duration-700 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Base blur layer */}
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-black/70'
              : 'bg-white/70'
          } backdrop-blur-2xl backdrop-saturate-150`} />

          {/* Secondary blur for extra frosting */}
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gray-900/20'
              : 'bg-gray-100/30'
          } backdrop-blur-sm`} />

          {/* Gradient overlay for depth */}
          <div className={`absolute inset-0 bg-gradient-to-b ${
            theme === 'dark'
              ? 'from-black/10 to-transparent'
              : 'from-white/30 to-transparent'
          }`} />

          {/* Noise texture for material feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
          </div>

          {/* Bottom border with glow */}
          <div className={`absolute bottom-0 left-0 right-0 h-px ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'
          }`} />
        </div>

        {/* Subtle shadow for text readability when transparent - only in dark mode */}
        {!isScrolled && theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
        )}

        <nav className="relative container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            {mounted && (
              <Image
                src={theme === 'dark' ? '/jsquare_landscape_white.png' : '/jsquare_landscape_dark.png'}
                alt="J Square Photography"
                width={150}
                height={60}
                priority
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-12'
                } w-auto ${
                  !isScrolled && theme === 'dark' ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' : ''
                }`}
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className={`relative text-sm font-light tracking-wider transition-all duration-300 cursor-pointer ${
                  isScrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    : theme === 'dark'
                      ? 'text-white hover:text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                      : 'text-gray-900 hover:text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center"
            aria-label="Menu"
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
              className={`block w-6 h-px mb-1.5 ${
                isScrolled
                  ? 'bg-gray-900 dark:bg-white'
                  : theme === 'dark'
                    ? 'bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                    : 'bg-gray-900'
              }`}
            />
            <motion.span
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`block w-6 h-px mb-1.5 ${
                isScrolled
                  ? 'bg-gray-900 dark:bg-white'
                  : theme === 'dark'
                    ? 'bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                    : 'bg-gray-900'
              }`}
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -8 : 0,
              }}
              transition={{ duration: 0.2 }}
              className={`block w-6 h-px ${
                isScrolled
                  ? 'bg-gray-900 dark:bg-white'
                  : theme === 'dark'
                    ? 'bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                    : 'bg-gray-900'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-black/95'
                : 'bg-white/95'
            } backdrop-blur-lg`} />

            <nav className="relative h-full flex flex-col items-center justify-center space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className="text-2xl font-light tracking-wider transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}