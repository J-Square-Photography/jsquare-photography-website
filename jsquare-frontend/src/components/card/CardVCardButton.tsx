'use client'

interface Profile {
  username: string
  full_name: string
}

export function CardVCardButton({ profile, accentColor }: { profile: Profile; accentColor: string }) {
  const handleDownload = () => {
    window.location.href = `/api/vcard/${profile.username}`
  }

  return (
    <button
      onClick={handleDownload}
      className="w-full py-3.5 rounded-xl text-sm font-semibold transition hover:opacity-90 flex items-center justify-center gap-2"
      style={{ backgroundColor: accentColor, color: isLightColor(accentColor) ? '#000000' : '#ffffff' }}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      Save Contact
    </button>
  )
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
