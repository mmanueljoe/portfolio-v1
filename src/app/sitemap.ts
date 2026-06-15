import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: SITE.url, lastModified: new Date() },
    { url: `${SITE.url}/blog`, lastModified: new Date() },
    ...posts,
  ];
}
