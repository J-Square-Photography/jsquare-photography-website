interface CardSocialLinksProps {
  instagram?: string
  linkedin?: string
  facebook?: string
  tiktok?: string
  youtube?: string
  twitter?: string
  behance?: string
}

const socialIcons: Record<string, { label: string; path: string }> = {
  instagram: { label: 'Instagram', path: 'M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a1 1 0 110 2 1 1 0 010-2z' },
  linkedin: { label: 'LinkedIn', path: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-1 2H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1zM8 10v7H6v-7h2zm6 0a2.5 2.5 0 012.5 2.5V17h-2v-4.5a.5.5 0 00-1 0V17h-2v-7h2v.5A2.5 2.5 0 0114 10zM7 6.5a1 1 0 110 2 1 1 0 010-2z' },
  facebook: { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z' },
  tiktok: { label: 'TikTok', path: 'M9 12a4 4 0 104 4V4a5 5 0 005 5' },
  youtube: { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58A2.78 2.78 0 003.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2C23 16.02 23 12 23 12s0-4.02-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  twitter: { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  behance: { label: 'Behance', path: 'M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zM9 15H4V7h5c2.209 0 4 1.119 4 3s-1.119 3-2 3c1.209 0 3 .791 3 3s-2.791 3-5 3zm-1-4H5v2h3c.552 0 1-.449 1-1s-.448-1-1-1zm0-4H5v2h3c.552 0 1-.449 1-1s-.448-1-1-1z' },
}

export function CardSocialLinks(props: CardSocialLinksProps) {
  const activeSocials = Object.entries(props)
    .filter(([, value]) => value)
    .map(([key, value]) => ({ key, url: value as string, ...socialIcons[key] }))
    .filter(s => s.label)

  if (activeSocials.length === 0) return null

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {activeSocials.map((social) => (
        <a
          key={social.key}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110"
          style={{ backgroundColor: 'var(--text, #000)', opacity: 0.8 }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" style={{ color: 'var(--bg, #fff)', fill: 'var(--bg, #fff)' }}>
            <path d={social.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
