import styles from '@/app/(frontend)/page.module.css';
import type { EducationDoc } from '@/lib/queries';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

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
          <ScrollReveal className={styles.eduHeaderCol}>
            <div className={styles.eduStickyHeadline}>
              <h2 style={{ fontSize: 'inherit', fontWeight: 'inherit', margin: 0 }}>Education</h2>
            </div>
          </ScrollReveal>

          {/* Right: Education cards */}
          <div className={styles.eduContentCol}>
            {education.map((edu, index) => (
              <ScrollReveal delay={index * 0.2} key={edu.id}>
                <div className={styles.eduCard}>
                  {/* University header */}
                  <div className={styles.eduCardHeader}>
                    <div className={styles.eduIconWrap} aria-hidden="true">
                      <Icon name={edu.icon || 'school'} className={styles.eduIcon} size={24} />
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
                          <Icon name="description" size={14} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
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
                          <Icon name="menu_book" size={14} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
