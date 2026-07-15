import type { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL;
    const projects = await getPublishedProjects();

    return [
        {
            url: baseUrl!,
            lastModified: new Date(),
            priority: 1,
        },
        ...projects.map((project) => ({
            url: `${baseUrl}/projects/${project.id}`,
            lastModified: project.updatedAt,
            priority: 0.7,
        })),
    ];
}
