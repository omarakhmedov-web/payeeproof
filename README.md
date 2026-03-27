[payeeproof_README.md](https://github.com/user-attachments/files/26310325/payeeproof_README.md)
# PayeeProof Website

Public website repository for **payeeproof.com**.

## What this repo contains
- Main marketing site and public product pages
- Pricing, pilot pack, policy examples, trust, and legal pages
- Public OpenAPI contract for the current API surface
- Public sample verification record assets

## Product focus
PayeeProof is a **pre-send verification layer** for stablecoin payouts.

The primary job is simple:
- check the route before funds move,
- return a clear verdict,
- leave behind a readable verification record.

Recovery guidance can exist as a separate product path, but the website and public API positioning stay **pre-send first**.

## Live scope shown on the site
- Ethereum
- Arbitrum
- Base
- Polygon
- BNB Chain
- Solana

Public website checker scope is intentionally narrow and should stay easy to understand.

## Main public pages
- `index.html` — main site
- `pricing.html` — pricing and rollout paths
- `pilot-pack.html` — pilot scope and boundaries
- `policy_examples.html` — verdicts, destination classes, and policy presets
- `technical-sample.html` — technical overview
- `trust-security.html` — trust and security framing
- `use-cases.html` — workflow fit and use cases
- `legal/` — legal pages

## Public API contract
`openapi.yaml` describes the current public contract.

Current public API positioning is:
- **pre-send first**
- verification records and account endpoints for authenticated clients
- recovery guidance treated as a separate module/path when referenced in public materials

## Deploy
This repo is intended for static hosting on GitHub Pages.
