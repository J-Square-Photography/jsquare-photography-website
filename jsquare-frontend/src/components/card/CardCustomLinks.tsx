interface CustomLink {
  id: string
  title: string
  url: string
}

export function CardCustomLinks({ links, accentColor }: { links: CustomLink[]; accentColor: string }) {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-medium transition hover:opacity-80 border"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {link.title}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  )
}
