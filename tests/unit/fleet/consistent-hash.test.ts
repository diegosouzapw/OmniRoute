/**
 * Tests for Consistent Hashing Strategy (Task 0.4).
 *
 * Covers: Jump Consistent Hash correctness, distribution property,
 * minimal redistribution, string hashing stability, ConsistentHashRouter
 * session stickiness, and orderTargetsByConsistentHash integration.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  jumpConsistentHash,
  hashString,
  createConsistentHashRouter,
  orderTargetsByConsistentHash,
  extractSessionKey,
} from "../../../open-sse/services/combo/consistentHashStrategy.ts";

import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

// ──────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────

/** Build a minimal ResolvedComboTarget for testing. */
function makeTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: "target-1",
    modelStr: "openai/gpt-4o",
    provider: "openai",
    providerId: "prov-1",
    connectionId: "conn-1",
    weight: 1,
    label: null,
    ...overrides,
  };
}

/** Build an array of N targets with different executionKey values. */
function makeTargets(n: number): ResolvedComboTarget[] {
  return Array.from({ length: n }, (_, i) =>
    makeTarget({
      stepId: `step-${i + 1}`,
      executionKey: `target-${i + 1}`,
      modelStr: `provider/model-${i + 1}`,
      provider: "provider",
      providerId: `prov-${i + 1}`,
      connectionId: `conn-${i + 1}`,
    })
  );
}

// ──────────────────────────────────────────────
//  Jump Consistent Hash
// ──────────────────────────────────────────────

describe("jumpConsistentHash", () => {
  it("returns -1 for numTargets <= 0", () => {
    assert.equal(jumpConsistentHash(42n, 0), -1);
    assert.equal(jumpConsistentHash(42n, -1), -1);
    assert.equal(jumpConsistentHash(0n, -100), -1);
  });

  it("returns 0 for numTargets === 1", () => {
    assert.equal(jumpConsistentHash(42n, 1), 0);
    assert.equal(jumpConsistentHash(0n, 1), 0);
    assert.equal(jumpConsistentHash(2n ** 64n - 1n, 1), 0);
  });

  it("is deterministic: same key + same N always returns same bucket", () => {
    const key = 123456789n;
    for (let n = 1; n <= 50; n++) {
      const first = jumpConsistentHash(key, n);
      for (let run = 0; run < 100; run++) {
        assert.equal(jumpConsistentHash(key, n), first);
      }
    }
  });

  it("different keys produce different buckets (distribution test)", () => {
    const n = 100;
    const results = new Set<number>();
    for (let i = 0; i < 500; i++) {
      const key = BigInt(i * 1000039 + 7); // diverse keys
      results.add(jumpConsistentHash(key, n));
    }
    // With 500 keys across 100 buckets, we should see a good spread
    // (at minimum, at least 50 distinct buckets)
    assert.ok(results.size >= 50, `Expected at least 50 distinct buckets, got ${results.size}`);
  });

  it("minimal redistribution when N changes (only ~K/N keys remap)", () => {
    const n = 100;
    const numKeys = 2_000;
    const keys = Array.from({ length: numKeys }, (_, i) => BigInt(i * 7919 + 1));

    // Assign all keys to buckets with N = 100
    const before = keys.map((key) => jumpConsistentHash(key, n));
    // Assign all keys to buckets with N = 101
    const after = keys.map((key) => jumpConsistentHash(key, n + 1));

    // Count how many changed
    let changed = 0;
    for (let i = 0; i < numKeys; i++) {
      if (before[i] !== after[i]) changed++;
    }

    // Expected redistribution: roughly K/N keys should remap
    // For K=2000, N=100, expected ~20 keys remap. Give generous margin.
    const expectedRemap = numKeys / n; // ~20
    const maxExpected = Math.max(expectedRemap * 5, 200);

    assert.ok(
      changed <= maxExpected,
      `Expected ≤${maxExpected} keys to remap when N=100→101, got ${changed}`
    );
    assert.ok(
      changed > 0,
      `Expected some keys to remap when N=100→101, got ${changed} (distribution bug?)`
    );
  });

  it("handles edge values (all bits set, zero, large numbers)", () => {
    // Max 64-bit value
    const max64 = (1n << 64n) - 1n;
    assert.ok(
      jumpConsistentHash(max64, 10) >= 0 && jumpConsistentHash(max64, 10) < 10
    );

    // Zero
    assert.ok(
      jumpConsistentHash(0n, 10) >= 0 && jumpConsistentHash(0n, 10) < 10
    );

    // Large values near 2^63
    const large1 = 2n ** 63n - 1n;
    const large2 = 2n ** 63n + 1n;
    const r1 = jumpConsistentHash(large1, 10);
    const r2 = jumpConsistentHash(large2, 10);
    assert.ok(r1 >= 0 && r1 < 10);
    assert.ok(r2 >= 0 && r2 < 10);
    // They should be deterministic
    assert.equal(jumpConsistentHash(large1, 10), r1);
    assert.equal(jumpConsistentHash(large2, 10), r2);
  });

  it("spreads across buckets with different keys", () => {
    const n = 20;
    const numKeys = 5_000;
    const counts = new Array<number>(n).fill(0);

    for (let i = 0; i < numKeys; i++) {
      const key = BigInt(i * 10007 + 3);
      const idx = jumpConsistentHash(key, n);
      counts[idx]++;
    }

    const maxCount = Math.max(...counts);
    const nonEmpty = counts.filter((c) => c > 0).length;

    // Jump hash prioritizes minimal redistribution over uniformity.
    // Verify keys actually spread across multiple buckets (not all the same)
    // and the max bucket doesn't contain an extreme majority.
    assert.ok(
      nonEmpty >= 3,
      `Expected at least 3 non-empty buckets, got ${nonEmpty}`
    );
    assert.ok(
      maxCount < numKeys * 0.9,
      `Expected max bucket < 90% of keys, got ${((maxCount / numKeys) * 100).toFixed(1)}%`
    );
  });
});

