interface VCardData {
  fullName: string
  jobTitle?: string
  email?: string
  phone?: string
  whatsapp?: string
  website?: string
  instagram?: string
  linkedin?: string
}

export function generateVCard(data: VCardData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCard(data.fullName)}`,
  ]

  const nameParts = data.fullName.split(' ')
  const lastName = nameParts.length > 1 ? nameParts.slice(-1)[0] : ''
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : data.fullName
  lines.push(`N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`)

  if (data.jobTitle) {
    lines.push(`TITLE:${escapeVCard(data.jobTitle)}`)
  }

  lines.push('ORG:J Square Photography')

  if (data.email) {
    lines.push(`EMAIL;type=INTERNET;type=WORK:${data.email}`)
  }

  if (data.phone) {
    lines.push(`TEL;type=CELL:${data.phone}`)
  }

  if (data.whatsapp && data.whatsapp !== data.phone) {
    lines.push(`TEL;type=VOICE:${data.whatsapp}`)
  }

  if (data.website) {
    lines.push(`URL:${data.website}`)
  }

  if (data.instagram) {
    lines.push(`X-SOCIALPROFILE;type=instagram:${data.instagram}`)
  }

  if (data.linkedin) {
    lines.push(`X-SOCIALPROFILE;type=linkedin:${data.linkedin}`)
  }

  lines.push('END:VCARD')

  return lines.join('\r\n')
}

function escapeVCard(str: string): string {
  return str.replace(/[\\;,]/g, (match) => `\\${match}`)
}
