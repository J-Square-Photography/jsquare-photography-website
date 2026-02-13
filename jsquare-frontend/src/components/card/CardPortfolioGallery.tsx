'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PortfolioImage {
  id: string
  image_url: string
  caption: string
}

export function CardPortfolioGallery({ images }: { images: PortfolioImage[] }) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Portfolio</h2>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <Image src={img.image_url} alt={img.caption || 'Portfolio'} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition group-hover:scale-105" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-3xl max-h-[85vh] w-full">
            <Image
              src={selectedImage.image_url}
              alt={selectedImage.caption || 'Portfolio'}
              width={1200}
              height={800}
              className="object-contain w-full h-auto max-h-[85vh] rounded-lg"
            />
            {selectedImage.caption && (
              <p className="text-white/80 text-center mt-3 text-sm">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
