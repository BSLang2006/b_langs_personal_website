# Personal Site — Project Brief

Reference doc for planning/build. Written from a whiteboarding session on 2026-08-18. This is a brief for a personal website for Brandon — separate from his existing business site (Argus / blangsargus.com, "B Lang's" branding).

## Purpose & Audience

- This is a **professional portfolio site**, not a personal/family site.
- Audience: professional contacts and hiring managers — Brandon is actively job hunting.
- Traffic arrives with context (LinkedIn, resume link), not cold search. The site doesn't need to work hard to introduce him — it needs to confirm what a visitor already suspects and give them a reason to look around.
- Underlying theme: less "static portfolio," more a small **community hub**. Engagement (blog comments, stream chat) matters as much as display.
- Timeline pressure: his current online presence is stale, and he's job hunting now — ship fast over experimenting.

## Site Sections

1. **Landing page** — see design direction below.
2. **Blog** — with comments enabled, aiming for an actual returning readership, not just static posts. Likely home for security/data-analysis writing (doubles as portfolio content demonstrating expertise).
3. **Gallery** — his builds: LED projects and other maker work, added as he completes them.
4. **Live stream** — YouTube livestreams of him working: coding, LED builds, his "Nexus" personal-ERP project, CCNP lab building. Chat-enabled, hoping for viewers to hop in. Linked from LinkedIn when live. Cadence/schedule not decided yet — he liked the idea that a recurring stream would give his days structure, but hasn't committed to a schedule.

## Landing Page / Hero Direction

- Blend of **live-tech + warm personality** — not purely a cold technical hero, not purely a personal photo hero.
- Concept: an **"instrument panel" / HUD-style display** — gauges/indicators showing active protocols, technologies, and languages, evoking a cockpit/avionics feel. This is the visual anchor of the page.
- Personal warmth (a photo, an intro line, his actual voice) sits alongside the panel rather than being buried below the fold.
- **Build-order decision:** start with a stylized/animated panel — hand-curated data, no live backend. Real telemetry from his home lab is a later phase; wiring that up safely is a bigger lift than there's time for right now. GitHub stats (via GitHub's API) are the easiest first real-data upgrade if/when he wants to move a gauge from "stylized" to "real."

## Tech Stack (locked in)

