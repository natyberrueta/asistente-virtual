const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/getResponse', async (req, res) => {
    const userQuery = req.body.query;
    
    // Reemplaza con tu propia API key de OpenAI
    const apiKey = 'YOUR_OPENAI_API_KEY';
    
    const apiResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: userQuery,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5
        })
    }).then(response => response.json());

    const answer = apiResponse.choices[0].text.trim();

    res.json({ answer: answer || 'Lo siento, no tengo una respuesta para eso.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

