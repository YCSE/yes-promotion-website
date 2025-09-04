const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

async function generateFeaturedImage(title, slug) {
  try {
    // For now, we'll always use the placeholder approach since Imagen API
    // requires separate setup. This can be updated when Imagen is available.
    console.log('Creating featured image...');
    
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(imagesDir);
    
    // Create a simple gradient placeholder using sharp
    const width = 1200;
    const height = 675;
    
    // Create SVG with gradient
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4B52AE;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#868BC7;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
          English Learning
        </text>
      </svg>
    `;
    
    const webpPath = path.join(imagesDir, `${slug}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    console.log(`Featured image saved: ${webpPath}`);
    return `/images/blog/${slug}.webp`;
  } catch (error) {
    console.error('Error generating featured image:', error);
    
    // Return a default image path as fallback
    console.log('Using default placeholder image...');
    return '/images/blog/default-placeholder.webp';
  }
}

module.exports = { generateFeaturedImage };

// Run if called directly
if (require.main === module) {
  const title = process.argv[2] || 'Test Blog Post';
  const slug = process.argv[3] || 'test-post';
  
  generateFeaturedImage(title, slug)
    .then(imagePath => {
      console.log('Image generated:', imagePath);
    })
    .catch(error => {
      console.error('Failed to generate image:', error);
      process.exit(1);
    });
}