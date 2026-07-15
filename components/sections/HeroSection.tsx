import type { Profile } from '@prisma/client';
import HeroBackground from '@/components/sections/HeroBackground';

interface HeroSectionProps {
    profile: Profile | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
            {/* Particle canvas */}
            <HeroBackground />

            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Glow */}
            <div className="absolute right-0 top-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 font-mono mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available for new projects
                </div>

                {/* Greeting */}
                <p className="font-mono text-blue-400 text-sm mb-3">{'// Hello, world 👋'}</p>

                {/* Name */}
                <h1 className="text-6xl md:text-8xl font-semibold text-white leading-none tracking-tight mb-4">
                    {profile?.name?.split(' ')[0] ?? 'Serhii'}
                    <br />
                    <span className="text-blue-500">
                        {profile?.name?.split(' ')[1] ?? 'Demidov'}
                    </span>
                </h1>

                {/* Role */}
                <p className="text-xl text-gray-400 font-light mb-6">
                    {profile?.title ?? 'Full-Stack Developer'}
                </p>

                {/* Bio */}
                <p className="text-gray-500 text-base max-w-lg leading-relaxed mb-10 font-light">
                    {profile?.bio ?? 'Building fast, clean, and scalable web applications.'}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4 flex-wrap">
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        View Projects →
                    </a>

                    <a
                        href="#contact"
                        className="px-6 py-3 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                    >
                        Get in touch
                    </a>
                    {profile?.cvUrl && (
                        <a
                            href={profile.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                        >
                            Download CV ↗
                        </a>
                    )}
                </div>

                {/* Social links */}
                {(profile?.githubUrl || profile?.linkedinUrl) && (
                    <div className="flex items-center gap-4 mt-8">
                        {profile?.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors"
                            >
                                GitHub ↗
                            </a>
                        )}
                        {profile?.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors"
                            >
                                LinkedIn ↗
                            </a>
                        )}
                        {profile?.telegramUrl && (
                            <a
                                href={profile.telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono text-gray-600 hover:text-gray-400 transition-colors"
                            >
                                Telegram ↗
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
