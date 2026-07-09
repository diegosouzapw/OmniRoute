import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ─── Regression test for #6325 ───────────────────────────────────────────
//
// In production, `instrumentation-node.ts` (background periodic sync) and
// `src/app/api/pricing/sync/route.ts` (dashboard status endpoint) each
// `await import("@/lib/pricingSync")` from SEPARATE Next.js standalone
// webpack entries, producing SEPARATE module instances with independent
// top-level (`lastSyncTime`, `lastSyncModelCount`, `syncTimer`) state.
//
// This test simulates that scenario by importing the module twice under
// distinct specifiers (cache-busted via a query string), so each import
// gets its own top-level module state while both share the same on-disk
// SQLite DB (as they do in production). It asserts that a status read from
// a FRESH module instance still reflects a sync performed by a DIFFERENT
// module instance — i.e. sync status must be derived from persisted state,
// not from in-memory module-level variables.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-sync-xinst-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

function buildLiteLLMFixture() {
  return {
    "openai/gpt-4o": {
      input_cost_per_token: 0.0000025,
      output_cost_per_token: 0.00001,
      litellm_provider: "openai",
      mode: "chat",
    },
  };
}

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getSyncStatus reflects a sync performed by a different module instance", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(buildLiteLLMFixture()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  // Instance A: simulates the background periodic-sync module instance.
  const pricingSyncA = await import("../../src/lib/pricingSync.ts?instance=A");
  const result = await pricingSyncA.syncPricingFromSources({
    sources: ["litellm"],
    dryRun: false,
  });
  assert.equal(result.success, true);

  // Instance B: simulates the dashboard API-route module instance — a
  // genuinely fresh module scope that never called syncPricingFromSources
  // itself, and whose own `syncTimer`/`lastSyncTime` module vars are unset.
  const pricingSyncB = await import("../../src/lib/pricingSync.ts?instance=B");
  const status = pricingSyncB.getSyncStatus();

  assert.equal(
    status.lastSyncModelCount,
    result.modelCount,
    "should read model count from persisted state"
  );
  assert.ok(status.lastSyncModelCount > 0, "persisted model count should be non-zero");
  assert.notEqual(status.lastSync, null, "should read lastSync from persisted state");
  assert.notEqual(
    status.nextSync,
    null,
    "nextSync must be computed from persisted state, not the local (unset) syncTimer"
  );
});
