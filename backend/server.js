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
// --- NEW CODE for Vercel ---
// Connect to the database right away
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Export the Express app for Vercel to use
module.exports = app;


// --- API Routes ---
// The server will only handle requests after the DB connection is successful

// ROOT ROUTE - For confirming the server is live
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Cyberpunk URL Shortener API!' });
});

// HEALTH CHECK ROUTE - For Uptime Robot
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});


// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    // Make sure BASE_URL is set in your Render environment variables
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
