# Design System

Single source of truth for all visual decisions.
Every colour, font, and spacing value used in this project lives here.
Never hardcode a value that exists in this document.

---

## Colour Palette

Three colour families. Everything is built from these.

### Ink (warm blacks and greys)

| Token | Hex | Use |
|---|---|---|
| `ink-50` | `#F5F3F0` | Hover tints |
| `ink-100` | `#E0DDD8` | Borders |
| `ink-200` | `#B8B4AE` | Disabled states |
| `ink-400` | `#888480` | Muted text |
| `ink-600` | `#555250` | Body text |
| `ink-800` | `#2E2C2A` | Headlines |
| `ink-900` | `#1A1A18` | Core — primary dark, dark section backgrounds |

### Parchment (warm off-whites)

| Token | Hex | Use |
|---|---|---|
| `parchment-50` | `#FDFBF7` | Near white |
| `parchment-100` | `#FAF6EE` | Page backgrounds, light section backgrounds |
| `parchment-200` | `#F2EBD9` | Core — primary parchment, text on dark backgrounds |
| `parchment-300` | `#E8DFC8` | Cards and surfaces |
| `parchment-400` | `#D8CDB0` | Dividers |
| `parchment-600` | `#C0B090` | Borders on dark backgrounds |
| `parchment-800` | `#8A7A60` | Muted text on dark backgrounds |

### Gold (accent — use sparingly)

| Token | Hex | Use |
|---|---|---|
| `gold-50` | `#FDF4E8` | Subtle background tint |
| `gold-100` | `#F5DFB0` | Light fill |
| `gold-200` | `#E8C070` | Highlight |
| `gold-400` | `#D4A853` | Hover state |
| `gold-600` | `#C8924A` | Core — primary accent, CTAs, links, badges |
| `gold-800` | `#A06A28` | Gold on light backgrounds |
| `gold-900` | `#704A18` | Deep shadow |

### The Gold Rule

**One gold accent per layout section. Two at most.** Gold works because it's rare. Use it on:
- The primary CTA button hover state
- Link hover underlines
- The availability badge
- Section label text

Never use gold as a background. Never on multiple elements at once.

---

## Light Mode vs Dark Mode

Dark mode is a **user-switchable theme** (toggle in the nav), not a fixed design
device. See ADR-008 in `docs/decisions.md` for the full rationale and the
Tailwind v4 wiring; this section is the visual reference for what the tokens
resolve to.

The trick: the site's section rhythm (alternating light/dark backgrounds) and a
user dark-mode toggle both want the same light↔dark axis. If you naively invert
each section, the page flips light-dark-dark-light and never actually gets
*darker*. We resolve that by alternating on a **semantic surface layer** instead
of raw palette colors, then theming those roles per mode.

Sections name **roles**, never raw palette colors:

- A light-today section uses `bg-surface` / `text-on-surface` (+ `text-on-surface-muted`).
- A dark-today section uses `bg-surface-alt` / `text-on-surface-alt` (+ `text-on-surface-alt-muted`).

Each mode defines what those roles resolve to. Dark mode is the *same rhythm in a
dark key* — `surface-alt` is a small **elevation** step above `surface`, not a
flip back to light.

| Role | Light mode | Dark mode |
|---|---|---|
| `surface` | `parchment-100` `#FAF6EE` | `ink-900` `#1A1A18` |
| `on-surface` | `ink-900` `#1A1A18` | `parchment-200` `#F2EBD9` |
| `on-surface-muted` | `ink-600` `#555250` | `parchment-800` `#8A7A60` |
| `surface-alt` | `ink-900` `#1A1A18` | `ink-800` `#2E2C2A` |
| `on-surface-alt` | `parchment-200` `#F2EBD9` | `parchment-200` `#F2EBD9` |
| `on-surface-alt-muted` | `parchment-800` `#8A7A60` | `parchment-800` `#8A7A60` |

**`gold-600` is mode-independent** — the brand accent stays constant in both
modes (it already reads on parchment and on ink). The raw palette tokens
(`ink-900`, `parchment-100`, …) still exist for one-off uses, but section
backgrounds and their text must use the semantic roles above.

---

## Typography

### Fonts

| Font | Source | Variable | Role |
|---|---|---|---|
| DM Sans | Google Fonts | `--font-display` / `font-display` | Headings, name, titles |
| Inter | Google Fonts | `--font-body` / `font-body` | Body text, labels, code |

**Rule:** Big and expressive → DM Sans. Small and precise → Inter.

### Type Scale

| Name | Font | Size | Weight | Line Height | Use |
|---|---|---|---|---|---|
| Display | DM Sans | 56–64px (`text-6xl`) | 700 | 1.1 | Hero name |
| H1 | DM Sans | 36–40px (`text-4xl`) | 600 | 1.2 | Page titles |
| H2 | DM Sans | 24–28px (`text-2xl`) | 600 | 1.3 | Section headings |
| H3 | DM Sans | 18–20px (`text-xl`) | 500 | 1.4 | Sub-sections, project titles |
| Body | Inter | 15–16px (`text-base`) | 400 | 1.6 | Paragraphs |
| Small | Inter | 12–13px (`text-sm`) | 400 | 1.5 | Captions, metadata, dates |
| Label | Inter | 11–12px (`text-xs`) | 500 | 1.4 | Tags, badges, stack pills |
| Code | Inter | 13–14px (`text-sm`) | 400 | 1.6 | Inline code |

