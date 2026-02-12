import Link from 'next/link'
import Image from 'next/image'

export default function CardNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center space-y-6">
        <Image
          src="/jsquare_landscape_dark.png"
          alt="J Square Photography"
          width={200}
          height={60}
          className="mx-auto"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">This card doesn&apos;t exist or is not published.</p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:opacity-90 transition text-sm"
        >
          Go to J Square Photography
        </Link>
      </div>
    </div>
  )
}
