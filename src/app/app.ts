import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { Presence } from './shared/presence/presence';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Presence],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
