'use client'

import { FilterButton } from './FilterButton'
import { SKILL_LEVELS, EVENT_TYPES, PortfolioFilters as Filters } from '@/lib/wordpress/types'

interface PortfolioFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
  totalCount?: number
  filteredCount?: number
}

export function PortfolioFilters({
  filters,
  onFilterChange,
  totalCount,
  filteredCount
}: PortfolioFiltersProps) {
  const handleSkillLevelChange = (skillLevel: string) => {
    onFilterChange({ ...filters, skillLevel: skillLevel as Filters['skillLevel'] })
  }

  const handleEventTypeChange = (eventType: string) => {
    onFilterChange({ ...filters, eventType: eventType as Filters['eventType'] })
  }

  const hasActiveFilters = filters.skillLevel !== 'all' || filters.eventType !== 'all'

  return (
    <div className="mb-8">
      {/* Filters in one row with divider */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
        {/* Skill Level Filter Group */}
        <div className="flex flex-col items-center space-y-3">
          <label className="text-xs font-light uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Skill Level
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {SKILL_LEVELS.map((level) => (
              <FilterButton
                key={level.value}
                label={level.label}
                value={level.value}
                isActive={filters.skillLevel === level.value}
                onClick={handleSkillLevelChange}
              />
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px h-16 bg-gray-300 dark:bg-gray-700" />

        {/* Event Type Filter Group */}
        <div className="flex flex-col items-center space-y-3">
          <label className="text-xs font-light uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Event Type
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {EVENT_TYPES.map((type) => (
              <FilterButton
                key={type.value}
                label={type.label}
                value={type.value}
                isActive={filters.eventType === type.value}
                onClick={handleEventTypeChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters - always reserve space to prevent layout shift */}
      <div className="text-center mt-4 h-5">
        {hasActiveFilters && (
          <button
            onClick={() => onFilterChange({ skillLevel: 'all', eventType: 'all' })}
            className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}