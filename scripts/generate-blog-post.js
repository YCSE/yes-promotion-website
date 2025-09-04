const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');
const fs = require('fs-extra');
const path = require('path');
const { format } = require('date-fns');

// Editor names for blog posts
const EDITORS = [
  '에디터 황요섭(Roy)',
  '에디터 정다홍(Rita)',
  '에디터 손온유(Olive)',
  '에디터 김가혜(Kay)',
  '에디터 오혜리(Hailey)'
];

// Import topics and directions from the generation system
const { BlogPostGenerator, TOPICS, WRITING_DIRECTIONS } = require('../blog-generation-system');

async function generateBlogPost() {
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
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: -1,
        },
      },
    });

    // Use the BlogPostGenerator to get random combination
    const generator = new BlogPostGenerator();
    const combination = generator.generateRandomCombination();
    const topic = combination.topic;
    const topicSlug = combination.slug;
    const direction = combination.direction;
    const combinationId = combination.combinationId;
    const randomEditor = EDITORS[Math.floor(Math.random() * EDITORS.length)];
    
    // Generate unique slug using date, topic slug, and combination ID
    // This ensures uniqueness even when same topic is used with different directions
    const slug = `${format(new Date(), 'yyyy-MM-dd')}-${topicSlug}-${combinationId}`;
    
    // Log the selected combination
    console.log('\n=== Selected Blog Post Configuration ===');
    console.log('Topic:', topic);
    console.log('Slug:', topicSlug);
    console.log('Writing Direction:', direction);
    console.log('Combination ID:', combinationId);
    console.log('Author:', randomEditor);
    console.log('Final Slug:', slug);
    console.log('\n');
    
    const prompt = `
한국인 영어 학습자를 위한 블로그 포스트를 작성해주세요.

주제: ${topic}
작성 방향: ${direction}

【필수 규칙】
1. ⚠️ 매우 중요: 모든 H2(##) 섹션 제목 바로 다음 줄에 반드시 [IMAGE_PLACEHOLDER_H2_{번호}] 삽입!
   예시:
   ## 첫 번째 섹션
   [IMAGE_PLACEHOLDER_H2_1]
   
   ## 두 번째 섹션  
   [IMAGE_PLACEHOLDER_H2_2]
   
2. author는 반드시 "${randomEditor}" 사용
3. 작은따옴표 백틱 사용 절대 금지 → 강조할 때는 **볼드체** 사용
4. 리스트(-)는 최소한으로, 문단 위주로 작성
5. 과도한 괄호 사용 금지 (예: '프렌즈(Friends)' → 프렌즈)

【좋은 예시】
✅ "프렌즈나 해리포터 같은 작품을 추천합니다"
✅ "**중요한 표현**은 이렇게 강조합니다"
❌ "드라마('프렌즈'), 영화('해리포터')"
❌ '이렇게' 백틱 사용 금지

【글 구조】
1. 제목과 부제목
2. 흥미로운 도입부
3. H2 섹션들 (실용적 내용)
4. 마무리

【형식】
---
title: "[제목 - 항상 따옴표로 감싸세요]"
subtitle: "[부제목 - 항상 따옴표로 감싸세요]"
date: ${new Date().toISOString()}
author: "${randomEditor}"
excerpt: "[요약 2-3문장 - 항상 따옴표로 감싸세요]"
featuredImage: /images/blog/${slug}.jpg
---

[본문 - 2000-3000자, 친근한 톤, 실용적 내용]
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse frontmatter to get the title
    const titleMatch = text.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '') : topic;
    
    return {
      slug,
      content: text,
      title
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

module.exports = { generateBlogPost, EDITORS, BlogPostGenerator, TOPICS, WRITING_DIRECTIONS };

// Run if called directly
if (require.main === module) {
  generateBlogPost()
    .then(result => {
      console.log('Blog post generated successfully');
      console.log('Slug:', result.slug);
      console.log('Title:', result.title);
    })
    .catch(error => {
      console.error('Failed to generate blog post:', error);
      process.exit(1);
    });
}