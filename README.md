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
  styles.scss           every colour and font, in one place at the top
  app/
    app.html            the header, on every page
    app.routes.ts       the list of pages
    pages/
      home/             the landing page
      rebuilding-the-lab-network/   a post
```

A page is a folder with three files. The `.html` is what you see, the `.scss` is
how that page looks, the `.ts` is four lines wiring them together and never needs
changing.

## Write a post

1. Copy `src/app/pages/rebuilding-the-lab-network/` to `src/app/pages/my-new-post/`.
2. Rename the three files inside to `my-new-post.*`, and in the `.ts` change
   `RebuildingTheLabNetwork` to `MyNewPost` and the two filenames it points at.
3. Add it to `src/app/app.routes.ts`:

```ts
{ path: 'posts/my-new-post', component: MyNewPost, title: 'The title — Brandon Lang' },
```

   …and add the matching `import` at the top of that file.

4. Add a line to the Writing list in `src/app/pages/home/home.html`.

Then write the post in `my-new-post.html`. Plain HTML: `<p>` around paragraphs,
`<h2>` for headings. That is most of what you will ever need.

Its URL is `brandonscottlang.com/posts/my-new-post` — that is the link to paste
into LinkedIn.

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
