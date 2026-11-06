# 🤖 Automated Blog Post Generation Setup

This guide explains how to set up and use the automated English learning blog post generation feature.

## 🎯 Overview

The system automatically generates an English learning blog post every day using:
- **Claude Haiku 5.5** (`claude-haiku-5-5`, Anthropic API) for the post and the image prompts
- **Qwen-Image-2.1-Turbo**, a local model on the DGX (served by ModelSwitcher), for the images
- **GitHub Actions** for scheduled automation: generation on the DGX self-hosted runner, build and deploy on GitHub-hosted runners
- **Static site generation** with Next.js

## 🚀 Quick Start

### Step 1: Configure GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add the following secret:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** An API key from the [Claude Console](https://platform.claude.com/)

Or from a terminal: `gh secret set ANTHROPIC_API_KEY -R YCSE/yes-promotion-website`

### Step 2: Enable GitHub Actions

The workflow is already configured and will:
- Run automatically every day at 10:00 AM KST
- Can be triggered manually from Actions tab

The generation job needs the DGX runner `spark-yes-promotion-1` online (`systemctl --user status yes-promotion-ci-runner-1`) and ModelSwitcher running; it loads the image model itself and unloads it afterwards.

### Step 3: Manual Trigger (Optional)

To generate a post immediately:
1. Go to **Actions** tab in your GitHub repository
2. Select **"Generate Blog Post"** workflow
3. Click **"Run workflow"** button
4. Select `main` branch and click **"Run workflow"**

## 📁 Project Structure

```
yes-promotion-website/
├── app/blog/                 # Blog pages
│   ├── page.tsx             # Blog listing page
│   └── [slug]/page.tsx      # Individual post page
├── content/posts/           # Generated markdown posts
├── public/images/blog/      # Generated featured images
├── scripts/                 # Generation scripts
│   ├── generate-content.js  # Main orchestration
│   ├── generate-blog-post.js # Content generation
│   └── generate-blog-images.js  # Unified image generation (featured + H2)
└── .github/workflows/
    └── generate-blog-post.yml # GitHub Actions workflow
```

## 🛠️ Local Testing

### Prerequisites
```bash
npm install
```

### Test Content Generation
Run on the DGX (the image model is local to it):
```bash
# Check that both models are reachable
ANTHROPIC_API_KEY=your_api_key_here node scripts/test-api.js

# Generate a post
ANTHROPIC_API_KEY=your_api_key_here node scripts/generate-content.js
```

### View Generated Content
```bash
npm run dev
# Visit http://localhost:3000/blog
```

## 📝 Generated Content

### Blog Posts
- **Format:** Markdown with frontmatter
- **Language:** Korean with English examples
- **Target:** Korean English learners (beginner-intermediate)
- **Length:** 1500-2000 characters
- **Topics:** 20 pre-defined English learning topics

### Images
- **Model:** Qwen-Image-2.1-Turbo (local), prompts written by Claude Haiku 5.5
- **Images:** one featured image plus one per H2 section
- **Format:** JPEG, 1184x896px (about 4:3)
- **Fallback:** an SVG placeholder when an image fails twice

## 🎨 Customization

### Adding New Topics
Edit `scripts/generate-blog-post.js`:
```javascript
const TOPICS = [
  // Add your new topics here
  '새로운 주제',
  // ...
];
```

### Changing Schedule
Edit `.github/workflows/generate-blog-post.yml`:
```yaml
schedule:
  - cron: '0 0 */2 * *'  # Current: every 2 days
  # Examples:
  # - cron: '0 0 * * *'  # Daily
  # - cron: '0 0 * * 1'  # Weekly (Monday)
```

## 🔍 Monitoring

### Check Generation Status
1. Go to **Actions** tab
2. View **"Generate Blog Post"** workflow runs
3. Check logs for any errors

### Verify Deployment
After blog post generation:
1. The deploy workflow automatically triggers
2. Check your live site at the configured URL
3. New posts appear at `/blog`

## ⚠️ Important Notes

1. **API Key Security**
   - Never commit API keys to the repository
   - Always use GitHub Secrets for production

2. **Image Generation**
   - Runs only on the DGX: the generation job uses the self-hosted runner `spark-yes-promotion-1`
   - The repository is public, so fork workflow runs need approval for all outside contributors (Settings → Actions → General); keep it that way while the runner is registered
   - The image model is loaded through ModelSwitcher without unloading other models; if memory is short the job waits up to 30 minutes, then fails

3. **Content Quality**
   - Posts are generated in Korean for Korean learners
   - Includes practical English examples
   - Focuses on immediately applicable content

## 🆘 Troubleshooting

### Posts Not Appearing
1. Check GitHub Actions logs
2. Verify API key is correctly set
3. Ensure deploy workflow runs after generation
4. Check `/content/posts/` directory

### API Errors
1. Verify API key has proper permissions
2. Check API usage limits
3. Ensure billing is enabled (if using own key)

### Build Failures
1. Run `npm run build` locally to test
2. Check for TypeScript errors
3. Verify all dependencies are installed

## 📊 Success Metrics

The system will:
- ✅ Generate a new blog post every 2 days
- ✅ Create SEO-friendly content
- ✅ Automatically deploy to the website
- ✅ Maintain consistent quality
- ✅ Cover diverse English learning topics

## 🎉 Ready to Go!

Your automated blog generation system is now set up! The first post will be generated according to the schedule, or you can trigger it manually anytime.

---

For questions or issues, please check the [scripts README](scripts/README.md) or the GitHub Actions logs.