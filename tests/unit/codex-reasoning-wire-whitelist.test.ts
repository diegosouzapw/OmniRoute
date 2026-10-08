import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { applyCodexReasoningSelection } from "../../open-sse/executors/codex/reasoningPolicy.ts";
import { setThinkingBudgetConfig, ThinkingMode } from "../../open-sse/services/thinkingBudget.ts";
import { normalizeReasoningRequest } from "../../src/shared/reasoning/effortStandardization.ts";

// The Codex Responses API accepts only `effort` and `summary` inside
// `reasoning`. Client ecosystems send OpenRouter-style keys (`enabled`,
// `max_tokens`, `exclude`, ...) that the upstream rejects with HTTP 400
// "Unknown parameter: 'reasoning.<key>'", taking down every combo target
// with the same deterministic client error. The executor must whitelist the
// object before it reaches the wire; `enabled: false` maps to effort "none"
// when no more specific effort was requested.

const CTX = { requestEndpointPath: "/responses" };

function transform(body: Record<string, unknown>, model = "gpt-6-astra") {
  const executor = new CodexExecutor();
  return executor.transformRequest(model, body, false, CTX) as Record<string, unknown>;
}

function reasoningOf(result: Record<string, unknown>): Record<string, unknown> | null {
  const r = result.reasoning;
  if (r && typeof r === "object" && !Array.isArray(r)) return r as Record<string, unknown>;
  return null;
}

test("reasoning.enabled is stripped; explicit effort survives", () => {
  const r = reasoningOf(transform({ reasoning: { enabled: true, effort: "high" } }));
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.effort, "high");
  assert.equal("enabled" in r, false);
});

test("reasoning.enabled:false maps to effort none when nothing more specific is set", () => {
  const r = reasoningOf(transform({ reasoning: { enabled: false } }));
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.effort, "none");
  assert.equal("enabled" in r, false);
  assert.equal("summary" in r, false, "no summary for disabled reasoning");
});

test("OpenRouter-style reasoning.max_tokens never reaches the wire", () => {
  const r = reasoningOf(transform({ reasoning: { max_tokens: 2048 } }));
  assert.ok(!r || !("max_tokens" in r), "max_tokens must be stripped");
});

test("reasoning.exclude is stripped; sibling effort survives", () => {
  const r = reasoningOf(transform({ reasoning: { exclude: true, effort: "low" } }));
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.effort, "low");
  assert.equal("exclude" in r, false);
});

test("client-provided summary is preserved", () => {
  const r = reasoningOf(transform({ reasoning: { summary: "detailed", effort: "medium" } }));
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.summary, "detailed");
  assert.equal(r.effort, "medium");
});

test("model suffix effort still wins over enabled:false", () => {
  const normalized = normalizeReasoningRequest({ reasoning: { enabled: false } });
  const r = reasoningOf(transform(normalized, "gpt-6-astra-high"));
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.effort, "high");
});

test("enabled:false wins over an explicit connection reasoning default", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  try {
    const executor = new CodexExecutor();
    const result = executor.transformRequest(
      "gpt-6-astra",
      { reasoning: { enabled: false } },
      false,
      {
        requestEndpointPath: "/responses",
        providerSpecificData: { requestDefaults: { reasoningEffort: "high" } },
      }
    ) as Record<string, unknown>;
    const r = reasoningOf(result);
    assert.ok(r, "reasoning object should be present");
    assert.equal(r.effort, "none", "client disable must beat the connection default");
  } finally {
    setThinkingBudgetConfig({});
  }
});

test("flat reasoning_effort path stays clean of extra keys", () => {
  const result = transform({ reasoning_effort: "low", reasoning: { enabled: true } });
  assert.equal("reasoning_effort" in result, false, "flat key must never reach the wire");
  const r = reasoningOf(result);
  assert.ok(r, "reasoning object should be present");
  assert.equal(r.effort, "low");
  assert.equal("enabled" in r, false);
});

test("catalog-backed selection also whitelists reasoning keys and forwards a native tier verbatim", () => {
  const body: Record<string, unknown> = {
    model: "future-codex",
    reasoning: { enabled: true, max_tokens: 2048, exclude: true, summary: "auto", effort: "max" },
  };
  applyCodexReasoningSelection(
    "future-codex",
    body,
    {
      model: "future-codex",
      supportedThinkingEfforts: ["low", "max"],
      defaultThinkingEffort: "low",
    },
    undefined,
    false
  );
  assert.deepEqual(body.reasoning, { summary: "auto", effort: "max" });
});

test("catalog-backed enabled:false with no effort resolves to none and drops other keys", () => {
  const body: Record<string, unknown> = {
    model: "future-codex",
    reasoning: { enabled: false, max_tokens: 1 },
  };
  applyCodexReasoningSelection(
    "future-codex",
    body,
    {
      model: "future-codex",
      supportedThinkingEfforts: ["low", "max"],
      defaultThinkingEffort: "low",
    },
    "high",
    true
  );
  assert.deepEqual(body.reasoning, { effort: "none" });
});
