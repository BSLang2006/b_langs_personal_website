import { Component, signal } from '@angular/core';
import { allPieces, type ForgePiece } from '../../core/forge';

// The room is a forge, so a project here is a piece of work rather than a
// portfolio entry: it is either finished and in service, or still hot and being
// worked. `state` carries that, and drives how much heat the slab gives off.
//
// Content lives in content/forge/*.md — see README. Nothing to edit here.
@Component({
  selector: 'app-forge',
  templateUrl: './forge.html',
  styleUrl: './forge.scss',
})
export class Forge {
  readonly states: Record<ForgePiece['state'], string> = {
    'in-service': 'in service',
    'in-the-fire': 'still in the fire',
  };

  readonly pieces = allPieces();

  readonly failed = signal(new Set<string>());

  onImageError(slug: string) {
    this.failed.update((s) => new Set(s).add(slug));
  }

  showImage(p: ForgePiece): boolean {
    return !!p.image && !this.failed().has(p.slug);
  }
}
