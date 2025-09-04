const { GoogleGenAI, PersonGeneration } = require('@google/genai');
const fs = require('fs-extra');
const path = require('path');

async function generateFeaturedImage(title, slug) {
  try {
    console.log('Creating featured image with Imagen 4...');
    
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(imagesDir);
    
    const jpgPath = path.join(imagesDir, `${slug}.jpg`);
    
    // Check if image already exists
    if (await fs.pathExists(jpgPath)) {
      console.log(`Featured image already exists: ${jpgPath}`);
      return `/images/blog/${slug}.jpg`;
    }
    
    // Initialize Imagen 4 API
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set for Imagen 4');
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Generate image using Imagen 4
    const prompt = `Professional educational banner image for blog post about: "${title}". Modern gradient background with purple and blue tones. Include text overlay: "${title}" and "YES English Learning". Clean, minimalist design suitable for an English learning blog.`;
    
    console.log('Generating image with prompt:', prompt);
    
    const response = await ai.models.generateImages({
      model: 'models/imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        personGeneration: PersonGeneration.ALLOW_ALL,
        aspectRatio: '16:9',
        imageSize: '1K',
      },
    });
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No image generated from Imagen 4 API');
    }
    
    // Convert base64 to buffer and save as JPG
    const imageData = response.generatedImages[0].image.imageBytes;
    const buffer = Buffer.from(imageData, 'base64');
    
    // Save the JPG file
    await fs.writeFile(jpgPath, buffer);
    
    console.log(`Featured image saved: ${jpgPath}`);
    return `/images/blog/${slug}.jpg`;
    
  } catch (error) {
    console.error('Error generating featured image with Imagen 4:', error);
    
    // Fallback to SVG placeholder if Imagen 4 fails
    console.log('Falling back to SVG placeholder...');
    const sharp = require('sharp');
    
    const fallbackDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(fallbackDir);
    
    const svg = `
      <svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4B52AE;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#868BC7;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="675" fill="url(#grad)" />
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
          ${title.substring(0, 40)}${title.length > 40 ? '...' : ''}
        </text>
        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="32" fill="white" opacity="0.9" text-anchor="middle" dominant-baseline="middle">
          YES English Learning
        </text>
      </svg>
    `;
    
    const jpgPath = path.join(fallbackDir, `${slug}.jpg`);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(jpgPath);
    
    console.log(`Fallback image saved: ${jpgPath}`);
    return `/images/blog/${slug}.jpg`;
  }
}

module.exports = { generateFeaturedImage };

// Run if called directly for testing
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