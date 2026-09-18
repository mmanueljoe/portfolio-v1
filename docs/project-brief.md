# Project Brief

Emmanuel Joe Letsu's personal portfolio site. Every decision has been made here.
Open this at the start of every build session.

> **Brand v3.1 (September 2026).** The site was rebuilt onto a new brand — white,
> neutral black, one violet accent, left-aligned document layout. The section specs
> below are current as of that rebuild. See **ADR-013** in `docs/decisions.md` for
> what changed and why, and `docs/design-system.md` for every value.

---

## Identity

- **Name on site:** Emmanuel Joe Letsu
- **Wordmark:** `Joe.` — the full stop is always the violet accent
- **Title:** Software Engineer
- **Location:** Accra, Ghana
- **Email:** emmanuelletsu18@gmail.com
- **GitHub:** github.com/mmanueljoe
- **LinkedIn:** linkedin.com/in/mmanueljoe

---

## Site Structure

```
yoursite.com              → main scrolling single page
yoursite.com/blog         → blog listing page
yoursite.com/blog/[slug]  → individual blog post
```

---

## Navigation

- **Flat full-width bar** with a 1px `hairline` bottom border, content constrained
  to 1120px, 20px vertical padding. Not a floating pill, not glass.
- **Wordmark** `Joe.` on the left, links to top.
- **Links:** Work · About · Skills · Writing · Contact, then the "OPEN TO WORK"
  pill and the theme toggle.
- **The pill:** 1px hairline border, 2px radius, a **black** 6px dot (violet would
  break the four-accent budget), mono `OPEN TO WORK` label.
- **Mobile:** the bar **wraps** onto more rows. No drawer, no menu state — which is
  why `Nav` is a Server Component.

---

## Build Order

Steps 1–14 are **complete**; the site is built and deployed. The v3.1 rebuild
(ADR-013) re-ran steps 1 and 4–9 on the new brand.

```
1.  Project setup + Tailwind brand tokens          ✅ (rebuilt, v3.1)
2.  Font imports in layout.tsx                     ✅ (+ JetBrains Mono, v3.1)
3.  Global CSS base styles                         ✅
4.  Nav component                                  ✅ (rebuilt as a flat bar)
5.  Hero section                                   ✅ (rebuilt, left-aligned)
6.  Work section (was Projects)                    ✅ (rebuilt)
7.  About section                                  ✅ (rebuilt, two columns)
8.  Skills section                                 ✅ (rebuilt, inverted band)
9.  Contact                                        ✅ (merged into SiteFooter)
10. Blog listing page (/blog)                      ✅
11. Blog post page (/blog/[slug])                  ✅
12. motion animations                              ✅
13. Mobile responsive pass                         ✅ (360 / 768 / 1440)
14. Deploy to Vercel                               ✅
```

**Writing** (`#writing`) was added in v3.1 — an on-page section listing posts,
which links through to `/blog/[slug]`.

---

## Section Specs


Copy is final — it lives in `src/lib/projects.ts` and the section components.
**All visual values live in `docs/design-system.md`**; this file describes intent
and content, not pixels.

### Hero

Left-aligned, not centred. Not full viewport height.

```
EMMANUEL JOE LETSU, SOFTWARE ENGINEER, ACCRA        ← mono eyebrow

I build software the way I'd want to inherit it.    ← the stop is violet

Full stack, from the API to the     [SEE THE WORK] [DOWNLOAD CV]
interface. I care about the parts   GitHub  LinkedIn  Email
nobody sees, because that's
usually where the trouble starts.
```

The lede and the button/social stack sit in a two-column row, bottom-aligned.
`SEE THE WORK` is the primary (violet) button — one of the four accent elements.

---

### Selected work (`#work`)

Three entries. Each is a two-column grid: screenshot left, text right. Order:
mono kicker (`01 / PROFESSIONAL`), title, two body paragraphs, a fact list, then
a tag row with any links.

Screenshots are `object-contain` on a 16/10 bed — they have different aspect
ratios and `cover` crops them badly.

