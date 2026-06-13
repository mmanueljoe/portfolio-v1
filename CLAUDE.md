# CLAUDE.md

This file is read by Claude Code at the start of every session.
Follow everything here exactly. Do not deviate without being explicitly told to.

---

## Project

Emmanuel Joe Benson's personal portfolio site.
A minimal, typographic, production-grade Next.js site built to a precise design system.

**Live brief:** `docs/project-brief.md`
**Architecture rules:** `docs/architecture.md`
**Coding standards:** `docs/coding-standards.md`
**Design system:** `docs/design-system.md`
**Decisions log:** `docs/decisions.md`

---

## Stack

Versions and rationale are recorded in `docs/decisions.md`. That file is the
source of truth for *why* each choice was made — read it before changing any
of these.

- **Package manager: pnpm.** All install/run commands use `pnpm` (`pnpm dlx`,
  `pnpm add`, `pnpm dev`). Never `npm` or `yarn` — a second lockfile is a bug.
- **Next.js 16** (App Router + Turbopack, latest stable)
- **React 19** with the **React Compiler enabled** — it auto-memoizes, so don't
  reach for `useMemo`/`useCallback` by reflex; add them only when the compiler
  provably can't help.
- TypeScript (strict mode, no `any`)
- **Tailwind CSS v4** (brand tokens only — see design system). No
  `tailwind.config.js`: tokens live in a `@theme` block in `globals.css`, and
  PostCSS uses `@tailwindcss/postcss`.
- **Biome** for lint + format (one tool, replaces ESLint + Prettier). Config in
  `biome.json`.
- **`motion`** (the renamed Framer Motion — `import { motion } from "motion/react"`).
  Animations only, added last.
- **`@next/mdx`** for the blog (local MDX files, `generateStaticParams`).
- Lucide React (icons only — Github, Linkedin, Mail, Menu, X, ArrowRight)
- `@tailwindcss/typography` (blog post body only)

---

## Hard Rules

These are non-negotiable. If you are about to break one, stop and say so.

1. **Never use arbitrary Tailwind values.** `text-[#C8924A]` is forbidden. Use tokens: `text-gold-600`.
2. **Never use `any` in TypeScript.** If you don't know the type, derive it or ask.
3. **Never put logic in a page file.** Pages are layout and composition only.
4. **Never write a component longer than 150 lines.** Split it.
5. **Never inline styles.** No `style={{}}` unless `motion` requires it for animation values.
6. **Never import from outside the defined folder structure** without flagging it first.
7. **Never add a package without asking first.** The stack is fixed.
8. **Never use `default export` for anything except page files and layout files.** Everything else is a named export.
9. **No `console.log` in committed code.**
10. **No commented-out code.** Delete it.
11. **Never use more than 8 Lucide icons total.** Icons are functional, not decorative.

---

## How to Work

- Build one section or component at a time. Do not jump ahead.
- Follow the build order in `docs/project-brief.md`.
- After each component, check: is this mobile responsive? Does it use only brand tokens?
- If something in the brief is unclear, ask before building.
- If you think a better pattern exists, say so explicitly — don't just do it silently.
- Animations come last. Build the full static site first, then layer in `motion`.

---

## What This Site Is Not

- Not a web app. No state management libraries needed.
- Not a UI component library project. No shadcn, no Radix, no Headless UI.
- Not a complex data-fetching project. Blog posts are MDX files, not a CMS call.
- Not over-engineered. If a solution feels complex, it probably is. Simplify.
