import test from "node:test";
import assert from "node:assert/strict";

// Dynamic import is the established convention in this suite (loader stack +
// polyfills; see 9303-recovery-hint-all-targets-skipped.test.ts).
const {
  isTinyBudgetReasoningProbe,
  buildReasoningProbeTruncatedResponse,
} = await import("../../open-sse/services/reasoningTokenBuffer.ts");
const quality = await import("../../open-sse/services/combo/validateQuality.ts");

test("#10281 combo path: reasoning-consumed quality reasons are detected", () => {
  assert.equal(
    quality.isReasoningConsumedQualityRejection(
      "reasoning consumed 10/10 tokens — no content output"
    ),
    true
  );
  assert.equal(
    quality.isReasoningConsumedQualityRejection(
      "reasoning consumed 9/10 tokens — no content output"
    ),
    true
  );
  assert.equal(quality.isReasoningConsumedQualityRejection(null), false);
  assert.equal(
    quality.isReasoningConsumedQualityRejection("empty response content"),
    false,
    "other quality failures keep the normal 502 path"
  );
});

test("#10281 combo path: tiny-budget probe predicate gates on max_tokens < 256", () => {
  assert.equal(
    isTinyBudgetReasoningProbe({ model: "deepseek-v4-flash", body: { max_tokens: 10 } }),
    true
  );
  assert.equal(
    isTinyBudgetReasoningProbe({ model: "deepseek-v4-flash", body: { max_tokens: 1024 } }),
    false,
    "real reasoning budgets keep the 502/fallback path"
  );
  assert.equal(
    isTinyBudgetReasoningProbe({ model: "gpt-4o", body: { max_tokens: 10 } }),
    false,
    "non-thinking models are never probes"
  );
});

test("#10281 combo path: truncated probe response is a valid 200 length-stop", async () => {
  const res = buildReasoningProbeTruncatedResponse({
    model: "deepseek-v4-flash",
    maxTokens: 10,
    requestId: "combo-test",
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    choices: Array<{ finish_reason: string; message: { content: string } }>;
    usage: { completion_tokens: number };
  };
  assert.equal(body.choices[0].finish_reason, "length");
  assert.equal(body.choices[0].message.content, "");
  assert.equal(body.usage.completion_tokens, 10);
});
