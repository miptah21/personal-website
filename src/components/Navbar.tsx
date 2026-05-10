'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/Icon';
import styles from '@/app/(frontend)/page.module.css';

export default function Navbar() {
  const pathname = usePathname() || '/';
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setHasAnimated(true);
    } else if (!hasAnimated) {
      // Garantikan animasi dihapus setelah selesai (2.6s delay + 0.8s duration = 3.4s)
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [pathname, hasAnimated]);

  // Direct DOM manipulation for show/hide — avoids React re-render on scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)._vanillaNavScroll) {
      window.removeEventListener('scroll', (window as any)._vanillaNavScroll);
      delete (window as any)._vanillaNavScroll;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50 && !isMobileMenuOpen) {
        document.body.style.setProperty('--nav-transform', 'translateY(-100%)');
      } else {
        document.body.style.setProperty('--nav-transform', 'translateY(0)');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu (Accessibility)
  const handleMenuKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isMobileMenuOpen || !menuRef.current) return;

    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
      menuBtnRef.current?.focus();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusableEls = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleMenuKeyDown);
      // Focus the first link in the menu
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }
    return () => document.removeEventListener('keydown', handleMenuKeyDown);
  }, [isMobileMenuOpen, handleMenuKeyDown]);

  return (
    <nav 
      ref={navRef} 
      className={`${styles.navBar} ${pathname === '/' && !hasAnimated ? styles.navAnimate : ''}`} 
      style={{ 
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }} 
      aria-label="Main navigation"
    >
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo} aria-label="Miftahudin Akbar Home">M.</Link>
          
          <button 
            ref={menuBtnRef}
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>

          <div ref={menuRef} className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`} role={isMobileMenuOpen ? 'dialog' : undefined} aria-label={isMobileMenuOpen ? 'Navigation menu' : undefined}>
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

