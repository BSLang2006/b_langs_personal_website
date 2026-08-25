import { forge, ForgePiece } from './content.generated';

export type { ForgePiece };

// Pieces are authored as markdown in content/forge/*.md and compiled by
// scripts/build-content.mjs. Order and drafts are resolved at build time.
export const allPieces = (): ForgePiece[] => forge;
