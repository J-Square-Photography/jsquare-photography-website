interface CardContactInfoProps {
  phone?: string
  email?: string
  whatsapp?: string
  telegram?: string
  accentColor: string
}

export function CardContactInfo({ phone, email, whatsapp, telegram, accentColor }: CardContactInfoProps) {
  const contacts = [
    phone && { label: 'Call', href: `tel:${phone}`, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    email && { label: 'Email', href: `mailto:${email}`, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    whatsapp && { label: 'WhatsApp', href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    telegram && { label: 'Telegram', href: `https://t.me/${telegram.replace('@', '')}`, icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
  ].filter(Boolean) as Array<{ label: string; href: string; icon: string }>

  if (contacts.length === 0) return null

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {contacts.map((contact) => (
        <a
          key={contact.label}
          href={contact.href}
          target={contact.href.startsWith('http') ? '_blank' : undefined}
          rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition hover:opacity-80"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: accentColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" d={contact.icon} />
          </svg>
          <span style={{ color: accentColor }}>{contact.label}</span>
        </a>
      ))}
    </div>
  )
}
