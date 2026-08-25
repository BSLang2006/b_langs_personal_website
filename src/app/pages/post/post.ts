import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title, Meta } from '@angular/platform-browser';
import { findPost, formatDate } from '../../core/posts';

@Component({
  selector: 'app-post',
  imports: [RouterLink],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class PostPage {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  private params = toSignal(this.route.paramMap, { initialValue: null });

  readonly post = computed(() => {
    const slug = this.params()?.get('slug') ?? '';
    return findPost(slug);
  });

  readonly formatDate = formatDate;

  constructor() {
    // Runs during prerender too, so each post ships its own title and description.
    const p = this.post();
    if (p) {
      this.title.setTitle(`${p.title} — B Lang's Citadel`);
      this.meta.updateTag({ name: 'description', content: p.summary });
    }
  }
}
