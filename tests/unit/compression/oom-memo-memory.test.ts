/**
 * E2E memory probe for the #7847 OOM mitigations, exercised through the REAL
 * public entry point `applyCompression` (strategySelector) — not a mock.
 *
 * Drives the memoized deterministic path (mode "lite", principalId set) with a
 * realistic multi-MB base64 image payload. The mitigations under test eliminate
 * throwaway multi-MB `JSON.stringify(body)` / deep-clone transients in exactly
 * this path (streaming makeMemoKey hash, memoStore single-clone return).
 *
 * Run:
 *   node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
 *     --test --test-force-exit tests/unit/compression/oom-memo-memory.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import {
  makeMemoKey,
  memoStore,
  clearMemoStore,
  getMemoStats,
} from "../../../open-sse/services/compression/resultMemo.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";

function anonHeapMb(): number {
  // V8 heap used + external array buffers: the transient-allocation class the
  // OOM report tracked. Repeatable in-process proxy (not exact RSS).
  const m = process.memoryUsage();
  return (m.heapUsed + m.arrayBuffers) / (1024 * 1024);
}

function base64Body(mb: number): Record<string, unknown> {
  const block = "A".repeat(Math.round(mb * 1024 * 1024 * 0.75)); // ~4:3 base64
  return {
    model: "claude-sonnet-4-5",
    messages: [
      { role: "user", content: "analyze this screenshot" },
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/png", data: block } },
        ],
      },
      // Collapsible whitespace so the lite engine actually runs (stats non-null).
      { role: "user", content: "word1   word2     word3\n\n\n\nword4" },
    ],
  };
}

const liteConfig = {
  enabled: true,
  defaultMode: "lite",
  memoizeCompressionResults: true,
  lite: { compressToolResults: true },
  engines: {} as Record<string, unknown>,
};

describe("oom-memo e2e: public applyCompression path with large base64 payload", () => {
  it("runs memoized lite compression on a ~3MiB body without runaway allocation", () => {
    clearMemoStore();
    const body = base64Body(3);
    const principal = "e2e-principal";
    const opts = {
      config: liteConfig as never,
      principalId: principal,
      model: "claude-sonnet-4-5",
      supportsVision: true,
    };

    const gc = (globalThis as { gc?: () => void }).gc;
    const before = anonHeapMb();
    const result = applyCompression(body, "lite", opts);
    // Large array buffers may need more than one forced cycle to release.
    if (gc) for (let i = 0; i < 3; i++) gc();
    const after = anonHeapMb();

    // Compression actually ran (didn't bail to no-op) and returned valid stats.
    assert.ok(result.body, "compression returned a body");
    assert.equal(result.stats!.mode, "lite");

    // Token estimate bounded (not base64-inflated ~1.35M).
    const est = result.stats!.originalTokens;
    assert.ok(est > 0 && est < 10_000, `estimate ${est} should be bounded, not base64-inflated`);

    // Identical body + principal ⇒ memoized cache hit (identity preserved).
    const hit = applyCompression(body, "lite", opts);
    assert.deepEqual(hit.body, result.body, "memoized cache hit returns identical body");
    assert.equal(hit.stats!.originalTokens, result.stats!.originalTokens);
    assert.equal(hit.stats!.memoHit, true, "cache hit is observable via stats.memoHit");

    // Memo observability counters reflect the hit.
    const memo = getMemoStats();
    assert.ok(memo.hits >= 1, `expected >=1 memo hit, got ${memo.hits}`);
    assert.ok(memo.misses >= 1, "first call was a miss");
    assert.equal(memo.size, 1, "one memoized entry held");
    assert.ok(memo.hitRate > 0, "hit rate reported");
    assert.ok(memo.capacity >= memo.size, "size within capacity");

    // Windowed stats: this fresh run produced exactly 1 miss + 1 hit, so the
    // 1m window must report hitRate=50 with hits=1/misses=1 (windows reflect
    // *current* traffic, not a diluted all-time rate).
    assert.equal(memo.windows["1m"].hits, 1, "1m window counts the hit");
    assert.equal(memo.windows["1m"].misses, 1, "1m window counts the miss");
    assert.equal(memo.windows["1m"].hitRate, 50, "1m window hit rate is 50%");
    for (const w of ["5m", "15m", "1h"] as const) {
      assert.equal(memo.windows[w].hits, 1, `${w} window counts the hit`);
      assert.equal(memo.windows[w].misses, 1, `${w} window counts the miss`);
    }

    // Retained heap after the full hot path must not have ballooned by the body
    // size (old double-clone pinned ~2x body transient). Generous headroom.
    // Without --expose-gc (CI shard runner), heapUsed can still momentarily
    // hold GC-pending transients, so the retained-heap assertion is only
    // meaningful when forced collection is available.
    const retained = after - before;
    if (gc) {
      assert.ok(
        retained < 30,
        `retained heap grew ${retained.toFixed(1)} MiB after 3MiB body (>30MiB = uncollected transient)`
      );
    }

    // Streaming memo key is deterministic and principal-scoped.
    const k1 = makeMemoKey(body, "lite", liteConfig as never, principal, "claude-sonnet-4-5", true);
    const k2 = makeMemoKey(
      { ...body },
      "lite",
      liteConfig as never,
      principal,
      "claude-sonnet-4-5",
      true
    );
    assert.equal(k1, k2);
    const k3 = makeMemoKey(
      body,
      "lite",
      liteConfig as never,
      "e2e-other",
      "claude-sonnet-4-5",
      true
    );
    assert.notEqual(k1, k3);
  });

  it("memoStore single-clone return is isolated from the caller's live object", () => {
    clearMemoStore();
    const body = base64Body(1);
    const key = "k-" + Math.random().toString(36).slice(2);
    const messages = body.messages as Array<Record<string, unknown>>;
    const result: CompressionResult = {
      body,
      compressed: true,
      stats: {
        originalTokens: 5,
        compressedTokens: 4,
        savingsPercent: 20,
        techniquesUsed: ["lite"],
        mode: "lite",
        timestamp: Date.now(),
      },
    };
    const stored = memoStore(key, result);
    assert.notEqual(stored, result, "store returns a clone, not the live object");
    assert.notEqual(stored.body, result.body, "body is deep-cloned");
    assert.equal(
      (stored.body.messages as unknown[]).length,
      (result.body.messages as unknown[]).length
    );
    messages.push({ role: "user", content: "must not leak" });
    assert.equal(
      (stored.body.messages as unknown[]).length,
      3,
      "cache entry unaffected by caller mutation"
    );
  });
});
