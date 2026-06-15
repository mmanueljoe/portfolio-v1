import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let .md/.mdx files be treated as routes/modules alongside .ts/.tsx.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // A stray pnpm-lock.yaml in the home dir made Next infer the wrong root.
  turbopack: {
    root: __dirname,
  },
  // ADR-003. Needs babel-plugin-react-compiler installed to build.
  reactCompiler: true,
};

const withMDX = createMDX({
  options: {
    // Turbopack needs plugins as strings (functions can't cross into Rust).
    // remark-frontmatter parses the `---` block so it isn't rendered; gray-matter
    // reads it for metadata. ADR-011.
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
