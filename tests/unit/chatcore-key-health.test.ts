// tests/unit/chatcore-key-health.test.ts
// Characterization of recordKeyHealthStatus — the per-request API-key health updater extracted
// from handleChatCore (chatCore god-file decomposition, #3501). Locks the observable in-memory
// transitions driven through apiKeyRotator: 401 → failure (warning, then invalid at the threshold),
// 2xx → success/recovery, selectedKeyId scoping, and the no-op paths (missing connectionId, and
// non-401/non-2xx statuses). The DB persistence side effect (updateProviderConnection) is moved
// byte-identically and is fire-and-forget; these tests assert the synchronous health mutations.
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { recordKeyHealthStatus } from "../../open-sse/handlers/chatCore/keyHealth.ts";
import { getAllKeyHealth, removeConnectionHealth } from "../../open-sse/services/apiKeyRotator.ts";

const noopLog = { warn: () => {}, error: () => {} };
const touched: string[] = [];

function creds(connectionId: string, psd: Record<string, unknown> = {}) {
  touched.push(connectionId);
  // Key health only applies to connections that actually carry key material —
  // the synthetic noauth connection (apiKey/accessToken null) is covered by the
  // dedicated #9827 no-op test below.
  return { connectionId, apiKey: "kh-test-key", accessToken: null, providerSpecificData: psd };
}

afterEach(() => {
  for (const c of touched.splice(0)) removeConnectionHealth(c);
});

test("missing connectionId is a no-op (no health entry created)", () => {
  const before = Object.keys(getAllKeyHealth()).length;
  const r = recordKeyHealthStatus(200, { providerSpecificData: {} }, noopLog);
  assert.equal(r, undefined);
  assert.equal(Object.keys(getAllKeyHealth()).length, before);
});

test("401 marks the selected key as failed → warning after the first failure", () => {
  const conn = "kh-401-warning";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  const h = getAllKeyHealth()[`${conn}:primary`];
  assert.equal(h?.failures, 1);
  assert.equal(h?.status, "warning");
});

test("401 reaches invalid at the failure threshold (2 consecutive)", () => {
  const conn = "kh-401-invalid";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  recordKeyHealthStatus(401, creds(conn), noopLog);
  const h = getAllKeyHealth()[`${conn}:primary`];
  assert.equal(h?.failures, 2);
  assert.equal(h?.status, "invalid");
});

test("genuine 403 credential failures warn then invalidate only the rejected key", () => {
  const conn = "kh-403-credential";
  const failure = JSON.stringify({
    error: { code: "invalid_api_key", message: "Invalid API key" },
  });

  recordKeyHealthStatus(
    403,
    creds(conn, { selectedKeyId: "extra_0" }),
    noopLog,
    undefined,
    failure
  );
  let all = getAllKeyHealth();
  assert.equal(all[`${conn}:extra_0`]?.status, "warning");
  assert.equal(all[`${conn}:extra_0`]?.failures, 1);
  assert.equal(all[`${conn}:primary`], undefined);

  recordKeyHealthStatus(
    403,
    creds(conn, { selectedKeyId: "extra_0" }),
    noopLog,
    undefined,
    failure
  );
  all = getAllKeyHealth();
  assert.equal(all[`${conn}:extra_0`]?.status, "invalid");
  assert.equal(all[`${conn}:extra_0`]?.failures, 2);
  assert.equal(all[`${conn}:primary`], undefined);
});

test("model capability failures and model-sync conflicts do not touch credential health", () => {
  const cases = [
    [400, JSON.stringify({ error: { code: "model_not_found", message: "Model not found" } })],
    [403, JSON.stringify({ error: { code: "unsupported_model", message: "Unsupported model" } })],
    [409, JSON.stringify({ error: "Model discovery deferred" })],
  ] as const;

  for (const [status, failure] of cases) {
    const conn = `kh-non-credential-${status}`;
    recordKeyHealthStatus(status, creds(conn), noopLog, undefined, failure);
    assert.equal(
      getAllKeyHealth()[`${conn}:primary`],
      undefined,
      `HTTP ${status} must remain outside API-key credential health`
    );
  }
});

test("2xx after a failure resets the key to active with 0 failures", () => {
  const conn = "kh-2xx-recover";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  recordKeyHealthStatus(204, creds(conn), noopLog);
  const h = getAllKeyHealth()[`${conn}:primary`];
  assert.equal(h?.failures, 0);
  assert.equal(h?.status, "active");
});

test("honors selectedKeyId — scopes the update to the active extra key, not primary", () => {
  const conn = "kh-selected-key";
  recordKeyHealthStatus(401, creds(conn, { selectedKeyId: "extra_1" }), noopLog);
  const all = getAllKeyHealth();
  assert.equal(all[`${conn}:extra_1`]?.status, "warning");
  assert.equal(all[`${conn}:primary`], undefined);
});

test("success on another key cannot clear the affected key", () => {
  const conn = "kh-cross-key-isolation";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  recordKeyHealthStatus(204, creds(conn, { selectedKeyId: "extra_0" }), noopLog);

  const all = getAllKeyHealth();
  assert.equal(all[`${conn}:primary`]?.status, "warning");
  assert.equal(all[`${conn}:primary`]?.failures, 1);
  assert.equal(all[`${conn}:extra_0`]?.status, "active");
  assert.equal(all[`${conn}:extra_0`]?.failures, 0);
});

test("non-401 / non-2xx status does not touch key health", () => {
  const conn = "kh-5xx-noop";
  recordKeyHealthStatus(500, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});

test("401 on a keyless connection is a no-op — no key to fail (#9827)", () => {
  const before = Object.keys(getAllKeyHealth()).length;
  // Synthetic noauth credentials (authType "none") carry no key material.
  recordKeyHealthStatus(
    401,
    { connectionId: "noauth", apiKey: null, accessToken: null, providerSpecificData: {} },
    noopLog
  );
  assert.equal(Object.keys(getAllKeyHealth()).length, before);
});

test("CPA pool failures do not poison the selected native connection key", () => {
  const conn = "kh-cpa-pool-isolation";
  recordKeyHealthStatus(401, creds(conn), noopLog, "cliproxyapi");
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});
