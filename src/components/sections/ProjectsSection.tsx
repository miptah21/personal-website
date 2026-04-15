import Link from 'next/link';
import styles from '@/app/(frontend)/page.module.css';
import type { ProjectDoc } from '@/lib/queries';

export type ProjectsSectionProps = {
  projects: ProjectDoc[];
};

function ProjectCard({ project, isHero }: { project: ProjectDoc; isHero: boolean }) {
  return (
    <div className={`${styles.projectCard}${isHero ? ` ${styles.projectCardHero}` : ''}`}>
      {/* Gradient background */}
      <div
        className={styles.projectCardBg}
        style={{ background: project.coverGradient }}
        aria-hidden="true"
      />
      {/* Dark overlay for text legibility */}
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
        <h4 className={styles.projectTitle}>
          <Link href="/projects" className={styles.projectTitleLink}>
            {project.title}
          </Link>
        </h4>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags?.map((tagItem) => (
            <span key={tagItem.id || tagItem.tag} className={styles.projectTag}>{tagItem.tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.projectsHeader}>
          <div>
            <h2 className={`${styles.projectsSectionLabel} ${styles.italic}`}>Selected Works</h2>
            <h3 className={styles.projectsSectionHeadline}>The Laboratory</h3>
          </div>
          <Link href="/projects" className={styles.projectsLinkUnderline}>
            View Full Archive
          </Link>
        </div>

        <div className={styles.projectsGrid} role="list" aria-label="Featured projects">
          {projects.map((project, index) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} isHero={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
