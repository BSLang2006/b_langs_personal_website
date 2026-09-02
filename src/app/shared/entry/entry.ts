import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeMarks } from './code-marks';

/* The shell every journal entry sits in: the back link, the date, the title,
   and all the typography. A daily entry is then two files and no styling —
   see the README.

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
  readonly date = input.required<string>();
  readonly title = input.required<string>();
}
