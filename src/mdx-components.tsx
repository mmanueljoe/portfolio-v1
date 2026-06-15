import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. It lets MDX resolve components via
// this file instead of @mdx-js/react's client-only context, which can't run in
// a Server Component (hence the "createContext is not a function" build error).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
