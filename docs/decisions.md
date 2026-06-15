# Decisions Log

Architecture Decision Records (ADRs) for this project. One entry per real
decision: what we chose, why, what we rejected, and what it costs us. Append
new entries at the bottom — never rewrite history. If a decision is reversed,
add a new entry that supersedes the old one and mark the old one `Superseded`.

This file answers "why is it built this way?" so a future session (or a future
you) doesn't have to reverse-engineer intent from the diff.

Format per entry: **Status · Context · Decision · Why · Alternatives · Consequences**.

---

## ADR-001 — Package manager: pnpm

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** Needed one package manager for the project. The original docs were
written without specifying one.

**Decision.** Use **pnpm** for everything: `pnpm dlx create-next-app`, `pnpm add`,
`pnpm dev`, `pnpm build`. No `npm` or `yarn` commands anywhere.

**Why.** pnpm uses a content-addressable store with hard links, so disk usage and
install times are lower than npm/yarn, and its strict `node_modules` layout stops
code from importing packages that aren't declared as direct dependencies — it
catches "phantom dependency" bugs the others let through.

**Alternatives rejected.** npm (slower, looser dependency resolution); yarn (no
strong reason to choose it over pnpm here).

**Consequences.** Only `pnpm-lock.yaml` is committed. A stray `package-lock.json`
or `yarn.lock` is a bug and should be deleted. CI and deploy must use pnpm too.

---

## ADR-002 — Next.js 16, App Router, Turbopack

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** The brief said "Next.js, App Router, latest stable" without pinning a
version. Verified the current release via Context7 at setup time.

**Decision.** Scaffold on **Next.js 16** with the **App Router** and **Turbopack**
(both the current `create-next-app` defaults). Pin the resolved version in
`package.json` so the build is reproducible.

**Why.** App Router + React Server Components is the framework's current direction
and the default for new apps; Turbopack is the default bundler in Next 16. Building
on the defaults means the most documentation, the fewest sharp edges, and no
fighting the scaffold.

**Alternatives rejected.** Pages Router (legacy for new projects).

**Consequences.** Server Components by default; `'use client'` only where
interactivity demands it (see `docs/architecture.md`). Page files stay Server
Components.

---

## ADR-003 — React 19 with the React Compiler enabled

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** React 19 ships with Next 16 and includes the React Compiler, which
auto-memoizes components at build time.

**Decision.** Enable the **React Compiler**.

**Why.** It removes most of the need for manual `useMemo`/`useCallback`, which
means less boilerplate and fewer stale-memo bugs. It's stable in React 19 and the
modern default. For a site this size the risk is negligible.

**Alternatives rejected.** Manual memoization only (more boilerplate, more room for
mistakes).

**Consequences.** Don't reach for `useMemo`/`useCallback` by reflex — add them only
when the compiler provably can't optimize a case. If a render bug ever traces back
to the compiler, this ADR is the first place to revisit.

**Required companion dependency.** Although Next 16 promotes `reactCompiler` to a
stable top-level config flag, the compiler itself still runs through Babel, so the
build hard-fails unless **`babel-plugin-react-compiler`** is present in
`node_modules`. Installed as a devDependency (`babel-plugin-react-compiler@1.0.0`)
on 2026-06-13 — it's the mandatory companion to this decision, not a separate
choice. The `reactCompiler: true` flag lives in `next.config.ts`.

---

## ADR-004 — Tailwind CSS v4 (CSS-first config), superseding the v3 plan

- **Date:** 2026-06-13
- **Status:** Accepted — supersedes the Tailwind v3 setup in `docs/design-system.md`

**Context.** `docs/design-system.md` was authored for **Tailwind v3**: a
`tailwind.config.js` file exporting `theme.extend.colors` and
`require('@tailwindcss/typography')`. The current major is **v4**, which moved
configuration out of JS and into CSS.

**Decision.** Use **Tailwind v4**. Define all brand tokens (ink / parchment / gold,
plus the two font families) in a `@theme { }` block inside `globals.css`. Import
Tailwind with `@import "tailwindcss"`. PostCSS uses `@tailwindcss/postcss`. No
`tailwind.config.js`.

