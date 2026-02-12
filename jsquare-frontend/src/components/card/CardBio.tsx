interface CardBioProps {
  bio: string
}

export function CardBio({ bio }: CardBioProps) {
  return (
    <p className="text-sm leading-relaxed text-center" style={{ color: 'var(--secondary)' }}>
      {bio}
    </p>
  )
}
