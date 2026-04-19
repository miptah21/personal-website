import type { Metadata } from 'next';
import Link from 'next/link';
import { getExperiences } from '@/lib/queries';
import { RichText } from '@payloadcms/richtext-lexical/react';
import styles from './experience.module.css';

export const metadata: Metadata = {
  title: 'Experience | Miftahudin Akbar',
  description:
    'Professional experience and career history of Miftahudin Akbar — a detailed look at roles, impact, and technical expertise across organizations.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ExperiencePage() {
  const experiences = await getExperiences(100);

  const totalYears = computeYearsOfExperience(experiences);
  const totalCompanies = experiences.length;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            arrow_back
          </span>
          Back to Home
        </Link>

        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                Resume &amp; Career History
              </p>
              <h1 className={styles.headline}>
                Professional
                <br />
                Experience
              </h1>
              <p className={styles.headerDescription}>
                A detailed look at my career trajectory, the scope of my responsibilities,
                and the measurable impact I&lsquo;ve delivered across various organizations.
              </p>
            </div>

            {totalCompanies > 0 && (
              <div className={styles.headerStats}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{totalYears}+</div>
                  <div className={styles.statLabel}>Years</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>{totalCompanies}</div>
                  <div className={styles.statLabel}>Roles</div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className={styles.divider} />

        {experiences.length > 0 ? (
          <div className={styles.timeline} role="list" aria-label="Detailed professional experience">
            {experiences.map((exp, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              const isLast = index === experiences.length - 1;
              const isActive = exp.isActive ?? false;

              return (
                <article
                  key={exp.id || index}
                  className={`${styles.entry}${isLast ? ` ${styles.entryLast}` : ''}${isActive ? ` ${styles.entryActive}` : ''}`}
                  role="listitem"
                >
                  <div className={styles.entryHeader}>
                    <div className={styles.entryMeta}>
                      <span className={styles.entryNumber}>{numStr}</span>
                      <h2 className={styles.company}>{exp.company}</h2>
                      <p className={styles.role}>{exp.role}</p>
                    </div>
                    <span className={styles.dates}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  <div className={styles.entryBody}>
                    {exp.scope && (
                      <div className={styles.scope}>
                        <p>{exp.scope}</p>
                      </div>
                    )}

                    {!!exp.impactAndOutcomes && (
                      <div className={styles.outcomes}>
                        <RichText
                          data={exp.impactAndOutcomes as import('lexical').SerializedEditorState}
                        />
                      </div>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className={styles.skills}>
                        {exp.skills.map((s, idx) => (
                          <span key={s.id || idx} className={styles.skillPill}>
                            {s.skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={`material-symbols-outlined ${styles.emptyStateIcon}`}>
              work_history
            </span>
            <p className={styles.emptyStateText}>
              The experience profile is currently being updated. Check back soon.
            </p>
          </div>
        )}

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Interested in working together? Let&lsquo;s start a conversation.
          </p>
          <Link href="/contact" className={styles.ctaLink}>
            <span>Get in Touch</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

/**
 * Computes approximate total years of experience from the
 * earliest startDate to the latest endDate (or current year).
 */
function computeYearsOfExperience(
  experiences: { startDate: string; endDate: string }[],
): number {
  if (experiences.length === 0) return 0;

  const currentYear = new Date().getFullYear();
  let earliest = currentYear;
  let latest = 0;

  for (const exp of experiences) {
    const startYear = extractYear(exp.startDate);
    const endYear =
      exp.endDate.toLowerCase() === 'present' ? currentYear : extractYear(exp.endDate);

    if (startYear && startYear < earliest) earliest = startYear;
    if (endYear && endYear > latest) latest = endYear;
  }

  const diff = latest - earliest;
  return diff > 0 ? diff : 1;
}

function extractYear(dateStr: string): number | null {
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}
