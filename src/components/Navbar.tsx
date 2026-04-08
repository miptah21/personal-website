import Link from 'next/link';
import styles from '@/app/page.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navBar}>
        <div className={styles.navContainer}>
          <span className={styles.navLogo}>Vanguard Editorial</span>
          <div className={styles.navLinks}>
            <Link href="/#about" className={styles.navLinkActive}>About</Link>
            <Link href="/insights" className={styles.navLink}>Insights</Link>
            <Link href="/#projects" className={styles.navLink}>Projects</Link>
            <Link href="/#contact" className={styles.navLink}>Contact</Link>
          </div>
          <button className={styles.btnPrimary}>Download CV</button>
        </div>
    </nav>
  );
}
