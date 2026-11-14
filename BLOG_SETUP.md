# 🤖 Automated Blog Post Generation Setup

This guide explains how to set up and use the automated English learning blog post generation feature.

## 🎯 Overview

The system automatically generates an English learning blog post every day using:
- **Claude Haiku 5.5** (`claude-haiku-5-5`, Anthropic API) for the post and the image prompts
- **Qwen-Image-2.1-Turbo**, a local model on the DGX (served by ModelSwitcher), for the images
- **Hermes cron** on the DGX for scheduled generation; the push to `main` triggers the GitHub Pages deploy workflow
- **Static site generation** with Next.js

## 🚀 Quick Start

### Step 1: API key

Put the key in `~/.hermes/.env` on the DGX (the cron script reads only this line):
```
ANTHROPIC_API_KEY=<key from the Claude Console>
```

### Step 2: Hermes cron job

`scripts/cron/daily-blog.sh` does one run: it syncs its own clone (`~/.cache/yes-blog-cron/repo`) to `origin/main`, generates the post, commits it and pushes. It is registered in Hermes through the stub `~/.hermes/scripts/yes_blog_daily.sh`:

```bash
hermes cron create "0 10,14,18 * * *" \
  --name "YES 블로그 자동 생성" \
  --script yes_blog_daily.sh --no-agent \
  --timezone Asia/Seoul --catch-up on \
  --deliver local --failure-deliver telegram
```

The 14:00 and 18:00 slots are retries: once today's post is on `origin/main`, a run exits without doing anything.

### Step 3: Manual run (Optional)

- `hermes cron run <job id>` — a normal run on the next scheduler tick
- `scripts/cron/daily-blog.sh --no-push` — generate in the cron clone without committing

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
│   └── cron/daily-blog.sh   # Hermes cron entry point
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
```bash
hermes cron edit <job id> --schedule "0 10,14,18 * * *"
```

## 🔍 Monitoring

### Check Generation Status
1. `hermes cron list` / `hermes cron runs <job id>`
2. Logs: `~/.cache/yes-blog-cron/logs/run-*.log`

### Verify Deployment
After blog post generation:
1. The deploy workflow automatically triggers
2. Check your live site at the configured URL
3. New posts appear at `/blog`

## ⚠️ Important Notes

1. **API Key Security**
   - Never commit API keys to the repository
   - The cron reads the key from `~/.hermes/.env`

2. **Image Generation**
   - Runs only on the DGX, where the image model lives
   - The image model is loaded through ModelSwitcher without unloading other models; if memory is short (e.g. an H3 render holds the GPU lease) the cron run waits up to 60 minutes, then fails and the next slot retries

3. **Content Quality**
   - Posts are generated in Korean for Korean learners
   - Includes practical English examples
   - Focuses on immediately applicable content

## 🆘 Troubleshooting

### Posts Not Appearing
1. Check `hermes cron runs <job id>` and the log in `~/.cache/yes-blog-cron/logs/`
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
- ✅ Generate a new blog post every day
- ✅ Create SEO-friendly content
- ✅ Automatically deploy to the website
- ✅ Maintain consistent quality
- ✅ Cover diverse English learning topics

## 🎉 Ready to Go!

Your automated blog generation system is now set up! The first post will be generated according to the schedule, or you can trigger it manually anytime.

---

For questions or issues, please check the [scripts README](scripts/README.md) or the GitHub Actions logs.