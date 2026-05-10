'use client';

import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Mengecek apakah animasi sudah dimainkan di sesi ini
    const hasPlayed = sessionStorage.getItem('intro_played');
    
    if (!hasPlayed) {
      setIsVisible(true);
      // Mencegah user scroll ke bawah saat intro berjalan
      document.body.style.overflow = 'hidden';

      // Mulai proses fade-out perlahan
      const fadeTimer = setTimeout(() => setIsFading(true), 2500);
      
      // Hapus komponen dari DOM setelah fade-out selesai
      const unmountTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('intro_played', 'true');
        document.body.style.overflow = ''; // Kembalikan scroll
      }, 3300);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.introContainer} ${isFading ? styles.fadeOut : ''}`} aria-hidden="true">
      <svg
        className={styles.mSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.mPath}
          pathLength="100"
          d="M 20 80 L 20 20 L 50 50 L 80 20 L 80 80"
          fill="none"
          stroke="var(--on-surface, #1b1c19)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
