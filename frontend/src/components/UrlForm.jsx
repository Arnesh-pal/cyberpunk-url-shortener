import React, { useState, useCallback } from 'react';
import api from '../api.js'; // Corrected import path
import { LinkIcon, ClipboardIcon, CheckIcon, FoxMascot } from './Shared'; // Corrected import path

function UrlForm() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setIsCopied(false);

        if (!originalUrl) {
            setError('Please enter a URL to shorten.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/api/shorten', { originalUrl });
            setShortUrl(response.data.shortUrl);
        } catch (err) {
            setError('Failed to shorten URL. Check the console and make sure the backend is running.');
            console.error('Error from frontend:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = useCallback(() => {
        const textArea = document.createElement('textarea');
        textArea.value = shortUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }, [shortUrl]);


    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            <FoxMascot />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 uppercase tracking-wider mb-2 font-orbitron" style={{ textShadow: '0 0 10px #ff00c1, 0 0 20px #ff00c1' }}>
                URL Shortener
            </h1>
            <p className="text-cyan-300 mb-8 text-lg">Condense the web. One link at a time.</p>

            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-4 w-full">
                <div className="relative w-full">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                        type="url"
                        placeholder="Enter a long URL to digitize..."
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border-2 border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all duration-300"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-fuchsia-600 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(255,0,193,0.5)] hover:bg-fuchsia-700 hover:shadow-[0_0_25px_rgba(255,0,193,0.8)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-fuchsia-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                            <span>Shortening...</span>
                        </>
                    ) : (
                        "Shorten"
                    )}
                </button>
            </form>

            {error && <p className="mt-4 text-red-400 text-sm animate-pulse">{error}</p>}

            {shortUrl && (
                <div className="mt-8 p-4 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-left animate-fade-in-up">
                    <p className="text-sm text-cyan-300 mb-2">Your condensed link:</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-mono text-fuchsia-400 break-all hover:underline">
                            {shortUrl}
                        </a>
                        <button
                            onClick={handleCopy}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm bg-cyan-600/50 border border-cyan-400 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-300"
                        >
                            {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UrlForm;

