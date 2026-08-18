---
title: A retained command is a command that fires again at 3am
date: 2026-08-14
summary: MQTT's retain flag is the right tool for state and the wrong tool for commands. The failure mode only shows up when a device reboots.
tags: MQTT, IoT, Architecture
---

MQTT's `retain` flag does something simple and useful: the broker keeps the last
message on a topic and hands it to anyone who subscribes later. For device *state*
that is exactly what you want. A dashboard that connects at noon should immediately
learn that the printer is idle and the hallway light is on, without waiting for the
next update.

So the rule in my system is: **state that changes on its own goes over MQTT, retained.**

The trap is what happens when you apply the same flag to commands.

## The failure

A light takes commands on `erp/light/<id>/set`. Early on it was tempting to publish
those retained too — same bus, same shape, and it meant a device that missed a
command would pick it up when it came back.

That last part is the problem stated as if it were a feature.

Picture a board that loses power at 3am and reconnects. It subscribes to its `set`
topic. The broker helpfully delivers the retained message still sitting there — a
command from nine hours ago — and the board does what it is told. The light comes on
in an empty house. Nobody sent anything. The message was a fossil, and the device
had no way to know that.

Worse, it is not a one-time event. That message stays until it is overwritten or
cleared. Every reconnect replays it. You end up with a light that switches itself on
after every power blip, and a debugging session where nothing in the logs shows a
command being sent, because none was.

## The distinction

The fix is a one-word change and a rule worth stating out loud:

> A device command is an **event**, not state. Events are published with retain off,
> always.

State answers "what is true right now" and should survive a reconnect. An event says
"this happened at this moment" and is meaningless once the moment passes. Retain is
for the first kind. Delivering a stale event is not resilience, it is a device acting
on instructions from the past.

The distinction also tells you what to do about the missed-command case that made
retain look attractive. You do not fix it by making the command permanent. You fix it
by having the device *report its state* when it connects, and letting whatever cares
about that state decide whether to send a fresh command. The reporting is retained.
The command is not.

## The one that bites twice

There is a related gotcha on the state side: an empty payload on a retained topic is
how you *delete* a retained message. That is the protocol's way of saying "forget
what I told you."

If your bridge stores that empty payload as the string `""` instead of treating it as
a deletion, a service that shut down cleanly — announcing its departure exactly as
designed — stays on your dashboard forever, showing an empty value that reads as
"present but quiet." The tidy shutdown produces the permanent ghost.

Both bugs have the same root. The retain flag is not a delivery guarantee you sprinkle
on for reliability. It is a statement about whether a message is still true after time
passes. Ask that question per topic, and both problems disappear before you write the
code.
