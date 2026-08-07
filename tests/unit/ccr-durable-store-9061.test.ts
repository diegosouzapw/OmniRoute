/**
 * #9061. The CCR store's in-process Map loses blocks to LRU eviction, the TTL, a
 * restart, or a retrieve landing on another instance, while `fidelityGateStep` waives
 * fidelity checks for sampling engines because their drop is "CCR-recoverable" and the
 * protocol instruction promises the model a verbatim block.
 *
 * The regression test is the restart: a fresh module instance has an empty Map, so a
 * block stored before it must come back from the durable tier or not at all.
 */
import { describe, it, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "omniroute-ccr-9061-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
core.resetDbInstance();

const {
  persistCcrBlock,
  loadCcrBlock,
  deleteCcrBlockRow,
  deleteAllCcrBlocks,
  pruneExpiredCcrBlocks,
  countCcrBlocks,
} = await import("../../src/lib/db/ccrBlocks.ts");

const ccrPath = "../../open-sse/services/compression/engines/ccr/index.ts";
const ccr = await import(ccrPath);

const HOUR = 60 * 60 * 1000;

function row(overrides: Record<string, unknown> = {}) {
  const now = 1_000_000;
  return {
    principalId: "principal-a",
    hash: "aaaaaaaaaaaaaaaaaaaaaaaa",
    content: "the verbatim block",
    bytes: 18,
    chars: 18,
    lines: 1,
    contentType: "text/plain",
    source: "compression",
    createdAt: now,
    lastAccessedAt: now,
    expiresAt: now + HOUR,
    ...overrides,
  };
}

describe("ccrBlocks durable store (#9061)", () => {
  beforeEach(() => {
    deleteAllCcrBlocks();
  });

  after(() => {
    core.resetDbInstance();
  });

  it("round-trips a block", () => {
    persistCcrBlock(row());
    const loaded = loadCcrBlock("principal-a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1_000_000);
    assert.equal(loaded?.content, "the verbatim block");
    assert.equal(loaded?.contentType, "text/plain");
    assert.equal(loaded?.source, "compression");
  });

  it("scopes by principal, so another cannot read the block", () => {
    persistCcrBlock(row());
    assert.equal(loadCcrBlock("principal-b", "aaaaaaaaaaaaaaaaaaaaaaaa", 1_000_000), null);
  });

  it("reads an expired block as a miss and drops the row", () => {
    persistCcrBlock(row({ expiresAt: 1_000_000 }));
    assert.equal(loadCcrBlock("principal-a", "aaaaaaaaaaaaaaaaaaaaaaaa", 1_000_001), null);
    assert.equal(countCcrBlocks(), 0);
  });

  it("prunes only what has expired", () => {
    persistCcrBlock(row({ hash: "a".repeat(24), expiresAt: 500 }));
    persistCcrBlock(row({ hash: "b".repeat(24), expiresAt: 9_000_000 }));
    assert.equal(pruneExpiredCcrBlocks(1_000_000), 1);
    assert.equal(countCcrBlocks(), 1);
  });

  it("deletes a single block", () => {
    persistCcrBlock(row());
    deleteCcrBlockRow("principal-a", "aaaaaaaaaaaaaaaaaaaaaaaa");
    assert.equal(countCcrBlocks(), 0);
  });
});

describe("CCR engine survives losing its in-memory map (#9061)", () => {
  before(() => {
    ccr.resetCcrStore();
  });

  after(() => {
    ccr.resetCcrStore();
    core.resetDbInstance();
  });

  it("retrieves a block from a fresh module instance, the way a restart sees it", async () => {
    const text = "x".repeat(2_000);
    const stored = ccr.tryStoreBlock(text, "principal-a");
    assert.equal(stored.stored, true);
    await ccr.flushCcrDurableWrites();

    // A fresh instance of the engine module has its own empty Map, the same state the
    // process has after a restart, and the same state another instance starts in.
    const restarted = await import(`${ccrPath}?restart=9061`);
    assert.equal(
      restarted.retrieveBlock(stored.hash, "principal-a"),
      text,
      "block must come back from the durable tier after the in-memory map is gone"
    );
  });

  it("keeps the principal boundary across the restart", async () => {
    const text = "y".repeat(2_000);
    const stored = ccr.tryStoreBlock(text, "principal-a");
    await ccr.flushCcrDurableWrites();
    const restarted = await import(`${ccrPath}?restart=9061-scope`);
    assert.equal(restarted.retrieveBlock(stored.hash, "principal-b"), null);
  });

  it("keeps an oversized block memory-only", async () => {
    // 512KB is the ceiling call artifacts already use (#1647). Above it the block still
    // works from the map, it just never reaches disk.
    const text = "b".repeat(600 * 1024);
    const stored = ccr.tryStoreBlock(text, "principal-a");
    assert.equal(stored.stored, true);
    await ccr.flushCcrDurableWrites();

    assert.equal(ccr.retrieveBlock(stored.hash, "principal-a"), text, "map still serves it");
    assert.equal(loadCcrBlock("principal-a", stored.hash, Date.now()), null, "but disk has no row");
  });

  it("writes nothing when COMPRESSION_CCR_DURABLE_STORE is false", async () => {
    const previous = process.env.COMPRESSION_CCR_DURABLE_STORE;
    process.env.COMPRESSION_CCR_DURABLE_STORE = "false";
    try {
      const stored = ccr.tryStoreBlock("c".repeat(2_000), "principal-a");
      await ccr.flushCcrDurableWrites();
      assert.equal(loadCcrBlock("principal-a", stored.hash, Date.now()), null);
    } finally {
      if (previous === undefined) delete process.env.COMPRESSION_CCR_DURABLE_STORE;
      else process.env.COMPRESSION_CCR_DURABLE_STORE = previous;
    }
  });

  it("does not resurrect a block that was explicitly deleted", async () => {
    const text = "z".repeat(2_000);
    const stored = ccr.tryStoreBlock(text, "principal-a");
    ccr.deleteCcrBlock(stored.hash, "principal-a");
    // Persist and delete share one FIFO queue; one flush covers both.
    await ccr.flushCcrDurableWrites();
    const restarted = await import(`${ccrPath}?restart=9061-deleted`);
    assert.equal(restarted.retrieveBlock(stored.hash, "principal-a"), null);
  });
});
