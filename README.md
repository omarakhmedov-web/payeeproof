# PayeeProof Website

Public website repository for **payeeproof.com**.

## Purpose
This repository contains the static public-facing site for PayeeProof:
- the main marketing page,
- pricing and pilot pages,
- trust and security pages,
- use-case and policy pages,
- legal pages,
- the public OpenAPI contract,
- sample verification record assets.

## Product positioning
**PayeeProof is a pre-send verification layer for stablecoin payouts.**

The core promise is simple:
- check the route before funds move,
- return a clear verdict,
- leave behind a readable verification record.

Public positioning stays **pre-send first**.
Recovery guidance may exist as a separate product path, but it is secondary to the main website story.

## Current live scope shown on the site
- Networks: **Ethereum, Arbitrum, Base, Polygon, BNB Chain, Solana**
- Public checker assets: **USDC** and **USDT**
- Core public product language: **SAFE / BLOCK / REVERIFY**

## Main pages
- `index.html` — main website
- `pricing.html` — pricing and rollout paths
- `pilot-pack.html` — pilot scope and boundaries
- `pilot-flow.html` — pilot process
- `policy_examples.html` — decision examples and policy presets
- `technical-sample.html` — technical overview
- `trust-security.html` — trust and security framing
- `use-cases.html` — workflow fit and examples
- `sample-verification-record.html` — example record page
- `sample-verification-record.json` — example record payload
- `openapi.yaml` — public contract for the current API surface
- `legal/` — public legal pages

## Deployment
This repository is intended for **static hosting**.
Current production deployment is the GitHub Pages site at **payeeproof.com**.

## Notes
This repo is for the public website and public contract surface.
Backend logic, API processing, records, billing limits, policy enforcement, and webhook delivery live in the separate **payeeproof-api** repository.
