import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing · Emmanuel Joe Benson",
  description: "Notes on engineering, learning, and the things I build.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <section className="bg-surface py-32">
        <div className="mx-auto w-full max-w-2xl px-6">
          <SectionLabel>Writing</SectionLabel>

          <div className="mt-12 flex flex-col divide-y divide-on-surface/10">
            {posts.map((post) => (
              <div key={post.slug} className="py-8 first:pt-0 last:pb-0">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
