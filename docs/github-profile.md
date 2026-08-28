<!--
  This is the GitHub PROFILE README. It does not belong to this site.

  To publish it: create a public repository named exactly BSLang2006/BSLang2006
  (a repo whose name matches your username is a special case GitHub renders on
  your profile page), and copy the content below into its README.md.

  It is kept here so it is version-controlled alongside the copy it mirrors —
  it is the third of the four corners of the presence strip, and the two web
  properties can be edited while GitHub and LinkedIn cannot.
-->

# Brandon Lang

Network operations, infrastructure, and the software that ties them together.
West Palm Beach, FL.

Most of what I build started as a problem in my own house that I could have
solved by buying something, and didn't.

## On the web

| | | |
|---|---|---|
| **[B Lang's Citadel](https://brandonscottlang.com)** | portfolio | The systems I run, the drawings, and what broke. |
| **[B Lang's Argus](https://blangsargus.com)** | product | An assistant that documents the work while I do it. |
| **GitHub** | code | You are here. |
| **[LinkedIn](https://www.linkedin.com/in/brandon-lang-596b78215)** | profile | The résumé, and the people who have worked with me. |

## What I actually run

- **Nexus** — a self-hosted operations platform: Angular, FastAPI, Postgres,
  Mosquitto and Caddy from one Docker Compose file. State that changes on its
  own goes over MQTT, retained; questions and commands go over HTTP. It has two
  front doors that share nothing — a session cookie on `/api`, a bearer token on
  `/mcp` — enforced by one pure-ASGI middleware, and nothing in the business
  logic knows authentication exists.
- **Addressable LED fixtures** — ESP32 firmware on the same authenticated bus.
  Gradients are defined as colour stops at fractional positions rather than
  pixel frames, so one command means the same thing on an 84-pixel bar and a
  30-pixel shelf.
- **An enterprise routing and switching lab** — Catalyst hardware and CML, built
  specifically to be broken. The automation runs from YAML source-of-truth files,
  so the deployment, the validation run and the documentation cannot drift apart.
- **The house network** — segmented wireless, Pi-hole as the LAN's actual
  resolver, internal TLS from a private CA.

## Currently

**AWS Certified Cloud Practitioner** (August 2026). Working through CCNP
Enterprise (ENCOR) in the lab rather than on paper — standing scenarios up, breaking them on purpose,
and writing down what the failure looked like from the outside before I knew the
cause. That part is public, along with the problems in my own systems I have not
solved yet.
