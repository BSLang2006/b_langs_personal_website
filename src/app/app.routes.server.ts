import { RenderMode, ServerRoute } from '@angular/ssr';
import { allPosts } from './core/posts';

export const serverRoutes: ServerRoute[] = [
  {
    // Every post gets its own prerendered file, body text included.
    path: 'library/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => allPosts().map((p) => ({ slug: p.slug })),
  },
  {
    // The old post URLs are already shared, so they get prerendered too. The
    // router redirects them to /library/:slug on load, and post.ts stamps a
    // canonical link so search engines only ever index the library copy.
    path: 'writing/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => allPosts().map((p) => ({ slug: p.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
