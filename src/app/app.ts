import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Presence } from './shared/presence/presence';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Presence],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
