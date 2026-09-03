/* Writes sitemap.xml from the pages that actually prerendered, so it can never
   drift out of step with posts.ts. Runs after every build — see package.json.

   Anything that is not a real destination is skipped: /kit is a writing
   reference, not a page anyone should land on from a search result. */
import { readdir, writeFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const ORIGIN = 'https://brandonscottlang.com';
const ROOT = 'dist/brandonscottlang/browser';
const SKIP = new Set(['kit']);

async function routes(dir, base = dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) {
      out.push(...(await routes(path, base)));
    } else if (name === 'index.html') {
      const rel = relative(base, dir).split(sep).join('/');
      if (!SKIP.has(rel.split('/')[0])) out.push(rel);
    }
  }
  return out;
}

const found = (await routes(ROOT)).sort();
const today = new Date().toISOString().slice(0, 10);

const body = found
  .map((r) => `  <url><loc>${ORIGIN}/${r}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');

await writeFile(
  join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);

console.log(`sitemap.xml: ${found.length} routes`);
