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
│   │   ├── layout/          ← Nav, SiteFooter, ScrollProgress
│   │   ├── sections/        ← Hero, Work, ProjectEntry, About, Skills, Writing
│   │   ├── ui/              ← Wordmark, SectionHead, ButtonLink, TextLink,
│   │   │                      Badge, Reveal, Stagger, ThemeToggle
│   │   └── blog/            ← PostCard, PostHeader
│   │
│   ├── lib/
│   │   ├── blog.ts          ← MDX reading utilities
│   │   ├── nav.ts           ← nav links
│   │   ├── projects.ts      ← project content
│   │   └── site.ts          ← site-wide constants (url, title, CV path)
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
  title: 'Emmanuel Joe Letsu · Software Engineer',
  description: '...',
}
```

Site-wide values (URL, title, description, CV path) live in `src/lib/site.ts` —
read them from there rather than retyping the strings.

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

## Page Structure and Section Backgrounds

Brand v3.1 (ADR-013). `src/app/page.tsx` stacks five sections; **Contact is the
footer**, rendered by the root layout so `/blog` gets the same close.

```
Hero      → bg-surface      (no id — the page top)
Work      → bg-surface      #work
About     → bg-surface      #about
Skills    → bg-surface-alt  #skills   ← the only inverted band, full-bleed
Writing   → bg-surface      #writing
Contact   → bg-surface      #contact  ← SiteFooter, in layout.tsx
```

Sections do **not** alternate. Skills is the single change of ground on the page;
everything else is separated by space, a 2px `on-surface` rule under each section
head, and 1px hairlines.

Every section carries `px-gutter` and constrains its content to
`mx-auto w-full max-w-page`. Do **not** hard-code raw palette classes on sections —
use the semantic roles (`bg-surface`, `text-on-surface-alt`, …). See
`docs/design-system.md` for the full role table.

### Nav and footer

- **Nav** is a flat bar with a `hairline` bottom border — a **Server Component**.
  It wraps rather than collapsing into a drawer, so there's no menu state and no
  `'use client'`. Links live in `src/lib/nav.ts` and are absolute (`/#work`) so
  they work from `/blog` too.
- **SiteFooter** is the contact section. `ContactSection` and the old `Footer`
  merged into it (ADR-013).

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

Frontmatter is handled per ADR-011: `remark-frontmatter` (passed as a string, for
Turbopack) keeps the `---` block out of the rendered body, and `gray-matter` reads
the title/date/description in `lib/blog.ts`. Posts live in `content/blog/*.mdx`,
resolved by a `@/content/*` tsconfig path.

---

## Animation Rules (motion)

Implemented per ADR-012, adjusted by ADR-013.

Allowed:
- Entrance animations on scroll (fade up, fade in) — via `ui/Reveal`
- Mount-sequenced entrances above the fold — via `ui/Stagger` + `StaggerItem`
- Hover transitions on interactive elements: `colors` only, 150ms
- Scroll progress indicator — a 2px **`on-surface`** line fixed at the top,
  width driven by motion's `useScroll`. Black, not accent: violet would make it a
  fifth accent element (ADR-013).

Not allowed:
- Spinning, bouncing, or looping animations
- Animations that block content from being read
- Layout animations that shift other elements
- **Hover transforms** — no lifts, no scale, no shadow changes. The v3.1 design is
  flat; the `whileHover={{ y: -6 }}` on project images was removed.

All animated components are Client Components (`'use client'`).
Wrap only the element being animated, not the whole section.
Every primitive branches on `useReducedMotion()` and renders the resting state
with no animated props when it's true.
