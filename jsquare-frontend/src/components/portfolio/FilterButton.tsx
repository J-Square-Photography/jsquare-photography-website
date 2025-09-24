'use client'

interface FilterButtonProps {
  label: string
  value: string
  isActive: boolean
  onClick: (value: string) => void
}

export function FilterButton({ label, value, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        px-3 py-1.5 text-xs font-light transition-all duration-200
        border rounded-full
        ${
          isActive
            ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white'
            : 'bg-transparent text-gray-700 border-gray-300 hover:border-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:border-white'
        }
      `}
    >
      {label}
    </button>
  )
}