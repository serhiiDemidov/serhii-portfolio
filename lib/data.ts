import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getProfile = unstable_cache(() => prisma.profile.findFirst(), ['profile'], {
    tags: ['profile'],
    revalidate: 3600,
});

export const getPublishedProjects = unstable_cache(
    () =>
        prisma.project.findMany({
            where: { published: true },
            orderBy: { order: 'asc' },
        }),
    ['published-projects'],
    { tags: ['projects'], revalidate: 3600 },
);

export const getSkills = unstable_cache(
    () => prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    ['skills'],
    { tags: ['skills'], revalidate: 3600 },
);

export const getExperiences = unstable_cache(
    () => prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    ['experiences'],
    { tags: ['experiences'], revalidate: 3600 },
);

export const getPublishedProject = unstable_cache(
    (id: string) => prisma.project.findUnique({ where: { id } }),
    ['published-project'],
    { tags: ['projects'], revalidate: 3600 },
);
