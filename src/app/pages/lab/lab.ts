import { Component } from '@angular/core';
import { Giscus } from '../../shared/giscus/giscus';

interface Item {
  title: string;
  status: 'now' | 'scheduled' | 'next' | 'idea';
  when: string;
  body: string;
}

@Component({
  selector: 'app-lab',
  imports: [Giscus],
  templateUrl: './lab.html',
  styleUrl: './lab.scss',
})
export class Lab {
  readonly items: Item[] = [
    {
      title: 'AWS Cloud Practitioner',
      status: 'scheduled',
      when: 'Exam booked — late August 2026',
      body:
        'The foundational certification: how the service families fit together, what the ' +
        'shared responsibility model actually divides, and how billing works. My own ' +
        'infrastructure is all self-hosted, so this is deliberately the part I have the ' +
        'least hands-on time with.',
    },
    {
      title: 'CCNP Enterprise — ENCOR',
      status: 'now',
      when: 'ENCOR 350-401',
      body:
        'Building on the routing and switching I do daily. Working through it in the lab ' +
        'rather than on paper: standing scenarios up in Cisco Modeling Labs, breaking them ' +
        'deliberately, and writing down what the failure actually looked like from the ' +
        'outside before I knew the cause.',
    },
    {
      title: 'Test a restore, not just a backup',
      status: 'next',
      when: 'Next up',
      body:
        'My platform takes nightly database dumps and I have never once restored one. ' +
        'Until I do, I do not have backups — I have files. This is the top item on my own ' +
        'risk register and it stays there, in writing, until it is closed.',
    },
    {
      title: 'Coverage where the logic actually lives',
      status: 'next',
      when: 'After the restore test',
      body:
        'A good chunk of the real behaviour in my system is SQL, and almost none of it is ' +
        'under test. The Python around it is well covered, which is comfortable and slightly ' +
        'beside the point. Fixing the ratio rather than the number.',
    },
    {
      title: 'Streaming the work',
      status: 'idea',
      when: 'Planned — no schedule yet',
      body:
        'The idea I keep coming back to: stream the lab work and the build sessions, so the ' +
        'process is visible rather than just the finished thing. I have not committed to a ' +
        'cadence and I would rather say that plainly than announce a schedule I do not keep. ' +
        'If it happens it will be announced here first.',
    },
  ];

  readonly labels: Record<Item['status'], string> = {
    now: 'in progress',
    scheduled: 'scheduled',
    next: 'queued',
    idea: 'not scheduled',
  };
}
