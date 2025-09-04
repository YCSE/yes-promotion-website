// Test script to verify Gemini API connection
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAPI() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.error('❌ GEMINI_API_KEY is not properly configured');
    console.log('Please set the GEMINI_API_KEY environment variable');
    process.exit(1);
  }
  
  console.log('🔑 API Key found (first 10 chars):', apiKey.substring(0, 10) + '...');
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('📡 Testing Gemini API connection...');
    
    const prompt = "Say 'Hello, YES English!' in Korean.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API connection successful!');
    console.log('📝 Test response:', text);
    
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('The API key appears to be invalid. Please check your key.');
    }
    return false;
  }
}

// Run test
testAPI().then(success => {
  if (success) {
    console.log('\n✨ API test completed successfully!');
    console.log('You can now run: node scripts/generate-content.js');
  } else {
    console.log('\n❌ API test failed. Please fix the issues above.');
  }
  process.exit(success ? 0 : 1);
});