'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DashboardNav } from './DashboardNav'

export function DashboardHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard">
          <Image
            src="/jsquare_landscape_dark.png"
            alt="J Square Photography"
            width={140}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/jsquare_landscape_white.png"
            alt="J Square Photography"
            width={140}
            height={40}
            className="hidden dark:block"
          />
        </Link>
        <button
          onClick={() => setMobileNavOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DashboardNav onClose={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