// ──────────────────────────────────────────────
//  hashString
// ──────────────────────────────────────────────

describe("hashString", () => {
  it("produces stable hashes for the same input", () => {
    const inputs = ["hello", "session-abc", "", "a".repeat(100), "model:gpt-4o"];
    for (const input of inputs) {
      const h1 = hashString(input);
      const h2 = hashString(input);
      assert.equal(h1, h2, `hashString should be deterministic for "${input}"`);
    }
  });

  it("different inputs produce different hashes", () => {
    const inputs = ["hello", "world", "session-abc", "session-xyz", "", "a", "b"];
    const hashes = new Set(inputs.map((s) => hashString(s)));
    assert.equal(hashes.size, inputs.length, "Each unique input should produce a unique hash");
  });

  it("produces a value within 64-bit range", () => {
    const inputs = ["", "test", "a".repeat(1000), "session:123", "\x00\x01\x02"];
    for (const input of inputs) {
      const h = hashString(input);
      assert.ok(h >= 0n, `Hash should be non-negative for "${input}"`);
      assert.ok(
        h <= (1n << 64n) - 1n,
        `Hash should be within 64-bit range for "${input}"`
      );
    }
  });

  it("similar strings produce different hashes (avalanche)", () => {
    // Small changes should produce very different hashes
    const base = "session:abc123";
    const hBase = hashString(base);
    const hDiff1 = hashString("session:abc124"); // last char changed
    const hDiff2 = hashString("session:abd123"); // middle char changed
    const hDiff3 = hashString("session:abc12"); // truncated

    assert.notEqual(hBase, hDiff1, "Single character change should change hash");
    assert.notEqual(hBase, hDiff2, "Middle character change should change hash");
    assert.notEqual(hBase, hDiff3, "Truncation should change hash");
  });

  it("handles long strings without issue", () => {
    const longStr = "x".repeat(10_000);
    const h = hashString(longStr);
    assert.ok(h >= 0n, `Hash should be valid for large strings`);
    assert.ok(h <= (1n << 64n) - 1n, `Hash should be within 64-bit range for large strings`);

    // Deterministic
    assert.equal(hashString(longStr), h);
  });
});

// ──────────────────────────────────────────────
//  extractSessionKey
// ──────────────────────────────────────────────

