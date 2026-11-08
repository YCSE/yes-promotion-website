# Blog Content Generation Scripts

These scripts generate the daily English-learning blog posts.

- **Writing**: Claude Haiku 5.5 (`claude-haiku-5-5`) through the Anthropic API
- **Images**: Qwen-Image-2.1-Turbo, a local model on the DGX, served by ModelSwitcher

## Scripts

### generate-content.js
Main orchestration script: loads the image model, writes the post, generates its images, and saves the post to `content/posts/`.

### generate-blog-post.js
Writes the post (markdown with frontmatter) with Claude Haiku 5.5, then puts an `[IMAGE_PLACEHOLDER_H2_n]` marker under each of the first four H2 headings. The markers are placed in code because the model does not place them reliably.

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
| `QWEN_IMAGE_LOAD_TIMEOUT_MS` | 30 min (cron: 60 min) | How long to wait for the model to load; if ModelSwitcher gives up on a start (no memory for 5 min) the load is requested again until then. Once a load is accepted, the server gets at least 10 more min to come up |
| `QWEN_IMAGE_GENERATE_TIMEOUT_MS` | 5 min | Per-image request timeout (Node's fetch caps it at 5 min) |

## Usage

### Manual generation (on the DGX)
```bash
ANTHROPIC_API_KEY=your_api_key_here node scripts/generate-content.js
```

### Automatic generation
A Hermes cron job on the DGX (`hermes cron list`, "YES 블로그 자동 생성") runs at 10:00, 14:00 and 18:00 KST:

1. `~/.hermes/scripts/yes_blog_daily.sh` execs `scripts/cron/daily-blog.sh` from the cron's own clone `~/.cache/yes-blog-cron/repo`.
2. The script resets that clone to `origin/main`; if today's post is already there it exits (so the later slots are retries).
3. It runs `generate-content.js` with `ANTHROPIC_API_KEY` from `~/.hermes/.env`, commits the post and images as YCSE and pushes to `main`.
4. The push triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

Logs: `~/.cache/yes-blog-cron/logs/`. Dry run: `scripts/cron/daily-blog.sh --no-push`.

## Generated Content

- **Blog posts**: `content/posts/[date]-[slug]-[n].md`
- **Images**: `public/images/blog/[slug].jpg` and `[slug]-h2-[n].jpg`
- **Language**: Korean with English examples

## Troubleshooting

- **`ANTHROPIC_API_KEY is not set`**: add it to `~/.hermes/.env` on the DGX.
- **`Claude declined the request`**: Haiku 5.5 has no server-side fallback; the next cron slot (or a manual run) picks a new topic.
- **Image model does not load**: check `modelswitcher status`; another model may be using the memory.
- **Cron did not run**: `hermes cron status`, `hermes cron runs <job id>`.

## Security Notes

- Never commit API keys; the cron reads `ANTHROPIC_API_KEY` from `~/.hermes/.env`.
