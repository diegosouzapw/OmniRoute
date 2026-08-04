/**
 * Unit tests for the pure `syncInChunksWithSpacing` helper (#6916).
 *
 * Proves the chunking/spacing contract in isolation — no DB, no network —
 * before it is wired into `syncAllProviderLimits()`'s OAuth and non-OAuth
 * paths.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { syncInChunksWithSpacing } from "../../src/lib/usage/providerLimits/chunkedSpacingSync.ts";

test("waits between chunks but not after the last chunk when spacingMs > 0", async () => {
  const items = [1, 2, 3, 4];
  const chunkStarts: number[] = [];

  const start = Date.now();
  await syncInChunksWithSpacing(
    items,
    2,
    40,
    async (item) => {
      chunkStarts.push(Date.now() - start);
      return item;
    },
    () => {}
  );

  // 2 chunks of 2 → chunkStarts has 4 entries (2 per chunk, same start time).
  assert.equal(chunkStarts.length, 4);
  const chunk1Start = Math.min(chunkStarts[0], chunkStarts[1]);
  const chunk2Start = Math.min(chunkStarts[2], chunkStarts[3]);
  assert.ok(
    chunk2Start - chunk1Start >= 35,
    `expected >=35ms gap between chunks, got ${chunk2Start - chunk1Start}`
  );
});

test("never waits when spacingMs === 0 (opt-out, preserves fast path)", async () => {
  const items = [1, 2, 3, 4];
  const start = Date.now();

  await syncInChunksWithSpacing(items, 2, 0, async (item) => item, () => {});

  const elapsed = Date.now() - start;
  assert.ok(elapsed < 30, `expected near-instant run with spacingMs=0, took ${elapsed}ms`);
});

test("chunkSize=1 processes items strictly one at a time (reproduces OAuth semantics)", async () => {
  const items = ["a", "b", "c"];
  const chunks: string[][] = [];

  await syncInChunksWithSpacing(
    items,
    1,
    0,
    async (item) => item,
    (chunk) => chunks.push([...chunk])
  );

  assert.deepEqual(chunks, [["a"], ["b"], ["c"]]);
});

test("preserves in-chunk concurrency — all items in a chunk start before any resolves", async () => {
  const items = [1, 2, 3];
  let inFlight = 0;
  let maxInFlight = 0;

  await syncInChunksWithSpacing(
    items,
    3,
    0,
    async (item) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 20));
      inFlight--;
      return item;
    },
    () => {}
  );

  assert.equal(maxInFlight, 3, "all 3 items in the single chunk should overlap");
});

test("delivers chunk + results to onChunkResults, including rejections", async () => {
  const items = [1, 2, 3];
  const seen: Array<{ chunk: number[]; statuses: string[] }> = [];

  await syncInChunksWithSpacing(
    items,
    2,
    0,
    async (item) => {
      if (item === 2) throw new Error("boom");
      return item * 10;
    },
    (chunk, results) => {
      seen.push({ chunk: [...chunk], statuses: results.map((r) => r.status) });
    }
  );

  assert.equal(seen.length, 2);
  assert.deepEqual(seen[0].chunk, [1, 2]);
  assert.deepEqual(seen[0].statuses, ["fulfilled", "rejected"]);
  assert.deepEqual(seen[1].chunk, [3]);
  assert.deepEqual(seen[1].statuses, ["fulfilled"]);
});
