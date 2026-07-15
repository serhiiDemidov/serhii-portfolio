import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// GET — fetch single experience
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const experience = await prisma.experience.findUnique({ where: { id } });
        if (!experience) {
            return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
        }
        return NextResponse.json(experience);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
    }
}

// PUT — update experience
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const body = await request.json();
        const experience = await prisma.experience.update({
            where: { id },
            data: {
                ...body,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : null,
            },
        });
        revalidateTag('experiences', { expire: 0 });
        return NextResponse.json(experience);
    } catch {
        return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
    }
}

// DELETE — remove experience
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        await prisma.experience.delete({ where: { id } });
        revalidateTag('experiences', { expire: 0 });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }
}
