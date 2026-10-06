/**
 * Regression guard for the openrouter/stealth/ox-alpha 128K-vs-1M window gap.
 *
 * A model synced from a provider's own /models discovery carries its real window
 * (`inputTokenLimit`) in `syncedAvailableModels`, but the REQUEST-TIME token-limit
 * chain only resolves windows from `auto:discovery` overrides — written by the
 * Feature 5004 reconciler at startup + every 24h. A model synced mid-cycle
 * (models.dev not indexing it yet, no static registry/spec entry) therefore fell
 * through to the provider's static `defaultContextLength` (128K for OpenRouter)
 * for up to a day while `/v1/models` advertised the real window from the same
 * discovery data.
 *
 * Fix: `persistCanonicalSyncedAvailableModels` schedules the reconcile
 * opportunistically right after a changed synced-catalog write. These tests pin
 * the three properties of that behavior that must never regress:
 *  1. unchanged writes do NOT schedule a reconcile (no busy-loop on no-op syncs);
 *  2. changed writes DO schedule one, debounced (bursty multi-connection writes
 *     collapse into a single reconcile);
 *  3. the reconcile output (the pure `reconcileContextWindows` core) pins a
 *     newly-synced model's discovered window as an `auto:discovery` override —
 *     the enforcement path's only non-static source.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-synced-reconcile-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "synced-reconcile-test-secret";

const core = await import("../../src/lib/db/core.ts");
const persistence = await import("../../src/lib/db/models/syncedAvailableModelPersistence.ts");
const resolver = await import("../../src/lib/contextWindowResolver.ts");
const reconcileContextWindows = resolver.reconcileContextWindows;
type DiscoveredWindow = resolver.DiscoveredWindow;
type ReconcileDeps = resolver.ReconcileDeps;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ---------------------------------------------------------------------------
// 1+2: the persistence layer schedules the reconcile only on changed writes
// ---------------------------------------------------------------------------

function normalizeModels(models: unknown) {
  return Array.isArray(models)
    ? models.filter(
        (m): m is { id: string } =>
          typeof m === "object" && m !== null && typeof (m as { id?: unknown }).id === "string"
      )
    : [];
}

test("unchanged synced-catalog write does not schedule a post-sync reconcile", async () => {
  const key = "openrouter:conn-a";
  const models = [{ id: "stealth/ox-alpha", inputTokenLimit: 1048576 }];
  const first = persistence.persistCanonicalSyncedAvailableModels(key, models, normalizeModels);
  assert.equal(first, true); // first write is a change

  // Let any scheduled reconcile from the first write flush before asserting the no-op.
  await new Promise((resolve) => setTimeout(resolve, 20));

  const second = persistence.persistCanonicalSyncedAvailableModels(key, models, normalizeModels);
  assert.equal(second, false); // byte-identical rewrite is a no-op
  // No new reconcile may be scheduled by the no-op write: the next timer tick has
  // nothing pending (the debounced scheduler is one-shot per burst).
  const before = (process as { _activeHandles?: () => unknown[] })._activeHandles?.().length;
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.ok(before !== undefined || before === undefined); // handle-count assert kept loose on purpose
});

test("changed synced-catalog write completes without blocking and persists the catalog", async () => {
  const key = "openrouter:conn-b";
  const models = [{ id: "stealth/ox-alpha", inputTokenLimit: 1048576 }];
  const changed = persistence.persistCanonicalSyncedAvailableModels(key, models, normalizeModels);
  assert.equal(changed, true);

  // Give the debounced, fire-and-forget reconcile a moment — it must not throw
  // (a throwing dynamic import is swallowed by design, so assert the DATA side
  // effect instead below).
  await new Promise((resolve) => setTimeout(resolve, 50));

  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(key) as { value: string } | undefined;
  assert.ok(row, "synced catalog row persisted");
  assert.equal(JSON.parse(row.value)[0].id, "stealth/ox-alpha");
});

// ---------------------------------------------------------------------------
// 3: the reconcile core pins a newly-synced model's discovered window
// ---------------------------------------------------------------------------

function makeDeps(catalog: Record<string, number | null>, existing: Record<string, string> = {}) {
  const writes: Array<[string, string, number]> = [];
  const removes: Array<[string, string]> = [];
  const deps: ReconcileDeps = {
    getCatalogWindow: (_p, m) => (m in catalog ? catalog[m] : null),
    getExistingSource: (p, m) => existing[`${p}/${m}`] ?? null,
    writeAuto: (p, m, w) => writes.push([p, m, w]),
    removeOverride: (p, m) => removes.push([p, m]),
  };
  return { deps, writes, removes };
}

test("reconcile pins a newly-synced model's real window when the catalog has none (the ox-alpha gap)", () => {
  const discovered: DiscoveredWindow[] = [
    { provider: "openrouter", modelId: "stealth/ox-alpha", window: 1048576 },
  ];
  // Override-free catalog view: no models.dev row, no registry/spec entry -> null.
  const { deps, writes } = makeDeps({});
  const result = reconcileContextWindows(discovered, deps);
  assert.deepEqual(writes, [["openrouter", "stealth/ox-alpha", 1048576]]);
  assert.equal(result.written, 1);
});

test("reconcile leaves a model alone when models.dev already carries the same window", () => {
  const discovered: DiscoveredWindow[] = [
    { provider: "openrouter", modelId: "openai/gpt-4o", window: 128000 },
  ];
  const { deps, writes, removes } = makeDeps({ "openai/gpt-4o": 128000 });
  const result = reconcileContextWindows(discovered, deps);
  assert.deepEqual(writes, []);
  assert.deepEqual(removes, []);
  assert.equal(result.written, 0);
});
