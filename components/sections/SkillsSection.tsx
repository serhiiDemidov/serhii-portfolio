import type { Skill } from '@prisma/client';

interface SkillsSectionProps {
    skills: Skill[];
}

function groupByCategory(skills: Skill[]) {
    return skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, Skill[]>
    );
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    const grouped = groupByCategory(skills);

    return (
        <section id="skills" className="py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-3">
                        Expertise
                    </p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight">Skills</h2>
                </div>

                {skills.length === 0 ? (
                    <div className="text-center py-20 text-gray-600">No skills yet</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(grouped).map(([category, items]) => (
                            <div
                                key={category}
                                className="bg-[#111116] border border-white/5 rounded-xl p-5"
                            >
                                <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
                                    {category}
                                </h3>
                                <div className="space-y-3">
                                    {items.map((skill) => (
                                        <div key={skill.id}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-gray-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-xs text-gray-600 font-mono">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
