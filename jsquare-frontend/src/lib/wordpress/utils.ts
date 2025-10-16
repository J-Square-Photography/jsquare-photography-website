export function extractImagesFromContent(content: string): Array<{ sourceUrl:string; altText:string; caption:string }> {
  const images: Array<{ sourceUrl:string; altText:string; caption:string }> = [];
  const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!content) return images;

  const processUrl = (url: string) => {
    if (url.startsWith('/')) {
      if (backendUrl) {
        return `${backendUrl}${url}`;
      }
      // If backendUrl is not set, we cannot resolve the relative URL.
      // Return null to indicate failure.
      return null;
    }
    return url;
  };

  // Pattern 1: WordPress Gallery Block images
  const galleryPattern = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;

  // Pattern 2: WordPress figure/image blocks
  const figurePattern = /<figure[^>]*>[

	 ]*?<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[

	 ]*?(?:<figcaption[^>]*>([

	 ]*?)<\/figcaption>)?[

	 ]*?<\/figure>/gi;

  // Extract from gallery blocks
  let match;
  while ((match = galleryPattern.exec(content)) !== null) {
    const sourceUrl = processUrl(match[1]);
    if (sourceUrl) {
      // Avoid duplicates that might be caught by both regex patterns
      if (!images.find(img => img.sourceUrl === sourceUrl)) {
        images.push({
          sourceUrl,
          altText: match[2] || '',
          caption: '',
        });
      }
    }
  }

  // Extract from figure blocks (if not already found)
  figurePattern.lastIndex = 0; // Reset regex
  while ((match = figurePattern.exec(content)) !== null) {
    const sourceUrl = processUrl(match[1]);

    // Check if we already have this image and the URL is valid
    if (sourceUrl && !images.find(img => img.sourceUrl === sourceUrl)) {
      images.push({
        sourceUrl,
        altText: match[2] || '',
        caption: match[3] ? match[3].replace(/<[^>]*>/g, '') : '', // Strip HTML from caption
      });
    }
  }

  return images;
}

/**
 * Parse WordPress content to extract gallery images
 * This handles the native WordPress gallery block
 */
export function parseWordPressGallery(content: string): string[] {
  const images: string[] = []

  // Extract image URLs from WordPress gallery block
  // Pattern for wp:gallery blocks
  const blockPattern = /<!-- wp:gallery[

	 ]*?-->[

	 ]*?<figure[^>]*>([

	 ]*?)<\/figure>[

	 ]*?<!-- \/wp:gallery -->/gi

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
