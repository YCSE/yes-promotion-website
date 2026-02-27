const fs = require('fs-extra');
const path = require('path');
const { generateBlogPost } = require('./generate-blog-post');
const { generateBlogImages } = require('./generate-blog-images');

async function generateContent() {
  try {
    console.log('🚀 Starting content generation...');

    // Step 1: Generate blog post
    console.log('📝 Generating blog post with Gemini...');
    const { slug, content, title } = await generateBlogPost();
    console.log(`✅ Blog post generated: ${title}`);

    // Step 2: Generate all images (featured + H2) in one multi-turn session
    console.log('🎨 Generating blog images with visual consistency...');
    const { updatedContent, featuredImagePath } = await generateBlogImages(content, title, slug);
    console.log(`✅ All images generated`);

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
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is not set');
    console.log('Please set the GEMINI_API_KEY environment variable and try again.');
    console.log('Example: GEMINI_API_KEY=your_api_key_here node scripts/generate-content.js');
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