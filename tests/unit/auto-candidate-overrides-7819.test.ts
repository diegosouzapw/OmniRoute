/**
 * #7819 (Level 2) — `src/lib/db/autoCandidateOverrides.ts` round-trip: a
 * per-API-key exclusion set for one `auto/*` channel is created, listed,
 * toggled, and read back correctly, scoped strictly to (apiKeyId, autoChannel).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7819-overrides-db-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const overridesDb = await import("../../src/lib/db/autoCandidateOverrides.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("#7819: with no overrides configured, getExcludedConnectionIds returns an empty set", async () => {
  const excluded = await overridesDb.getExcludedConnectionIds("key-1", "auto/best-coding");
  assert.equal(excluded.size, 0);
});

test("#7819: setExcluded(true) persists and getExcludedConnectionIds reflects it", async () => {
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", true);
  const excluded = await overridesDb.getExcludedConnectionIds("key-1", "auto/best-coding");
  assert.ok(excluded.has("conn-a"), "conn-a must be excluded after setExcluded(true)");
});

test("#7819: setExcluded(false) clears a previously excluded connection (UPSERT toggle)", async () => {
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", true);
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", false);
  const excluded = await overridesDb.getExcludedConnectionIds("key-1", "auto/best-coding");
  assert.ok(!excluded.has("conn-a"), "conn-a must no longer be excluded after re-toggling");
});

test("#7819: exclusions are scoped per API key — key-2 is unaffected by key-1's exclusion", async () => {
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", true);
  const excludedForOtherKey = await overridesDb.getExcludedConnectionIds(
    "key-2",
    "auto/best-coding"
  );
  assert.equal(excludedForOtherKey.size, 0);
});

test("#7819: exclusions are scoped per auto channel — a different channel is unaffected", async () => {
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", true);
  const excludedForOtherChannel = await overridesDb.getExcludedConnectionIds(
    "key-1",
    "auto/best-fast"
  );
  assert.equal(excludedForOtherChannel.size, 0);
});

test("#7819: listOverrides returns every row for a key+channel, excluded and not", async () => {
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-a", true);
  await overridesDb.setExcluded("key-1", "auto/best-coding", "conn-b", false);
  const rows = await overridesDb.listOverrides("key-1", "auto/best-coding");
  assert.equal(rows.length, 2);
  const byConnection = new Map(rows.map((row) => [row.connectionId, row]));
  assert.equal(byConnection.get("conn-a")?.excluded, true);
  assert.equal(byConnection.get("conn-b")?.excluded, false);
});
