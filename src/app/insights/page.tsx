import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export default function InsightsList() {
  const posts = getAllPosts();

  return (
    <main style={{ padding: '8rem 0', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <h1 className="display-lg" style={{ marginBottom: '1rem', color: 'var(--primary-container)' }}>The Monograph</h1>
        <p className="label-sm" style={{ color: 'var(--outline)', marginBottom: '4rem' }}>All Insights</p>
        
        <div className="grid grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/insights/${post.slug}`}>
              <div className={styles.insightCard}>
                <div>
                  {post.coverImage && (
                    <div className={styles.insightImageWrapper}>
                      <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.insightImage} />
                    </div>
                  )}
                  <p className={styles.insightCategory}>{post.category}</p>
                  <h4 className={styles.insightTitle}>{post.title}</h4>
                </div>
                <div className={styles.insightFooter}>
                  <span>{post.date}</span>
                  <span className="material-symbols-outlined">&#8599;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
