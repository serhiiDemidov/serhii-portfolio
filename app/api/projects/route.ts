import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for project creation
const ProjectSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    longDesc: z.string().optional(),
    imageUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    order: z.number().default(0),
});

// GET — fetch all projects
export async function GET() {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(projects);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

// POST — create new project
export async function POST(request: Request) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const body = await request.json();
        const data = ProjectSchema.parse(body);
        const project = await prisma.project.create({ data });
        return NextResponse.json(project, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
