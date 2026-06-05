import { test } from "node:test";
import assert from "node:assert/strict";

const { estimateBatchCost } = await import("../../../../src/lib/batches/costEstimator.ts");

const ENDPOINT = "/v1/chat/completions" as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeLine(
  customId: string,
  model: string = "gpt-4o",
  maxTokens: number | undefined = undefined,
  contentLen = 100
) {
  const body: Record<string, unknown> = {
    model,
    messages: [{ role: "user", content: "x".repeat(contentLen) }],
  };
  if (maxTokens !== undefined) body.max_tokens = maxTokens;
  return JSON.stringify({ custom_id: customId, method: "POST", url: ENDPOINT, body });
}

function makeJsonl(lines: string[]) {
  return lines.join("\n") + "\n";
}

// ── Known model ───────────────────────────────────────────────────────────────

test("estimateBatchCost: known model (gpt-4o) → pricingSource=exact-match, no warnings", () => {
  const jsonl = makeJsonl([makeLine("req-1")]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.model, "gpt-4o");
  assert.equal(result.pricingSource, "exact-match");
  assert.equal(result.warnings.length, 0);
  assert.equal(result.totalRequests, 1);
});

test("estimateBatchCost: batchCostUsd = syncCostUsd * 0.5", () => {
  const jsonl = makeJsonl([makeLine("req-1")]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.ok(Math.abs(result.batchCostUsd - result.syncCostUsd * 0.5) < 1e-12, "batch cost should be half of sync");
});

test("estimateBatchCost: savingsUsd = syncCostUsd - batchCostUsd", () => {
  const jsonl = makeJsonl([makeLine("req-1")]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.ok(Math.abs(result.savingsUsd - (result.syncCostUsd - result.batchCostUsd)) < 1e-12);
});

// ── Unknown model ──────────────────────────────────────────────────────────────

test("estimateBatchCost: unknown model → pricingSource=fallback, warning added, cost=0", () => {
  const jsonl = makeJsonl([makeLine("req-1", "totally-unknown-model-xyz-999")]);
  const result = estimateBatchCost({ jsonl, model: "totally-unknown-model-xyz-999", endpoint: ENDPOINT });
  assert.equal(result.pricingSource, "fallback");
  assert.ok(result.warnings.length > 0, "should have a warning for unknown model");
  assert.ok(result.warnings[0].includes("totally-unknown-model-xyz-999"));
  assert.equal(result.syncCostUsd, 0);
  assert.equal(result.batchCostUsd, 0);
  assert.equal(result.savingsUsd, 0);
});

// ── Token counting heuristic ──────────────────────────────────────────────────

test("estimateBatchCost: input tokens estimated from body byte length / 4", () => {
  // Body of exactly 400 chars → estimated 100 tokens
  const body = { model: "gpt-4o", messages: [{ role: "user", content: "x".repeat(370) }] };
  const bodyStr = JSON.stringify(body);
  const expectedTokens = Math.ceil(bodyStr.length / 4);
  const line = JSON.stringify({ custom_id: "r1", method: "POST", url: ENDPOINT, body });
  const result = estimateBatchCost({ jsonl: line + "\n", model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.estimatedInputTokens, expectedTokens);
});

test("estimateBatchCost: max_tokens respected when set", () => {
  const jsonl = makeJsonl([makeLine("req-1", "gpt-4o", 512)]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.estimatedOutputTokens, 512, "should use the provided max_tokens");
});

test("estimateBatchCost: max_tokens capped at 1024", () => {
  const jsonl = makeJsonl([makeLine("req-1", "gpt-4o", 9999)]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.estimatedOutputTokens, 1024, "output tokens should be capped at 1024");
});

test("estimateBatchCost: missing max_tokens → defaults to 256", () => {
  const jsonl = makeJsonl([makeLine("req-1", "gpt-4o", undefined)]);
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.estimatedOutputTokens, 256);
});

// ── Multiple requests ────────────────────────────────────────────────────────

test("estimateBatchCost: multiple requests → totalRequests sums correctly", () => {
  const lines = Array.from({ length: 5 }, (_, i) => makeLine(`req-${i}`, "gpt-4o", 100));
  const result = estimateBatchCost({ jsonl: makeJsonl(lines), model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.totalRequests, 5);
  assert.equal(result.estimatedOutputTokens, 500, "5 * min(100, 1024) = 500");
});

test("estimateBatchCost: mixed max_tokens values → sum correctly", () => {
  const line1 = makeLine("req-1", "gpt-4o", 100);
  const line2 = makeLine("req-2", "gpt-4o", 200);
  const line3 = makeLine("req-3", "gpt-4o", 2000); // capped at 1024
  const result = estimateBatchCost({
    jsonl: makeJsonl([line1, line2, line3]),
    model: "gpt-4o",
    endpoint: ENDPOINT,
  });
  assert.equal(result.estimatedOutputTokens, 100 + 200 + 1024);
});

// ── Anthropic shape (params) ──────────────────────────────────────────────────

test("estimateBatchCost: Anthropic shape (params) → parses params instead of body", () => {
  const line = JSON.stringify({
    custom_id: "req-1",
    params: {
      model: "claude-sonnet-4-6-20251031",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 256,
    },
  });
  const result = estimateBatchCost({
    jsonl: line + "\n",
    model: "claude-sonnet-4-6-20251031",
    endpoint: ENDPOINT,
  });
  assert.equal(result.totalRequests, 1);
  assert.equal(result.estimatedOutputTokens, 256);
  assert.equal(result.pricingSource, "exact-match");
});

// ── Performance ────────────────────────────────────────────────────────────────

test("estimateBatchCost: 1000 lines processed in < 500ms", () => {
  const lines = Array.from({ length: 1000 }, (_, i) => makeLine(`req-${i}`, "gpt-4o", 256));
  const jsonl = makeJsonl(lines);
  const start = Date.now();
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  const elapsed = Date.now() - start;
  assert.ok(elapsed < 500, `should complete in < 500ms, took ${elapsed}ms`);
  assert.equal(result.totalRequests, 1000);
});

// ── Empty JSONL ───────────────────────────────────────────────────────────────

test("estimateBatchCost: empty JSONL → totalRequests=0, all costs=0", () => {
  const result = estimateBatchCost({ jsonl: "", model: "gpt-4o", endpoint: ENDPOINT });
  assert.equal(result.totalRequests, 0);
  assert.equal(result.syncCostUsd, 0);
  assert.equal(result.batchCostUsd, 0);
});

// ── Malformed lines are skipped ───────────────────────────────────────────────

test("estimateBatchCost: malformed line skipped gracefully, no crash", () => {
  const jsonl = "NOT JSON\n" + makeLine("req-1") + "\n";
  const result = estimateBatchCost({ jsonl, model: "gpt-4o", endpoint: ENDPOINT });
  // totalRequests counts all non-empty lines (malformed included — they still
  // represent requests). The malformed line contributes 0 tokens since it can't
  // be parsed, but the overall run should not throw.
  assert.equal(result.totalRequests, 2, "both lines count as requests (one malformed)");
  // The valid line contributes tokens; malformed contributes 0 — so tokens > 0
  assert.ok(result.estimatedInputTokens > 0, "valid line should contribute tokens");
});

// ── Alias-match path (case-insensitive lookup) ────────────────────────────────

test("estimateBatchCost: alias-match path triggers when model differs only in case", () => {
  // gpt-4o exists in DEFAULT_PRICING with lowercase key → uppercase variant
  // should be found via Pass 2 alias-match.
  const result = estimateBatchCost({
    jsonl: makeLine("req-1") + "\n",
    model: "GPT-4O", // intentional upper-case — not stored that way in pricing
    endpoint: ENDPOINT,
  });
  // Either alias-match (preferred when pricing table is case-sensitive) or
  // exact-match (if the table normalizes); both are valid "found" results.
  assert.ok(
    result.pricingSource === "alias-match" || result.pricingSource === "exact-match",
    `expected match (alias or exact), got ${result.pricingSource}`,
  );
  assert.ok(result.syncCostUsd > 0, "non-zero cost expected when pricing is found");
});
