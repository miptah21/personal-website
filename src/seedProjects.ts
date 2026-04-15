import { getPayload } from 'payload';
import configPromise from './payload.config';
import { projects } from './lib/projectsData';

async function seedProjects() {
  const payload = await getPayload({ config: configPromise });

  console.log('Seeding projects...');
  let orderIndex = 0;
  for (const p of projects) {
    try {
      const formattedTags = p.tags.map((tag) => ({ tag }));
      await payload.create({
        collection: 'projects',
        data: {
          title: p.title,
          description: p.description,
          category: p.category,
          year: p.year,
          coverGradient: p.coverGradient,
          tags: formattedTags,
          liveUrl: p.liveUrl || undefined,
          githubUrl: p.githubUrl || undefined,
          featured: p.featured,
          order: orderIndex++,
        },
      });
      console.log(`Successfully inserted: ${p.title}`);
    } catch (error) {
      console.error(`Failed to insert ${p.title}:`, error);
    }
  }

  console.log('Seeding complete! You can now safely delete src/lib/projectsData.ts');
  process.exit(0);
}

seedProjects();
