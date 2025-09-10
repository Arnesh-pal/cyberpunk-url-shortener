import React, { useState } from 'react';
import UrlForm from './components/UrlForm.jsx';
import AdminPage from './components/AdminPage.jsx';
import { AnimatedBackground, HomeIcon, AdminIcon } from './components/Shared.jsx';

// A small component for our navigation buttons
const NavLink = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${active
            ? 'bg-cyan-500/20 text-cyan-300 shadow-[inset_0_0_10px_rgba(0,246,255,0.3)]'
            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
    >
        {children}
    </button>
);

export default function App() {
    const [page, setPage] = useState('home');

    return (
        <>
            <AnimatedBackground />
            <div className="relative min-h-screen flex flex-col items-center p-4 font-sans text-white z-10 overflow-x-hidden">
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center flex-grow">
                    <header className="w-full flex justify-center my-8">
                        <nav className="flex space-x-4 p-2 bg-gray-900/50 border border-cyan-400/30 rounded-lg backdrop-blur-sm">
                            <NavLink active={page === 'home'} onClick={() => setPage('home')}>
                                <HomeIcon className="w-5 h-5" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink active={page === 'admin'} onClick={() => setPage('admin')}>
                                <AdminIcon className="w-5 h-5" />
                                <span>Admin</span>
                            </NavLink>
                        </nav>
                    </header>
                    <main className="w-full flex-grow flex items-center justify-center">
                        {page === 'home' && <UrlForm />}
                        {page === 'admin' && <AdminPage />}
                    </main>
                </div>
                <footer className="w-full text-center text-gray-500 text-xs py-4">
                    <p>Designed by <a href="https://arneshpal000.netlify.app/" target="_blank">Arnesh Pal</a></p>

                </footer>
            </div>
        </>
    );
}