const { generateBlogPost } = require('./generate-blog-post');
const { generateBlogImages } = require('./generate-blog-images');
const fs = require('fs-extra');
const path = require('path');

async function generateCompleteBlogPost() {
  try {
    console.log('Starting complete blog post generation...');

    // Step 1: Generate blog post content
    console.log('\n1. Generating blog post content...');
    const { slug, content, title } = await generateBlogPost();
    console.log(`   ✓ Generated post: "${title}"`);

    // Step 2: Generate all images (featured + H2) in one multi-turn session
    console.log('\n2. Generating blog images with visual consistency...');
    const { updatedContent, featuredImagePath } = await generateBlogImages(content, title, slug);
    console.log(`   ✓ Featured image: ${featuredImagePath}`);
    console.log('   ✓ H2 images processed');

    // Step 3: Save the blog post
    console.log('\n3. Saving blog post...');
    const postsDir = path.join(process.cwd(), 'content', 'blog');
    await fs.ensureDir(postsDir);

    const postPath = path.join(postsDir, `${slug}.md`);
    await fs.writeFile(postPath, updatedContent);
    console.log(`   ✓ Blog post saved: ${postPath}`);

    console.log('\n✨ Blog post generation complete!');
    console.log(`   Title: ${title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Path: ${postPath}`);

    return {
      success: true,
      slug,
      title,
      path: postPath
    };
    
  } catch (error) {
    console.error('Error in complete blog post generation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run if called directly
if (require.main === module) {
  generateCompleteBlogPost()
    .then(result => {
      if (result.success) {
        console.log('\nBlog post generated successfully!');
        process.exit(0);
      } else {
        console.error('\nFailed to generate blog post:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\nUnexpected error:', error);
      process.exit(1);
    });
}

module.exports = { generateCompleteBlogPost };