/**
 * Unit tests for src/lib/cliTools/batchStatusCache.ts
 *
 * Pure in-memory logic — no I/O or module mocking needed.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  getCached,
  setCached,
  invalidate,
  clearCache,
} from "../../src/lib/cliTools/batchStatusCache.ts";

import type { ToolBatchStatus } from "../../src/shared/types/cliBatchStatus.ts";

const makeStatus = (installed: boolean): ToolBatchStatus => ({
  detection: { installed, runnable: installed },
  config: { status: "configured" },
});

test.beforeEach(() => {
  clearCache();
});

// ── getCached / setCached ─────────────────────────────────────────────────────

test("getCached returns null when cache is empty", () => {
  const result = getCached("claude", 1234);
  assert.equal(result, null);
});

test("setCached + getCached: hit when mtime matches", () => {
  const status = makeStatus(true);
  setCached("claude", 5000, status);
  const result = getCached("claude", 5000);
  assert.deepEqual(result, status);
});

test("getCached returns null when mtime differs (cache miss)", () => {
  const status = makeStatus(true);
  setCached("claude", 5000, status);
  const result = getCached("claude", 9999); // different mtime
  assert.equal(result, null);
});

test("getCached returns null when mtime is 0 and stored mtime is nonzero", () => {
  setCached("codex", 1000, makeStatus(false));
  const result = getCached("codex", 0);
  assert.equal(result, null);
});

test("getCached returns entry when mtime is 0 and stored mtime is also 0", () => {
  const status = makeStatus(false);
  setCached("codex", 0, status);
  const result = getCached("codex", 0);
  assert.deepEqual(result, status);
});

test("getCached expires unchanged negative results after 30 seconds", () => {
  const status = makeStatus(false);
  setCached("codex", 0, status, 1_000);

  assert.deepEqual(getCached("codex", 0, 30_999), status);
  assert.equal(getCached("codex", 0, 31_000), null);
});

// ── invalidate ────────────────────────────────────────────────────────────────

test("invalidate removes entry from cache", () => {
  setCached("droid", 1000, makeStatus(true));
  invalidate("droid");
  const result = getCached("droid", 1000);
  assert.equal(result, null);
});

test("invalidate on nonexistent key does not throw", () => {
  assert.doesNotThrow(() => invalidate("nonexistent-tool-id"));
});

// ── clearCache ────────────────────────────────────────────────────────────────

test("clearCache removes all entries", () => {
  setCached("claude", 100, makeStatus(true));
  setCached("codex", 200, makeStatus(false));
  setCached("cline", 300, makeStatus(true));

  clearCache();

  assert.equal(getCached("claude", 100), null);
  assert.equal(getCached("codex", 200), null);
  assert.equal(getCached("cline", 300), null);
});

test("clearCache on empty cache does not throw", () => {
  assert.doesNotThrow(() => clearCache());
});

// ── Multiple tools coexist ────────────────────────────────────────────────────

test("multiple tools can be cached independently", () => {
  const statusA = makeStatus(true);
  const statusB = makeStatus(false);

  setCached("claude", 1000, statusA);
  setCached("codex", 2000, statusB);

  assert.deepEqual(getCached("claude", 1000), statusA);
  assert.deepEqual(getCached("codex", 2000), statusB);
  assert.equal(getCached("claude", 2000), null); // wrong mtime for claude
});

test("overwriting same toolId updates cached result", () => {
  const first = makeStatus(true);
  const second = makeStatus(false);

  setCached("kilo", 5000, first);
  setCached("kilo", 5000, second); // overwrite

  const result = getCached("kilo", 5000);
  assert.deepEqual(result, second);
});
