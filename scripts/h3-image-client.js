/**
 * Client for MiniMax-H3-Image on the DGX (replaced Qwen-Image-2.1-Turbo on 2026-11-18).
 *
 * The model runs inside the Comfy-H3 engine (~/Projects/Comfy-H3) behind its GPU gateway
 * (127.0.0.1:8190), the same one the video renders use. Each picture is rendered by the engine's
 * own client, `comfy_h3/image.py gen`, which waits while the gateway runs someone else's job,
 * then holds the GPU lease for the picture. Nothing is loaded or unloaded from here: the gateway
 * keeps the model warm for 10 minutes after a job, so the pictures of one post follow each other
 * without reloading it.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const GATEWAY_URL = (process.env.H3_GATEWAY_URL || 'http://127.0.0.1:8190').replace(/\/+$/, '');
const ENGINE_SCRIPT = process.env.H3_IMAGE_SCRIPT || '/home/mersoom-dgx/Projects/Comfy-H3/comfy_h3/image.py';
const PYTHON = process.env.H3_IMAGE_PYTHON || '/usr/bin/python3';
// How long one picture may wait for the GPU while a video render holds it. The cron gives the whole
// run 55 min (Hermes kills it at 60); a day the GPU stays busy is retried by the next slot.
const WAIT_LIMIT_MS = Number(process.env.H3_IMAGE_WAIT_LIMIT_MS || 35 * 60 * 1000);
// Waiting plus rendering; a picture renders in minutes once the gateway takes it.
const GENERATE_TIMEOUT_MS = WAIT_LIMIT_MS + 15 * 60 * 1000;

const children = new Set(); // engine clients still waiting or rendering

async function isHealthy() {
  if (!fs.existsSync(ENGINE_SCRIPT)) return false;
  try {
    const res = await fetch(`${GATEWAY_URL}/readyz`, { signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Run `fn` once the image engine is reachable. Kept for the callers' shape: there is no server to
 * bring up any more, the gateway takes each picture when the GPU is free.
 */
async function withImageServer(fn) {
  if (!(await isHealthy())) {
    throw new Error(`MiniMax-H3-Image is not reachable (gateway ${GATEWAY_URL}, engine ${ENGINE_SCRIPT})`);
  }
  console.log(`🖼️ MiniMax-H3-Image through the Comfy-H3 gateway at ${GATEWAY_URL}`);
  // A cancelled or timed-out run must not leave an engine client behind that submits a picture later.
  const onSignal = (signal) => {
    for (const child of children) child.kill('SIGTERM');
    process.exit(signal === 'SIGINT' ? 130 : 143);
  };
  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);
  try {
    return await fn();
  } finally {
    process.off('SIGINT', onSignal);
    process.off('SIGTERM', onSignal);
  }
}

function run(args, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(PYTHON, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    children.add(child);
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`MiniMax-H3-Image gave no picture within ${Math.round(timeoutMs / 60000)} min`));
    }, timeoutMs);
    child.on('error', (error) => { clearTimeout(timer); children.delete(child); reject(error); });
    child.on('close', (code) => {
      clearTimeout(timer);
      children.delete(child);
      if (code === 0) resolve(out);
      else reject(new Error(`MiniMax-H3-Image failed (exit ${code}): ${(err || out).trim().slice(-600)}`));
    });
  });
}

/**
 * Generate one image. Returns a PNG buffer of exactly width x height.
 */
async function generateImage({ prompt, width, height, seed }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'h3-image-'));
  try {
    const promptFile = path.join(dir, 'prompt.txt');
    const outFile = path.join(dir, 'out.png');
    fs.writeFileSync(promptFile, prompt, 'utf8');
    await run([
      ENGINE_SCRIPT, 'gen', outFile, promptFile,
      '--size', `${width}x${height}`,
      '--seed', String(seed),
      '--prefix', 'yesblog/picture',
      '--wait-limit', String(Math.round(WAIT_LIMIT_MS / 1000)),
    ], GENERATE_TIMEOUT_MS);
    return fs.readFileSync(outFile);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

module.exports = { withImageServer, generateImage, isHealthy, GATEWAY_URL, ENGINE_SCRIPT };
