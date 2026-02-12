'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedPrice } from './AnimatedPrice'
import { generateWhatsAppLink } from '@/lib/utils/whatsapp'
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/utils/whatsapp'
import type { PriceResult } from '@/lib/pricing/types'
import type { ServiceType } from '@/lib/pricing/types'
import { SERVICE_TYPE_META } from '@/lib/pricing/data'

interface PriceSummaryProps {
  result: PriceResult
  serviceType: ServiceType
}

function buildWhatsAppMessage(result: PriceResult, serviceType: ServiceType): string {
  const meta = SERVICE_TYPE_META[serviceType]
  const lines = [
    `Hi J Square Photography, I'd like to get a quote for:`,
    ``,
    `Service: ${result.serviceName}`,
    `Skill Level: ${result.tierLabel}`,
    `Duration: ${result.durationLabel}`,
  ]
  if (meta.allowCrew) {
    lines.push(`${meta.crewLabel}: ${result.crew}`)
  }
  lines.push(``)
  lines.push(`Estimated Total: $${result.total.toLocaleString()}`)
  lines.push(``)
  lines.push(`Please let me know the next steps. Thank you!`)
  return lines.join('\n')
}

export const PriceSummary = ({ result, serviceType }: PriceSummaryProps) => {
  const [expanded, setExpanded] = useState(false)
  const meta = SERVICE_TYPE_META[serviceType]
  const whatsAppLink = generateWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    buildWhatsAppMessage(result, serviceType)
  )

  return (
    <>
      {/* Desktop summary card (sticky) */}
      <div className="hidden lg:block sticky top-28">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-light text-gray-900 dark:text-white mb-6 tracking-wider">
            Your Quote
          </h3>

          <div className="space-y-4 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${result.serviceName}-${result.tierLabel}-${result.durationLabel}-${result.crew}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Service</span>
                  <span className="text-gray-900 dark:text-white font-light">
                    {result.serviceName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tier</span>
                  <span className="text-gray-900 dark:text-white font-light">
                    {result.tierLabel}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="text-gray-900 dark:text-white font-light">
                    {result.durationLabel}
                  </span>
                </div>
                {meta.allowCrew && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {meta.crewLabel}
                    </span>
                    <span className="text-gray-900 dark:text-white font-light">
                      {result.crew}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Line item breakdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>
                ${result.unitPrice.toLocaleString()} × {result.crew}{' '}
                {meta.allowCrew ? meta.crewLabel.toLowerCase() : 'unit'}
              </span>
              <span>${result.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline mb-8">
            <span className="text-sm text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Estimated Total
            </span>
            <AnimatedPrice
              value={result.total}
              className="text-3xl font-light text-gray-900 dark:text-white"
            />
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-light text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Get Quote on WhatsApp
          </a>

          {/* Email link */}
          <a
            href="mailto:Jsquarephotographysg@gmail.com"
            className="w-full flex items-center justify-center gap-2 mt-3 px-6 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-light text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Or email us
          </a>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 pt-4 pb-2"
            >
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Service</span>
                  <span className="text-gray-900 dark:text-white">{result.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Tier</span>
                  <span className="text-gray-900 dark:text-white">{result.tierLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="text-gray-900 dark:text-white">{result.durationLabel}</span>
                </div>
                {meta.allowCrew && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{meta.crewLabel}</span>
                    <span className="text-gray-900 dark:text-white">{result.crew}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    ${result.unitPrice.toLocaleString()} × {result.crew}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${result.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2"
          >
            <AnimatedPrice
              value={result.total}
              className="text-xl font-light text-gray-900 dark:text-white"
            />
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-light"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
