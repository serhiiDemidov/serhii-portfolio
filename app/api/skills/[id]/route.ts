import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const UpdateSchema = z.object({
    name: z.string().min(1).optional(),
    level: z.number().min(0).max(100).optional(),
    category: z.string().min(1).optional(),
    order: z.number().optional(),
});

// GET — fetch single skill
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const skill = await prisma.skill.findUnique({ where: { id } });
        if (!skill) {
            return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
        }
        return NextResponse.json(skill);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 });
    }
}

// PUT — update skill
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        const body = await request.json();
        const data = UpdateSchema.parse(body);
        const skill = await prisma.skill.update({
            where: { id },
            data,
        });
        return NextResponse.json(skill);
    } catch {
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
}

// DELETE — remove skill
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    const { id } = await params;
    try {
        await prisma.skill.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}
