'use client';

import { useState, useEffect, useCallback } from 'react';
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

            {/* Navigation */}
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

            {/* Image */}
            <div className={styles.lightboxImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.certificateUrl!}
                alt={active.certificateAlt}
                className={styles.lightboxImage}
              />
            </div>

            {/* Caption */}
            <div className={styles.lightboxCaption}>
              <h4 className={styles.lightboxTitle}>{active.title}</h4>
              <div className={styles.lightboxMeta}>
                <span>{active.issuer} &middot; {active.year}</span>
                {active.credentialUrl && (
                  <a 
                    href={active.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.lightboxVerifyBtn}
                    aria-label={`Verify credential for ${active.title}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                    Verify
                  </a>
                )}
              </div>
              {active.description && (
                <p className={styles.lightboxDescription}>{active.description}</p>
              )}
              {awardsWithCerts.length > 1 && (
                <span className={styles.lightboxCounter}>
                  {activeIndex! + 1} / {awardsWithCerts.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
