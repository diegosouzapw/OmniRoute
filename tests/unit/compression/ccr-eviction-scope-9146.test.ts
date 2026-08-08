/**
 * #9146. The CCR entry cap is global while the only per-principal cap is bytes, so one
 * principal can exhaust the shared 5,000-entry budget with small blocks while staying
 * well inside its own 16 MB allowance. Eviction then took the globally oldest block,
 * which belongs to whoever has been quiet longest.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_CCR_ENTRIES,
  MAX_CCR_PRINCIPAL_BYTES,
  inspectCcrBlock,
  resetCcrStore,
  tryStoreBlock,
  getCcrStoreStats,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

/** Distinct content per index, at the engine's minimum block size. */
function block(seed: number): string {
  return `${seed}`.padEnd(600, "x");
}

describe("CCR eviction stays inside the storing principal (#9146)", () => {
  beforeEach(() => {
    resetCcrStore();
  });

  it("keeps a quiet principal's block when a busy principal fills the entry cap", () => {
    const quiet = tryStoreBlock(block(0), "principal-quiet");
    assert.equal(quiet.stored, true);

    // One principal, many small blocks: enough to exhaust the shared entry budget.
    for (let i = 1; i <= MAX_CCR_ENTRIES; i++) {
      tryStoreBlock(block(i), "principal-busy");
    }

    assert.notEqual(
      inspectCcrBlock(quiet.hash, "principal-quiet"),
      null,
      "a principal that stored one block must not lose it to another principal's traffic"
    );
  });

  it("the busy principal stayed well inside its own byte budget while doing it", () => {
    for (let i = 1; i <= MAX_CCR_ENTRIES; i++) {
      tryStoreBlock(block(i), "principal-busy");
    }

    const stats = getCcrStoreStats("principal-busy");
    assert.ok(
      stats.bytes < MAX_CCR_PRINCIPAL_BYTES / 4,
      `expected the busy principal to sit under a quarter of its byte cap, got ${stats.bytes}`
    );
  });

  it("still bounds the store at the entry cap", () => {
    for (let i = 0; i <= MAX_CCR_ENTRIES + 50; i++) {
      tryStoreBlock(block(i), "principal-busy");
    }

    const stats = getCcrStoreStats("principal-busy");
    assert.ok(stats.entries <= MAX_CCR_ENTRIES, `entry cap must still hold, got ${stats.entries}`);
  });

  it("falls back to another principal's blocks when the storing one has none", () => {
    // A store held entirely by someone else must still admit a newcomer, or a full cache
    // would permanently lock out every principal that arrives late.
    for (let i = 0; i < MAX_CCR_ENTRIES; i++) {
      tryStoreBlock(block(i), "principal-incumbent");
    }

    const newcomer = tryStoreBlock(block(MAX_CCR_ENTRIES + 1), "principal-newcomer");
    assert.equal(newcomer.stored, true);
    assert.notEqual(inspectCcrBlock(newcomer.hash, "principal-newcomer"), null);
  });
});
