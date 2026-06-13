import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray pnpm-lock.yaml in the home dir made Next infer the wrong root.
  turbopack: {
    root: __dirname,
  },
  // ADR-003. Needs babel-plugin-react-compiler installed to build.
  reactCompiler: true,
};

export default nextConfig;
