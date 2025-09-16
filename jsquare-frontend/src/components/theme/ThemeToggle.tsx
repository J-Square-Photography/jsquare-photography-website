'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  showLabel?: boolean
  shortcut?: string
}

export function ThemeToggle({
  position = 'top-right',
  showLabel = false,
  shortcut = 'cmd+d'
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
    }

    if (shortcut) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [theme, setTheme, shortcut])

  if (!mounted) {
    return null
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  return (
    <button
      className={`fixed ${positionClasses[position]} z-50 p-3 rounded-full
                  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200
                  dark:hover:bg-gray-700 transition-all duration-200
                  shadow-lg hover:shadow-xl`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  )
}