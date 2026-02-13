'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

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

  const isHomePage = pathname === '/'

  const navItems = [
    { href: isHomePage ? '#portfolio' : '/portfolio', label: 'Portfolio', isHash: isHomePage },
    { href: isHomePage ? '#services' : '/#services', label: 'Services', isHash: isHomePage },
    { href: isHomePage ? '#pricing' : '/#pricing', label: 'Pricing', isHash: isHomePage },
    { href: isHomePage ? '#about' : '/#about', label: 'About', isHash: isHomePage },
    { href: isHomePage ? '#team' : '/#team', label: 'Team', isHash: isHomePage },
    { href: isHomePage ? '#testimonials' : '/#testimonials', label: 'Testimonials', isHash: isHomePage },
    { href: isHomePage ? '#contact' : '/#contact', label: 'Contact', isHash: isHomePage },
  ]

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    if (isHash) {
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
        {/* Subtle glass effect - very minimal */}
        <div className={`absolute inset-0 overflow-hidden transition-all duration-700 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* 50% opacity blur layer */}
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-lg" />

          {/* Very minimal gradient for subtle depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 dark:from-black/10 to-transparent" />

          {/* Subtle bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
        </div>

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
                } w-auto`}
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isHash ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href, item.isHash)}
                  className={`relative text-sm font-light tracking-wider transition-all duration-300 cursor-pointer ${
                    isScrolled
                      ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      : 'text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-white/80'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-light tracking-wider transition-all duration-300 cursor-pointer ${
                    isScrolled
                      ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      : 'text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-white/80'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            {/* Desktop Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-10 w-10 h-10 flex flex-col items-center justify-center"
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
                  : 'bg-gray-900 dark:bg-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
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
                  : 'bg-gray-900 dark:bg-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
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
                  : 'bg-gray-900 dark:bg-white dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
              }`}
            />
          </button>
          </div>
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
            className="fixed inset-0 z-40 lg:hidden"
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
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href, item.isHash)}
                      className="text-2xl font-light tracking-wider transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-light tracking-wider transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}