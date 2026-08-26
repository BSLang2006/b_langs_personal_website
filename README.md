# brandonscottlang.com

**B Lang's Citadel** — the personal site of Brandon Lang, network engineer.
Three rooms:

- **Watchtower** — an operator's console. Live-ish station states, architecture
  diagrams on a light table, and a running log of changes with the reasoning behind them.
- **Forge** — the things I've built, and where the work actually went.
- **Library** — write-ups on networking, operations, and what broke.

[**Visit the site →**](https://brandonscottlang.com)

![The Watchtower console](docs/watchtower.png)

## Built with

Angular 22, prerendered to static HTML at build time. Content authored as
markdown and compiled into a typed module. Deployed from GitHub via AWS Amplify.

No comments, no resume PDF, no credentials page — the site's job is to show the
work, not restate the CV.

## Run it

```bash
npm install
npm start   # http://localhost:4200
