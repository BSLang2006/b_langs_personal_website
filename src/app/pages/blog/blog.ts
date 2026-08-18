import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allPosts, formatDate } from '../../core/posts';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  readonly posts = allPosts();
  readonly formatDate = formatDate;
}
