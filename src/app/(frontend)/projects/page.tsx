import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../page.module.css';
import pageStyles from './page.module.css';
import { getAllProjects } from '@/lib/queries';
import type { ProjectDoc } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'The Laboratory | Miftahudin Akbar',
  description: 'A curated archive of computational finance projects spanning machine learning, data engineering, and quantitative research.',
  openGraph: {
    title: 'The Laboratory | Miftahudin Akbar',
    description: 'A curated archive of computational finance projects spanning machine learning, data engineering, and quantitative research.',
    type: 'website',
  },
};

function ProjectCard({ project }: { project: ProjectDoc }) {
  return (
    <div className={`${styles.projectCard} ${pageStyles.projectsPageCard}`}>
      {/* Gradient background */}
      <div
        className={styles.projectCardBg}
        style={{ background: project.coverGradient }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className={styles.projectOverlay} aria-hidden="true" />

      {/* Year badge */}
      <span className={styles.projectYear} aria-hidden="true">{project.year}</span>

      {/* Arrow indicator */}
      <span
        className={`material-symbols-outlined ${styles.projectArrow}`}
        aria-hidden="true"
        style={{ fontSize: '20px' }}
      >
        north_east
      </span>

      {/* Card content */}
      <div className={styles.projectContent}>
        <p className={styles.projectCategory}>{project.category}</p>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags?.map((tagItem) => (
            <span key={tagItem.id || tagItem.tag} className={styles.projectTag}>{tagItem.tag}</span>
          ))}
        </div>

        {/* External links */}
        {(project.liveUrl || project.githubUrl) && (
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '2px',
                  position: 'relative',
                  zIndex: 4,
                }}
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '2px',
                  position: 'relative',
                  zIndex: 4,
                }}
              >
                Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <main className={pageStyles.projectsPageMain}>
      <div className={styles.container}>
        <Link href="/" className={pageStyles.projectsPageBackLink}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to Home
        </Link>

        <div className={pageStyles.projectsPageHeader}>
          <h1 className={pageStyles.projectsPageTitle}>The Laboratory</h1>
          <p className={pageStyles.projectsPageSubtitle}>All Projects</p>
          <p className={pageStyles.projectsPageDescription}>
            A curated archive of systems I&apos;ve designed, built, and shipped — spanning computational finance, 
            machine learning infrastructure, and real-time data engineering.
          </p>
        </div>

        <div className={pageStyles.projectsPageGrid}>
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
