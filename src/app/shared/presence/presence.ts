import { Component, input } from '@angular/core';

/* ============================================================================
   SHARED COMPONENT — keep this file identical across both sites.
   ----------------------------------------------------------------------------
   Canonical copy lives in the personal site repo at
   src/app/shared/presence/. The Argus repo carries a byte-identical copy at the
   same path. If you change one, change the other; the whole point is that a
   visitor recognises the same object in both places.

   The only per-site difference is `current`, passed in app.html, and the
   `--presence-accent` token each site sets once in its global stylesheet.
   ========================================================================== */

export type PresenceId = 'citadel' | 'argus' | 'github' | 'linkedin';

interface Node {
  id: PresenceId;
  name: string;
  /* One word for what kind of thing this is. Sits under the name in mono. */
  kind: string;
  /* One concrete line about what is actually there. This is the part doing the
     work — a bare list of four links tells a visitor nothing they cannot guess,
     and the whole reason this exists is to make the next click obvious. */
  claim: string;
  href: string;
}

@Component({
  selector: 'app-presence',
  templateUrl: './presence.html',
  styleUrl: './presence.scss',
})
export class Presence {
  /** Which of the four this site is. That node renders as here, not as a link. */
  readonly current = input.required<PresenceId>();

  readonly nodes: Node[] = [
    {
      id: 'citadel',
      name: "B Lang's Citadel",
      kind: 'portfolio',
      claim: 'The systems I run, the drawings, and what broke.',
      href: 'https://brandonscottlang.com',
    },
    {
      id: 'argus',
      name: "B Lang's Argus",
      kind: 'product',
      claim: 'An assistant that documents the work while I do it.',
      href: 'https://blangsargus.com',
    },
    {
      id: 'github',
      name: 'GitHub',
      kind: 'code',
      claim: 'The source, and the commit history behind all of it.',
      href: 'https://github.com/BSLang2006',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      kind: 'profile',
      claim: 'The résumé, and the people who have worked with me.',
      href: 'https://www.linkedin.com/in/brandon-lang-596b78215',
    },
  ];
}
