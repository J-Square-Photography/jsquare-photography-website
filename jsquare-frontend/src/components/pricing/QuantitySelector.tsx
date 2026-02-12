'use client'

interface QuantitySelectorProps {
  value: number
  label: string
  min?: number
  max?: number
  onChange: (value: number) => void
}

export const QuantitySelector = ({
  value,
  label,
  min = 1,
  max = 4,
  onChange,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-light text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 dark:disabled:hover:border-gray-600"
      >
        −
      </button>
      <div className="text-center min-w-[60px]">
        <span className="text-2xl font-light text-gray-900 dark:text-white">
          {value}
        </span>
        <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {label}
        </span>
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-light text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 dark:disabled:hover:border-gray-600"
      >
        +
      </button>
    </div>
  )
}
