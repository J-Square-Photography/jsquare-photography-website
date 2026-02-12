export type ServiceType = 'photography' | 'videography' | 'photobooth'

export interface ConfiguratorState {
  serviceType: ServiceType
  tierIndex: number
  durationIndex: number
  quantity: number
}

export interface PriceResult {
  unitPrice: number
  hours: number
  crew: number
  total: number
  tierLabel: string
  durationLabel: string
  serviceName: string
}

export type ConfiguratorAction =
  | { type: 'SET_SERVICE_TYPE'; payload: ServiceType }
  | { type: 'SET_TIER'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_QUANTITY'; payload: number }
