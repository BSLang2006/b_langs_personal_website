# brandonscottlang.com

Personal/professional site for Brandon Lang. Angular 22, prerendered to static files,
deployed from GitHub via AWS Amplify. Built to the brief in [PLANNING.md](PLANNING.md).

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # static output in dist/brandonscottlang/browser
```

`npm start` and `npm run build` both regenerate blog content first (see below), so
there is no separate step to remember.

## The three rooms


## How it is put together

Every route is **prerendered to real HTML** at build time 

```
content/posts/*.md          the Library, authored as markdown
content/forge/*.md          the Forge, authored as markdown
scripts/build-content.mjs   compiles both into a typed module + sitemap.xml + robots.txt
src/app/core/site.config.ts every link and address that is "about Brandon"
src/app/shared/hud/         the instrument panel on the landing page
src/app/pages/              home · watchtower · forge · library · post · about
```

`src/app/core/content.generated.ts` is **generated — never edit it.** Edit the markdown.

## Writing a post

Drop a file in `content/posts/`:

```markdown
---
title: What broke and why
date: 2026-08-20
summary: One sentence that shows up in the list and in link previews.
tags: Networking, Operations
draft: true
---

Body text in markdown.
```

`title` and `date` are required — the build fails loudly without them. `draft: true`
keeps a post out of the build entirely. The filename becomes the URL
(`library/what-broke-and-why`); reading time is estimated from word count.

`content/posts/template.md`, and anything named with a leading `_`, is treated as
authoring scaffolding and skipped by the build rather than parsed as a post.

## The Watchtower console

The page is a console, not a document. The operator stands at the centre of an arc with
three sectors on it — **Systems**, **Architecture**, **Changes** — and nothing else
scrolls. Tapping a sector opens the window; the detail lives there.

The arc is derived entirely from five constants at the top of `watchtower.ts` (`CX`,
`CY`, `R`, `FROM`, `TO`), so the shape can be retuned in one place and the bands, spokes,
graduations and label positions all follow. The sector labels are **real HTML buttons
layered over the SVG**, so they stay focusable and keyboard-reachable; which band is lit
is driven from a signal rather than CSS sibling selectors, so hover and focus behave
identically.

There is **one window with two modes**, never two stacked overlays. Opening a diagram
swaps the same window over to the light table with a `← Rack` control. Escape backs out
one step at a time — light table → rack → closed.

Below 760px the arc has no room to be an arc, so it flattens into three stacked sector
plates carrying the same label, count and lit edge.

### Adding a change

Add a row to `changes` in `watchtower.ts`, newest first: `date`, `system`, `what`, and
`why` — the last being the reason the change was worth making. **The seeded entries
carry placeholder dates.** Each describes a change genuinely documented elsewhere in
this repo, but the dates are invented; replace them before the site goes out.

### Adding a diagram

The Architecture sector files drawings by system. To add one:

1. Export the drawing as **SVG** and put it in `public/diagrams/`. From Structurizr,
   export the view as SVG and keep the file name matching the view key. Raster
   (`.png`/`.jpg`) works too — use it for anything that can only be screenshotted,
   such as a CML topology.
2. Add a row to the `diagrams` array in `src/app/pages/watchtower/watchtower.ts`:

```ts
{
  id: 'NEXUS-C2',                       // call sign shown on the strip — keep it terse
  title: 'Nexus — containers',
  system: 'Nexus',                      // the drawer it files under
  level: 'container',                   // context | container | component | deployment | network
  file: '/diagrams/nexus-container.svg',// leading slash matters, see below
  kind: 'svg',
  drawn: '2026-08',                     // the month the drawing was last true
  summary: 'One sentence shown under the diagram on the light table.',
}
```

Anything sharing a `system` groups into the same drawer. `level` colours the strip's
edge, so a drawer can be read by colour alone.

**Keep the leading slash on `file`.** A relative path resolves against the current URL,
so it would 404 for anyone landing on `/watchtower/` with a trailing slash. Same applies
to Forge images.

Opening a strip puts the drawing on the **light table** — zoom, drag-to-pan, fit, and a
link to the raw file. Diagrams exported from Structurizr, draw.io and topology tools carry their own light
styling, so the viewer lays them on a lit plate rather than dropping them onto the dark
page, where they would go muddy. That means diagrams do **not** need to be theme-aware.

`public/diagrams/sample-context.svg` and its `SAMPLE-01` row are scaffolding so the
cabinet can be seen working. Delete both once a real drawing lands.

## Adding a piece to the Forge

Pieces are markdown in `content/forge/`, same as posts. Copy `_template.md`:

```markdown
---
title: Nexus
state: in-service          # in-service | in-the-fire
blurb: One line, shown under the title in larger type.
stock: Angular, FastAPI, Postgres, MQTT
image: /images/forge/nexus.jpg   # optional
struck: Where the work went      # label for the struck block
order: 1                          # lower sorts first; default 100
draft: true                       # keeps it out of the build entirely
---

Body paragraphs in plain markdown. **Bold**, `code`, lists and links all work.

<!--struck-->

Everything after that marker becomes the struck block — the decision inside the
piece. Omit the marker if a piece does not have one.
```

`title`, `state`, `blurb` and `stock` are required and the build fails loudly without
them; an unrecognised `state` fails too, naming the value it got. `state` drives how much
heat the slab gives off. Images are optional — put a file in `public/images/forge/` and
**keep the leading slash on the path**, since a relative path would break on `/forge/`.
A missing file falls back to a hammered-stock placeholder, so entries can go up before
the photos exist.

Files named `template.md` or starting with `_` are treated as scaffolding and skipped.

> This used to be a TypeScript array of concatenated string literals. Editing prose in
> that shape meant a deleted clause silently glued two fragments into a sentence that
> still compiled — a mistake that produced nonsense rather than an error. Markdown was
> already the answer for the Library; the Forge just had not caught up.

## Comments

There are none, by design. Posts and Watchtower entries are shared as write-ups on
LinkedIn and the conversation happens in that thread — the Watchtower's "Signal back"
card links straight to it. Nothing in the app talks to a comment service.

## Deploying (AWS Amplify)

This is its **own** Amplify app and its own repo — it shares nothing with the Argus
site. `amplify.yml` at the repo root already describes the build.

1. Amplify console → **Host web app** → GitHub → this repo, branch `main`.
2. It will detect `amplify.yml`; the artifact directory is
   `dist/brandonscottlang/browser`.
3. **Add a rewrite rule** so deep links work on refresh:

   | Source | Target | Type |
   |---|---|---|
   | `/<*>` | `/index.html` | 404 (Rewrite) |

   Every route is prerendered, so this only catches genuine typos — but without it a
   mistyped URL returns Amplify's default error page.
4. Add the custom domain under **Domain management**.

### The old URLs

The site used to serve `/writing`, `/builds` and `/lab`. Those links are already out in
the world, so they still resolve: the build prerenders a redirect stub at each old path
(and each old post URL) that points at the room. Nothing needs configuring for this to
work.

That stub is a `meta refresh`, which is a *soft* redirect — fine for people, weaker than
it should be for search engines. To make them real 301s, add these **before** the
catch-all rewrite in the Amplify console (order matters; the first match wins):

| Source | Target | Type |
|---|---|---|
| `/lab` | `/watchtower` | 301 |
| `/builds` | `/forge` | 301 |
| `/writing` | `/library` | 301 |
| `/writing/<*>` | `/library/<*>` | 301 |
| `/<*>` | `/index.html` | 404 (Rewrite) |

`app.routes.ts` also carries client-side redirects for the same paths, which catch
anyone who reaches a stale link with the app already loaded.

`sitemap.xml` deliberately lists only the room URLs — a sitemap should carry canonical
addresses, not the redirects.


## Naming

The site is **B Lang's Citadel**. `site.brand` in `src/app/core/site.config.ts` carries
that; `site.name` stays the person, for attribution and copyright. `/about` presents as
**The Architect** — the label changed, the URL deliberately did not, because it is short
and already indexed.

## What this site is not

There is no resume PDF and no credentials page, on purpose. Visitors arrive from
LinkedIn or a resume link, so they already know the background — the site's job is to
show the work, not restate the CV. That is why the Forge carries the weight and the
Architect page is deliberately short and personal.

## Still to do

- **Portrait** — drop `public/portrait.jpg` (square, ~400×400). Until then the landing
  page shows a `BL` monogram.
- **Forge photos** — `public/images/forge/nexus.jpg`, `lights.jpg`, `lab.jpg`.
- **Real diagrams** — replace `SAMPLE-01` and `public/diagrams/sample-context.svg` with
  Structurizr exports.
- **The board is hand-curated** — station states in `watchtower.ts` are typed by hand and
  the page says so. Wiring them to something real is the obvious next step.
- **Colours** — the base palette is still a deliberate placeholder. The room accents on
  top of it are not. All of it lives in the `:root` block at the top of
  `src/styles.scss`.
