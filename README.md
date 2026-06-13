# Emmanuel Joe Benson — Portfolio

A minimal, typographic personal portfolio built to a precise design system.
Single scrolling page plus an MDX blog. Production-grade by intent, not a template.

> **Status:** in active development, built section by section per
> [`docs/project-brief.md`](docs/project-brief.md). Not all build steps below are
> wired yet — the dependency list reflects what's installed today.

---

## Stack

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Server Components by default |
| UI | React 19 + React Compiler | auto-memoization; avoid manual `useMemo`/`useCallback` |
| Language | TypeScript (strict) | no `any` |
| Styling | Tailwind CSS v4 | CSS-first config in `globals.css`, no `tailwind.config.js` |
| Fonts | DM Sans + Inter | self-hosted via `next/font` |
| Lint + format | Biome | one tool, replaces ESLint + Prettier |
| Git hooks | husky + lint-staged + commitlint | format staged files, enforce Conventional Commits |
| Blog _(planned)_ | `@next/mdx` | local MDX in `content/blog/` |
| Animation _(planned)_ | `motion` | added last |

Every choice has a recorded rationale in [`docs/decisions.md`](docs/decisions.md)
(ADR-001 to ADR-009). Read it before changing any of them.

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
public/         static assets and project mockups
src/app/        App Router pages + globals.css
src/components/ layout, sections, ui, blog
src/lib/        MDX reading utilities
src/types/      shared types
```

Full folder rules: [`docs/architecture.md`](docs/architecture.md).

---

## Conventions

- **Design tokens only** — no arbitrary Tailwind values (`text-gold-600`, never
  `text-[#C8924A]`). Palette and semantic surface tokens live in `globals.css`.
- **Commits** follow Conventional Commits (`feat(scope): …`), checked by commitlint.
- The full rule set lives in [`docs/coding-standards.md`](docs/coding-standards.md)
  and [`docs/design-system.md`](docs/design-system.md).

---

## Deployment

Targets [Vercel](https://vercel.com) (build step 14, not yet live). Once set up,
pushes to `main` trigger a build — no separate CI is configured (see ADR-009).

---

## Author

**Emmanuel Joe Benson** — Software Engineer
[GitHub](https://github.com/mmanueljoe) ·
[LinkedIn](https://linkedin.com/in/emmanuel-letsu)
