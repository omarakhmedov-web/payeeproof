[reason-codes.md](https://github.com/user-attachments/files/26307618/reason-codes.1.md)
# PayeeProof reason codes

This page lists the short labels used in PayeeProof responses.

Each response should be read through three fields:

- `verdict` — the main answer
- `reason_code` — the short label behind that answer
- `next_action` — what the team should do next

Use the short labels for rules, reporting, and support review. Do not route decisions from free-form explanation text.

## Current mapping

| reason_code | verdict | next_action | Plain meaning |
|---|---|---|---|
| `OK` | `SAFE` | `SAFE_TO_PROCEED` | Expected and provided details matched, and the destination looks operationally normal. |
| `NETWORK_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided network differs from the approved network. |
| `ASSET_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided asset differs from the approved asset. |
| `ADDRESS_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided destination differs from the approved destination. |
| `INVALID_ADDRESS` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided destination is malformed for the selected network. |
| `ZERO_ADDRESS` | `BLOCK` | `BLOCK_AND_REVERIFY` | The destination is an EVM zero address and must never be approved. |
| `MEMO_MISMATCH` | `BLOCK` | `RECHECK_MEMO_OR_TAG` | A memo or destination tag mismatch was detected. |
| `DESTINATION_IS_CONTRACT_OR_APP` | `TEST_FIRST` | `CONFIRM_DESTINATION` | The destination is not a plain personal wallet and depends on contract or app logic. |
| `DESTINATION_IS_BRIDGE_ROUTER` | `TEST_FIRST` | `CONFIRM_DESTINATION` | The destination looks like bridge or router infrastructure. |
| `DESTINATION_REQUIRES_MEMO_OR_VENUE_CHECK` | `REVERIFY` | `RECHECK_MEMO_OR_TAG` | The destination looks like a deposit-style route that may depend on venue and memo or tag. |
| `DESTINATION_NOT_CLASSIFIED` | `REVERIFY` | `REVERIFY_DESTINATION` | Core details matched, but live classification stayed inconclusive. |
| `DESTINATION_LOOKUP_UNAVAILABLE` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | The live destination lookup did not complete, so the result must not be treated as final approval. |
| `UNSUPPORTED_NETWORK` | `BLOCK` | `BLOCK_AND_REVERIFY` | The selected network is outside the current live scope. |
| `UNSUPPORTED_ASSET` | `BLOCK` | `BLOCK_AND_REVERIFY` | The selected asset is outside the current live scope. |
| `UNSUPPORTED_ASSET_OR_NETWORK` | `BLOCK` | `BLOCK_AND_REVERIFY` | The asset-network combination is outside the current live scope. |
| `REQUEST_FAILED` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | The request failed before a reliable answer could be produced. |
| `RENDER_FAILED` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | The service could not assemble the final response safely. |

## Main verdicts

- `SAFE` — approve the payout
- `BLOCK` — stop before funds move
- `REVERIFY` — pause and confirm
- `TEST_FIRST` — use a small controlled test
- `UNAVAILABLE` — no approval should be inferred

## Main next_action values

- `SAFE_TO_PROCEED`
- `BLOCK_AND_REVERIFY`
- `CONFIRM_DESTINATION`
- `RECHECK_MEMO_OR_TAG`
- `REVERIFY_DESTINATION`
- `RETRY_OR_ESCALATE`

## Stability note

New optional fields may be added in `v1`, but the meaning of the labels above should not change quietly.

If a label needs a breaking interpretation change, that should happen in a new API version.
