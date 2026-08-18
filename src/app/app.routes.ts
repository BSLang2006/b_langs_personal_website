import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Brandon Lang — Network Operations & Infrastructure',
  },
  {
    path: 'writing',
    loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog),
    title: 'Writing — Brandon Lang',
  },
  {
    path: 'writing/:slug',
    loadComponent: () => import('./pages/post/post').then((m) => m.PostPage),
  },
  {
    path: 'builds',
    loadComponent: () => import('./pages/builds/builds').then((m) => m.Builds),
    title: 'Builds — Brandon Lang',
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/lab/lab').then((m) => m.Lab),
    title: 'Lab — Brandon Lang',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'About — Brandon Lang',
  },
  { path: '**', redirectTo: '' },
];
