import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

async function getProject(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project || !project.published) return null;
    return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);
    if (!project) return { title: 'Project not found' };
    return {
        title: `${project.title} — Serhii Demidov`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);
    if (!project) notFound();

    return (
        <main className="bg-[#0c0c0f] min-h-screen">
            <nav className="border-b border-white/5">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <Link
                        href="/#projects"
                        className="text-sm text-gray-400 hover:text-white transition-colors font-mono"
                    >
                        ← back to projects
                    </Link>
                </div>
            </nav>

            <article className="max-w-3xl mx-auto px-6 py-12">
                {project.imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 mb-10">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                <h1 className="text-4xl font-semibold text-white tracking-tight mb-4">
                    {project.title}
                </h1>

                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    {project.description}
                </p>

                {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded font-mono"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {(project.liveUrl || project.githubUrl) && (
                    <div className="flex items-center gap-4 mb-10">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-mono"
                            >
                                Live demo ↗
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors font-mono"
                            >
                                GitHub ↗
                            </a>
                        )}
                    </div>
                )}

                {project.longDesc && (
                    <div className="border-t border-white/5 pt-8 text-gray-400 leading-relaxed whitespace-pre-wrap">
                        {project.longDesc}
                    </div>
                )}
            </article>
        </main>
    );
}
