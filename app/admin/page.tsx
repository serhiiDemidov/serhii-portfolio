import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboardPage() {
    const [totalProjects, publishedProjects, totalSkills, totalExperience] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { published: true } }),
        prisma.skill.count(),
        prisma.experience.count(),
    ]);

    const draftProjects = totalProjects - publishedProjects;

    const recentProjects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
    });

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Welcome back — here&apos;s what&apos;s going on
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#111116] border border-white/5 rounded-xl p-4">
                        <div className="text-2xl font-semibold text-white">{totalProjects}</div>
                        <div className="text-xs text-gray-500 mt-1">Total projects</div>
                        <div className="text-xs text-gray-600 mt-1">all time</div>
                    </div>
                    <div className="bg-[#111116] border border-white/5 rounded-xl p-4">
                        <div className="text-2xl font-semibold text-white">{publishedProjects}</div>
                        <div className="text-xs text-gray-500 mt-1">Published</div>
                        <div className="inline-block text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full mt-1">
                            live
                        </div>
                    </div>
                    <div className="bg-[#111116] border border-white/5 rounded-xl p-4">
                        <div className="text-2xl font-semibold text-white">{draftProjects}</div>
                        <div className="text-xs text-gray-500 mt-1">Drafts</div>
                        <div className="text-xs text-gray-600 mt-1">hidden</div>
                    </div>
                    <div className="bg-[#111116] border border-white/5 rounded-xl p-4">
                        <div className="text-2xl font-semibold text-white">{totalSkills}</div>
                        <div className="text-xs text-gray-500 mt-1">Skills</div>
                        <div className="text-xs text-gray-600 mt-1">{totalExperience} exp</div>
                    </div>
                </div>

                {/* Recent projects */}
                <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
                        <h2 className="text-sm font-medium text-white">Recent Projects</h2>
                        <Link
                            href="/admin/projects"
                            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>

                    {recentProjects.length === 0 ? (
                        <div className="px-5 py-8 text-center text-gray-600 text-sm">
                            No projects yet —{' '}
                            <Link
                                href="/admin/projects/new"
                                className="text-blue-500 hover:text-blue-400"
                            >
                                add your first one
                            </Link>
                        </div>
                    ) : (
                        recentProjects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-0"
                            >
                                <div>
                                    <div className="text-sm text-white">{project.title}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                        {project.tags.join(' · ')}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {project.published ? (
                                        <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                                            Published
                                        </span>
                                    ) : (
                                        <span className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded-full">
                                            Draft
                                        </span>
                                    )}
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="text-xs text-gray-500 hover:text-white transition-colors"
                                    >
                                        Edit →
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
