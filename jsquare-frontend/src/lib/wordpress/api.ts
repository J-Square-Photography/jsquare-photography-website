import { GraphQLClient } from 'graphql-request'
import { SkillLevel, EventType } from './types'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined')
}

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store', // Disable caching
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
          galleryImages: acfGallery {
            images {
              sourceUrl
              altText
              caption
            }
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