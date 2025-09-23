import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://www.jsquarephotography.com/graphql'

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
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
  quality?: string
  location?: string
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
      galleryImages {
        quality
        location
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