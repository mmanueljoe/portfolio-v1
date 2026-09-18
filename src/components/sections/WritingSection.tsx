import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { getAllPosts } from "@/lib/blog";

export function WritingSection() {
  const posts = getAllPosts();

  return (
    <section id="writing" className="px-gutter py-section">
      <Reveal className="mx-auto w-full max-w-page">
        <SectionHead title="Writing" meta="WHEN I'VE LEARNT SOMETHING" />

        <div className="mt-2">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>

        {posts.length === 1 && (
          <p className="mt-5 font-body text-note text-on-surface-muted">
            One post so far. The list earns its place as it grows.
          </p>
        )}
      </Reveal>
    </section>
  );
}
