const { GoogleGenAI } = require('@google/genai');
const fs = require('fs-extra');
const path = require('path');
const { generateH2ImagePrompt } = require('./generate-image-prompt');

async function generateH2Image(h2Title, slug, index) {
  try {
    console.log(`Creating H2 image #${index} for: "${h2Title}"`);
    
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(imagesDir);
    
    const jpgPath = path.join(imagesDir, `${slug}-h2-${index}.jpg`);
    
    // Check if image already exists
    if (await fs.pathExists(jpgPath)) {
      console.log(`H2 image already exists: ${jpgPath}`);
      return `/images/blog/${slug}-h2-${index}.jpg`;
    }
    
    // Initialize Imagen API
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set for Imagen');
    }
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    // Generate dynamic prompt based on the H2 section title
    const prompt = generateH2ImagePrompt(h2Title);
    
    console.log('Generating H2 image with prompt:', prompt);
    
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
    
    console.log(`H2 image saved: ${jpgPath}`);
    return `/images/blog/${slug}-h2-${index}.jpg`;
    
  } catch (error) {
    console.error(`Error generating H2 image #${index}:`, error);
    
    // Fallback to placeholder if generation fails
    console.log('Falling back to placeholder...');
    const sharp = require('sharp');
    
    const fallbackDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.ensureDir(fallbackDir);
    
    const svg = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#f5f5f5" />
        <!-- Fallback placeholder - no text -->
        <circle cx="400" cy="300" r="50" fill="#999" opacity="0.3" />
      </svg>
    `;
    
    const jpgPath = path.join(fallbackDir, `${slug}-h2-${index}.jpg`);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(jpgPath);
    
    console.log(`Fallback H2 image saved: ${jpgPath}`);
    return `/images/blog/${slug}-h2-${index}.jpg`;
  }
}

async function processH2Images(content, slug) {
  try {
    // Find all H2 titles and placeholders
    const h2Pattern = /## (.+?)\n\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
    const matches = [...content.matchAll(h2Pattern)];
    
    let updatedContent = content;
    
    for (const match of matches) {
      const h2Title = match[1];
      const index = match[2];
      
      // Generate image for this H2
      const imagePath = await generateH2Image(h2Title, slug, index);
      
      // Replace placeholder with actual image markdown
      const placeholder = `[IMAGE_PLACEHOLDER_H2_${index}]`;
      const imageMarkdown = `\n![${h2Title}](${imagePath})\n`;
      updatedContent = updatedContent.replace(placeholder, imageMarkdown);
    }
    
    return updatedContent;
  } catch (error) {
    console.error('Error processing H2 images:', error);
    // Return content without images if processing fails
    return content.replace(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g, '');
  }
}

module.exports = { generateH2Image, processH2Images };