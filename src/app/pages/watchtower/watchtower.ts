import { Component, computed, signal } from '@angular/core';
import { site } from '../../core/site.config';

/* The Watchtower is a console, not a document. You stand at the centre of an arc
   with three sectors on it — what is running, what it looks like on paper, and
   what changed — and work them from there. The page itself stays lean: every
   detail opens in the window rather than scrolling underneath. */

type SectorId = 'systems' | 'architecture' | 'changes';

// ---- Sector one: what is running -----------------------------------------

type State = 'nominal' | 'watch' | 'degraded' | 'planned';

interface Station {
  name: string;
  state: State;
  note: string;
}

// ---- Sector two: what it looks like on paper ------------------------------

// Structurizr's C4 levels, plus a network level for topologies that are not C4
// at all. `level` is what the cabinet files by inside each drawer.
type Level = 'context' | 'container' | 'component' | 'deployment' | 'network';

export interface Diagram {
  /* Short call sign, shown on the strip. Keep it terse — it is read at a
     glance, the way a strip in a rack is. */
  id: string;
  title: string;
  /* The drawer this files under. Anything sharing a `system` groups together. */
  system: string;
  level: Level;
  /* Absolute path under public/, e.g. '/diagrams/nexus-container.svg'. The
     leading slash matters: a relative path resolves against the current URL, so
     it would 404 for anyone who lands on '/watchtower/' with a trailing slash.
     SVG stays crisp at any zoom; raster is fine for anything that can only be
     screenshotted. */
  file: string;
  kind: 'svg' | 'raster';
  /* ISO month the drawing was last true, e.g. '2026-08'. */
  drawn: string;
  summary: string;
}

interface Drawer {
  system: string;
  diagrams: Diagram[];
}

// ---- Sector three: what changed -------------------------------------------

interface Change {
  date: string;
  system: string;
  what: string;
  why: string;
}

// ---- Arc geometry ----------------------------------------------------------

/* The console is drawn in a 1000x400 viewBox with the operator standing at
   (500, 340) — bottom centre — and the arc sweeping overhead from 200° to 340°.
   All of it is derived from these five numbers so the shape can be retuned in
   one place. */
const CX = 500;
const CY = 340;
const R = 290;
const FROM = 200;
const TO = 340;

const rad = (deg: number) => (deg * Math.PI) / 180;
const px = (deg: number, r: number) => CX + r * Math.cos(rad(deg));
const py = (deg: number, r: number) => CY + r * Math.sin(rad(deg));

