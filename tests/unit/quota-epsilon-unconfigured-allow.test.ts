/**
 * tests/unit/quota-epsilon-unconfigured-allow.test.ts
 *
 * Bug: a quota pool whose provider plan carries a PLACEHOLDER limit
 * (Number.EPSILON — glm / minimax / kimi-coding / deepseek in planRegistry.ts,
 * meaning "limit unknown, set it manually in the Wizard 'Limite' step") blocks
 * every request AFTER the first one.
 *
 * decideFairShare's global-saturated gate fires as soon as
 *   consumedTotal >= effectiveLimit
 * and effectiveLimit ≈ EPSILON, so ANY recorded consumption trips it — for hard,
 * soft AND burst policies. planRegistry.ts documents the intent ("Sliding window /
 * fair-share devem tratar limit=0 como 'manual obrigatório'") but enforce.ts never
 * implemented the guard.
 *
 * Expected: an unconfigured (EPSILON) dimension is NOT enforced — the pool stays
 * usable until a real limit is configured. Real limits still enforce normally
 * (covered by quota-division-blocks.test.ts).
 *
 * Mirrors the SqliteQuotaStore + enforceQuotaShare integration setup from
 * quota-division-blocks.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-epsilon-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providersDb = await import("../../src/lib/db/providers.ts");
const quotaPools = await import("../../src/lib/db/quotaPools.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

test("EPSILON (unconfigured) plan does not block after the first request", async () => {
  const KEY = "key-eps";

  // glm seeds tokens/5h + tokens/weekly with limit=Number.EPSILON (placeholder).
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-epsilon-glm",
    apiKey: "sk-glm-epsilon",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  const pool = quotaPools.createPool({
    connectionId: connId,
    name: "EpsilonPool",
    allocations: [{ apiKeyId: KEY, weight: 100, policy: "hard" }],
  });

  // First request: allowed (nothing consumed yet).
  const first = await enforceQuotaShare({
    apiKeyId: KEY,
    connectionId: connId,
    provider: "glm",
    estimatedCost: { tokens: 5000 },
  });
  assert.equal(
    first.kind,
    "allow",
    `first request should be allowed; got ${JSON.stringify(first)}`
  );

  // Record consumption on the EPSILON dimension (tokens/5h).
  const store = new SqliteQuotaStore();
  await store.consume(KEY, { poolId: pool.id, unit: "tokens", window: "5h" }, 5000);

  // Second request: MUST still be allowed — an unconfigured EPSILON limit is not a real cap.
  const second = await enforceQuotaShare({
    apiKeyId: KEY,
    connectionId: connId,
    provider: "glm",
    estimatedCost: { tokens: 5000 },
  });
  assert.equal(
    second.kind,
    "allow",
    `unconfigured EPSILON plan must not block after the first request; got ${JSON.stringify(second)}`
  );
});
