import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing · Emmanuel Joe Letsu",
  description: "Notes on engineering, learning, and the things I build.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <section className="px-gutter py-section">
        <Reveal className="mx-auto w-full max-w-page">
          <SectionHead title="Writing" meta="WHEN I'VE LEARNT SOMETHING" />

          <div className="mt-2">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
