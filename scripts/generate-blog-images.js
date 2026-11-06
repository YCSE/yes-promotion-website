const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { getClient, responseText, WRITING_MODEL } = require('./claude-client');
const { withImageServer, generateImage, IMAGE_BASE_URL } = require('./qwen-image-client');

// Close to the 1200x896 of earlier posts; the Qwen pipeline snaps sizes to multiples of 32.
const IMAGE_WIDTH = 1184;
const IMAGE_HEIGHT = 896;

// Claude turns the post into image prompts; the local image model only sees those.
const IMAGE_PROMPT_SYSTEM = `You write image prompts for a photorealistic text-to-image model (Qwen-Image). The images illustrate one post on the blog of 익스 (YCSE), a Korean video-call English-learning platform. You get the post's title, an excerpt and its H2 sections, and return:
- style: one sentence describing the shared look of every image in this post (color palette, lighting, lens, mood), so the images read as one set.
- featured: the scene for the post's hero image, capturing the main theme of the whole article. It also works as a thumbnail.
- sections: one scene per H2 section. Its index is the section's number from the brackets, digits only (for [2] write "2").

Each scene is 1-3 English sentences describing only what the camera sees: who is there, what they are doing, where, and the key objects. Keep it concrete and visual, with no abstract ideas and no quotes from the post. Vary settings, props and framing across the scenes. The image model reads every word as something to draw and does not understand "no" or "never", so write only about what is in the frame: never mention a person, feature or object in order to exclude it.

People:
- One person: a Korean person in their 20s. Write the age out, for example "a Korean woman, about 24".
- Several people: exactly one Korean person in their 20s, and everyone else Western (Caucasian or Black). Never two or more Korean or Asian people together. Keep it to two people at most.
- The image model drops or crops the people named later in a prompt, so the Korean person always comes first in the scene and is its main subject, in full view with the face clearly visible; anyone else comes after.
- The image model blends people who look alike, so describe the Korean person's look too (for example "straight black hair") and dress the two people differently.
- The image model draws people as East Asian unless told otherwise, so describe each Western person by visible features, for example "a Caucasian man with blond hair and blue eyes" or "a Black woman with curly hair".
- Exception: a historical figure or celebrity the section is about is shown as they are.
- Natural, candid postures and everyday gestures, as if caught in real life. When someone uses a phone, they hold it in one hand; include a phone only where the scene calls for one.
- A scene without people (objects, a study space, a place) is fine where it suits the section better.

Screens (this rule matters most):
- Every open laptop, phone, tablet or monitor in a scene with people is being used by one of them: its screen faces that person and sits in their line of sight, and they look at the screen, not at the camera. A screen never faces the camera or points away from the person using it.
- The camera sees every device from behind or from the side: the back of the laptop lid, the back of the phone or tablet. What is on a screen is never shown, in video-call scenes too: there the camera is in front of the student, who looks at the screen of the open laptop between them, the laptop seen from behind.
- A person uses one device at a time. Any other laptop in the scene has its lid closed, and other phones and tablets stay out of the scene.
- Write the orientation out in every scene, for example "she looks at the screen of the open laptop in front of her, the laptop seen from behind" or "he reads the phone in his hand, its screen turned toward his face".
- In a scene without people, laptops are closed.

Nothing in an image may be readable: no speech or thought bubbles, captions, signs, labels, book titles, or letters of any kind. The image model writes text onto any surface that faces the camera, so keep book covers, pages and signs turned away, seen edge-on, or far out of focus. Pick settings with no signs in view: station entrances, shopfronts and street corners come with signs the model will write on. No cartoon or comic elements.`;

const PROMPT_PLAN_SCHEMA = {
  type: 'object',
  properties: {
    style: { type: 'string' },
    featured: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          index: { type: 'string' },
          scene: { type: 'string' },
        },
        required: ['index', 'scene'],
        additionalProperties: false,
      },
    },
  },
  required: ['style', 'featured', 'sections'],
  additionalProperties: false,
};

// Positive wording only: the model draws whatever the prompt names, "no text" included. There is no
// negative prompt: QwenImage21Pipeline ignores it unless true_cfg_scale > 1, which the server does not expose.
const QUALITY_SUFFIX = 'Photorealistic candid documentary photograph, natural light, sharp focus, realistic anatomy with natural hands.';

// Used only when Claude cannot plan the prompts.
const GENERIC_STYLE = 'Soft natural window light, warm neutral palette, 35mm lens, shallow depth of field, calm everyday mood.';
const GENERIC_FEATURED = 'A Korean woman, about 24, smiles at the laptop screen in front of her during an English video lesson at a bright desk at home, the laptop seen from behind.';
const GENERIC_SCENES = [
  'A closed notebook, a pen, a coffee cup and a closed laptop on a wooden desk by a window.',
  'A Korean man, about 26, listening to an English podcast with wireless earbuds while looking out of a cafe window.',
  'A Korean woman, about 23, laughing with a Caucasian friend with blond hair and blue eyes at a cafe table.',
  'A tidy study corner with headphones resting on a closed laptop, a plant and morning light.',
];

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
 * Ask Claude for one shared style and a scene per image.
 * Returns { style, featured, scenes: Map<index, scene> }.
 */
