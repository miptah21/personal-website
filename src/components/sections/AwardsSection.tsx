import styles from '@/app/(frontend)/page.module.css';
import type { AwardDoc } from '@/lib/queries';
import { AwardLightbox } from '../AwardLightbox';

interface AwardsSectionProps {
  awards: AwardDoc[];
}

const CATEGORY_LABELS: Record<string, string> = {
  award: 'Award',
  certification: 'Certification',
  honor: 'Honor',
};

function getCertificateUrl(certificate: AwardDoc['certificate']): string | null {
  if (!certificate || typeof certificate === 'number') return null;
  return certificate.url ?? null;
}

function getCertificateAlt(certificate: AwardDoc['certificate'], fallback: string): string {
  if (!certificate || typeof certificate === 'number') return fallback;
  return certificate.alt ?? fallback;
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  if (awards.length === 0) return null;

  const awardsWithCerts = awards.map((award) => ({
    ...award,
    certificateUrl: getCertificateUrl(award.certificate),
    certificateAlt: getCertificateAlt(award.certificate, `${award.title} certificate`),
  }));

  return (
    <section id="awards" className={styles.awardsSection}>
      <div className={styles.container}>
        <div className={styles.awardsHeader}>
          <div>
            <h2 className={`${styles.awardsSectionLabel} ${styles.italic}`}>Recognition</h2>
            <h3 className={styles.awardsSectionHeadline}>Awards &amp; Certifications</h3>
          </div>
          <p className={styles.awardsSubline}>
            Competitive distinctions and professional certifications that validate
            technical expertise and innovation.
          </p>
        </div>

        <div className={styles.awardsGrid} role="list" aria-label="Awards and certifications">
          {awardsWithCerts.map((award, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            return (
              <div key={award.id || index} className={styles.awardCard} role="listitem">
                {/* Top decorative row */}
                <div className={styles.awardCardTop}>
                  <span className={styles.awardNumber} aria-hidden="true">{numStr}</span>
                  <span className={styles.awardCategory}>
                    {CATEGORY_LABELS[award.category] || award.category}
                  </span>
                </div>

                {/* Icon */}
                <div className={styles.awardIconWrap}>
                  <span
                    className={`material-symbols-outlined ${styles.awardIcon}`}
                    aria-hidden="true"
                  >
                    {award.icon || 'emoji_events'}
                  </span>
                </div>

                {/* Content */}
                <div className={styles.awardContent}>
                  <h4 className={styles.awardTitle}>{award.title}</h4>
                  <div className={styles.awardMeta}>
                    <span className={styles.awardIssuer}>{award.issuer}</span>
                    <span className={styles.awardYear}>{award.year}</span>
                  </div>
                  {award.description && (
                    <p className={styles.awardDescription}>{award.description}</p>
                  )}
                </div>

                {/* View Certificate CTA — only when certificate exists */}
                {award.certificateUrl && (
                  <button
                    type="button"
                    className={styles.awardCertBtn}
                    data-cert-index={index}
                    aria-label={`View certificate: ${award.title}`}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      verified
                    </span>
                    <span>View Certificate</span>
                  </button>
                )}

                {/* Decorative corner accent */}
                <div className={styles.awardAccent} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Client-side lightbox for viewing certificates */}
      <AwardLightbox
        awards={awardsWithCerts.map((a) => ({
          id: a.id,
          title: a.title,
          issuer: a.issuer,
          year: a.year,
          category: a.category,
          description: a.description || null,
          credentialUrl: a.credentialUrl || null,
          certificateUrl: a.certificateUrl,
          certificateAlt: a.certificateAlt,
        }))}
      />
    </section>
  );
}
