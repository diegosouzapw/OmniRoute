/**
 * Regression test for #6187 — reasoning-token accounting is blind to
 * `reasoning_content` / `<think>` models.
 *
 * Some providers (e.g. stepfun step-3.7-flash) emit reasoning content in the
 * assistant message but report `reasoning_tokens=0` in usage. The usage-derived
 * `tokens_reasoning` column then under-represents reasoning. The conservative
 * fix records the reasoning SOURCE and raw CHARACTER count in two new,
 * non-cost-touching columns (`reasoning_source`, `reasoning_chars`) while
 * leaving `tokens_reasoning` (what cost math uses) untouched.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { saveCallLog } from "../../src/lib/usage/callLogs.ts";
import { getObservedReasoning } from "../../src/lib/usage/tokenAccounting.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

test.after(() => {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM call_logs WHERE id LIKE 'test-6187-%'").run();
  } catch {
    // best-effort cleanup
  }
  try {
    resetDbInstance();
  } catch {
    // best-effort handle release (per DB-handle hang rule)
  }
});

// ── getObservedReasoning helper ────────────────────────────────────────────

test("getObservedReasoning: reasoning_content field → source=content", () => {
  const observed = getObservedReasoning({ reasoning_content: "Let me think about this." });
  assert.equal(observed.source, "content");
  assert.equal(observed.chars, "Let me think about this.".length);
});

test("getObservedReasoning: reasoning field (sse-mapped) → source=content", () => {
  const observed = getObservedReasoning({ reasoning: "step one, step two" });
  assert.equal(observed.source, "content");
  assert.ok(observed.chars > 0);
});

test("getObservedReasoning: inline <think> block → source=think", () => {
  const observed = getObservedReasoning({
    content: "<think>hidden chain of thought</think>final answer",
  });
  assert.equal(observed.source, "think");
  assert.equal(observed.chars, "hidden chain of thought".length);
});

test("getObservedReasoning: no reasoning → source=null, chars=0", () => {
  const observed = getObservedReasoning({ content: "just a plain answer" });
  assert.equal(observed.source, null);
  assert.equal(observed.chars, 0);
});

// ── Persistence: reasoning_content present but usage reports 0 ──────────────

test("saveCallLog records reasoning_source=content when usage under-reports reasoning", async () => {
  const db = getDbInstance();
  const testId = `test-6187-content-${Date.now()}`;
  const reasoning = "The model reasoned internally but reported zero reasoning tokens.";

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "step-3.7-flash",
    provider: "stepfun",
    duration: 100,
    // usage EXPLICITLY reports reasoning_tokens=0 (the bug trigger)
    tokens: { prompt_tokens: 10, completion_tokens: 20, reasoning_tokens: 0 },
    responseBody: {
      choices: [{ message: { role: "assistant", content: "answer", reasoning_content: reasoning } }],
    },
  });

  const row = db
    .prepare(
      "SELECT tokens_reasoning, reasoning_source, reasoning_chars FROM call_logs WHERE id = ?"
    )
    .get(testId) as {
    tokens_reasoning: number | null;
    reasoning_source: string | null;
    reasoning_chars: number | null;
  };

  assert.ok(row, "row should exist");
  // Reasoning presence is now recorded from the message content...
  assert.equal(row.reasoning_source, "content", "source should be content");
  assert.equal(row.reasoning_chars, reasoning.length, "char count should match reasoning content");
  // ...while the usage-derived, cost-relevant column stays exactly 0.
  assert.equal(row.tokens_reasoning, 0, "tokens_reasoning stays usage-derived (0)");

  // Cost math is untouched: reasoning_chars never enters cost; tokens.reasoning is 0.
  const cost = computeCostFromPricing(
    { input: 5, output: 10, reasoning: 100 },
    { prompt_tokens: 10, completion_tokens: 20, reasoning: 0 }
  );
  const costNoReasoning = computeCostFromPricing(
    { input: 5, output: 10, reasoning: 100 },
    { prompt_tokens: 10, completion_tokens: 20 }
  );
  assert.equal(cost, costNoReasoning, "reasoning contributes 0 to cost when metered 0");
});

// ── Regression: normal usage-reported reasoning keeps source=usage ──────────

test("saveCallLog keeps reasoning_source=usage when usage reports reasoning tokens", async () => {
  const db = getDbInstance();
  const testId = `test-6187-usage-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "o3-mini",
    provider: "openai",
    duration: 100,
    tokens: {
      prompt_tokens: 5,
      completion_tokens: 100,
      completion_tokens_details: { reasoning_tokens: 57 },
    },
    responseBody: {
      choices: [{ message: { role: "assistant", content: "answer" } }],
    },
  });

  const row = db
    .prepare("SELECT tokens_reasoning, reasoning_source, reasoning_chars FROM call_logs WHERE id = ?")
    .get(testId) as {
    tokens_reasoning: number | null;
    reasoning_source: string | null;
    reasoning_chars: number | null;
  };

  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, "usage", "usage-reported reasoning keeps source=usage");
  assert.equal(row.tokens_reasoning, 57, "tokens_reasoning stays usage-derived (57)");
  assert.equal(row.reasoning_chars, null, "no char count needed when usage is authoritative");
});
