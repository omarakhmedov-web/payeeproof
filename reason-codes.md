# PayeeProof reason codes — v1

This file defines the **stable reason-code layer** for the current pre-send verification API contract.

## Routing principle

For automation or operator playbooks, route on:

- `verdict`
- `reason_code`
- `next_action`

Do **not** route on free-form explanation text.

## Stable mapping

| reason_code | verdict | next_action | Meaning |
|---|---|---|---|
| `OK` | `SAFE` | `SAFE_TO_PROCEED` | Expected and provided details matched, and the destination looks operationally normal. |
| `NETWORK_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided network differs from the approved network. |
| `ASSET_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided asset differs from the approved asset. |
| `ADDRESS_MISMATCH` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided destination differs from the approved destination. |
| `INVALID_ADDRESS` | `BLOCK` | `BLOCK_AND_REVERIFY` | The provided destination is malformed for the selected network. |
| `ZERO_ADDRESS` | `BLOCK` | `BLOCK_AND_REVERIFY` | The destination is an EVM zero address and must never be approved. |
| `MEMO_MISMATCH` | `BLOCK` | `RECHECK_MEMO_OR_TAG` | A memo / destination tag mismatch was detected. |
| `DESTINATION_IS_CONTRACT_OR_APP` | `TEST_FIRST` | `CONFIRM_DESTINATION` | The destination is not a plain personal wallet and depends on contract or app logic. |
| `DESTINATION_IS_BRIDGE_ROUTER` | `TEST_FIRST` | `CONFIRM_DESTINATION` | The destination looks like bridge / router infrastructure. |
| `DESTINATION_REQUIRES_MEMO_OR_VENUE_CHECK` | `REVERIFY` | `RECHECK_MEMO_OR_TAG` | The destination looks like a deposit-style route that may depend on venue and memo/tag. |
| `DESTINATION_NOT_CLASSIFIED` | `REVERIFY` | `REVERIFY_DESTINATION` | Core details matched, but live classification stayed inconclusive. |
| `DESTINATION_LOOKUP_UNAVAILABLE` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | Live destination lookup did not complete, so the result must not be treated as final approval. |
| `UNSUPPORTED_NETWORK` | `BLOCK` | `BLOCK_AND_REVERIFY` | The selected network is outside current supported scope. |
| `UNSUPPORTED_ASSET` | `BLOCK` | `BLOCK_AND_REVERIFY` | The selected asset is outside current supported scope. |
| `UNSUPPORTED_ASSET_OR_NETWORK` | `BLOCK` | `BLOCK_AND_REVERIFY` | The asset-network combination is outside current supported scope. |
| `REQUEST_FAILED` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | The request failed before a reliable decision could be produced. |
| `RENDER_FAILED` | `UNAVAILABLE` | `RETRY_OR_ESCALATE` | The service could not assemble the final response safely. |

## Stable verdicts

- `SAFE` — approve the payout
- `BLOCK` — stop before funds move
- `REVERIFY` — pause and confirm
- `TEST_FIRST` — use a small controlled test
- `UNAVAILABLE` — no approval should be inferred

## Stable next_action values

- `SAFE_TO_PROCEED`
- `BLOCK_AND_REVERIFY`
- `CONFIRM_DESTINATION`
- `RECHECK_MEMO_OR_TAG`
- `REVERIFY_DESTINATION`
- `RETRY_OR_ESCALATE`

## Guidance for future versions

The product may add **new optional fields** in `v1`, but it should not silently change the semantic meaning of the reason codes above.

If a reason code needs a breaking interpretation change, that belongs in a new API version rather than a quiet edit.
