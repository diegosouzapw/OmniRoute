import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeThinkingForModel,
  getModelSpec,
} from "../../src/shared/constants/modelSpecs.ts";

// Regression for #3554: a combo can substitute the upstream model AFTER the client
// already chose its `thinking` value. Claude Code sends `thinking:{type:"disabled"}` for
// internal title/name-generation calls. That value is valid for claude-opus-4-8 and
// claude-sonnet-4-6, but claude-fable-5 defaults to adaptive thinking and REJECTS
// `thinking.type:"disabled"` with an upstream 400. When the substituted target rejects
// `disabled`, OmniRoute must strip the now-invalid value instead of forwarding it.

test("#3554 claude-fable-5 is flagged as rejecting thinking.type:disabled", () => {
  assert.equal(getModelSpec("claude-fable-5")?.rejectsThinkingDisabled, true);
});

test("#3554 models that accept disabled are NOT flagged (opus-4-8, sonnet-4-6)", () => {
  assert.notEqual(getModelSpec("claude-opus-4-8")?.rejectsThinkingDisabled, true);
  assert.notEqual(getModelSpec("claude-sonnet-4-6")?.rejectsThinkingDisabled, true);
});

test("#3554 normalizeThinkingForModel strips thinking.type:disabled for fable-5", () => {
  const body = { model: "claude-opus-4-8", thinking: { type: "disabled" }, max_tokens: 64000 };
  const out = normalizeThinkingForModel(body, "claude-fable-5");
  assert.equal("thinking" in out, false, "thinking must be stripped for fable-5");
  assert.equal(out.max_tokens, 64000, "other fields untouched");
  assert.equal(out.model, "claude-opus-4-8", "model field untouched by this helper");
});

test("#3554 normalizeThinkingForModel preserves disabled for opus-4-8 and sonnet-4-6", () => {
  for (const m of ["claude-opus-4-8", "claude-sonnet-4-6"]) {
    const out = normalizeThinkingForModel({ model: m, thinking: { type: "disabled" } }, m);
    assert.deepEqual(out.thinking, { type: "disabled" }, `disabled preserved for ${m}`);
  }
});

test("#3554 normalizeThinkingForModel preserves enabled/adaptive thinking for fable-5", () => {
  const enabled = normalizeThinkingForModel(
    { thinking: { type: "enabled", budget_tokens: 4000 } },
    "claude-fable-5"
  );
  assert.deepEqual(enabled.thinking, { type: "enabled", budget_tokens: 4000 });
  const adaptive = normalizeThinkingForModel({ thinking: { type: "adaptive" } }, "claude-fable-5");
  assert.deepEqual(adaptive.thinking, { type: "adaptive" });
});

test("#3554 normalizeThinkingForModel is a no-op when there is no thinking field", () => {
  const body = { model: "claude-fable-5", messages: [] };
  const out = normalizeThinkingForModel(body, "claude-fable-5");
  assert.deepEqual(out, body);
});

test("#3554 normalizeThinkingForModel tolerates unknown models (no spec → preserve)", () => {
  const out = normalizeThinkingForModel(
    { thinking: { type: "disabled" } },
    "some-unknown-model-xyz"
  );
  assert.deepEqual(out.thinking, { type: "disabled" });
});
