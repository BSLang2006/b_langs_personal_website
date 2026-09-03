import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { posts } from '../../posts';

/* Tags get their colour from their own name, so a tag is the same colour
   everywhere it appears and a new post never involves picking one. Six hues,
   defined in home.scss — few enough that the page stays calm. */
function hue(tag: string): string {
  let n = 0;
  for (let i = 0; i < tag.length; i++) {
    n = (n * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return `h${n % 6}`;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  /* The Writing list, newest first. Edit src/app/posts.ts, not this — the only
     thing added here is the colour each tag draws in. */
  protected readonly posts = posts.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    summary: post.summary,
    tags: post.tags.map((label) => ({ label, hue: hue(label) })),
    /* The card takes its accent from its subject — the second tag — because
       the first is nearly always the platform and every card would be the
       same colour. So: platform first, subject second, in posts.ts. */
    hue: hue(post.tags[1] ?? post.tags[0] ?? ''),
  }));
}
