# Blog Content Generation Scripts

This directory contains scripts for automatically generating blog content using Google's Gemini AI.

## Scripts

### generate-content.js
Main orchestration script that generates both blog post and featured image.

### generate-blog-post.js
Generates English learning blog posts using Gemini 2.5 Flash model.

### generate-featured-image.js
Generates featured images for blog posts using Imagen (with fallback to placeholder).

## Setup

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create or sign in to your Google account
3. Generate an API key

### 2. Configure Environment

#### For Local Testing:
```bash
# Create .env file
cp .env.example .env

# Add your API key to .env
GEMINI_API_KEY=your_api_key_here
```

#### For GitHub Actions:
1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add secret:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key

## Usage

### Manual Generation (Local)
```bash
# Generate a new blog post
GEMINI_API_KEY=your_api_key_here node scripts/generate-content.js

# Or with .env file
node scripts/generate-content.js
```

### Automatic Generation
The GitHub Actions workflow runs automatically:
- **Schedule**: Every 2 days at 9:00 AM KST
- **Manual**: Go to Actions tab → Generate Blog Post → Run workflow

## Generated Content

- **Blog posts**: Saved to `/content/posts/[date]-[slug].md`
- **Images**: Saved to `/public/images/blog/[slug].webp`
- **Format**: Markdown with frontmatter
- **Language**: Korean with English examples

## Topics

The script randomly selects from 20 predefined English learning topics including:
- Daily conversation
- Business English
- Travel phrases
- Pronunciation tips
- Grammar lessons
- Test preparation (TOEIC/TOEFL)
- And more...

## Troubleshooting

### API Key Issues
- Ensure the API key is correctly set in GitHub Secrets
- Check API key has proper permissions
- Verify billing is enabled on your Google Cloud account

### Image Generation
- If Imagen fails, a placeholder image is automatically created
- Images are optimized to WebP format for better performance

### Content Not Appearing
- Check GitHub Actions logs for errors
- Verify the deploy workflow runs after content generation
- Ensure the site rebuilds after new content is added

## Security Notes

⚠️ **Never commit your API key to the repository!**
- Always use environment variables or GitHub Secrets
- The `.env` file is gitignored for safety
- API keys in code will be rejected by GitHub