# B Lang's Citadel

brandonscottlang.com. Angular, prerendered to static HTML, deployed from GitHub
via AWS Amplify.

## Run it

```bash
npm install
npm start     # http://localhost:4200
```

Leave `npm start` running. Save a file, the browser updates.

## Where everything is

```
src/
  index.html            the page title and description
  styles.scss           every color and font, in one place at the top
  app/
    posts.ts            the list of posts — the only file you edit to publish
    app.html            the header, on every page
    app.routes.ts       builds a route per post; you never touch it
    shared/entry/       the frame a post sits in: back link, date, title
    pages/
      home/             the landing page
      kit/              the entry kit, rendered — see below
      static-ips/       a post
```

A post is a folder with two files. The `.html` is what you write, the `.ts` is
four lines wiring it up and never needs changing.

### One place for a title

`src/app/posts.ts` holds the slug, date, title, summary and tags for every post.
The URL, the page's `<title>`, the card in the Writing list, and the date and
title printed at the top of the post are all read from it. Write them once
there; nothing repeats them.

## Write a post

1. Copy `src/app/pages/static-ips/` to `src/app/pages/my-new-post/`.
2. Rename both files to `my-new-post.*`, and in the `.ts` change `StaticIPs` to
   `MyNewPost` and the template filename it points at.
3. Add an entry to `src/app/posts.ts` (order does not matter, it sorts by date):

```ts
{
  slug: 'my-new-post',
  date: '2026-09-05',
  title: 'The title',
  summary: 'The paragraph that shows under it on the home page.',
  tags: ['CML', 'BGP'],
  load: () => import('./pages/my-new-post/my-new-post').then((m) => m.MyNewPost),
},
```

That is the whole checklist — the route and the home page card appear on their
own.

Then write the post in `my-new-post.html`, inside the `<app-entry>` wrapper it
came with. Plain HTML: `<p>` around paragraphs, `<h2>` and `<h3>` for headings,
`<ul><li>` for lists. That is most of what you will ever need.

Anything wrapped in pipes — `|show vtp status|` — comes out as a code snippet,
so you do not have to type `<code>` thirty times.

Its URL is `brandonscottlang.com/posts/my-new-post` — that is the link to paste
into LinkedIn.

## The entry kit

When a post wants more than paragraphs, there is a block for it. None of them
need importing and none of them need a stylesheet — write the class, get the
block.

| Want                     | Write                                             |
| ------------------------ | ------------------------------------------------- |
| Opening line             | `<p class="lead">`                                |
| Section takeaway         | `<p class="summary">`                             |
| A code snippet           | `\|show vtp status\|`                             |
| Terminal output          | `<pre><code>`                                     |
| …with a label            | `<pre data-label="CML controller">`               |
| Long output, folded      | `<details><summary>`                              |
| An aside                 | `<aside class="note">`                            |
| The trap that bit you    | `<aside class="note warn">`                       |
| How you proved it        | `<aside class="note proof">`                      |
| Your own label           | `<aside class="note" data-label="Rule of thumb">` |
| This-is-that pairs       | `<dl class="specs">`                              |
| A procedure, in order    | `<ol class="steps">`                              |
| A table                  | `<table>`                                         |
| A line worth stopping on | `<p class="pull">`                                |
| Two things side by side  | `<div class="cols">`                              |
| A picture with a caption | `<figure>` + `<figcaption>`                       |
| Wider than the column    | add `class="wide"`                                |
| A break between halves   | `<hr />`                                          |

**Run the site and open [/kit](http://localhost:4200/kit).** Every block above is
rendered there next to the markup that made it — copy from the page rather than
from this table. It is not in `posts.ts`, so it never shows up on the home page.

`.cols` and `.specs` collapse to one column on a phone, and `.wide` shrinks to
fit, so all three are safe to reach for.

For genuine razzle-dazzle — an interactive diagram like the one in the CML post
— write a component under `src/app/diagrams/`, import it in the post's `.ts`,
and drop it in a `<div class="wide">`.

The blocks all live in one place: the entry kit section at the bottom of
`src/styles.scss`. Add to it rather than starting a per-post stylesheet — a
block you want twice is a block that belongs there.

## Publish

```bash
git add -A
git commit -m "what changed"
git push all main
```

Amplify deploys on push. If the only error mentions `brandon@server`, that is the
local mirror failing — GitHub took it and the deploy is fine.

## The old site

Everything that was here before is at the tag `pre-wipe-2026-08-30`, and on
GitHub. Nothing was lost:

```bash
git show pre-wipe-2026-08-30 --stat
```
