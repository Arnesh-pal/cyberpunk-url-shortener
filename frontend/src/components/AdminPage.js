import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUrls = async () => {
        try {
            // We set loading to false only after the first fetch
            // subsequent fetches will happen in the background.
            const res = await axios.get('http://localhost:5001/api/urls');
            setUrls(res.data);
        } catch (err) {
            setError('Failed to fetch URL data.');
            console.error(err);
        } finally {
            // Ensure loading is set to false after the first fetch
            setLoading(false);
        }
    };

    useEffect(() => {
        // --- NEW: Polling Logic ---

        // 1. Fetch the data immediately when the component loads.
        fetchUrls();

        // 2. Set up an interval to fetch the data every 5 seconds.
        const intervalId = setInterval(fetchUrls, 5000); // 5000 milliseconds = 5 seconds

        // 3. This is a crucial cleanup function.
        //    React runs this when the component is unmounted (e.g., you navigate to another page).
        //    It stops the interval so it doesn't keep running in the background forever.
        return () => clearInterval(intervalId);

    }, []); // The empty array [] means this effect runs only once when the component mounts.

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="admin-container">
            <h2>Admin - All Shortened URLs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.shortCode}>
                            <td>
                                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {url.originalUrl}
                                </a>
                            </td>
                            <td>
                                <a href={`http://localhost:5001/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                                    {url.shortCode}
                                </a>
                            </td>
                            <td>{url.clicks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;