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

test("lifecycle records are provider-scoped", () => {
  const decision = getModelLifecycleDecision("opencode-zen", "gpt-5.2-codex", CURRENT_DATE);

  assert.equal(decision.status, "untracked");
  assert.equal(decision.action, "allow");
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
    models.map((model) => model.id)
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
