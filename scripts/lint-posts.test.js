const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const matter = require('gray-matter');
const { lintPost } = require('./lint-posts');

// What the model wrote on 2026-11-09: the subtitle line has no colon.
const BROKEN_DOC = `---
title: "영화 감독처럼 노트하면 영어 실력이 달라진다"
subtitle "수업 노트를 콘티와 리허설 메모로 바꾸는 필기법"
date: 2026-11-09T08:08:53.229Z
author: "에디터 오혜리(Hailey)"
excerpt: "영화 감독이 콘티를 짜듯 노트를 정리합니다. 바로 써먹을 수 있습니다."
featuredImage: /images/blog/wrong-path.jpg
---

화상영어 수업이 끝나고 노트를 펼쳤을 때 무엇이 떠오르나요?

## 첫 번째 섹션

본문입니다.

---

## 두 번째 섹션

구분선 뒤의 본문입니다.
`;

const parse = (raw) => matter(raw, {});
const rules = (result) => result.problems.map((problem) => problem.rule);
const post = (frontmatter, body = '본문') => `---\n${frontmatter}\n---\n\n${body}\n`;
const GOOD = 'title: "제목"\ndate: 2026-11-14T00:00:00.000Z';

test('a frontmatter line without its colon is reported, every time it is read', () => {
  const result = lintPost(BROKEN_DOC);
  assert.deepEqual(rules(result), ['frontmatter-yaml']);
  assert.equal(result.problems[0].fixable, true);
  assert.equal(result.text, BROKEN_DOC, 'nothing is changed without fix');
  // gray-matter caches a failed parse as "no frontmatter"; the second read must report it too.
  assert.deepEqual(rules(lintPost(BROKEN_DOC)), ['frontmatter-yaml']);
});

test('--fix repairs the missing colon and leaves the rest of the post alone', () => {
  const result = lintPost(BROKEN_DOC, { fix: true });
  assert.deepEqual(result.fixed, ['frontmatter-yaml']);
  assert.deepEqual(result.problems, []);
  assert.equal(result.text, BROKEN_DOC.replace('subtitle "', 'subtitle: "'));
  assert.deepEqual(lintPost(result.text).problems, []);
});

test('--fix reads values over several lines, open quotes and a missing closing fence', () => {
  const result = lintPost(`
---
Title: “큰따옴표가 "안에" 있고 콜론: 도 있는 제목”
subtitle： '부제목
date: 2026-11-14T07:27:15.354Z
excerpt: "요약 첫 줄
요약 둘째 줄"

본문 첫 문단.

## 섹션
`, { fix: true });
  assert.deepEqual(result.fixed, ['frontmatter-yaml']);
  assert.deepEqual(result.problems, []);
  const { data, content } = parse(result.text);
  assert.equal(data.title, '큰따옴표가 "안에" 있고 콜론: 도 있는 제목');
  assert.equal(data.subtitle, '부제목');
  assert.equal(data.excerpt, '요약 첫 줄 요약 둘째 줄');
  assert.equal(new Date(data.date).toISOString(), '2026-11-14T07:27:15.354Z');
  assert.ok(content.trim().startsWith('본문 첫 문단.'));
});

test('a valid post is not rewritten by --fix', () => {
  const raw = post(`${GOOD}\nsubtitle: 따옴표 없는 부제목\ncustom: 1`, '## 섹션\n\n본문\n\n---\n\n끝');
  const result = lintPost(raw, { fix: true });
  assert.equal(result.text, raw);
  assert.deepEqual(result.fixed, []);
  assert.deepEqual(result.problems, []);
});

test('what --fix cannot repair is reported', () => {
  assert.deepEqual(rules(lintPost('본문만 있는 글', { fix: true })), ['frontmatter-yaml']);
  assert.equal(lintPost('본문만 있는 글').problems[0].fixable, false);
  assert.deepEqual(rules(lintPost(post('date: 2026-11-14T00:00:00.000Z'), { fix: true })), ['frontmatter-title']);
  assert.deepEqual(rules(lintPost(post('title: "제목"\ndate: 어제'), { fix: true })), ['frontmatter-date']);
  assert.deepEqual(rules(lintPost(post('title: "제목"'), { fix: true })), ['frontmatter-date']);
  assert.deepEqual(rules(lintPost(post(GOOD, ''), { fix: true })), ['body-empty']);
  // Broken YAML with no title: repaired into valid YAML, then the title rule reports it.
  assert.deepEqual(rules(lintPost(post('subtitle "부제목"\ndate: 2026-11-14T00:00:00.000Z'), { fix: true })), ['frontmatter-title']);
});

test('a leftover image marker is reported, removed by --fix, and allowed before the images exist', () => {
  const raw = post(GOOD, '## 섹션\n[IMAGE_PLACEER_H2_3]\n\n본문');
  assert.deepEqual(rules(lintPost(raw)), ['image-marker']);
  assert.deepEqual(lintPost(raw, { allowMarkers: true }).problems, []);

  const result = lintPost(raw, { fix: true });
  assert.deepEqual(result.fixed, ['image-marker']);
  assert.deepEqual(result.problems, []);
  assert.equal(result.text, post(GOOD, '## 섹션\n\n본문'));

  assert.equal(lintPost(raw, { fix: true, allowMarkers: true }).text, raw, 'expected markers are kept');
});

