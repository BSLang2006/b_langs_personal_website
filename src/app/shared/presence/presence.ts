import { Component, input } from '@angular/core';

/* ============================================================================
   SHARED COMPONENT — keep this file identical across both sites.
   ----------------------------------------------------------------------------
   Canonical copy lives in the personal site repo at
   src/app/shared/presence/. The Argus repo carries a byte-identical copy at the
   same path. If you change one, change the other; the whole point is that a
   visitor recognises the same object in both places.

   This is the site footer on both sites — there is no other one. It carries the
   properties and the single contact link, and it is docked to the bottom of the
   viewport at all times. No label and no attribution line: anyone reading it
   already knows whose site they are on.

   The only per-site difference is `current`, passed in app.html, and the
   `--presence-accent` token each site sets once in its global stylesheet.
   ========================================================================== */

export type PresenceId = 'journal' | 'argus' | 'citadel' | 'github' | 'linkedin';

interface Node {
  id: PresenceId;
  name: string;
  /* Shown instead of `name` once the strip is too narrow to spell it out.
     Five nodes on a phone is about 60px each; without this they all become
     ellipsis and the strip stops being a way to get anywhere. */
  short: string;
  /* One word for what kind of thing this is. Sits under the name in mono. */
  kind: string;
  /* One concrete line about what is actually there. This is the part doing the
     work — a bare list of four links tells a visitor nothing they cannot guess,
     and the whole reason this exists is to make the next click obvious. */
  claim: string;
  href: string;
  /* 'building' renders as a marked placeholder rather than a link — the domain
     is not standing up yet, and a link into a 404 is worse than saying so. */
  status?: 'live' | 'building';
}

@Component({
  selector: 'app-presence',
  templateUrl: './presence.html',
  styleUrl: './presence.scss',
})
export class Presence {
  /** Which of the four this site is. That node renders as here, not as a link. */
  readonly current = input.required<PresenceId>();

  /* The one contact address. Identical on both sites, which is why it can live
     in a shared component rather than being passed in. */
  readonly email = 'BrandonScottLang@gmail.com';

  readonly nodes: Node[] = [
    {
      id: 'journal',
      name: 'Brandon Lang',
      short: 'Journal',
      kind: 'journal',
      claim: 'What I am building, and what broke along the way.',
      href: 'https://brandonscottlang.com',
    },
    {
      id: 'argus',
      name: "B Lang's Argus",
      short: 'Argus',
      kind: 'business',
      claim: 'An assistant that documents the work while I do it.',
      href: 'https://blangsargus.com',
    },
    {
      id: 'citadel',
      name: "B Lang's Citadel",
      short: 'Citadel',
      kind: 'playground',
      claim: 'A place to try things that are not ready to be anything yet.',
      href: 'https://blangscitadel.com',
      status: 'building',
    },
    {
      id: 'github',
      name: 'GitHub',
      short: 'GitHub',
      kind: 'code',
      claim: 'The source, and the commit history behind all of it.',
      href: 'https://github.com/BSLang2006',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      short: 'LinkedIn',
      kind: 'profile',
      claim: 'The résumé, and the people who have worked with me.',
      href: 'https://www.linkedin.com/in/brandon-lang-596b78215',
    },
  ];
}
