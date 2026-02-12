import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import { CardHeader } from '@/components/card/CardHeader'
import { CardBio } from '@/components/card/CardBio'
import { CardContactInfo } from '@/components/card/CardContactInfo'
import { CardSocialLinks } from '@/components/card/CardSocialLinks'
import { CardPortfolioGallery } from '@/components/card/CardPortfolioGallery'
import { CardVideoEmbed } from '@/components/card/CardVideoEmbed'
import { CardFileDownloads } from '@/components/card/CardFileDownloads'
import { CardCustomLinks } from '@/components/card/CardCustomLinks'
import { CardVCardButton } from '@/components/card/CardVCardButton'
import { CardBranding } from '@/components/card/CardBranding'
import { CardShareButton } from '@/components/card/CardShareButton'

// Always fetch fresh data - no caching
export const dynamic = 'force-dynamic'

// Server-side Supabase client (no cookies needed for public read)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function getCardData(username: string) {
  const supabase = getSupabase()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .eq('is_published', true)
    .single()

  if (!profile) return null

  const [
    { data: images },
    { data: videos },
    { data: files },
    { data: links },
  ] = await Promise.all([
    supabase.from('portfolio_images').select('*').eq('profile_id', profile.id).order('display_order'),
    supabase.from('embedded_videos').select('*').eq('profile_id', profile.id).order('display_order'),
    supabase.from('uploaded_files').select('*').eq('profile_id', profile.id).order('display_order'),
    supabase.from('custom_links').select('*').eq('profile_id', profile.id).order('display_order'),
  ])

  return {
    profile,
    images: images || [],
    videos: videos || [],
    files: files || [],
    links: links || [],
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  const data = await getCardData(username)

  if (!data) {
    return { title: 'Card Not Found | J Square Photography' }
  }

  const { profile } = data
  return {
    title: `${profile.full_name} | J Square Photography`,
    description: profile.bio || `${profile.full_name} - ${profile.job_title || 'Photographer'}`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${profile.full_name} | J Square Photography`,
      description: profile.bio || `${profile.full_name} - ${profile.job_title || 'Photographer'}`,
      images: profile.profile_photo_url ? [{ url: profile.profile_photo_url }] : [],
      type: 'profile',
    },
  }
}

export default async function CardPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const data = await getCardData(username)

  if (!data) notFound()

  const { profile, images, videos, files, links } = data
  const accentColor = profile.accent_color || '#000000'
  const themePreset = profile.theme_preset || 'minimal'

  const themeStyles: Record<string, { bg: string; text: string; secondary: string }> = {
    minimal: { bg: '#ffffff', text: '#111111', secondary: '#6b7280' },
    dark: { bg: '#0a0a0a', text: '#f5f5f5', secondary: '#9ca3af' },
    warm: { bg: '#faf5f0', text: '#2d1810', secondary: '#8b6914' },
    cool: { bg: '#f0f4fa', text: '#0f1729', secondary: '#4b5563' },
    forest: { bg: '#f0faf4', text: '#0f2918', secondary: '#3b6b4a' },
  }

  const theme = themeStyles[themePreset] || themeStyles.minimal
  const cardUrl = `https://jsquarephotography.com/card/${profile.username}`

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <style>{`
        .card-root { --accent: ${accentColor}; --bg: ${theme.bg}; --text: ${theme.text}; --secondary: ${theme.secondary}; }
        .card-root * { color: inherit; }
      `}</style>
      <div className="card-root max-w-lg mx-auto pb-12">
        <CardHeader
          coverImageUrl={profile.cover_image_url}
          profilePhotoUrl={profile.profile_photo_url}
          fullName={profile.full_name}
          jobTitle={profile.job_title}
          accentColor={accentColor}
        />

        <div className="px-6 space-y-8">
          {profile.bio && <CardBio bio={profile.bio} />}

          <CardContactInfo
            phone={profile.phone}
            email={profile.contact_email}
            whatsapp={profile.whatsapp}
            telegram={profile.telegram}
            accentColor={accentColor}
          />

          <CardSocialLinks
            instagram={profile.instagram}
            linkedin={profile.linkedin}
            facebook={profile.facebook}
            tiktok={profile.tiktok}
            youtube={profile.youtube}
            twitter={profile.twitter}
            behance={profile.behance}
          />

          {images.length > 0 && <CardPortfolioGallery images={images} />}

          {videos.length > 0 && <CardVideoEmbed videos={videos} />}

          {files.length > 0 && <CardFileDownloads files={files} accentColor={accentColor} />}

          {links.length > 0 && <CardCustomLinks links={links} accentColor={accentColor} />}

          <CardVCardButton profile={profile} accentColor={accentColor} />

          <CardShareButton url={cardUrl} name={profile.full_name} />

          <CardBranding />
        </div>
      </div>
    </div>
  )
}
