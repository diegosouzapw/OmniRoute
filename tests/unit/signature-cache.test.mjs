import test from "node:test";
import assert from "node:assert/strict";

const {
  getSignatures,
  addSignature,
  detectAndLearn,
  getModelFamily,
  getCacheStats,
  clearCache,
} = await import("../../open-sse/services/signatureCache.ts");

test.beforeEach(() => clearCache());

// ─── getSignatures ──────────────────────────────────────────────────────────

test("getSignatures: returns defaults when empty cache", () => {
  const sigs = getSignatures();
  assert.ok(sigs.includes("<antThinking>"));
  assert.ok(sigs.includes("</antThinking>"));
  assert.ok(sigs.includes("<thinking>"));
  assert.ok(sigs.length >= 6);
});

test("getSignatures: merges tool-layer patterns", () => {
  addSignature("<cursorThinking>", { tool: "cursor" });
  const sigs = getSignatures({ tool: "cursor" });
  assert.ok(sigs.includes("<cursorThinking>"));
  assert.ok(sigs.includes("<antThinking>")); // defaults still present
});

test("getSignatures: merges family-layer patterns", () => {
  addSignature("<deepThought>", { modelFamily: "claude-sonnet" });
  const sigs = getSignatures({ modelFamily: "claude-sonnet" });
  assert.ok(sigs.includes("<deepThought>"));
});

test("getSignatures: merges session-layer patterns", () => {
  addSignature("<sessThink>", { sessionId: "abc123" });
  const sigs = getSignatures({ sessionId: "abc123" });
  assert.ok(sigs.includes("<sessThink>"));
  // Another session should NOT see it
  const other = getSignatures({ sessionId: "other" });
  assert.ok(!other.includes("<sessThink>"));
});

// ─── addSignature ───────────────────────────────────────────────────────────

test("addSignature: ignores null/empty", () => {
  addSignature(null, { tool: "test" });
  addSignature("", { tool: "test" });
  const stats = getCacheStats();
  assert.equal(stats.tool.entries, 0);
});

test("addSignature: adds to multiple layers", () => {
  addSignature("<multiTag>", { tool: "t", modelFamily: "f", sessionId: "s" });
  assert.ok(getSignatures({ tool: "t" }).includes("<multiTag>"));
  assert.ok(getSignatures({ modelFamily: "f" }).includes("<multiTag>"));
  assert.ok(getSignatures({ sessionId: "s" }).includes("<multiTag>"));
});

// ─── detectAndLearn ─────────────────────────────────────────────────────────

test("detectAndLearn: finds known signatures", () => {
  const result = detectAndLearn("<antThinking>I think...</antThinking> Hello!", {});
  assert.ok(result.found.includes("<antThinking>"));
  assert.ok(result.found.includes("</antThinking>"));
  assert.ok(!result.cleaned.includes("<antThinking>"));
});

test("detectAndLearn: auto-learns new thinking tags", () => {
  const text = "<customThinking>some thought</customThinking> answer";
  const result = detectAndLearn(text, { tool: "test-tool" });
  assert.ok(result.found.includes("<customThinking>"));
  // Should now be in cache
  const sigs = getSignatures({ tool: "test-tool" });
  assert.ok(sigs.includes("<customThinking>"));
});

test("detectAndLearn: handles null/empty input", () => {
  assert.deepEqual(detectAndLearn(null), { found: [], cleaned: null });
  assert.deepEqual(detectAndLearn(""), { found: [], cleaned: "" });
});

test("detectAndLearn: preserves non-thinking text", () => {
  const result = detectAndLearn("Hello world, no thinking tags here", {});
  assert.equal(result.found.length, 0);
  assert.equal(result.cleaned, "Hello world, no thinking tags here");
});

// ─── getModelFamily ─────────────────────────────────────────────────────────

test("getModelFamily: extracts family from versioned model", () => {
  assert.equal(getModelFamily("claude-sonnet-4-20250514"), "claude-sonnet");
  assert.equal(getModelFamily("gpt-4o-2024-08-06"), "gpt-4o");
});

test("getModelFamily: returns null for empty", () => {
  assert.equal(getModelFamily(null), null);
  assert.equal(getModelFamily(""), null);
});

test("getModelFamily: handles simple names", () => {
  assert.equal(getModelFamily("claude-sonnet-4"), "claude-sonnet");
  assert.equal(getModelFamily("gpt-4o"), "gpt-4o");
});

// ─── getCacheStats ──────────────────────────────────────────────────────────

test("getCacheStats: returns structure", () => {
  const stats = getCacheStats();
  assert.ok("tool" in stats);
  assert.ok("family" in stats);
  assert.ok("session" in stats);
  assert.ok("defaultCount" in stats);
  assert.equal(stats.defaultCount, 6);
});

test("getCacheStats: counts accurately", () => {
  addSignature("<a>", { tool: "t1" });
  addSignature("<b>", { tool: "t1" });
  addSignature("<c>", { tool: "t2" });
  const stats = getCacheStats();
  assert.equal(stats.tool.entries, 2); // t1, t2
  assert.equal(stats.tool.patterns, 3); // a, b under t1 + c under t2
});
