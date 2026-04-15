import { getTools, getInsights, getExperiences } from '@/lib/queries';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ToolkitSection from '@/components/sections/ToolkitSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import type { Metadata } from 'next';

export const revalidate = 3600; // Caching Frontend: revalidate every 1 hour (ISR)

export const metadata: Metadata = {
  title: 'Miftahudin Akbar | Computational Finance Professional',
  description: 'Bridging the gap between complex financial systems and data-driven intelligence.',
  openGraph: {
    title: 'Miftahudin Akbar | Computational Finance Professional',
    description: 'Transforming raw market signals into actionable financial strategies.',
    url: 'https://miftahudinakbar.com',
    siteName: 'Miftahudin Akbar',
    images: [
      {
        url: '/portrait.png', // Or a dedicated OG image
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
  
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <InsightsSection insights={latestInsights} />
      <ToolkitSection tools={tools} />
      <ExperienceSection experiences={experiences} />
      <ContactSection />
    </main>
  );
}

