[README.md](https://github.com/user-attachments/files/26256117/README.19.md)
# PayeeProof API

**PayeeProof** is a pre-send verification layer for stablecoin payouts.

It helps a payout, treasury, OTC, or operations workflow stop wrong-network and wrong-destination mistakes **before funds move**.

## Current product focus

This API contract is for the **B2B pre-send verification** product.

Recovery guidance exists as a separate public/product path and is **not** part of the current pilot API offer.

## What the API returns

The API is designed to return one compact operational record per check:

- `verdict` — the top-level payout decision
- `reason_code` — the machine-readable explanation
- `confidence` — how conservative the result should be treated
- `destination_type` — personal wallet / contract / deposit-like / bridge-router / unknown
- `next_action` — what the operator or workflow should do next
- `checked_at` and `request_id` — traceability for logs and support review

## Current stable pilot surface

- **Base URL:** `https://payeeproof-api.onrender.com`
- **Primary endpoint:** `POST /api/preflight-check`
- **Auth:** `X-API-Key: <client_key>`
- **Contract version:** `v1`
- **Scope:** pre-send verification for supported stablecoin payout routes

## Request shape

```json
{
  "expected": {
    "network": "ethereum",
    "asset": "USDC",
    "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
    "memo": null
  },
  "provided": {
    "network": "ethereum",
    "asset": "USDC",
    "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
    "memo": null
  },
  "context": {
    "reference_id": "payout_102948",
    "flow_type": "payout_approval"
  }
}
```

## Response shape

```json
{
  "ok": true,
  "api_version": "v1",
  "request_id": "ppf_req_01HZZZZZZZZZZZZZZZZZZZZZZ",
  "checked_at": "2026-03-26T10:12:08Z",
  "verdict": "SAFE",
  "reason_code": "OK",
  "confidence": "High",
  "destination_type": "personal_wallet",
  "next_action": "SAFE_TO_PROCEED",
  "why_this_verdict": "Network, asset, address, and memo checks matched. The destination classified as a personal wallet.",
  "scope": {
    "network": "ethereum",
    "asset": "USDC"
  },
  "checks": {
    "network_match": true,
    "asset_match": true,
    "address_match": true,
    "expected_address_valid": true,
    "provided_address_valid": true,
    "memo_match": true
  },
  "expected": {
    "network": "ethereum",
    "asset": "USDC",
    "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69"
  },
  "provided": {
    "network": "ethereum",
    "asset": "USDC",
    "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69"
  }
}
```

## Stable verdicts

- `SAFE` — approve the payout
- `BLOCK` — stop before funds move
- `REVERIFY` — pause and confirm route details
- `TEST_FIRST` — use a small controlled test, then proceed only if confirmed
- `UNAVAILABLE` — do not treat the result as final approval

## Stable reason codes

Core set for `v1`:

- `OK`
- `NETWORK_MISMATCH`
- `ASSET_MISMATCH`
- `ADDRESS_MISMATCH`
- `INVALID_ADDRESS`
- `ZERO_ADDRESS`
- `MEMO_MISMATCH`
- `DESTINATION_IS_CONTRACT_OR_APP`
- `DESTINATION_IS_BRIDGE_ROUTER`
- `DESTINATION_REQUIRES_MEMO_OR_VENUE_CHECK`
- `DESTINATION_NOT_CLASSIFIED`
- `DESTINATION_LOOKUP_UNAVAILABLE`
- `UNSUPPORTED_NETWORK`
- `UNSUPPORTED_ASSET`
- `UNSUPPORTED_ASSET_OR_NETWORK`
- `REQUEST_FAILED`
- `RENDER_FAILED`

Detailed routing notes are in `reason-codes.md`.

## Versioning policy

- The current documented contract is **`v1`**.
- Non-breaking additions may add new optional fields.
- Breaking changes should move to a new version rather than silently changing `v1`.
- Integrators should route primarily on:
  - `verdict`
  - `reason_code`
  - `next_action`

They should not depend on free-form English summary text for policy decisions.

## Files included in this docs layer

- `openapi.yaml` — draft OpenAPI spec for the pilot contract
- `reason-codes.md` — stable reason-code mapping
- `sample-verification-record.json` — reference response example
- `technical-sample.html` — buyer-facing technical contract page

## Example cURL

```bash
curl -X POST "https://payeeproof-api.onrender.com/api/preflight-check"   -H "Content-Type: application/json"   -H "X-API-Key: YOUR_API_KEY"   -d '{
    "expected": {
      "network": "ethereum",
      "asset": "USDC",
      "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69"
    },
    "provided": {
      "network": "ethereum",
      "asset": "USDC",
      "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69"
    },
    "context": {
      "reference_id": "payout_102948",
      "flow_type": "payout_approval"
    }
  }'
```

## Positioning in one line

**Pre-send verification for stablecoin payouts. Stop wrong-network and wrong-destination mistakes before funds move.**
