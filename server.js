// server.js
const express = require('express');
const { OpenAI } = require('openai');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Document Upload Endpoint
app.post('/api/upload', async (req, res) => {
  const { file } = req;
  const text = await extractTextFromFile(file);
  
  const analysis = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Analyze this document for literary elements:' },
      { role: 'user', content: text }
    ]
  });
  
  res.json({ analysis: analysis.choices[0].message.content });
});

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const context = await getChatContext(req.query.userId);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a literature expert helping students. Context:' + context },
      { role: 'user', content: req.body.question }
    ]
  });
  
  res.json({ answer: response.choices[0].message.content });
});