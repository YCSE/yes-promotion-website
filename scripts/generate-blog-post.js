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

중요 요구사항:
1. 반드시 최소 1개 이상의 H2 (##) 섹션을 포함해야 합니다.
2. 각 H2 섹션 제목 바로 다음 줄에 [IMAGE_PLACEHOLDER_H2_{번호}] 마커를 삽입 (예: ## 핵심 표현 익히기\n[IMAGE_PLACEHOLDER_H2_1])
3. author는 반드시 "${randomEditor}"를 사용해야 합니다. YES English Team이 아닙니다!
4. 리스트 항목 (<li> 또는 -)은 꼭 필요한 경우에만 최소한으로 사용하세요.
5. 위에 명시된 "작성 방향"을 반드시 따라서 글을 구성하세요. 이것이 글의 전체적인 구조와 접근법을 결정합니다.

다음 구조로 작성해주세요:
1. 흥미로운 제목 (한국어)
2. 부제목 (한국어, 선택사항)
3. 도입부 (왜 이 주제가 중요한지)
4. 최소 1개 이상의 H2 섹션으로 구성된 본문 내용
   - 각 H2 섹션은 실용적인 예시와 설명 포함
   - 리스트보다는 문단 형식 선호
   - 작성 방향에 맞는 스타일로 전개
5. 마무리와 다음 단계

요구사항:
- 한국어로 작성하되, 영어 예문은 영어로
- 실용적이고 즉시 활용 가능한 내용
- 초급-중급 학습자 대상
- 친근하고 격려하는 톤 (작성 방향에 따라 조정)
- 2000-3000자 분량 (충실한 내용을 위해 분량 증가)
- 마크다운 형식으로 작성
- 리스트 사용 최소화, 문단 형식 선호
- 작성 방향을 창의적으로 해석하여 독특하고 흥미로운 글 작성

형식 (반드시 이 형식을 따르세요):
---
title: [제목]
subtitle: [부제목]
date: ${new Date().toISOString()}
author: ${randomEditor}
excerpt: [요약 2-3문장]
featuredImage: /images/blog/${slug}.jpg
---

[본문 내용 - 반드시 H2 섹션 포함 및 작성 방향 반영]
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
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