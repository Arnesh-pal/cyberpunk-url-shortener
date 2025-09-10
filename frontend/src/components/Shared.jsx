import React from 'react';

// --- SVG ICONS ---
export const LinkIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);
export const ClipboardIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);
export const CheckIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
export const AdminIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);
export const HomeIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

// --- FUTURISTIC FOX MASCOT SVG ---
export const FoxMascot = () => (
    <div className="relative mb-8 group">
        <svg width="150" height="150" viewBox="0 0 200 200" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="fox-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff00c1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00f6ff', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#glow)" className="transition-transform duration-500 group-hover:scale-110">
                <path d="M100 20 L40 90 L70 120 L100 100 L130 120 L160 90 Z" fill="url(#fox-gradient)" />
                <path d="M40 90 L20 60 L50 70 Z" fill="url(#fox-gradient)" />
                <path d="M160 90 L180 60 L150 70 Z" fill="url(#fox-gradient)" />
                <path d="M100 100 L90 125 L110 125 Z" fill="#ffffff" />
            </g>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-500 rounded-full blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
);


// --- BACKGROUND ANIMATION COMPONENT ---
export const AnimatedBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full bg-[#0d0221] overflow-hidden -z-10">
        <div className="absolute w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e0a7533,transparent)]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse translate-x-1/2 -translate-y-1/2"></div>
    </div>
);
