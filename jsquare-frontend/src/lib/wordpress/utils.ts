export function extractImagesFromContent(content: string): Array<{ sourceUrl:string; altText:string; caption:string }> {
  const images: Array<{ sourceUrl:string; altText:string; caption:string }> = [];
  const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (!content) return images;

  const processUrl = (url: string) => {
    if (url.startsWith('/')) {
      if (backendUrl) {
        return `${backendUrl}${url}`;
      }
      return null;
    }
    return url;
  };

  const galleryPattern = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi;
  const figurePattern = /<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>[\s\S]*?(?:<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?[
	 ]*?<\/figure>/gi;

  let match;
  while ((match = galleryPattern.exec(content)) !== null) {
    const sourceUrl = processUrl(match[1]);
    if (sourceUrl && !images.find(img => img.sourceUrl === sourceUrl)) {
      images.push({
        sourceUrl,
        altText: match[2] || '',
        caption: '',
      });
    }
  }

  figurePattern.lastIndex = 0;
  while ((match = figurePattern.exec(content)) !== null) {
    const sourceUrl = processUrl(match[1]);
    if (sourceUrl && !images.find(img => img.sourceUrl === sourceUrl)) {
      images.push({
        sourceUrl,
        altText: match[2] || '',
        caption: match[3] ? match[3].replace(/<[^>]*>/g, '') : '',
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

  const blockPattern = /<!-- wp:gallery[\n\t ]*?-->[\n\t ]*?<figure[^>]*>([\n\t ]*?)<\/figure>[\n\t ]*?<!-- \/wp:gallery -->/gi

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