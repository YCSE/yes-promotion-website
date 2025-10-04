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
  '에디터 오혜리(Hailey)',
  '에디터 황해나(Hannah)',
  '에디터 이든(Aiden)',
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
      model: 'gemini-flash-latest',
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
⚠️⚠️⚠️ 극도로 중요한 철자 규칙 ⚠️⚠️⚠️
이미지 플레이스홀더는 반드시 정확히 다음과 같이 작성하세요:
[IMAGE_PLACEHOLDER_H2_1]
[IMAGE_PLACEHOLDER_H2_2]
[IMAGE_PLACEHOLDER_H2_3]
[IMAGE_PLACEHOLDER_H2_4]

절대로 다음과 같은 오타를 내지 마세요:
❌ [IMAGE_PLACEER_H2_1] - PLACEER는 틀렸습니다!
❌ [IMAGE_PLACEHANCER_H2_1] - PLACEHANCER는 틀렸습니다!
❌ [IMAGE_PLACEHODLER_H2_1] - PLACEHODLER는 틀렸습니다!
❌ [IMAGE_PALCEHOLDER_H2_1] - PALCEHOLDER는 틀렸습니다!

✅ 올바른 철자는 오직: PLACEHOLDER (P-L-A-C-E-H-O-L-D-E-R)

영어공부에 관심있는 YES 학생을 위한 블로그 포스트를 작성해주세요. (fyi, YES는 화상영어 플랫폼입니다)

주제: ${topic}
작성 방향: ${direction}

【필수 규칙】
1. ⚠️ 매우 중요: 모든 H2(##) 섹션 제목 바로 다음 줄에 아래 텍스트를 정확히 복사해서 붙여넣으세요:
   
   첫 번째 H2 다음: [IMAGE_PLACEHOLDER_H2_1]
   두 번째 H2 다음: [IMAGE_PLACEHOLDER_H2_2]
   세 번째 H2 다음: [IMAGE_PLACEHOLDER_H2_3]
   네 번째 H2 다음: [IMAGE_PLACEHOLDER_H2_4]
   
   ⚠️ 위 텍스트를 한 글자도 바꾸지 말고 그대로 복사하세요!
   ⚠️ PLACEHOLDER 철자를 절대 바꾸지 마세요 (PLACEER ❌, PLACEHANCER ❌)
   
2. author는 반드시 "${randomEditor}" 사용
3. 작은따옴표 백틱 사용 절대 금지 → 강조할 때는 **볼드체** 사용
4. 리스트(-)는 최소한으로, 문단 위주로 작성
5. 과도한 괄호 사용 금지 (예: '프렌즈(Friends)' → 프렌즈)
6. ⚠️ 마크다운 문법 주의사항:
   - **'텍스트'**, **"텍스트"**, **(텍스트)** 패턴 금지!
   - 따옴표나 괄호와 강조를 함께 쓸 때는 분리하세요
   - ❌ 잘못된 예: **'so ~ that'**, **"너무 ~해서 ~하다"**, **(Zero Conditional)**
   - ✅ 올바른 예: 'so ~ that' 구문, "너무 ~해서 ~하다"라는 뜻, (Zero Conditional) 또는 Zero Conditional
   - ✅ 또는: **so ~ that** 구문, **너무 ~해서 ~하다**는 뜻, **영조건문** (Zero Conditional)

7. ⚠️ 예문 작성 규칙 (매우 중요):
   - 학습 효율성을 위해 항상 완전한 예문을 제공하세요
   - 템플릿 형식의 문장 절대 금지 (예: [날짜], [제품명], [문제점] 등)
   - 구체적이고 실제적인 상황의 예문 사용
   
   ❌ 잘못된 예: "I would like to report an issue with [제품 이름]."
   ❌ 잘못된 예: "My reservation for [날짜] at [시간] was not found."
   
   ✅ 올바른 예: "I would like to report an issue with my laptop."
   ✅ 올바른 예: "My reservation for December 25th at 7 PM was not found."
   ✅ 올바른 예: "The coffee maker I purchased last Monday is leaking water."

【좋은 예시】
✅ "프렌즈나 해리포터 같은 작품을 추천합니다"
✅ "**중요한 표현**은 이렇게 강조합니다"
✅ "I was charged for $50 but I only received one meal." (구체적 예문)
❌ "드라마('프렌즈'), 영화('해리포터')"
❌ '이렇게' 백틱 사용 금지
❌ "I was charged for [금액] but I only received [서비스]." (템플릿 형식)

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

【작성 후 체크리스트】
□ 각 H2 제목 다음에 [IMAGE_PLACEHOLDER_H2_숫자]가 있는가?
□ PLACEHOLDER 철자가 정확한가? (PLACEER나 다른 오타가 없는가?)
□ 총 4개의 H2 섹션과 4개의 이미지 플레이스홀더가 있는가?
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();
    
    // 오타 감지 및 자동 수정
    const typoPatterns = [
      { wrong: /\[IMAGE_PLACEER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHANCER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHODLER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PALCEHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACEHODER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
      { wrong: /\[IMAGE_PLACHOLDER_H2_(\d+)\]/g, correct: '[IMAGE_PLACEHOLDER_H2_$1]' },
    ];
    
    let typoFound = false;
    for (const pattern of typoPatterns) {
      const matches = text.match(pattern.wrong);
      if (matches) {
        console.warn(`⚠️ 오타 발견 및 수정: ${matches.join(', ')}`);
        text = text.replace(pattern.wrong, pattern.correct);
        typoFound = true;
      }
    }
    
    if (typoFound) {
      console.log('✅ 오타가 자동으로 수정되었습니다.');
    }
    
    // 플레이스홀더 검증
    const placeholderPattern = /\[IMAGE_PLACEHOLDER_H2_(\d+)\]/g;
    const placeholders = [...text.matchAll(placeholderPattern)];
    console.log(`📸 발견된 이미지 플레이스홀더: ${placeholders.length}개`);
    
    if (placeholders.length < 4) {
      console.warn(`⚠️ 경고: 4개의 플레이스홀더가 필요하지만 ${placeholders.length}개만 발견됨`);
    }
    
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