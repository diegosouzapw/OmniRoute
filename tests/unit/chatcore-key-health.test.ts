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
  return { connectionId, providerSpecificData: psd };
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

test("non-401 / non-2xx status does not touch key health", () => {
  const conn = "kh-5xx-noop";
  recordKeyHealthStatus(500, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});
