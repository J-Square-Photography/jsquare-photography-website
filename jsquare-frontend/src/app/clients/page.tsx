import type { Metadata } from 'next'
import ClientsPageContent from './ClientsPageContent'

export const metadata: Metadata = {
  title: 'Our Clients | J Square Photography',
  description:
    'Explore the brands, organisations, and individuals we have had the pleasure of working with at J Square Photography.',
}

export default function ClientsPage() {
  return <ClientsPageContent />
}
