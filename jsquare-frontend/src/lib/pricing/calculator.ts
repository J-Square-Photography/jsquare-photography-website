import { PricingTier } from '@/lib/wordpress/types'
import {
  PHOTOGRAPHY_PRICING_TIERS,
  VIDEOGRAPHY_PRICING_TIERS,
  PHOTOBOOTH_PRICING_TIERS,
  SERVICE_TYPE_META,
} from './data'
import type { ServiceType, ConfiguratorState, PriceResult } from './types'

export function getTiersForService(serviceType: ServiceType): PricingTier[] {
  switch (serviceType) {
    case 'photography':
      return PHOTOGRAPHY_PRICING_TIERS
    case 'videography':
      return VIDEOGRAPHY_PRICING_TIERS
    case 'photobooth':
      return PHOTOBOOTH_PRICING_TIERS
  }
}

export function getAvailableTiers(serviceType: ServiceType): string[] {
  return getTiersForService(serviceType).map((t) => t.label)
}

export function getAvailableDurations(
  serviceType: ServiceType,
  tierIndex: number
): string[] {
  const tiers = getTiersForService(serviceType)
  const tier = tiers[tierIndex] ?? tiers[0]
  return tier.rates.map((r) => r.duration)
}

function parsePrice(priceStr: string): number {
  return Number(priceStr.replace(/[$,]/g, ''))
}

export function calculatePrice(state: ConfiguratorState): PriceResult {
  const tiers = getTiersForService(state.serviceType)
  const tier = tiers[state.tierIndex] ?? tiers[0]
  const rate = tier.rates[state.durationIndex] ?? tier.rates[0]
  const meta = SERVICE_TYPE_META[state.serviceType]

  const unitPrice = parsePrice(rate.price)
  const hours = Number(rate.duration.match(/\d+/)?.[0] ?? 1)
  const crew = meta.allowCrew ? state.quantity : 1
  const total = unitPrice * crew

  return {
    unitPrice,
    hours,
    crew,
    total,
    tierLabel: tier.label,
    durationLabel: rate.duration,
    serviceName: meta.name,
  }
}

export function getDefaultState(serviceType: ServiceType): ConfiguratorState {
  switch (serviceType) {
    case 'photography':
      return { serviceType, tierIndex: 2, durationIndex: 1, quantity: 1 }
    case 'videography':
      return { serviceType, tierIndex: 2, durationIndex: 1, quantity: 1 }
    case 'photobooth':
      return { serviceType, tierIndex: 0, durationIndex: 0, quantity: 1 }
  }
}
