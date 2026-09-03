import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CodeMarks } from './code-marks';
import { EntryHeader, ORIGIN } from '../../posts';

/* The shell every journal entry sits in: the back link, the date, the title,
   and all the typography. A daily entry is then one HTML file, a four-line
   .ts, and one entry in posts.ts — see the README.

   The date and title are read off the route rather than passed in, so they are
   written once, in posts.ts, and cannot drift out of step with the home page.

   ngSkipHydration because CodeMarks rewrites text nodes after render, which
   Angular's hydration would otherwise flag as a mismatch against the template.
   An entry is static prose; there is nothing here worth hydrating. */
@Component({
  selector: 'app-entry',
  imports: [RouterLink, CodeMarks],
  templateUrl: './entry.html',
  host: { ngSkipHydration: 'true' },
})
export class Entry {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);

  protected readonly post = inject(ActivatedRoute).snapshot.data['post'] as EntryHeader | undefined;

  constructor() {
    this.describe();
  }

  /* What LinkedIn shows when the post is pasted into a message.
     ------------------------------------------------------------------------
     Without this every post shares the site-level card from index.html, so
     they all read "B Lang's Journal" no matter which one you linked.

     updateTag rather than addTag, because index.html already carries a
     site-level og:title and og:description — adding would leave two of each
     and let the crawler pick. This runs during prerendering, so the values are
     baked into the post's index.html: crawlers do not run JavaScript, and tags
     set only in the browser would never be seen. */
  private describe(): void {
    const post = this.post;
    if (!post) return;

    const summary = post.summary ?? '';

    this.titleService.setTitle(`${post.title} — B Lang's Journal`);
    this.meta.updateTag({ name: 'description', content: summary });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: summary });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'article:published_time', content: post.date });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    if (post.slug) {
      this.meta.updateTag({ property: 'og:url', content: `${ORIGIN}/posts/${post.slug}` });
    }
  }
}
