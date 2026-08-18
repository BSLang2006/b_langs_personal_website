import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hud } from '../../shared/hud/hud';
import { site } from '../../core/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hud],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly site = site;

  // Falls back to a monogram until public/portrait.jpg exists.
  readonly hasPortrait = signal(true);
}