| # | Kicker | Title | Image |
|---|---|---|---|
| 01 | PROFESSIONAL | Putting the right person on the right project | `rms.png` |
| 02 | TEAM PRODUCT | Ping, a notice board for a neighbourhood | `ping-home.png` |
| 03 | ON PURPOSE | The same board, three times | `kanban.png` |

Each entry carries **two facts** — a `MY PART` / `MY ROLE` / `FINDING` line and a
second that says what was hard or what it taught. That second line is the point of
the section: it's what makes the work legible as engineering judgement rather than
a list of features.

**Earned Wage Access (Wagr) was removed in v3.1.** Recorded in ADR-013 as a
deliberate editorial call, with the note that it leaves the list without the
project that has the hardest engineering in it. Worth revisiting.

---

### About (`#about`)

Two columns. Left: a pull quote in DM Sans plus one supporting paragraph. Right:
four paragraphs, the last in full `on-surface` so it lands.

> I don't separate technical skill from human understanding. They're the same
> thing, said differently.

The closing line is: *"Right now the deep part is AI. I'm headed into a Master's in
it next."*

Left-aligned, ragged right. The old `text-justify hyphens-auto` was dropped —
justified text on the web makes uneven word-spacing rivers.

---

### Skills (`#skills`)

**The only inverted section** — `surface-alt`, full-bleed. Meta reads
`SORTED HONESTLY`.

Five rows, tiered by honest depth. No logos, no progress bars, no percentages.

```
Shipping with     React · Next.js · TypeScript · Node.js · PostgreSQL ·
                  Tailwind CSS · REST API design · JWT authentication · Git · Vercel

Comfortable with  Vue 3 · Express.js · GraphQL · MongoDB · MySQL ·
                  Docker · Zustand · Context API · Figma · Postman

Certified         AWS Cloud Practitioner, 2025

Exploring         AI/ML fundamentals · GraphQL subscriptions · Advanced PostgreSQL

Also worked with  Solidity · Motoko · ICP · Web3.js
```

Hairlines go on each **row**, not the list container — a container background
showing through a grid `gap` leaves a visible plate when `auto-fit` resolves to a
column count that doesn't divide the row count.

---

### Writing (`#writing`)

Section meta reads `WHEN I'VE LEARNT SOMETHING`. One row per post: mono date
(`2026.06.10`) and title on the left, description on the right. Rows fill
`row-hover` on hover and link to `/blog/[slug]`.

While there is exactly one post, a line below reads *"One post so far. The list
earns its place as it grows."*

Posts come from `getAllPosts()`. The row is `components/blog/PostCard` — the same
component `/blog` uses, so the two lists can't drift apart.

---

### Contact (`#contact`) — the footer

The footer **is** the contact section; there is no separate `ContactSection`. It
lives in the root layout, so `/blog` gets the same close.

Left: heading *"Tell me what's broken."*, a paragraph, then an outlined button
whose label is the email address itself. Right: two mono-labelled blocks —
`ELSEWHERE` (GitHub, LinkedIn, CV PDF) and `WHERE` (Accra, Ghana. GMT, and
comfortable with European and US hours).

Bottom bar: the `Joe.` wordmark left, `© <year> EMMANUEL JOE LETSU` right.

---

## Blog

**`/blog` — listing page**
- Same rows as the on-page Writing section (`PostCard`)
- No sidebar, no categories yet

**`/blog/[slug]` — post page**
- Title, date, reading time
- Body uses `@tailwindcss/typography` (`prose prose-neutral dark:prose-invert`)
- No comments

Blog posts are MDX files in `content/blog/`. Frontmatter per ADR-011.

---

## Still To Decide

- [ ] Domain name (`joeemmanuel.dev` or similar)
- [ ] Whether Wagr returns to the work list (see ADR-013)
- [ ] Per-project case-study pages (`/work/[slug]`) — the v3.1 entries are written
      so they can link out to one later
- [ ] A second blog post, so the Writing list stops needing its apology line
