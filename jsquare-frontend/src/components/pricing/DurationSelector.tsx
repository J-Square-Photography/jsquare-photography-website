'use client'

import { motion } from 'framer-motion'

interface DurationSelectorProps {
  durations: string[]
  selected: number
  onSelect: (index: number) => void
}

export const DurationSelector = ({
  durations,
  selected,
  onSelect,
}: DurationSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {durations.map((d, i) => {
        const isActive = selected === i
        return (
          <button
            key={d}
            onClick={() => onSelect(i)}
            className="relative px-5 py-2.5 rounded-lg text-sm font-light transition-colors duration-200"
          >
            {isActive && (
              <motion.div
                layoutId="duration-pill"
                className="absolute inset-0 rounded-lg bg-gray-900 dark:bg-white"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isActive
                  ? 'text-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {d}
            </span>
          </button>
        )
      })}
    </div>
  )
}
