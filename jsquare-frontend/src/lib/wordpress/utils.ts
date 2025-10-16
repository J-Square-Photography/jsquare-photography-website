export function extractImagesFromContent(content: string): Array<{ sourceUrl: string; altText: string; caption: string }> {
  const images: Array<{ sourceUrl: string; altText: string; caption: string }> = [];
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

  content.split('<img').slice(1).forEach(chunk => {
    const srcMatch = chunk.match(/src=\"([^\"]+)\"/);
    const altMatch = chunk.match(/alt=\"([^\"]*)\"/);

    if (srcMatch && srcMatch[1]) {
      const sourceUrl = processUrl(srcMatch[1]);
      if (sourceUrl) {
        if (!images.find(img => img.sourceUrl === sourceUrl)) {
          images.push({
            sourceUrl,
            altText: (altMatch && altMatch[1]) ? altMatch[1] : '',
            caption: '', // Sacrificing caption detection for stability
          });
        }
      }
    }
  });

  return images;
}

export function parseWordPressGallery(content: string): string[] {
  const images: string[] = [];
  if (!content) return images;

  content.split('<img').slice(1).forEach(chunk => {
    const srcMatch = chunk.match(/src=\"([^\"]+)\"/);
    if (srcMatch && srcMatch[1]) {
      if (!images.includes(srcMatch[1])) {
        images.push(srcMatch[1]);
      }
    }
  });

  return images;
}