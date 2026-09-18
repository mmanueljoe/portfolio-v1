# Design System

Brand **v3.1** (September 2026). Single source of truth for all visual decisions.
Every colour, font, and spacing value used in this project lives here.
Never hardcode a value that exists in this document.

> Supersedes the v1.0 gold/parchment system. See **ADR-013** in `docs/decisions.md`
> for why it changed and what it replaced. The reference bundle
> (`brand-guide-v3.html` and `Portfolio Site - Redesign.dc.html`) is the origin of
> every value below.

---

## Design Principles

The page is a **document, not a landing page**. Five rules decide anything this
doc doesn't cover:

1. **Anchor everything to a left rail.** Content is left-aligned. Centred text has
   no left edge, so the eye has nothing to follow down the page. The 1120px measure
   is centred; the content inside it is not.

2. **Hierarchy comes from scale, and the scale must actually move.** A hero at 66px
   and a section head at 32px are different *kinds* of thing. If two elements are
   near the same size, one of them is wrong.

3. **Structure comes from rules and space, not boxes.** A 2px rule under a section
   head, a 1px hairline between rows. No cards, no shadows, no gradients, no large
   radii.

4. **The accent is rare or it is nothing.** Four violet elements per page. That
   scarcity is the entire reason violet reads as deliberate.

5. **Say little, confidently.** Short, declarative copy in Emmanuel's voice. State,
   don't oversell.

**The cost:** with this little decoration, every remaining element must be precise.
Spacing rhythm, alignment and type carry the whole page.

---

## Colour Palette

Two ramps and one accent. Everything is built from these.

### Ink (neutral greys — does ~96% of the work)

| Token | Hex | Use |
|---|---|---|
| `ink-0` | `#FFFFFF` | Page |
| `ink-50` | `#FAFAFA` | Surface, row hover, screenshot bed |
| `ink-100` | `#F2F2F2` | Hover |
| `ink-200` | `#E4E4E4` | Border |
| `ink-300` | `#C9C9C9` | Divider, muted text on dark |
| `ink-400` | `#9E9E9E` | Disabled, meta on the dark band |
| `ink-500` | `#6E6E6E` | Muted text — captions only, never paragraphs |
| `ink-600` | `#4A4A4A` | Body text |
| `ink-700` | `#2C2C2C` | Heading |
| `ink-800` | `#1A1A1A` | Dark elevation |
| `ink-900` | `#111111` | Black |

### Violet (accent — use sparingly)

| Token | Hex | Use |
|---|---|---|
| `violet-50` | `#F3F1FA` | |
| `violet-100` | `#E3DFF2` | Accent hover on dark |
| `violet-200` | `#C4BCE4` | **The accent in dark mode**, `::selection` |
| `violet-300` | `#A296D2` | |
| `violet-400` | `#7E6FBD` | |
| `violet-500` | `#5E4E9E` | |
| `violet-600` | `#3B2A6B` | **The accent in light mode** |
| `violet-700` | `#2F2156` | |
| `violet-800` | `#241940` | Accent hover on light |
| `violet-900` | `#18112B` | |

### Parchment (print only)

| Token | Hex | Use |
|---|---|---|
| `parchment` | `#F2EBD9` | **Print only. Never render on screen.** |

### The Four-Accent Rule

**At most four violet elements per page.** On the home page they are exactly:

1. The nav wordmark stop
2. The hero headline stop
3. The primary button background
4. The footer wordmark stop

Do not add a fifth. Link hovers may go violet, because only one hover exists at a
time. The "open to work" dot is **black, not violet** — it would break the budget.
The scroll progress bar is `on-surface` for the same reason (ADR-013).

After any visual change, count them.

### Contrast (calculated)

Black on white 18.9:1 · `#4A4A4A` on white 8.9:1 · `#6E6E6E` on white 4.6:1
(captions only) · violet on white 12.3:1 · white on violet 12.3:1 · `#C9C9C9` on
black 11.5:1 · `#C4BCE4` on black 10.6:1 · `#9E9E9E` on black 7.1:1.

---

## Semantic Roles

**Components use these, never raw ramp stops**, so the light/dark swap happens in
one place. Declared in `globals.css` via `@theme inline` (ADR-008).

