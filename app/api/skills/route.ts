import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const SkillSchema = z.object({
    name: z.string().min(1),
    level: z.number().min(0).max(100),
    category: z.string().min(1),
    order: z.number().default(0),
});

// GET — fetch all skills
export async function GET() {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const skills = await prisma.skill.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(skills);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

// POST — create skill
export async function POST(request: Request) {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    try {
        const body = await request.json();
        const data = SkillSchema.parse(body);
        const skill = await prisma.skill.create({ data });
        return NextResponse.json(skill, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }
}
