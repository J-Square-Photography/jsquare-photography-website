/**
 * WhatsApp Utility Functions
 * Generates WhatsApp links with prefilled messages
 */

export interface WhatsAppLinkOptions {
  phoneNumber: string
  message: string
}

/**
 * Generates a WhatsApp click-to-chat link with a prefilled message
 *
 * @param phoneNumber - WhatsApp phone number (format: country code + number, e.g., "6591234567")
 * @param message - Prefilled message text
 * @returns WhatsApp URL
 *
 * @example
 * ```typescript
 * const link = generateWhatsAppLink("6591234567", "Hi, I'm interested in your services!")
 * // Returns: "https://wa.me/6591234567?text=Hi%2C%20I'm%20interested%20in%20your%20services!"
 * ```
 */
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  // Remove any non-digit characters from phone number
  const cleanNumber = phoneNumber.replace(/\D/g, '')

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Generate WhatsApp link
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

/**
 * Generates a service-specific WhatsApp message
 *
 * @param serviceName - Name of the service
 * @param customMessage - Optional custom message override
 * @returns Formatted message string
 *
 * @example
 * ```typescript
 * const message = generateServiceWhatsAppMessage("DSLR Photobooth")
 * // Returns: "Hi J Square Photography, I'm interested in your DSLR Photobooth service. I'd like to know more details and get a quote."
 * ```
 */
export function generateServiceWhatsAppMessage(
  serviceName: string,
  customMessage?: string
): string {
  if (customMessage) {
    return customMessage
  }

  return `Hi J Square Photography, I'm interested in your ${serviceName} service. I'd like to know more details and get a quote.`
}

/**
 * Generates a complete WhatsApp link for a service
 *
 * @param phoneNumber - WhatsApp phone number
 * @param serviceName - Name of the service
 * @param customMessage - Optional custom message override
 * @returns WhatsApp URL with prefilled service message
 *
 * @example
 * ```typescript
 * const link = generateServiceWhatsAppLink("6591234567", "Event Photography")
 * ```
 */
export function generateServiceWhatsAppLink(
  phoneNumber: string,
  serviceName: string,
  customMessage?: string
): string {
  const message = generateServiceWhatsAppMessage(serviceName, customMessage)
  return generateWhatsAppLink(phoneNumber, message)
}

/**
 * Default WhatsApp business number for J Square Photography
 */
export const DEFAULT_WHATSAPP_NUMBER = '6580373735'

/**
 * Generates a general inquiry WhatsApp link
 *
 * @param phoneNumber - WhatsApp phone number (optional, uses default)
 * @returns WhatsApp URL with general inquiry message
 */
export function generateInquiryWhatsAppLink(phoneNumber?: string): string {
  const number = phoneNumber || DEFAULT_WHATSAPP_NUMBER
  const message = "Hi J Square Photography, I'm interested in learning more about your services."
  return generateWhatsAppLink(number, message)
}
