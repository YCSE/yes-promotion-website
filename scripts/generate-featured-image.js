const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

async function generateFeaturedImage(title, slug) {
  try {
    console.log('Creating featured image...');
    
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(imagesDir);
    
    // Create a gradient placeholder using sharp
    const width = 1200;
    const height = 675;
    
    // Create an attractive gradient with title text
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4B52AE;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#868BC7;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${title.substring(0, 40)}${title.length > 40 ? '...' : ''}
        </text>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="32" fill="white" opacity="0.9" text-anchor="middle" dominant-baseline="middle">
          YES English Learning
        </text>
      </svg>
    `;
    
    const jpgPath = path.join(imagesDir, `${slug}.jpg`);
    
    // Convert SVG to JPG
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(jpgPath);
    
    console.log(`Featured image saved: ${jpgPath}`);
    return `/images/blog/${slug}.jpg`;
    
  } catch (error) {
    console.error('Error generating featured image:', error);
    
    // Create a simple fallback image
    const fallbackDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(fallbackDir);
    
    const fallbackSvg = `
      <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="675" fill="#4B52AE" />
        <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle">
          English Learning
        </text>
      </svg>
    `;
    
    const jpgPath = path.join(fallbackDir, `${slug}.jpg`);
    await sharp(Buffer.from(fallbackSvg))
      .jpeg({ quality: 90 })
      .toFile(jpgPath);
    
    return `/images/blog/${slug}.jpg`;
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