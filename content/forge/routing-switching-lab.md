---
title: Enterprise routing and switching lab
state: in-the-fire
blurb: Cisco Catalyst hardware and Cisco Modeling Labs, built specifically to be broken.
stock: Cisco IOS, CML, Python, Netmiko, YAML
image: /images/forge/lab.jpg
struck: Where the work went
order: 3
---

VLANs, STP and RSTP, EtherChannel, OSPF, EIGRP, BGP and VPNs — built as working
topologies and then deliberately failed, because configuring a protocol correctly the
first time teaches you much less than watching it misbehave.

I write down what the failure looked like from the outside before I knew the cause, which
turns out to be the useful half of the note.

<!--struck-->

The automation is driven from YAML source-of-truth files rather than from scripts with
the addresses typed into them. The same file produces the deployment, the validation run
and the documentation, so the three cannot drift apart — which is the actual failure mode
on real networks, far more often than a bad config is.
