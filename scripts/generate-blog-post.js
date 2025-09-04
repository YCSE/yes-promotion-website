const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');
const fs = require('fs-extra');
const path = require('path');
const { format } = require('date-fns');

// Topics for English learning blog posts with English slugs
const TOPICS = [
  { korean: '일상 영어 회화: 카페에서 주문하기', slug: 'daily-english-cafe-ordering' },
  { korean: '비즈니스 영어: 이메일 작성 팁', slug: 'business-english-email-tips' },
  { korean: '여행 영어: 공항과 호텔에서 쓰는 표현', slug: 'travel-english-airport-hotel' },
  { korean: '영어 발음 개선: 한국인이 어려워하는 발음', slug: 'english-pronunciation-korean-learners' },
  { korean: '영어 숙어와 관용 표현 마스터하기', slug: 'english-idioms-expressions' },
  { korean: '실전 영어: 전화 통화 표현', slug: 'practical-english-phone-calls' },
  { korean: '영어 문법: 시제 완벽 정리', slug: 'english-grammar-tenses-guide' },
  { korean: '토익/토플 준비: 고득점 전략', slug: 'toeic-toefl-high-score-strategy' },
  { korean: '영어 단어 암기법: 효율적인 학습 방법', slug: 'english-vocabulary-memorization' },
  { korean: '미드로 배우는 실생활 영어', slug: 'learn-english-tv-shows' },
  { korean: '영어 프레젠테이션 스킬', slug: 'english-presentation-skills' },
  { korean: '소셜 미디어 영어: SNS에서 쓰는 표현', slug: 'social-media-english-expressions' },
  { korean: '영어 인터뷰 준비하기', slug: 'english-interview-preparation' },
  { korean: '어린이 영어 교육 방법', slug: 'kids-english-education-methods' },
  { korean: '영어 뉴스 읽기 팁', slug: 'english-news-reading-tips' },
  { korean: '영어 작문 실력 향상시키기', slug: 'improve-english-writing-skills' },
  { korean: '영어 리스닝 스킬 개발', slug: 'develop-english-listening-skills' },
  { korean: '영어 스피킹 자신감 기르기', slug: 'build-english-speaking-confidence' },
  { korean: '문화 차이와 영어 표현', slug: 'cultural-differences-english-expressions' },
  { korean: '영어 독해 전략', slug: 'english-reading-comprehension-strategy' }
];

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

    // Select a random topic
    const topicObj = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const topic = topicObj.korean;
    const topicSlug = topicObj.slug;
    
    const prompt = `
한국인 영어 학습자를 위한 블로그 포스트를 작성해주세요.

주제: ${topic}

다음 구조로 작성해주세요:
1. 흥미로운 제목 (한국어)
2. 부제목 (한국어, 선택사항)
3. 도입부 (왜 이 주제가 중요한지)
4. 핵심 내용 (실용적인 예시와 함께)
5. 실전 연습 문제 또는 팁
6. 마무리와 다음 단계

요구사항:
- 한국어로 작성하되, 영어 예문은 영어로
- 실용적이고 즉시 활용 가능한 내용
- 초급-중급 학습자 대상
- 친근하고 격려하는 톤
- 1500-2000자 분량
- 마크다운 형식으로 작성

형식:
---
title: [제목]
subtitle: [부제목]
date: ${new Date().toISOString()}
author: YES English Team
excerpt: [요약 2-3문장]
featuredImage: /images/blog/[slug].webp
---

[본문 내용]
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract frontmatter and content
    const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!frontmatterMatch) {
      throw new Error('Invalid blog post format');
    }
    
    const [, frontmatterContent, mainContent] = frontmatterMatch;
    
    // Parse frontmatter to get the title
    const titleMatch = frontmatterContent.match(/title:\s*(.+)/);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '') : topic;
    
    // Generate slug using English slug from the topic
    const slug = `${format(new Date(), 'yyyy-MM-dd')}-${topicSlug}`;
    
    // Update featured image path with correct slug
    const updatedContent = text.replace(
      /featuredImage:\s*\/images\/blog\/\[slug\]\.webp/,
      `featuredImage: /images/blog/${slug}.webp`
    );
    
    return {
      slug,
      content: updatedContent,
      title
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}

module.exports = { generateBlogPost };

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