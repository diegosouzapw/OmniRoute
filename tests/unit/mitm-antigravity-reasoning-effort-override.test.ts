import test from "node:test";
import assert from "node:assert/strict";

// Ported from upstream decolua/9router#2584 ("add Antigravity reasoning effort
// overrides"), adapted to OmniRoute's alias storage shape and canonical reasoning-effort
// vocabulary (`@/shared/reasoning/effortStandardization.ts`).
const { normalizeAliasEntry, normalizeAliasMappings, hasInvalidReasoningEffort } = await import(
  "../../src/mitm/aliasConfig.ts"
);
const { antigravityToOpenAIRequest } = await import(
  "../../open-sse/translator/request/antigravity-to-openai.ts"
);

test("normalizeAliasEntry upgrades a legacy plain-string mapping to { model }", () => {
  assert.deepEqual(normalizeAliasEntry(" cx/gpt-5.6-sol "), { model: "cx/gpt-5.6-sol" });
});

test("normalizeAliasEntry drops an empty legacy string", () => {
  assert.equal(normalizeAliasEntry("   "), null);
});

test("normalizeAliasEntry keeps a reasoning-only override and canonicalizes its casing", () => {
  assert.deepEqual(normalizeAliasEntry({ reasoningEffort: " HIGH " }), {
    reasoningEffort: "high",
  });
});

test("normalizeAliasEntry maps the max/extra UI synonyms onto canonical xhigh", () => {
  assert.deepEqual(normalizeAliasEntry({ model: "p/m", reasoningEffort: "max" }), {
    model: "p/m",
    reasoningEffort: "xhigh",
  });
});

test("normalizeAliasEntry drops an unrecognized reasoning effort while keeping the model", () => {
  assert.deepEqual(normalizeAliasEntry({ model: "p/m", reasoningEffort: "extreme" }), {
    model: "p/m",
  });
});

test("normalizeAliasEntry returns null for an entry with neither model nor reasoning effort", () => {
  assert.equal(normalizeAliasEntry({ reasoningEffort: "" }), null);
  assert.equal(normalizeAliasEntry({}), null);
  assert.equal(normalizeAliasEntry(null), null);
  assert.equal(normalizeAliasEntry(42), null);
});

test("normalizeAliasMappings upgrades a whole legacy record without a migration", () => {
  assert.deepEqual(
    normalizeAliasMappings({
      "gemini-3-flash-agent": "provider/model-id",
      "gemini-3-pro-agent": { reasoningEffort: "low" },
      empty: "",
    }),
    {
      "gemini-3-flash-agent": { model: "provider/model-id" },
      "gemini-3-pro-agent": { reasoningEffort: "low" },
    }
  );
});

test("normalizeAliasMappings tolerates malformed input", () => {
  assert.deepEqual(normalizeAliasMappings(null), {});
  assert.deepEqual(normalizeAliasMappings([1, 2, 3]), {});
});

test("hasInvalidReasoningEffort flags an unrecognized tier and accepts canonical ones", () => {
  assert.equal(
    hasInvalidReasoningEffort({ flash: { model: "p/m", reasoningEffort: "extreme" } }),
    true
  );
  assert.equal(
    hasInvalidReasoningEffort({ flash: { model: "p/m", reasoningEffort: "xhigh" } }),
    false
  );
  assert.equal(hasInvalidReasoningEffort({ flash: "provider/model-id" }), false);
  assert.equal(hasInvalidReasoningEffort({ flash: { model: "p/m" } }), false);
});

// -- Override-resolution: model + requested effort -> effective reasoning_effort ---------

test("antigravity->openai: an explicit reasoningEffortOverride wins over the request's own thinkingConfig", () => {
  const result = antigravityToOpenAIRequest(
    "cx/gpt-5.6-sol",
    {
      model: "gemini-3-flash-agent",
      reasoningEffortOverride: "high",
      request: {
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        generationConfig: { thinkingConfig: { thinkingBudget: 512 } },
      },
    },
    false
  );

  // thinkingBudget 512 alone would derive "low" (see the budget-tier test below) — the
  // override must take priority end-to-end.
  assert.equal(result.reasoning_effort, "high");
});

test("antigravity->openai: an explicit 'none' override suppresses reasoning_effort even under a thinking request", () => {
  const result = antigravityToOpenAIRequest(
    "cx/gpt-5.6-sol",
    {
      reasoningEffortOverride: "none",
      request: {
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
        generationConfig: { thinkingConfig: { thinkingBudget: 32000 } },
      },
    },
    false
  );

  assert.equal("reasoning_effort" in result, false);
});

test("antigravity->openai: reasoning-only override applies without a model override present", () => {
  const result = antigravityToOpenAIRequest(
    "gemini-3-flash-agent",
    {
      reasoningEffortOverride: "medium",
      request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
    },
    false
  );

  assert.equal(result.model, "gemini-3-flash-agent");
  assert.equal(result.reasoning_effort, "medium");
});

test("antigravity->openai: no override falls back to the pre-existing thinkingConfig-derived tiers", () => {
  const low = antigravityToOpenAIRequest(
    "gpt-4o",
    { request: { generationConfig: { thinkingConfig: { thinkingBudget: 512 } } } },
    false
  );
  const medium = antigravityToOpenAIRequest(
    "gpt-4o",
    { request: { generationConfig: { thinkingConfig: { thinkingBudget: 3000 } } } },
    false
  );
  const high = antigravityToOpenAIRequest(
    "gpt-4o",
    { request: { generationConfig: { thinkingConfig: { thinkingBudget: 32000 } } } },
    false
  );

  assert.equal(low.reasoning_effort, "low");
  assert.equal(medium.reasoning_effort, "medium");
  assert.equal(high.reasoning_effort, "high");
});

test("antigravity->openai: an unrecognized override value is ignored (falls back to derived behavior)", () => {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    {
      reasoningEffortOverride: "extreme",
      request: { generationConfig: { thinkingConfig: { thinkingBudget: 512 } } },
    },
    false
  );

  assert.equal(result.reasoning_effort, "low");
});
