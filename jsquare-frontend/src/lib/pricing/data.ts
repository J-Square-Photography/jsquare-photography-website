import { PricingTier } from '@/lib/wordpress/types'

export const PHOTOGRAPHY_PRICING_TIERS: PricingTier[] = [
  {
    label: 'Beginner (Student)',
    rates: [
      { duration: '1 Hour', price: '$30' },
      { duration: '2 Hours', price: '$60' },
      { duration: '3 Hours', price: '$90' },
      { duration: '4 Hours', price: '$120' },
    ],
  },
  {
    label: 'Novice',
    rates: [
      { duration: '1 Hour', price: '$50' },
      { duration: '2 Hours', price: '$100' },
      { duration: '3 Hours', price: '$150' },
      { duration: '4 Hours', price: '$200' },
    ],
  },
  {
    label: 'Enthusiast (Recommended)',
    rates: [
      { duration: '1 Hour', price: '$150' },
      { duration: '2 Hours', price: '$300' },
      { duration: '3 Hours', price: '$400' },
      { duration: '4 Hours', price: '$500' },
    ],
  },
  {
    label: 'Professional',
    rates: [
      { duration: '1 Hour', price: '$150' },
      { duration: '2 Hours', price: '$300' },
      { duration: '3 Hours', price: '$450' },
      { duration: '4 Hours', price: '$600' },
    ],
  },
  {
    label: 'Director',
    rates: [
      { duration: '1 Hour', price: '$200' },
      { duration: '2 Hours', price: '$400' },
      { duration: '3 Hours', price: '$600' },
      { duration: '4 Hours', price: '$800' },
    ],
  },
]

export const VIDEOGRAPHY_PRICING_TIERS: PricingTier[] = [
  {
    label: 'Beginner (Student)',
    rates: [
      { duration: '1 Hour', price: '$60' },
      { duration: '2 Hours', price: '$120' },
      { duration: '3 Hours', price: '$180' },
      { duration: '4 Hours', price: '$240' },
    ],
  },
  {
    label: 'Novice',
    rates: [
      { duration: '1 Hour', price: '$100' },
      { duration: '2 Hours', price: '$200' },
      { duration: '3 Hours', price: '$300' },
      { duration: '4 Hours', price: '$400' },
    ],
  },
  {
    label: 'Enthusiast (Recommended)',
    rates: [
      { duration: '1 Hour', price: '$200' },
      { duration: '2 Hours', price: '$400' },
      { duration: '3 Hours', price: '$600' },
      { duration: '4 Hours', price: '$800' },
    ],
  },
  {
    label: 'Professional',
    rates: [
      { duration: '1 Hour', price: '$300' },
      { duration: '2 Hours', price: '$600' },
      { duration: '3 Hours', price: '$900' },
      { duration: '4 Hours', price: '$1,200' },
    ],
  },
  {
    label: 'Director',
    rates: [
      { duration: '1 Hour', price: '$400' },
      { duration: '2 Hours', price: '$800' },
      { duration: '3 Hours', price: '$1,200' },
      { duration: '4 Hours', price: '$1,600' },
    ],
  },
]

export const PHOTOBOOTH_PRICING_TIERS: PricingTier[] = [
  {
    label: 'Package A — Full Service (Recommended)',
    rates: [
      { duration: '2 Hours', price: '$638' },
      { duration: '3 Hours', price: '$788' },
      { duration: '4 Hours', price: '$888' },
    ],
  },
  {
    label: 'Package B — Set-up + Print, No Crew',
    rates: [
      { duration: '2 Hours', price: '$538' },
      { duration: '3 Hours', price: '$688' },
      { duration: '4 Hours', price: '$788' },
    ],
  },
  {
    label: 'Package C — Digital Only, No Print, No Crew',
    rates: [
      { duration: '2 Hours', price: '$388' },
      { duration: '3 Hours', price: '$488' },
      { duration: '4 Hours', price: '$538' },
    ],
  },
]

export const SERVICE_TYPE_META = {
  photography: {
    name: 'Event Photography',
    crewLabel: 'Photographers',
    allowCrew: true,
  },
  videography: {
    name: 'Event Videography',
    crewLabel: 'Videographers',
    allowCrew: true,
  },
  photobooth: {
    name: 'DSLR Photobooth',
    crewLabel: 'Crew',
    allowCrew: false,
  },
} as const
