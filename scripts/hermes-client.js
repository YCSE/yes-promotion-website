/**
 * The writing model: whatever model is selected in Hermes on the DGX (`hermes model`).
 *
 * The blog cron runs on Hermes's own cron, so the post and the image prompts use the same model and
 * credentials as Hermes itself: each call is one `hermes -z` turn with no tools. Hermes is run from an
 * empty folder with --ignore-rules, so this repository's CLAUDE.md and other rule files do not leak into
 * the prompt. The model and provider that answered are read back from Hermes's usage file.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const HERMES = process.env.HERMES_BIN || path.join(os.homedir(), '.local/bin/hermes');
const TURN_TIMEOUT_MS = Number(process.env.HERMES_TURN_TIMEOUT_MS || 20 * 60 * 1000);

// Shown in logs before the first answer names the real model.
const WRITING_MODEL = 'the model selected in Hermes';

function isAvailable() {
  return fs.existsSync(HERMES);
}

/**
 * One turn on the Hermes-selected model. Returns { text, model, provider, usage }.
 * reasoning: low | medium | high.
 */
function generate({ system, prompt, reasoning = 'medium' }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-turn-'));
  const usageFile = path.join(dir, 'usage.json');
  const message = system ? `${system}\n\n---\n\n${prompt}` : prompt;
  const args = ['-z', message, '-t', '', '--reasoning', reasoning, '--ignore-rules', '--usage-file', usageFile];
  return new Promise((resolve, reject) => {
    const child = spawn(HERMES, args, { cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    const timer = setTimeout(() => child.kill('SIGTERM'), TURN_TIMEOUT_MS);
    const done = (fn) => { clearTimeout(timer); fs.rmSync(dir, { recursive: true, force: true }); fn(); };
    child.on('error', (error) => done(() => reject(new Error(`Hermes could not start (${HERMES}): ${error.message}`))));
    child.on('close', (code, signal) => {
      let usage = {};
      try { usage = JSON.parse(fs.readFileSync(usageFile, 'utf8')); } catch { /* no usage file: failed early */ }
      done(() => {
        const text = out.trim();
        if (code !== 0 || usage.failed || usage.completed === false || !text) {
          const why = signal ? `stopped by ${signal}` : `exit ${code}`;
          reject(new Error(`Hermes turn failed (${why}, ${usage.turn_exit_reason || 'no usage'}): ${(err || out).trim().slice(-400)}`));
          return;
        }
        resolve({ text, model: usage.model || 'unknown', provider: usage.provider || 'unknown', usage });
      });
    });
  });
}

/** The first JSON object in a model answer (models sometimes wrap it in a fence or a sentence). */
function parseJsonObject(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('the model returned no JSON object');
  return JSON.parse(text.slice(start, end + 1));
}

module.exports = { generate, parseJsonObject, isAvailable, WRITING_MODEL, HERMES };
