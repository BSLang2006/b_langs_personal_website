import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { posts } from './posts';

export const routes: Routes = [
  { path: '', component: Home, title: "B Lang's Journal" },

  ...posts.map((post) => ({
    path: `posts/${post.slug}`, loadComponent: post.load, title: `${post.title} — B Lang's Journal`, data: { post }
  })),

  {
    path: 'kit', loadComponent: () => import('./pages/kit/kit').then((m) => m.Kit),
    title: "The entry kit — B Lang's Journal",
    data: { post: { date: 'Reference', title: 'The entry kit' } },
  },

  { path: '**', redirectTo: '' },
];
