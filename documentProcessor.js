// utils/documentProcessor.js
const { TextAnalysisClient } = require('@azure/ai-text-analytics');
const pdf = require('pdf-parse');

async function analyzeDocument(file) {
  // Extract text
  const text = await extractTextFromFile(file);
  
  // AI Analysis
  const client = new TextAnalysisClient(
    process.env.AZURE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_KEY)
  );
  
  const actions = {
    keyPhrases: {},
    entities: {},
    sentiment: {},
    literaryAnalysis: {
      model: 'gpt-4',
      prompt: 'Analyze this text for literary elements, themes, and characters:'
    }
  };
  
  return await client.analyzeActions(text, actions);
}