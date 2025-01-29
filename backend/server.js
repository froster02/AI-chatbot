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