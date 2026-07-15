import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const ExperienceSchema = z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    description: z.string().min(1),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    current: z.boolean().default(false),
    order: z.number().default(0),
});

// GET — fetch all experience
export async function GET() {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(experiences);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
    }
}

// POST — create experience
export async function POST(request: Request) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const body = await request.json();
        const data = ExperienceSchema.parse(body);
        const experience = await prisma.experience.create({
            data: {
                ...data,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
            },
        });
        revalidateTag('experiences', { expire: 0 });
        return NextResponse.json(experience, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }
}
