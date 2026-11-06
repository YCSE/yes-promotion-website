/**
 * Shared Claude (Anthropic API) setup for the blog generation scripts.
 * Credentials come from ANTHROPIC_API_KEY.
 */
const Anthropic = require('@anthropic-ai/sdk');

const WRITING_MODEL = 'claude-haiku-5-5';

let client;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  client ??= new Anthropic();
  return client;
}

/**
 * Return the text of a finished response, or throw when it was refused or cut off.
 * Content is read by block type: a Haiku 5.5 response can start with thinking blocks.
 */
function responseText(message) {
  if (message.stop_reason === 'refusal') {
    const category = message.stop_details?.category ?? 'unknown';
    throw new Error(`Claude declined the request (category: ${category})`);
  }
  if (message.stop_reason === 'max_tokens') {
    throw new Error('Claude response was cut off at max_tokens');
  }
  return message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');
}

module.exports = { getClient, responseText, WRITING_MODEL };
