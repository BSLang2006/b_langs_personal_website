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
- **Comments:** Giscus (GitHub Discussions-backed comment widget) — no backend to build or maintain, and fits a developer/technical audience who already have GitHub accounts.
- **Scope note:** nothing here requires a traditional backend. The Angular app runs client-side, comments live on GitHub via Giscus, the stream is a YouTube embed. This is effectively a static site from AWS's perspective, even though it should feel dynamic to visitors. If a future feature genuinely needs server-side logic (a custom comments system, live home-lab telemetry), that's when Lambda + API Gateway + DynamoDB would come into play — not needed for v1.
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
