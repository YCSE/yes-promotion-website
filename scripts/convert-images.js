const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

async function convertWebPToJPG() {
  const imagesDir = path.join(process.cwd(), 'public/images/blog');
  const postsDir = path.join(process.cwd(), 'content/posts');
  
  console.log('🖼️  Converting WebP images to JPG...');
  
  // Get all WebP files
  const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.webp'));
  
  for (const file of files) {
    const webpPath = path.join(imagesDir, file);
    const jpgName = file.replace('.webp', '.jpg');
    const jpgPath = path.join(imagesDir, jpgName);
    
    try {
      // Convert WebP to JPG
      await sharp(webpPath)
        .jpeg({ quality: 90 })
        .toFile(jpgPath);
      
      console.log(`  ✅ Converted: ${file} → ${jpgName}`);
      
      // Delete the WebP file
      fs.unlinkSync(webpPath);
    } catch (error) {
      console.error(`  ❌ Failed to convert ${file}:`, error.message);
    }
  }
  
  console.log('\n📝 Updating post frontmatter...');
  
  // Update all markdown files to use .jpg instead of .webp
  const posts = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  for (const post of posts) {
    const postPath = path.join(postsDir, post);
    let content = fs.readFileSync(postPath, 'utf8');
    
    // Replace .webp with .jpg in featuredImage
    const updated = content.replace(
      /featuredImage:\s*\/images\/blog\/([^\.]+)\.webp/g,
      'featuredImage: /images/blog/$1.jpg'
    );
    
    if (content !== updated) {
      fs.writeFileSync(postPath, updated);
      console.log(`  ✅ Updated: ${post}`);
    }
  }
  
  console.log('\n✨ Conversion complete!');
}

// Run the conversion
convertWebPToJPG().catch(error => {
  console.error('Conversion failed:', error);
  process.exit(1);
});