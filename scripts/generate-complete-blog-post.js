const { generateBlogPost } = require('./generate-blog-post');
const { generateFeaturedImage } = require('./generate-featured-image');
const { processH2Images } = require('./generate-h2-images');
const fs = require('fs-extra');
const path = require('path');

async function generateCompleteBlogPost() {
  try {
    console.log('Starting complete blog post generation...');
    
    // Step 1: Generate blog post content
    console.log('\n1. Generating blog post content...');
    const { slug, content, title } = await generateBlogPost();
    console.log(`   ✓ Generated post: "${title}"`);
    
    // Extract the first 2-3 paragraphs from the content for featured image
    // Skip the frontmatter and get the actual content
    const contentLines = content.split('\n');
    let actualContent = '';
    let foundEnd = false;
    let dashCount = 0;
    
    for (const line of contentLines) {
      if (line === '---') {
        dashCount++;
        if (dashCount === 2) {
          foundEnd = true;
          continue;
        }
      }
      if (foundEnd && line.trim()) {
        actualContent += line + '\n';
      }
    }
    
    // Get first 2-3 paragraphs for content excerpt
    const paragraphs = actualContent.trim().split(/\n\n+/);
    const contentExcerpt = paragraphs.slice(0, 3).join('\n\n').substring(0, 1000);
    console.log(`   ✓ Extracted ${contentExcerpt.length} chars of content for featured image`);
    
    // Step 2: Generate featured image (photorealistic) with content excerpt
    console.log('\n2. Generating featured image...');
    const featuredImagePath = await generateFeaturedImage(title, slug, contentExcerpt);
    console.log(`   ✓ Featured image: ${featuredImagePath}`);
    
    // Step 3: Process H2 images (photorealistic) - already handles content extraction internally
    console.log('\n3. Processing H2 section images...');
    const contentWithImages = await processH2Images(content, slug);
    console.log('   ✓ H2 images processed');
    
    // Step 4: Save the blog post
    console.log('\n4. Saving blog post...');
    const postsDir = path.join(process.cwd(), 'content', 'blog');
    await fs.ensureDir(postsDir);
    
    const postPath = path.join(postsDir, `${slug}.md`);
    await fs.writeFile(postPath, contentWithImages);
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