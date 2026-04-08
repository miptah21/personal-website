import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>Vanguard Editorial</span>
            <p className={styles.footerCopyright}>© 2024 Vanguard Editorial. Designed for the Financial Professional.</p>
          </div>
          <div className={styles.footerNav}>
            <Link href="#">LinkedIn</Link>
            <Link href="#">GitHub</Link>
            <Link href="#">Email</Link>
            <Link href="#">Scroll to Top</Link>
          </div>
        </div>
    </footer>
  );
}
