# Emmanuel Joe Letsu — Portfolio

A typographic personal portfolio built to a precise design system. Single
scrolling page plus an MDX blog. Production-grade by intent, not a template.

> **Status:** built and deployed. Currently on **brand v3.1** — white, neutral
> black, one violet accent, left-aligned document layout. See
> [ADR-013](docs/decisions.md) for the migration off the v1.0 gold/parchment
> system, and [`docs/design-system.md`](docs/design-system.md) for every value.

---

## Stack

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Server Components by default |
| UI | React 19 + React Compiler | auto-memoization; avoid manual `useMemo`/`useCallback` |
| Language | TypeScript (strict) | no `any` |
| Styling | Tailwind CSS v4 | CSS-first config in `globals.css`, no `tailwind.config.js` |
| Fonts | DM Sans + Inter + JetBrains Mono | self-hosted via `next/font` |
| Theming | `next-themes` | class-based light/dark, no flash |
| Lint + format | Biome | one tool, replaces ESLint + Prettier |
| Git hooks | husky + lint-staged + commitlint | format staged files, enforce Conventional Commits |
| Blog | `@next/mdx` + `gray-matter` | local MDX in `content/blog/` |
| Animation | `motion` | reveals only, reduced-motion respected |

Every choice has a recorded rationale in [`docs/decisions.md`](docs/decisions.md)
(ADR-001 to ADR-013). Read it before changing any of them — ADR-010 is superseded
by ADR-013, so check status lines before trusting an entry.

---

## Getting started

**Prerequisites:** Node.js 20.9+ (developed on 24) and **pnpm 10+**. This repo is
pnpm-only — `npm` or `yarn` will create a second lockfile, which is a bug (ADR-001).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Does |
|---|---|
| `pnpm dev` | start the dev server (Turbopack) |
| `pnpm build` | production build |
| `pnpm start` | serve the production build |
| `pnpm lint` | Biome check (lint + format diff) |
| `pnpm format` | Biome write (apply formatting) |

Git hooks install automatically on `pnpm install` (via the `prepare` script):
the pre-commit hook runs Biome on staged files, and the commit-msg hook enforces
Conventional Commits.

---

## Structure

```
content/blog/   MDX blog posts (one file per post)
docs/           project brief, architecture, standards, design system, ADRs
public/         static assets and project screenshots
src/app/        App Router pages + globals.css (all design tokens)
src/components/ layout, sections, ui, blog
src/lib/        blog reading, nav links, project content, site constants
src/types/      shared types
```

Full folder rules: [`docs/architecture.md`](docs/architecture.md).

---

## Conventions

- **Design tokens only** — no arbitrary Tailwind values (`text-accent`, never
  `text-[#3B2A6B]`; `text-hero`, never `text-[clamp(...)]`). Palette, type scale,
  measures and spacing all live in `globals.css`.
- **Four violet elements per page**, no more. Count them after any visual change.
- **Commits** follow Conventional Commits (`feat(scope): …`), checked by commitlint.
- The full rule set lives in [`docs/coding-standards.md`](docs/coding-standards.md)
  and [`docs/design-system.md`](docs/design-system.md).

---

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger a build — no
separate CI is configured (see ADR-009). The canonical site URL is derived from
`VERCEL_PROJECT_PRODUCTION_URL` in `src/lib/site.ts`.

---

## Author

**Emmanuel Joe Letsu** — Software Engineer
[GitHub](https://github.com/mmanueljoe) ·
[LinkedIn](https://linkedin.com/in/mmanueljoe)
