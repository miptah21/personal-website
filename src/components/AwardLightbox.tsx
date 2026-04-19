'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from '@/app/(frontend)/page.module.css';

interface AwardLightboxItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  description: string | null;
  credentialUrl: string | null;
  certificateUrl: string | null;
  certificateAlt: string;
}

interface AwardLightboxProps {
  awards: AwardLightboxItem[];
}

export function AwardLightbox({ awards }: AwardLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const awardsWithCerts = awards.filter((a) => a.certificateUrl);

  const close = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    if (activeIndex === null || awardsWithCerts.length <= 1) return;
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % awardsWithCerts.length : null));
  }, [activeIndex, awardsWithCerts.length]);

  const goPrev = useCallback(() => {
    if (activeIndex === null || awardsWithCerts.length <= 1) return;
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + awardsWithCerts.length) % awardsWithCerts.length : null,
    );
  }, [activeIndex, awardsWithCerts.length]);

  // Lock body scroll & handle keyboard when lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, close, goNext, goPrev]);

  // Listen for clicks on "View Certificate" buttons via data attribute
  useEffect(() => {
    const handleBtnClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(`[data-cert-index]`);
      if (!btn) return;

      const cardIndex = parseInt(btn.getAttribute('data-cert-index') || '', 10);
      if (isNaN(cardIndex)) return;

      // Map from overall award index to cert-only index
      let certIdx = -1;
      for (let i = 0; i <= cardIndex && i < awards.length; i++) {
        if (awards[i].certificateUrl) certIdx++;
      }

      if (certIdx >= 0 && certIdx < awardsWithCerts.length) {
        setActiveIndex(certIdx);
      }
    };

    document.addEventListener('click', handleBtnClick);
    return () => document.removeEventListener('click', handleBtnClick);
  }, [awards, awardsWithCerts.length]);

  if (awardsWithCerts.length === 0) return null;

  const active = activeIndex !== null ? awardsWithCerts[activeIndex] : null;

  return (
    <>
      {active && (
        <div
          className={styles.lightboxOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${active.title}`}
        >
          <div className={styles.lightboxContent}>
            {/* Close button */}
            <button
              className={styles.lightboxClose}
              onClick={close}
              aria-label="Close certificate view"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Left Pane: Image */}
            <div className={styles.lightboxImageWrap}>
              {/* Navigation Arrows */}
              {awardsWithCerts.length > 1 && (
                <>
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                    onClick={goPrev}
                    aria-label="Previous certificate"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                    onClick={goNext}
                    aria-label="Next certificate"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </>
              )}

              <Image
                src={active.certificateUrl!}
                alt={active.certificateAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className={styles.lightboxImage}
                priority
              />
            </div>

            {/* Right Pane: Details Sidebar */}
            <div className={styles.lightboxSidebar}>
              <div className={styles.lightboxCategory}>
                {active.category === 'award' ? 'Award' : active.category === 'honor' ? 'Honor' : 'Certification'}
              </div>
              <h3 className={styles.lightboxTitle}>{active.title}</h3>
              
              <div className={styles.lightboxDetailsList}>
                <div className={styles.lightboxDetailItem}>
                  <span className={styles.lightboxDetailLabel}>Issuing Organization</span>
                  <span className={styles.lightboxDetailValue}>{active.issuer}</span>
                </div>
                <div className={styles.lightboxDetailItem}>
                  <span className={styles.lightboxDetailLabel}>Year Awarded</span>
                  <span className={styles.lightboxDetailValue}>{active.year}</span>
                </div>
              </div>

              {active.description && (
                <p className={styles.lightboxDescription}>{active.description}</p>
              )}

              {active.credentialUrl && (
                <a 
                  href={active.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.lightboxVerifyBtn}
                  aria-label={`Verify credential for ${active.title}`}
                >
                  <span className="material-symbols-outlined">verified</span>
                  Verify Credential
                </a>
              )}

              {awardsWithCerts.length > 1 && (
                <div className={styles.lightboxCounter}>
                  {activeIndex! + 1} of {awardsWithCerts.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
