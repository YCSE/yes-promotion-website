#!/usr/bin/env node
/**
 * Linter for the posts in content/posts.
 *
 *   node scripts/lint-posts.js [--fix] [file.md ...]     (npm run lint:posts)
 *
 * The posts are written by a model, frontmatter included, and the model
 * sometimes breaks the structure (2026-11-09: `subtitle "..."` without the
 * colon). The site does not fail on that: the post shows up as "Untitled",
 * dated today and so sorted first, with the raw frontmatter as its text.
 * This linter is what stands between the model's output and the site:
 *   - the generator runs it with --fix on every post it writes and saves
 *     nothing that still has a problem (generate-blog-post.js, generate-content.js)
 *   - `npm run build` runs it first (prebuild), so a broken post stops the deploy
 *
 * Rules (--fix repairs the ones marked fixable):
 *   frontmatter-yaml   the frontmatter block must exist and parse as YAML   fixable
 *   frontmatter-title  title must be a non-empty string
 *   frontmatter-date   date must be a date
 *   body-empty         the post must have a body
 *   image-marker       no [IMAGE_PLACEHOLDER_...] marker left in the body   fixable
 *   image-missing      every local image the post points at must exist
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const FIELD_NAMES = ['title', 'subtitle', 'date', 'author', 'excerpt', 'featuredImage'];
const FIELD_LINE = new RegExp(`^\\s*(${FIELD_NAMES.join('|')})\\b\\s*[:：]?\\s*(.*)$`, 'i');
// The closing fence is looked for this far down; past it, a `---` is a rule in the body.
const MAX_FRONTMATTER_LINES = 40;
const MARKER = /\[IMAGE_PLACE\w*\]/;
const QUOTE_PAIRS = { '"': '"', "'": "'", '“': '”', '‘': '’' };

/** Parse a post; `error` is set instead of throwing when the frontmatter is not YAML. */
function parse(raw) {
  try {
    // Options keep gray-matter off its cache, which returns a document that
    // failed to parse as "no frontmatter" the second time it is read.
    const { data, content } = matter(raw, {});
    return { data, content, error: matter.test(raw) ? null : 'no frontmatter block' };
  } catch (error) {
    return { data: {}, content: '', error: `not valid YAML: ${error.message.split('\n')[0]}` };
  }
}

