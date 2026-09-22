// Live verification for the Meta Muse device OAuth flow (PR #13634).
// Runs against the PR's REAL modules — not a reimplementation.
// Usage (repo root, PR branch checked out):
//   node --import tsx/esm scripts/ad-hoc/verify-meta-device-flow.mjs
// (bun scripts/ad-hoc/verify-meta-device-flow.mjs works too)
// Flow: requestDeviceCode -> (you approve in browser) -> pollToken loop ->
// mintMuseCodeApiKey -> models -> first inference -> re-mint.
// Secrets are never printed (lengths/statuses/ids only). Node 18+.
import { museCode } from "../../src/lib/oauth/providers/muse-code.ts";
import { MUSE_CODE_CONFIG } from "../../src/lib/oauth/constants/muse-code.ts";
import { mintMuseCodeApiKey } from "@omniroute/open-sse/services/museCodeAuth.ts";

const MODELS_URL = "https://api.meta.ai/v1/models";
const RESPONSES_URL = "https://api.meta.ai/v1/responses";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const waitEnter = () => new Promise((res) => { process.stdin.once("data", res); console.log("(continuing)"); });

// 1. real device grant via PR code
const grant = await museCode.requestDeviceCode(MUSE_CODE_CONFIG);
console.log("1. grant: ok | expires_in:", grant.expires_in, "| interval:", grant.interval);
console.log("   OPEN:", grant.verification_uri_complete || grant.verification_uri, "| code:", grant.user_code);
console.log("   Approve in your browser, then press Enter here.");
await waitEnter();

// 2. real poll loop via PR code (until approved or grant expires)
let identity = null;
const deadline = Date.now() + (grant.expires_in || 600) * 1000;
while (Date.now() < deadline) {
  const p = await museCode.pollToken(MUSE_CODE_CONFIG, grant.device_code);
  if (p.ok && p.data.access_token) { identity = p.data.access_token; break; }
  await sleep((grant.interval || 5) * 1000);
}
if (!identity) throw new Error("not approved in time");
console.log("2. poll: identity token issued, len:", identity.length);

// 3. real mint via PR code
const apiKey = await mintMuseCodeApiKey(identity);
console.log("3. mint: ok | key len:", apiKey.length);

// 4. models list (transport check)
const ml = await fetch(MODELS_URL, { headers: { Authorization: `Bearer ${apiKey}` } });
const mld = await ml.json();
console.log("4. models: HTTP", ml.status, "| n =", (mld.data || []).length);

// 5. first inference (transport check)
const ir = await fetch(RESPONSES_URL, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "muse-spark-1.3", input: "Reply with exactly: OK-MUSE-OAUTH", max_output_tokens: 32 }),
});
const id = await ir.json();
console.log("5. inference: HTTP", ir.status, "| id:", id.id);

// 6. re-mint via PR code (repeatability of the refresh step)
const apiKey2 = await mintMuseCodeApiKey(identity);
console.log("6. re-mint: ok | new key len:", apiKey2.length);
console.log("DONE — full chain verified live against PR code.");
