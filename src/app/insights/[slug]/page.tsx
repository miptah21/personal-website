import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import NativeComments from '@/components/NativeComments';
import styles from '../../page.module.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta, content } = getPostBySlug(resolvedParams.slug);

  return (
    <main style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', paddingBottom: '8rem', paddingTop: '8rem' }}>

      <article className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <div className="label-sm" style={{ color: 'var(--secondary)' }}>
            {meta.category} • {meta.date}
          </div>
          <h1 className="display-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            {meta.title}
          </h1>
          {meta.coverImage && (
            <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'var(--surface-container-low)', marginBottom: '4rem' }}>
              <Image src={meta.coverImage} alt={meta.title} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
            </div>
          )}
        </header>

        <div className="prose">
          <MDXRemote source={content} />
        </div>
        
        {/* Comments Section Custom UI */}
        <NativeComments slug={resolvedParams.slug} />
      </article>
    </main>
  );
}