**Why.** v4 is the current way to build with Tailwind, and the user asked for the
most up-to-date setup throughout. The **token names are unchanged** — `text-gold-600`,
`bg-ink-900`, `font-display` all work exactly as the design system specifies — so
Hard Rule #1 (tokens only, no arbitrary values) is fully preserved. Only the
*location and syntax* of the token definitions change.

**Alternatives rejected.** Tailwind v3, to match the docs as written — rejected
because it's the previous major and contradicts the "most updated" directive. The
doc gets updated instead.

**Consequences.** The `tailwind.config.js` block in `docs/design-system.md` is now
**stale** and must be rewritten into the v4 `@theme` form (tokens identical). Until
that rewrite lands, trust this ADR over that section.

---

## ADR-005 — Biome for lint + format, instead of ESLint + Prettier

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** The original docs implicitly assumed ESLint (the historical
`create-next-app` default) and an unstated formatter.

**Decision.** Use **Biome** (v2.2.x) for both linting and formatting. Config lives in
`biome.json`, with `vcs.useIgnoreFile: true` so it respects `.gitignore`. Scripts:
`lint`, `format`, `check`. `create-next-app` scaffolds it directly.

**Why.** One fast Rust-based tool covers what previously took ESLint + Prettier +
the config glue to stop them fighting. Fewer dependencies, one config file, faster
runs.

**Alternatives rejected.** ESLint + Prettier — more ubiquitous in existing codebases,
but two tools, more config, slower. Acceptable trade-off for a greenfield solo repo.

**Consequences.** No `.eslintrc` or `.prettierrc`. Editor format-on-save points at
Biome. Anyone joining the repo needs the Biome editor extension, not the ESLint one.

---

## ADR-006 — `motion` package (renamed Framer Motion)

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** The docs reference "Framer Motion." The library was renamed; the
maintained package is now **`motion`**, imported from `motion/react`.

**Decision.** Install **`motion`** and import `{ motion } from "motion/react"`. The
legacy `framer-motion` package name is not used.

**Why.** `motion` is the current, maintained package; `framer-motion` is the old
name. Same library, current entry point.

**Alternatives rejected.** `framer-motion` (legacy package name).

**Consequences.** All animation imports use `motion/react`. Animated components are
Client Components (`'use client'`), added in the final build step per the brief.

---

## ADR-007 — `@next/mdx` for the blog

- **Date:** 2026-06-13
- **Status:** Accepted — resolves the open MDX question in `docs/architecture.md`

**Context.** `docs/architecture.md` left the MDX renderer undecided
(`next-mdx-remote` vs `@next/mdx`). Blog posts are local `.mdx` files in
`content/blog/`, not remote/CMS content.

**Decision.** Use the official **`@next/mdx`** integration. Render posts by importing
the MDX module per route and prerender with `generateStaticParams`.

**Why.** First-party, statically compiled at build time, no runtime fetch. The site
has no remote content source, so the remote-loading advantage of `next-mdx-remote`
buys nothing here.

**Alternatives rejected.** `next-mdx-remote` — only worth it if posts ever come from
a CMS or remote store; overkill for local files.

**Consequences.** The "decide before building the blog" note in `docs/architecture.md`
is now resolved and should be updated to point here. **Open follow-up:** `@next/mdx`
does not parse frontmatter on its own. Before building the blog (brief step 10), we
must choose how `lib/blog.ts` reads title/date/description — either
`remark-frontmatter` + `remark-mdx-frontmatter`, or `gray-matter`. To be recorded as
its own ADR when decided.

---

## ADR-008 — User-switchable dark mode

- **Date:** 2026-06-13
- **Status:** Accepted — supersedes parts of `design-system.md` "Light Mode vs
  Dark Mode" and `architecture.md` "Section Alternation Pattern". Both sections
  were rewritten to the semantic-token model below on 2026-06-13; they no longer
  conflict with this ADR.
- **Visual reference:** the dark register was confirmed against a font/colour
  comparison mockup — near-black background, off-white text, gold accent, with a
  small elevation step between surfaces. Matches this spec.

**Context.** The docs already use "light" and "dark" as a *design device*: sections
alternate parchment and ink backgrounds for rhythm (Hero light, About dark, Skills
light, Projects dark, Contact light). Backgrounds are currently hard-coded per
section (`bg-parchment-100`, `bg-ink-900`). A visitor-controlled dark-mode toggle
collides with this head-on — if you naively invert each section, light↔dark, the
page just flips to dark-light-dark-light and never actually gets *darker*. "Dark
mode" and "alternation" are fighting for the same axis.

