import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/insights');

export type PostMeta = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage?: string;
};

export const getPostSlugs = () => {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.mdx'));
};

export const getPostBySlug = (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as Omit<PostMeta, 'slug'>,
    content,
  };
};

export const getAllPosts = (): PostMeta[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const { meta, slug: realSlug } = getPostBySlug(slug);
      return { ...meta, slug: realSlug };
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
