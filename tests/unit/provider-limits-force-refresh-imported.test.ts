/**
 * (#3019 reactive-recovery follow-up) Force-refresh on the on-demand path.
 *
 * Imported Codex accounts have no `expiresAt` (token pasted, not minted here),
 * so `needsRefresh` is always false — the per-card "force revalidate" could
 * never re-mint them, leaving an expired imported token stuck. The on-demand
 * path now passes `{ force: true }` AFTER an observed 401 to bypass the
 * proactive `needsRefresh` heuristic (still serialized per rotation group).
 *
 * Critically, `force` must NOT override the bulk #3019 guard: without
 * `allowRotatingRefresh`, a rotating provider is still never refreshed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-force-refresh-imported-"));

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { refreshAndUpdateCredentials } = await import("../../src/lib/usage/providerLimits.ts");

function importedCodexConnection() {
  return {
    id: "codex-imported-1",
    provider: "codex",
    accessToken: "imported-access-token",
    refreshToken: "imported-refresh-token",
    tokenExpiresAt: null, // imported: no known expiry → needsRefresh is always false
    providerSpecificData: {},
  };
}

test("force re-mints an imported rotating account that needsRefresh would skip (#3019 reactive)", async () => {
  const exec = getExecutor("codex");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  let refreshCalls = 0;
  exec.needsRefresh = () => false; // imported account: heuristic never fires
  exec.refreshCredentials = async () => {
    refreshCalls++;
    return { accessToken: "freshly-minted-token", expiresIn: 3600 };
  };
  try {
    // Baseline: on-demand path WITHOUT force respects needsRefresh → no mint.
    const noForce = await refreshAndUpdateCredentials(importedCodexConnection(), {
      allowRotatingRefresh: true,
    });
    assert.equal(noForce.refreshed, false, "without force, needsRefresh=false → no mint");
    assert.equal(refreshCalls, 0);

    // Reactive recovery: force bypasses needsRefresh and re-mints.
    const forced = await refreshAndUpdateCredentials(importedCodexConnection(), {
      allowRotatingRefresh: true,
      force: true,
    });
    assert.equal(forced.refreshed, true, "force must re-mint the imported account");
    assert.equal(refreshCalls, 1, "refreshCredentials must be invoked once under force");
    assert.equal(forced.connection.accessToken, "freshly-minted-token");
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});

test("force does NOT override the bulk #3019 guard (no allowRotatingRefresh → no mint)", async () => {
  const exec = getExecutor("codex");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  let refreshCalls = 0;
  exec.needsRefresh = () => true;
  exec.refreshCredentials = async () => {
    refreshCalls++;
    return { accessToken: "should-not-happen", expiresIn: 3600 };
  };
  try {
    const result = await refreshAndUpdateCredentials(importedCodexConnection(), {
      // allowRotatingRefresh omitted → bulk/scheduled semantics
      force: true,
    });
    assert.equal(result.refreshed, false, "bulk path must never refresh a rotating provider");
    assert.equal(refreshCalls, 0, "force must not break the #3019 bulk guard");
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
});
