import test from "node:test";
import assert from "node:assert/strict";

// #5716 — a relay proxy "Test" that got a non-200 from the relay showed a bare
// "failed" with no reason. The test-result shaper must carry an actionable
// `error` for every non-200 status, and none for a 200.
const { buildRelayTestResult } = await import(
  "../../src/app/api/settings/proxy/test/relayTestResult.ts"
);

const base = { publicIp: "1.2.3.4", latencyMs: 12, relayUrl: "https://relay.example" };

test("#5716 a 200 relay response is a success with no error", () => {
  const r = buildRelayTestResult({ ...base, statusCode: 200, relayAuthPresent: true });
  assert.equal(r.success, true);
  assert.equal(r.error, undefined);
  assert.equal(r.proxyUrl, "https://relay.example");
});

test("#5716 a non-200 relay response fails WITH a diagnostic error", () => {
  const r = buildRelayTestResult({
    ...base,
    statusCode: 502,
    publicIp: null,
    relayAuthPresent: true,
  });
  assert.equal(r.success, false);
  assert.ok(
    typeof r.error === "string" && r.error.includes("502"),
    `non-200 relay test must surface the HTTP status; got error=${JSON.stringify(r.error)}`
  );
});

test("#5716 a 401 with missing relay auth hints at the auth/encryption-key cause", () => {
  const r = buildRelayTestResult({
    ...base,
    statusCode: 401,
    publicIp: null,
    relayAuthPresent: false,
  });
  assert.equal(r.success, false);
  assert.ok(
    typeof r.error === "string" && /auth/i.test(r.error),
    `401 with no relay auth should hint at the auth token; got error=${JSON.stringify(r.error)}`
  );
});
