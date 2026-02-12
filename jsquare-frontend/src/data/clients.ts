// =============================================================================
// Clients Data
// =============================================================================
// To add a new client:
// 1. Place the client's logo in public/clients/ (e.g. public/clients/acme.png)
// 2. Add an entry to the clients array below
// =============================================================================

export interface Client {
  id: string
  name: string
  logoUrl?: string // Path relative to public/, e.g. '/clients/acme.png'
  website?: string // Full URL, e.g. 'https://acme.com'
  category?: string // e.g. 'Corporate', 'Wedding', 'F&B'
}

// ---------------------------------------------------------------------------
// Add your clients here. Example:
//
// {
//   id: '1',
//   name: 'Acme Corp',
//   logoUrl: '/clients/acme.png',
//   website: 'https://acme.com',
//   category: 'Corporate',
// },
// ---------------------------------------------------------------------------
export const clients: Client[] = []