async function planImagePrompts(title, bodyExcerpt, sectionList) {
  const sectionText = sectionList
    .map((s) => `[${s.index}] ${s.title}\n${s.content}`)
    .join('\n\n');

  try {
    const message = await getClient().messages.create({
      model: WRITING_MODEL,
      max_tokens: 16000,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: PROMPT_PLAN_SCHEMA },
      },
      system: IMAGE_PROMPT_SYSTEM,
      messages: [{
        role: 'user',
        content: `Title: ${title}\n\nExcerpt:\n${bodyExcerpt}\n\nH2 sections:\n${sectionText}`,
      }],
    });
    const plan = JSON.parse(responseText(message));
    // Key by the digits only, so "[2]" or "H2_2" still matches section 2.
    const scenes = new Map(plan.sections.map((s) => [String(s.index).match(/\d+/)?.[0], s.scene]));
    return { style: plan.style, featured: plan.featured, scenes };
  } catch (error) {
    console.warn(`⚠️ Image prompt planning failed, using generic scenes: ${error.message}`);
    return { style: GENERIC_STYLE, featured: GENERIC_FEATURED, scenes: new Map() };
  }
}

function seedFromSlug(slug) {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.codePointAt(0)) >>> 0;
  return hash % 1000000000;
}

/**
 * Render one image to a JPEG file, retrying once; falls back to a placeholder.
 */
async function renderImage(scene, style, seed, outputPath, isFeatured) {
  const prompt = `${scene} ${style} ${QUALITY_SUFFIX}`;
  console.log(`Prompt: ${prompt}`);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const started = Date.now();
      const png = await generateImage({
        prompt,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        seed: seed + attempt - 1,
      });
      await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(outputPath);
      console.log(`Image saved: ${outputPath} (${((Date.now() - started) / 1000).toFixed(1)}s)`);
      return true;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
    }
  }

  console.log('Generating fallback placeholder...');
  await generateFallbackImage(outputPath, isFeatured);
  return false;
}

/**
 * Main entry point: generate all blog images (1 featured + N H2 images) with the
 * local Qwen-Image model. The image server must be running (see withImageServer).
 * One shared style line and related seeds keep the set visually consistent.
 *
 * @param {string} content - Full markdown content (with frontmatter)
 * @param {string} title - Blog post title
 * @param {string} slug - URL slug for the post
 * @returns {{ updatedContent: string, featuredImagePath: string }}
 */
async function generateBlogImages(content, title, slug) {
  console.log('=== Starting blog image generation (Qwen-Image-2.1-Turbo) ===');
  console.log(`Title: "${title}", Slug: "${slug}"`);

  const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
  await fs.ensureDir(imagesDir);

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

  const sectionList = placeholders.map((placeholder) => {
    const index = placeholder[1];
    const section = sections.get(index);
    return { index, title: section?.title || `Section ${index}`, content: section?.content || '' };
  });

  const featuredJpgPath = path.join(imagesDir, `${slug}.jpg`);
  const featuredImagePath = `/images/blog/${slug}.jpg`;
  const h2JpgPath = (index) => path.join(imagesDir, `${slug}-h2-${index}.jpg`);

  const featuredExists = await fs.pathExists(featuredJpgPath);
  const h2Exists = await Promise.all(sectionList.map(({ index }) => fs.pathExists(h2JpgPath(index))));

  // Plan prompts only when there is something left to render.
  let plan = null;
  if (!featuredExists || h2Exists.includes(false)) {
    console.log(`🧭 Planning image prompts with ${WRITING_MODEL}...`);
    plan = await planImagePrompts(title, bodyExcerpt, sectionList);
    console.log(`Style: ${plan.style}`);
  }
  const baseSeed = seedFromSlug(slug);
  let rendered = 0;
  let failed = 0;
  const track = (ok) => (ok ? rendered++ : failed++);

  // ── Featured image ──────────────────────────────────────────────────
  if (featuredExists) {
    console.log(`Featured image already exists: ${featuredJpgPath}`);
  } else {
    console.log('🎨 Generating featured image...');
    track(await renderImage(plan.featured, plan.style, baseSeed, featuredJpgPath, true));
    console.log(`✅ Featured image: ${featuredImagePath}`);
  }

  // ── H2 section images ──────────────────────────────────────────────
  let updatedContent = fixedContent;

  for (const [i, { index, title: h2Title }] of sectionList.entries()) {
    const h2ImagePath = `/images/blog/${slug}-h2-${index}.jpg`;

    if (h2Exists[i]) {
      console.log(`H2 image #${index} already exists: ${h2JpgPath(index)}`);
    } else {
      console.log(`🖼️ Generating H2 image #${index}: "${h2Title}"...`);
      let scene = plan.scenes.get(index);
      if (!scene) {
        console.warn(`⚠️ No planned scene for H2 #${index}, using a generic one`);
        scene = GENERIC_SCENES[i % GENERIC_SCENES.length];
      }
      track(await renderImage(scene, plan.style, baseSeed + Number(index) * 100, h2JpgPath(index), false));
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

  // Every render failing means the image server is down, not a bad prompt: no post rather than a post of placeholders.
  if (failed > 0 && rendered === 0) {
    throw new Error(`All ${failed} images failed to render; is the image server at ${IMAGE_BASE_URL} up?`);
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

  withImageServer(() => generateBlogImages(testContent, testTitle, testSlug))
    .then(result => {
      console.log('Result:', result.featuredImagePath);
      console.log('Updated content length:', result.updatedContent.length);
    })
    .catch(error => {
      console.error('Failed:', error);
      process.exit(1);
    });
}
