/**
 * Verbosity mapping across the OpenAI Chat <-> Responses request translators.
 *
 * Chat Completions carries GPT-5 verbosity as top-level `verbosity`; the Responses API
 * nests it as `text.verbosity`. These tests pin both directions so the hint is not lost
 * when a request crosses formats (e.g. a Chat client routed to a Responses backend).
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  openaiToOpenAIResponsesRequest,
  openaiResponsesToOpenAIRequest,
} from "../../open-sse/translator/request/openai-responses.ts";

function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>;
}

test("Chat -> Responses maps verbosity to text.verbosity", () => {
  const out = asRecord(
    openaiToOpenAIResponsesRequest(
      "gpt-5.5",
      { model: "gpt-5.5", messages: [{ role: "user", content: "hi" }], verbosity: "low" },
      true,
      {}
    )
  );
  assert.deepEqual(out.text, { verbosity: "low" });
  assert.equal(out.verbosity, undefined);
});

test("Chat -> Responses ignores an invalid verbosity value", () => {
  const out = asRecord(
    openaiToOpenAIResponsesRequest(
      "gpt-5.5",
      { model: "gpt-5.5", messages: [{ role: "user", content: "hi" }], verbosity: "loud" },
      true,
      {}
    )
  );
  assert.equal(out.text, undefined);
});

test("Responses -> Chat maps text.verbosity to top-level verbosity and drops text", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      { model: "gpt-5.5", input: [{ role: "user", content: "hi" }], text: { verbosity: "high" } },
      false,
      {}
    )
  );
  assert.equal(out.verbosity, "high");
  assert.equal(out.text, undefined);
});

test("Responses -> Chat drops a stray non-verbosity text wrapper", () => {
  const out = asRecord(
    openaiResponsesToOpenAIRequest(
      "gpt-5.5",
      { model: "gpt-5.5", input: [{ role: "user", content: "hi" }], text: { format: { type: "json" } } },
      false,
      {}
    )
  );
  assert.equal(out.text, undefined);
  assert.equal(out.verbosity, undefined);
});
