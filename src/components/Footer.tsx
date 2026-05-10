import Link from 'next/link';
import styles from '@/app/(frontend)/page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo} aria-label="Miftahudin Akbar Home">M.</Link>
            <p className={styles.footerCopyright}>© {new Date().getFullYear()} Miftahudin Akbar. Designed for the Financial Professional.</p>
          </div>
          <div className={styles.footerNav}>
            <Link href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'} target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            <Link href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'} target="_blank" rel="noopener noreferrer">GitHub</Link>
            <a href={process.env.NEXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` : '#'}>Email</a>
            <a href="#main-content">Scroll to Top</a>
          </div>
        </div>
    </footer>
  );
}
