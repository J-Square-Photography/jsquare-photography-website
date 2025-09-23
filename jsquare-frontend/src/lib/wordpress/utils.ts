/**
 * Extract image URLs from WordPress content
 * Handles both gallery blocks and regular images
 */
export function extractImagesFromContent(content: string): Array<{ sourceUrl: string; altText: string; caption: string }> {
  const images: Array<{ sourceUrl: string; altText: string; caption: string }> = []

  if (!content) return images

  // Pattern 1: WordPress Gallery Block images
  const galleryPattern = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi

  // Pattern 2: WordPress figure/image blocks
  const figurePattern = /<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[\s\S]*?(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?[\s\S]*?<\/figure>/gi

  // Extract from gallery blocks
  let match
  while ((match = galleryPattern.exec(content)) !== null) {
    images.push({
      sourceUrl: match[1],
      altText: match[2] || '',
      caption: ''
    })
  }

  // Extract from figure blocks (if not already found)
  galleryPattern.lastIndex = 0 // Reset regex
  while ((match = figurePattern.exec(content)) !== null) {
    const url = match[1]
    // Check if we already have this image
    if (!images.find(img => img.sourceUrl === url)) {
      images.push({
        sourceUrl: url,
        altText: match[2] || '',
        caption: match[3] ? match[3].replace(/<[^>]*>/g, '') : '' // Strip HTML from caption
      })
    }
  }

  return images
}

/**
 * Parse WordPress content to extract gallery images
 * This handles the native WordPress gallery block
 */
export function parseWordPressGallery(content: string): string[] {
  const images: string[] = []

  // Extract image URLs from WordPress gallery block
  // Pattern for wp:gallery blocks
  const blockPattern = /<!-- wp:gallery[\s\S]*?-->[\s\S]*?<figure[^>]*>([\s\S]*?)<\/figure>[\s\S]*?<!-- \/wp:gallery -->/gi

  let blockMatch
  while ((blockMatch = blockPattern.exec(content)) !== null) {
    const galleryContent = blockMatch[1]
    const imgPattern = /<img[^>]+src="([^"]+)"/gi
    let imgMatch

    while ((imgMatch = imgPattern.exec(galleryContent)) !== null) {
      images.push(imgMatch[1])
    }
  }

  // Also check for regular img tags outside of gallery blocks
  const standaloneImgPattern = /<img[^>]+src="([^"]+)"/gi
  let imgMatch

  while ((imgMatch = standaloneImgPattern.exec(content)) !== null) {
    if (!images.includes(imgMatch[1])) {
      images.push(imgMatch[1])
    }
  }

  return images
}