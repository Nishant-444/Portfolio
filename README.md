# nishants.dev

Terminal-inspired portfolio for **Nishant Sharma** — backend software engineer.
Built with [Astro](https://astro.build), output as fully static HTML.

**Live:** [nishants.dev](https://nishants.dev)

---

## The idea

A browser CLI is a fun front door and a terrible document. Search engines,
screen readers, and anyone with JavaScript off get nothing from a terminal that
paints itself at runtime.

So this site renders **one** copy of the content as semantic HTML at build time,
and the terminal is a view over it:

```
src/components/sections/*.astro
        │
        ├──▶ /about, /projects, /blog/…   real pages, always visible
        │
        └──▶ /  ──▶ <div class="doc">     pre-rendered, hidden once JS boots
                          │
                          └──▶ terminal clones these nodes on `about`,
                               `projects`, `skills`, …
```

Consequences worth knowing:

- **The terminal can't drift from the document.** A command's output *is* the
  document section, cloned. There is no second copy of any fact.
- **No-JS is a first-class path.** `<html>` gets a `js` class before first
  paint; without it the document shows and the terminal never appears. A 5s
  watchdog restores the document if the terminal script fails to load.
- **Nothing is built from HTML strings.** Command output is DOM nodes and
  `textContent`, so a command line cannot inject markup.

---

## Commands

| Command      | Does                                             |
| ------------ | ------------------------------------------------ |
| `help`       | List every command                               |
| `about`      | Who I am and what I build                        |
| `skills`     | Languages, tools, platforms                      |
| `projects`   | Things I have shipped                            |
| `experience` | Internships and roles                            |
| `education`  | Degrees and schooling                            |
| `certs`      | Certifications and achievements                  |
| `blogs`      | Posts — titles link to the full article          |
| `contact`    | Email, socials, résumé                           |
| `resume`     | Open the résumé PDF                              |
| `open <t>`   | Open a link, e.g. `open github`, `open viztube`   |
| `ls`         | List available sections                          |
| `whoami`     | The one-line version                             |
| `neofetch`   | System information, terminal-style               |
| `history`    | This session's commands                          |
| `banner`     | Reprint the welcome banner                       |
| `clear`      | Clear the screen                                 |
| `exit`       | Leave for the plain document view                |

Tab completes, `↑`/`↓` walk history, `Ctrl+L` clears, `Ctrl+U` kills the line,
`Esc` drops the inline suggestion. `/#projects` deep-links straight into a
command.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/, then verifies the output
npm run preview
npm run check      # astro check (types)
```

Node 20+.

### Scripts

| Script    | What it does                                                     |
| --------- | ---------------------------------------------------------------- |
| `assets`  | Subsets fonts and optimises the logo into `public/`               |
| `verify`  | Post-build SEO and link integrity checks                          |

`assets` runs automatically before `dev` and `build`; `verify` runs after
`build`. Both are wired through npm lifecycle hooks, so CI and Vercel get them
for free.

---

## Layout

```text
src/
├── config/site.ts            # domain, identity, socials — single source of truth
├── data/                     # experience, projects, skills, credentials, education
├── content/blog/*.md         # posts (Astro content collection, Zod-validated)
├── components/
│   ├── sections/             # the shared content sections, used by both views
│   ├── BaseHead.astro        # every meta tag
│   └── StructuredData.astro  # JSON-LD @graph
├── layouts/                  # Base (shell) and Page (document chrome)
├── pages/
│   ├── index.astro           # terminal + pre-rendered document
│   ├── blog/[slug].astro
│   ├── og/[slug].png.ts      # generated social cards
│   ├── rss.xml.ts
│   ├── robots.txt.ts
│   ├── sw.js.ts              # service worker, cache-busted per build
│   └── site.webmanifest.ts
├── scripts/terminal.ts       # the shell
├── styles/                   # global.css + terminal.css
└── assets/fonts/             # full JetBrains Mono, subset at build time

scripts/
├── build-assets.mjs          # font subsetting + SVG optimisation
└── verify-build.mjs          # post-build SEO checks
```

Anything under `public/assets/fonts/` and `public/nslogo.svg` is generated —
edit the originals in `src/assets/`.

---

## Changing content

Everything factual lives in `src/config/site.ts` and `src/data/`. Nothing is
hardcoded in a template, so the site, the JSON-LD, the OG cards, the RSS feed
and the sitemap all update together.

- **Domain** — `SITE.url` in `src/config/site.ts`, one line.
- **A new job or project** — append to `src/data/experience.ts` or
  `src/data/projects.ts`.
- **A blog post** — drop a `.md` file in `src/content/blog/`. The filename
  becomes the URL. Frontmatter is schema-validated, so a typo fails the build
  rather than shipping.

---

## SEO and performance notes

- Every page pre-renders to static HTML with a unique title, description,
  canonical URL and JSON-LD graph (`Person`, `WebSite`, `WebPage`,
  `BreadcrumbList`, plus `BlogPosting` / `ItemList` /
  `EducationalOccupationalCredential` where they apply).
- Per-page Open Graph cards are rasterised at build time from real JetBrains
  Mono glyphs — no runtime image service, no external fonts.
- Fonts are subset to the glyphs the site actually renders, driven by a scan of
  `src/`. Adding a character can't produce tofu; 368 KB → ~130 KB.
- `build-assets` and `verify-build` mean a broken internal link, a duplicate
  description or a missing OG image fails the build instead of shipping quietly.

---

## License

© 2025–2026 Nishant Sharma. Shared under
[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/).
