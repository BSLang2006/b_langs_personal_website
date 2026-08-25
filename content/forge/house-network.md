---
title: The house network
state: in-service
blurb: Segmented wireless, a real DNS server, and internal TLS from a private CA.
stock: Pi-hole, Linux, TLS, VLANs
struck: What it taught me
order: 4
---

The boring infrastructure everything else depends on. Pi-hole is the LAN's actual
resolver rather than an add-on, devices are separated by what they are allowed to reach
rather than by what room they are in, and nothing on the network talks in the clear.

<!--struck-->

Failure domains. A VPN client once quietly appointed itself the host's global resolver
with nothing upstream of it, and every build on that machine started failing on name
resolution. The DNS server was up and answering correctly the entire time.

Everything looked broken at once, almost none of it was, and the fix was two lines — but
only after I stopped debugging the thing that was reporting the error.
