import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-cache-xinst-8065-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8065 a renewed quota written by one module instance is invisible to another module instance's routing read", async () => {
  const connectionId = "conn-codex-8065";

  // Instance R: simulates auth.ts's routing/credential-selection chunk.
  const quotaCacheR = await import("../../src/domain/quotaCache.ts?instance=R");
  quotaCacheR.setQuotaCache(connectionId, "codex", {
    session: { remainingPercentage: 0, resetAt: new Date(Date.now() + 5 * 86400000).toISOString() },
  });
  assert.equal(quotaCacheR.isQuotaExhaustedForRequest(connectionId, "codex"), true);

  // Instance W: simulates providerLimitsSyncScheduler's instrumentation-node.ts chunk.
  const quotaCacheW = await import("../../src/domain/quotaCache.ts?instance=W");
  quotaCacheW.setQuotaCache(connectionId, "codex", {
    session: { remainingPercentage: 100, resetAt: new Date(Date.now() + 7 * 86400000).toISOString() },
  });
  assert.equal(quotaCacheW.isQuotaExhaustedForRequest(connectionId, "codex"), false);

  // Back on instance R — must see the renewed quota written by instance W.
  assert.equal(
    quotaCacheR.isQuotaExhaustedForRequest(connectionId, "codex"),
    false,
    "instance R must see the renewed quota written by instance W"
  );
});
