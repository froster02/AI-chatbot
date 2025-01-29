// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());           // enable CORS
app.use(express.json());   // parse JSON request bodies

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// server.js (in backend)
app.post('/chat', (req, res) => {
    const { userQuery } = req.body;
    console.log("Received query:", userQuery);
    // For now, just respond with a test message
    res.json({ reply: `You said: ${userQuery}` });
});