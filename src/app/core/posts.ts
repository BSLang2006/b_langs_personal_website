import { posts, Post } from './content.generated';

export type { Post };
export const allPosts = (): Post[] => posts;

export const findPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Parsed by hand: `new Date('2026-08-11')` is UTC and renders a day early here.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
