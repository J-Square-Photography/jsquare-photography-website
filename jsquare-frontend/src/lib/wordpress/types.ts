export type SkillLevel = 'all' | 'beginner' | 'novice' | 'enthusiast' | 'professional' | 'director'
export type EventType = 'all' | 'weddings' | 'events' | 'photobooth' | 'corporate' | 'others'

export interface PortfolioFilters {
  skillLevel: SkillLevel
  eventType: EventType
}

export interface FilterOption {
  label: string
  value: string
}

export const SKILL_LEVELS: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Novice', value: 'novice' },
  { label: 'Enthusiast', value: 'enthusiast' },
  { label: 'Professional', value: 'professional' },
  { label: 'Director', value: 'director' }
]

export const EVENT_TYPES: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Events', value: 'events' },
  { label: 'Photobooth', value: 'photobooth' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Others', value: 'others' }
]

// Service types
export type ServiceCategory = 'main' | 'additional'

export interface WPImage {
  sourceUrl: string
  altText?: string
  mediaDetails?: {
    width?: number
    height?: number
  }
}

export interface ServiceFeature {
  featureItem: string
}

export interface ServiceDetails {
  shortDescription?: string
  featuresList?: ServiceFeature[]
  pricingInfo?: string
  serviceCategory?: ServiceCategory
  whatsappMessageOverride?: string
  ctaText?: string
  serviceIcon?: string
  serviceGallery?: WPImage[]
}

export interface Service {
  id: string
  slug: string
  title: string
  content?: string
  excerpt?: string
  featuredImage?: {
    node: WPImage
  }
  serviceDetails?: ServiceDetails
}