---

## Spacing & Layout

### Max widths

| Context | Max width |
|---|---|
| About section text | 640–720px (`max-w-2xl` or `max-w-3xl`) |
| Blog post body | 65–75 character line length (`max-w-prose`) |
| Section inner content | `max-w-6xl` with `mx-auto` |

### Section padding

Sections use generous vertical padding. Minimum `py-24` (`6rem`). Hero is `min-h-screen`.
- **Section borders** — a single 1px `ink-100` border-top on each section that sits on a
  parchment background. No border needed on ink sections, the background contrast is enough.

### Grid

Skills section: `grid-cols-1 md:grid-cols-2 gap-8`
Projects section: `grid-cols-1 md:grid-cols-3 gap-8`

---

## Visual Rules

- **No gradients.** Flat backgrounds only.
- **No decorative borders.** Borders only serve structure.
- **No drop shadows** unless extremely subtle (0–2px, low opacity) on project mockup images.
- **No icon libraries.** Text and typography carry the page.
- **Subtle grain texture** — CSS noise overlay on parchment sections only. Implementation:
  add a `::before` pseudo-element to parchment section wrappers with
  `background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.4'/></svg>")`,
  `opacity: 0.03`, `pointer-events: none`, `position: absolute`, `inset: 0`.
  Parchment sections only, never on ink sections.
- **Glassmorphism** — nav bar on scroll only. `backdrop-blur`, `parchment-200` at 80% opacity, subtle bottom border. One place. Nowhere else.
- **Alignment is everything.** Everything on a grid. Nothing floating.
- **One focal point per section.** One heading. One CTA. One accent. Hierarchy, not noise.

---

## Component Visual Specs

### CTA Button

```tsx
// Default state
className="bg-ink-900 text-parchment-200 font-body font-medium px-6 py-3 rounded-md transition-colors duration-200"

// Hover state
className="hover:bg-gold-600 hover:text-parchment-100"
```

### Availability Badge

```tsx
// Small gold pulsing dot + label
<span className="flex items-center gap-2 text-xs font-body font-medium text-gold-600">
  <span className="w-2 h-2 rounded-full bg-gold-600 animate-pulse" />
  Open to work
</span>
```

### Stack Tag (project skill pills)

```tsx
className="text-xs font-body font-medium bg-ink-800 text-parchment-200 px-3 py-1 rounded-full"
```

### Section Label (above section headings)

```tsx
className="text-xs font-body font-medium uppercase tracking-widest text-gold-600"
```

### Nav Link

```tsx
// Default
className="text-sm font-body font-medium text-ink-600 hover:text-ink-900 transition-colors duration-150"

// On dark nav background
className="text-sm font-body font-medium text-parchment-400 hover:text-parchment-100 transition-colors duration-150"
```

---

## Tailwind Token Reference (v4)

We use **Tailwind v4**, which is configured in CSS, not JavaScript. There is no
`tailwind.config.js`. Tokens are declared in a `@theme` block in
`src/app/globals.css`, and Tailwind generates the matching utilities
automatically — `--color-gold-600` produces `bg-gold-600`, `text-gold-600`,
`border-gold-600`; `--font-display` produces `font-display`. The token *names*
are identical to the old config, so every class in this doc works unchanged.

Set this up in step 1 before building anything. See ADR-004 in
`docs/decisions.md` for why we moved off the v3 JS config.

```css
/* src/app/globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Ink — warm blacks and greys */
  --color-ink-50:  #F5F3F0;
  --color-ink-100: #E0DDD8;
  --color-ink-200: #B8B4AE;
  --color-ink-400: #888480;
  --color-ink-600: #555250;
  --color-ink-800: #2E2C2A;
  --color-ink-900: #1A1A18;

  /* Parchment — warm off-whites */
  --color-parchment-50:  #FDFBF7;
  --color-parchment-100: #FAF6EE;
  --color-parchment-200: #F2EBD9;
  --color-parchment-300: #E8DFC8;
  --color-parchment-400: #D8CDB0;
  --color-parchment-600: #C0B090;
  --color-parchment-800: #8A7A60;

  /* Gold — accent, use sparingly */
  --color-gold-50:  #FDF4E8;
  --color-gold-100: #F5DFB0;
  --color-gold-200: #E8C070;
  --color-gold-400: #D4A853;
  --color-gold-600: #C8924A;
  --color-gold-800: #A06A28;
  --color-gold-900: #704A18;

  /* Fonts — wired to the next/font CSS variables set in layout.tsx */
  --font-display: var(--font-dm-sans), sans-serif;
  --font-body:    var(--font-inter), sans-serif;
}
```

The `@tailwindcss/typography` plugin is loaded via `@plugin` (the v4 way) and
applies to the blog post body only. The `--font-*` tokens point at the CSS
variables that `next/font` generates in `layout.tsx`, so the fonts stay
self-hosted and optimized rather than pulled from a `<link>`.
