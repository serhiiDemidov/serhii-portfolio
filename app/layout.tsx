import type { Metadata } from 'next';
import './globals.css';
import { getProfile } from '@/lib/data';
import CustomCursor from '@/components/ui/CustomCursor';

export async function generateMetadata(): Promise<Metadata> {
    const profile = await getProfile();
    const name = profile?.name ?? 'Serhii Demidov';
    const title = profile?.title ?? 'Full-Stack Developer';
    return {
        title: `${name} — ${title}`,
        description: profile?.bio ?? `Portfolio of ${name}`,
    };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#0c0c0f]">
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