/** Drop the quotes around a value: straight or curly, closed or left open. */
function unquote(value) {
  let v = value.trim();
  const close = QUOTE_PAIRS[v[0]];
  if (close) {
    const open = v[0];
    if (v.length > 1 && v.endsWith(close)) v = v.slice(1, -1);
    else if (!v.slice(1).includes(close)) v = v.slice(1);
    else return v.replace(/\s+/g, ' ');
    if (open === '"') v = v.replace(/\\(["\\])/g, '$1');
    if (open === "'") v = v.replace(/''/g, "'");
  }
  return v.replace(/\s+/g, ' ').trim();
}

/**
 * Read a broken frontmatter block line by line. Tolerant of what the model
 * gets wrong: a missing colon, a value that runs over several lines, a missing
 * closing fence. Returns null when the document does not open with a fence.
 */
function readLoosely(raw) {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const open = lines.findIndex((line) => line.trim() !== '');
  if (open < 0 || lines[open].trim() !== '---') return null;
  const first = open + 1;

  let end = -1;
  for (let i = first; i < Math.min(lines.length, first + MAX_FRONTMATTER_LINES); i++) {
    if (/^---\s*$/.test(lines[i])) { end = i; break; }
  }
  // Without a closing fence the block ends at the first blank line.
  const fenced = end >= 0;
  if (!fenced) {
    end = lines.findIndex((line, i) => i >= first && line.trim() === '');
    if (end < 0) end = lines.length;
  }

  const fields = {};
  let current = null;
  for (const line of lines.slice(first, end)) {
    const field = line.match(FIELD_LINE);
    if (field) {
      current = FIELD_NAMES.find((name) => name.toLowerCase() === field[1].toLowerCase());
      fields[current] = field[2];
    } else if (current && line.trim()) {
      fields[current] += ` ${line.trim()}`;
    }
  }
  for (const name of Object.keys(fields)) fields[name] = unquote(fields[name]);

  return { fields, body: lines.slice(fenced ? end + 1 : end).join('\n').trim() };
}

/** Write the frontmatter again from what can be read of it. Strings go in as JSON strings, which YAML reads as-is. */
function repairFrontmatter(raw) {
  const doc = readLoosely(raw);
  if (!doc) return null;
  const lines = FIELD_NAMES.filter((name) => doc.fields[name]).map((name) => {
    const value = doc.fields[name];
    const plain = (name === 'date' && !Number.isNaN(Date.parse(value)))
      || (name === 'featuredImage' && /^[\w/.-]+$/.test(value));
    return `${name}: ${plain ? value : JSON.stringify(value)}`;
  });
  return `---\n${lines.join('\n')}\n---\n\n${doc.body}\n`;
}

/**
 * Lint one post.
 *   fix          repair what can be repaired; the result is in `text`
 *   publicDir    check that the local images the post points at exist there
 *   allowMarkers image markers are expected (the images are not rendered yet)
 * Returns the (possibly repaired) text, the rules that were fixed and the problems left.
 */
function lintPost(raw, { fix = false, publicDir = null, allowMarkers = false } = {}) {
  let text = raw;
  const fixed = [];
  const problems = [];
  const report = (rule, message, fixable = false) => problems.push({ rule, message, fixable });

  let post = parse(text);
  if (post.error && fix) {
    const repaired = repairFrontmatter(text);
    if (repaired && !parse(repaired).error) {
      text = repaired;
      post = parse(text);
      fixed.push('frontmatter-yaml');
    }
  }
  if (post.error) {
    report('frontmatter-yaml', `frontmatter is ${post.error}`, readLoosely(text) !== null);
    return { text, fixed, problems };
  }

  if (!allowMarkers && MARKER.test(post.content)) {
    if (fix) {
      text = text.replace(new RegExp(`${MARKER.source}[ \\t]*\\n?`, 'g'), '');
      post = parse(text);
      fixed.push('image-marker');
    } else {
      report('image-marker', `image marker left in the body: ${post.content.match(MARKER)[0]}`, true);
    }
  }

  const { data, content } = post;
  if (typeof data.title !== 'string' || !data.title.trim()) report('frontmatter-title', 'title is missing');
  if (!data.date || Number.isNaN(new Date(data.date).getTime())) report('frontmatter-date', 'date is missing or not a date');
  if (!content.trim()) report('body-empty', 'the post has no body');

  if (publicDir) {
    const images = [...content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)].map((match) => match[1]);
    if (typeof data.featuredImage === 'string') images.unshift(data.featuredImage);
    for (const image of new Set(images)) {
      if (image.startsWith('/') && !fs.existsSync(path.join(publicDir, image))) {
        report('image-missing', `image not found: ${image}`);
      }
    }
  }
  return { text, fixed, problems };
}

/** One line per problem, for an error message. */
function formatProblems(problems) {
  return problems.map((problem) => `${problem.rule}: ${problem.message}`).join('; ');
}

function main(argv) {
  const fix = argv.includes('--fix');
  const args = argv.filter((arg) => arg !== '--fix');
  const root = path.join(__dirname, '..');
  const postsDir = path.join(root, 'content', 'posts');
  const publicDir = path.join(root, 'public');
  const files = args.length > 0
    ? args.map((file) => path.resolve(file))
    : fs.readdirSync(postsDir).filter((name) => name.endsWith('.md')).map((name) => path.join(postsDir, name));

  let broken = 0;
  let fixable = 0;
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const result = lintPost(raw, { fix, publicDir });
    const name = path.relative(root, file);
    if (result.text !== raw) {
      fs.writeFileSync(file, result.text, 'utf8');
      console.log(`🔧 ${name}: fixed ${result.fixed.join(', ')}`);
    }
    if (result.problems.length === 0) continue;
    broken++;
    console.error(`❌ ${name}`);
    for (const problem of result.problems) {
      if (problem.fixable) fixable++;
      console.error(`   ${problem.rule}  ${problem.message}`);
    }
  }

  if (broken > 0) {
    console.error(`\n${broken} of ${files.length} posts have problems.`);
    if (fixable > 0) console.error(`${fixable} can be repaired with: npm run lint:posts -- --fix`);
    return 1;
  }
  console.log(`✅ ${files.length} posts linted, no problems`);
  return 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));

module.exports = { lintPost, formatProblems };
