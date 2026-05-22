import type { Experience } from '@prisma/client';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
    return (
        <section id="experience" className="py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-3">
                        Career
                    </p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight">Experience</h2>
                </div>

                {experiences.length === 0 ? (
                    <div className="text-center py-20 text-gray-600">No experience yet</div>
                ) : (
                    <div className="space-y-0">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`flex gap-8 py-8 ${
                                    index !== experiences.length - 1
                                        ? 'border-b border-white/5'
                                        : ''
                                }`}
                            >
                                {/* Period */}
                                <div className="w-32 shrink-0">
                                    <span className="font-mono text-xs text-gray-600">
                                        {new Date(exp.startDate).getFullYear()} —{' '}
                                        {exp.current
                                            ? 'Present'
                                            : exp.endDate
                                              ? new Date(exp.endDate).getFullYear()
                                              : ''}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-medium">{exp.role}</h3>
                                        {exp.current && (
                                            <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-blue-400 text-sm mb-3">{exp.company}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
