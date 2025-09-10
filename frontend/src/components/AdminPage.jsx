import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';

function AdminPage() {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/api/urls');
                setUrls(response.data);
            } catch (err) {
                setError('Could not fetch URL data. Is the backend server running?');
                console.error('Error fetching URLs:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrls();
    }, []);

    const handleLinkClick = useCallback((shortCode) => {
        const fullUrl = `${api.defaults.baseURL}/${shortCode}`;
        window.open(fullUrl, '_blank', 'noopener,noreferrer');

        setUrls(prevUrls =>
            prevUrls.map(url =>
                url.shortCode === shortCode
                    ? { ...url, clicks: url.clicks + 1 }
                    : url
            )
        );
    }, []);

    if (isLoading) {
        return <div className="text-cyan-300 text-center">Loading data from the digital void...</div>;
    }

    if (error) {
        return <div className="text-red-400 text-center">{error}</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 uppercase tracking-wider mb-6 text-center font-orbitron" style={{ textShadow: '0 0 10px #00f6ff, 0 0 20px #00f6ff' }}>
                History
            </h1>
            <div className="overflow-x-auto bg-gray-900/50 border border-cyan-400/30 rounded-lg shadow-lg backdrop-blur-sm">
                <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-900 text-xs text-cyan-300 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Original URL</th>
                            <th scope="col" className="px-6 py-3">Short URL</th>
                            <th scope="col" className="px-6 py-3 text-center">Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url.shortCode} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200">
                                <td className="px-6 py-4 font-medium text-gray-400 truncate max-w-xs">{url.originalUrl}</td>
                                <td className="px-6 py-4">
                                    <a
                                        href={`${api.defaults.baseURL}/${url.shortCode}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(url.shortCode);
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-fuchsia-400 hover:underline font-mono"
                                    >
                                        {`${api.defaults.baseURL}/${url.shortCode}`}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-center font-mono text-lg">{url.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
