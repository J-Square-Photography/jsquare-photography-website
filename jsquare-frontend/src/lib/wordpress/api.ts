import { GraphQLClient } from 'graphql-request'
import { SkillLevel, EventType, Service, ServiceCategory } from './types'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
}

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Removed cache: 'no-store' to allow static generation
  // Use Next.js revalidation at page level instead
})

export interface GalleryPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  galleryImages?: {
    nodes: Array<{
      sourceUrl: string
      altText: string
      caption: string
    }>
  }
  categories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  date: string
  portfoliodetails?: {
    location?: string
    skilllevel?: string[]
    eventtype?: string[]
  }
}

export interface StoryPost {
  id: string
  title: string
  slug: string
  content: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  date: string
}

const GET_GALLERIES = `
  query GetGalleries($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { categoryName: "gallery" }) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        portfoliodetails {
          location
          skilllevel
          eventtype
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const GET_GALLERY_BY_SLUG = `
  query GetGalleryBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      portfoliodetails {
        location
        skilllevel
        eventtype
      }
    }
  }
`

const GET_LATEST_STORIES = `
  query GetLatestStories($first: Int = 6) {
    posts(first: $first, where: { categoryName: "story" }) {
      nodes {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export const getGalleries = async (first = 10, after?: string): Promise<{ galleries: GalleryPost[], hasNextPage: boolean, endCursor?: string }> => {
  try {
    const data: any = await graphqlClient.request(GET_GALLERIES, { first, after })
    return {
      galleries: data.posts.nodes,
      hasNextPage: data.posts.pageInfo.hasNextPage,
      endCursor: data.posts.pageInfo.endCursor
    }
  } catch (error) {
    console.error('Error fetching galleries:', error)
    return { galleries: [], hasNextPage: false }
  }
}

export const getGalleryBySlug = async (slug: string): Promise<GalleryPost | null> => {
  try {
    const data: any = await graphqlClient.request(GET_GALLERY_BY_SLUG, { slug })
    return data.postBy
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return null
  }
}

export const getLatestStories = async (first = 6): Promise<StoryPost[]> => {
  try {
    const data: any = await graphqlClient.request(GET_LATEST_STORIES, { first })
    return data.posts.nodes
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

export const getGalleriesByCategory = async (categorySlug: string, first = 10): Promise<GalleryPost[]> => {
  const GET_GALLERIES_BY_CATEGORY = `
    query GetGalleriesByCategory($categorySlug: String!, $first: Int!) {
      posts(first: $first, where: { categoryName: $categorySlug }) {
        nodes {
          id
          title
          slug
          excerpt
          content
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          portfoliodetails {
            location
            skilllevel
            eventtype
          }
        }
      }
    }
  `

  try {
    const data: any = await graphqlClient.request(GET_GALLERIES_BY_CATEGORY, { categorySlug, first })
    return data.posts.nodes
  } catch (error) {
    console.error('Error fetching galleries by category:', error)
    return []
  }
}

export const getFilteredGalleries = async (
  skillLevel?: SkillLevel,
  eventType?: EventType,
  first = 20
): Promise<GalleryPost[]> => {
  try {
    const { galleries } = await getGalleries(first)

    return galleries.filter(gallery => {
      const matchesSkillLevel =
        !skillLevel ||
        skillLevel === 'all' ||
        gallery.portfoliodetails?.skilllevel?.includes(skillLevel)

      const matchesEventType =
        !eventType ||
        eventType === 'all' ||
        gallery.portfoliodetails?.eventtype?.includes(eventType)

      return matchesSkillLevel && matchesEventType
    })
  } catch (error) {
    console.error('Error fetching filtered galleries:', error)
    return []
  }
}

export const getAboutSectionContent = async (): Promise<{
  title: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
} | null> => {
  // First, let's try to query with the exact ACF field group name
  // "About Page Content" should be exposed in GraphQL
  const GET_ABOUT_CONTENT = `
    query GetAboutPageContent {
      pageBy(uri: "about-us") {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        aboutUs {
          title
          description
          imageUrl {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          ctaButtonText
        }
      }
    }
  `;

  // Backup query to get page schema
  const GET_PAGE_SCHEMA = `
    query GetPageSchema {
      pageBy(uri: "about-us") {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  try {
    let data: any;

    // First try with the ACF fields
    try {
      console.log('Attempting to fetch About page with ACF fields...');
      data = await graphqlClient.request(GET_ABOUT_CONTENT);
      console.log('Successfully fetched About page with ACF fields');
    } catch (acfError: any) {
      // If ACF query fails, log the error and try basic query
      console.log('ACF query failed, trying basic page query...');
      console.log('ACF Error details:', acfError?.response?.errors?.[0]?.message);

      // Try basic query without ACF fields
      try {
        data = await graphqlClient.request(GET_PAGE_SCHEMA);
        console.log('Basic page data retrieved successfully');
      } catch (basicError) {
        console.error('Failed to fetch even basic page data:', basicError);
        return null;
      }
    }

    // Check if we have the page
    if (!data?.pageBy) {
      console.log('About page not found in WordPress');
      return null;
    }

    const page = data.pageBy;

    // Try to extract ACF content if it exists
    let title = '';
    let description = '';
    let imageUrl = '';
    let ctaText = 'Get in Touch';

    if (page.aboutUs) {
      // We have ACF data
      const acf = page.aboutUs;
      title = acf.title || '';
      description = acf.description || '';
      imageUrl = acf.imageUrl?.node?.sourceUrl || '';
      ctaText = acf.ctaButtonText || 'Get in Touch';

      console.log('Using ACF data for About section');
    } else {
      // Fallback to page content
      console.log('No ACF data found, using page title and content as fallback');
      title = page.title || 'About J Square Photography';

      // Clean HTML from content if present
      if (page.content) {
        description = page.content
          .replace(/<[^>]*>?/gm, '') // Remove HTML tags
          .replace(/\n\n+/g, '\n') // Replace multiple newlines with single
          .trim();
      }

      imageUrl = page.featuredImage?.node?.sourceUrl || '';
    }

    // Log what we're returning
    console.log('About section content:', {
      hasTitle: !!title,
      hasDescription: !!description,
      hasImage: !!imageUrl,
      hasCtaText: !!ctaText
    });

    return {
      title: title || 'About J Square Photography',
      description: description || 'Professional photography and videography services',
      imageUrl: imageUrl || '',
      ctaText: ctaText
    };
  } catch (error) {
    console.error('Error fetching About page content:', error);
    return null;
  }
};

// ============================================================================
// Services API
// ============================================================================

const GET_SERVICES = `
  query GetServices($first: Int = 100) {
    services(first: $first, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      nodes {
        id
        slug
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        serviceDetails {
          shortDescription
          featuresList {
            featureItem
          }
          pricingInfo
          serviceCategory
          whatsappMessageOverride
          ctaText
          serviceIcon
          serviceGallery {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

const GET_SERVICE_BY_SLUG = `
  query GetServiceBySlug($slug: String!) {
    serviceBy(slug: $slug) {
      id
      slug
      title
      content
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      serviceDetails {
        shortDescription
        featuresList {
          featureItem
        }
        pricingInfo
        serviceCategory
        whatsappMessageOverride
        ctaText
        serviceIcon
        serviceGallery {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

// Fallback services data (used when WordPress is unavailable)
const FALLBACK_SERVICES: Service[] = [
  {
    id: 'fallback-1',
    slug: 'dslr-photobooth',
    title: 'DSLR Photobooth',
    content: 'Capture unforgettable moments with our professional DSLR photobooth service. High-quality photos with instant prints and digital copies.',
    excerpt: 'Professional photobooth with instant prints',
    serviceDetails: {
      shortDescription: 'Professional photobooth with instant prints and digital copies for your events.',
      featuresList: [
        { featureItem: 'Professional DSLR camera with studio lighting' },
        { featureItem: 'Unlimited prints throughout your event' },
        { featureItem: 'Custom photo templates and branding' },
        { featureItem: 'Instant social media sharing' },
        { featureItem: 'Professional attendant included' },
        { featureItem: 'Fun props and backdrops available' }
      ],
      pricingInfo: 'Starting at $500',
      serviceCategory: 'main',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-2',
    slug: 'event-photography',
    title: 'Event Photography',
    content: 'Professional event photography services for corporate events, parties, and special occasions.',
    excerpt: 'Professional coverage of your events',
    serviceDetails: {
      shortDescription: 'Professional coverage of your corporate events, parties, and special occasions.',
      featuresList: [
        { featureItem: 'Professional photographer with backup equipment' },
        { featureItem: 'Full event coverage (up to 8 hours)' },
        { featureItem: 'High-resolution edited photos' },
        { featureItem: 'Online gallery for easy sharing' },
        { featureItem: 'Fast turnaround (5-7 business days)' },
        { featureItem: 'Second shooter available for large events' }
      ],
      pricingInfo: 'Starting at $800',
      serviceCategory: 'main',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-3',
    slug: 'event-videography',
    title: 'Event Videography',
    content: 'Cinematic event videography that tells your story. Professional video production for events and celebrations.',
    excerpt: 'Cinematic video coverage',
    serviceDetails: {
      shortDescription: 'Cinematic video coverage capturing the essence and emotion of your event.',
      featuresList: [
        { featureItem: 'Professional videographer with 4K cameras' },
        { featureItem: 'Cinematic editing with music' },
        { featureItem: 'Highlight reel (3-5 minutes)' },
        { featureItem: 'Full ceremony/event footage' },
        { featureItem: 'Drone footage available (add-on)' },
        { featureItem: 'Color grading and audio enhancement' }
      ],
      pricingInfo: 'Starting at $1,200',
      serviceCategory: 'main',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-4',
    slug: 'wedding-photography-videography',
    title: 'Wedding Photography & Videography',
    content: 'Complete wedding photography and videography packages to capture every moment of your special day.',
    excerpt: 'Complete wedding coverage',
    serviceDetails: {
      shortDescription: 'Complete wedding coverage from getting ready to reception.',
      featuresList: [
        { featureItem: 'Full day coverage (up to 10 hours)' },
        { featureItem: 'Pre-wedding consultation' },
        { featureItem: 'Two photographers' },
        { featureItem: 'Professional editing and color grading' },
        { featureItem: 'Online gallery and USB drive' },
        { featureItem: 'Engagement shoot included' }
      ],
      pricingInfo: 'Custom packages available',
      serviceCategory: 'additional',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-5',
    slug: 'corporate-photography',
    title: 'Corporate Photography',
    content: 'Professional corporate photography for headshots, team photos, events, and marketing materials.',
    excerpt: 'Professional corporate headshots',
    serviceDetails: {
      shortDescription: 'Professional corporate headshots and event coverage.',
      featuresList: [
        { featureItem: 'Professional headshots' },
        { featureItem: 'Corporate event coverage' },
        { featureItem: 'Team photography' },
        { featureItem: 'Office and facility photography' },
        { featureItem: 'Marketing and promotional photos' },
        { featureItem: 'Fast turnaround for urgent needs' }
      ],
      pricingInfo: 'Contact for pricing',
      serviceCategory: 'additional',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-6',
    slug: 'food-photography',
    title: 'Food Photography',
    content: 'Mouth-watering food photography for restaurants, cafes, and food businesses.',
    excerpt: 'Delicious food photography',
    serviceDetails: {
      shortDescription: 'Delicious food photography for menus and marketing materials.',
      featuresList: [
        { featureItem: 'Professional food styling' },
        { featureItem: 'Multiple angles and compositions' },
        { featureItem: 'Natural and studio lighting' },
        { featureItem: 'High-resolution images' },
        { featureItem: 'Social media optimized formats' },
        { featureItem: 'Menu and marketing ready' }
      ],
      pricingInfo: 'Starting at $400',
      serviceCategory: 'additional',
      ctaText: 'Get Quote'
    }
  },
  {
    id: 'fallback-7',
    slug: 'film-production',
    title: 'Film Production',
    content: 'Professional video production services for commercials, promotional videos, and branded content.',
    excerpt: 'Professional video production',
    serviceDetails: {
      shortDescription: 'Professional video production for commercials and branded content.',
      featuresList: [
        { featureItem: 'Pre-production planning' },
        { featureItem: 'Professional crew and equipment' },
        { featureItem: 'Scriptwriting assistance' },
        { featureItem: 'Professional editing and post-production' },
        { featureItem: 'Motion graphics and animation' },
        { featureItem: 'Multiple delivery formats' }
      ],
      pricingInfo: 'Custom quote required',
      serviceCategory: 'additional',
      ctaText: 'Get Quote'
    }
  }
];

export const getServices = async (category?: ServiceCategory): Promise<Service[]> => {
  try {
    console.log('Fetching services from WordPress...');
    const data: any = await graphqlClient.request(GET_SERVICES, { first: 100 });

    if (!data?.services?.nodes || data.services.nodes.length === 0) {
      console.log('No services found in WordPress, using fallback data');
      return category
        ? FALLBACK_SERVICES.filter(s => s.serviceDetails?.serviceCategory === category)
        : FALLBACK_SERVICES;
    }

    console.log(`Successfully fetched ${data.services.nodes.length} services from WordPress`);
    const services = data.services.nodes as Service[];

    // Filter by category if specified
    if (category) {
      return services.filter(s => s.serviceDetails?.serviceCategory === category);
    }

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    console.log('Falling back to hardcoded services');
    return category
      ? FALLBACK_SERVICES.filter(s => s.serviceDetails?.serviceCategory === category)
      : FALLBACK_SERVICES;
  }
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  try {
    console.log(`Fetching service: ${slug}`);
    const data: any = await graphqlClient.request(GET_SERVICE_BY_SLUG, { slug });

    if (!data?.serviceBy) {
      console.log(`Service ${slug} not found in WordPress, checking fallback data`);
      return FALLBACK_SERVICES.find(s => s.slug === slug) || null;
    }

    console.log(`Successfully fetched service: ${slug}`);
    return data.serviceBy as Service;
  } catch (error) {
    console.error(`Error fetching service ${slug}:`, error);
    console.log('Checking fallback data');
    return FALLBACK_SERVICES.find(s => s.slug === slug) || null;
  }
};

export const getMainServices = async (): Promise<Service[]> => {
  return getServices('main');
};

export const getAdditionalServices = async (): Promise<Service[]> => {
  return getServices('additional');
};