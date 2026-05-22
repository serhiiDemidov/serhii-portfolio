'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@prisma/client';

interface NavbarProps {
    profile: Profile | null;
    isAdmin: boolean;
}

const NAV_LINKS = ['Projects', 'Skills', 'Experience', 'Contact'] as const;

export default function Navbar({ profile, isAdmin }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled || menuOpen
                        ? 'bg-[#0c0c0f]/95 backdrop-blur-md'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="font-mono text-sm text-blue-400">
                        {profile?.name?.toLowerCase().replace(' ', '.') ?? 'dev.portfolio'}
                    </span>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                        {isAdmin && (
                            <a
                                href="/admin"
                                className="text-sm px-3 py-1 rounded-md bg-blue-600/15 text-blue-400 hover:bg-blue-600/25 hover:text-blue-300 transition-colors font-mono"
                            >
                                dashboard →
                            </a>
                        )}
                    </div>

                    {/* Burger button (mobile) */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <span
                            className={`block h-px w-5 bg-gray-400 transition-all duration-300 origin-center ${
                                menuOpen ? 'rotate-45 translate-y-1.75' : ''
                            }`}
                        />
                        <span
                            className={`block h-px w-5 bg-gray-400 transition-all duration-300 ${
                                menuOpen ? 'opacity-0 scale-x-0' : ''
                            }`}
                        />
                        <span
                            className={`block h-px w-5 bg-gray-400 transition-all duration-300 origin-center ${
                                menuOpen ? '-rotate-45 -translate-y-1.75' : ''
                            }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-[#0c0c0f] flex flex-col pt-20 px-6 transition-all duration-300 md:hidden ${
                    menuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                <div
                    className={`flex flex-col gap-1 transition-all duration-300 ${
                        menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                    }`}
                >
                    {NAV_LINKS.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={closeMenu}
                            className="py-4 text-2xl font-medium text-gray-300 hover:text-white border-b border-white/5 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    {isAdmin && (
                        <a
                            href="/admin"
                            onClick={closeMenu}
                            className="py-4 text-2xl font-medium text-blue-400 hover:text-blue-300 border-b border-white/5 transition-colors font-mono"
                        >
                            dashboard →
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
