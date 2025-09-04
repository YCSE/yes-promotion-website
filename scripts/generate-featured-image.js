const { GoogleGenAI } = require('@google/genai');
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
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    // Generate photorealistic image using Imagen 4 - ABSOLUTELY NO TEXT
    const prompt = `Photorealistic photograph inspired by: ${title}. Professional photography, natural lighting, documentary style. 
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
    
    console.log('Generating image with prompt:', prompt);
    
    const response = await ai.models.generateImages({
      model: 'models/imagen-4.0-fast-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        personGeneration: 'ALLOW_ALL',
        aspectRatio: '4:3',
      },
    });
    
    if (!response?.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No image generated from Imagen 4.0 Fast API');
    }
    
    // Convert base64 to buffer and save as JPG
    const imageData = response.generatedImages[0]?.image?.imageBytes;
    if (!imageData) {
      throw new Error('No image data received from API');
    }
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
        <!-- Fallback image - no text version -->
        <rect x="20%" y="40%" width="60%" height="20%" fill="white" opacity="0.2" rx="10" />
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