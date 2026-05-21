import test from "node:test";
import assert from "node:assert/strict";

// Test cases for the auto-combo context window pre-filter (#1808)
// Filters out models whose context window is too small for the estimated input tokens

interface Target {
  modelStr: string;
}

interface FilterResult {
  result: Target[];
  didFallback: boolean;
}

/**
 * Simulates the context-window filter logic from combo.ts
 * Filters out candidates whose known context limit is smaller than estimated input tokens.
 * Null/unknown limits are treated as "include" to avoid incorrectly dropping valid targets.
 */
function contextWindowFilter(
  eligibleTargets: Target[],
  estimatedInputTokens: number,
  getLimitFn: (modelStr: string) => number | null
): FilterResult {
  if (estimatedInputTokens <= 0) {
    return { result: eligibleTargets, didFallback: false };
  }

  const filtered = eligibleTargets.filter((target) => {
    const limit = getLimitFn(target.modelStr);
    if (limit === null || limit === undefined) return true;
    return limit >= estimatedInputTokens;
  });

  if (filtered.length > 0) {
    return { result: filtered, didFallback: false };
  }

  return { result: eligibleTargets, didFallback: true };
}

test("TC-1: large input exceeds small models — only large-context candidates survive", () => {
  const targets: Target[] = [
    { modelStr: "openai/gpt-4o-mini" },
    { modelStr: "openai/gpt-4o" },
    { modelStr: "anthropic/claude-3-5" },
  ];
  const limits: Record<string, number> = {
    "openai/gpt-4o-mini": 8192,
    "openai/gpt-4o": 32768,
    "anthropic/claude-3-5": 131072,
  };

  const { result, didFallback } = contextWindowFilter(targets, 20000, (m) => limits[m] ?? null);

  assert.equal(result.length, 2, "Should keep 2 models with context >= 20k");
  assert.ok(
    result.every((t) => t.modelStr !== "openai/gpt-4o-mini"),
    "Should exclude gpt-4o-mini (8k)"
  );
  assert.equal(didFallback, false, "Should not fallback when matches found");
});

test("TC-2: all candidates too small — fallback to full pool", () => {
  const targets: Target[] = [
    { modelStr: "a/small1" },
    { modelStr: "a/small2" },
    { modelStr: "a/small3" },
  ];

  const { result, didFallback } = contextWindowFilter(targets, 20000, () => 4096);

  assert.equal(result.length, 3, "Should preserve all targets when all filtered");
  assert.equal(didFallback, true, "Should indicate fallback occurred");
});

test("TC-3: null-limit candidates always included", () => {
  const targets: Target[] = [
    { modelStr: "a/unknown1" },
    { modelStr: "a/small" },
    { modelStr: "a/unknown2" },
  ];
  const limits: Record<string, number | null> = {
    "a/unknown1": null,
    "a/small": 4096,
    "a/unknown2": null,
  };

  const { result, didFallback } = contextWindowFilter(targets, 20000, (m) => limits[m] ?? null);

  assert.equal(result.length, 2, "Should include 2 null-limit models, exclude small");
  assert.ok(
    result.every((t) => t.modelStr !== "a/small"),
    "Should exclude model with insufficient context"
  );
  assert.equal(didFallback, false, "Should not fallback");
});

test("TC-4: zero estimated tokens — filter is skipped, pool unchanged", () => {
  const targets: Target[] = [{ modelStr: "a/m1" }, { modelStr: "a/m2" }];

  const { result, didFallback } = contextWindowFilter(targets, 0, () => 4096);

  assert.equal(result.length, 2, "Should not filter when tokens = 0");
  assert.equal(didFallback, false);
});

test("TC-5: exact context limit match passes", () => {
  const targets: Target[] = [{ modelStr: "a/exact" }, { modelStr: "a/small" }];
  const limits: Record<string, number> = {
    "a/exact": 10000,
    "a/small": 4096,
  };

  const { result } = contextWindowFilter(targets, 10000, (m) => limits[m] ?? null);

  assert.equal(result.length, 1, "Should include model with exact limit match");
  assert.deepEqual(result[0], { modelStr: "a/exact" });
});

test("TC-6: undefined limit (not null) treated as unknown — included", () => {
  const targets: Target[] = [{ modelStr: "a/unknown" }];

  const { result } = contextWindowFilter(targets, 5000, (): number | null => undefined);

  assert.equal(result.length, 1, "Should include model with undefined limit");
});

test("TC-7: negative estimated tokens treated as 0 — no filtering", () => {
  const targets: Target[] = [{ modelStr: "a/m1" }, { modelStr: "a/m2" }];

  const { result } = contextWindowFilter(targets, -100, () => 4096);

  assert.equal(result.length, 2, "Should not filter on negative tokens");
});

test("TC-8: mixed limits scenario", () => {
  const targets: Target[] = [
    { modelStr: "openai/gpt-3.5" },
    { modelStr: "openai/gpt-4" },
    { modelStr: "anthropic/claude" },
    { modelStr: "google/gemini" },
  ];
  const limits: Record<string, number | null> = {
    "openai/gpt-3.5": 4096,
    "openai/gpt-4": 8192,
    "anthropic/claude": null, // unknown
    "google/gemini": 32768,
  };

  const { result, didFallback } = contextWindowFilter(targets, 5000, (m) => limits[m] ?? null);

  assert.equal(result.length, 3, "Should keep gpt-4 (8k), claude (unknown), gemini (32k)");
  assert.ok(
    result.every((t) => t.modelStr !== "openai/gpt-3.5"),
    "Should exclude gpt-3.5 (4k)"
  );
  assert.ok(
    result.some((t) => t.modelStr === "anthropic/claude"),
    "Should keep unknown-limit model"
  );
  assert.equal(didFallback, false);
});
