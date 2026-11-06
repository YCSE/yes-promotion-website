/**
 * Client for the local Qwen-Image-2.1-Turbo server on the DGX.
 *
 * The model is served by ModelSwitcher's diffusers runtime (catalog id
 * `qwen-qwen-image-2-1-turbo`) at an OpenAI-style /v1 base. It is normally
 * stopped; `withImageServer()` asks ModelSwitcher to load it, runs the work,
 * and unloads it again — only if this process was the one that loaded it.
 */

const IMAGE_BASE_URL = (process.env.QWEN_IMAGE_BASE_URL || 'http://127.0.0.1:8000/v1').replace(/\/+$/, '');
const SWITCHER_URL = (process.env.MODELSWITCHER_URL || 'http://127.0.0.1:18090').replace(/\/+$/, '');
const SWITCHER_MODEL_ID = process.env.QWEN_IMAGE_MODEL_ID || 'qwen-qwen-image-2-1-turbo';
const LOAD_TIMEOUT_MS = Number(process.env.QWEN_IMAGE_LOAD_TIMEOUT_MS || 30 * 60 * 1000);
const GENERATE_TIMEOUT_MS = Number(process.env.QWEN_IMAGE_GENERATE_TIMEOUT_MS || 10 * 60 * 1000);
const ACTOR = 'yes-promotion-blog';

const SERVER_ROOT = IMAGE_BASE_URL.replace(/\/v1$/, '');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isHealthy() {
  try {
    const res = await fetch(`${SERVER_ROOT}/health`, { signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function switcherAction(action) {
  const res = await fetch(`${SWITCHER_URL}/api/models/${SWITCHER_MODEL_ID}/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-ModelSwitcher': '1' },
    body: JSON.stringify({ by: ACTOR }),
    signal: AbortSignal.timeout(60 * 1000),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

/**
 * Load the model through ModelSwitcher and wait until the server answers.
 * Never makes room by unloading other models: when memory is short (409) it
 * keeps retrying until LOAD_TIMEOUT_MS runs out.
 */
async function loadModel() {
  const deadline = Date.now() + LOAD_TIMEOUT_MS;

  for (;;) {
    let result;
    try {
      result = await switcherAction('load');
    } catch (error) {
      throw new Error(`ModelSwitcher (${SWITCHER_URL}) unreachable: ${error.message}`);
    }
    if (result.status === 200) break;
    if (result.status === 409 && Date.now() < deadline) {
      console.warn(`⏳ ModelSwitcher cannot load ${SWITCHER_MODEL_ID} yet: ${result.body.error || 'busy'} — retrying in 60s`);
      await sleep(60 * 1000);
      continue;
    }
    throw new Error(`ModelSwitcher load failed (${result.status}): ${result.body.error || JSON.stringify(result.body)}`);
  }

  console.log(`⏳ Waiting for ${SWITCHER_MODEL_ID} to become ready...`);
  while (Date.now() < deadline) {
    if (await isHealthy()) return;
    await sleep(10 * 1000);
  }
  throw new Error(`${SWITCHER_MODEL_ID} did not become ready within ${Math.round(LOAD_TIMEOUT_MS / 60000)} min`);
}

async function unloadModel() {
  try {
    const result = await switcherAction('unload');
    if (result.status === 200) {
      console.log(`🧹 Unloaded ${SWITCHER_MODEL_ID}`);
    } else {
      console.warn(`⚠️ Unload of ${SWITCHER_MODEL_ID} returned ${result.status}: ${result.body.error || ''}`);
    }
  } catch (error) {
    console.warn(`⚠️ Unload of ${SWITCHER_MODEL_ID} failed: ${error.message}`);
  }
}

/**
 * Make sure the image server is up for the duration of `fn`.
 */
async function withImageServer(fn) {
  let loadedHere = false;
  if (await isHealthy()) {
    console.log(`🖼️ Qwen image server already running at ${IMAGE_BASE_URL}`);
  } else {
    console.log(`🖼️ Loading ${SWITCHER_MODEL_ID} via ModelSwitcher...`);
    loadedHere = true;
    try {
      await loadModel();
    } catch (error) {
      await unloadModel();
      throw error;
    }
    console.log(`✅ Qwen image server ready at ${IMAGE_BASE_URL}`);
  }

  try {
    return await fn();
  } finally {
    if (loadedHere) await unloadModel();
  }
}

/**
 * Generate one image. Returns a PNG buffer.
 */
async function generateImage({ prompt, negativePrompt, width, height, seed }) {
  const res = await fetch(`${IMAGE_BASE_URL}/images/generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
      size: `${width}x${height}`,
      seed,
      n: 1,
      response_format: 'b64_json',
    }),
    signal: AbortSignal.timeout(GENERATE_TIMEOUT_MS),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Qwen image server ${res.status}: ${body.error?.message || JSON.stringify(body)}`);
  }
  const b64 = body.data?.[0]?.b64_json;
  if (!b64) throw new Error('Qwen image server returned no image');
  return Buffer.from(b64, 'base64');
}

module.exports = { withImageServer, generateImage, isHealthy, IMAGE_BASE_URL, SWITCHER_MODEL_ID };
