import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site } from '../../core/site.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly site = site;
  readonly year = new Date().getFullYear();
}
