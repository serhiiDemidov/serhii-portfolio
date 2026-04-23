import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET — fetch profile
export async function GET() {
    try {
        const profile = await prisma.profile.findFirst();
        return NextResponse.json(profile);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

// POST — create or update profile (upsert)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const existing = await prisma.profile.findFirst();

        const profile = existing
            ? await prisma.profile.update({
                  where: { id: existing.id },
                  data: body,
              })
            : await prisma.profile.create({ data: body });

        return NextResponse.json(profile);
    } catch {
        return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
    }
}
