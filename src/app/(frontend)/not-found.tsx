import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <main style={{ padding: '12rem 0', minHeight: '80vh', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="container">
        <h1 className="display-lg" style={{ color: 'var(--primary-container)', marginBottom: '1rem' }}>404</h1>
        <p className="label-sm" style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Page Not Found</p>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>
          The page you are looking for has been moved, deleted, or possibly never existed.
        </p>
        <Link href="/" className={styles.btnRoundedPrimary}>
          <span>Return Home</span>
          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '18px' }}>arrow_forward</span>
        </Link>
      </div>
    </main>
  );
}
