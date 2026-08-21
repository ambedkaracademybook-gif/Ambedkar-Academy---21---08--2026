/**
 * Central Image Assets Configuration
 * All images are served directly from the /public/images/ folder.
 * 
 * To update or replace any image:
 * 1. Open the File Explorer in Google AI Studio
 * 2. Navigate to /public/images/ and drop your new images into the corresponding folder:
 *    - /public/images/speakers/  (mohan.jpg, ravichanthiran.jpg, sabith-ali.jpg, guest.png, mentor.png)
 *    - /public/images/posters/   (cash-prize.png, challenge.png)
 *    - /public/images/batches/   (batch-1.jpg, batch-2.jpg, batch-3.jpg, batch-4.jpg)
 *    - /public/images/reviews/   (review-1.jpg, review-2.jpg, review-3.jpg, review-4.jpg, review-5.jpg)
 */

// Fallback helper SVG if user hasn't uploaded a file yet
export const getPlaceholderSvg = (title: string, subtitle?: string) => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231e293b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23f8fafc" font-family="sans-serif" font-size="22" font-weight="bold">${encodeURIComponent(title)}</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">${encodeURIComponent(subtitle || 'Upload image in /public/images/')}</text></svg>`;

// Posters
export const IMG_cashPrize = "/images/posters/cash-price.png";
export const IMG_challenge = "/images/posters/challenge.png";

// Speakers & Faculty
export const IMG_mohan = "/images/speakers/mohan.jpeg";
export const IMG_ravichanthiran = "/images/speakers/ravichanthiran.jpeg";
export const IMG_sabithAli = "/images/speakers/sabith-ali.jpeg";
export const IMG_guest = "/images/speakers/guest.png";
export const IMG_mentor = "/images/speakers/mentor.png";

// Batches
export const IMG_batch1 = "/images/batches/batch-1.jpg";
export const IMG_batch2 = "/images/batches/batch-2.jpg";
export const IMG_batch3 = "/images/batches/batch-3.jpg";
export const IMG_batch4 = "/images/batches/batch-4.jpg";

// Reviews
export const IMG_review1 = "/images/reviews/review-1.jpeg";
export const IMG_review2 = "/images/reviews/review-2.jpeg";
export const IMG_review3 = "/images/reviews/review-3.jpeg";
export const IMG_review4 = "/images/reviews/review-4.jpeg";
export const IMG_review5 = "/images/reviews/review-5.jpeg";
