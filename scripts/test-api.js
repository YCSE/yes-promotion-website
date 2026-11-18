// Checks both models the blog generator uses:
// - the model selected in Hermes (writing), through `hermes -z`
// - MiniMax-H3-Image (images) behind the Comfy-H3 GPU gateway, checked without rendering
const { generate, WRITING_MODEL } = require('./hermes-client');
const { isHealthy, GATEWAY_URL, ENGINE_SCRIPT } = require('./h3-image-client');

async function testWritingModel() {
  try {
    console.log(`📡 Testing ${WRITING_MODEL}...`);
    const answer = await generate({ prompt: "Say 'Hello, 익스!' in Korean, in one short line.", reasoning: 'low' });
    console.log(`✅ Writing model OK (${answer.model}, ${answer.provider}):`, answer.text.trim());
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
