import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";
import { PostHeader } from "@/components/blog/PostHeader";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} · Emmanuel Joe Benson`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { default: Post } = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: ComponentType;
  };

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-prose px-6 py-32">
        <Link
          href="/blog"
          className="mb-10 inline-block font-body text-sm font-medium text-gold-600 transition-colors hover:underline"
        >
          ← Back to writing
        </Link>
        <PostHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
        />
        <div className="prose prose-stone mt-10 max-w-none font-body dark:prose-invert">
          <Post />
        </div>
      </article>
    </main>
  );
}
