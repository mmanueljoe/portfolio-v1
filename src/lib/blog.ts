import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMeta {
  readingTime: number;
}

interface Frontmatter {
  title: string;
  date: string;
  description: string;
}

function readPost(slug: string): { data: Frontmatter; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as Frontmatter, content: parsed.content };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = readPost(slug);
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post {
  const { data, content } = readPost(slug);
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(words / 200));
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    readingTime,
  };
}
