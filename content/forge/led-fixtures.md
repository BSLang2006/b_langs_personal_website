---
title: Addressable LED fixtures
state: in-service
blurb: ESP32 boards driving LED strip, commanded over the same authenticated bus as everything else.
stock: ESP32, C++, MQTT, WS2812B
image: /images/forge/lights.jpg
struck: Where the work went
order: 2
---

Custom firmware speaking a small JSON contract over MQTT. Each fixture reports its own
state retained, so the dashboard is correct the moment it loads, and takes commands as
plain events that are never retained — a stored command would be redelivered every time a
board reconnected, which means a power blip at 3am turns the lights on by itself.

<!--struck-->

A strip can show a gradient, and the gradient is defined as up to eight colour stops at
fractional positions rather than a frame of pixels.

That one choice is what lets a single command mean the same thing on an 84-pixel bar and
a 30-pixel shelf, and it keeps the payload inside the firmware's buffer — a per-pixel
frame would be a kilobyte on the bus and wrong the moment you cut the strip to length.
