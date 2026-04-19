import { getTools, getInsights, getExperiences, getFeaturedProjects, getAwards } from '@/lib/queries';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ToolkitSection from '@/components/sections/ToolkitSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AwardsSection from '@/components/sections/AwardsSection';
import ContactSection from '@/components/sections/ContactSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import type { Metadata } from 'next';

export const revalidate = 3600; // Caching Frontend: revalidate every 1 hour (ISR)

export const metadata: Metadata = {
  title: 'Miftahudin Akbar | Computational Finance Professional',
  description: 'Bridging the gap between complex financial systems and data-driven intelligence.',
  openGraph: {
    title: 'Miftahudin Akbar | Computational Finance Professional',
    description: 'Transforming raw market signals into actionable financial strategies.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://heymiftah.my.id',
    siteName: 'Miftahudin Akbar',
    images: [
      {
        url: '/portrait.webp',
        width: 1200,
        height: 630,
        alt: 'Miftahudin Akbar Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function Home() {
  const latestInsights = await getInsights(3);
  const tools = await getTools(50);
  const experiences = await getExperiences(10);
  const featuredProjects = await getFeaturedProjects(3);
  const awards = await getAwards(10);
  
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <InsightsSection insights={latestInsights} />
      <ToolkitSection tools={tools} />
      <ExperienceSection experiences={experiences} />
      <AwardsSection awards={awards} />
      {featuredProjects && featuredProjects.length > 0 && <ProjectsSection projects={featuredProjects} />}
      <ContactSection />
    </main>
  );
}

