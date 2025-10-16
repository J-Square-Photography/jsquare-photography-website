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
    if (url.startsWith('/')) {
      if (backendUrl) {
        const newUrl = `${backendUrl}${url}`;
        console.log(`[processUrl] Relative URL detected. Converted to: ${newUrl}`);
        return newUrl;
      }
      console.log("[processUrl] Relative URL detected, but backendUrl is not set. Returning null.");
      return null;
    }
    console.log("[processUrl] URL is absolute. Returning as is.");
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
