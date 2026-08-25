import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allPosts, formatDate, type Post } from '../../core/posts';

interface Shelf {
  year: string;
  posts: Post[];
}

@Component({
  selector: 'app-library',
  imports: [RouterLink],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library {
  readonly posts = allPosts();
  readonly formatDate = formatDate;

  // Posts arrive newest-first, so walking them in order gives shelves in
  // descending year without a second sort.
  readonly shelves: Shelf[] = this.posts.reduce<Shelf[]>((shelves, post) => {
    const year = post.date.slice(0, 4);
    const current = shelves.at(-1);
    if (current?.year === year) current.posts.push(post);
    else shelves.push({ year, posts: [post] });
    return shelves;
  }, []);

  // The catalog line above each title: date, reading time, and the subject the
  // post files under. Mirrors a call number — enough to find it by, and the same
  // shape on every card so the column scans.
  callNumber(post: Post): string {
    return [post.date, `${post.readingMinutes} min`, post.tags[0] ?? 'general']
      .join('  ·  ')
      .toUpperCase();
  }
}
