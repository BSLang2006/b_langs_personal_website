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

## How it is put together

Every route is **prerendered to real HTML** at build time — including each blog post,
body text and all. There is no server; Amplify serves files. That is what keeps the
site fast and makes the posts readable by search engines and link previews.

```
content/posts/*.md          the blog, authored as markdown
scripts/build-content.mjs   compiles those into a typed module + sitemap.xml + robots.txt
src/app/core/site.config.ts every link, address and id that is "about Brandon"
src/app/shared/hud/         the instrument panel on the landing page
src/app/pages/              home · blog (writing) · post · builds · lab · about
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
(`writing/what-broke-and-why`); reading time is estimated from word count.

## Adding a build to the gallery

Edit the `builds` array in `src/app/pages/builds/builds.ts`. Images are optional —
put a file in `public/builds/` and set `image: 'builds/name.jpg'`. If the file is
missing the card falls back to a placeholder rather than a broken image, so you can
add entries before you have photos.

## Comments (Giscus)

Comments are on blog posts and the Lab page. They are **not live yet** — until they
are configured the page shows a small setup notice instead of a broken widget.

To turn them on:

1. The repo is `BSLang2006/personalWebsite` — it needs to be **public**.
2. Enable **Discussions** in the repo settings, and add the
   [giscus app](https://github.com/apps/giscus) to it.
3. Go to <https://giscus.app>, enter the repo, pick the *Announcements* category.
4. Copy `data-repo-id` and `data-category-id` from the snippet it generates into
   `giscus` in `src/app/core/site.config.ts`.

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

## What this site is not

There is no resume PDF and no credentials page, on purpose. Visitors arrive from
LinkedIn or a resume link, so they already know the background — the site's job is to
show the work, not restate the CV. That is why `/builds` carries the weight and
`/about` is deliberately short and personal.

## Still to do

- **Portrait** — drop `public/portrait.jpg` (square, ~400×400). Until then the landing
  page shows a `BL` monogram.
- **Build photos** — `public/builds/nexus.jpg`, `lights.jpg`, `lab.jpg`.
- **Colours** — the palette is a deliberate placeholder, one accent on a dark base.
  All of it lives in the `:root` block at the top of `src/styles.scss`.
- **Review the seeded posts** — the three starter posts were drafted from your own
  project notes. Read them in your own voice before they go public.
