# CLAUDE.md

This file is read by Claude Code at the start of every session.
Follow everything here exactly. Do not deviate without being explicitly told to.

---

## Project

Emmanuel Joe Letsu's personal portfolio site.
A typographic, production-grade Next.js site built to a precise design system.

Currently on **brand v3.1** — white, neutral black, one violet accent, left-aligned
document layout. This replaced the v1.0 gold/parchment system; read **ADR-013**
before touching anything visual. Some older ADRs are superseded, so check the
status line on an entry before trusting it.

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
  Reveals and the scroll bar only. No hover transforms.
- **`next-themes`** for the light/dark toggle (ADR-008).
- **`@next/mdx`** for the blog (local MDX files, `generateStaticParams`).
- Lucide React — **2 of 8 used** (`Sun`, `Moon`, in the theme toggle). The v3.1 nav
  wraps instead of using a drawer, so `Menu`/`X` were freed.
- `@tailwindcss/typography` (blog post body only)

**Fonts:** DM Sans (display), Inter (body), **JetBrains Mono** (eyebrows, meta,
dates, tags — added in v3.1).

---

## Hard Rules

These are non-negotiable. If you are about to break one, stop and say so.

1. **Never use arbitrary Tailwind values.** `text-[#3B2A6B]` is forbidden — use `text-accent`. This includes fluid values: `text-[clamp(36px,5.6vw,66px)]` is forbidden, use `text-hero`. If no token exists, add one to `globals.css`.
2. **Never use `any` in TypeScript.** If you don't know the type, derive it or ask.
3. **Never put logic in a page file.** Pages are layout and composition only.
4. **Never write a component longer than 150 lines.** Split it.
5. **Never inline styles.** No `style={{}}` unless `motion` requires it for animation values.
6. **Never import from outside the defined folder structure** without flagging it first.
7. **Never add a package without asking first.** The stack is fixed.
8. **Never use `default export` for anything except page files and layout files.** Everything else is a named export.
9. **No `console.log` in committed code.**
10. **No commented-out code.** Delete it.
11. **Never use more than 8 Lucide icons total.** Icons are functional, not decorative. Currently 2/8.
12. **Never exceed four violet elements on a page.** They are spent: two wordmark stops, the hero headline stop, the primary button. Count them after any visual change.

---

## How to Work

- The site is **built and deployed**. Work is now changes to existing sections, not
  a first build — the build order in `docs/project-brief.md` is history.
- Build one section or component at a time. Do not jump ahead.
- After each change, check: does it hold at 360 / 768 / 1440? Does it work in dark
  mode? Does it use only tokens? Are there still only four violet elements?
- If something in the brief is unclear, ask before building.
- If you think a better pattern exists, say so explicitly — don't just do it silently.
- Verify visual changes in the browser before reporting them done.

---

## What This Site Is Not

- Not a web app. No state management libraries needed.
- Not a UI component library project. No shadcn, no Radix, no Headless UI.
- Not a complex data-fetching project. Blog posts are MDX files, not a CMS call.
- Not over-engineered. If a solution feels complex, it probably is. Simplify.
