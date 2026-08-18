---
title: Up, down, and the answer most dashboards refuse to give
date: 2026-08-02
summary: A health page that only knows two states will confidently report a recording as a live reading. The third state is the one that keeps you honest.
tags: Monitoring, Operations, Architecture
---

Most status pages have two colours. Green means up, red means down, and every check
resolves to one or the other. It feels complete. It is not, and the gap is where a
particular kind of outage hides — the kind that looks like a healthy morning.

## How the dashboard lied

My services report liveness over a message bus. Each one connects, publishes that it
is alive, and registers a last will — a message the broker sends on its behalf if the
connection drops. That is a genuinely good pattern. A process that dies violently
still announces its own death, because the announcement was pre-arranged with the
broker.

It has one blind spot, and it is structural: **the broker cannot announce its own
death.** There is nobody left to deliver the message.

Now add a detail that seems unrelated. The API keeps the last value it saw for each
topic in memory, so it can answer questions without a round trip. Reasonable. But
combine the two and you get this: the broker goes down, no last-will messages are
ever sent, and the API keeps serving values it heard before the outage. Everything
reads green. The dashboard is not reporting a live system. It is replaying a
recording, and nothing about it looks different from the real thing.

## The third state

The fix is to admit what you actually know. Every service reports as `up`, `down`, or
**`unknown`**, and the rule that makes it work is:

> When the broker is unreachable, anything bus-reported is `unknown`. Never `up`.

`unknown` is not a diagnostic failure. It is the honest answer to "is this running?"
when your only channel for finding out is itself broken. A red light would be a lie
in the other direction — the services were probably fine; I just could not see them.

Each answer also carries *how* it was established: `responding`, `connected`,
`last-will`, `inferred`, or `stale`. That second field turns out to matter as much as
the state. "Up, because it answered a request just now" and "up, because something
told me so a while ago" are different claims, and a page that flattens both into one
green dot has thrown away the part you need at 2am.

## Two things worth stealing

**Probe what cannot speak for itself.** The database and the broker cannot publish a
last will, so something has to check them directly and record the transitions. Without
that, "down since when?" has no answer for exactly the two components whose outage
takes everything else with them.

**Some things are inferred, and should say so.** My reverse proxy publishes nothing.
But the API is not reachable except through it, so a request that arrived is evidence
the proxy is alive. That is a legitimate inference and it is also weaker than a direct
check — so the page prints `inferred` next to it rather than pretending it probed
something.

None of this is sophisticated. It is mostly the discipline of not letting a monitoring
system claim more certainty than it has. The failure I am guarding against was not a
service going down. It was a morning where everything looked fine and none of it was
being measured.
