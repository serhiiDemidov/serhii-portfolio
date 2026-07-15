import { auth } from '@/lib/auth';
import { getProfile, getPublishedProjects, getSkills, getExperiences } from '@/lib/data';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/sections/Navbar';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AnimateIn from '@/components/ui/AnimateIn';

export default async function HomePage() {
    const [session, profile, projects, skills, experiences] = await Promise.all([
        auth(),
        getProfile(),
        getPublishedProjects(),
        getSkills(),
        getExperiences(),
    ]);

    return (
        <main className="bg-[#0c0c0f] min-h-screen">
            <Navbar profile={profile} isAdmin={!!session} />
            <HeroSection profile={profile} />
            <AnimateIn><MarqueeSection skills={skills} /></AnimateIn>
            <AnimateIn><ProjectsSection projects={projects} /></AnimateIn>
            <AnimateIn><SkillsSection skills={skills} /></AnimateIn>
            <AnimateIn><ExperienceSection experiences={experiences} /></AnimateIn>
            <AnimateIn><ContactSection profile={profile} /></AnimateIn>
        </main>
    );
}
