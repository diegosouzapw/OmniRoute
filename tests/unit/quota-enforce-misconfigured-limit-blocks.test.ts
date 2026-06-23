/**
 * tests/unit/quota-enforce-misconfigured-limit-blocks.test.ts
 *
 * Security hardening (fail-open control regression).
 *
 * enforce.ts used `if (!(dim.limit > Number.EPSILON)) continue;` to skip the
 * documented "unconfigured" placeholder (Number.EPSILON — see
 * quota-epsilon-unconfigured-allow.test.ts). That predicate was BROADER than the
 * only seeded placeholder: it also silently skipped enforcement for an explicitly
 * configured limit of 0 (which means "block everything") and for negative limits
 * (corrupt config). Skipping those is a fail-open: a quota dimension an operator set
 * to 0/negative to deny traffic was silently letting every request through.
 *
 * Expected (post-fix): ONLY `=== Number.EPSILON` is treated as the unconfigured
 * placeholder. A configured 0 or negative limit flows into decideFairShare and is
 * ENFORCED (global-saturated block). EPSILON stays usable (regression guard).
 *
 * Mirrors the SqliteQuotaStore + provider_plans override setup used by
 * quota-epsilon-unconfigured-allow.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-misconfig-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providersDb = await import("../../src/lib/db/providers.ts");
const quotaPools = await import("../../src/lib/db/quotaPools.ts");
const providerPlans = await import("../../src/lib/db/providerPlans.ts");
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

async function setupPoolWithLimit(name: string, key: string, limit: number) {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  // Manual Wizard override: a single tokens/5h dimension with the given limit.
  providerPlans.upsertPlan(
    connId,
    "glm",
    [{ unit: "tokens", window: "5h", limit }],
    "manual"
  );

  quotaPools.createPool({
    connectionId: connId,
    name: `${name}-pool`,
    allocations: [{ apiKeyId: key, weight: 100, policy: "hard" }],
  });

  return connId;
}

test("explicit limit=0 BLOCKS (deny) — not silently fail-open", async () => {
  const KEY = "key-zero";
  const connId = await setupPoolWithLimit("quota-zero", KEY, 0);

  const decision = await enforceQuotaShare({
    apiKeyId: KEY,
    connectionId: connId,
    provider: "glm",
    estimatedCost: { tokens: 1 },
  });

  assert.equal(
    decision.kind,
    "block",
    `a configured limit of 0 means "block"; enforce must NOT fail-open. got ${JSON.stringify(decision)}`
  );
});

test("explicit negative limit BLOCKS (fail-closed) — not silently fail-open", async () => {
  const KEY = "key-neg";
  const connId = await setupPoolWithLimit("quota-neg", KEY, -100);

  const decision = await enforceQuotaShare({
    apiKeyId: KEY,
    connectionId: connId,
    provider: "glm",
    estimatedCost: { tokens: 1 },
  });

  assert.equal(
    decision.kind,
    "block",
    `a negative (corrupt) limit must fail-closed, not fail-open. got ${JSON.stringify(decision)}`
  );
});