/** An arc path along a circle of radius `r`, from `a0` to `a1` degrees. */
function arc(a0: number, a1: number, r: number): string {
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${px(a0, r).toFixed(2)} ${py(a0, r).toFixed(2)} ` +
    `A ${r} ${r} 0 ${large} 1 ${px(a1, r).toFixed(2)} ${py(a1, r).toFixed(2)}`;
}

interface Sector {
  id: SectorId;
  label: string;
  /* Where the sector's band sits on the arc, in degrees. */
  a0: number;
  a1: number;
  /* The band path, the spoke back to the operator, and the label's position as
     a percentage of the viewBox — the labels are real HTML buttons layered over
     the drawing, so they stay focusable and keyboard-reachable. */
  band: string;
  spoke: string;
  left: string;
  top: string;
}

function sector(id: SectorId, label: string, a0: number, a1: number): Sector {
  const mid = (a0 + a1) / 2;
  return {
    id,
    label,
    a0,
    a1,
    band: arc(a0, a1, R),
    spoke:
      `M ${px(mid, 48).toFixed(2)} ${py(mid, 48).toFixed(2)} ` +
      `L ${px(mid, 252).toFixed(2)} ${py(mid, 252).toFixed(2)}`,
    left: `${(px(mid, 225) / 1000) * 100}%`,
    top: `${(py(mid, 225) / 400) * 100}%`,
  };
}

@Component({
  selector: 'app-watchtower',
  templateUrl: './watchtower.html',
  styleUrl: './watchtower.scss',
})
export class Watchtower {
  readonly site = site;

  // ---- The drawing --------------------------------------------------------

  readonly outline = arc(FROM, TO, 312);
  readonly innerLine = arc(FROM, TO, 262);

  readonly sectors: Sector[] = [
    sector('systems', 'Systems', 202, 244),
    sector('architecture', 'Architecture', 249, 291),
    sector('changes', 'Changes', 296, 338),
  ];

  /* Graduations along the outer edge. Every fifth one is long, the way a real
     bearing scale is marked. */
  readonly ticks = Array.from({ length: Math.floor((TO - FROM) / 4) + 1 }, (_, i) => {
    const deg = FROM + i * 4;
    const long = i % 5 === 0;
    const inner = long ? 296 : 302;
    return {
      x1: px(deg, inner).toFixed(2),
      y1: py(deg, inner).toFixed(2),
      x2: px(deg, 308).toFixed(2),
      y2: py(deg, 308).toFixed(2),
      long,
    };
  });

  /* Which sector the pointer or keyboard focus is on. Lighting the band is
     driven from here rather than from CSS sibling selectors, so hover and focus
     behave identically. */
  readonly lit = signal<SectorId | null>(null);

  // ---- Sector one ---------------------------------------------------------

  readonly stateLabels: Record<State, string> = {
    nominal: 'nominal',
    watch: 'watching',
    degraded: 'degraded',
    planned: 'not yet built',
  };

  readonly stations: Station[] = [
    {
      name: 'Nexus',
      state: 'nominal',
      note: 'Operations platform. API, broker, database and reverse proxy on one host.',
    },
    {
      name: 'House network',
      state: 'nominal',
      note: 'Segmented wireless, Pi-hole as the LAN resolver, internal TLS from a private CA.',
    },
    {
      name: 'LED fixtures',
      state: 'nominal',
      note: 'ESP32 boards on the MQTT bus, reporting state retained.',
    },
    {
      name: 'Restore drill',
      state: 'watch',
      note: 'Nightly dumps run. None has ever been restored, so they are files, not backups.',
    },
    {
      name: 'Live telemetry',
      state: 'planned',
      note: 'This board is hand-curated. Wiring it to the real thing is a later phase.',
    },
  ];

  /* The centre readout takes the worst state on the board — a tower reports the
     exception, not the average. */
  readonly overall = computed<State>(() => {
    if (this.stations.some((s) => s.state === 'degraded')) return 'degraded';
    if (this.stations.some((s) => s.state === 'watch')) return 'watch';
    return 'nominal';
  });

  // ---- Sector two ---------------------------------------------------------

  readonly levelLabels: Record<Level, string> = {
    context: 'system context',
    container: 'container',
    component: 'component',
    deployment: 'deployment',
    network: 'network',
  };

  /* Drop exports in public/diagrams/ and add a row here. Structurizr: export
     the view as SVG and keep the file name matching the view key. Delete the
     sample below once a real drawing takes its place. */
  readonly diagrams: Diagram[] = [
    {
      id: 'SAMPLE-01',
      title: 'Sample drawing — replace with a Structurizr export',
      system: 'Sample',
      level: 'context',
      file: '/diagrams/sample-context.svg',
      kind: 'svg',
      drawn: '2026-08',
      summary:
        'Scaffolding, not a real system. It exists so the cabinet, the strips and the ' +
        'light table can be seen working before any real drawings land. Delete this row ' +
        'and the file it points at.',
    },
  ];

  readonly drawers = computed<Drawer[]>(() =>
    this.diagrams.reduce<Drawer[]>((drawers, d) => {
      const drawer = drawers.find((x) => x.system === d.system);
      if (drawer) drawer.diagrams.push(d);
      else drawers.push({ system: d.system, diagrams: [d] });
      return drawers;
    }, []),
  );

  // ---- Sector three -------------------------------------------------------

  /* PLACEHOLDER DATES. Each entry below describes a change that is genuinely
     documented elsewhere in this repo, but the dates are made up — replace them
     with the real ones before this goes out. Newest first. */
  readonly changes: Change[] = [
    {
      date: '2026-08-14',
      system: 'Fixtures',
      what: 'Device commands moved to retain off',
      why: 'A retained command is redelivered on every reconnect, so a power blip was ' +
        'turning the hallway light on by itself at 3am. State stays retained; commands do not.',
    },
    {
      date: '2026-07-30',
      system: 'Fixtures',
      what: 'Gradients defined as colour stops rather than pixel frames',
      why: 'Up to eight stops at fractional positions, so one command means the same ' +
        'thing on an 84-pixel bar and a 30-pixel shelf, and the payload stays inside the buffer.',
    },
    {
      date: '2026-07-11',
      system: 'Lab',
      what: 'Automation driven from YAML source-of-truth files',
      why: 'The same file now produces the deployment, the validation run and the ' +
        'documentation, so the three cannot drift apart.',
    },
    {
      date: '2026-06-22',
      system: 'House',
      what: 'Pi-hole promoted to the LAN’s actual resolver',
      why: 'It was an add-on pointed at by whoever remembered to. Making it the resolver ' +
        'means DNS is one thing with one answer.',
    },
  ];

  // ---- The window ---------------------------------------------------------

  /* One window, two modes. Opening a diagram swaps the same window over to the
     light table rather than stacking a second overlay on top of the first —
     nested modals get bad fast. */
  readonly sector = signal<SectorId | null>(null);
  readonly plate = signal<Diagram | null>(null);

  readonly sectorLabel = computed(
    () => this.sectors.find((s) => s.id === this.sector())?.label ?? '',
  );

  count(id: SectorId): number {
    if (id === 'systems') return this.stations.length;
    if (id === 'architecture') return this.diagrams.length;
    return this.changes.length;
  }

  openSector(id: SectorId) {
    this.sector.set(id);
    this.plate.set(null);
  }

  closeWindow() {
    this.sector.set(null);
    this.plate.set(null);
  }

  /** Escape backs out one step: light table → strip rack → closed. */
  escape() {
    if (this.plate()) this.backToRack();
    else this.closeWindow();
  }

  // ---- The light table ----------------------------------------------------

  readonly zoom = signal(1);
  readonly pan = signal({ x: 0, y: 0 });

  private dragging = false;
  private origin = { x: 0, y: 0 };

  pull(d: Diagram) {
    this.plate.set(d);
    this.reset();
  }

  backToRack() {
    this.plate.set(null);
  }

  reset() {
    this.zoom.set(1);
    this.pan.set({ x: 0, y: 0 });
  }

  zoomBy(factor: number) {
    this.zoom.update((z) => Math.min(6, Math.max(0.5, z * factor)));
  }

  // Wheel zoom, but only with a modifier held — a bare wheel should still scroll
  // the page under a window that fills the screen.
  onWheel(event: WheelEvent) {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    this.zoomBy(event.deltaY < 0 ? 1.12 : 1 / 1.12);
  }

  startDrag(event: PointerEvent) {
    if (event.button !== 0) return;
    this.dragging = true;
    const { x, y } = this.pan();
    this.origin = { x: event.clientX - x, y: event.clientY - y };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }

  onDrag(event: PointerEvent) {
    if (!this.dragging) return;
    this.pan.set({ x: event.clientX - this.origin.x, y: event.clientY - this.origin.y });
  }

  endDrag(event: PointerEvent) {
    this.dragging = false;
    (event.target as Element).releasePointerCapture?.(event.pointerId);
  }

  readonly transform = computed(() => {
    const { x, y } = this.pan();
    return `translate(${x}px, ${y}px) scale(${this.zoom()})`;
  });

  readonly zoomLabel = computed(() => `${Math.round(this.zoom() * 100)}%`);
}
