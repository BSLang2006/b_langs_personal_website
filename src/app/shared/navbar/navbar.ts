import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { site } from '../../core/site.config';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly site = site;
  readonly open = signal(false);

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }
}
