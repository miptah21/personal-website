import styles from '@/app/(frontend)/page.module.css';
import type { AwardDoc } from '@/lib/queries';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import Icon from '@/components/Icon';

const AwardLightbox = dynamic(() => import('../AwardLightbox').then(mod => ({ default: mod.AwardLightbox })));

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
        <ScrollReveal>
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
        </ScrollReveal>

        <div className={styles.awardsGrid} aria-label="Awards and certifications">
          {awardsWithCerts.map((award, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            return (
              <ScrollReveal delay={index * 0.15} key={award.id || index}>
                <div className={styles.awardCard}>
                  {/* Top decorative row */}
                  <div className={styles.awardCardTop}>
                    <span className={styles.awardNumber} aria-hidden="true">{numStr}</span>
                    <span className={styles.awardCategory}>
                      {CATEGORY_LABELS[award.category] || award.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={styles.awardIconWrap}>
                    <Icon name={award.icon || 'emoji_events'} className={styles.awardIcon} size={24} />
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
                      <Icon name="verified" size={18} />
                      <span>View Certificate</span>
                    </button>
                  )}

                  {/* Decorative corner accent */}
                  <div className={styles.awardAccent} aria-hidden="true" />
                </div>
              </ScrollReveal>
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
