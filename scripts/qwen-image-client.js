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
// After ModelSwitcher accepts the load, the server always gets at least this long to come up.
const READY_MIN_MS = 10 * 60 * 1000;
// Node's built-in fetch gives up on response headers after 5 min anyway, so larger values have no effect.
const GENERATE_TIMEOUT_MS = Number(process.env.QWEN_IMAGE_GENERATE_TIMEOUT_MS || 5 * 60 * 1000);
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
 * True when ModelSwitcher already has the model as a load target (someone else
 * is bringing it up or using it), so this process must neither load nor unload it.
 */
async function isLoadTarget() {
  try {
    const res = await fetch(`${SWITCHER_URL}/api/state`, { signal: AbortSignal.timeout(10 * 1000) });
    const state = await res.json();
    return state.models?.[SWITCHER_MODEL_ID]?.target === true;
  } catch {
    return false;
  }
}

/**
 * Ask ModelSwitcher to load the model. Never makes room by unloading other
 * models: when memory is short (409 with a `fit`) it keeps retrying until the
 * deadline. Returns false when the model turned out to be a load target already.
 */
async function requestLoad(deadline) {
  for (;;) {
    let result;
    try {
      result = await switcherAction('load');
    } catch (error) {
      throw new Error(`ModelSwitcher (${SWITCHER_URL}) unreachable: ${error.message}`);
    }
    // ModelSwitcher answers 200 with a `note` when the model was already a load target.
    if (result.status === 200) return !result.body.note;
    // Only memory shortages carry a `fit`; other 409s (e.g. disabled in the catalog) do not clear by waiting.
    if (result.status === 409 && result.body.fit && Date.now() < deadline) {
      console.warn(`⏳ ModelSwitcher cannot load ${SWITCHER_MODEL_ID} yet: ${result.body.error || 'busy'} — retrying in 60s`);
      await sleep(60 * 1000);
      continue;
    }
    throw new Error(`ModelSwitcher load failed (${result.status}): ${result.body.error || JSON.stringify(result.body)}`);
  }
}

/**
 * Wait until the server answers /health. With `reload`, a model that
 * ModelSwitcher dropped as a load target (it gives up on a start that finds no
 * memory for 5 minutes) is requested again, so a long memory shortage is
 * waited out instead of polling a server that will never come up.
 */
async function waitUntilReady(deadline, { reload = false } = {}) {
  console.log(`⏳ Waiting for ${SWITCHER_MODEL_ID} to become ready...`);
  while (Date.now() < deadline) {
    if (await isHealthy()) return;
    if (reload && !(await isLoadTarget()) && !(await isHealthy())) {
      console.warn(`⚠️ ModelSwitcher dropped ${SWITCHER_MODEL_ID} (start failed) — requesting the load again`);
      await requestLoad(deadline);
    }
    await sleep(10 * 1000);
  }
  throw new Error(`${SWITCHER_MODEL_ID} did not become ready in time`);
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
 * Make sure the image server is up for the duration of `fn`. A model this
 * process loaded is unloaded afterwards, also when the job is cancelled or
 * times out (SIGINT/SIGTERM).
 */
async function withImageServer(fn) {
  if (await isHealthy()) {
    console.log(`🖼️ Qwen image server already running at ${IMAGE_BASE_URL}`);
    return fn();
  }

  const deadline = Date.now() + LOAD_TIMEOUT_MS;
  if (await isLoadTarget()) {
    console.log(`🖼️ ${SWITCHER_MODEL_ID} is already being loaded by ModelSwitcher; not loading or unloading it here`);
    await waitUntilReady(deadline);
    return fn();
  }

  console.log(`🖼️ Loading ${SWITCHER_MODEL_ID} via ModelSwitcher...`);
  let loadedHere = true;
  let exiting = false;
  const onSignal = (signal) => {
    if (exiting) return;
    exiting = true;
    console.warn(`⚠️ ${signal} received`);
    const code = signal === 'SIGINT' ? 130 : 143;
    (loadedHere ? unloadModel() : Promise.resolve()).finally(() => process.exit(code));
  };
  process.on('SIGINT', onSignal);
  process.on('SIGTERM', onSignal);

  try {
    loadedHere = await requestLoad(deadline);
    // A load that only went through near the deadline still gets time to come up.
    await waitUntilReady(Math.max(deadline, Date.now() + READY_MIN_MS), { reload: loadedHere });
    console.log(`✅ Qwen image server ready at ${IMAGE_BASE_URL}`);
    return await fn();
  } finally {
    process.off('SIGINT', onSignal);
    process.off('SIGTERM', onSignal);
    if (loadedHere) await unloadModel();
  }
}

/**
 * Generate one image. Returns a PNG buffer.
 */
async function generateImage({ prompt, width, height, seed }) {
  const res = await fetch(`${IMAGE_BASE_URL}/images/generations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
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

module.exports = { withImageServer, generateImage, isHealthy, IMAGE_BASE_URL, SWITCHER_URL, SWITCHER_MODEL_ID };
