'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from '@/app/(frontend)/page.module.css';

export default function Navbar() {
  const pathname = usePathname() || '/';
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50 && !isMobileMenuOpen) {
        setIsVisible(false); // Hide when scrolling down unless menu is open
      } else {
        setIsVisible(true);  // Show when scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <nav className={styles.navBar} style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }} aria-label="Main navigation">
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo} aria-label="Miftahudin Akbar Home">M.</Link>
          
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`}>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/' ? styles.navLinkActive : styles.navLink}>About</Link>
            <Link href="/experience" onClick={() => setIsMobileMenuOpen(false)} className={pathname.startsWith('/experience') ? styles.navLinkActive : styles.navLink}>Experience</Link>
            <Link href="/insights" onClick={() => setIsMobileMenuOpen(false)} className={pathname.startsWith('/insights') ? styles.navLinkActive : styles.navLink}>Insights</Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className={pathname.startsWith('/projects') ? styles.navLinkActive : styles.navLink}>Projects</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/contact' ? styles.navLinkActive : styles.navLink}>Contact</Link>
            <a href={process.env.NEXT_PUBLIC_CV_URL || '/CV.md'} target="_blank" rel="noopener noreferrer" download className={styles.btnPrimary} style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Download CV</a>
          </div>
        </div>
    </nav>
  );
}
