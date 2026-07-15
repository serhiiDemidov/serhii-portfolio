import type { Project } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectsSectionProps {
    projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section id="projects" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <p className="font-mono text-xs text-blue-400 tracking-widest uppercase mb-3">
                        Selected Work
                    </p>
                    <h2 className="text-4xl font-semibold text-white tracking-tight">Projects</h2>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-600">No projects yet</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`relative group bg-[#111116] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all duration-300 cursor-pointer ${
                                    index === 0 ? 'md:col-span-2' : ''
                                }`}
                            >
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="absolute inset-0 z-1"
                                    aria-label={`View ${project.title}`}
                                />
                                {/* Image */}
                                {project.imageUrl ? (
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={project.imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#111116] to-transparent" />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-linear-to-br from-blue-600/10 to-purple-600/10 flex items-center justify-center">
                                        <span className="text-4xl opacity-20">🚀</span>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-white font-medium text-lg mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="relative z-10 flex items-center gap-4">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-mono"
                                            >
                                                Live demo ↗
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-gray-500 hover:text-gray-400 transition-colors font-mono"
                                            >
                                                GitHub ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
