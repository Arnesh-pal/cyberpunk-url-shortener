import React, { useState, useEffect } from 'react';
import api from '../api'; // <-- IMPORT our new api client

// Get the base URL directly from our api instance for the clickable links
const API_BASE_URL = api.defaults.baseURL;

function AdminPage() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUrls = async () => {
        try {
            const res = await api.get('/api/urls'); // <-- USE our api client
            setUrls(res.data);
        } catch (err) {
            setError('Failed to fetch URL data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
        const intervalId = setInterval(fetchUrls, 5000);
        return () => clearInterval(intervalId);
    }, []);

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
                            {/* V-- APPLY THE CHANGES HERE --V */}
                            <td className="truncate-url">
                                <a
                                    href={url.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={url.originalUrl}  // <-- ADD THIS: Shows full URL on hover
                                >
                                    {url.originalUrl}
                                </a>
                            </td>
                            {/* ^-- END OF CHANGES --^ */}

                            <td>
                                <a href={`${API_BASE_URL}/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
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