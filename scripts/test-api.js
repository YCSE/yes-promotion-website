// Checks both models the blog generator uses:
// - Claude Haiku 5.5 (writing) via ANTHROPIC_API_KEY
// - MiniMax-H3-Image (images) behind the Comfy-H3 GPU gateway, checked without rendering
const { getClient, responseText, WRITING_MODEL } = require('./claude-client');
const { isHealthy, GATEWAY_URL, ENGINE_SCRIPT } = require('./h3-image-client');

async function testWritingModel() {
  try {
    console.log(`📡 Testing ${WRITING_MODEL}...`);
    const message = await getClient().messages.create({
      model: WRITING_MODEL,
      max_tokens: 1024,
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: "Say 'Hello, 익스!' in Korean, in one short line." }],
    });
    console.log('✅ Writing model OK:', responseText(message).trim());
    return true;
  } catch (error) {
    console.error('❌ Writing model failed:', error.message);
    return false;
  }
}

async function testImageServer() {
  if (await isHealthy()) {
    console.log(`✅ MiniMax-H3-Image is reachable: Comfy-H3 gateway ${GATEWAY_URL}, engine ${ENGINE_SCRIPT}`);
    return true;
  }
  console.error(`❌ MiniMax-H3-Image is not reachable (gateway ${GATEWAY_URL}, engine ${ENGINE_SCRIPT})`);
  return false;
}

(async () => {
  const writing = await testWritingModel();
  const image = await testImageServer();
  const success = writing && image;
  console.log(success ? '\n✨ Both models are reachable. You can now run: node scripts/generate-content.js'
    : '\n❌ Fix the issues above before generating.');
  process.exit(success ? 0 : 1);
})();
