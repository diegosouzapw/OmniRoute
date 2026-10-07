import test from "node:test";
import assert from "node:assert/strict";

const {
  MODEL_LIFECYCLE_RECORDS,
  filterSelectableModels,
  formatModelLifecycleMessage,
  getModelLifecycleDecision,
  isModelSelectable,
} = await import("../../open-sse/services/modelLifecycle.ts");

const CURRENT_DATE = new Date("2026-07-26T00:00:00.000Z");

test("shutdown OpenAI models are rejected with replacement guidance, not rewritten", () => {
  const decision = getModelLifecycleDecision("openai", "gpt-5.2-codex", CURRENT_DATE);

  assert.equal(decision.status, "shutdown");
  assert.equal(decision.action, "reject");
  assert.equal(decision.model, "gpt-5.2-codex");
  assert.deepEqual(decision.replacement, {
    provider: "openai",
    model: "gpt-5.6-sol",
  });
  assert.match(formatModelLifecycleMessage(decision) || "", /cannot be routed automatically/);
});

test("upcoming shutdowns warn before the shutdown date", () => {
  const decision = getModelLifecycleDecision("openai", "gpt-5.3-chat-latest", CURRENT_DATE);

  assert.equal(decision.status, "deprecated");
  assert.equal(decision.action, "warn");
  assert.equal(decision.shutdownAt, "2026-08-10");
});

test("dated OpenAI deprecations stay provider-scoped", () => {
  // gpt-3.5-turbo-0125 shuts down 2026-10-23; CURRENT_DATE is 2026-07-26.
  // Snapshot marks it retiring (not retired), so an aggregator still allows it.
  const openai = getModelLifecycleDecision("openai", "gpt-3.5-turbo-0125", CURRENT_DATE);
  const aggregator = getModelLifecycleDecision("opencode-zen", "gpt-3.5-turbo-0125", CURRENT_DATE);

  assert.equal(openai.status, "deprecated");
  assert.equal(openai.action, "warn");
  assert.equal(aggregator.status, "untracked");
  assert.equal(aggregator.action, "allow");
});

test("snapshot-retired ids are rejected on every provider (#11625)", () => {
  const decision = getModelLifecycleDecision("opencode-zen", "gpt-5.2-codex", CURRENT_DATE);

  assert.equal(decision.status, "shutdown");
  assert.equal(decision.action, "reject");
});

test("catalog filtering hides deprecated and shutdown models by default", () => {
  const models = [
    { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "gpt-5.2-codex", name: "GPT-5.2 Codex" },
    { id: "gpt-5.3-chat-latest", name: "GPT-5.3 Chat" },
  ];

  assert.deepEqual(
    filterSelectableModels("openai", models, { asOf: CURRENT_DATE }).map((model) => model.id),
    ["gpt-5.6-sol"]
  );
  assert.deepEqual(
    filterSelectableModels("opencode-zen", models, { asOf: CURRENT_DATE }).map((model) => model.id),
    ["gpt-5.6-sol"]
  );
});

test("selectability can include deprecated models without reviving shutdown models", () => {
  assert.equal(
    isModelSelectable("openai", "gpt-5.3-chat-latest", {
      asOf: CURRENT_DATE,
      includeDeprecated: true,
    }),
    true
  );
  assert.equal(
    isModelSelectable("openai", "gpt-5.2-codex", {
      asOf: CURRENT_DATE,
      includeDeprecated: true,
    }),
    false
  );
});

test("the conflicted gpt-4-1106-preview date is not guessed", () => {
  assert.equal(
    MODEL_LIFECYCLE_RECORDS.some((record) => record.model === "gpt-4-1106-preview"),
    false
  );
});
