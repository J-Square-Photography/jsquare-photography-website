'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <DashboardHeader />

        <div className="flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
              <Link href="/dashboard">
                <Image
                  src="/jsquare_landscape_dark.png"
                  alt="J Square Photography"
                  width={160}
                  height={48}
                  className="dark:hidden"
                />
                <Image
                  src="/jsquare_landscape_white.png"
                  alt="J Square Photography"
                  width={160}
                  height={48}
                  className="hidden dark:block"
                />
              </Link>
            </div>
            <DashboardNav />
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-64">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
