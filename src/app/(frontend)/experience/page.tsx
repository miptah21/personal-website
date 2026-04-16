import { Metadata } from 'next';
import Link from 'next/link';
import { getExperiences } from '@/lib/queries';
import styles from '@/app/(frontend)/page.module.css';
import { RichText } from '@payloadcms/richtext-lexical/react';

export const metadata: Metadata = {
  title: 'Experience | Miftahudin Akbar',
  description: 'Professional experience and career history of Miftahudin Akbar.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ExperiencePage() {
  const experiences = await getExperiences(100);

  return (
    <main style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className={styles.container} style={{ maxWidth: '1000px' }}>
        <Link href="/" className={styles.backLink}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
          Back to Home
        </Link>
        <header style={{ marginBottom: '6rem' }}>
          <p className={styles.sectionLabel} style={{ marginBottom: '1rem' }}>Resume & Case Studies</p>
          <h1 className={styles.sectionHeadlineLarge} style={{ marginBottom: '2rem' }}>Professional Experience</h1>
          <p className="prose" style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '600px' }}>
            A detailed look at my career history, the scope of my responsibilities, and the impact I&lsquo;ve delivered across various organizations.
          </p>
        </header>

        <div className={styles.expListCol} role="list" aria-label="Detailed professional experience">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              const isLast = index === experiences.length - 1;
              return (
                <div
                  key={exp.id || index}
                  className={`${styles.expItem}${isLast ? ` ${styles.expItemLast}` : ''}`}
                  role="listitem"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <div className={styles.expItemHeader}>
                    <div className={styles.expItemMain}>
                      <span className={styles.expNumber} aria-hidden="true">{numStr}</span>
                      <div>
                        <h4 className={styles.expCompany} style={{ fontSize: '2rem' }}>{exp.company}</h4>
                        <p className={styles.expRole} style={{ color: 'var(--primary-container)', fontWeight: '600' }}>{exp.role}</p>
                      </div>
                    </div>
                    <p className={styles.expDates}>{exp.startDate} — {exp.endDate}</p>
                  </div>

                  <div className={styles.expContent}>
                    {exp.scope && (
                      <div className={styles.expScope}>
                        <p>{exp.scope}</p>
                      </div>
                    )}
                    
                    {!!exp.impactAndOutcomes && (
                      <div className={styles.expOutcomes}>
                        <RichText data={exp.impactAndOutcomes as import('lexical').SerializedEditorState} />
                      </div>
                    )}
                    
                    {exp.skills && exp.skills.length > 0 && (
                      <div className={styles.expSkills}>
                        {exp.skills.map((s, idx) => (
                          <span key={s.id || idx} className={styles.skillPill}>
                            {s.skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--outline)' }}>
              <p><i>The Experience profile is currently being updated. Check back soon.</i></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
