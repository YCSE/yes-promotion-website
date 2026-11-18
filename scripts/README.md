# Blog Content Generation Scripts

These scripts generate the daily English-learning blog posts.

- **Writing**: the model selected in Hermes on the DGX (`hermes model`), one `hermes -z` turn per call
- **Images**: MiniMax-H3-Image, a local model on the DGX, rendered by the Comfy-H3 engine behind its GPU gateway (`127.0.0.1:8190`)

## Scripts

### generate-content.js
Main orchestration script: loads the image model, writes the post, generates its images, and saves the post to `content/posts/`.

### generate-blog-post.js
Writes the post (markdown with frontmatter) with the model selected in Hermes, then puts an `[IMAGE_PLACEHOLDER_H2_n]` marker under each of the first four H2 headings. The markers are placed in code because the model does not place them reliably.

### generate-blog-images.js
Generates the featured image and one image per H2 section. The same model writes the image prompts (one shared style line plus a scene per image, following the people and no-text rules), and the local MiniMax-H3-Image model renders them (at about 4 MP, scaled to 1184x896) as JPEGs. A failed image falls back to an SVG placeholder.

### h3-image-client.js
Renders each picture with the Comfy-H3 engine's own client (`~/Projects/Comfy-H3/comfy_h3/image.py gen`), which waits while the GPU gateway runs another job (an H3 video render), then holds the GPU lease for the picture. Nothing is loaded or unloaded from here; the gateway keeps the model warm for 10 minutes after a job, so the pictures of one post follow each other. A cancelled run (SIGINT/SIGTERM) stops the clients still waiting.

### hermes-client.js
Runs one turn on the model selected in Hermes: `hermes -z <prompt> -t "" --reasoning <level> --ignore-rules`, from an empty folder so this repository's rule files stay out of the prompt. It reads the model, provider and success from Hermes's usage file and fails the run on an unfinished turn.

### lint-posts.js
Linter for the posts in `content/posts`. The model writes the frontmatter as free text and can break it (a missing colon made a post show up as "Untitled" at the top of the blog), so structure is checked here rather than trusted:

- `npm run lint:posts` checks every post; `npm run lint:posts -- --fix` repairs what can be repaired (broken frontmatter, leftover image markers).
- The generator runs it with `--fix` on each post it writes and does not save a post that still has a problem.
- `npm run build` runs it first (`prebuild`), so a broken post stops the build and the deploy.

Rules: `frontmatter-yaml`, `frontmatter-title`, `frontmatter-date`, `body-empty`, `image-marker`, `image-missing`. Tests: `npm test`.

### test-api.js
Checks that both models are reachable: `node scripts/test-api.js`.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `HERMES_BIN` | `~/.local/bin/hermes` | Hermes CLI that writes the post |
| `HERMES_TURN_TIMEOUT_MS` | 20 min | Longest one writing turn may take |
| `H3_GATEWAY_URL` | `http://127.0.0.1:8190` | Comfy-H3 GPU gateway (checked by `isHealthy`) |
| `H3_IMAGE_SCRIPT` | `/home/mersoom-dgx/Projects/Comfy-H3/comfy_h3/image.py` | The engine's picture client |
| `H3_IMAGE_PYTHON` | `/usr/bin/python3` | Python that runs it |
| `H3_IMAGE_WAIT_LIMIT_MS` | 35 min | How long one picture waits for the GPU while another job holds it (the cron run has 55 min in all) |

## Usage

### Manual generation (on the DGX)
```bash
node scripts/generate-content.js
```

### Automatic generation
A Hermes cron job on the DGX (`hermes cron list`, "YES 블로그 자동 생성") runs at 10:00, 14:00 and 18:00 KST:

1. `~/.hermes/scripts/yes_blog_daily.sh` execs `scripts/cron/daily-blog.sh` from the cron's own clone `~/.cache/yes-blog-cron/repo`.
2. The script resets that clone to `origin/main`; if today's post is already there it exits (so the later slots are retries).
3. It runs `generate-content.js` (writing through Hermes's selected model), commits the post and images as YCSE and pushes to `main`.
4. The push triggers `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

Logs: `~/.cache/yes-blog-cron/logs/`. Dry run: `scripts/cron/daily-blog.sh --no-push`.

## Generated Content

- **Blog posts**: `content/posts/[date]-[slug]-[n].md`
- **Images**: `public/images/blog/[slug].jpg` and `[slug]-h2-[n].jpg`
- **Language**: Korean with English examples

## Troubleshooting

- **`Hermes turn failed`**: check `hermes status` and the selected model (`hermes model`); the next cron slot retries.
- **Image model does not load**: check `modelswitcher status`; another model may be using the memory.
- **Cron did not run**: `hermes cron status`, `hermes cron runs <job id>`.

## Security Notes

- No API key lives in this repository or the cron: the writing model uses Hermes's own credentials.
