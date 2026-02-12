import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/jsquare_landscape_dark.png"
              alt="J Square Photography"
              width={200}
              height={60}
              className="mx-auto dark:hidden"
            />
            <Image
              src="/jsquare_landscape_white.png"
              alt="J Square Photography"
              width={200}
              height={60}
              className="mx-auto hidden dark:block"
            />
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
