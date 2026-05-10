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
          d="M 15,75 C 20,40 25,20 35,20 C 45,20 35,70 45,80 C 55,60 60,20 70,20 C 80,20 70,70 80,80 C 85,85 95,80 95,65"
          fill="none"
          stroke="var(--on-surface, #1b1c19)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
