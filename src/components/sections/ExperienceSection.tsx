import styles from '@/app/(frontend)/page.module.css';
import type { ExperienceDoc } from '@/lib/queries';

interface ExperienceSectionProps {
  experiences: ExperienceDoc[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className={styles.experienceSection} id="projects">
      <div className={styles.container}>
        <div className={styles.expGrid}>
          <div className={styles.expHeaderCol}>
            <h2 className={styles.expStickyHeadline}>Professional Tenure</h2>
          </div>
          <div className={styles.expListCol} role="list" aria-label="Professional experience">
            {experiences.length > 0 ? experiences.map((exp, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              const isLast = index === experiences.length - 1;
              return (
                <div
                  key={exp.id || index}
                  className={`${styles.expItem}${isLast ? ` ${styles.expItemLast}` : ''}`}
                  role="listitem"
                >
                  <div className={styles.expItemMain}>
                    <span className={styles.expNumber} aria-hidden="true">{numStr}</span>
                    <div>
                      <h4 className={styles.expCompany}>{exp.company}</h4>
                      <p className={styles.expRole}>{exp.role}</p>
                    </div>
                  </div>
                  <p className={styles.expDates}>{exp.startDate} — {exp.endDate}</p>
                </div>
              );
            }) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--outline)' }}>
                <p><i>The Professional Tenure is currently empty. Add items via the Payload Admin interface.</i></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
