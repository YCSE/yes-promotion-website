const { format } = require('date-fns');
const { getClient, responseText, WRITING_MODEL } = require('./claude-client');

const SYSTEM_PROMPT = `당신은 화상영어 플랫폼 익스의 블로그 에디터입니다.
요청받은 블로그 포스트를 마크다운 문서 하나로만 출력하세요. 첫 줄은 frontmatter를 여는 '---'입니다.
문서 앞뒤에 설명이나 인사말을 붙이지 말고, 문서 전체를 코드 블록(\`\`\`)으로 감싸지 마세요.`;

/**
 * Keep only the markdown document: drop anything before the opening frontmatter
 * fence and a wrapping code fence, if the model added one.
 */
function extractMarkdownDocument(text) {
  let doc = text.trim();
  const start = doc.search(/^---\s*$/m);
  if (start > 0) {
    const preamble = doc.slice(0, start);
    doc = doc.slice(start);
    // Only a fence opened before the frontmatter wraps the document; a post may itself end in a code block.
    if (/^```/m.test(preamble)) doc = doc.replace(/\n```\s*$/, '');
  }
  return doc.trim() + '\n';
}

const MAX_H2_IMAGES = 4;

/**
 * Put one image marker right under each of the first four H2 headings. The model
 * does not place them reliably (sometimes none at all), so markers it wrote are
 * dropped and placed again here.
 */
function placeImagePlaceholders(doc) {
  let n = 0;
  return doc
    .replace(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g, '')
    .replace(/^(##[ \t]+.*?)[ \t]*$/gm, (line, heading) =>
      n < MAX_H2_IMAGES ? `${heading}\n[IMAGE_PLACEHOLDER_H2_${++n}]` : line)
    .replace(/\n{3,}/g, '\n\n');
}

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
    const client = getClient();

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

영어공부에 관심있는 익스 학생을 위한 블로그 포스트를 작성해주세요. (fyi, 익스는 화상영어 플랫폼입니다. 한글 본문에서는 반드시 "익스"로만 표기하고, 영문 표기가 꼭 필요한 경우에만 "YCSE"를 사용하세요. "YES"는 절대 사용하지 마세요.)

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

3. 리스트(-)는 최소한으로, 문단 위주로 작성

4. 과도한 괄호 사용 금지 (예: '프렌즈(Friends)' → 프렌즈)

5. ⚠️ 예문 작성 규칙 (매우 중요):
   - 학습 효율성을 위해 항상 완전한 예문을 제공하세요
   - 템플릿 형식의 문장 절대 금지 (예: [날짜], [제품명], [문제점] 등)
   - 구체적이고 실제적인 상황의 예문 사용

   ❌ 잘못된 예: "I would like to report an issue with [제품 이름]."
   ❌ 잘못된 예: "My reservation for [날짜] at [시간] was not found."

   ✅ 올바른 예: "I would like to report an issue with my laptop."
   ✅ 올바른 예: "My reservation for December 25th at 7 PM was not found."
   ✅ 올바른 예: "The coffee maker I purchased last Monday is leaking water."

6. 마크다운 문법을 자유롭게 사용하세요:
   - **볼드**, *이탤릭*, 리스트, 인용구 등 표준 마크다운 문법 모두 사용 가능
   - 강조가 필요한 부분은 **볼드**로 표시
   - 페이지에서 자동으로 올바르게 렌더링됩니다

【좋은 예시】
✅ "프렌즈나 해리포터 같은 작품을 추천합니다"
✅ "**중요한 표현**은 이렇게 강조합니다"
✅ "**'so ~ that'** 구문을 사용하면 더 자연스럽습니다"
✅ "I was charged for $50 but I only received one meal." (구체적 예문)
❌ "드라마('프렌즈'), 영화('해리포터')" (과도한 괄호)
❌ "I was charged for [금액] but I only received [서비스]." (템플릿 형식)

【글 구조】
1. 제목과 부제목
2. 흥미로운 도입부
3. H2 섹션들 (실용적 내용)
4. 마무리

【형식】
---
title: "[제목 - 항상 따옴표로 감싸세요]" ':' 기호를 쓰지 않고 한 문장으로 생성한다.
subtitle: "[부제목 - 항상 따옴표로 감싸세요]" ':' 기호를 쓰지 않고 한 문장으로 생성한다.
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

    console.log(`✍️ Writing with ${WRITING_MODEL}...`);
    const message = await client.messages
      .stream({
        model: WRITING_MODEL,
        max_tokens: 64000,
        // high: the post has many strict formatting rules to follow
        output_config: { effort: 'high' },
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
      })
      .finalMessage();
    console.log(`📊 Tokens: ${message.usage.input_tokens} in / ${message.usage.output_tokens} out`);

    let text = extractMarkdownDocument(responseText(message));

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

    // featuredImage 경로 강제 수정 (AI가 날짜를 잘못 변경하는 경우 방지)
    const correctFeaturedImage = `/images/blog/${slug}.jpg`;
    const featuredImagePattern = /featuredImage:\s*.+/;
    if (text.match(featuredImagePattern)) {
      const originalMatch = text.match(featuredImagePattern)[0];
      const correctedLine = `featuredImage: ${correctFeaturedImage}`;
      if (originalMatch !== correctedLine) {
        console.warn(`⚠️ featuredImage 경로 수정: ${originalMatch} → ${correctedLine}`);
        text = text.replace(featuredImagePattern, correctedLine);
      }
    }

    // 플레이스홀더 배치 및 검증
    const modelPlaceholders = (text.match(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g) || []).length;
    text = placeImagePlaceholders(text);
    const placeholders = (text.match(/\[IMAGE_PLACEHOLDER_H2_\d+\]/g) || []).length;
    console.log(`📸 이미지 플레이스홀더: 모델 작성 ${modelPlaceholders}개 → H2 아래 ${placeholders}개 배치`);

    if (placeholders < MAX_H2_IMAGES) {
      console.warn(`⚠️ 경고: H2 섹션이 ${placeholders}개뿐이라 이미지도 ${placeholders}개만 들어갑니다`);
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

module.exports = { generateBlogPost, placeImagePlaceholders, EDITORS, BlogPostGenerator, TOPICS, WRITING_DIRECTIONS };

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