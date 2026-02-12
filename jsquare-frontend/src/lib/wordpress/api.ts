import { GraphQLClient } from 'graphql-request'
import { SkillLevel, EventType, Service, ServiceCategory } from './types'
import {
  PHOTOGRAPHY_PRICING_TIERS,
  VIDEOGRAPHY_PRICING_TIERS,
  PHOTOBOOTH_PRICING_TIERS,
} from '../pricing/data'

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

// Pricing tiers are imported from @/lib/pricing/data

// Fallback services data (used when WordPress is unavailable)
const FALLBACK_SERVICES: Service[] = [
  {
    id: 'fallback-1',
    slug: 'event-photography',
    title: 'Event Photography',
    content:
      'Our event photography service delivers professional coverage for corporate functions, birthday celebrations, cultural events, and private parties. Every photographer in our roster is matched to your event based on skill level so you get the style and expertise that fits your budget. We handle everything from candid moments to formal group shots, with all photos filtered, edited, and delivered within 2 weeks after your event.',
    excerpt: 'Professional event photography tailored to your budget',
    serviceDetails: {
      shortDescription:
        'Professional event photography with photographers matched to your budget and style.',
      featuresList: [
        { featureItem: 'Photographer matched to your preferred skill level' },
        { featureItem: 'Filtered and edited photos delivered within 2 weeks' },
        { featureItem: 'High-resolution digital delivery' },
        { featureItem: 'Backup equipment on every shoot' },
        { featureItem: 'Second shooter available for large events' },
      ],
      pricingInfo: 'From $150/hr',
      pricingTiers: PHOTOGRAPHY_PRICING_TIERS,
      serviceCategory: 'main',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-2',
    slug: 'event-videography',
    title: 'Event Videography',
    content:
      'Bring your event to life with cinematic videography. Our videographers capture the energy, emotion, and key moments of your occasion in 1080p. Choose from a range of skill levels — from clean, documentary-style coverage to full cinematic productions with a filtered and edited highlight reel. All footage is delivered within 2 weeks after your event.',
    excerpt: 'Cinematic event videography in 1080p',
    serviceDetails: {
      shortDescription:
        'Cinematic 1080p event videography — from documentary coverage to full cinematic productions.',
      featuresList: [
        { featureItem: '1080p video capture with professional audio' },
        { featureItem: 'Highlight reel (2–3 min), filtered and edited, delivered within 2 weeks' },
        { featureItem: 'Full event footage delivered digitally' },
        { featureItem: 'Basic colour grading and basic audio enhancement' },
      ],
      pricingInfo: 'From $200/hr',
      pricingTiers: VIDEOGRAPHY_PRICING_TIERS,
      serviceCategory: 'main',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-3',
    slug: 'dslr-photobooth',
    title: 'DSLR Photobooth',
    content:
      'Add a fun, interactive element to your event with our DSLR photobooth. Unlike standard booth rentals, we use professional DSLR cameras with studio lighting for sharp, high-quality photos your guests will actually want to keep.\n\nWe offer three packages to suit different needs:\n\nPackage A (Full Service) — Includes a professional media crew on-site throughout your event to handle everything and troubleshoot any issues, plus an LCD panel with your choice of display content.\n\nPackage B (Set-up + Print, No Crew) — We set up and configure everything before your event. Includes printing but no on-site crew during the event.\n\nPackage C (Digital Only, No Print, No Crew) — The booth is set up for your event with digital photo capture only. No printing and no on-site crew.\n\nPrint formats available: Strips and 4R size. Guests can choose from different templates before printing. We recommend Package A for the best experience.',
    excerpt: 'Professional DSLR photobooth with instant prints',
    serviceDetails: {
      shortDescription:
        'High-quality DSLR photobooth with instant prints, custom templates, and a dedicated crew.',
      featuresList: [
        { featureItem: 'Professional DSLR camera with studio lighting' },
        { featureItem: 'Industry standard printer with high-quality, fast printing' },
        { featureItem: 'Unlimited prints (Packages A & B)' },
        { featureItem: 'Range of backdrops for your selection' },
        { featureItem: 'Complimentary props provided' },
        { featureItem: 'Customised graphic designs for photo frame templates' },
        { featureItem: 'Print formats: Strips and 4R with selectable templates' },
        { featureItem: 'Professional media crew on-site (Package A)' },
        { featureItem: 'LCD panel display customisation (Package A)' },
      ],
      pricingInfo: 'From $388',
      pricingTiers: PHOTOBOOTH_PRICING_TIERS,
      serviceCategory: 'main',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-4',
    slug: 'wedding-photography-videography',
    title: 'Wedding Photography & Videography',
    content:
      'Your wedding day deserves complete, worry-free coverage. Our wedding packages pair an experienced photographer and videographer to document every moment — from getting ready through the last dance. We work closely with you before the big day to understand your timeline, style preferences, and must-have shots.',
    excerpt: 'Complete wedding photo and video coverage',
    serviceDetails: {
      shortDescription:
        'Complete wedding coverage from preparations to reception, tailored to your vision.',
      featuresList: [
        { featureItem: 'Full-day coverage (up to 10 hours)' },
        { featureItem: 'Pre-wedding consultation and timeline planning' },
        { featureItem: 'Two photographers + videographer' },
        { featureItem: 'Cinematic highlight film and full ceremony edit' },
        { featureItem: 'Online gallery and USB drive delivery' },
        { featureItem: 'Engagement shoot included' },
      ],
      pricingInfo: 'Custom packages',
      serviceCategory: 'additional',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-5',
    slug: 'corporate-photography',
    title: 'Corporate Photography',
    content:
      'Present a professional image with polished corporate photography. We provide headshots, team photos, office environment shots, and on-site event coverage for businesses of all sizes. Fast turnaround options are available for time-sensitive projects.',
    excerpt: 'Professional headshots and corporate event coverage',
    serviceDetails: {
      shortDescription:
        'Professional headshots, team photos, and corporate event coverage.',
      featuresList: [
        { featureItem: 'Individual and team headshots' },
        { featureItem: 'On-location or studio setting' },
        { featureItem: 'Corporate event and conference coverage' },
        { featureItem: 'Office and facility photography' },
        { featureItem: 'Express turnaround available' },
        { featureItem: 'Brand-consistent editing and retouching' },
      ],
      pricingInfo: 'Contact for pricing',
      serviceCategory: 'additional',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-6',
    slug: 'food-photography',
    title: 'Food Photography',
    content:
      'Make your menu irresistible with professional food photography. We work with restaurants, cafes, caterers, and food brands to create mouth-watering images optimised for print menus, websites, and social media.',
    excerpt: 'Mouth-watering food photography for menus and marketing',
    serviceDetails: {
      shortDescription:
        'Stunning food photography for menus, websites, and social media campaigns.',
      featuresList: [
        { featureItem: 'Professional food styling guidance' },
        { featureItem: 'Multiple angles and compositions per dish' },
        { featureItem: 'Natural and studio lighting setups' },
        { featureItem: 'High-resolution images for print and web' },
        { featureItem: 'Social-media-ready crops and formats' },
        { featureItem: 'Flat-lay and lifestyle compositions' },
      ],
      pricingInfo: 'From $400',
      serviceCategory: 'additional',
      ctaText: 'Get Quote',
    },
  },
  {
    id: 'fallback-7',
    slug: 'film-production',
    title: 'Film Production',
    content:
      'From concept to final cut, our film production service covers commercials, promotional videos, brand stories, and social content. We handle scriptwriting, storyboarding, filming, editing, colour grading, and motion graphics — everything you need for a polished final product.',
    excerpt: 'End-to-end video production for brands and businesses',
    serviceDetails: {
      shortDescription:
        'End-to-end video production — commercials, promos, and branded content.',
      featuresList: [
        { featureItem: 'Pre-production planning and storyboarding' },
        { featureItem: 'Professional crew and cinema-grade equipment' },
        { featureItem: 'Scriptwriting assistance' },
        { featureItem: 'Editing, colour grading, and sound design' },
        { featureItem: 'Motion graphics and titling' },
        { featureItem: 'Delivered in multiple formats and aspect ratios' },
      ],
      pricingInfo: 'Custom quote',
      serviceCategory: 'additional',
      ctaText: 'Get Quote',
    },
  },
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