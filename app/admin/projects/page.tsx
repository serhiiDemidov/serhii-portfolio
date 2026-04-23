import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
    });

    return (
        <div className="min-h-screen bg-[#0c0c0f] p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/admin" className="text-gray-500 text-sm hover:text-gray-300">
                            ← Dashboard
                        </Link>
                        <h1 className="text-2xl font-semibold text-white mt-1">Проекты</h1>
                    </div>
                    <Link
                        href="/admin/projects/new"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                        + Add projects
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
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-4 bg-[#111116] border border-white/10 rounded-xl"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium">
                                            {project.title}
                                        </span>
                                        {project.featured && (
                                            <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                        {project.published ? (
                                            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-xs px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded-full">
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="text-sm text-gray-400 hover:text-white transition-colors"
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