| Role | Light | Dark | Used for |
|---|---|---|---|
| `surface` | `#FFFFFF` | `#111111` | Page and section backgrounds |
| `on-surface` | `#111111` | `#FFFFFF` | Primary text, 2px rules |
| `on-surface-muted` | `#4A4A4A` | `#C9C9C9` | Body and secondary text |
| `surface-alt` | `#111111` | `#1A1A1A` | The Skills band only |
| `on-surface-alt` | `#FFFFFF` | `#FFFFFF` | Text on the band |
| `on-surface-alt-muted` | `#C9C9C9` | `#9E9E9E` | Muted text on the band |
| `accent` | `#3B2A6B` | `#C4BCE4` | The four violet elements |
| `accent-hover` | `#241940` | `#E3DFF2` | Primary button hover |
| `on-accent` | `#FFFFFF` | `#111111` | Text on the accent fill |
| `hairline` | `#E4E4E4` | `#4A4A4A` | 1px borders |
| `hairline-alt` | `#4A4A4A` | `#4A4A4A` | 1px borders inside the band |
| `row-hover` | `#FAFAFA` | `#1A1A1A` | Writing row hover fill |
| `shot-bed` | `#FAFAFA` | `#1A1A1A` | Behind a contained screenshot |

`row-hover` and `shot-bed` exist because the reference's literal `#FAFAFA` would
flash white on a black page (ADR-013). The accent **swaps** between modes —
`violet-600` is too close to black to register on a dark surface.

**Sections do not alternate.** Exactly one section — Skills — sits on
`surface-alt`, full-bleed. That single inversion is the page's one change of
ground.

---

## Typography

### Fonts

| Font | Variable | Role |
|---|---|---|
| DM Sans | `--font-display` / `font-display` | Headings, wordmark, skill terms |
| Inter | `--font-body` / `font-body` | Body text, links, buttons |
| JetBrains Mono | `--font-mono` / `font-mono` | Eyebrows, meta, dates, numerals, tags |

**Rule:** big and expressive → DM Sans. Reading → Inter. Small, precise and
labelling → JetBrains Mono.

### Type Scale

Every role is a named token carrying its own size, line-height and tracking — so
one class sets all three. **Never write an arbitrary size.**

| Class | Family | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| `text-hero` | DM Sans | `clamp(36px, 5.6vw, 66px)` | 700 | 1.06 | -0.04em |
| `text-footer-head` | DM Sans | `clamp(30px, 4.6vw, 48px)` | 700 | 1.05 | -0.04em |
| `text-section` | DM Sans | `clamp(24px, 3vw, 32px)` | 600 | — | -0.03em |
| `text-project` | DM Sans | `clamp(22px, 2.6vw, 30px)` | 600 | — | -0.03em |
| `text-quote` | DM Sans | `clamp(22px, 3vw, 30px)` | 500 | 1.32 | -0.025em |
| `text-wordmark` | DM Sans | 22px | 700 | — | -0.04em |
| `text-post-title` | DM Sans | 21px | 500 | 1.3 | -0.025em |
| `text-wordmark-sm` | DM Sans | 17px | 700 | — | -0.04em |
| `text-skill-term` | DM Sans | 17px | 600 | — | — |
| `text-lede` | Inter | 18.5px | 400 | 1.6 | — |
| `text-footer-lede` | Inter | 17px | 400 | 1.6 | — |
| `text-body` | Inter | 16.5px | 400 | 1.65 | — |
| `text-about` | Inter | 16.5px | 400 | 1.7 | — |
| `text-about-sub` | Inter | 16px | 400 | 1.65 | — |
| `text-skill-value` | Inter | 15.5px | 400 | 1.7 | — |
| `text-post-desc` | Inter | 15.5px | 400 | 1.6 | — |
| `text-where` | Inter | 15.5px | 400 | 1.55 | — |
| `text-fact` | Inter | 15px | 400 | 1.55 | — |
| `text-nav` | Inter | 14.5px | 400 | — | — |
| `text-note` | Inter | 14.5px | 400 | 1.6 | — |
| `text-link` | Inter | 14px | 400 | — | — |
| `text-button` | Inter | 13px | 500 | — | uppercase + `tracking-tag` |
| `text-date` | JetBrains Mono | 11.5px | 400 | — | — |
| `text-meta` | JetBrains Mono | 11px | 400 | — | per role, below |
| `text-tag` | JetBrains Mono | 10.5px | 400 | — | per role, below |

