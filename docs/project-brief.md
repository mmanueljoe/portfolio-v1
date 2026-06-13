# Project Brief

Emmanuel Joe Benson's personal portfolio site. Every decision has been made here.
Open this at the start of every build session.

---

## Identity

- **Name on site:** Emmanuel Joe Benson
- **Title:** Software Engineer
- **Email:** emmanuelletsu18@gmail.com
- **GitHub:** github.com/mmanueljoe
- **LinkedIn:** linkedin.com/in/emmanuel-letsu

---

## Site Structure

```
yoursite.com              → main scrolling single page
yoursite.com/blog         → blog listing page
yoursite.com/blog/[slug]  → individual blog post
```

---

## Navigation

- **Left:** Emmanuel Joe Benson (name as wordmark, links to top)
- **Right links:** About · Skills · Projects · Blog · Contact
- Sticky on scroll
- On scroll: glass effect — `backdrop-blur`, `parchment-200` at 80% opacity, subtle bottom border
- Mobile: hamburger or slide-in drawer

---

## Build Order

Follow this exactly. Do not skip ahead.

```
1.  Project setup + Tailwind brand tokens
2.  Font imports in layout.tsx
3.  Global CSS base styles
4.  Nav component (static first, glass effect second)
5.  Hero section
6.  Projects section
7.  About section
8.  Skills section
9.  Contact section
10. Blog listing page (/blog)
11. Blog post page (/blog/[slug])
12. motion animations (add last, after all sections are done)
13. Mobile responsive pass (check at every step, final check here)
14. Deploy to Vercel
```

---

## Section Specs

### Hero

Full viewport height. Purely typographic — no image, no illustration.

**Layout:**
```
[Availability badge]  Open to work  •

Emmanuel Joe Benson
Software Engineer
I build full-stack web applications that are well-engineered
and considered, from the API to the interface.

[CTA]  View my work →

[Links]  GitHub  ·  LinkedIn  ·  Email
```

**Styles:**
- Background: `parchment-100` (`#FAF6EE`)
- Name: `font-display`, weight 700, 56–64px, `ink-900`
- Title: `font-body`, weight 400, `ink-600`
- Tagline: `font-body`, weight 300, `ink-400`
- CTA button: `ink-900` bg, `parchment-200` text — on hover: `gold-600` bg
- Badge: small gold dot + Inter label, `gold-600`
- Vertically centred, full viewport height

---

### Projects

Three projects. Browser mockup image + name + description + stack tags + links.
Mockups: screenshot project in browser, upload to Shots.so, download framed image.

---

**Project 1 — EWA (Earned Wage Access)**

Earned wage access is a simple idea: workers should be able to access money they have already
earned before payday. For Ghanaian SMEs, where cash flow pressure is real and formal credit is
largely inaccessible, that matters practically.

The product has three moving parts: a USSD flow so workers on basic phones can request advances
without a smartphone, an employer dashboard for payroll management and advance approvals, and an
AI-powered payslip processor that extracts and structures payroll data automatically.

The employer dashboard is live. USSD integration is in active development.

- Stack: Next.js · Node.js · TypeScript · PostgreSQL · Moolre API
- Status: In active development
- Link: [add when ready]

---

**Project 2 — Amalitech Resource Management**

A resource and staffing management platform for a technology services company operating across
multiple markets. The platform handles project staffing, resource allocation, and project
management across both client-facing and internal teams.

Joined an existing production codebase as part of a cross-functional agile team. Contributions:
integrated an AI-powered recommendation system on the frontend that matches available staff to
open project roles, and built features for the analytics dashboard and resource overview that
gave managers visibility into allocation across the organisation.

- Stack: React · TypeScript · Node.js · REST APIs
- Type: Professional contribution

---

**Project 3 — Kanban Task Manager**

Most developers build a kanban board once. This one was built three times, on purpose.

