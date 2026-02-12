'use client'

import { QRCode } from 'react-qrcode-logo'

interface QRCodeDisplayProps {
  url: string
  size?: number
}

export function QRCodeDisplay({ url, size = 200 }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code-canvas canvas') as HTMLCanvasElement
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'card-qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="qr-code-canvas" className="bg-white p-4 rounded-xl">
        <QRCode
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#000000"
          qrStyle="dots"
          eyeRadius={8}
        />
      </div>
      <button
        onClick={handleDownload}
        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download QR Code
      </button>
    </div>
  )
}
