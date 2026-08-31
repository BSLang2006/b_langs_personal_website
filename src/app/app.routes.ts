import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { RebuildingTheLabNetwork } from './pages/rebuilding-the-lab-network/rebuilding-the-lab-network';

// Every page on the site is listed here. To add one, copy a line.
export const routes: Routes = [
  { path: '', component: Home, title: "B Lang's Journal" },
  {
    path: 'posts/rebuilding-the-lab-network',
    component: RebuildingTheLabNetwork,
    title: "Building a dedicated CML management plane — B Lang's Journal",
  },

  // Anything unrecognised goes home.
  { path: '**', redirectTo: '' },
];
