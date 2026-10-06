/**
 * #3147 — Editing a combo must invalidate the 10s nested-combo expansion caches
 * (src/sse/handlers/chat.ts getCombosCachedForChat + open-sse/handlers/chatCore.ts
 * getCombosCached) so a parent combo's nested expansion stops serving removed
 * targets/models ("phantom models") within the TTL window.
 *
 * Both cache layers consult a shared monotonic version exposed by readCache
 * (getCombosCacheVersion). Combo writes call invalidateDbCache("combos"), which
 * bumps that version. This test drives the real write path and asserts:
 *   1. each combo write bumps the version (the invalidation hook fires), and
 *   2. the chat-layer cache-validity predicate (which is what gates staleness)
 *      flips from "valid" to "stale" immediately after a write — i.e. without
 *      waiting for the 10s TTL.
 *
 * On current code (no invalidation) the version never changes, so the predicate
 * stays "valid" for the full 10s window → the test FAILS. After the fix it
 * PASSES.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const contextHandoffsDb = await import("../../src/lib/db/contextHandoffs.ts");
const readCache = await import("../../src/lib/db/readCache.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException).code;
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Mirror the cache-validity predicate used by the handler cache layers
// (getCombosCachedForChat / getCombosCached): a cached entry is only reused
// while it is within the TTL AND the combo version it was populated at still
// matches the current version. We freeze "now" so the TTL never expires on its
// own — the ONLY thing that can make the cache stale here is the version bump.
const COMBOS_CACHE_TTL_MS = 10_000;
function cacheStillValid(populatedAtTs: number, populatedAtVersion: number): boolean {
  const now = populatedAtTs; // same instant → TTL has not elapsed
  return (
    now - populatedAtTs < COMBOS_CACHE_TTL_MS &&
    populatedAtVersion === readCache.getCombosCacheVersion()
  );
}

test("createCombo bumps the combos cache version (invalidation hook fires)", async () => {
  const before = readCache.getCombosCacheVersion();
  await combosDb.createCombo({
    name: "Alpha",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  assert.notEqual(
    readCache.getCombosCacheVersion(),
    before,
    "createCombo must invalidate the combos cache"
  );
});

test("editing a combo invalidates the nested-expansion cache within the 10s window", async () => {
  // Warm the cache: snapshot version + timestamp as the handler layers do.
  const populatedAtTs = Date.now();
  const populatedAtVersion = readCache.getCombosCacheVersion();
  await combosDb.createCombo({
    name: "Child",
    models: [{ provider: "openai", model: "gpt-4o-mini" }],
  });
  const parent = await combosDb.createCombo({
    name: "Parent",
    models: ["Child", { model: "anthropic/claude-sonnet-4", weight: 2 }],
  });

  // A write happened → the cache populated before it must now be considered
  // stale even though the (frozen) TTL has not elapsed.
  assert.equal(
    cacheStillValid(populatedAtTs, populatedAtVersion),
    false,
    "cache populated before the combo writes must be invalidated immediately"
  );

  // Re-warm against the post-write state, then mutate again and confirm the
  // edit (update) is also picked up within the window.
  const freshTs = Date.now();
  const freshVersion = readCache.getCombosCacheVersion();
  assert.equal(cacheStillValid(freshTs, freshVersion), true);

  await combosDb.updateCombo(String(parent.id), { strategy: "round-robin" });
  assert.equal(
    cacheStillValid(freshTs, freshVersion),
    false,
    "updateCombo must invalidate the cache without waiting for the TTL"
  );
});

test("deleteCombo and reorderCombos also invalidate the cache", async () => {
  const a = await combosDb.createCombo({
    name: "A",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  const b = await combosDb.createCombo({
    name: "B",
    models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
  });

  let ts = Date.now();
  let version = readCache.getCombosCacheVersion();
  await combosDb.reorderCombos([String(b.id), String(a.id)]);
  assert.equal(cacheStillValid(ts, version), false, "reorderCombos must invalidate the cache");

  ts = Date.now();
  version = readCache.getCombosCacheVersion();
  await combosDb.deleteCombo(String(a.id));
  assert.equal(cacheStillValid(ts, version), false, "deleteCombo must invalidate the cache");
});

test("reorderCombo side effects follow physical writes even when stored JSON is corrupt", async () => {
  const combo = await combosDb.createCombo({
    name: "Corrupt Payload",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  core.getDbInstance().prepare("UPDATE combos SET data = '' WHERE id = ?").run(String(combo.id));

  const before = readCache.getCombosCacheVersion();
  const reordered = await combosDb.reorderCombos([String(combo.id)]);

  assert.deepEqual(reordered, []);
  assert.notEqual(
    readCache.getCombosCacheVersion(),
    before,
    "a physical reorder write must preserve the legacy invalidation side effect"
  );
});

test("updateCombo preserves the existing session-pin cleanup contract", async () => {
  const combo = await combosDb.createCombo({
    name: "Before Rename",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  contextHandoffsDb.recordSessionModelUsage(
    "session-before",
    "Before Rename",
    "openai/gpt-4.1",
    "openai"
  );
  contextHandoffsDb.recordSessionModelUsage(
    "session-after",
    "After Rename",
    "openai/gpt-4.1-mini",
    "openai"
  );

  await combosDb.updateCombo(String(combo.id), {
    name: "After Rename",
    models: [{ provider: "openai", model: "gpt-4.1-mini" }],
  });

  assert.equal(contextHandoffsDb.getLastSessionModel("session-before", "Before Rename"), null);
  assert.equal(contextHandoffsDb.getLastSessionModel("session-after", "After Rename"), null);
});

test("updateCombo does not clear session pins when models are omitted", async () => {
  const combo = await combosDb.createCombo({
    name: "Metadata Only",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  contextHandoffsDb.recordSessionModelUsage(
    "session-metadata",
    "Metadata Only",
    "openai/gpt-4.1",
    "openai"
  );

  await combosDb.updateCombo(String(combo.id), { description: "metadata change" });

  assert.equal(
    contextHandoffsDb.getLastSessionModel("session-metadata", "Metadata Only"),
    "openai/gpt-4.1"
  );
});
