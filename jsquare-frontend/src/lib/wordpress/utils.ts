export function extractImagesFromContent(content: string): Array<{ sourceUrl: string; altText: string; caption: string }> {
  console.log("--- [extractImagesFromContent] START ---");
  const images: Array<{ sourceUrl: string; altText: string; caption: string }> = [];
  const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  
  console.log(`[extractImagesFromContent] Backend URL: ${backendUrl}`);

  if (!content) {
    console.log("[extractImagesFromContent] Content is empty. Returning empty array.");
    return images;
  }
  console.log(`[extractImagesFromContent] Received content snippet: ${content.substring(0, 200)}...`);

  const processUrl = (url: string) => {
    console.log(`[processUrl] Processing URL: ${url}`);

    // FIRST: Check for and fix double protocols (e.g., "https://https//")
    if (url.includes('://') && (url.includes('://https//') || url.includes('://http//'))) {
      // Remove the duplicate protocol
      const fixedUrl = url.replace(/https?:\/\/https?\/\//, 'https://');
      console.log(`[processUrl] Fixed double protocol: ${url} -> ${fixedUrl}`);
      return fixedUrl;
    }

    // Fix malformed protocols (e.g., "https//" without colon)
    if (url.startsWith('https//')) {
      const fixedUrl = url.replace('https//', 'https://');
      console.log(`[processUrl] Fixed malformed protocol: ${url} -> ${fixedUrl}`);
      return fixedUrl;
    }

    if (url.startsWith('http//')) {
      const fixedUrl = url.replace('http//', 'http://');
      console.log(`[processUrl] Fixed malformed protocol: ${url} -> ${fixedUrl}`);
      return fixedUrl;
    }

    // NOW check if URL already has a proper protocol (after fixing malformed ones)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log("[processUrl] URL has proper protocol. Returning as is.");
      return url;
    }

    // Handle protocol-relative URLs (e.g., "//domain.com")
    if (url.startsWith('//')) {
      const fixedUrl = `https:${url}`;
      console.log(`[processUrl] Protocol-relative URL detected. Converted to: ${fixedUrl}`);
      return fixedUrl;
    }

    // Handle relative URLs starting with /
    if (url.startsWith('/')) {
      if (backendUrl) {
        const newUrl = `${backendUrl}${url}`;
        console.log(`[processUrl] Relative URL detected. Converted to: ${newUrl}`);
        return newUrl;
      }
      console.log("[processUrl] Relative URL detected, but backendUrl is not set. Returning null.");
      return null;
    }

    // For any other format, assume it's already a valid URL
    console.log("[processUrl] URL format not recognized, returning as is.");
    return url;
  };

  content.split('<img').slice(1).forEach((chunk, index) => {
    console.log(`
[extractImagesFromContent] Processing chunk ${index + 1}`);
    const srcMatch = chunk.match(/src=\"([^\"]+)\"/);
    const altMatch = chunk.match(/alt=\"([^\"]*)\"/);

    if (srcMatch && srcMatch[1]) {
      console.log(`[extractImagesFromContent] Found srcMatch: ${srcMatch[1]}`);
      const sourceUrl = processUrl(srcMatch[1]);
      if (sourceUrl) {
        console.log(`[extractImagesFromContent] Processed sourceUrl: ${sourceUrl}`);
        if (!images.find(img => img.sourceUrl === sourceUrl)) {
          images.push({
            sourceUrl,
            altText: (altMatch && altMatch[1]) ? altMatch[1] : '',
            caption: '',
          });
        } else {
          console.log(`[extractImagesFromContent] Duplicate image found. Skipping.`);
        }
      } else {
        console.log(`[extractImagesFromContent] processUrl returned null. Skipping image.`);
      }
    } else {
      console.log(`[extractImagesFromContent] No srcMatch found in chunk.`);
    }
  });

  console.log(`[extractImagesFromContent] Final images array:`, JSON.stringify(images, null, 2));
  console.log("--- [extractImagesFromContent] END ---");
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
