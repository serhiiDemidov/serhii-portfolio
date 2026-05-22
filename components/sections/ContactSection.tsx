import type { Profile } from '@prisma/client';

interface ContactSectionProps {
    profile: Profile | null;
}

export default function ContactSection({ profile }: ContactSectionProps) {
    return (
        <section id="contact" className="py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="max-w-xl">
                    <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-3">
                        Contact
                    </p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight mb-4">
                        Let's build
                        <br />
                        <span className="text-blue-500">something</span> together
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-10">
                        Open to interesting projects, collaborations, or just a good tech
                        conversation. Response time: usually within 24 hours.
                    </p>

                    {/* Links */}
                    <div className="space-y-3">
                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                className="flex items-center justify-between p-4 bg-[#111116] border border-white/5 rounded-xl hover:border-white/10 hover:translate-x-1 transition-all group"
                            >
                                <div>
                                    <div className="text-xs text-gray-600 font-mono mb-0.5">
                                        Email
                                    </div>
                                    <div className="text-sm text-white">{profile.email}</div>
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                                    →
                                </span>
                            </a>
                        )}
                        {profile?.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-[#111116] border border-white/5 rounded-xl hover:border-white/10 hover:translate-x-1 transition-all group"
                            >
                                <div>
                                    <div className="text-xs text-gray-600 font-mono mb-0.5">
                                        GitHub
                                    </div>
                                    <div className="text-sm text-white">{profile.githubUrl}</div>
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                                    →
                                </span>
                            </a>
                        )}
                        {profile?.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-[#111116] border border-white/5 rounded-xl hover:border-white/10 hover:translate-x-1 transition-all group"
                            >
                                <div>
                                    <div className="text-xs text-gray-600 font-mono mb-0.5">
                                        LinkedIn
                                    </div>
                                    <div className="text-sm text-white">{profile.linkedinUrl}</div>
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                                    →
                                </span>
                            </a>
                        )}
                        {profile?.telegramUrl && (
                            <a
                                href={profile.telegramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-[#111116] border border-white/5 rounded-xl hover:border-white/10 hover:translate-x-1 transition-all group"
                            >
                                <div>
                                    <div className="text-xs text-gray-600 font-mono mb-0.5">
                                        Telegram
                                    </div>
                                    <div className="text-sm text-white">{profile.telegramUrl}</div>
                                </div>
                                <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                                    →
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
                <span className="font-mono text-xs text-gray-600">
                    © {new Date().getFullYear()} {profile?.name ?? 'Serhii Demidov'}
                </span>
                <span className="font-mono text-xs text-gray-600">
                    Built with Next.js & PostgreSQL
                </span>
            </div>
        </section>
    );
}
