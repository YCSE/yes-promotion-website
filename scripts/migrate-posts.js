const fs = require('fs-extra');
const path = require('path');

// Mapping of existing Korean titles to English slugs
const migrationMap = {
  '2025-09-04-영어가-술술-읽히는-마법-독해-고수가-되는-5가지-비밀': '2025-09-04-english-reading-comprehension-strategy',
  '2025-09-04-이제-자신감-up-한국인이-어려워하는-영어-발음-이렇게-정복하세요': '2025-09-04-english-pronunciation-korean-learners',
  '2025-09-04-영어-단어-이제-무작정-외우지-마세요-효율적인-암기-로드맵-공개': '2025-09-04-english-vocabulary-memorization',
  '2025-09-04-영어-단어-암기-더-이상-고통받지-마세요-똑똑하게-외우는-비법-대공개': '2025-09-04-smart-vocabulary-learning-tips',
  '2025-09-04-토익-토플-더-이상-두렵지-않아-초고속-고득점-전략-대공개': '2025-09-04-toeic-toefl-high-score-strategy'
};

async function migratePosts() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const imagesDir = path.join(process.cwd(), 'public/images/blog');

  console.log('📝 Starting blog post migration...');

  // Migrate markdown files
  for (const [oldName, newName] of Object.entries(migrationMap)) {
    const oldPath = path.join(postsDir, `${oldName}.md`);
    const newPath = path.join(postsDir, `${newName}.md`);

    if (fs.existsSync(oldPath)) {
      console.log(`  Renaming: ${oldName}.md → ${newName}.md`);
      
      // Read the content
      let content = fs.readFileSync(oldPath, 'utf8');
      
      // Update the featured image path in the frontmatter
      content = content.replace(
        /featuredImage:\s*\/images\/blog\/[^\.]+\.webp/,
        `featuredImage: /images/blog/${newName}.webp`
      );
      
      // Write to new file
      fs.writeFileSync(newPath, content);
      
      // Delete old file
      fs.unlinkSync(oldPath);
      
      console.log(`  ✅ Migrated: ${newName}.md`);
    }
  }

  // Migrate image files
  for (const [oldName, newName] of Object.entries(migrationMap)) {
    const oldImagePath = path.join(imagesDir, `${oldName}.webp`);
    const newImagePath = path.join(imagesDir, `${newName}.webp`);

    if (fs.existsSync(oldImagePath)) {
      console.log(`  Renaming: ${oldName}.webp → ${newName}.webp`);
      fs.renameSync(oldImagePath, newImagePath);
      console.log(`  ✅ Migrated: ${newName}.webp`);
    }
  }

  console.log('\n✨ Migration completed successfully!');
}

// Run the migration
migratePosts().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});