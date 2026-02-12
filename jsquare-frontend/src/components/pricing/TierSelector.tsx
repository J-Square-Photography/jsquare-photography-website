'use client'

import { motion } from 'framer-motion'

interface TierSelectorProps {
  tiers: string[]
  selected: number
  onSelect: (index: number) => void
}

function shortLabel(label: string): string {
  // For photobooth: "Package A — Full Service (Recommended)" -> "Package A"
  if (label.startsWith('Package')) {
    return label.split('—')[0].trim()
  }
  // For photo/video: strip "(Recommended)" / "(Student)"
  return label.replace(/\s*\(.*?\)\s*/g, '').trim()
}

function isRecommended(label: string): boolean {
  return label.toLowerCase().includes('recommended')
}

export const TierSelector = ({ tiers, selected, onSelect }: TierSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tiers.map((tier, i) => {
        const isActive = selected === i
        const recommended = isRecommended(tier)
        return (
          <button
            key={tier}
            onClick={() => onSelect(i)}
            className="relative px-4 py-2 rounded-full text-sm font-light transition-colors duration-200"
          >
            {isActive && (
              <motion.div
                layoutId="tier-pill"
                className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                isActive
                  ? 'text-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {shortLabel(tier)}
              {recommended && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive
                      ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Recommended
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
