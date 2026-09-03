import test from "node:test";
import assert from "node:assert/strict";

import { shouldAutoSyncOnOpen, AUTO_SYNC_STALE_MS } from "../../../src/lib/radar/autoSync.ts";

// Pure staleness rule that powers the Radar page's sync-on-open behaviour
// (spec: dados atualizados a cada abrir da página).

const NOW = Date.parse("2026-08-06T12:00:00.000Z");

test("shouldAutoSyncOnOpen", async (t) => {
  await t.test("no cache at all => sync", () => {
    assert.equal(shouldAutoSyncOnOpen(null, NOW), true);
    assert.equal(shouldAutoSyncOnOpen(undefined, NOW), true);
    assert.equal(shouldAutoSyncOnOpen("", NOW), true);
  });

  await t.test("unparseable timestamp counts as stale", () => {
    assert.equal(shouldAutoSyncOnOpen("not-a-date", NOW), true);
  });

  await t.test("fresh cache (just fetched) => no sync", () => {
    assert.equal(shouldAutoSyncOnOpen(new Date(NOW - 1000).toISOString(), NOW), false);
  });

  await t.test("cache just inside the stale window => no sync", () => {
    const fetchedAt = new Date(NOW - AUTO_SYNC_STALE_MS + 1000).toISOString();
    assert.equal(shouldAutoSyncOnOpen(fetchedAt, NOW), false);
  });

  await t.test("cache exactly at the stale boundary => sync", () => {
    const fetchedAt = new Date(NOW - AUTO_SYNC_STALE_MS).toISOString();
    assert.equal(shouldAutoSyncOnOpen(fetchedAt, NOW), true);
  });

  await t.test("cache older than the window => sync", () => {
    const fetchedAt = new Date(NOW - 24 * 60 * 60 * 1000).toISOString();
    assert.equal(shouldAutoSyncOnOpen(fetchedAt, NOW), true);
  });

  await t.test("custom threshold is honored", () => {
    const fetchedAt = new Date(NOW - 5000).toISOString();
    assert.equal(shouldAutoSyncOnOpen(fetchedAt, NOW, 10_000), false);
    assert.equal(shouldAutoSyncOnOpen(fetchedAt, NOW, 4000), true);
  });
});
