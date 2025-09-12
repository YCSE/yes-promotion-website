const { GoogleGenAI } = require('@google/genai');
const fs = require('fs-extra');
const path = require('path');
const { generateH2ImagePrompt, generatePeopleFreeImagePrompt } = require('./generate-image-prompt');

async function generateH2Image(h2Title, slug, index, sectionContent = '') {
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
    
    // Generate dynamic prompt based on the H2 section title and content using Gemini
    const prompt = await generateH2ImagePrompt(h2Title, sectionContent);
    
    console.log('Generating H2 image with prompt (with people)...');
    
    let response;
    let imageData;
    
    try {
      // First attempt with people
      response = await ai.models.generateImages({
        model: 'models/imagen-4.0-generate-001',
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
      
      imageData = response.generatedImages[0]?.image?.imageBytes;
      if (!imageData) {
        throw new Error('No image data received from API');
      }
      
      console.log('Successfully generated H2 image with people');
      
    } catch (firstError) {
      console.warn('First attempt failed (possibly due to safety filter with real people):', firstError.message);
      console.log('Retrying with people-free prompt...');
      
      // Fallback: Generate prompt without people
      const peopleFreePrompt = await generatePeopleFreeImagePrompt(h2Title, '', sectionContent);
      console.log('Generating H2 image with people-free prompt...');
      
      try {
        response = await ai.models.generateImages({
          model: 'models/imagen-4.0-generate-001',
          prompt: peopleFreePrompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            personGeneration: 'DONT_ALLOW',  // Explicitly don't allow people
            aspectRatio: '4:3',
          },
        });
        
        if (!response?.generatedImages || response.generatedImages.length === 0) {
          throw new Error('No image generated from Imagen 4.0 Fast API (people-free attempt)');
        }
        
        imageData = response.generatedImages[0]?.image?.imageBytes;
        if (!imageData) {
          throw new Error('No image data received from API (people-free attempt)');
        }
        
        console.log('Successfully generated people-free H2 image');
        
      } catch (secondError) {
        console.error('Both attempts failed for H2 image:', secondError);
        throw secondError;
      }
    }
    
    // Convert base64 to buffer and save as JPG
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
    console.log('=== Starting H2 image processing ===');
    console.log('Content length:', content.length);
    
    // 오타 감지 및 자동 수정 (generate-blog-post.js와 동일한 패턴)
    const typoPatterns = [
      { wrong: /\[IMAGE_PLACEER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHANCER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHODLER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PALCEHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHODER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    ];
    
    let updatedContent = content;
    let typoFound = false;
    for (const pattern of typoPatterns) {
      const matches = updatedContent.match(pattern.wrong);
      if (matches) {
        console.warn(`⚠️ H2 이미지 처리 중 오타 발견 및 수정: ${matches.join(', ')}`);
        updatedContent = updatedContent.replace(pattern.wrong, pattern.correct);
        typoFound = true;
      }
    }
    
    if (typoFound) {
      console.log('✅ H2 이미지 처리: 오타가 자동으로 수정되었습니다.');
    }
    
    // First, find all IMAGE_PLACEHOLDER markers
    const placeholderPattern = /\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
    const placeholders = [...updatedContent.matchAll(placeholderPattern)];
    console.log(`Found ${placeholders.length} IMAGE_PLACEHOLDER markers`);
    
    // Also try to find H2 titles with placeholders (more flexible pattern)
    const h2Pattern = /##\s+(.+?)(?:\n|\r\n?)\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
    const h2Matches = [...updatedContent.matchAll(h2Pattern)];
    console.log(`Found ${h2Matches.length} H2 titles with placeholders`);
    
    // Create a map of index to H2 title and section content
    const h2Map = new Map();
    const sectionContentMap = new Map();
    
    for (const match of h2Matches) {
      const h2Title = match[1].trim();
      const index = match[2];
      h2Map.set(index, h2Title);
      console.log(`H2 #${index}: "${h2Title}"`);
      
      // Extract section content after the placeholder
      const placeholderEnd = match.index + match[0].length;
      const nextH2Pattern = /##\s+/;
      const restOfContent = updatedContent.substring(placeholderEnd);
      const nextH2Match = restOfContent.match(nextH2Pattern);
      
      let sectionContent = '';
      if (nextH2Match) {
        // Get content until next H2
        sectionContent = restOfContent.substring(0, nextH2Match.index);
      } else {
        // Get content until end or a reasonable length (first 1000 chars)
        sectionContent = restOfContent.substring(0, 1000);
      }
      
      // Clean up the section content (remove excess whitespace, get first 2-3 paragraphs)
      const paragraphs = sectionContent.trim().split(/\n\n+/);
      const contentExcerpt = paragraphs.slice(0, 3).join('\n\n').trim();
      sectionContentMap.set(index, contentExcerpt);
      console.log(`Extracted ${contentExcerpt.length} chars of content for section #${index}`);
    }
    
    // If we couldn't match H2s with placeholders, try alternative approach
    if (h2Map.size === 0 && placeholders.length > 0) {
      console.log('Trying alternative H2 matching approach...');
      
      // Find all H2 titles separately
      const h2OnlyPattern = /##\s+(.+?)(?:\n|\r\n?)/g;
      const h2Titles = [...updatedContent.matchAll(h2OnlyPattern)];
      console.log(`Found ${h2Titles.length} H2 titles in total`);
      
      // Match placeholders to H2s by proximity
      for (const placeholder of placeholders) {
        const index = placeholder[1];
        const placeholderPos = placeholder.index;
        
        // Find the closest H2 before this placeholder
        let closestH2 = null;
        let closestH2Match = null;
        let closestDistance = Infinity;
        
        for (const h2Match of h2Titles) {
          const h2Pos = h2Match.index;
          if (h2Pos < placeholderPos && (placeholderPos - h2Pos) < closestDistance) {
            closestDistance = placeholderPos - h2Pos;
            closestH2 = h2Match[1].trim();
            closestH2Match = h2Match;
          }
        }
        
        if (closestH2) {
          h2Map.set(index, closestH2);
          console.log(`Matched placeholder #${index} to H2: "${closestH2}"`);
          
          // Extract section content after the placeholder
          const placeholderEnd = placeholderPos + placeholder[0].length;
          const nextH2Pattern = /##\s+/;
          const restOfContent = updatedContent.substring(placeholderEnd);
          const nextH2Match = restOfContent.match(nextH2Pattern);
          
          let sectionContent = '';
          if (nextH2Match) {
            sectionContent = restOfContent.substring(0, nextH2Match.index);
          } else {
            sectionContent = restOfContent.substring(0, 1000);
          }
          
          const paragraphs = sectionContent.trim().split(/\n\n+/);
          const contentExcerpt = paragraphs.slice(0, 3).join('\n\n').trim();
          sectionContentMap.set(index, contentExcerpt);
        }
      }
    }
    
    let replacementCount = 0;
    
    // Process all placeholders
    for (const placeholder of placeholders) {
      const index = placeholder[1];
      const h2Title = h2Map.get(index) || `Section ${index}`;
      const sectionContent = sectionContentMap.get(index) || '';
      
      console.log(`Processing placeholder #${index} for: "${h2Title}"`);
      if (sectionContent) {
        console.log(`Using ${sectionContent.length} chars of section content for image generation`);
      }
      
      // Generate image for this H2 with section content
      const imagePath = await generateH2Image(h2Title, slug, index, sectionContent);
      
      // Replace placeholder with actual image markdown
      const placeholderText = `[IMAGE_PLACEHOLDER_H2_${index}]`;
      const imageMarkdown = `\n![${h2Title}](${imagePath})\n`;
      
      if (updatedContent.includes(placeholderText)) {
        updatedContent = updatedContent.replace(placeholderText, imageMarkdown);
        replacementCount++;
        console.log(`Replaced placeholder #${index} with image`);
      } else {
        console.warn(`Could not find placeholder text: ${placeholderText}`);
      }
    }
    
    console.log(`=== H2 image processing complete ===`);
    console.log(`Processed ${replacementCount} out of ${placeholders.length} placeholders`);
    
    // Final check for any remaining placeholders
    const remainingPlaceholders = (updatedContent.match(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g) || []).length;
    if (remainingPlaceholders > 0) {
      console.warn(`Warning: ${remainingPlaceholders} placeholders remain in content`);
    }
    
    return updatedContent;
  } catch (error) {
    console.error('Error processing H2 images:', error);
    // Return content without images if processing fails
    return content.replace(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g, '');
  }
}

module.exports = { generateH2Image, processH2Images };