**Decision.** Resolve the collision by moving the alternation onto a **semantic
surface-token layer**, then theming those tokens per mode. Sections stop naming raw
palette colors and instead name *roles*:

- A section that is light-today uses `bg-surface` / `text-on-surface`.
- A section that is dark-today uses `bg-surface-alt` / `text-on-surface-alt`.

The two modes then define what those roles resolve to:

- **Light mode** = today's design exactly. `surface` = parchment, `surface-alt` =
  ink. High-contrast parchment/ink rhythm, unchanged.
- **Dark mode** = the *same rhythm in a dark key*. `surface` = `ink-900`,
  `surface-alt` = `ink-800` (a small **elevation** step, not a flip to light). The
  alternation survives as subtle light-on-dark contrast instead of light-vs-dark.

Each surface is paired with its own legible foreground ("on-" token), so contrast is
guaranteed in every mode without per-section guesswork.

**Tailwind v4 wiring** (verified against current docs). Class-based dark variant +
runtime-themed tokens via `@theme inline`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* class-based dark mode (toggled by next-themes adding .dark to <html>) */
@custom-variant dark (&:where(.dark, .dark *));

/* semantic roles resolve at runtime from the vars below */
@theme inline {
  --color-surface:             var(--surface);
  --color-on-surface:          var(--on-surface);
  --color-on-surface-muted:    var(--on-surface-muted);
  --color-surface-alt:         var(--surface-alt);
  --color-on-surface-alt:      var(--on-surface-alt);
  --color-on-surface-alt-muted:var(--on-surface-alt-muted);
}

:root {
  /* LIGHT — the current design */
  --surface:              #FAF6EE; /* parchment-100 */
  --on-surface:           #1A1A18; /* ink-900 */
  --on-surface-muted:     #555250; /* ink-600 */
  --surface-alt:          #1A1A18; /* ink-900 */
  --on-surface-alt:       #F2EBD9; /* parchment-200 */
  --on-surface-alt-muted: #8A7A60; /* parchment-800 */
}

