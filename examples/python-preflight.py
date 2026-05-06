import json
import os
import sys

import requests

API_BASE = os.getenv("PAYEEPROOF_API_BASE", "https://payeeproof-api.onrender.com")
API_KEY = os.getenv("PAYEEPROOF_API_KEY")

if not API_KEY:
    print("Missing PAYEEPROOF_API_KEY", file=sys.stderr)
    sys.exit(1)

payload = {
    "expected": {
        "network": "ethereum",
        "asset": "USDC",
        "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
        "memo": None,
    },
    "provided": {
        "network": "ethereum",
        "asset": "USDC",
        "address": "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
        "memo": None,
    },
    "context": {
        "reference_id": "payout_102948",
        "flow_type": "payout_approval",
        "policy_profile": "payout_strict",
    },
}

try:
    response = requests.post(
        f"{API_BASE}/api/preflight-check",
        headers={
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
        },
        json=payload,
        timeout=20,
    )
except requests.RequestException as exc:
    print("Request failed", file=sys.stderr)
    print(str(exc), file=sys.stderr)
    sys.exit(1)

try:
    data = response.json()
except ValueError:
    print(f"HTTP {response.status_code}", file=sys.stderr)
    print(response.text, file=sys.stderr)
    sys.exit(1)

if not response.ok:
    print(f"HTTP {response.status_code}", file=sys.stderr)
    print(json.dumps(data, indent=2, ensure_ascii=False), file=sys.stderr)
    sys.exit(1)

print("PayeeProof result")
print(f"Verdict: {data.get('verdict')}")
print(f"Reason: {data.get('reason_code')}")
print(f"Next action: {data.get('next_action')}")
print(f"Confidence: {data.get('confidence')}")
print(f"Confidence score: {data.get('confidence_score') or 'n/a'}")
print(f"Risk level: {data.get('risk_level') or 'n/a'}")
print(f"Record ID: {data.get('record_id') or 'n/a'}")

why = data.get("why_this_verdict")
if why:
    print(f"Why: {why}")

ai_risk_context = data.get("ai_risk_context") or {}
ai_summary = ai_risk_context.get("summary")
if ai_summary:
    print(f"AI risk context: {ai_summary}")
