import { Component } from '@angular/core';

// The hall itself has no colour, so the panel is where the building's palette
// lives: one gauge per room accent. It doubles as a legend — by the time you
// reach the three doors below, you have already met the three colours.
type Tone = 'watchtower' | 'forge' | 'library';

interface Gauge {
  label: string;
  value: number; // 0-100, hand-curated — this panel is stylized, not telemetry
  detail: string;
  tone: Tone;
}

interface Readout {
  label: string;
  state: 'ok' | 'active' | 'idle';
}

const CIRCUMFERENCE = 326.73; // 2πr, r = 52

@Component({
  selector: 'app-hud',
  templateUrl: './hud.html',
  styleUrl: './hud.scss',
})
export class Hud {
  readonly circumference = CIRCUMFERENCE;

  readonly gauges: Gauge[] = [
    { label: 'Network', value: 88, detail: 'OSPF · BGP · VLAN · VPN', tone: 'watchtower' },
    { label: 'Systems', value: 79, detail: 'Linux · Docker · TLS · SQL', tone: 'forge' },
    { label: 'Software', value: 71, detail: 'Python · TypeScript · API', tone: 'library' },
  ];

  readonly readouts: Readout[] = [
    { label: 'OSPF', state: 'ok' },
    { label: 'BGP', state: 'ok' },
    { label: 'EIGRP', state: 'ok' },
    { label: 'STP', state: 'ok' },
    { label: 'DHCP', state: 'ok' },
    { label: 'DNS', state: 'ok' },
    { label: 'NAT', state: 'ok' },
    { label: 'MQTT', state: 'active' },
    { label: 'TLS', state: 'ok' },
    { label: 'DOCKER', state: 'active' },
    { label: 'PGSQL', state: 'ok' },
    { label: 'CCNP', state: 'idle' },
  ];

  // Arc is drawn clockwise from the top; offset shrinks as value rises.
  offset(value: number): number {
    return CIRCUMFERENCE * (1 - value / 100);
  }
}
