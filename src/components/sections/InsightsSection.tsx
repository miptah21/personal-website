import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/(frontend)/page.module.css';
import type { InsightDoc } from '@/lib/queries';

interface InsightsSectionProps {
  insights: InsightDoc[];
}

export default function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <section id="insights" className={styles.insightsSection}>
      <div className={styles.container}>
        <div className={styles.insightsHeader}>
          <div>
            <h2 className={`${styles.sectionLabel} ${styles.italic}`}>Journal of Insights</h2>
            <h3 className={styles.sectionHeadlineLarge}>The Monograph</h3>
          </div>
          <Link href="/insights" className={styles.linkUnderline}>Browse Full Archive</Link>
        </div>
        
        <div className={styles.insightsGrid} role="list" aria-label="Latest insights">
          {insights.map((post) => {
            const cover = typeof post.coverImage === 'object' && post.coverImage !== null ? post.coverImage : null;
            return (
              <div key={post.slug} className={styles.insightCard} role="listitem">
                <div>
                  <div className={styles.insightImageWrapper}>
                    <Image
                      src={(cover && 'url' in cover && cover.url) ? cover.url : '/default-insight-cover.png'}
                      alt={(cover && 'alt' in cover && cover.alt) ? cover.alt : post.title}
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
                  <span>{(post.publishedAt || post.createdAt) ? new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : ''}</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '20px' }}>north_east</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
