import { Component, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { giscus, configured } from '../../core/site.config';

@Component({
  selector: 'app-giscus',
  template: `
    @if (!ready) {
      <p class="notice mono">
        Comments are not wired up yet — add the repo and category ids from giscus.app
        to <code>site.config.ts</code>.
      </p>
    }
  `,
  styles: [
    `
      :host { display: block; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--line-solid); }
      .notice { font-size: 0.8rem; color: var(--muted); }
      code { color: var(--accent); }
    `,
  ],
})
export class Giscus {
  readonly term = input.required<string>();
  readonly ready = configured();

  private host = inject(ElementRef<HTMLElement>);

  constructor() {
    // Browser only — the script has nothing to attach to during prerender.
    afterNextRender(() => {
      if (!this.ready) return;

      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.async = true;
      script.crossOrigin = 'anonymous';

      Object.entries({
        'data-repo': giscus.repo,
        'data-repo-id': giscus.repoId,
        'data-category': giscus.category,
        'data-category-id': giscus.categoryId,
        'data-mapping': 'specific',
        'data-term': this.term(),
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'top',
        'data-theme': 'transparent_dark',
        'data-lang': 'en',
        'data-loading': 'lazy',
      }).forEach(([k, v]) => script.setAttribute(k, v));

      this.host.nativeElement.appendChild(script);
    });
  }
}
