const { GoogleGenAI } = require('@google/genai');
const fs = require('fs-extra');
const path = require('path');

// Style rules embedded as system prompt for the image generation model
const IMAGE_STYLE_SYSTEM_PROMPT = `You are an expert visual artist creating images for an English-learning blog called "YES Promotion".
Generate photorealistic, high-quality images that maintain a consistent visual style throughout this session.

STRICT PEOPLE RULES:
- ONE person only: Must be a Korean person in their 20s
- MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
- NEVER show two or more Korean/Asian people together
- After one Korean appears, ALL other people must be Western
- Exception: Historical figures or celebrities shown as they are

ANATOMY & REALISM RULES:
- Each person must have EXACTLY 2 arms, 2 hands, 2 legs - no extra limbs
- Natural body proportions and realistic human anatomy only
- Hands must have 5 fingers each, properly formed
- No distorted or impossible body positions

NATURAL BEHAVIOR RULES:
- Phone usage: Hold with ONE hand only in natural grip
- Natural, relaxed postures - how real people actually sit, stand, or move
- Realistic everyday gestures and interactions
- No staged or artificial poses
- Candid moments as if captured in real life

ABSOLUTE PROHIBITIONS:
- NO speech bubbles, thought bubbles, or dialogue balloons
- NO text overlays, captions, or labels of any kind
- NO letters, words, or writing visible anywhere
- NO cartoon or comic-style elements
- NO floating text or annotations
- Pure photographic image only

QUALITY: High detail, sharp focus, professional candid photography, natural lighting, documentary style, realistic proportions.

VISUAL CONSISTENCY: All images in this session should share a cohesive color palette, lighting style, and photographic mood.`;

// People-free fallback prompt addition
const PEOPLE_FREE_ADDENDUM = `
IMPORTANT OVERRIDE: Do NOT include any people or human figures in this image.
Focus entirely on objects, environments, tools, and abstract concepts.
- Educational materials, books, devices, study spaces
- Work or study environments with natural lighting
- Technology and learning devices
- Symbolic representations without human figures`;

/**
 * Parse H2 sections from markdown content, including typo correction
 */
