import styles from '@/app/(frontend)/page.module.css';
import type { EducationDoc } from '@/lib/queries';

interface EducationSectionProps {
  education: EducationDoc[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section id="education" className={styles.educationSection} aria-label="Education">
      <div className={styles.container}>
        <div className={styles.eduGrid}>
          {/* Left: Sticky headline */}
          <div className={styles.eduHeaderCol}>
            <div className={styles.eduStickyHeadline}>
              <h2 style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>Education</h2>
            </div>
          </div>

          {/* Right: Education cards */}
          <div className={styles.eduContentCol}>
            {education.map((edu) => (
              <div key={edu.id} className={styles.eduCard}>
                {/* University header */}
                <div className={styles.eduCardHeader}>
                  <div className={styles.eduIconWrap} aria-hidden="true">
                    <span className={`material-symbols-outlined ${styles.eduIcon}`}>
                      {edu.icon || 'school'}
                    </span>
                  </div>
                  <div>
                    <h3 className={styles.eduUniversity}>{edu.university}</h3>
                    <p className={styles.eduLocation}>{edu.location}</p>
                  </div>
                </div>

                {/* Degree + Concentration */}
                <div className={styles.eduDegreeBlock}>
                  <p className={styles.eduDegree}>{edu.degree}</p>
                  {edu.concentration && (
                    <p className={styles.eduConcentration}>{edu.concentration}</p>
                  )}
                </div>

                {/* Metrics: GPA + Graduation */}
                <div className={styles.eduMetrics} role="list" aria-label="Academic metrics">
                  {edu.gpa && (
                    <>
                      <div className={styles.eduMetricItem} role="listitem">
                        <p className={styles.eduMetricNumber}>{edu.gpa}</p>
                        <p className={styles.eduMetricLabel}>
                          GPA{edu.gpaScale ? ` / ${edu.gpaScale}` : ''}
                        </p>
                      </div>
                      <div className={styles.eduMetricDivider} aria-hidden="true" />
                    </>
                  )}
                  <div className={styles.eduMetricItem} role="listitem">
                    <p className={styles.eduMetricNumber}>
                      {edu.graduationDate.replace(/[^\d]/g, '').slice(0, 4) || edu.graduationDate}
                    </p>
                    <p className={styles.eduMetricLabel}>
                      {edu.isExpected ? 'Expected Graduation' : 'Graduated'}
                    </p>
                  </div>
                </div>

                {/* Thesis */}
                {edu.thesisTitle && (
                  <>
                    <div className={styles.eduDivider} aria-hidden="true" />
                    <div className={styles.eduThesisBlock}>
                      <p className={styles.eduBlockLabel}>
                        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '0.5rem' }}>
                          description
                        </span>
                        Thesis
                      </p>
                      <p className={styles.eduThesisTitle}>
                        &ldquo;{edu.thesisTitle}&rdquo;
                      </p>
                      {edu.thesisSummary && (
                        <p className={styles.eduThesisSummary}>{edu.thesisSummary}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Coursework */}
                {edu.courseworkGroups && edu.courseworkGroups.length > 0 && (
                  <>
                    <div className={styles.eduDivider} aria-hidden="true" />
                    <div className={styles.eduCourseworkBlock}>
                      <p className={styles.eduBlockLabel}>
                        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '0.5rem' }}>
                          menu_book
                        </span>
                        Key Coursework
                      </p>
                      {edu.courseworkGroups.map((group) => (
                        <div key={group.id || group.groupLabel} className={styles.eduCourseworkGroup}>
                          <p className={styles.eduCourseworkGroupLabel}>{group.groupLabel}</p>
                          <div className={styles.eduPills} role="list" aria-label={`${group.groupLabel} courses`}>
                            {group.courses?.map((c) => (
                              <span key={c.id || c.course} className={styles.skillPill} role="listitem">
                                {c.course}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
