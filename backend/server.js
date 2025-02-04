require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { userQuery } = req.body;
        const apiKey = process.env.TOGETHER_API_KEY;
        const cors = require('cors');
        app.use(cors());

        console.log('Sending request to Together.ai...');
        const response = await axios.post(
            'https://api.together.xyz/v1/chat/completions',
            {
                model: 'mistralai/Mistral-7B-Instruct-v0.1',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant. Provide clear and concise responses.'
                    },
                    { role: 'user', content: userQuery }
                ],
                temperature: 0.7,
                max_tokens: 512,
                top_p: 0.8
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data?.choices?.[0]?.message?.content) {
            throw new Error('Invalid response format from API');
        }

        const aiReply = response.data.choices[0].message.content.trim();
        res.json({ reply: aiReply });
    } catch (error) {
        console.error('Together.ai request failed:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        res.status(500).json({
            error: 'Error calling Together.ai API',
            details: error.response?.data || error.message
        });
    }
});

app.listen(5002, () => {
    console.log('Backend server running on port 5002');
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
