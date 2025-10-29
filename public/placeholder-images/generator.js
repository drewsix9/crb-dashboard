// Placeholder Image Generator
// Generate placeholder images using a service like Lorem Picsum or Unsplash

/**
 * Get placeholder image URL for CRB trap images
 * Using Lorem Picsum for development
 * @param {number} id - Image ID
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImageUrl = (id, width = 800, height = 600) => {
  // Using Lorem Picsum with a seed for consistent images
  const seed = `crb-${id}`;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

/**
 * Get thumbnail image URL
 * @param {number} id - Image ID
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (id) => {
  return getPlaceholderImageUrl(id, 300, 225);
};

/**
 * Get large image URL
 * @param {number} id - Image ID
 * @returns {string} Large image URL
 */
export const getLargeImageUrl = (id) => {
  return getPlaceholderImageUrl(id, 1920, 1080);
};

/**
 * Generate a set of placeholder image URLs
 * @param {number} count - Number of images to generate
 * @returns {Array} Array of image objects
 */
export const generatePlaceholderImages = (count = 227) => {
  const images = [];
  
  for (let i = 1; i <= count; i++) {
    images.push({
      id: i,
      url: getPlaceholderImageUrl(i),
      thumbnail: getThumbnailUrl(i),
      large: getLargeImageUrl(i),
    });
  }
  
  return images;
};

export default {
  getPlaceholderImageUrl,
  getThumbnailUrl,
  getLargeImageUrl,
  generatePlaceholderImages,
};
