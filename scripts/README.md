# Blog Content Generation Scripts

These scripts generate the daily English-learning blog posts.

- **Writing**: Claude Haiku 5.5 (`claude-haiku-5-5`) through the Anthropic API
- **Images**: Qwen-Image-2.1-Turbo, a local model on the DGX, served by ModelSwitcher

## Scripts

### generate-content.js
Main orchestration script: loads the image model, writes the post, generates its images, and saves the post to `content/posts/`.

### generate-blog-post.js
Writes the post (markdown with frontmatter and `[IMAGE_PLACEHOLDER_H2_n]` markers) with Claude Haiku 5.5.

### generate-blog-images.js
Generates the featured image and one image per H2 section. Claude Haiku 5.5 writes the image prompts (one shared style line plus a scene per image, following the people and no-text rules), and the local Qwen-Image model renders them as 1184x896 JPEGs. A failed image falls back to an SVG placeholder.

### qwen-image-client.js
Talks to the local image server. If it is not running, asks ModelSwitcher (`127.0.0.1:18090`) to load `qwen-qwen-image-2-1-turbo`, waits until it is ready, and unloads it afterwards. It never unloads other models to make room; when memory is short it retries for up to 30 minutes.

### claude-client.js
Shared Anthropic client, model ID and response checks (refusal, truncation).

### test-api.js
Checks that both models are reachable: `node scripts/test-api.js`.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | (required) | Anthropic API key for Claude |
| `QWEN_IMAGE_BASE_URL` | `http://127.0.0.1:8000/v1` | Qwen image server |
| `MODELSWITCHER_URL` | `http://127.0.0.1:18090` | ModelSwitcher daemon |
| `QWEN_IMAGE_MODEL_ID` | `qwen-qwen-image-2-1-turbo` | ModelSwitcher catalog ID |
| `QWEN_IMAGE_LOAD_TIMEOUT_MS` | 30 min | How long to wait for the model to load |

## Usage

### Manual generation (on the DGX)
```bash
ANTHROPIC_API_KEY=your_api_key_here node scripts/generate-content.js
```

### Automatic generation
`.github/workflows/generate-blog-post.yml` runs every day at 10:00 KST (and from Actions → Generate Blog Post → Run workflow):

1. `generate` runs on the DGX's self-hosted runner `spark-yes-promotion-1` (label `yes-promotion`, systemd user service `yes-promotion-ci-runner-1`), because the image model only exists there. It commits the post and images to `main`.
2. `build-and-deploy` builds the site on `ubuntu-latest` and deploys it to GitHub Pages.

The workflow reads the `ANTHROPIC_API_KEY` repository secret.

## Generated Content

- **Blog posts**: `content/posts/[date]-[slug]-[n].md`
- **Images**: `public/images/blog/[slug].jpg` and `[slug]-h2-[n].jpg`
- **Language**: Korean with English examples

## Troubleshooting

- **`ANTHROPIC_API_KEY is not set`**: add the repository secret (`gh secret set ANTHROPIC_API_KEY -R YCSE/yes-promotion-website`).
- **`Claude declined the request`**: Haiku 5.5 has no server-side fallback; rerun the workflow, which picks a new topic.
- **Image model does not load**: check `modelswitcher status`; another model may be using the memory.
- **Job stays queued**: check the runner with `systemctl --user status yes-promotion-ci-runner-1`.

## Security Notes

- Never commit API keys; use environment variables or GitHub Secrets.
- The repository is public and has a self-hosted runner, so workflow runs from forks require approval for all outside contributors (Settings → Actions → General).
