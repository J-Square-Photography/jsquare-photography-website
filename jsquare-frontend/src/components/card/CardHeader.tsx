import Image from 'next/image'

interface CardHeaderProps {
  coverImageUrl?: string
  profilePhotoUrl?: string
  fullName: string
  jobTitle?: string
  accentColor: string
}

export function CardHeader({ coverImageUrl, profilePhotoUrl, fullName, jobTitle, accentColor }: CardHeaderProps) {
  return (
    <div className="mb-8">
      {/* Cover image */}
      <div className="h-48 sm:h-56 relative overflow-hidden">
        {coverImageUrl ? (
          <Image src={coverImageUrl} alt="Cover" fill className="object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)` }} />
        )}
      </div>

      {/* Profile photo - pulled up to overlap cover */}
      <div className="flex justify-center -mt-16 relative z-10">
        {profilePhotoUrl ? (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg flex-shrink-0" style={{ borderColor: 'var(--bg, #ffffff)' }}>
            <Image src={profilePhotoUrl} alt={fullName} width={128} height={128} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div
            className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-bold shadow-lg flex-shrink-0"
            style={{ borderColor: 'var(--bg, #ffffff)', backgroundColor: `${accentColor}22`, color: accentColor }}
          >
            {fullName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name and title - normal flow below profile photo */}
      <div className="mt-4 text-center px-6">
        <h1 className="text-2xl font-bold">{fullName}</h1>
        {jobTitle && (
          <p className="mt-1 text-sm" style={{ color: 'var(--secondary)' }}>{jobTitle}</p>
        )}
      </div>
    </div>
  )
}
