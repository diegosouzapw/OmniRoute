/**
 * #6879 — per-model default `reasoning_effort` + `no-think/` expresses "none" on the
 * OpenAI path (instead of deleting the field).
 *
 * Ask 1: `ModelSpec.defaultReasoningEffort` is injected as `reasoning_effort` only
 * when the request carries no reasoning field of any shape (`reasoning_effort`,
 * `reasoning`, `thinking`); an explicit client value always wins.
 *
 * Ask 2: `applyNoThinkingAlias` sets `reasoning_effort:"none"` on the OpenAI path
 * (instead of deleting the field), so a thinks-by-default model actually stops
 * thinking rather than falling back to its provider default. The Claude/Messages
 * path is unchanged (`thinking:{type:"disabled"}`). Lanes known to reject
 * `reasoning_effort` still end up with the field removed via the existing
 * per-lane unsupported-param strip (open-sse/translator/paramSupport.ts) — same
 * end state as today's delete-only behavior, just correct on more lanes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { applyDefaultReasoningEffort } from "../../open-sse/services/defaultReasoningEffort.ts";
import { applyNoThinkingAlias } from "../../open-sse/utils/noThinkingAlias.ts";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";
import { MODEL_SPECS } from "../../src/shared/constants/modelSpecs.ts";

const FIXTURE_MODEL_ID = "__test_6879_default_reasoning_effort_model__";

test.before(() => {
  MODEL_SPECS[FIXTURE_MODEL_ID] = { defaultReasoningEffort: "none" };
});

test.after(() => {
  delete MODEL_SPECS[FIXTURE_MODEL_ID];
});

// ---------------------------------------------------------------------------
// Ask 1: applyDefaultReasoningEffort
// ---------------------------------------------------------------------------

test("applyDefaultReasoningEffort: injects the model's default when no reasoning field is present", () => {
  const body = { model: FIXTURE_MODEL_ID, messages: [] };
  const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID);
  assert.equal(result.reasoning_effort, "none");
});

test("applyDefaultReasoningEffort: an explicit reasoning_effort always wins over the model default", () => {
  const body = { model: FIXTURE_MODEL_ID, messages: [], reasoning_effort: "high" };
  const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID);
  assert.equal(result.reasoning_effort, "high");
});

test("applyDefaultReasoningEffort: an explicit reasoning object always wins (Responses shape)", () => {
  const body = { model: FIXTURE_MODEL_ID, messages: [], reasoning: { effort: "medium" } };
  const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID);
  assert.deepEqual(result.reasoning, { effort: "medium" });
  assert.equal("reasoning_effort" in result, false);
});

test("applyDefaultReasoningEffort: an explicit thinking block always wins (Claude legacy shape)", () => {
  const body = { model: FIXTURE_MODEL_ID, messages: [], thinking: { type: "enabled" } };
  const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID);
  assert.deepEqual(result.thinking, { type: "enabled" });
  assert.equal("reasoning_effort" in result, false);
});

test("applyDefaultReasoningEffort: no injection when the model has no configured default (regression)", () => {
  const body = { model: "gpt-5.4-sol", messages: [] };
  const result = applyDefaultReasoningEffort(body, "gpt-5.4-sol");
  assert.equal("reasoning_effort" in result, false);
  assert.equal(result, body); // same reference — no allocation when nothing to inject
});

// ---------------------------------------------------------------------------
// Ask 2: applyNoThinkingAlias on the OpenAI path expresses "none"
// ---------------------------------------------------------------------------

test("applyNoThinkingAlias: OpenAI path sets reasoning_effort:none instead of deleting the field", () => {
  const body: Record<string, unknown> = {
    model: "no-think/gemini/gemini-flash-lite-latest",
    messages: [],
  };
  const result = applyNoThinkingAlias(body, { claudeFormat: false });
  assert.equal(result.applied, true);
  assert.equal(result.realModel, "gemini/gemini-flash-lite-latest");
  assert.equal(body.model, "gemini/gemini-flash-lite-latest");
  assert.equal(body.reasoning_effort, "none");
  assert.equal("reasoning" in body, false);
});

test("applyNoThinkingAlias: OpenAI path overrides a client-supplied reasoning_effort with none (alias always wins)", () => {
  const body: Record<string, unknown> = {
    model: "no-think/gemini/gemini-flash-lite-latest",
    messages: [],
    reasoning_effort: "high",
  };
  const result = applyNoThinkingAlias(body, { claudeFormat: false });
  assert.equal(result.applied, true);
  assert.equal(body.reasoning_effort, "none");
});

test("applyNoThinkingAlias: Claude/Messages path is unchanged (thinking:disabled, no reasoning_effort field)", () => {
  const body: Record<string, unknown> = {
    model: "no-think/claude/claude-opus-4-6",
    messages: [],
    reasoning_effort: "high",
  };
  const result = applyNoThinkingAlias(body, { claudeFormat: true });
  assert.equal(result.applied, true);
  assert.deepEqual(body.thinking, { type: "disabled" });
  assert.equal("reasoning_effort" in body, false);
  assert.equal("reasoning" in body, false);
});

test("applyNoThinkingAlias: non-alias model is untouched (regression)", () => {
  const body: Record<string, unknown> = { model: "gemini/gemini-flash-lite-latest", messages: [] };
  const result = applyNoThinkingAlias(body, { claudeFormat: false });
  assert.equal(result.applied, false);
  assert.equal("reasoning_effort" in body, false);
});

// ---------------------------------------------------------------------------
// Ask 2, fallback: a lane that rejects reasoning_effort still ends up with the
// field removed, via the pre-existing per-lane unsupported-param strip — same
// end state as today's delete-only behavior, correct on more lanes.
// ---------------------------------------------------------------------------

test("a lane known to reject reasoning_effort still drops it downstream (delete-fallback preserved)", () => {
  const body: Record<string, unknown> = {
    model: "no-think/github/claude-3-5-sonnet",
    messages: [],
  };
  const alias = applyNoThinkingAlias(body, { claudeFormat: false });
  assert.equal(alias.applied, true);
  assert.equal(body.reasoning_effort, "none"); // set by the alias itself

  // github/claude (non-4.6) is a known-unsupported lane for both thinking and
  // reasoning_effort (paramSupport.ts STRIP_RULES) — the field ends up removed
  // before dispatch, exactly like the old delete-only behavior.
  const stripped = stripUnsupportedParams("github", "claude-3-5-sonnet", body);
  assert.equal("reasoning_effort" in stripped, false);
});

// ---------------------------------------------------------------------------
// #7631: the same-format /v1/responses lane (source === target === OPENAI_RESPONSES)
// skips translateRequest's hub-and-spoke translation block entirely, so a stray
// top-level `reasoning_effort` (set upstream by applyNoThinkingAlias on the OpenAI
// path, before model-format resolution knows the target lane is Responses-native)
// must still be promoted into the Responses-shaped `reasoning.effort`, or thinking
// suppression silently does not take effect on that lane.
// ---------------------------------------------------------------------------

test("7631: translateRequest promotes a stray top-level reasoning_effort into reasoning.effort on the same-format OPENAI_RESPONSES lane", async () => {
  const { translateRequest } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");

  const body: Record<string, unknown> = {
    model: "gpt-5.1-codex",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    reasoning_effort: "none",
  };

  const result = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    body
  );

  assert.equal("reasoning_effort" in result, false);
  assert.deepEqual(result.reasoning, { effort: "none" });
});

test("7631: same-format OPENAI_RESPONSES lane leaves an explicit reasoning object untouched (no double-promotion)", async () => {
  const { translateRequest } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");

  const body: Record<string, unknown> = {
    model: "gpt-5.1-codex",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    reasoning: { effort: "high", summary: "auto" },
  };

  const result = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    body
  );

  assert.deepEqual(result.reasoning, { effort: "high", summary: "auto" });
  assert.equal("reasoning_effort" in result, false);
});

test("7631: cross-format openai -> openai-responses promotion is unchanged (no regression)", async () => {
  const { translateRequest } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");

  const body: Record<string, unknown> = {
    model: "gpt-5.1-codex",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "none",
  };

  const result = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, "gpt-5.1-codex", body);

  assert.equal("reasoning_effort" in result, false);
  assert.deepEqual(result.reasoning, { effort: "none" });
});
