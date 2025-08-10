console.log('--- Starting server.js ---');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Use nanoid v3 by requiring it this way
const { nanoid } = require('nanoid');

// This line is VERY important. It must be before any 'process.env' usage.
require('dotenv').config();
console.log('.env file loaded.');

const Url = require('./models/url');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
console.log('Middleware configured.');

// Simple request logger middleware to see if ANY request comes in
app.use((req, res, next) => {
    console.log(`--> [${new Date().toLocaleTimeString()}] Received ${req.method} request for ${req.url}`);
    next(); // This is crucial, it passes the request to the next function
});


// --- Database Connection ---
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // This will only run if the connection is successful
        console.log('✅ MongoDB connected successfully.');

        // We moved app.listen INSIDE the .then() block
        // This ensures the server only starts after the database is ready.
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    })
    .catch(err => {
        // This will run if the connection fails
        console.error('❌ MongoDB connection error: Could not connect.');
        console.error('Error Details:', err.message);
        process.exit(1); // Exit the script with an error code
    });


// --- API Routes ---
// The server will only handle requests after the DB connection is successful

// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            res.json({ shortUrl: `${baseUrl}/${url.shortCode}` });
        } else {
            const shortCode = nanoid(7);
            const newUrl = new Url({ originalUrl, shortCode });
            await newUrl.save();
            res.json({ shortUrl: `${baseUrl}/${newUrl.shortCode}` });
        }
    } catch (err) {
        console.error('Server error on POST /api/shorten:', err);
        res.status(500).json({ error: 'Server error while creating short URL.' });
    }
});

// GET /:shortCode
app.get('/:shortCode', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });
        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: 'No URL found' });
        }
    } catch (err) {
        console.error(`Server error on GET /:shortCode for code ${req.params.shortCode}:`, err);
        res.status(500).json({ error: 'Server error while redirecting.' });
    }
});

// GET /api/urls
app.get('/api/urls', async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (err) {
        console.error('Server error on GET /api/urls:', err);
        res.status(500).json({ error: 'Server error while fetching URLs.' });
    }
});