- **Frontend:** Angular. He already knows it; priority is shipping fast for the job hunt, not learning a new framework right now. (Note: this doesn't limit visual polish — the sleek/modern look is a CSS/animation concern, not a framework concern.)
- **Hosting/deploy:** AWS Amplify + GitHub, the same pipeline already running for blangsargus.com (Argus). Reuses infrastructure he already knows — no new ops to learn.
- **Comments:** ~~Giscus~~ — removed 2026-08-25, see the decisions at the bottom of this file. Discussion happens on LinkedIn.
- **Scope note:** nothing here requires a traditional backend. The Angular app runs client-side, the stream is a YouTube embed. This is effectively a static site from AWS's perspective, even though it should feel dynamic to visitors. If a future feature genuinely needs server-side logic (a custom comments system, live home-lab telemetry), that's when Lambda + API Gateway + DynamoDB would come into play — not needed for v1.
- **Color scheme:** not decided — use a sensible default/neutral placeholder for now (e.g. a dark theme with one accent color) and revisit later. Don't spend design time here yet.

## Explicitly Not Yet Decided

- Domain name for this site (Argus already owns blangsargus.com — this is a separate personal site and likely needs its own domain).
- Final color palette / typography / brand identity.
- Gallery content mechanics (how builds get added/authored).
- Blog authoring approach (markdown files in-repo vs. something else).
- Livestream schedule/cadence.

## Constraints to Respect

- No new frontend framework — Angular only.
- No new hosting platform — Amplify + GitHub only.
- No live backend/telemetry integration in v1 — stylized data only for the instrument panel.
- Ship quickly; avoid scope/technology choices that add setup overhead without a clear near-term payoff.

---

## Build decisions — 2026-08-18

Recorded during the first build so the brief above does not go stale. Where this
section disagrees with the text above, this section is what was built.

### The live-stream section became the Lab page

Brandon is not ready to stream and did not want a schedule he would have to keep.
The intent behind the section — visible effort, something to study toward, a reason
for people to come back — is served by **`/lab`**: a public study plan listing what
he is working through now, what is scheduled, and what is queued, including open
problems in his own systems that are not solved yet. Comments are enabled on it.

Streaming survives as one honest entry on that page: *planned, no schedule yet*.
No fake "live" badge, no empty embed. When a cadence exists, the entry becomes a
schedule and a YouTube embed drops onto the same page.

### Previously undecided, now decided

- **Domain — `brandonscottlang.com`.** Not actually open: it is already printed on
  the resumes currently going out, so the site has to land there. Sitemap and robots
  are generated against it.
- **Blog authoring — markdown in-repo.** `content/posts/*.md` with frontmatter,
  compiled at build time into a typed module. Chosen over fetching markdown at
  runtime so each post **prerenders with its body text in the HTML** — which is what
  makes posts show up in search results and unfurl properly when shared on LinkedIn.
- **Gallery mechanics — a typed array in `builds.ts`.** Four entries is not a CMS
  problem. Images are optional and fall back to a placeholder, so entries can be
  added before the photos exist.
- **Colour scheme — still a placeholder**, as instructed: dark base, one teal accent,
  amber used only for instrument states. Confined to `:root` in `src/styles.scss`.

### Notes on the panel

Built as specified — stylized, hand-curated, no backend. It reads as gauges over
*capabilities* rather than fake live telemetry, and carries the line
`static readout · live home-lab telemetry planned` so it is not mistaken for
instrumentation it does not have. That also makes the GitHub-stats upgrade an
obvious next step rather than a correction.

### Correction — no resume on the site (2026-08-18)

An earlier pass started turning `/about` into a resume page. That was wrong, and the
brief already said why: visitors arrive with context and have usually seen the resume
already. The site's job is to **show the work**, not restate it.

So there is no PDF and no credentials wall. `/builds` carries the weight — each entry
now leads with the decision inside it that was actually interesting, which is the thing
a resume bullet cannot carry. `/about` is short, personal, and in first person; the
twenty years before tech appear as texture rather than as an employment history.

---

## Build decisions — 2026-08-25

### The site is three named rooms

The nav had been half-renamed: the labels said Watchtower / Forge / Library while the
routes, components and headings still said Builds / Lab / Writing — and the two that had
been renamed were swapped relative to what the names mean. That is now settled, with the
**room name as the source of truth**:

- **Watchtower** (`/watchtower`) — the study plan and the open risks. A watchtower is
  where you see what is coming, so the page is organised by *distance*: in sight,
  inbound, on the horizon, beyond it.
- **Forge** (`/forge`) — the things made and still running. Work with heat and mass.
- **Library** (`/library`) — the writing. Untouched in this pass; being reworked separately.

Old paths (`/writing`, `/builds`, `/lab`, and old post URLs) are preserved as prerendered
redirect stubs, with real 301 rules documented in README for the Amplify console.

### One building, three materials

Watchtower and Forge were fully reworked to feel like different rooms without feeling
like different sites. The shell is deliberately identical — nav, footer, type scale,
card geometry, `.eyebrow`/`.tag`/`.btn`. What changes is material and light, carried by
three CSS variables (`--accent`, `--accent-soft`, `--accent-ink`) that each room sets on
its own root element. Cold blue and thin air upstairs; ember and mass at the fire.

### Giscus is gone

Comments were removed, so all of it went: the component, the config block in
`site.config.ts`, the invitation copy, and the documentation. **This supersedes the
"Comments: Giscus" decision above.** Discussion happens on LinkedIn instead — posts and
Watchtower entries are shared there as write-ups, and the Watchtower's "Signal back"
card links to that thread. Nothing in the app talks to a comment service any more.

### The Library, and the hall it opens off (2026-08-25, later the same day)

**Library.** The third room got the same treatment as the other two. Its organising idea
is *filing*: posts are catalog entries on year shelves, with a call-number line, a ruled
index-card face and subject headings instead of tags. Nothing on the page animates on its
own — the only movement is an entry sliding sideways out of the shelf when you reach for
it, because the room is horizontal the way stacks are. The post view is the reading room:
the shelf ruling becomes a page margin down the left of the body text.

**Post bodies were never actually styled.** Found while checking the reading view: the
`.body h2`, `.body code`, `.body blockquote` rules compile to `.body h2[_ngcontent-x]`
under Angular's emulated encapsulation, and `[innerHTML]` content carries no such
attribute — so every one of them had been matching nothing since the site was built.
They are now inside `:host ::ng-deep`, which reaches the rendered markdown while staying
scoped to the component.

**The landing page is the hall, not a room.** It deliberately owns no colour: its accent
is a warm ivory that reads as lamplight, the ground is neutral stone lit by one soft
overhead source, and the only saturated colour anywhere on the page is the light coming
out of the three doorway cards. That makes the page's job legible at a glance — *choose
where to go* — and gives it a feel none of the rooms have without inventing a fourth
brand colour. `/about` gets the same treatment for the same reason.

The instrument panel was retuned rather than redrawn: same gauges, trace and readouts,
but it now reads `--accent` from whatever it is placed in and separates its states by
*brightness* rather than hue, the way real instruments do. That is what keeps the hall
free of colour while leaving the panel the anchor of the page.

The global body glow went neutral at the same time. It used to be a fixed teal-and-amber
wash, which now fights all three rooms; the building's own light is colourless and each
room lays its own down on top.

### Colour comes back through the instruments (2026-08-25, third pass)

The threshold read as too monochrome. Rather than tint the hall — which would have
cost it the thing that makes it work — the colour went into the two pieces of hardware
that sit on top of it:

- **The HUD panel** now carries the building's whole palette. One gauge per room accent
  (Network/blue, Systems/ember, Software/teal), the trace runs Watchtower blue because a
  trace is something being watched, and the readouts use the three colours to mean
  something: teal for steady and known, ember for working right now, a hollow lamp for
  not started. The panel is effectively the legend for the three doors further down.
- **The header** was restyled into the building's instrument strip: panel-readout
  typography (mono, uppercase, letterspaced) so it belongs to the same family as the HUD,
  each room link a labelled lamp that lights in its own colour, and a two-pixel rail
  across the bottom edge carrying all three room colours. The same rail runs across the
  top of the HUD housing — that repeat is what ties the nav to the panel.

`/about` was brought onto the same footing: lit by the threshold's single warm source,
section headings ruled, and its three room pointers rebuilt as the landing page's lit
doorways rather than plain cards.

---

## Build decisions — 2026-08-25, fourth pass

### The Watchtower became a control tower

The landing page redefined the room: *"where I track system health, document
architecture, and investigate what happens when things break."* The study plan that used
to live here did not fit that and was **dropped** rather than relocated. The room now
holds three instruments, in the order you would actually use them:

1. **The board** — station status for Nexus, the house network, the LED fixtures, the
   restore drill. Hand-curated and labelled as such, exactly like the HUD. Green is not
   in this palette, so nominal reads in the room's own blue and attention is carried by
   amber, the way an instrument would.
2. **The cabinet** — architecture drawings filed by system into drawers, each drawing a
   **flight-progress strip**: dense, mono, one line, pulled sideways out of the rack.
   That is the air-traffic-control idea doing real work rather than being decoration —
   a strip rack is already the right shape for a diagram index.
3. **The log** — investigations written **symptom first**, because the symptom is what
   you have at 3am and it is almost never the thing that is broken. Seeded from incidents
   already documented in `forge.ts`: the VPN resolver, the 3am light, the retained ghost.

### The light table

Pulling a strip opens the drawing full-screen with zoom, drag-to-pan, fit and a link to
the raw file; Esc or a click outside closes it.

The important decision is the **plate**. Structurizr, draw.io and topology tools all
export diagrams styled for light backgrounds, and there is no way to retint them without
rewriting their internals. So rather than fight it, the viewer lays the drawing on a lit
surface — a drawing pulled from the cabinet onto a light table — and frames it in the
room's blue chrome. Diagrams therefore need no theme awareness at all, which means any
export from any tool drops straight in.

Diagrams are registered in a typed manifest in `watchtower.ts`, the same pattern as the
Forge. Paths are absolute (`/diagrams/...`): a relative path resolves against the current
URL and would 404 for anyone landing on `/watchtower/` with a trailing slash. The same
bug was fixed on the Forge images.

### Naming

`B Lang's Citadel` is the building; `site.brand` carries it while `site.name` stays the
person for attribution. `/about` presents as **The Architect** — label only, URL
unchanged, since it is short and already indexed.

---

## Build decisions — 2026-08-25, fifth pass

### The Watchtower became a console

Three stacked scrolling sections is a document pretending to be a tower. The page is now
what the room actually is: **you stand at the centre of an arc with three sectors on it**
— Systems, Architecture, Changes — and the page holds nothing else. Every detail opens in
a window rather than scrolling underneath, which makes "the main page stays lean" fall
out of the structure instead of being a rule to enforce.

The arc is derived from five constants (centre, radius, start and end bearing) so the
whole figure — bands, spokes, graduations, label positions — can be retuned in one place.
Sector labels are real HTML buttons layered over the SVG so they stay focusable; which
band is lit comes from a signal rather than CSS sibling selectors, so pointer and
keyboard behave identically. Below 760px the arc flattens into three plates — an arc
needs width, and pretending otherwise breaks the geometry rather than the layout.

**One window, two modes.** Opening a diagram swaps the same window to the light table
with a back control instead of stacking a second overlay on the first. Escape backs out
one step: light table → rack → closed.

### Dropped

- **The log.** Two of its three incidents were already covered by the retained-MQTT
  Library post and the third by the Forge's house-network entry — it was duplicated
  material, which is probably why it read as weight.
- **The horizon line.** A full-width rule left over from the old "ordered by distance"
  concept, which the room stopped using two passes ago. It ran straight through the lead
  paragraph.

### Changes is the third sector

Taken from the landing copy — *"knowing what changed five minutes ago"* — and distinct
from incident investigation. It is the half of observability a status board cannot show:
the reason something started misbehaving today is usually something that changed
yesterday. **The seeded entries carry placeholder dates** and are flagged as such in the
source; the changes themselves are real and documented elsewhere in the repo.

---

## Build decisions — 2026-08-26

### The Forge is authored in markdown now

**This supersedes "Gallery mechanics — a typed array in `builds.ts`" from 2026-08-18.**
That call was reasonable when the room held four entries nobody was editing. It stopped
being reasonable the moment there was actual writing to do.

The failure mode was specific and worth recording: body copy lived as `string[]` where
each paragraph was several string literals joined with `+`. Deleting a clause mid-edit
left the surrounding fragments concatenated into a sentence that was grammatical
nonsense — and the build stayed green, because it is still a valid string expression.
A format where mistakes produce corrupt prose instead of errors is the wrong format for
prose.

Pieces are now `content/forge/*.md`, compiled by the same `build-content.mjs` that
already handled the Library. Frontmatter carries title, state, blurb, stock, image,
struck label and order; the body is markdown, split on an invisible `<!--struck-->`
comment so the struck block stays a first-class field without needing its own file.
Required fields fail the build loudly, and an unrecognised `state` fails naming the value
it got — the opposite of the old silent corruption.

The component dropped from 139 lines to 31 and now holds no content at all.

Note the encapsulation trap, same as the Library's post bodies: markdown injected with
`[innerHTML]` carries no component attribute, so its styling lives under `:host ::ng-deep`
in `forge.scss`. A plain `.body p` rule there would compile to `.body p[_ngcontent-x]`
and match nothing.

---

## Build decisions — 2026-08-26, console branch

### Depth without images

The console read flat. The fix was **not** photography, and that was the important
call: the whole site ships zero raster imagery and carries every room's identity through
material and light in CSS. A photographic console under vector linework reads as a
compositing mismatch, and a photo cannot retint to the room accent, cannot respond to
state, and cannot reflow. The Stark/LCARS reference is not photographic either — it is
emissive vector linework on dark glass.

So the depth is built from four planes inside a `perspective` container, tilted 16°:

- **Plane 0** the panel — bevel, etched grid, one static specular band, contact shadow.
- **Plane 1** (+26px) the arc drawing, so it separates from the surface rather than
  looking painted onto it.
- **Plane 2** (+44px) the readout rail across the front, where a real console puts them.
- **Plane 3** (+76px) the sector controls, each **counter-rotated -16°** so the labels
  stay square to the reader while the surface beneath them tilts away. Past roughly 18°
  text on a tilted plane starts trading legibility for depth; this keeps both.

**Pointer parallax** is a few degrees of rotation tracking the cursor. It is doing more
work than any of the shading — motion parallax resolves as depth before shading does.
Two custom properties on the deck carry it, so the whole effect is one `transform`.

`three.js` was considered and rejected: 150kB+, and it would break the prerender-to-
static-HTML property the entire site depends on, to orbit a console nobody needs to
orbit.

### The rail is mock, and says so

Three traces, seeded rather than random — an unseeded generator would draw one shape
during prerender and a different one on hydration, and Angular would report the
mismatch. The rail carries a `mock · not wired` label, and the seam for real data is a
single array: replace the samples and neither the component nor the template changes.

### Not free

`prefers-reduced-motion` drops the parallax but keeps the resting tilt, which is a static
composition rather than an animation. Below 760px perspective is switched off entirely
and the deck flattens to plates — an arc needs width and a tilt needs depth. The
component style budget in `angular.json` went from 12kB to 18kB; this room is legitimately
the most graphics-heavy thing on the site.

### Console revisions (same day)

- **Sticky footer, site-wide.** The app host is a flex column at `min-height: 100dvh`
  with the router outlet taking the slack, so a short page — the Watchtower console is
  deliberately short — puts the footer on the bottom edge instead of leaving it floating
  with dead space beneath. It is *not* fixed: long pages scroll it away normally. The
  footer's 4rem outer margin became inner padding, because a margin there would have
  pushed it past the bottom edge and reintroduced a scrollbar on short pages. `100dvh`
  rather than `100vh` so mobile browsers do not measure past their collapsing chrome.

- **The pointer parallax is gone.** It read as wobble rather than depth. The fixed 16°
  tilt and the four translateZ planes carry the effect on their own; a panel that tips
  when the mouse moves reads as a toy. The per-sector hover lift stays — that one is a
  control responding to being approached, not the whole room moving.

- **Hovering a sector projects a panel** carrying that sector's numbers, in the landing
  page instrument panel's housing — bezel, strip header, scanlines — so the two consoles
  read as the same equipment. It sits highest on the deck, counter-rotated to square, and
  throws forward on appear rather than fading. It never shows over an open window, since
  a hover preview of what is already open is noise, and it is `aria-hidden` because every
  number in it is also in the window the sector opens. Hidden entirely below the mobile
  breakpoint, where there is no pointer and the window is one tap away.
