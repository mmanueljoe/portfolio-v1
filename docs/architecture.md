# Architecture

---

## Folder Structure

```
portfolio/
├── CLAUDE.md
├── docs/
│   ├── project-brief.md
│   ├── architecture.md
│   ├── coding-standards.md
│   └── design-system.md
│
├── public/
│   └── images/
│       └── projects/        ← mockup screenshots go here
│
├── content/
│   └── blog/                ← MDX files, one per post
│       └── post-slug.mdx
│
├── src/
│   ├── app/                 ← Next.js App Router pages only
│   │   ├── layout.tsx       ← root layout, fonts, metadata
│   │   ├── page.tsx         ← homepage (composes sections)
│   │   ├── blog/
│   │   │   ├── page.tsx     ← blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx ← individual post
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/          ← Nav, Footer
│   │   ├── sections/        ← Hero, About, Skills, Projects, Contact
│   │   ├── ui/              ← Button, Badge, StackTag (small reusable primitives)
│   │   └── blog/            ← PostCard, PostHeader
│   │
│   ├── lib/
│   │   └── blog.ts          ← MDX reading utilities
│   │
│   └── types/
│       └── index.ts         ← shared TypeScript types
│
├── biome.json              ← lint + format config (no .eslintrc/.prettierrc)
├── postcss.config.mjs      ← loads @tailwindcss/postcss (Tailwind v4)
├── tsconfig.json
└── next.config.ts          ← wraps config with @next/mdx
```

---

## Next.js App Router Rules

### Server vs Client Components

This is the most common place AI will make mistakes. Follow this exactly.

**Default to Server Components.** Every component is a Server Component unless it needs one of:
- `useState` or `useReducer`
- `useEffect`
- Browser APIs (`window`, `document`)
- Event listeners (`onClick`, `onChange`, etc.)
- motion animations

If it needs any of the above, add `'use client'` at the top. Nowhere else.

**Page files are always Server Components.** Never add `'use client'` to a page file. If a page needs client interactivity, extract the interactive part into a child component and mark that child as `'use client'`.

```tsx
// ✅ Correct — page is server, interactive child is client
// app/page.tsx (Server Component)
import { HeroSection } from '@/components/sections/HeroSection'
export default function Home() {
  return <main><HeroSection /></main>
}

// components/sections/HeroSection.tsx (Client Component — only if it needs interactivity)
'use client'
```

### Data Fetching

Blog posts are read from MDX files at build time using `lib/blog.ts`.
No API routes needed. No `fetch()` calls in components.
Use `generateStaticParams` for blog post pages.

### Metadata

Every page defines its own metadata using the Next.js `metadata` export.

```tsx
export const metadata: Metadata = {
  title: 'Emmanuel Joe Benson — Software Engineer',
  description: '...',
}
```

---

## Component Rules

### Size limit
No component exceeds 150 lines. If it does, split it.

### One responsibility
Each component does one thing. `HeroSection` renders the hero. It does not know about projects. It does not fetch anything.

### Props
- Always type props explicitly with an interface. Never use inline type objects for props.
- No prop drilling beyond two levels. If data needs to go deeper, lift it or restructure.

```tsx
// ✅ Correct
interface ProjectCardProps {
  title: string
  description: string
  stack: string[]
  githubUrl: string
  mockupSrc: string
}

export function ProjectCard({ title, description, stack, githubUrl, mockupSrc }: ProjectCardProps) { ... }
```

### Naming
- Components: `PascalCase` — `ProjectCard.tsx`
- Utilities and lib files: `camelCase` — `blog.ts`
- All component files use named exports, not default exports (except pages and layouts)

---

## Section Backgrounds

Every section sits on the **single shared surface** — `bg-surface` /
`text-on-surface`. There is no light/dark alternation between sections (dropped in
ADR-010). The page is one continuous warm field; sections are separated by
generous vertical space and, where needed, a hairline rule — never by background
color blocks.

```
Hero        → bg-surface  text-on-surface
Projects    → bg-surface  text-on-surface
About       → bg-surface  text-on-surface
Skills      → bg-surface  text-on-surface
Contact     → bg-surface  text-on-surface
```

`surface-alt` is reserved for small raised elements (nav glass on scroll, footer,
mockup frames), not section bands. Do **not** hard-code `bg-parchment-100` /
`bg-ink-900` on sections — use the semantic classes. The page file just stacks the
sections.

---

## Blog Architecture

Posts are `.mdx` files in `content/blog/`. Each file has frontmatter:

```mdx
---
title: "Post title here"
date: "2026-06-01"
description: "One sentence description shown on the listing page."
---

Post body starts here...
```

`lib/blog.ts` exports two functions:
- `getAllPosts()` — returns all posts sorted by date, used by `/blog`
- `getPostBySlug(slug)` — returns one post, used by `/blog/[slug]`

Rendering uses `@next/mdx` (see ADR-007 in `docs/decisions.md`). Posts are local
MDX modules imported per route and prerendered with `generateStaticParams` — no
runtime fetch, no remote loader.

Note: `@next/mdx` does not parse frontmatter on its own. How `lib/blog.ts` reads
the title/date/description block is an open decision to settle before building the
blog (brief step 10) — it will get its own ADR.

---

## Animation Rules (motion)

Animations are added in step 12 — after everything else is built and working.

Allowed:
- Entrance animations on scroll (fade up, fade in)
- Smooth page transitions
- Hover state transitions on interactive elements
- Scroll progress indicator — a thin 2px gold-600 line fixed at the top of the viewport,
  width driven by motion's useScroll hook. Added in step 12 with all other animations.

Not allowed:
- Spinning, bouncing, or looping animations
- Animations that block content from being read
- Layout animations that shift other elements

All animated components are Client Components (`'use client'`).
Wrap only the element being animated, not the whole section.
