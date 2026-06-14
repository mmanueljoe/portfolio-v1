# Design System

Single source of truth for all visual decisions.
Every colour, font, and spacing value used in this project lives here.
Never hardcode a value that exists in this document.

---

## Design Principles

The north star for every visual decision: **Apple's discipline, warmed up** —
Apple's focus, space, and restraint applied to a warm, literary palette instead
of a cold, clinical one. When a section decision is unclear, it obeys these five
before anything else. See ADR-010 for why.

1. **Reduce until only the essential is left.** Each section does exactly one
   job. If an element isn't carrying its weight, remove it — don't shrink it.

2. **Space is a material, not emptiness.** Whitespace is placed deliberately.
   Don't fill the page; the calm *is* the design, and it reads as confidence.

3. **Hierarchy from scale, not decoration.** Importance comes from size and
   weight — never from boxes, borders, or badges. The type carries the page.

4. **The design defers to the content.** The parchment surface is a quiet stage;
   the work and the writing are the stars. The UI never shows off over them.

5. **Say little, confidently.** Short, declarative copy. This is the one place we
   soften Apple — keep Emmanuel's reflective, human voice, just tighter. State,
   don't oversell.

**The cost:** minimalism is unforgiving. With less on screen, every remaining
element must be precise — spacing rhythm, alignment, type. Minimal is not less
work; it is less stuff, executed more carefully.

**What we deliberately do NOT take from Apple:** cinematic scroll-jacking and
marketing-speak. A visitor skims in ~30 seconds — the site stays fast, scannable,
and honest in voice.

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

Dark mode is a **user-switchable theme** (toggle in the nav). See ADR-008 for the
toggle wiring and ADR-010 for why sections no longer alternate.

**Every section sits on a single shared surface.** Per the design principles (one
calm surface, no competing bands), sections all use `bg-surface` /
`text-on-surface` — there is no light/dark alternation between them. The page
reads as one continuous warm field; separation comes from space and hairline
rules, not background blocks.

The semantic roles still exist and resolve per mode:

| Role | Light mode | Dark mode | Used for |
|---|---|---|---|
| `surface` | `parchment-100` `#FAF6EE` | `ink-900` `#1A1A18` | every section background |
| `on-surface` | `ink-900` `#1A1A18` | `parchment-200` `#F2EBD9` | primary text |
| `on-surface-muted` | `ink-600` `#555250` | `parchment-800` `#8A7A60` | secondary text |
| `surface-alt` | `parchment-300` `#E8DFC8` | `ink-800` `#2E2C2A` | subtle elevation only |
| `on-surface-alt` | `ink-900` `#1A1A18` | `parchment-200` `#F2EBD9` | text on elevated surfaces |
| `on-surface-alt-muted` | `ink-600` `#555250` | `parchment-800` `#8A7A60` | muted text on elevated surfaces |

`surface-alt` is now an **elevation** token for small raised elements (a card, the
nav glass on scroll, the footer, mockup frames) — *not* a full-section band.
`gold-600` stays constant across both modes. Raw palette tokens still exist for
one-off uses, but section backgrounds and their text use the semantic roles above.

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
- **Glassmorphism** — the centered floating nav pill only. `backdrop-blur`, `surface` at 80% opacity, hairline border. One place. Nowhere else.
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
