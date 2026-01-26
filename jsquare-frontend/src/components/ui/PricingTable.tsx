import { PricingTier } from '@/lib/wordpress/types'

interface PricingTableProps {
  tiers: PricingTier[]
}

export function PricingTable({ tiers }: PricingTableProps) {
  if (!tiers || tiers.length === 0) return null

  // Collect all unique durations across all tiers to form the column headers
  const durations = Array.from(
    new Set(tiers.flatMap((tier) => tier.rates.map((r) => r.duration)))
  )

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full text-left border-collapse min-w-[480px]">
        <thead>
          <tr>
            <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-900 rounded-tl-lg">
              Tier
            </th>
            {durations.map((dur) => (
              <th
                key={dur}
                className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center bg-gray-50 dark:bg-gray-900 last:rounded-tr-lg"
              >
                {dur}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, idx) => {
            // Build a map of duration → price for quick lookup
            const priceMap = new Map(
              tier.rates.map((r) => [r.duration, r.price])
            )

            return (
              <tr
                key={tier.label}
                className={
                  idx % 2 === 0
                    ? 'bg-white dark:bg-black'
                    : 'bg-gray-50/50 dark:bg-gray-900/50'
                }
              >
                <td className="py-3 px-4 text-sm font-light text-gray-900 dark:text-white whitespace-nowrap">
                  {tier.label}
                </td>
                {durations.map((dur) => (
                  <td
                    key={dur}
                    className="py-3 px-4 text-sm font-light text-gray-700 dark:text-gray-300 text-center whitespace-nowrap"
                  >
                    {priceMap.get(dur) ?? '—'}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
