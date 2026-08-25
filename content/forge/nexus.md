---
title: Nexus
state: in-service
blurb: A self-hosted operations platform that runs my house, on hardware I own.
stock: Angular, FastAPI, Postgres, MQTT, Caddy, Docker
image: /images/forge/nexus.jpg
struck: Where the work went
order: 1
---

Angular front end, FastAPI backend, Postgres, a Mosquitto broker and Caddy, all
described by one Docker Compose file on a Linux box. It tracks devices, finances, a
calendar and the lights, and it is the thing I reach for when I want to learn something
properly rather than read about it.

The rule the whole design hangs off is a split: state that changes on its own goes over
MQTT, retained, so anything that connects late immediately knows the truth. Questions and
commands go over HTTP. Exactly one process is allowed to poll a device on a timer, so
there is never a second opinion about what a sensor said.

<!--struck-->

It has two front doors that share nothing. The browser gets a session cookie on `/api`;
a language model gets a bearer token on `/mcp`. Neither credential opens the other door,
and both directions are tested.

It is enforced by a single pure-ASGI middleware rather than the framework's convenience
wrapper — the convenient one buffers whole responses, which would have quietly broken the
live event stream. Nothing in the business logic knows authentication exists at all.
