const API_BASE = process.env.PAYEEPROOF_API_BASE || "https://payeeproof-api.onrender.com";
const API_KEY = process.env.PAYEEPROOF_API_KEY;

if (!API_KEY) {
  console.error("Missing PAYEEPROOF_API_KEY");
  process.exit(1);
}

const payload = {
  expected: {
    network: "ethereum",
    asset: "USDC",
    address: "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
    memo: null,
  },
  provided: {
    network: "ethereum",
    asset: "USDC",
    address: "0x59d779BED4dB1E734D3fDa3172d45bc3063eCD69",
    memo: null,
  },
  context: {
    reference_id: "payout_102948",
    flow_type: "payout_approval",
    policy_profile: "payout_strict",
  },
};

async function run() {
  const response = await fetch(`${API_BASE}/api/preflight-check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Non-JSON response:");
    console.error(text);
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`HTTP ${response.status}`);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log("PayeeProof result");
  console.log(`Verdict: ${data.verdict}`);
  console.log(`Reason: ${data.reason_code}`);
  console.log(`Next action: ${data.next_action}`);
  console.log(`Confidence: ${data.confidence}`);
  console.log(`Record ID: ${data.record_id || "n/a"}`);

  if (data.why_this_verdict) {
    console.log(`Why: ${data.why_this_verdict}`);
  }
}

run().catch((error) => {
  console.error("Request failed");
  console.error(error);
  process.exit(1);
});
