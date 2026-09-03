import { Type } from '@angular/core';

// Social tags must be absolute URLs or crawlers ignore them.
export const ORIGIN = 'https://brandonscottlang.com';

export interface Post {
  readonly slug: string;
  readonly date: string;
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly load: () => Promise<Type<unknown>>;
}

export type EntryHeader = Pick<Post, 'date' | 'title'> & Partial<Pick<Post, 'slug' | 'summary'>>;

/* ---------------------------------------------------------------------------
   Copy this, paste it into the list below, change the five values.
   Only two things have to match the folder you made: the path in import(),
   and the class name after m. — both say 'ospf' here.

  {
    slug: 'ospf',
    date: '2026-09-02',
    title: 'Building OSPF framework',
    summary: 'The paragraph under the title on the home page.',
    tags: ['CML', 'OSPF'],
    load: () => import('./pages/ospf/ospf').then((m) => m.Ospf),
  },

   --------------------------------------------------------------------------- */

const entries: Post[] = [
  {
    slug: 'vtp-l2-triangle',
    date: '2026-09-01',
    title: 'Adding VTP to the L2 triangle',
    summary:
      'VTP quietly refused to let a config file add a VLAN to the database ' +
      'until the switch was in transparent mode. One command found it.',
    tags: ['CML', 'VTP', 'VLANs', 'Automation'],
    load: () => import('./pages/vtp-l2-triangle/vtp-l2-triangle').then((m) => m.VtpL2Triangle),
  },
  {
    slug: 'rebuilding-the-lab-network',
    date: '2026-08-30',
    title: 'Building a dedicated CML management plane',
    summary:
      'Two physical NICs, two VLANs, and a DHCP broadcast that had to cross ' +
      'six boundaries before it reached a simulated switch. What was actually ' +
      'broken at each one, and how I proved the path.',
    tags: ['CML', 'VLANs', 'VMware', 'Linux bridging', 'DHCP'],
    load: () =>
      import('./pages/rebuilding-the-lab-network/rebuilding-the-lab-network').then(
        (m) => m.RebuildingTheLabNetwork,
      ),
  },
  {
    slug: 'ospf',
    date: '2026-09-02',
    title: 'Building an OSPF framework',
    summary: 'Laying out 3 routers on a broadcast network and 2 routers on a /30 network.',
    tags: ['CML', 'OSPF', 'Wildcard masks', 'MD5', 'Troubleshooting'],
    load: () => import('./pages/ospf/ospf').then((m) => m.Ospf),
  },
];

export const posts: readonly Post[] = [...entries].sort((a, b) => b.date.localeCompare(a.date));
