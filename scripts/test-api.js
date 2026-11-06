// Checks both models the blog generator uses:
// - Claude Haiku 5.5 (writing) via ANTHROPIC_API_KEY
// - the local Qwen-Image-2.1-Turbo server (images), checked without loading it
const { getClient, responseText, WRITING_MODEL } = require('./claude-client');
const { isHealthy, IMAGE_BASE_URL, SWITCHER_MODEL_ID } = require('./qwen-image-client');

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
  const switcherUrl = process.env.MODELSWITCHER_URL || 'http://127.0.0.1:18090';
  if (await isHealthy()) {
    console.log(`✅ Image server is running at ${IMAGE_BASE_URL}`);
    return true;
  }
  try {
    const state = await fetch(`${switcherUrl}/api/state`, { signal: AbortSignal.timeout(10000) }).then((r) => r.json());
    const model = state.models?.[SWITCHER_MODEL_ID];
    if (!model) {
      console.error(`❌ ModelSwitcher has no model ${SWITCHER_MODEL_ID}`);
      return false;
    }
    console.log(`✅ Image model is registered in ModelSwitcher (state: ${model.state}); the generator loads it on demand`);
    return true;
  } catch (error) {
    console.error(`❌ Neither the image server nor ModelSwitcher (${switcherUrl}) answered: ${error.message}`);
    return false;
  }
}

(async () => {
  const writing = await testWritingModel();
  const image = await testImageServer();
  const success = writing && image;
  console.log(success ? '\n✨ Both models are reachable. You can now run: node scripts/generate-content.js'
    : '\n❌ Fix the issues above before generating.');
  process.exit(success ? 0 : 1);
})();
