import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const UpdateSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    longDesc: z.string().optional(),
    imageUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    order: z.number().optional(),
});

// GET — fetch single project
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const project = await prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

// PUT — update project
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const body = await request.json();
        const data = UpdateSchema.parse(body);
        const project = await prisma.project.update({
            where: { id },
            data,
        });
        revalidateTag('projects', { expire: 0 });
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

// DELETE — remove project
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        await prisma.project.delete({
            where: { id },
        });
        revalidateTag('projects', { expire: 0 });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
