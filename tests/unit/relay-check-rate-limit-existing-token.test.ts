import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression test for src/lib/db/relayProxies.ts::checkRateLimit.
//
// Covers the perf change that threads an already-fetched RelayToken into
// checkRateLimit to avoid a redundant `SELECT * FROM relay_tokens WHERE id = ?`
// re-query:
//   - the `existingToken` fast-path must agree with the legacy re-query path
//     (same allowed/remaining for identical DB state)
//   - the legacy re-query path (no token passed) must still work unmodified
//   - the per-minute cap must still be enforced correctly via the fast-path

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-relay-check-rate-limit-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const relayProxies = await import("../../src/lib/db/relayProxies.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Inserts a relay_tokens row directly (bypassing createRelayToken, which uses
// a CommonJS `require("node:crypto")` that is unavailable under this ESM test
// runner — a pre-existing, unrelated issue) and returns the RelayToken as
// checkRateLimit's existingToken param expects it (camelCase, via getRelayToken).
function insertRelayToken(overrides: {
  id: string;
  name: string;
  maxRequestsPerMinute: number;
  maxRequestsPerDay: number;
}) {
  const db = core.getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    `
    INSERT INTO relay_tokens (id, name, token_hash, token_prefix, description, combo_id, allowed_models,
      max_tokens_per_request, max_requests_per_minute, max_requests_per_day, max_cost_per_day,
      enabled, created_at, updated_at, expires_at, metadata)
    VALUES (?, ?, ?, ?, '', NULL, '["*"]', 128000, ?, ?, 0, 1, ?, ?, NULL, '{}')
  `
  ).run(
    overrides.id,
    overrides.name,
    `hash-${overrides.id}`,
    `rl_${overrides.id}`,
    overrides.maxRequestsPerMinute,
    overrides.maxRequestsPerDay,
    now,
    now
  );
  const token = relayProxies.getRelayToken(overrides.id);
  if (!token) throw new Error("failed to insert test relay token");
  return token;
}

test("checkRateLimit: existingToken fast-path agrees with the legacy re-query path", () => {
  const token = insertRelayToken({
    id: "rl_fastpath1",
    name: "fast-path-token",
    maxRequestsPerMinute: 10,
    maxRequestsPerDay: 1000,
  });

  const legacy = relayProxies.checkRateLimit(token.id);
  const fastPath = relayProxies.checkRateLimit(token.id, token);

  assert.deepEqual(fastPath.allowed, legacy.allowed);
  assert.deepEqual(fastPath.remaining, legacy.remaining);
});

test("checkRateLimit: legacy re-query path (no token passed) still works when the token does not exist", () => {
  const result = relayProxies.checkRateLimit("does-not-exist");
  assert.equal(result.allowed, false);
  assert.equal(result.remaining, 0);
});

test("checkRateLimit: existingToken fast-path still enforces the per-minute cap", () => {
  const token = insertRelayToken({
    id: "rl_captoken1",
    name: "cap-token",
    maxRequestsPerMinute: 2,
    maxRequestsPerDay: 1000,
  });

  // Record 2 requests in the current minute window — matches the cap.
  relayProxies.recordRelayUsage(token.id, { model: "test-model", cost: 0 });
  relayProxies.recordRelayUsage(token.id, { model: "test-model", cost: 0 });

  const fastPath = relayProxies.checkRateLimit(token.id, token);
  const legacy = relayProxies.checkRateLimit(token.id);

  assert.equal(fastPath.allowed, false);
  assert.equal(fastPath.remaining, 0);
  assert.deepEqual(fastPath, legacy);
});
