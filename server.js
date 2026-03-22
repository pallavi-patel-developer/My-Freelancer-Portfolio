require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './'))); // Serve static files from root

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Proxy to Web3Forms using the secure key from .env
        const response = await axios.post('https://api.web3forms.com/submit', {
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            from_name: "Pallavi Portfolio Mobile/Web",
            subject: "New Message from your Portfolio"
        });

        if (response.data.success) {
            return res.status(200).json({ success: true, message: "Email sent successfully!" });
        } else {
            return res.status(400).json({ success: false, message: response.data.message });
        }
    } catch (error) {
        console.error('Error forwarding message:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Server error! Please try again later." });
    }
});

// All other requests serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