Sizes repeat at 16.5px and 15.5px with **different line heights** — that's
deliberate, not duplication. Pick by role, not by number.

### Mono tracking

Letter-spacing varies by what the mono text is doing:

| Class | Value | Used for |
|---|---|---|
| `tracking-tag` | 0.06em | Stack tags, button labels |
| `tracking-pill` | 0.08em | The "open to work" pill, copyright |
| `tracking-meta` | 0.1em | Section meta, fact terms, footer labels |
| `tracking-kicker` | 0.12em | Project kickers (`01 / PROFESSIONAL`) |
| `tracking-eyebrow` | 0.14em | The hero eyebrow |

### Wordmark

`Joe` in DM Sans 700 at `-0.04em`, followed by a full stop in `accent`. Nav at
22px, footer at 17px. **The stop is never dropped and never recoloured.** It counts
against the four-accent budget in both places. Rendered by `ui/Wordmark`.

---

## Spacing & Layout

### Measures

All named tokens — use `max-w-*`, never a raw `ch` or `px` value.

| Token | Value | Holds |
|---|---|---|
| `max-w-page` | 1120px | Every section's inner content |
| `max-w-hero-head` | 24ch | The hero h1 |
| `max-w-hero-lede` | 46ch | The hero lede |
| `max-w-quote` | 26ch | The About pull quote |
| `max-w-quote-sub` | 46ch | The paragraph under the quote |
| `max-w-prose` | 54ch | Project body paragraphs |
| `max-w-prose-wide` | 58ch | About body paragraphs |
| `max-w-footer-lede` | 42ch | The footer paragraph |
| `max-w-post-desc` | 50ch | Writing row descriptions |

### Rhythm

| Token | Value | Use |
|---|---|---|
| `gutter` | `clamp(20px, 4vw, 56px)` | Page side padding — **every section** |
| `section` | `clamp(56px, 8vw, 96px)` | Section vertical padding |
| `hero-top` | `clamp(60px, 10vw, 128px)` | Hero top padding |
| `hero-bottom` | `clamp(52px, 8vw, 88px)` | Hero bottom padding |
| `hero-row` | `clamp(32px, 5vw, 52px)` | Above the hero's two-column row |
| `entry` | `clamp(52px, 7vw, 92px)` | Between project entries |
| `entry-col` | `clamp(28px, 4vw, 56px)` | Inside a project entry |
| `pair-col` | `clamp(28px, 5vw, 64px)` | Hero and About column gap |
| `footer-top` | `clamp(56px, 8vw, 92px)` | Footer top padding |
| `footer-col` | `clamp(32px, 5vw, 72px)` | Footer column gap |
| `bottom-bar` | `clamp(40px, 6vw, 72px)` | Above the footer bottom bar |
| `nav-gap` | `clamp(16px, 2.6vw, 30px)` | Between nav links |

Values that land on Tailwind v4's numeric spacing scale use it directly —
`py-1.75` (7px), `gap-4.5` (18px), `gap-5.5` (22px), `min-w-7.5` (30px),
`px-6.5 py-3.75` (26/15px). Don't invent a token for something the scale already
expresses.

### Grids

Every two-column block is `auto-fit` with a `minmax` floor, so it collapses to one
column with **no media queries**. Declared as `@utility` classes because the floor
differs per block:

| Class | Floor | Used by |
|---|---|---|
| `grid-pair-hero` | 290px | Hero lede / buttons |
| `grid-pair-entry` | 300px | Project entries, About |
| `grid-pair-contact` | 280px | Footer |
| `grid-pair-skills` | 260px | Skills rows |
| `grid-pair-post` | 240px | Writing rows |
| `grid-facts` | `96px 1fr` | Project fact lists |

---

## Visual Rules

