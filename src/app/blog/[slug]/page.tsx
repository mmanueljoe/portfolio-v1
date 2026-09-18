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
    title: `${post.title} · Emmanuel Joe Letsu`,
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
      <article className="mx-auto w-full max-w-prose px-gutter py-section">
        <Link
          href="/blog"
          className="mb-10 inline-block border-b border-hairline pb-0.5 font-body text-link text-on-surface transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          ← Back to writing
        </Link>
        <PostHeader
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
        />
        {/* prose-neutral, not prose-stone: the v3 ramp is a neutral grey, and
            stone's warm tint was tuned for the old parchment palette. */}
        <div className="prose prose-neutral mt-10 max-w-none font-body dark:prose-invert">
          <Post />
        </div>
      </article>
    </main>
  );
}
