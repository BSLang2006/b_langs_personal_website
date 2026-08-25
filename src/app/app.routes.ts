import { Routes } from '@angular/router';

// The site is laid out as three rooms — Watchtower, Forge, Library. The room name
// is the source of truth for what lives at each path; the old /lab, /builds and
// /writing paths are kept as redirects because they are already out in the wild.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: "B Lang's Citadel — Network Operations & Infrastructure",
  },
  {
    path: 'watchtower',
    loadComponent: () => import('./pages/watchtower/watchtower').then((m) => m.Watchtower),
    title: "Watchtower — B Lang's Citadel",
  },
  {
    path: 'forge',
    loadComponent: () => import('./pages/forge/forge').then((m) => m.Forge),
    title: "Forge — B Lang's Citadel",
  },
  {
    path: 'library',
    loadComponent: () => import('./pages/library/library').then((m) => m.Library),
    title: "Library — B Lang's Citadel",
  },
  {
    path: 'library/:slug',
    loadComponent: () => import('./pages/post/post').then((m) => m.PostPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: "The Architect — B Lang's Citadel",
  },

  // Old paths. Client-side only — the server-side 301s live in the Amplify
  // rewrite rules documented in README.md, and these are the safety net for
  // anyone who lands on a stale link with the app already loaded.
  { path: 'lab', redirectTo: 'watchtower', pathMatch: 'full' },
  { path: 'builds', redirectTo: 'forge', pathMatch: 'full' },
  { path: 'writing', redirectTo: 'library', pathMatch: 'full' },
  // A function rather than a string: Angular does not substitute the matched
  // parameter into a redirectTo string, so the literal ':slug' ends up in the
  // prerendered redirect stub.
  {
    path: 'writing/:slug',
    redirectTo: ({ params }) => `/library/${params['slug']}`,
    pathMatch: 'full',
  },

  { path: '**', redirectTo: '' },
];
