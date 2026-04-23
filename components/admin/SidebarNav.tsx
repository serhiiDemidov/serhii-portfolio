'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/skills', label: 'Skills' },
    { href: '/admin/experience', label: 'Experience' },
    { href: '/admin/profile', label: 'Profile' },
];

export default function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex-1 py-3 px-2 space-y-0.5">
            <p className="text-xs text-gray-600 uppercase tracking-widest px-3 py-2">Admin</p>
            {NAV_ITEMS.map((item) => {
                // For Dashboard use exact match, for others use startsWith
                const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
              flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
              ${
                  isActive
                      ? 'bg-white/5 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
                    >
                        {isActive && (
                            <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                        <span className={isActive ? '' : 'ml-3'}>{item.label}</span>
                    </Link>
                );
            })}
            <p className="text-xs text-gray-600 uppercase tracking-widest px-3 py-2 mt-2">Site</p>

            <a
                href="/"
                target="_blank"
                className="flex items-center gap-2.5 px-3 py-2 ml-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
                View site ↗
            </a>
        </nav>
    );
}
