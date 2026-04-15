import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RichText } from '@payloadcms/richtext-lexical/react';
import NativeComments from '@/components/NativeComments';
import { getInsightBySlug, getAllInsightSlugs } from '@/lib/queries';

export const revalidate = 3600; // Caching Frontend: revalidate every 1 hour (ISR)

export async function generateStaticParams() {
  const slugs = await getAllInsightSlugs();
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  
  if (!post) {
    return { title: 'Insight Not Found | Miftahudin Akbar' };
  }

  const coverUrl = post.coverImage && typeof post.coverImage === 'object' && 'url' in post.coverImage 
    ? post.coverImage.url 
    : '/portrait.png'; // Fallback to portrait

  return {
    title: `${post.title} | Miftahudin Akbar`,
    description: `Read insights on ${post.category || 'technology and finance'}.`,
    openGraph: {
      title: post.title,
      description: `Read insights on ${post.category || 'technology and finance'}.`,
      type: 'article',
      url: `https://miftahudinakbar.com/insights/${slug}`,
      images: [
        {
          url: coverUrl || '',
          width: 1200,
          height: 630,
          alt: typeof post.coverImage === 'object' && post.coverImage !== null && 'alt' in post.coverImage ? post.coverImage.alt || post.title : post.title,
        },
      ],
    },
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getInsightBySlug(slug);

  if (!post) notFound();

  return (
    <main style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', paddingBottom: '8rem', paddingTop: '8rem' }}>
      <article className="container" style={{ maxWidth: '800px' }}>
        <header style={{ marginBottom: '4rem' }}>
          {(post.publishedAt || post.createdAt) && (
            <p className="label-sm" style={{ color: 'var(--outline)' }}>
              {new Date((post.publishedAt || post.createdAt) as string).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}
          <h1 className="display-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            {post.title}
          </h1>
        </header>

        <div className="prose">
          {post.content ? (
            <RichText data={post.content as import('lexical').SerializedEditorState} />
          ) : (
            <p style={{ color: 'var(--outline)', fontStyle: 'italic' }}>No content yet.</p>
          )}
        </div>
        
        <NativeComments slug={slug} />
      </article>
    </main>
  );
}