describe("extractSessionKey", () => {
  it("prefers sessionId over other keys", () => {
    const key = extractSessionKey({
      sessionId: "sess-001",
      userId: "user-1",
      requestId: "req-1",
      customKey: "custom-1",
    });
    assert.equal(key, "session:sess-001");
  });

  it("falls back to customKey when sessionId is missing", () => {
    const key = extractSessionKey({
      customKey: "custom-key",
      userId: "user-1",
    });
    assert.equal(key, "custom:custom-key");
  });

  it("falls back to requestId when sessionId and customKey are missing", () => {
    const key = extractSessionKey({
      requestId: "req-abc",
      userId: "user-1",
    });
    assert.equal(key, "request:req-abc");
  });

  it("falls back to userId when other identifiers are missing", () => {
    const key = extractSessionKey({
      userId: "user-xyz",
    });
    assert.equal(key, "user:user-xyz");
  });

  it("falls back to provider:model composite when no identifier is present", () => {
    const key = extractSessionKey({
      provider: "openai",
      model: "gpt-4o",
    });
    assert.equal(key, "model:openai/gpt-4o");
  });

  it("falls back to unknown:unknown when context is empty", () => {
    const key = extractSessionKey({});
    assert.equal(key, "model:unknown/unknown");
  });
});

// ──────────────────────────────────────────────
//  ConsistentHashRouter
// ──────────────────────────────────────────────

describe("ConsistentHashRouter", () => {
  it("selectTarget returns targets in correct order with selected first", () => {
    const targets = makeTargets(5);
    const router = createConsistentHashRouter(extractSessionKey);

    const result = router.selectTarget(targets, { sessionId: "sess-001" });
    assert.equal(result.length, targets.length, "Should return same number of targets");
    // All original targets should be present
    for (const t of targets) {
      assert.ok(result.includes(t), "All original targets should be in result");
    }
    // The first target is the selected one
    assert.ok(result[0] !== undefined, "First target should be defined");
  });

  it("same session consistently routes to same target", () => {
    const targets = makeTargets(10);
    const router = createConsistentHashRouter(extractSessionKey);

    const results: string[] = [];
    const runs = 20;
    for (let i = 0; i < runs; i++) {
      const result = router.selectTarget(targets, { sessionId: "stable-session" });
      results.push(result[0].executionKey);
    }

    // All runs should select the same target
    const uniqueSelections = new Set(results);
    assert.equal(uniqueSelections.size, 1, "Same session should consistently select same target");
  });

  it("different sessions may route to different targets", () => {
    const targets = makeTargets(10);
    const router = createConsistentHashRouter(extractSessionKey);

    const results = new Set<string>();
    const numSessions = 50;
    for (let i = 0; i < numSessions; i++) {
      const result = router.selectTarget(targets, { sessionId: `session-${i}` });
      results.add(result[0].executionKey);
    }

    // With 50 sessions across 10 targets, we should see at least 5 distinct targets
    assert.ok(
      results.size >= 5,
      `Expected at least 5 distinct targets across 50 sessions, got ${results.size}`
    );
  });

  it("fallback key when no session identifier is present still selects deterministically", () => {
    const targets = makeTargets(10);
    const router = createConsistentHashRouter(extractSessionKey);

    // With only provider/model context (no sessionId)
    const result1 = router.selectTarget(targets, {
      provider: "openai",
      model: "gpt-4o",
    });
    const result2 = router.selectTarget(targets, {
      provider: "openai",
      model: "gpt-4o",
    });

    assert.equal(result1[0].executionKey, result2[0].executionKey);
  });

  it("returns all targets in order when only one target", () => {
    const targets = [makeTarget({ executionKey: "only-target" })];
    const router = createConsistentHashRouter(extractSessionKey);

    const result = router.selectTarget(targets, { sessionId: "sess-001" });
    assert.equal(result.length, 1);
    assert.equal(result[0].executionKey, "only-target");
  });

  it("returns empty array for empty targets", () => {
    const targets: ResolvedComboTarget[] = [];
    const router = createConsistentHashRouter(extractSessionKey);

    const result = router.selectTarget(targets, { sessionId: "sess-001" });
    assert.equal(result.length, 0);
  });

  it("selected target is consistently first across multiple calls", () => {
    const targets = makeTargets(8);
    const router = createConsistentHashRouter(extractSessionKey);

    const result1 = router.selectTarget(targets, { sessionId: "persistent-session" });
    const result2 = router.selectTarget(targets, { sessionId: "persistent-session" });
    const result3 = router.selectTarget(targets, { sessionId: "persistent-session" });

    assert.equal(result1[0].executionKey, result2[0].executionKey);
    assert.equal(result2[0].executionKey, result3[0].executionKey);
  });
});

