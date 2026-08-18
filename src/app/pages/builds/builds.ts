import { Component, signal } from '@angular/core';

interface Build {
  title: string;
  status: 'running' | 'ongoing' | 'planned';
  blurb: string;
  detail: string;
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
      title: 'Nexus — self-hosted operations platform',
      status: 'running',
      blurb: 'A modular monolith that runs my house and my finances, on hardware I own.',
      detail:
        'Angular front end, FastAPI backend, Postgres, Mosquitto and Caddy, all in one ' +
        'Docker Compose file on a Linux box. Device state moves over MQTT; questions and ' +
        'commands go over HTTP. Every shape is declared once and the front-end types are ' +
        'generated from it, so the two halves cannot drift apart.',
      stack: ['Angular', 'FastAPI', 'Postgres', 'MQTT', 'Caddy', 'Docker'],
      image: 'builds/nexus.jpg',
    },
    {
      title: 'Addressable LED fixtures over MQTT',
      status: 'running',
      blurb: 'ESP32 boards driving LED strips, commanded from the same bus as everything else.',
      detail:
        'Custom firmware speaking a JSON contract over authenticated MQTT. A strip can hold ' +
        'a gradient of up to eight stops at fractional positions, so one command means the ' +
        'same thing on an 84-pixel bar and a 30-pixel shelf. Each board authenticates as ' +
        'itself and the broker ACL confines it to its own topics.',
      stack: ['ESP32', 'C++', 'MQTT', 'WS2812B'],
      image: 'builds/lights.jpg',
    },
    {
      title: 'Enterprise routing and switching lab',
      status: 'ongoing',
      blurb: 'Cisco Catalyst hardware and Cisco Modeling Labs, built to be broken on purpose.',
      detail:
        'VLANs, STP, EtherChannel, OSPF, EIGRP, BGP and VPNs, with deliberate failure ' +
        'testing rather than happy-path configs. Python and Netmiko automation on top of ' +
        'YAML source-of-truth data, so validation and documentation come from the same file ' +
        'the deployment does.',
      stack: ['Cisco IOS', 'CML', 'Python', 'Netmiko', 'YAML'],
      image: 'builds/lab.jpg',
    },
    {
      title: 'Home network and DNS',
      status: 'running',
      blurb: 'The boring infrastructure everything else depends on.',
      detail:
        'Pi-hole as the real DNS server for the LAN, segmented wireless, and internal TLS ' +
        'from a private CA so nothing on the network talks in the clear. Mostly interesting ' +
        'for what it has taught me about failure domains — when DNS goes, everything looks ' +
        'broken at once and none of it is.',
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
