/**
 * Dynamic image prompt generator for blog posts
 * Generates contextual prompts based on the blog post topic and content
 */

/**
 * Analyzes the topic and generates appropriate scene descriptions
 * @param {string} title - The blog post title
 * @param {string} topic - The blog post topic
 * @returns {string} - A contextual scene description
 */
function generateSceneContext(title, topic) {
  // Keywords for different contexts
  const contexts = {
    business: {
      keywords: ['비즈니스', '이메일', '프레젠테이션', '면접', '네트워킹', '협상', '전화', '미팅'],
      scenes: [
        'modern office meeting room with professionals discussing',
        'business presentation in a conference room',
        'professional networking event',
        'modern coworking space with people collaborating',
        'business video call setup in office'
      ]
    },
    travel: {
      keywords: ['여행', '공항', '호텔', '레스토랑', '관광'],
      scenes: [
        'airport departure lounge with travelers',
        'hotel reception desk interaction',
        'tourist asking for directions on city street',
        'restaurant ordering scene',
        'travel planning with maps and devices'
      ]
    },
    daily: {
      keywords: ['일상', '카페', '쇼핑', '소셜', '친구', '데이트'],
      scenes: [
        'casual cafe conversation between friends',
        'shopping mall interaction',
        'friends meeting at coffee shop',
        'casual outdoor conversation in park',
        'social gathering at restaurant'
      ]
    },
    education: {
      keywords: ['학습', '공부', '문법', '단어', '시험', '토익', '토플', '수업', '교육'],
      scenes: [
        'study group in modern library',
        'language learning classroom',
        'student studying with books and laptop',
        'online learning setup at home',
        'exam preparation at desk'
      ]
    },
    technology: {
      keywords: ['기술', '디지털', 'SNS', '소셜', '미디어', '온라인'],
      scenes: [
        'person using smartphone for social media',
        'digital workspace with multiple screens',
        'online video recording setup',
        'tech startup office environment',
        'person working on laptop at modern cafe'
      ]
    },
    medical: {
      keywords: ['의료', '병원', '건강', '진료'],
      scenes: [
        'patient consultation at medical office',
        'hospital reception area',
        'healthcare professional explaining to patient',
        'modern medical facility waiting room',
        'telemedicine consultation setup'
      ]
    },
    family: {
      keywords: ['가족', '부모', '어린이', '아이', '교사'],
      scenes: [
        'parent-teacher conference at school',
        'family learning English together at home',
        'children in language learning classroom',
        'family video call on tablet',
        'parent helping child with homework'
      ]
    }
  };

  // Find matching context
  const lowerTitle = title.toLowerCase();
  const lowerTopic = topic ? topic.toLowerCase() : '';
  const combined = lowerTitle + ' ' + lowerTopic;
  
  for (const [contextType, contextData] of Object.entries(contexts)) {
    const hasKeyword = contextData.keywords.some(keyword => 
      combined.includes(keyword)
    );
    
    if (hasKeyword) {
      // Return random scene from matching context
      const scenes = contextData.scenes;
      return scenes[Math.floor(Math.random() * scenes.length)];
    }
  }
  
  // Default scenes if no specific context matches
  const defaultScenes = [
    'people having conversation in modern setting',
    'professional learning environment',
    'casual interaction between people',
    'modern classroom or study space',
    'people collaborating on project'
  ];
  
  return defaultScenes[Math.floor(Math.random() * defaultScenes.length)];
}

/**
 * Generates specific visual elements based on the topic
 * @param {string} title - The blog post title
 * @returns {string} - Visual elements description
 */
function generateVisualElements(title) {
  const elements = {
    speaking: 'people engaged in conversation, gesturing naturally',
    writing: 'notebook, laptop, or writing materials visible',
    reading: 'books or reading materials in scene',
    listening: 'people wearing headphones or in listening pose',
    presentation: 'presentation screen or whiteboard in background',
    phone: 'smartphone or phone conversation',
    computer: 'laptop or computer screen visible',
    travel: 'luggage, maps, or travel documents',
    study: 'study materials, books, notebooks',
    professional: 'business attire, professional setting'
  };
  
  const titleLower = title.toLowerCase();
  const selectedElements = [];
  
  // Check which elements match the title
  for (const [key, value] of Object.entries(elements)) {
    if (titleLower.includes(key) || 
        (key === 'speaking' && (titleLower.includes('말') || titleLower.includes('회화') || titleLower.includes('대화'))) ||
        (key === 'writing' && (titleLower.includes('작문') || titleLower.includes('쓰기') || titleLower.includes('이메일'))) ||
        (key === 'reading' && (titleLower.includes('읽기') || titleLower.includes('독해'))) ||
        (key === 'listening' && (titleLower.includes('듣기') || titleLower.includes('리스닝')))) {
      selectedElements.push(value);
    }
  }
  
  return selectedElements.length > 0 ? selectedElements.join(', ') : 'modern, clean environment';
}

/**
 * Main function to generate featured image prompt
 * @param {string} title - The blog post title
 * @param {string} topic - The blog post topic (optional)
 * @returns {string} - Complete image generation prompt
 */
function generateFeaturedImagePrompt(title, topic = '') {
  const scene = generateSceneContext(title, topic);
  const visualElements = generateVisualElements(title);
  
  const prompt = `Photorealistic photograph: ${scene}. ${visualElements}. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
  
  return prompt;
}

/**
 * Generates H2 section image prompt
 * @param {string} h2Title - The H2 section title
 * @returns {string} - Complete image generation prompt
 */
function generateH2ImagePrompt(h2Title) {
  // Simpler context for H2 images
  const scene = generateSceneContext(h2Title, '');
  
  const prompt = `Photorealistic photograph representing: ${h2Title}. ${scene}. Professional photography, natural lighting, documentary style.
    
    STRICT PEOPLE RULES:
    - ONE person only: Must be a Korean person in their 20s
    - MULTIPLE people: Exactly ONE Korean person in their 20s, all others must be Western (Caucasian or Black)
    - NEVER show two or more Korean/Asian people together
    - After one Korean appears, ALL other people must be Western
    - Exception: Historical figures or celebrities shown as they are
    
    CRITICAL: NO text, NO letters, NO words, NO writing anywhere in the image. Pure photography only.`;
  
  return prompt;
}

module.exports = {
  generateFeaturedImagePrompt,
  generateH2ImagePrompt,
  generateSceneContext,
  generateVisualElements
};