test('images the post points at must exist', () => {
  const publicDir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-'));
  fs.mkdirSync(path.join(publicDir, 'images', 'blog'), { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'images', 'blog', 'a.jpg'), '');
  const raw = post(
    `${GOOD}\nfeaturedImage: /images/blog/a.jpg`,
    '![있음](/images/blog/a.jpg)\n\n![없음](/images/blog/b.jpg)\n\n![외부](https://example.com/c.jpg)'
  );
  const result = lintPost(raw, { publicDir });
  assert.deepEqual(result.problems.map((p) => `${p.rule} ${p.message}`), ['image-missing image not found: /images/blog/b.jpg']);
  assert.deepEqual(lintPost(raw).problems, [], 'not checked without publicDir');
  fs.rmSync(publicDir, { recursive: true });
});

test('generateBlogPost returns a lint-clean post when the model breaks the frontmatter', async () => {
  // Stand in for the Anthropic client: the "model" returns the broken document.
  const clientPath = require.resolve('./claude-client');
  const fakeClient = {
    messages: {
      stream: () => ({
        finalMessage: async () => ({ text: BROKEN_DOC, usage: { input_tokens: 0, output_tokens: 0 } }),
      }),
    },
  };
  require.cache[clientPath] = {
    id: clientPath,
    filename: clientPath,
    loaded: true,
    exports: { getClient: () => fakeClient, responseText: (message) => message.text, WRITING_MODEL: 'test-model' },
  };

  const { log, warn } = console;
  const warnings = [];
  console.log = () => {};
  console.warn = (line) => warnings.push(String(line));
  let result;
  try {
    const { generateBlogPost } = require('./generate-blog-post');
    result = await generateBlogPost();
  } finally {
    console.log = log;
    console.warn = warn;
    delete require.cache[clientPath];
  }

  assert.ok(warnings.some((line) => line.includes('Linter repaired: frontmatter-yaml')));
  assert.deepEqual(lintPost(result.content, { allowMarkers: true }).problems, []);
  assert.equal(result.title, '영화 감독처럼 노트하면 영어 실력이 달라진다');
  const { data, content } = parse(result.content);
  assert.equal(data.subtitle, '수업 노트를 콘티와 리허설 메모로 바꾸는 필기법');
  assert.equal(data.featuredImage, `/images/blog/${result.slug}.jpg`);
  assert.match(content, /## 첫 번째 섹션\n\[IMAGE_PLACEHOLDER_H2_1\]/);
  assert.match(content, /## 두 번째 섹션\n\[IMAGE_PLACEHOLDER_H2_2\]/);
});

test('generateContent saves a lint-clean post and refuses one that is not', async () => {
  // Stand in for the model and the image server; generateContent itself is the real one.
  const stub = (file, exports) => {
    const id = require.resolve(file);
    require.cache[id] = { id, filename: id, loaded: true, exports };
    return id;
  };
  const slug = '2026-11-14-test-1';
  let finished; // what the image step hands back
  const stubs = [
    stub('./claude-client', { WRITING_MODEL: 'test-model' }),
    stub('./qwen-image-client', { withImageServer: (fn) => fn() }),
    stub('./generate-blog-post', { generateBlogPost: async () => ({ slug, title: '제목', content: '' }) }),
    stub('./generate-blog-images', {
      generateBlogImages: async () => ({ updatedContent: finished, featuredImagePath: `/images/blog/${slug}.jpg` }),
    }),
  ];
  delete require.cache[require.resolve('./generate-content')];

  const cwd = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'content-'));
  fs.mkdirSync(path.join(dir, 'public', 'images', 'blog'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'public', 'images', 'blog', `${slug}.jpg`), '');
  const saved = path.join(dir, 'content', 'posts', `${slug}.md`);
  const frontmatter = `${GOOD}\nfeaturedImage: /images/blog/${slug}.jpg`;

  const { log, warn, error } = console;
  console.log = console.warn = console.error = () => {};
  process.chdir(dir);
  try {
    const { generateContent } = require('./generate-content');

    // An image the post points at was never written: nothing is saved.
    finished = post(frontmatter, `## 섹션\n\n![섹션](/images/blog/${slug}-h2-1.jpg)\n\n본문`);
    await assert.rejects(generateContent(), /Post failed lint, not saving it: image-missing/);
    assert.equal(fs.existsSync(saved), false);

    // A marker that got no image is removed, and the post is saved.
    finished = post(frontmatter, '## 섹션\n[IMAGE_PLACEHOLDER_H2_1]\n\n본문');
    await generateContent();
    assert.equal(fs.readFileSync(saved, 'utf8'), post(frontmatter, '## 섹션\n\n본문'));
  } finally {
    process.chdir(cwd);
    console.log = log;
    console.warn = warn;
    console.error = error;
    for (const id of stubs) delete require.cache[id];
    fs.rmSync(dir, { recursive: true });
  }
});
