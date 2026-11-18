const fs = require('fs-extra');
const path = require('path');
const { generateBlogPost } = require('./generate-blog-post');
const { generateBlogImages } = require('./generate-blog-images');
const { withImageServer } = require('./h3-image-client');
const { WRITING_MODEL, isAvailable: hermesAvailable, HERMES } = require('./hermes-client');
const { lintPost, formatProblems } = require('./lint-posts');

async function generateContent() {
  try {
    console.log('🚀 Starting content generation...');

    // The local image model is brought up first: without it there is no post today.
    const result = await withImageServer(async () => {
      // Step 1: Generate blog post
      console.log(`📝 Generating blog post with ${WRITING_MODEL}...`);
      const { slug, content, title } = await generateBlogPost();
      console.log(`✅ Blog post generated: ${title}`);

      // Step 2: Generate all images (featured + H2) with the local MiniMax-H3-Image model
      console.log('🎨 Generating blog images with MiniMax-H3-Image...');
      const { updatedContent, featuredImagePath } = await generateBlogImages(content, title, slug);
      console.log(`✅ All images generated`);

      return { slug, title, updatedContent, featuredImagePath };
    });
    const { slug, title, updatedContent, featuredImagePath } = result;

    // Step 3: Lint the finished post, then save it. A post that still has a
    // problem is not saved, so it is never committed and published.
    const linted = lintPost(updatedContent, { fix: true, publicDir: path.join(process.cwd(), 'public') });
    if (linted.fixed.length > 0) console.warn(`🔧 Linter repaired: ${linted.fixed.join(', ')}`);
    if (linted.problems.length > 0) throw new Error(`Post failed lint, not saving it: ${formatProblems(linted.problems)}`);

    const postsDir = path.join(process.cwd(), 'content', 'posts');
    await fs.ensureDir(postsDir);

    const postPath = path.join(postsDir, `${slug}.md`);
    await fs.writeFile(postPath, linted.text, 'utf8');
    console.log(`✅ Blog post saved: ${postPath}`);

    // Step 4: Log summary
    console.log('\n📊 Content Generation Summary:');
    console.log('================================');
    console.log(`Title: ${title}`);
    console.log(`Slug: ${slug}`);
    console.log(`Post: /content/posts/${slug}.md`);
    console.log(`Image: ${featuredImagePath}`);
    console.log('================================');
    console.log('✨ Content generation completed successfully!');

    return {
      success: true,
      slug,
      title,
      postPath,
      imagePath: featuredImagePath
    };
  } catch (error) {
    console.error('❌ Error generating content:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  // The post is written by the model selected in Hermes on the DGX
  if (!hermesAvailable()) {
    console.error(`❌ Error: Hermes not found at ${HERMES} (set HERMES_BIN); the post is written by its selected model`);
    process.exit(1);
  }
  
  generateContent()
    .then(result => {
      console.log('\n✅ All done! Your new blog post is ready.');
      console.log(`View it at: http://localhost:3000/blog/${result.slug}`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Content generation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { generateContent };
