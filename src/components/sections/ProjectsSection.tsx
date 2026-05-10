import Link from 'next/link';
import styles from '@/app/(frontend)/page.module.css';
import type { ProjectDoc } from '@/lib/queries';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

export type ProjectsSectionProps = {
  projects: ProjectDoc[];
};

function ProjectCard({ project, isHero }: { project: ProjectDoc; isHero: boolean }) {
  return (
    <Link href="/projects" className={`${styles.projectCard}${isHero ? ` ${styles.projectCardHero}` : ''}`} style={{ display: 'block', textDecoration: 'none' }}>
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
      <span className={styles.projectArrow} aria-hidden="true">
        <Icon name="north_east" size={20} />
      </span>

      {/* Card content */}
      <div className={styles.projectContent}>
        <p className={styles.projectCategory}>{project.category}</p>
        <h4 className={styles.projectTitle}>
          {project.title}
        </h4>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags?.map((tagItem) => (
            <span key={tagItem.id || tagItem.tag} className={styles.projectTag}>{tagItem.tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.projectsHeader}>
            <div>
              <h2 className={`${styles.projectsSectionLabel} ${styles.italic}`}>Selected Works</h2>
              <h3 className={styles.projectsSectionHeadline}>The Laboratory</h3>
            </div>
            <Link href="/projects" className={styles.projectsLinkUnderline}>
              View Full Archive
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.projectsGrid} role="list" aria-label="Featured projects">
          {projects.map((project, index) => (
            <ScrollReveal delay={index * 0.2} key={project.id}>
              <div role="listitem">
                <ProjectCard project={project} isHero={index === 0} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
