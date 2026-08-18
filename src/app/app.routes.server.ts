import { RenderMode, ServerRoute } from '@angular/ssr';
import { allPosts } from './core/posts';

export const serverRoutes: ServerRoute[] = [
  {
    // Every post gets its own prerendered file, body text included.
    path: 'writing/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => allPosts().map((p) => ({ slug: p.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