.dark {
  /* DARK — same rhythm, dark register; alt is elevation not inversion */
  --surface:              #1A1A18; /* ink-900 */
  --on-surface:           #F2EBD9; /* parchment-200 */
  --on-surface-muted:     #8A7A60; /* parchment-800 */
  --surface-alt:          #2E2C2A; /* ink-800 */
  --on-surface-alt:       #F2EBD9; /* parchment-200 */
  --on-surface-alt-muted: #8A7A60; /* parchment-800 */
}
```

The raw palette tokens (`ink-900`, `parchment-100`, `gold-600`, …) still exist for
one-off uses. **`gold-600` stays constant across both modes** — the brand accent is
mode-independent, and it already reads on both parchment and ink.

**Theme management — `next-themes`** (new dependency, flagged per Hard Rule #7).
It owns the `.dark` class on `<html>`, persistence, OS-preference detection, and the
no-flash inline script that runs before paint (prevents the flash-of-wrong-theme).

- `src/app/providers.tsx` — `'use client'`, wraps children in
  `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`.
- `src/app/layout.tsx` — stays a Server Component; add `suppressHydrationWarning` to
  `<html>` (required — the pre-paint script mutates the DOM before hydration, and this
  tells React the mismatch is intentional), then render `<Providers>` around children.
- `src/components/ui/ThemeToggle.tsx` — `'use client'`, calls `useTheme()`.

**Toggle with no hydration flash.** Instead of the `mounted`-guard dance, render both
icons and let CSS pick — pure CSS, no client-only gap, no layout shift:

```tsx
<Sun className="hidden dark:block" />
<Moon className="block dark:hidden" />
```

**Alternatives rejected.**
- *Naive `dark:` inversion per section* — produces flip-not-darken; incoherent.
- *Keeping raw palette classes + `dark:` overrides on every element* — doubles every
  color class, drifts out of sync, no single source of truth. The semantic layer is
  the cost of doing it once, correctly.
- *Do nothing (ship the fixed alternating palette the docs already describe)* — a
  legitimate option. The warm parchment/ink alternation IS the brand, and a portfolio
  doesn't owe anyone a toggle. Rejected only because a toggle was explicitly requested.

**Consequences.**
- **Sections must use semantic classes** (`bg-surface`, `text-on-surface-alt`, …),
  not raw `bg-parchment-100` / `bg-ink-900`. This changes the build instructions in
  `design-system.md` and `architecture.md` — and it means **the token strategy must
  be settled before the first section (Hero, brief step 5) is built.** Retrofitting
  every section from raw palette to semantic tokens after the fact is rework.
- **Icon budget:** Hard Rule #11 caps Lucide at 8. Currently 6 are spoken for
  (Github, Linkedin, Mail, Menu, X, ArrowRight). Adding `Sun` + `Moon` brings us to
  **exactly 8 — zero headroom left.** Any future icon need would force a swap.
- The **grain overlay** ("parchment sections only") and the **glass nav**
  (`parchment-200` at 80%) are mode-specific and need dark-mode variants — grain only
  on genuinely light surfaces; nav glass becomes `ink-900` at ~80% in dark.
- `next-themes` is added to the dependency list and recorded here.

**Resolved choices:**
1. **Dark mode keeps the section rhythm via elevation** (`ink-900` base, `ink-800`
   for alternating sections) — not a flat single-surface dark.
2. **Three-way light / dark / system**, `defaultTheme="system"` — respects the
   visitor's OS preference on first load, manual override available.
3. **Sun + Moon icons** for the toggle. This brings Lucide usage to **8/8** — the
   Hard Rule #11 ceiling. No icon headroom remains; any future icon forces a swap.

---

## ADR-011 — Blog frontmatter: `gray-matter` + `remark-frontmatter`

- **Date:** 2026-06-14
- **Status:** Accepted — resolves the open follow-up in ADR-007.

**Context.** `@next/mdx` renders a post by *importing* the `.mdx` module, and it
does not parse YAML frontmatter on its own. We need two things: (a) the `---` block
kept out of the rendered body, and (b) the title/date/description available as data
for the listing page and the post header. We also build with **Turbopack**, which
only accepts MDX plugins passed as **strings** (functions can't cross into Rust).

**Decision.** Keep YAML `---` frontmatter in each post. In `next.config.ts`, pass
**`remark-frontmatter`** as a string remark plugin, so the block is parsed and never
rendered. In `lib/blog.ts`, read the same block with **`gray-matter`** (`fs` +
`matter`) for `getAllPosts()` and `getPostBySlug()`.

**Why.** Neither tool suffices alone here: `gray-matter` can't stop `@next/mdx` from
rendering the `---` (it renders by import, not from a string we could pre-strip), and
`remark-frontmatter` strips the block but doesn't hand us the values in JS. Together,
remark-frontmatter strips and gray-matter reads. Both are tiny and standard, and the
string-plugin form is mandatory for Turbopack.

**Alternatives rejected.**
- *`remark-mdx-frontmatter`* (exposes frontmatter as a module export) — would avoid
  gray-matter, but then the listing has to import and compile every post module just
  to read metadata; gray-matter reads raw files directly, simpler.
- *`export const metadata` in each MDX (no YAML)* — dependency-free, but drops the
  conventional YAML format the brief uses and puts JS into content files.

**Consequences.**
- Posts live in `content/blog/*.mdx` (root) with `---` title/date/description. A
  `@/content/*` → `./content/*` tsconfig path lets the `[slug]` route's dynamic
  `import("@/content/blog/<slug>.mdx")` resolve.
- Reading time is computed from word count in `getPostBySlug`.
- New deps: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `remark-frontmatter`,
  `gray-matter`, and `@tailwindcss/typography` (blog body, loaded via `@plugin`).

---

## ADR-009 — Git hooks: husky + lint-staged + commitlint

- **Date:** 2026-06-13
- **Status:** Accepted

**Context.** The stack (CLAUDE.md) fixes Biome as the lint/format tool but says
nothing about *when* it runs. Biome only helps if someone remembers to run it.
Separately, CLAUDE.md mandates Conventional Commits for messages, but that was
honor-system — nothing enforced it. Both are quality gates that belong at commit
time, not in a reviewer's head.

**Decision.** Add three devDependencies and wire two git hooks via **husky** (v9):

- **pre-commit** → `lint-staged` runs `biome check --write` on *staged files only*,
  so formatting/lint fixes are applied and re-staged before the commit lands.
- **commit-msg** → `commitlint` (`@commitlint/config-conventional`) rejects messages
  that don't follow Conventional Commits.

Config: hooks in `.husky/`, lint-staged config in `package.json`, commitlint in
`commitlint.config.mjs`. A `prepare: husky` script reinstalls hooks on `pnpm install`.

**Why.** These run on **Emmanuel's terminal at commit time** — which fits the commit
ownership rule exactly (Claude stages; Emmanuel commits with GPG signing). The hooks
catch unformatted code and malformed commit messages before they enter history,
where they're cheap to fix. lint-staged scopes Biome to staged files so the hook
stays fast as the repo grows.

**Alternatives rejected.**
- *CI lint job (GitHub Actions)* — redundant here: Vercel runs the build on push
  (brief step 14), and a solo portfolio doesn't need a separate CI gate yet.
- *Testing framework (Vitest/Playwright)* — no tests are specced; a typographic
  site with no app logic doesn't justify a test harness at this stage. Revisit if
  real logic (e.g. blog frontmatter parsing) earns coverage.
- *Honor-system (no hooks)* — rejected; the whole point is to not rely on memory.

**Consequences.**
- Four new devDeps: `husky`, `lint-staged`, `@commitlint/cli`,
  `@commitlint/config-conventional`. This is the stack growing beyond CLAUDE.md's
  fixed list — recorded here so the "why" is traceable (Hard Rule #7).
- The **very first commit** runs the pre-commit hook without lint-staged's stash
  backup (no `HEAD` to stash against yet) — harmless, the warning is expected.
- Anyone cloning the repo gets the hooks automatically via the `prepare` script on
  their first `pnpm install`.
- husky's `.husky/_/` internals are self-gitignored; our two hook files are tracked.

---

## ADR-010 — Design direction: Apple's discipline, warmed up

- **Date:** 2026-06-14
- **Status:** Accepted — supersedes the **section-alternation** decision in ADR-008
  (the dark-mode *toggle* from ADR-008 stays). Updates `design-system.md`
  "Light Mode vs Dark Mode" and `architecture.md` "Section Backgrounds".

**Context.** The original docs styled the page as alternating light/dark section
bands. Two problems surfaced once we had a real dark-mode toggle: (1) a dark band
in light mode now reads as *"is my theme half-broken?"* — the alternation and the
toggle fight for the same axis; and (2) alternating-color-bands is what most
portfolios do — it's generic. Emmanuel wanted something original but was clear it
should stay on his established vibe: warm, quiet, literary, typographic. We worked
the question by digesting Apple's design philosophy and adapting it.

**Decision.** Adopt a single design north star — **Apple's discipline, warmed
up** — codified as five **Design Principles** (see `design-system.md`): reduce to
essentials, space as a material, hierarchy from scale, design defers to content,
say little confidently. Concretely:

- **One calm surface.** Every section uses `bg-surface` / `text-on-surface`. No
  alternation. Separation comes from space and hairline rules, not color blocks.
- **Projects as Apple-style scenes.** One project per full-focus scene — big name,
  one or two declarative lines, a large mockup, a single gold `View project →`
  link, lots of air — instead of a dense card grid or stacked rows.
- **`surface-alt` demoted** from a dark section band to a subtle *elevation* token
  (light: `parchment-300`; dark: `ink-800`) for small raised elements (nav glass,
  footer, mockup frames).

**Why.** The warm-and-quiet vibe Emmanuel designed is rarer and stronger than the
generic dark-portfolio template, and it matches his self-description (careful,
considered). Apple's restraint executed precisely *is* the impressive part —
spectacle would fight the room. Warmth supplies the humanity Apple lacks.

**Alternatives rejected.**
- *Keep full alternation* — generic, and collides with the toggle.
- *Interactive "live tradeoff" kanban showpiece* (toggle Context/Redux/Zustand,
  watch re-renders) — genuinely original, but too loud for a quiet literary site,
  bends the "not a web app" rule, and is over-engineered for the vibe. Parked, not
  deleted; could resurface as a single restrained detail later.
- *Look like the portfolios "out there"* — explicitly rejected; matching the
  template undercuts the "I take craft seriously" message. We borrow only the
  *usability* conventions (scannable, fast, projects/skills/contact obvious), not
  the aesthetics.

**Consequences.**
- **Project copy must be trimmed** to one or two lines per scene; the full
  write-ups move behind the `View project →` link (the repo for Kanban; a small
  per-project page for EWA/Amalitech, to be specced later).
- **`globals.css` token values change**: `--surface-alt` (and its `on-` pair) move
  from the old dark-band values to the elevation values above. To be applied in
  the Hero/Projects rebuild.
- **Hero and Projects already built get refactored** onto the single-surface,
  Apple-scene model. The semantic tokens stay, but sections collapse to
  `surface` / `on-surface`.
- The five principles become the tie-breaker for every later section: *does this
  obey them?*

---

## ADR-012 — Motion: two reveal primitives, reduced-motion as a first-class branch

- **Date:** 2026-06-15
- **Status:** Accepted — implements brief step 12 and the "Animation Rules" section
  of `architecture.md`. Installs `motion` per ADR-006.

**Context.** The static site was complete (steps 1–11). The brief defers animation
to the very last build step and the design north star (ADR-010, "Apple's discipline,
warmed up") wants motion as quiet polish, not spectacle. `architecture.md` allows
exactly three things — scroll entrance fades, hover transitions, and a scroll
progress bar — and forbids looping/bouncing motion and any animation that shifts
layout or blocks reading. Sections are Server Components; `motion` needs the client.

**Decision.** Add `motion@12` and express all animation through three small Client
Component primitives, so the sections stay otherwise server-rendered and each
animation wraps *only* the element it animates (never the `<section>` band):

- **`ui/Reveal`** — a `motion.div` that fades up (`opacity 0→1`, `y 16→0`) the first
  time it scrolls into view (`whileInView` + `viewport={{ once: true }}`). Used to
  wrap the content block of Projects (label + each scene), About, Skills, Contact,
  and the blog listing.
- **`ui/Stagger` + `StaggerItem`** — a variants container that sequences its
  children on **mount** (not scroll), for the hero. The hero is above the fold, so
  scroll-triggering it would mean animating something already on screen.
- **`layout/ScrollProgress`** — a 2px `gold-600` line fixed at the top, width driven
  by `useScroll().scrollYProgress` via `scaleX`. Mounted once in the root layout.

**Reduced motion is a branch, not an afterthought.** Every primitive calls
`useReducedMotion()` and, when true, renders the final resting state with no
animated props at all (and `ScrollProgress` renders `null`). We chose the explicit
early-return over animating-to-the-same-value because it's unambiguous: a visitor
who opted out gets zero motion, full stop.

**Why these shapes.**
- `whileInView` over a manual `IntersectionObserver` + `useState` — it's the
  library's purpose-built API; hand-rolling it is more code and more bugs.
- Animate `transform`/`opacity` only — both are compositor-cheap and, crucially,
  `transform` doesn't reflow siblings, which satisfies the "no layout-shifting
  animation" rule. A `y` translate looks like movement without *being* layout.
- `once: true` — entrances fire a single time; re-animating on every scroll-by is
  exactly the fidgety behaviour the design brief rejects.

**Alternatives rejected.**
- *CSS-only `@keyframes` + scroll-driven animations* — no dependency, but `motion`
  is already in the fixed stack (ADR-006), gives one consistent reduced-motion path,
  and the `useScroll` progress bar is far simpler than the CSS equivalent today.
- *One big `motion`-wrapped section component* — violates "wrap only the element
  being animated"; the primitives keep the blast radius small and reusable.
- *Per-letter hero reveal / parallax / scroll-linked section effects* (the
  "expressive" option) — rejected as too loud for a quiet typographic site.

**Consequences.**
- New runtime dependency: `motion@12.40.0`. Recorded here and resolves the
  "added in the final build step" note in ADR-006.
- `HeroSection` and `ProjectScene` become Client Components (`'use client'`) — the
  first client sections on the page. Acceptable: they're leaf presentation, no data
  fetching moves client-side.
- Scroll reveals depend on JS — with JS disabled, `Reveal` content starts at
  `opacity: 0` and never animates in. Accepted trade-off for a JS-rendered Next.js
  site; reduced-motion users are covered by the explicit branch above.
- `ScrollProgress` sits at `z-50` (same as the nav). They don't overlap — the bar
  is at `top-0`, the nav pill at `top-4` — so no arbitrary z-index was needed.
