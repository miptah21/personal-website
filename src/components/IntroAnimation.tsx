'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hanya jalankan intro jika pengguna berada di halaman utama
    if (pathname === '/') {
      setIsVisible(true);
      setIsFading(false);
      
      document.body.style.overflow = 'hidden';

      const fadeTimer = setTimeout(() => setIsFading(true), 2500);
      
      const unmountTimer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 3300);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
        document.body.style.overflow = '';
      };
    }
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.introContainer} ${isFading ? styles.fadeOut : ''}`} aria-hidden="true">
      <svg
        className={styles.mSvg}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Golden Underline */}
        <path
          className={styles.underlinePath}
          pathLength="100"
          d="M 45,155 C 80,140 140,130 165,135"
          fill="none"
          stroke="#cca850"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Elegant Signature M */}
        <path
          className={styles.mPath}
          pathLength="100"
          d="M 50,100 C 30,115 40,60 80,50 C 70,80 60,130 60,140 C 75,100 95,60 110,65 C 105,90 95,130 95,130 C 105,100 120,70 130,75 C 125,100 120,140 135,130"
          fill="none"
          stroke="#093325"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
