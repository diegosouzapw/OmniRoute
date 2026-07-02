/**
 * Reasoning-effort mapping across the OpenAI Chat <-> Responses request translators.
 *
 * Chat Completions carries the reasoning hint as top-level `reasoning_effort`; the
 * Responses API nests it as `reasoning.effort`. These tests pin both directions so
 * the hint survives when a request crosses formats (e.g. a Responses client routed
 * to an OpenAI-native Chat Completions upstream).
 *
 * Ported from upstream PR https://github.com/decolua/9router/pull/1817 (ryanngit).
 * Adapted: OmniRoute previously promoted `reasoning.effort` only behind the
 * Copilot-client gate (commit 75d9a83c25), which silently dropped the field for
 * every other Responses client (OpenCode, Cursor, raw OpenAI Responses, ...).
 * This test pins the unconditional promotion of effort while keeping the
 * Copilot-only `summary` -> Claude thinking marker behind its existing gate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  openaiToOpenAIResponsesRequest,
  openaiResponsesToOpenAIRequest,
} from "../../open-sse/translator/request/openai-responses.ts";
import { convertResponsesApiFormat } from "../../open-sse/translator/helpers/responsesApiHelper.ts";

function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>;
}

test("Responses -> Chat promotes reasoning.effort for non-Copilot clients", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "gpt-test",
      { input: "hello", reasoning: { effort: "high" } },
      true,
      {} // no _copilotClient marker
    )
  );
  assert.equal(out.reasoning_effort, "high");
  assert.equal(out.reasoning, undefined);
});

test("Responses -> Chat preserves reasoning.effort via the helper wrapper", () => {
  const out = asRecord(
    convertResponsesApiFormat({ input: "hello", reasoning: { effort: "medium" } })
  );
  assert.equal(out.reasoning_effort, "medium");
  assert.equal(out.reasoning, undefined);
});

test("Responses -> Chat does not overwrite an explicit reasoning_effort", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "gpt-test",
      { input: "hello", reasoning_effort: "low", reasoning: { effort: "high" } },
      true,
      {}
    )
  );
  // Explicit Chat-level field wins over the Responses nesting.
  assert.equal(out.reasoning_effort, "low");
});

test("Chat -> Responses already wraps reasoning_effort into reasoning.effort", () => {
  const out = asRecord(
    openaiToOpenAIResponsesRequest(
      "gpt-test",
      { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      true,
      {}
    )
  );
  assert.deepEqual(out.reasoning, { effort: "high" });
});
