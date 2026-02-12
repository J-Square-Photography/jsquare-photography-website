import { z } from 'zod'

const optionalUrl = z.string().url('Please enter a valid URL').or(z.literal('')).optional()

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  job_title: z.string().max(100).optional().default(''),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional().default(''),
  phone: z.string().max(20).optional().default(''),
  whatsapp: z.string().max(20).optional().default(''),
  telegram: z.string().max(50).optional().default(''),
  contact_email: z.string().email('Please enter a valid email').or(z.literal('')).optional().default(''),
})

export const socialLinksSchema = z.object({
  instagram: optionalUrl,
  linkedin: optionalUrl,
  facebook: optionalUrl,
  tiktok: optionalUrl,
  youtube: optionalUrl,
  twitter: optionalUrl,
  behance: optionalUrl,
})

export type ProfileInput = z.infer<typeof profileSchema>
export type SocialLinksInput = z.infer<typeof socialLinksSchema>
