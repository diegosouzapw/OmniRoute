import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

// CJS mirror consumed by the standalone proxy process (server.cjs — cannot import the
// ESM/TS `src/mitm/aliasConfig.ts`). Ported from upstream decolua/9router#2584 ("add
// Antigravity reasoning effort overrides"). Keep assertions aligned with
// `tests/unit/mitm-antigravity-reasoning-effort-override.test.ts` (the TS counterpart).
const require = createRequire(import.meta.url);
const {
  normalizeReasoningEffort,
  normalizeAliasEntry,
  normalizeAliasMappings,
  applyAntigravityOverride,
} = require("../../src/mitm/_internal/aliasConfig.cjs");

test("normalizeReasoningEffort canonicalizes case and the max/extra UI synonyms", () => {
  assert.equal(normalizeReasoningEffort(" HIGH "), "high");
  assert.equal(normalizeReasoningEffort("max"), "xhigh");
  assert.equal(normalizeReasoningEffort("extra"), "xhigh");
  assert.equal(normalizeReasoningEffort("extreme"), undefined);
  assert.equal(normalizeReasoningEffort(42), undefined);
});

test("normalizeAliasEntry upgrades a legacy string mapping", () => {
  assert.deepEqual(normalizeAliasEntry("provider/model-id"), { model: "provider/model-id" });
  assert.equal(normalizeAliasEntry(""), null);
});

test("normalizeAliasMappings resolves the stored SQLite row shape used by getMappedOverride", () => {
  const stored = {
    "gemini-3-flash-agent": "cx/gpt-5.6-sol",
    "gemini-3-pro-agent": { model: "cx/gpt-5.6-sol", reasoningEffort: "high" },
    "gemini-3-flash-thinking-agent": { reasoningEffort: "none" },
  };
  const normalized = normalizeAliasMappings(stored);
  assert.deepEqual(normalized["gemini-3-flash-agent"], { model: "cx/gpt-5.6-sol" });
  assert.deepEqual(normalized["gemini-3-pro-agent"], {
    model: "cx/gpt-5.6-sol",
    reasoningEffort: "high",
  });
  assert.deepEqual(normalized["gemini-3-flash-thinking-agent"], { reasoningEffort: "none" });
});

test("applyAntigravityOverride swaps model and sets the top-level reasoningEffortOverride", () => {
  const body = { model: "gemini-3-flash-agent", request: { contents: [] } };
  const result = applyAntigravityOverride(body, { model: "cx/gpt-5.6-sol", reasoningEffort: "high" });
  assert.equal(result.model, "cx/gpt-5.6-sol");
  assert.equal(result.reasoningEffortOverride, "high");
  // Original body is untouched (server.cjs still needs it for logging/capture).
  assert.equal(body.model, "gemini-3-flash-agent");
  assert.equal("reasoningEffortOverride" in body, false);
});

test("applyAntigravityOverride applies a reasoning-only override without touching model", () => {
  const body = { model: "gemini-3-flash-agent", request: { contents: [] } };
  const result = applyAntigravityOverride(body, { reasoningEffort: "none" });
  assert.equal(result.model, "gemini-3-flash-agent");
  assert.equal(result.reasoningEffortOverride, "none");
});

test("applyAntigravityOverride is a no-op pass-through when override carries neither field", () => {
  const body = { model: "gemini-3-flash-agent" };
  const result = applyAntigravityOverride(body, {});
  assert.deepEqual(result, body);
});
