import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/sections/Navbar';
import MarqueeSection from '@/components/sections/MarqueeSection';

export default async function HomePage() {
    const [session, profile, projects, skills, experiences] = await Promise.all([
        auth(),
        prisma.profile.findFirst(),
        prisma.project.findMany({
            where: { published: true },
            orderBy: { order: 'asc' },
        }),
        prisma.skill.findMany({
            orderBy: { order: 'asc' },
        }),
        prisma.experience.findMany({
            orderBy: { order: 'asc' },
        }),
    ]);

    return (
        <main className="bg-[#0c0c0f] min-h-screen">
            <Navbar profile={profile} isAdmin={!!session} />
            <HeroSection profile={profile} />
            <MarqueeSection skills={skills} />
            <ProjectsSection projects={projects} />
            <SkillsSection skills={skills} />
            <ExperienceSection experiences={experiences} />
            <ContactSection profile={profile} />
        </main>
    );
}
