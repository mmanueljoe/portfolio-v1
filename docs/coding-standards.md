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
<h1 className="text-[#1A1A18] text-[64px]">

// ✅ Correct — brand tokens
<h1 className="text-ink-900 text-6xl font-display font-bold">
```

### No inline styles unless motion animation values require it

```tsx
// ❌ Forbidden
<div style={{ backgroundColor: '#FAF6EE' }}>

// ✅ Correct
<div className="bg-parchment-100">
```

### Class order convention (follow this for readability)
Layout → Sizing → Spacing → Typography → Color → Border → Effects → Responsive → State

```tsx
// Example
<p className="flex items-center w-full px-4 py-2 text-base font-body text-ink-600 border border-ink-100 rounded-md hover:text-ink-900 md:px-6">
```

### Responsive design — mobile first

Write base styles for mobile. Add breakpoint prefixes for larger screens.

```tsx
// ❌ Desktop first (don't do this)
<div className="grid-cols-2 sm:grid-cols-1">

// ✅ Mobile first
<div className="grid-cols-1 md:grid-cols-2">
```

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