The first version used the Context API. The second used Redux. The third used Zustand. Same
product, same features, three different state management architectures. The goal was not to ship
a kanban board. It was to understand, at a mechanical level, what the tradeoffs actually are
between these approaches and when each one earns its complexity.

Zustand won for this scale. The reasoning is in the README.

- Stack: React · TypeScript · Zustand · Context API
- Link: github.com/mmanueljoe/kanban-task-manager-zustand

---

**Styles:**
- Background: `ink-900`
- Project name: `font-display`, weight 600, `parchment-200`
- Description: `font-body`, weight 400, `parchment-800`
- Stack tags: `font-body`, weight 500, small, `ink-800` bg, `parchment-200` text
- Links: `gold-600`, hover underline
- Images: full container width, rounded corners, subtle shadow

---

### About

Single column, text only. No image.

**Copy (use exactly):**

I'm a software engineer with a particular way of working. Careful, systems-oriented, and always
thinking about the person on the other side of what I'm building. I work across the stack, from
interfaces to APIs, and I bring the same standard to both.

I don't separate technical skill from human understanding. I think they're the same thing,
expressed differently. The best interfaces are backed by well-structured systems. The best
systems were designed with someone's real workflow in mind. I try to hold both at once.

I've contributed to production codebases in cross-functional agile teams, built financial
technology products solving real access problems in the Ghanaian market, and spent serious time
understanding the tradeoffs behind the tools I use. I have a wide range of interests and a
genuine tendency to go deep rather than wide.

I'm building toward the intersection of software and intelligence. That's where I'm headed.

**Styles:**
- Background: `ink-900`
- Section label above copy: `font-body`, weight 500, uppercase, letter-spaced, `gold-600`
- Body text: `font-body`, weight 400, 15–16px, `parchment-200`
- Max width: 640–720px, centred
- Generous padding top and bottom

---

### Skills

Text only. Tiered by depth. No logos, no progress bars.

**Content:**
```
Shipping with     React · Next.js · TypeScript · Node.js · PostgreSQL ·
                  Tailwind CSS · REST API design · JWT Authentication · Git · Vercel

Comfortable with  Vue 3 · Express.js · GraphQL · MongoDB · MySQL ·
                  Docker · Zustand · Context API · Figma · Postman

Certified         AWS Cloud Practitioner (2025)

Exploring         AI/ML fundamentals · GraphQL subscriptions · Advanced PostgreSQL

Also worked with  Solidity · Motoko · ICP · Web3.js
```

**Styles:**
- Background: `parchment-100`
- Category label: `font-display`, weight 600, `ink-900`
- Skills text: `font-body`, weight 400, `ink-600`
- Two columns on desktop, single column on mobile

---

### Contact

Centred. Heading, subline, three links. No form.

**Content:**
```
Get in touch

I'm open to full-stack engineering roles, interesting products,
and problems worth solving. Remote or Ghana-based.
Reach out directly.

emmanuelletsu18@gmail.com
github.com/mmanueljoe
linkedin.com/in/emmanuel-letsu
```

**Styles:**
- Background: `parchment-100`
- Heading: `font-display`, weight 700, large, `ink-900`
- Subline: `font-body`, weight 400, `ink-600`
- Links: `gold-600`, hover underline
- Centred, generous vertical padding

---

## Blog

**`/blog` — listing page**
- Post title, date, one-line description per post
- Same nav as main site
- No sidebar, no categories yet

**`/blog/[slug]` — post page**
- Title, date, reading time
- Body: Inter, 65–75 character line length
- Use `@tailwindcss/typography` for body styling
- No comments

Blog posts are MDX files stored in `content/blog/`.
At least one post must exist before launch.

---

## Still To Decide Before Launch

- [ ] Domain name (`joeemmanuel.dev` or similar)
- [ ] EWA live link — add to project when ready
- [ ] Project screenshots for Shots.so mockups
- [ ] First blog post (written and ready before deploy)
