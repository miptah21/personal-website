'use client';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: '12rem 0', minHeight: '80vh', backgroundColor: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="container">
        <h1 className="display-lg" style={{ color: 'var(--primary-container)', marginBottom: '1rem' }}>System Error</h1>
        <p className="label-sm" style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Something went wrong</p>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>
          An unexpected structural error occurred while rendering this page.
        </p>
        <button 
          onClick={() => reset()} 
          className={styles.btnRoundedPrimary}
          style={{ cursor: 'pointer' }}
        >
          <span>Try Again</span>
          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '18px' }}>refresh</span>
        </button>
      </div>
    </main>
  );
}