function parseH2Sections(content) {
  // Fix common typos in placeholder markers
  const typoPatterns = [
    { wrong: /\[IMAGE_PLACEER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    { wrong: /\[IMAGE_PLACEHANCER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    { wrong: /\[IMAGE_PLACEHODLER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    { wrong: /\[IMAGE_PALCEHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    { wrong: /\[IMAGE_PLACEHODER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    { wrong: /\[IMAGE_PLACHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
  ];

  let fixedContent = content;
  for (const pattern of typoPatterns) {
    const matches = fixedContent.match(pattern.wrong);
    if (matches) {
      console.warn(`⚠️ Typo detected and fixed: ${matches.join(', ')}`);
      fixedContent = fixedContent.replace(pattern.wrong, pattern.correct);
    }
  }

  // Find all placeholders
  const placeholderPattern = /\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
  const placeholders = [...fixedContent.matchAll(placeholderPattern)];
  console.log(`Found ${placeholders.length} IMAGE_PLACEHOLDER markers`);

  // Match H2 titles to placeholders
  const h2Pattern = /##\s+(.+?)(?:\n|\r\n?)\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
  const h2Matches = [...fixedContent.matchAll(h2Pattern)];

  const sections = new Map();

  for (const match of h2Matches) {
    const h2Title = match[1].trim();
    const index = match[2];

    // Extract section content after the placeholder
    const placeholderEnd = match.index + match[0].length;
    const restOfContent = fixedContent.substring(placeholderEnd);
    const nextH2Match = restOfContent.match(/##\s+/);

    let sectionContent = nextH2Match
      ? restOfContent.substring(0, nextH2Match.index)
      : restOfContent.substring(0, 1000);

    const paragraphs = sectionContent.trim().split(/\n\n+/);
    const contentExcerpt = paragraphs.slice(0, 3).join('\n\n').trim();

    sections.set(index, { title: h2Title, content: contentExcerpt });
    console.log(`H2 #${index}: "${h2Title}" (${contentExcerpt.length} chars)`);
  }

  // Fallback: match by proximity if direct matching failed
  if (sections.size === 0 && placeholders.length > 0) {
    console.log('Using proximity-based H2 matching...');
    const h2OnlyPattern = /##\s+(.+?)(?:\n|\r\n?)/g;
    const h2Titles = [...fixedContent.matchAll(h2OnlyPattern)];

    for (const placeholder of placeholders) {
      const index = placeholder[1];
      const placeholderPos = placeholder.index;

      let closestH2 = null;
      let closestDistance = Infinity;

      for (const h2Match of h2Titles) {
        const h2Pos = h2Match.index;
        if (h2Pos < placeholderPos && (placeholderPos - h2Pos) < closestDistance) {
          closestDistance = placeholderPos - h2Pos;
          closestH2 = h2Match[1].trim();
        }
      }

      if (closestH2) {
        const placeholderEnd = placeholderPos + placeholder[0].length;
        const restOfContent = fixedContent.substring(placeholderEnd);
        const nextH2Match = restOfContent.match(/##\s+/);

        let sectionContent = nextH2Match
          ? restOfContent.substring(0, nextH2Match.index)
          : restOfContent.substring(0, 1000);

        const paragraphs = sectionContent.trim().split(/\n\n+/);
        const contentExcerpt = paragraphs.slice(0, 3).join('\n\n').trim();

        sections.set(index, { title: closestH2, content: contentExcerpt });
        console.log(`H2 #${index} (proximity): "${closestH2}"`);
      }
    }
  }

  return { fixedContent, placeholders, sections };
}

/**
 * Generate an SVG fallback placeholder image
 */
async function generateFallbackImage(outputPath, isFeatured = false) {
  const sharp = require('sharp');

  const width = isFeatured ? 1200 : 800;
  const height = isFeatured ? 675 : 600;

  const svg = isFeatured
    ? `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3E86D9;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#868BC7;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        <rect x="20%" y="40%" width="60%" height="20%" fill="white" opacity="0.2" rx="10" />
      </svg>`
    : `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="#f5f5f5" />
        <circle cx="${width / 2}" cy="${height / 2}" r="50" fill="#999" opacity="0.3" />
      </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);

  console.log(`Fallback image saved: ${outputPath}`);
}

/**
 * Extract the first image part from a Gemini response
 */
function extractImageFromResponse(response) {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) return null;

  const imagePart = parts.find(p => p.inlineData);
  if (!imagePart) return null;

  return {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType,
  };
}

/**
 * Extract text-only parts from a response (for keeping history lightweight)
 */
function extractTextParts(response) {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) return [{ text: 'Image generated.' }];
  const textParts = parts.filter(p => p.text);
  return textParts.length > 0 ? textParts : [{ text: 'Image generated.' }];
}

/**
 * Generate a single image via multi-turn chat, with retry logic
 */
async function generateImageTurn(ai, history, userPrompt, outputPath, isFeatured = false) {
  // Add user message to history
  history.push({ role: 'user', parts: [{ text: userPrompt }] });

  const config = {
    responseModalities: ['TEXT', 'IMAGE'],
    imageConfig: { aspectRatio: '4:3' },
  };

  try {
    // Attempt 1: normal generation
    console.log('Generating image (attempt 1)...');
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: history,
      config,
    });

    const image = extractImageFromResponse(response);
    if (!image) throw new Error('No image in response');

    // Save image
    const buffer = Buffer.from(image.data, 'base64');
    await fs.writeFile(outputPath, buffer);
    console.log(`Image saved: ${outputPath}`);

    // Add model response to history (text only to save context)
    history.push({ role: 'model', parts: extractTextParts(response) });
    return true;

  } catch (firstError) {
    console.warn('First attempt failed:', firstError.message);

    // Remove the failed user message and try people-free version
    history.pop();
    const peopleFreePrompt = userPrompt + '\n\n' + PEOPLE_FREE_ADDENDUM;
    history.push({ role: 'user', parts: [{ text: peopleFreePrompt }] });

    try {
      console.log('Retrying with people-free prompt...');
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: history,
        config,
      });

      const image = extractImageFromResponse(response);
      if (!image) throw new Error('No image in people-free response');

      const buffer = Buffer.from(image.data, 'base64');
      await fs.writeFile(outputPath, buffer);
      console.log(`People-free image saved: ${outputPath}`);

      history.push({ role: 'model', parts: extractTextParts(response) });
      return true;

    } catch (secondError) {
      console.error('Both attempts failed:', secondError.message);

      // Remove the failed user message
      history.pop();
      // Add a synthetic exchange so later turns still have context
      history.push({ role: 'user', parts: [{ text: userPrompt }] });
      history.push({ role: 'model', parts: [{ text: 'I was unable to generate this image due to content restrictions. Continuing with the next image.' }] });

      // Generate fallback placeholder
      console.log('Generating fallback placeholder...');
      await generateFallbackImage(outputPath, isFeatured);
      return false;
    }
  }
}

/**
 * Main entry point: generate all blog images (1 featured + N H2 images) in a
 * single multi-turn session for visual consistency.
 *
 * @param {string} content - Full markdown content (with frontmatter)
 * @param {string} title - Blog post title
 * @param {string} slug - URL slug for the post
 * @returns {{ updatedContent: string, featuredImagePath: string }}
 */
async function generateBlogImages(content, title, slug) {
  console.log('=== Starting unified blog image generation ===');
  console.log(`Title: "${title}", Slug: "${slug}"`);

  const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
  await fs.ensureDir(imagesDir);

  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Parse H2 sections and fix typos
  const { fixedContent, placeholders, sections } = parseH2Sections(content);

  // Extract blog body (skip frontmatter) for context
  const contentLines = fixedContent.split('\n');
  let blogBody = '';
  let dashCount = 0;
  let foundEnd = false;
  for (const line of contentLines) {
    if (line === '---') {
      dashCount++;
      if (dashCount === 2) { foundEnd = true; continue; }
    }
    if (foundEnd) blogBody += line + '\n';
  }
  const bodyExcerpt = blogBody.substring(0, 3000); // Keep context manageable

  // Multi-turn conversation history
  const history = [];

  // ── Turn 1: Featured image ──────────────────────────────────────────
  const featuredJpgPath = path.join(imagesDir, `${slug}.jpg`);
  const featuredImagePath = `/images/blog/${slug}.jpg`;

  if (await fs.pathExists(featuredJpgPath)) {
    console.log(`Featured image already exists: ${featuredJpgPath}`);
  } else {
    console.log('🎨 Generating featured image...');

    const featuredPrompt = `${IMAGE_STYLE_SYSTEM_PROMPT}

Here is the full blog post for context:

Title: ${title}

${bodyExcerpt}

---

Now generate a photorealistic featured image for this blog post.
The image should capture the main theme and mood of the entire article.
It should work well as a thumbnail/hero image at 4:3 aspect ratio.
Generate the image now.`;

    await generateImageTurn(ai, history, featuredPrompt, featuredJpgPath, true);
    console.log(`✅ Featured image: ${featuredImagePath}`);
  }

  // ── Turns 2+: H2 section images ────────────────────────────────────
  let updatedContent = fixedContent;

  for (const placeholder of placeholders) {
    const index = placeholder[1];
    const section = sections.get(index);
    const h2Title = section?.title || `Section ${index}`;
    const sectionContent = section?.content || '';

    const h2JpgPath = path.join(imagesDir, `${slug}-h2-${index}.jpg`);
    const h2ImagePath = `/images/blog/${slug}-h2-${index}.jpg`;

    if (await fs.pathExists(h2JpgPath)) {
      console.log(`H2 image #${index} already exists: ${h2JpgPath}`);
    } else {
      console.log(`🖼️ Generating H2 image #${index}: "${h2Title}"...`);

      const h2Prompt = `Now generate an image for the following section of the same blog post.
Maintain the same visual style, color palette, and photographic mood as the previous image(s).

Section title: ${h2Title}
${sectionContent ? `\nSection content:\n${sectionContent}` : ''}

Generate a photorealistic image that illustrates this specific section's topic.
The image should complement the featured image while focusing on this section's content.
Generate the image now.`;

      await generateImageTurn(ai, history, h2Prompt, h2JpgPath, false);
      console.log(`✅ H2 image #${index}: ${h2ImagePath}`);
    }

    // Replace placeholder with markdown image tag
    const placeholderText = `[IMAGE_PLACEHOLDER_H2_${index}]`;
    const imageMarkdown = `\n![${h2Title}](${h2ImagePath})\n`;
    if (updatedContent.includes(placeholderText)) {
      updatedContent = updatedContent.replace(placeholderText, imageMarkdown);
    } else {
      console.warn(`Could not find placeholder: ${placeholderText}`);
    }
  }

  // Final check for remaining placeholders
  const remaining = (updatedContent.match(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g) || []).length;
  if (remaining > 0) {
    console.warn(`⚠️ ${remaining} unreplaced placeholders remain`);
  }

  console.log('=== Blog image generation complete ===');
  return { updatedContent, featuredImagePath };
}

module.exports = { generateBlogImages };

// Run if called directly for testing
if (require.main === module) {
  const testContent = process.argv[2] || '';
  const testTitle = process.argv[3] || 'Test Blog Post';
  const testSlug = process.argv[4] || 'test-post';

  if (!testContent) {
    console.log('Usage: node scripts/generate-blog-images.js "<content>" "<title>" "<slug>"');
    process.exit(1);
  }

  generateBlogImages(testContent, testTitle, testSlug)
    .then(result => {
      console.log('Result:', result.featuredImagePath);
      console.log('Updated content length:', result.updatedContent.length);
    })
    .catch(error => {
      console.error('Failed:', error);
      process.exit(1);
    });
}
