import React, { useState } from 'react';
import api from '../api'; // <-- IMPORT our new api client

function UrlForm() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');

        if (!originalUrl) {
            setError('Please enter a URL to shorten.');
            return;
        }

        try {
            // Use our new 'api' instance. The path is relative.
            const res = await api.post('/api/shorten', { originalUrl }); // <-- USE our api client
            setShortUrl(res.data.shortUrl);
        } catch (err) {
            setError('Failed to shorten URL. Please try again.');
            console.error('Error from frontend:', err);
        }
    };

    return (
        <div className="form-container">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter a long URL..."
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <button type="submit">Shorten</button>
            </form>

            {error && <p className="error">{error}</p>}

            {shortUrl && (
                <div className="result">
                    <p>Shortened URL:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default UrlForm;