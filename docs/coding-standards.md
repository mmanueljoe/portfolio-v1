# Coding Standards

These are the rules for every line of code written in this project.
If you are unsure whether something follows these standards, ask before writing it.

---

## TypeScript

### Strict mode is on. No exceptions.

```json
// tsconfig.json — strict mode is set by the create-next-app scaffold
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Never use `any`

```ts
// ❌ Forbidden
const data: any = getPost()

// ✅ Correct — derive the type or define it
const data: Post = getPost()
```

### Always type function return values explicitly

```ts
// ❌ Inferred, fragile
function getAllPosts() {
  return posts.map(...)
}

// ✅ Explicit, clear contract
function getAllPosts(): Post[] {
  return posts.map(...)
}
```

### Use interfaces for objects, type aliases for unions and primitives

```ts
// Object shape → interface
interface Post {
  title: string
  slug: string
  date: string
  description: string
}

// Union or alias → type
type Theme = 'light' | 'dark'
```

### No non-null assertions unless absolutely unavoidable

```ts
// ❌ Dangerous
const el = document.getElementById('hero')!

// ✅ Safe
const el = document.getElementById('hero')
if (!el) return
```

---

## Tailwind CSS

### Only use brand tokens. No arbitrary values.

```tsx
// ❌ Forbidden — arbitrary values
<h1 className="text-[#111111] text-[66px] max-w-[24ch]">

// ✅ Correct — brand tokens
<h1 className="font-display text-hero font-bold text-on-surface max-w-hero-head">
```

This holds for **fluid values too**. If the design calls for
`clamp(36px, 5.6vw, 66px)`, that becomes a `--text-*` token in `globals.css`, not
`text-[clamp(...)]` in the markup (ADR-013). If a value genuinely has no token yet,
add one — don't reach for brackets.

The exception: values that land on Tailwind v4's numeric spacing scale are already
tokens. `py-1.75`, `gap-5.5`, `min-w-7.5`, `px-6.5` are fine; don't invent a named
token for something the scale expresses.

### Prefer semantic roles over raw ramp stops

```tsx
// ❌ Breaks in dark mode — ink-50 is #FAFAFA in both themes
<div className="hover:bg-ink-50">

// ✅ Resolves per theme
<div className="hover:bg-row-hover">
```

Raw stops (`ink-400`, `violet-200`) are legitimate for one-offs that genuinely
don't change between modes. Anything that describes a *surface* or the text on one
uses a semantic role.

### No inline styles unless motion animation values require it

```tsx
// ❌ Forbidden
<div style={{ backgroundColor: '#FFFFFF' }}>

// ✅ Correct
<div className="bg-surface">
```

`next/og` images (`opengraph-image.tsx`, `apple-icon.tsx`) are the one exemption —
Satori only reads inline styles, so the brand hexes are repeated there by
necessity. Comment them as such.

### Class order convention (follow this for readability)
Layout → Sizing → Spacing → Typography → Color → Border → Effects → Responsive → State

```tsx
// Example
<p className="flex items-center w-full px-4 py-2 font-body text-body text-on-surface-muted border border-hairline rounded-brand hover:text-on-surface md:px-6">
```

### Responsive design — prefer intrinsic layout to breakpoints

v3.1 has **no media queries**. Every two-column block is `auto-fit` with a `minmax`
floor, so it collapses on its own when the content no longer fits:

```tsx
// ✅ Collapses to one column with no breakpoint
<div className="grid grid-pair-entry items-start gap-entry-col">
```

The floors are declared as `@utility` classes in `globals.css` (`grid-pair-hero`,
`grid-pair-entry`, `grid-pair-skills`, `grid-pair-post`, `grid-pair-contact`) —
see `docs/design-system.md`.

If you do need a breakpoint, write mobile first:

```tsx
// ❌ Desktop first (don't do this)
<div className="grid-cols-2 sm:grid-cols-1">

// ✅ Mobile first
<div className="grid-cols-1 md:grid-cols-2">
```

Check every change at **360, 768 and 1440**, and confirm there's no horizontal
overflow at 360.

---

## Component Patterns

### Named exports everywhere except pages and layouts

```tsx
// ❌ Wrong (except for page.tsx and layout.tsx)
export default function ProjectCard() { ... }

// ✅ Correct
export function ProjectCard() { ... }
```

### Keep JSX clean — extract complex logic above the return

```tsx
// ❌ Logic tangled in JSX
return (
  <ul>
    {posts.filter(p => new Date(p.date) > new Date('2026-01-01')).sort(...).map(...)}
  </ul>
)

// ✅ Clean
const recentPosts = posts
  .filter(p => new Date(p.date) > new Date('2026-01-01'))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

return (
  <ul>
    {recentPosts.map(post => <PostCard key={post.slug} {...post} />)}
  </ul>
)
```

### Always provide a `key` prop when rendering lists, and never use array index as key

```tsx
// ❌ Index as key — breaks on reorder
{projects.map((p, i) => <ProjectCard key={i} {...p} />)}

// ✅ Stable unique key
{projects.map(p => <ProjectCard key={p.slug} {...p} />)}
```

---

## Anti-Patterns to Avoid

These are specific to this project and stack. If you see yourself writing any of these, stop.

| Anti-pattern | Why it's wrong | What to do instead |
|---|---|---|
| `'use client'` on a page file | Makes the whole page client-side, kills RSC benefits | Extract interactive children, keep page as server |
| Arbitrary Tailwind values | Breaks the design system, inconsistent output | Use brand tokens only |
| Putting logic in `page.tsx` | Pages are composition only | Move logic to `lib/` or a dedicated component |
| `any` type | Defeats TypeScript entirely | Define or derive the type |
| Prop drilling 3+ levels | Tightly couples unrelated components | Restructure the component tree |
| Giant components (150+ lines) | Hard to read, hard to test, AI gets confused | Split into smaller focused components |
| Index as list key | Causes React reconciliation bugs | Use a stable unique identifier |
| `console.log` in code | Noise in production | Delete it before committing |
| Installing packages without reason | Bloat, security risk, maintenance burden | Ask first, justify the addition |
| Commented-out code | Clutters the codebase | Delete it — Git history exists for a reason |

---

## File and Import Conventions

### Use the `@/` path alias for all internal imports

```ts
// ❌
import { ProjectCard } from '../../../components/ui/ProjectCard'

// ✅
import { ProjectCard } from '@/components/ui/ProjectCard'
```

### Group imports: external packages first, then internal

```ts
import Image from 'next/image'
import { motion } from 'motion/react'

import { ProjectCard } from '@/components/ui/ProjectCard'
import type { Project } from '@/types'
```

### One component per file. Filename matches component name.

```
ProjectCard.tsx → exports ProjectCard
PostCard.tsx    → exports PostCard
```
