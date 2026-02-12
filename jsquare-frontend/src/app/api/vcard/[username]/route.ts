import { createClient } from '@supabase/supabase-js'
import { generateVCard } from '@/lib/utils/vcard'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .eq('is_published', true)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const vcf = generateVCard({
    fullName: profile.full_name,
    jobTitle: profile.job_title,
    email: profile.contact_email,
    phone: profile.phone,
    whatsapp: profile.whatsapp,
    website: `https://jsquarephotography.com/card/${profile.username}`,
    instagram: profile.instagram,
    linkedin: profile.linkedin,
  })

  return new NextResponse(vcf, {
    headers: {
      'Content-Type': 'text/vcard',
      'Content-Disposition': `attachment; filename="${profile.full_name.replace(/[^a-zA-Z0-9]/g, '_')}.vcf"`,
    },
  })
}
