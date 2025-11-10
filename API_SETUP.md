# AI Pattern Generator - API Setup Guide

## Connect to ChatGPT API

To make your CrochetBuddy actually generate real AI patterns, you need to connect it to OpenAI's API.

### Step 1: Get Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy and save it securely

### Step 2: Update the JavaScript

Replace the mock `generateCrochetPattern` function in `js/main.js` with this real API call:

```javascript
async function generateCrochetPattern(request) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual key
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: 'You are an expert crochet pattern designer. Create detailed, accurate crochet patterns in HTML format with proper materials list, abbreviations, step-by-step instructions, and helpful tips.'
            }, {
                role: 'user',
                content: `Create a detailed crochet pattern for: ${request}`
            }],
            temperature: 0.7,
            max_tokens: 2000
        })
    });
    
    const data = await response.json();
    const patternContent = data.choices[0].message.content;
    
    return {
        title: `Custom Pattern: ${capitalize(request)}`,
        content: patternContent
    };
}
```

### Step 3: Security Best Practices

**⚠️ IMPORTANT: Never expose your API key in client-side code!**

For production, you should:

1. **Create a backend server** (Node.js, Python, etc.) to handle API calls
2. Store API key in environment variables
3. Make requests from your backend, not directly from the browser

### Option A: Simple Backend (Node.js/Express)

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/generate-pattern', async (req, res) => {
    try {
        const { request } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert crochet pattern designer...'
                },
                {
                    role: 'user',
                    content: `Create a detailed crochet pattern for: ${request}`
                }
            ]
        });
        
        res.json({
            title: `Custom Pattern: ${request}`,
            content: completion.choices[0].message.content
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate pattern' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Then update your frontend to call your backend:

```javascript
async function generateCrochetPattern(request) {
    const response = await fetch('http://localhost:3000/api/generate-pattern', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ request })
    });
    
    return await response.json();
}
```

### Option B: Serverless Function (Netlify/Vercel)

Create `netlify/functions/generate-pattern.js`:

```javascript
const OpenAI = require('openai');

exports.handler = async (event) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const { request } = JSON.parse(event.body);
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: 'You are an expert crochet pattern designer...'
            },
            {
                role: 'user',
                content: `Create a detailed crochet pattern for: ${request}`
            }
        ]
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            title: `Custom Pattern: ${request}`,
            content: completion.choices[0].message.content
        })
    };
};
```

### Cost Estimates

- GPT-4: ~$0.03 per pattern (1000 tokens)
- GPT-3.5-turbo: ~$0.002 per pattern (much cheaper!)

Start with GPT-3.5-turbo for testing, upgrade to GPT-4 for better quality.

### Alternative: Use Free AI

If you want to start free, you can use:

1. **Hugging Face Inference API** (limited free tier)
2. **Google Gemini API** (free tier available)
3. **Claude API** (Anthropic)

## For Development/Testing

The current mock pattern generator works fine for testing the UI. It will generate a basic template pattern instantly without any API calls.

## Next Steps

1. Choose your API provider
2. Set up backend or serverless functions
3. Add environment variables for API keys
4. Test pattern generation
5. Add rate limiting to prevent abuse
6. Consider adding user accounts to track usage

## Questions?

Check out:
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Vercel Serverless](https://vercel.com/docs/functions)
