import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jsquarephotography.com'

  const staticPages = [
    '',
    '/portfolio',
    '/blog',
    '/clients',
    '/privacy',
    '/terms',
    '/services/dslr-photobooth',
    '/services/event-photography',
    '/services/event-videography',
    '/services/wedding-photography-videography',
    '/services/corporate-photography',
    '/services/food-photography',
  ]

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/services') ? 0.8 : 0.7,
  }))
}
