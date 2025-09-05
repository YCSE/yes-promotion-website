const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');

/**
 * Uses Gemini to generate contextual image prompts based on blog content
 */
async function generateFeaturedImagePrompt(title, topic = '', contentExcerpt = '') {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const prompt = `
You are an expert at creating image generation prompts for educational blog posts about English learning.

Blog post title: ${title}
${topic ? `Topic: ${topic}` : ''}

${contentExcerpt ? `Content excerpt from the blog post:
${contentExcerpt}

Based on the actual content above, create a photorealistic image prompt that visually represents the specific concepts, scenarios, or examples discussed in the article.` : ''}

Create a photorealistic image prompt that:
1. ${contentExcerpt ? 'Directly reflects the specific content and examples from the article' : 'Captures the essence of this English learning topic'}
2. Shows an appropriate scene or situation related to the content
3. Includes relevant visual elements (setting, objects, activities)
4. ${contentExcerpt ? 'Incorporates key themes or scenarios mentioned in the excerpt' : 'Focuses on the learning or practice situation'}

Rules for the prompt:
- Describe a specific, realistic scene
- Include environmental details and context
- ${contentExcerpt ? 'Base the scene on actual content from the article' : 'Focus on the learning or practice situation'}
- Keep it professional and educational

Output ONLY the scene description in English, without any additional text or explanation.
Example: "Modern office meeting room with professionals discussing documents, laptop and presentation screen visible"
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sceneDescription = response.text().trim();
    
    // Combine with people rules
    const finalPrompt = `Photorealistic photograph: ${sceneDescription}. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
    
    return finalPrompt;
    
  } catch (error) {
    console.error('Error generating image prompt with Gemini:', error);
    // Fallback prompt
    return `Photorealistic photograph: People engaged in English learning or conversation in modern setting. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
  }
}

/**
 * Uses Gemini to generate H2 section image prompts
 */
async function generateH2ImagePrompt(h2Title, sectionContent = '') {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const prompt = `
You are an expert at creating image generation prompts for educational content.

Section title: ${h2Title}

${sectionContent ? `Section content:
${sectionContent}

Carefully analyze the content above and create a photorealistic image that accurately visualizes the specific concepts, examples, or scenarios described in this section.` : ''}

Create a photorealistic image prompt that:
1. ${sectionContent ? 'Directly illustrates the specific content and examples from this section' : 'visually represents the section topic'}
2. ${sectionContent ? 'Captures the key points and scenarios mentioned in the text' : 'Focuses on the key concept or activity'}
3. Shows relevant visual elements that support the written content
4. Maintains coherence with the educational theme

Rules for the prompt:
- Describe a clear, specific scene
- ${sectionContent ? 'Base the visual on actual examples or scenarios from the section content' : 'Make it relevant to the section topic'}
- Include appropriate setting and context
- Keep it educational and professional

Output ONLY the scene description in English, without any additional text or explanation.
Example: "Person practicing pronunciation with headphones in quiet study room"
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sceneDescription = response.text().trim();
    
    // Combine with people rules
    const finalPrompt = `Photorealistic photograph: ${sceneDescription}. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
    
    return finalPrompt;
    
  } catch (error) {
    console.error('Error generating H2 image prompt with Gemini:', error);
    // Fallback prompt
    return `Photorealistic photograph: Person engaged in English learning activity. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
  }
}

module.exports = {
  generateFeaturedImagePrompt,
  generateH2ImagePrompt
};