- **No gradients. No shadows.** Flat only, in both modes.
- **Corner radius is 2px everywhere** — `rounded-brand`. No large radii.
- **Borders are 1px `hairline`**, except section heads, which sit under a **2px
  solid `on-surface`** rule.
- **No glassmorphism.** The floating nav pill is gone; the nav is a flat bar with a
  hairline bottom border.
- **No grain texture.** Dropped with the parchment palette.
- **Screenshots use `object-contain`, not `cover`**, on a `shot-bed` ground at
  `aspect-shot` (16/10). The screenshots have different aspect ratios and cover
  crops them badly.
- **Hairlines on rows, not containers.** A container background showing through a
  grid `gap` leaves a visible plate whenever `auto-fit` resolves to a column count
  that doesn't divide the row count. Put the border on the row.
- **Alignment is everything.** Left rail, everything on the 1120px measure.

---

## Component Specs

All of these exist as components — use them rather than re-deriving the classes.

### Wordmark — `ui/Wordmark`

```tsx
<Wordmark size="nav" />     // 22px, in the nav
<Wordmark size="footer" />  // 17px, in the footer bottom bar
```

### Section head — `ui/SectionHead`

Heading, a hairline that eats the remaining width, then optional mono meta. A 2px
`on-surface` rule sits above it on light sections; the dark band omits it, because
the background change already separates.

```tsx
<SectionHead title="Selected work" meta="THREE PROJECTS" />
<SectionHead title="Skills" meta="SORTED HONESTLY" tone="alt" />
```

### Buttons — `ui/ButtonLink`

```tsx
<ButtonLink href="/#work" variant="primary">See the work</ButtonLink>
<ButtonLink href={SITE.cvPath} variant="secondary" external>Download CV</ButtonLink>
```

- **primary** — `bg-accent` / `text-on-accent`, hover `accent-hover`. **This is one
  of the four violet elements.** One per page.
- **secondary** — 1px `on-surface` border, transparent fill; inverts to
  `bg-on-surface` / `text-surface` on hover.
- `size="roomy"` (26/15px) for the footer email button; default is 24/14px.

### Text link — `ui/TextLink`

A hairline under the text; both text and border go `accent` on hover. `size="nav"`
is 14.5px muted (hero socials), `size="link"` is 14px ink (project repo links).

### Status pill — `ui/Badge`

1px `hairline` border, 2px radius, a **black** 6px dot, mono 10.5px
`tracking-pill` label.

```tsx
<Badge>OPEN TO WORK</Badge>
```

### Stack tag

Mono 10.5px `tracking-tag`, `on-surface-muted`, 1px `hairline` border, 2px radius,
`px-2.5 py-1.25`. Inline in `sections/ProjectEntry`.

---

## Interactions

- **Transitions:** `colors` only, 150ms, default easing. No transforms, no lifts,
  no shadow changes.
- **Hover:** nav links `on-surface-muted` → `on-surface`. Primary button → 
  `accent-hover`. Outlined buttons invert. Text links → `accent`. Writing rows fill
  `row-hover`.
- **Reveals:** `ui/Reveal` and `ui/Stagger` (ADR-012). Opacity plus a small Y
  translate, once. `useReducedMotion` renders the resting state with no animation.
- **Scroll progress:** 2px `on-surface` bar, `ScrollProgress` in the root layout.
- **Responsive:** every grid is `auto-fit` with a `minmax` floor, so there are no
  media queries and no fixed widths or heights. Check 360, 768 and 1440.

---

## Tailwind Token Reference (v4)

Tokens are declared in `@theme` blocks in `src/app/globals.css` — there is no
`tailwind.config.js` (ADR-004). `--color-accent` produces `bg-accent` /
`text-accent` / `border-accent`; `--text-hero` produces `text-hero` carrying its
line-height and tracking; `--container-prose` produces `max-w-prose`;
`--spacing-section` produces `py-section` / `gap-section`; `--radius-brand`
produces `rounded-brand`; `--aspect-shot` produces `aspect-shot`.

Custom multi-property utilities (the `auto-fit` grids) use `@utility`.

**Read `src/app/globals.css` for the authoritative values.** This document
describes the system; that file *is* it.
