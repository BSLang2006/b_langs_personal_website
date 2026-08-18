import { Component, signal } from '@angular/core';

interface Build {
  title: string;
  status: 'running' | 'ongoing';
  blurb: string;
  body: string[];
  highlight: { label: string; text: string };
  stack: string[];
  image?: string;
}

@Component({
  selector: 'app-builds',
  templateUrl: './builds.html',
  styleUrl: './builds.scss',
})
export class Builds {
  // Images are optional — drop a file in public/builds/ and set `image`.
  readonly builds: Build[] = [
    {
      title: 'Nexus',
      status: 'running',
      blurb: 'A self-hosted operations platform that runs my house, on hardware I own.',
      body: [
        'Angular front end, FastAPI backend, Postgres, a Mosquitto broker and Caddy, all ' +
          'described by one Docker Compose file on a Linux box. It tracks devices, finances, ' +
          'a calendar and the lights, and it is the thing I reach for when I want to learn ' +
          'something properly rather than read about it.',
        'The rule the whole design hangs off is a split: state that changes on its own goes ' +
          'over MQTT, retained, so anything that connects late immediately knows the truth. ' +
          'Questions and commands go over HTTP. Exactly one process is allowed to poll a ' +
          'device on a timer, so there is never a second opinion about what a sensor said.',
      ],
      highlight: {
        label: 'The interesting part',
        text:
          'It has two front doors that share nothing. The browser gets a session cookie on ' +
          '/api; a language model gets a bearer token on /mcp. Neither credential opens the ' +
          'other door, and both directions are tested. It is enforced by a single pure-ASGI ' +
          'middleware rather than the framework’s convenience wrapper — the convenient one ' +
          'buffers whole responses, which would have quietly broken the live event stream. ' +
          'Nothing in the business logic knows authentication exists at all.',
      },
      stack: ['Angular', 'FastAPI', 'Postgres', 'MQTT', 'Caddy', 'Docker'],
      image: 'builds/nexus.jpg',
    },
    {
      title: 'Addressable LED fixtures',
      status: 'running',
      blurb: 'ESP32 boards driving LED strip, commanded over the same authenticated bus as everything else.',
      body: [
        'Custom firmware speaking a small JSON contract over MQTT. Each fixture reports its ' +
          'own state retained, so the dashboard is correct the moment it loads, and takes ' +
          'commands as plain events that are never retained — a stored command would be ' +
          'redelivered every time a board reconnected, which means a power blip at 3am turns ' +
          'the lights on by itself.',
      ],
      highlight: {
        label: 'The interesting part',
        text:
          'A strip can show a gradient, and the gradient is defined as up to eight colour ' +
          'stops at fractional positions rather than a frame of pixels. That one choice is ' +
          'what lets a single command mean the same thing on an 84-pixel bar and a 30-pixel ' +
          'shelf, and it keeps the payload inside the firmware’s buffer — a per-pixel frame ' +
          'would be a kilobyte on the bus and wrong the moment you cut the strip to length.',
      },
      stack: ['ESP32', 'C++', 'MQTT', 'WS2812B'],
      image: 'builds/lights.jpg',
    },
    {
      title: 'Enterprise routing and switching lab',
      status: 'ongoing',
      blurb: 'Cisco Catalyst hardware and Cisco Modeling Labs, built specifically to be broken.',
      body: [
        'VLANs, STP and RSTP, EtherChannel, OSPF, EIGRP, BGP and VPNs — built as working ' +
          'topologies and then deliberately failed, because configuring a protocol correctly ' +
          'the first time teaches you much less than watching it misbehave. I write down what ' +
          'the failure looked like from the outside before I knew the cause, which turns out ' +
          'to be the useful half of the note.',
      ],
      highlight: {
        label: 'The interesting part',
        text:
          'The automation is driven from YAML source-of-truth files rather than from scripts ' +
          'with the addresses typed into them. The same file produces the deployment, the ' +
          'validation run and the documentation, so the three cannot drift apart — which is ' +
          'the actual failure mode on real networks, far more often than a bad config is.',
      },
      stack: ['Cisco IOS', 'CML', 'Python', 'Netmiko', 'YAML'],
      image: 'builds/lab.jpg',
    },
    {
      title: 'The house network',
      status: 'running',
      blurb: 'Segmented wireless, a real DNS server, and internal TLS from a private CA.',
      body: [
        'The boring infrastructure everything else depends on. Pi-hole is the LAN’s actual ' +
          'resolver rather than an add-on, devices are separated by what they are allowed to ' +
          'reach rather than by what room they are in, and nothing on the network talks in ' +
          'the clear.',
      ],
      highlight: {
        label: 'What it taught me',
        text:
          'Failure domains. A VPN client once quietly appointed itself the host’s global ' +
          'resolver with nothing upstream of it, and every build on that machine started ' +
          'failing on name resolution. The DNS server was up and answering correctly the ' +
          'entire time. Everything looked broken at once, almost none of it was, and the ' +
          'fix was two lines — but only after I stopped debugging the thing that was ' +
          'reporting the error.',
      },
      stack: ['Pi-hole', 'Linux', 'TLS', 'VLANs'],
    },
  ];

  readonly failed = signal(new Set<string>());

  onImageError(title: string) {
    this.failed.update((s) => new Set(s).add(title));
  }

  showImage(b: Build): boolean {
    return !!b.image && !this.failed().has(b.title);
  }
}
