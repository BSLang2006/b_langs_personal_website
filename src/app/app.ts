import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Presence } from './shared/presence/presence';

// The shell: the header, and the slot every page renders into.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Presence],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
