'use client'

import { motion } from 'framer-motion'
import type { ServiceType } from '@/lib/pricing/types'

const services: { type: ServiceType; label: string; icon: string; desc: string }[] = [
  {
    type: 'photography',
    label: 'Photography',
    icon: '📷',
    desc: 'Event & portrait coverage',
  },
  {
    type: 'videography',
    label: 'Videography',
    icon: '🎬',
    desc: 'Professional video production',
  },
  {
    type: 'photobooth',
    label: 'Photobooth',
    icon: '🖼️',
    desc: 'DSLR photobooth packages',
  },
]

interface ServiceTypeSelectorProps {
  selected: ServiceType
  onSelect: (type: ServiceType) => void
}

export const ServiceTypeSelector = ({
  selected,
  onSelect,
}: ServiceTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {services.map((s) => {
        const isActive = selected === s.type
        return (
          <button
            key={s.type}
            onClick={() => onSelect(s.type)}
            className={`relative rounded-xl p-4 text-left transition-colors duration-200 border ${
              isActive
                ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-900'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="service-indicator"
                className="absolute inset-0 rounded-xl border-2 border-gray-900 dark:border-white"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="text-2xl block mb-2">{s.icon}</span>
            <span
              className={`text-sm font-medium block ${
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {s.label}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500 block mt-0.5">
              {s.desc}
            </span>
          </button>
        )
      })}
    </div>
  )
}
