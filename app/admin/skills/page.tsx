import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Group skills by category
function groupByCategory(skills: Awaited<ReturnType<typeof prisma.skill.findMany>>) {
    return skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<string, typeof skills>
    );
}

export default async function AdminSkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { order: 'asc' },
    });
    const grouped = groupByCategory(skills);

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/admin" className="text-gray-500 text-sm hover:text-gray-300">
                            ← Dashboard
                        </Link>
                        <h1 className="text-2xl font-semibold text-white mt-1">Skills</h1>
                    </div>
                    <Link
                        href="/admin/skills/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                        + Add Skill
                    </Link>
                </div>

                {skills.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <div className="text-4xl mb-4">⚡</div>
                        <p>No skills yet</p>
                        <Link
                            href="/admin/skills/new"
                            className="text-blue-500 text-sm mt-2 inline-block"
                        >
                            Add first skill →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(grouped).map(([category, items]) => (
                            <div key={category}>
                                <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                                    {category}
                                </h2>
                                <div className="space-y-2">
                                    {items.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="flex items-center justify-between p-4 bg-[#111116] border border-white/10 rounded-xl"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <span className="text-white font-medium w-32">
                                                    {skill.name}
                                                </span>
                                                <div className="flex-1 max-w-xs">
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${skill.level}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-sm w-10">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <Link
                                                href={`/admin/skills/${skill.id}`}
                                                className="text-sm text-gray-400 hover:text-white transition-colors ml-4"
                                            >
                                                Edit →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
