import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import styles from '../page.module.css';
import { getInsights } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'The Monograph | Miftahudin Akbar',
  description: 'Journal of insights spanning computational finance, backend engineering, and systems strategy.',
  openGraph: {
    title: 'The Monograph | Miftahudin Akbar',
    description: 'Journal of insights spanning computational finance, backend engineering, and systems strategy.',
    type: 'website',
  }
};

export default async function InsightsList() {
  const posts = await getInsights(50);

  return (
    <main style={{ padding: '8rem 0', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <Link href="/" className={styles.backLink}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Back to Home
        </Link>
        <h1 className="display-lg" style={{ marginBottom: '1rem', color: 'var(--primary-container)' }}>The Monograph</h1>
        <p className="label-sm" style={{ color: 'var(--outline)', marginBottom: '4rem' }}>All Insights</p>
        
        <div className="grid grid-cols-3">
          {posts.map((post) => {
            const cover = typeof post.coverImage === 'object' && post.coverImage !== null ? post.coverImage : null;
            return (
              <div key={post.slug} className={styles.insightCard}>
                  <div>
                    <div className={styles.insightImageWrapper}>
                      <Image
                        src={cover?.url || '/default-insight-cover.png'}
                        alt={cover?.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.insightImage}
                      />
                    </div>
                    <p className={styles.insightCategory}>{post.category || 'Insight'}</p>
                    <h4 className={styles.insightTitle}>
                      <Link href={`/insights/${post.slug}`} className={styles.insightTitleLink}>
                        {post.title}
                      </Link>
                    </h4>
                  </div>
                  <div className={styles.insightFooter}>
                    <span>{(post.publishedAt || post.createdAt) ? new Date((post.publishedAt || post.createdAt) as string).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''}</span>
                    <span className="material-symbols-outlined">&#8599;</span>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
