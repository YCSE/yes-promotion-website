const fs = require('fs-extra');
const path = require('path');
const { generateBlogPost } = require('./generate-blog-post');
const { generateBlogImages } = require('./generate-blog-images');
const { withImageServer } = require('./qwen-image-client');
const { WRITING_MODEL } = require('./claude-client');

async function generateContent() {
  try {
    console.log('🚀 Starting content generation...');

    // The local image model is brought up first: without it there is no post today.
    const result = await withImageServer(async () => {
      // Step 1: Generate blog post
      console.log(`📝 Generating blog post with ${WRITING_MODEL}...`);
      const { slug, content, title } = await generateBlogPost();
      console.log(`✅ Blog post generated: ${title}`);

      // Step 2: Generate all images (featured + H2) with the local Qwen-Image model
      console.log('🎨 Generating blog images with Qwen-Image-2.1-Turbo...');
      const { updatedContent, featuredImagePath } = await generateBlogImages(content, title, slug);
      console.log(`✅ All images generated`);

      return { slug, title, updatedContent, featuredImagePath };
    });
    const { slug, title, updatedContent, featuredImagePath } = result;

    // Step 3: Save the blog post
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    await fs.ensureDir(postsDir);

    const postPath = path.join(postsDir, `${slug}.md`);
    await fs.writeFile(postPath, updatedContent, 'utf8');
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
  // Check if API key is available
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY environment variable is not set');
    console.log('Please set the ANTHROPIC_API_KEY environment variable and try again.');
    console.log('Example: ANTHROPIC_API_KEY=your_api_key_here node scripts/generate-content.js');
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
