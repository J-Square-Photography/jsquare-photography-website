'use client'

import { useReducer } from 'react'
import { LayoutGroup, AnimatePresence, motion } from 'framer-motion'
import { ServiceTypeSelector } from './ServiceTypeSelector'
import { TierSelector } from './TierSelector'
import { DurationSelector } from './DurationSelector'
import { QuantitySelector } from './QuantitySelector'
import { PriceSummary } from './PriceSummary'
import {
  getAvailableTiers,
  getAvailableDurations,
  calculatePrice,
  getDefaultState,
} from '@/lib/pricing/calculator'
import { SERVICE_TYPE_META } from '@/lib/pricing/data'
import type { ConfiguratorState, ConfiguratorAction } from '@/lib/pricing/types'

function reducer(
  state: ConfiguratorState,
  action: ConfiguratorAction
): ConfiguratorState {
  switch (action.type) {
    case 'SET_SERVICE_TYPE':
      return getDefaultState(action.payload)
    case 'SET_TIER': {
      // When tier changes, clamp duration index to available durations
      const durations = getAvailableDurations(state.serviceType, action.payload)
      return {
        ...state,
        tierIndex: action.payload,
        durationIndex: Math.min(state.durationIndex, durations.length - 1),
      }
    }
    case 'SET_DURATION':
      return { ...state, durationIndex: action.payload }
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload }
    default:
      return state
  }
}

export const PricingConfigurator = () => {
  const [state, dispatch] = useReducer(reducer, getDefaultState('photography'))

  const tiers = getAvailableTiers(state.serviceType)
  const durations = getAvailableDurations(state.serviceType, state.tierIndex)
  const result = calculatePrice(state)
  const meta = SERVICE_TYPE_META[state.serviceType]

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
        {/* Left column -- Controls */}
        <div className="lg:col-span-3 space-y-6 md:space-y-10 pb-20 lg:pb-0">
          {/* Service Type */}
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase font-light">
              Service Type
            </label>
            <ServiceTypeSelector
              selected={state.serviceType}
              onSelect={(t) => dispatch({ type: 'SET_SERVICE_TYPE', payload: t })}
            />
          </div>

          {/* Tier */}
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase font-light">
              {state.serviceType === 'photobooth' ? 'Package' : 'Skill Level'}
            </label>
            <TierSelector
              tiers={tiers}
              selected={state.tierIndex}
              onSelect={(i) => dispatch({ type: 'SET_TIER', payload: i })}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase font-light">
              Duration
            </label>
            <DurationSelector
              durations={durations}
              selected={state.durationIndex}
              onSelect={(i) => dispatch({ type: 'SET_DURATION', payload: i })}
            />
          </div>

          {/* Quantity (hidden for photobooth) */}
          <AnimatePresence>
            {meta.allowCrew && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase font-light">
                  Number of {meta.crewLabel}
                </label>
                <QuantitySelector
                  value={state.quantity}
                  label={meta.crewLabel}
                  onChange={(v) =>
                    dispatch({ type: 'SET_QUANTITY', payload: v })
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column -- Summary */}
        <div className="lg:col-span-2">
          <PriceSummary result={result} serviceType={state.serviceType} />
        </div>
      </div>
    </LayoutGroup>
  )
}
