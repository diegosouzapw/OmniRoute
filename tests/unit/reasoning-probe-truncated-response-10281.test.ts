/**
 * #10281 — tiny-budget reasoning probes (e.g. Claude Code's `/model` capability
 * check sends `max_tokens: 1`) must be answered with a valid truncated 200 when
 * the upstream answers the reasoning-only outcome with a 5xx ("empty response
 * content") instead of a truncated 200 — rather than relaying the upstream
 * failure, which also poisons connection cooldown/health bookkeeping.
 *
 * Covers the pure helpers in open-sse/services/reasoningTokenBuffer.ts:
 *   - isTinyBudgetReasoningProbe           — probe detection
 *   - isEmptyContentUpstreamFailure        — empty-content 5xx detection
 *   - buildReasoningProbeTruncatedResponse — synthetic truncated 200
 * plus the invariant that the synthetic body is NOT flagged as empty content by
 * errorClassifier.isEmptyContentResponse (finish_reason "length" is legitimate).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-probe-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const {
  REASONING_BUFFER_MIN_TRIGGER,
  buildReasoningProbeTruncatedResponse,
  isEmptyContentUpstreamFailure,
  isTinyBudgetReasoningProbe,
} = await import("../../open-sse/services/reasoningTokenBuffer.ts");
const { isEmptyContentResponse } = await import("../../open-sse/services/errorClassifier.ts");

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

test.before(() => {
  saveModelsDevCapabilities({
    zhipu: {
      // A thinking-capable model: probe detection + buffer logic both engage.
      "glm-5.2": capabilityEntry(200000, { reasoning: true, limit_output: 65536 }),
      // A non-reasoning sibling: probes are not special-cased.
      "glm-5.2-flash": capabilityEntry(200000, { reasoning: false, limit_output: 4096 }),
    },
  });
});

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10281 isTinyBudgetReasoningProbe detects tiny explicit budgets on reasoning models", () => {
  const thinking = "zhipu/glm-5.2";
  // Claude Code's `/model` probe (max_tokens: 1) is a tiny-budget reasoning probe.
  assert.equal(
    isTinyBudgetReasoningProbe({ model: thinking, body: { max_tokens: 1 } }),
    true,
    "max_tokens=1 on a reasoning model is a probe"
  );
  // Just below the trigger threshold is still a probe.
  assert.equal(
    isTinyBudgetReasoningProbe({
      model: thinking,
      body: { max_tokens: REASONING_BUFFER_MIN_TRIGGER - 1 },
    }),
    true,
    "budgets below REASONING_BUFFER_MIN_TRIGGER are probes"
  );
  // At/above the threshold it is a genuine budget, not a probe.
  assert.equal(
    isTinyBudgetReasoningProbe({
      model: thinking,
      body: { max_tokens: REASONING_BUFFER_MIN_TRIGGER },
    }),
    false,
    "budgets at REASONING_BUFFER_MIN_TRIGGER are not probes"
  );
  assert.equal(
    isTinyBudgetReasoningProbe({ model: thinking, body: { max_tokens: 512 } }),
    false,
    "genuine budgets are not probes"
  );
  // OpenAI Responses format field is honoured.
  assert.equal(
    isTinyBudgetReasoningProbe({ model: thinking, body: { max_completion_tokens: 1 } }),
    true,
    "max_completion_tokens=1 is a probe"
  );
  // Missing / non-positive budgets are not probes.
  assert.equal(
    isTinyBudgetReasoningProbe({ model: thinking, body: {} }),
    false,
    "no budget is not a probe"
  );
  assert.equal(
    isTinyBudgetReasoningProbe({ model: thinking, body: { max_tokens: 0 } }),
    false,
    "non-positive budget is not a probe"
  );
  // Non-reasoning models never probe-special-case.
  assert.equal(
    isTinyBudgetReasoningProbe({ model: "zhipu/glm-5.2-flash", body: { max_tokens: 1 } }),
    false,
    "non-reasoning models are not probes"
  );
});

test("#10281 isEmptyContentUpstreamFailure matches empty-content 5xx markers", () => {
  assert.equal(isEmptyContentUpstreamFailure(500, "empty response content"), true);
  assert.equal(isEmptyContentUpstreamFailure(500, "No content was produced"), true);
  assert.equal(isEmptyContentUpstreamFailure(502, "empty response content"), true);
  assert.equal(
    isEmptyContentUpstreamFailure(500, "empty response body"),
    false,
    "generic empty-body 5xx is not a reasoning outcome"
  );
  assert.equal(isEmptyContentUpstreamFailure(500, "server_error"), false);
  assert.equal(isEmptyContentUpstreamFailure(503, "upstream timeout"), false);
  assert.equal(
    isEmptyContentUpstreamFailure(429, "empty response content"),
    false,
    "non-5xx is not an empty-content failure"
  );
  assert.equal(isEmptyContentUpstreamFailure(200, "empty response content"), false);
});

test("#10281 buildReasoningProbeTruncatedResponse yields a valid truncated 200", async () => {
  const res = buildReasoningProbeTruncatedResponse({
    model: "zhipu/glm-5.2",
    maxTokens: 1,
    requestId: "test-request-id",
  });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") || "", /application\/json/);

  const body = (await res.json()) as Record<string, unknown>;
  const choice = (body.choices as Array<Record<string, unknown>>)[0];
  assert.equal(body.object, "chat.completion");
  assert.equal(body.model, "zhipu/glm-5.2");
  assert.equal(choice.finish_reason, "length");
  assert.equal((choice.message as Record<string, unknown>).content, "");
  assert.equal((body.usage as Record<string, number>).completion_tokens, 1);

  // The synthetic body must pass the empty-content guard (finish_reason "length"
  // is a legitimate truncated completion — see errorClassifier.ts) so the
  // non-stream success path does not re-flag it as a fake-success failure.
  assert.equal(isEmptyContentResponse(body), false, "truncated probe response is a legitimate 200");
});
