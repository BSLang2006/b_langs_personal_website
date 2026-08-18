---
title: Dinner at six is not a timestamp
date: 2026-07-20
summary: Storing a recurring event as an instant works perfectly until the clocks change, and then it quietly moves by an hour.
tags: Postgres, Time, Architecture
---

Here is a bug that takes six months to appear and about four minutes to explain.

You build a calendar. A weekly event — dinner at six every Sunday. You store it the
way you store everything else with a time on it: as an instant, UTC, timezone-aware.
Correct, boring, done.

In November the clocks change and dinner moves to five.

## Two different things wearing the same type

The mistake is treating "six o'clock" as a point on the timeline. It is not. It is a
position on a *wall clock*, and the whole point of a wall clock is that it stays put
while the timeline slides underneath it. Dinner at six is six in June and six in
December. Anchor it to an instant and you have frozen the offset that happened to be
in effect the day you created it.

So calendar times are stored as `TIMESTAMP` **without** a time zone. Not because
zones are hard, but because the value genuinely does not have one. It is not a moment;
it is a rule about where the hands point.

Exactly one place in the system converts a wall-clock time into an instant, using a
configured timezone, and it does so for exactly one purpose: deciding whether a
reminder is due right now. Everywhere else the value stays as written.

That configured timezone is required at startup with no default. UTC would have
"worked" — the app would have booted, the tests would have passed, and evening
reminders would have fired in the morning. A default that silently produces wrong
behaviour is worse than no default at all, so there is no default.

## Clamping, and the fact that it has two right answers

Recurrence brings its own version of this. An event on the 31st, repeating monthly:
what happens in February?

The calendar answer is 31 Jan → 28 Feb → **31** Mar. The rule remembers it wants the
31st and springs back as soon as a month is long enough to allow it.

The billing answer is 31 Jan → 28 Feb → **28** Mar. Once a subscription lands on the
28th, that is its date now.

Same arithmetic, two conventions, both correct in their own domain. My system does
both, in two modules, and there is a test asserting that they *disagree* — because the
plausible future mistake is somebody noticing the inconsistency and "fixing" it.

## The browser gets one more chance to ruin it

Having carefully kept a date as a wall-clock value all the way through the database
and the API, you hand it to a browser, and someone writes:

```js
new Date('2026-08-11')
```

A date-only ISO string is parsed as **UTC**. Render that anywhere west of Greenwich
and it displays as the 10th. The all-day event on your birthday shows up the day
before, for you and not for your colleague in Berlin, which is a wonderful bug to try
to reproduce.

So there is a small module that parses these strings into local calendar values, and
the rule is that nothing else may call `new Date()` on a date coming from the
calendar. One function, one place to be careful, instead of a rule everybody has to
remember forever.

That is the pattern under all three of these: when a value has a property the type
system cannot express, the defence is not vigilance. It is making sure there is
exactly one function that has to get it right.
