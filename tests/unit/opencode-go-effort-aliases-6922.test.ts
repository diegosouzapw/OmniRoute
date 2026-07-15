/**
 * Issue #6922 — Effort-tier aliases for glm-5.2 and mimo-v2.5 on opencode-go.
 *
 * Tests import and call the real `parseEffortLevel` from OpencodeExecutor
 * to verify effort-tier parsing works for all registered models.
 *
 * The OpencodeExecutor must:
 *  1. Rewrite effort-alias model ids to their canonical base id
 *  2. Inject `reasoning_effort` if not already set
 *
 * Previously only deepseek-v4-pro had aliases. Now glm-5.2 and mimo-v2.5
 * also have high/max tiers.
 */

import test from "node:test";
import assert from "node:assert/strict";

// ─── Stub ESM loader hooks so the executor can be imported in a bare
//     node:test process without triggering side effects (DB init, fetch,
//     etc.). We only need parseEffortLevel, which is a pure function. ───

const { parseEffortLevel } = (await import("../../open-sse/executors/opencode.ts")) as {
  parseEffortLevel: (model: string) => { baseModel: string; effort: string } | null;
};

// ─── DeepSeek v4-pro: all 4 tiers ─────────────────────────────────────────

test("#6922 parseEffortLevel: deepseek-v4-pro-low → low", () => {
  const result = parseEffortLevel("deepseek-v4-pro-low");
  assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "low" });
});

test("#6922 parseEffortLevel: deepseek-v4-pro-medium → medium", () => {
  const result = parseEffortLevel("deepseek-v4-pro-medium");
  assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "medium" });
});

test("#6922 parseEffortLevel: deepseek-v4-pro-high → high", () => {
  const result = parseEffortLevel("deepseek-v4-pro-high");
  assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "high" });
});

test("#6922 parseEffortLevel: deepseek-v4-pro-max → max", () => {
  const result = parseEffortLevel("deepseek-v4-pro-max");
  assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "max" });
});

// ─── GLM-5.2: high + max only ────────────────────────────────────────────

test("#6922 parseEffortLevel: glm-5.2-high → high", () => {
  const result = parseEffortLevel("glm-5.2-high");
  assert.deepEqual(result, { baseModel: "glm-5.2", effort: "high" });
});

test("#6922 parseEffortLevel: glm-5.2-max → max", () => {
  const result = parseEffortLevel("glm-5.2-max");
  assert.deepEqual(result, { baseModel: "glm-5.2", effort: "max" });
});

// ─── MiMo-V2.5: high + max only ──────────────────────────────────────────

test("#6922 parseEffortLevel: mimo-v2.5-high → high", () => {
  const result = parseEffortLevel("mimo-v2.5-high");
  assert.deepEqual(result, { baseModel: "mimo-v2.5", effort: "high" });
});

test("#6922 parseEffortLevel: mimo-v2.5-max → max", () => {
  const result = parseEffortLevel("mimo-v2.5-max");
  assert.deepEqual(result, { baseModel: "mimo-v2.5", effort: "max" });
});

// ─── Negative cases ────────────────────────────────────────────────────────

test("#6922 parseEffortLevel: unknown model → null", () => {
  const result = parseEffortLevel("nonexistent-model-high");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: glm-5.2-low → null (unsupported tier)", () => {
  const result = parseEffortLevel("glm-5.2-low");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: mimo-v2.5-medium → null (unsupported tier)", () => {
  const result = parseEffortLevel("mimo-v2.5-medium");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: empty string → null", () => {
  assert.strictEqual(parseEffortLevel(""), null);
});

test("#6922 parseEffortLevel: base model without tier → null", () => {
  assert.strictEqual(parseEffortLevel("glm-5.2"), null);
});
