import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const balancer = await import("../../src/sse/services/codexWsLease.ts");

test("Codex WS lease module has no quota-based account selector", () => {
  const source = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../src/sse/services/codexWsLease.ts"),
    "utf8"
  );

  assert.doesNotMatch(source, /selectCodex(?:Fair|Ws)Connection|remainingQuota|nextCodexFair/);
});

test("Codex WS leases enforce per-account concurrency and are released exactly once", async () => {
  balancer.clearCodexWsLeasesForTest();

  const lease = await balancer.acquireCodexWsLease("account-a", 1);
  assert.ok(lease);
  assert.equal(await balancer.acquireCodexWsLease("account-a", 1), null);

  assert.equal(balancer.releaseCodexWsLease(lease), true);
  assert.equal(balancer.releaseCodexWsLease(lease), false);
});
