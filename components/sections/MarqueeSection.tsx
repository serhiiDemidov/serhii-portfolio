import type { Skill } from '@prisma/client';

interface MarqueeSectionProps {
    skills: Skill[];
}

type SimpleIcon = { path: string; hex: string };

// Module-level cache — simple-icons is loaded once per server process
let iconsCache: Record<string, SimpleIcon | undefined> | null = null;

function getIconsCache(): Record<string, SimpleIcon | undefined> {
    if (!iconsCache) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        iconsCache = require('simple-icons') as Record<string, SimpleIcon | undefined>;
    }
    return iconsCache;
}

function getIcon(name: string): SimpleIcon | null {
    const key = `si${name
        .replace(/[\s.\-/]/g, '')
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())}`;
    return getIconsCache()[key] ?? null;
}

export default function MarqueeSection({ skills }: MarqueeSectionProps) {
    if (skills.length === 0) return null;

    const items = [...skills, ...skills];

    return (
        <div className="border-t border-b border-white/5 py-4 overflow-hidden">
            <div className="flex items-center">
                <div className="shrink-0 px-6 border-r border-white/5 mr-6">
                    <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">
                        Stack
                    </span>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="flex gap-3 w-max animate-marquee">
                        {items.map((skill, index) => {
                            const icon = getIcon(skill.name);
                            return (
                                <div
                                    key={`${skill.id}-${index}`}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg shrink-0 hover:border-white/10 transition-colors"
                                >
                                    {icon && (
                                        <svg
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="14"
                                            height="14"
                                            fill={`#${icon.hex}`}
                                            style={{ opacity: 0.8 }}
                                        >
                                            <path d={icon.path} />
                                        </svg>
                                    )}
                                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap">
                                        {skill.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