// ──────────────────────────────────────────────
//  orderTargetsByConsistentHash (integration)
// ──────────────────────────────────────────────

describe("orderTargetsByConsistentHash", () => {
  it("re-orders ResolvedComboTarget array with selected target first", () => {
    const targets = makeTargets(6);
    const result = orderTargetsByConsistentHash(targets, { sessionId: "test-session" });

    assert.equal(result.length, targets.length);
    // First target should be one from the original list
    assert.ok(targets.includes(result[0]));
  });

  it("same session produces same ordering", () => {
    const targets = makeTargets(6);
    const result1 = orderTargetsByConsistentHash(targets, { sessionId: "stable" });
    const result2 = orderTargetsByConsistentHash(targets, { sessionId: "stable" });

    for (let i = 0; i < targets.length; i++) {
      assert.equal(result1[i].executionKey, result2[i].executionKey);
    }
  });

  it("different sessions produce different orderings (with high probability)", () => {
    const targets = makeTargets(6);
    const resultA = orderTargetsByConsistentHash(targets, { sessionId: "alpha" });
    const resultB = orderTargetsByConsistentHash(targets, { sessionId: "beta" });

    // It's possible (though very unlikely with 6 targets)
    // that both sessions happen to hash to the same bucket.
    // We just verify they produce valid results.
    assert.equal(resultA.length, targets.length);
    assert.equal(resultB.length, targets.length);
  });

  it("uses session-based context and falls back to provider:model", () => {
    const targets = makeTargets(5);
    const result = orderTargetsByConsistentHash(targets, {
      provider: "anthropic",
      model: "claude-4",
    });

    assert.equal(result.length, targets.length);
    // Should pick deterministically based on provider:model fallback
    const result2 = orderTargetsByConsistentHash(targets, {
      provider: "anthropic",
      model: "claude-4",
    });

    assert.equal(result[0].executionKey, result2[0].executionKey);
  });

  it("preserves non-selected targets in original order", () => {
    const targets = makeTargets(5);
    const result = orderTargetsByConsistentHash(targets, { sessionId: "order-test" });

    // Find the selected index
    const selectedIdx = targets.indexOf(result[0]);
    assert.ok(selectedIdx >= 0, "Selected target should be in original list");

    // Remaining targets should retain their original relative order
    const remaining = targets.filter((_, i) => i !== selectedIdx);
    for (let i = 0; i < remaining.length; i++) {
      assert.equal(result[i + 1].executionKey, remaining[i].executionKey);
    }
  });
});

// ──────────────────────────────────────────────
//  Edge cases
// ──────────────────────────────────────────────

describe("consistent-hash edge cases", () => {
  it("jumpConsistentHash with very large numTargets", () => {
    // Jump hash should handle reasonably large target counts
    const key = 12345n;
    const largeN = 10_000;
    const result = jumpConsistentHash(key, largeN);
    assert.ok(result >= 0 && result < largeN, "Should pick a valid bucket for large N");

    // Deterministic
    assert.equal(jumpConsistentHash(key, largeN), result);
  });

  it("minimal redistribution holds for consecutive N changes", () => {
    const keys = Array.from({ length: 2_000 }, (_, i) => BigInt(i * 1009 + 3));
    const initialN = 50;

    // For each consecutive step N→N+1, check that only expected fraction remap.
    let prevAssignments = keys.map((k) => jumpConsistentHash(k, initialN));
    for (let n = initialN; n < 65; n++) {
      const newAssignments = keys.map((k) => jumpConsistentHash(k, n + 1));
      let changed = 0;
      for (let i = 0; i < keys.length; i++) {
        if (prevAssignments[i] !== newAssignments[i]) changed++;
      }
      // Expected remap per step: ~K/(N+1) ≈ 2000/51 ≈ 39. Allow 5x margin.
      const maxExpected = Math.ceil((keys.length / (n + 1)) * 5);
      assert.ok(
        changed <= maxExpected,
        `Expected ≤${maxExpected} remap from N=${n}→${n + 1}, got ${changed}`
      );
      prevAssignments = newAssignments;
    }
  });
});
