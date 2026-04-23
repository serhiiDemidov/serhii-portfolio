import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">Projects</h1>
                        <p className="text-gray-500 text-sm mt-1">{projects.length} total</p>
                    </div>
                    <Link
                        href="/admin/projects/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                        + Add Project
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <div className="text-4xl mb-4">🚀</div>
                        <p>No projects yet</p>
                        <Link
                            href="/admin/projects/new"
                            className="text-blue-500 text-sm mt-2 inline-block"
                        >
                            Add first project →
                        </Link>
                    </div>
                ) : (
                    <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-white">{project.title}</span>
                                        {project.featured && (
                                            <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                        {project.published ? (
                                            <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded-full">
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                        {project.tags.join(' · ')}
                                    </div>
                                </div>
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="text-xs text-gray-500 hover:text-white transition-colors"
                                >
                                    Edit →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
