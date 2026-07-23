import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1649: strict OpenAI-compatible upstreams (e.g.
// mistral/codestral) reject client-only assistant "echo" fields on input with
// 422 extra_forbidden (the report hit `messages[].assistant.reasoning_content`).
// Only `reasoning_content` was stripped on the OpenAI target path; the sibling echo
// fields (reasoning / refusal / annotations / cache_control) leaked through.
const { translateRequest } = await import("../../open-sse/translator/index.ts");

test("#1649: assistant echo fields are stripped on the OpenAI target path", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        content: "answer",
        reasoning_content: "secret reasoning",
        reasoning: { effort: "low" },
        refusal: null,
        annotations: [],
        cache_control: { type: "ephemeral" },
        audio: { id: "audio_123" },
      },
    ],
  };

  const out = translateRequest(
    "openai",
    "openai",
    "mistral/codestral-latest",
    body,
    false,
    null,
    "mistral"
  ) as { messages: Record<string, unknown>[] };

  const asst = out.messages[1];
  assert.equal(asst.reasoning_content, undefined, "reasoning_content stripped");
  assert.equal(asst.reasoning, undefined, "reasoning stripped");
  assert.equal(asst.refusal, undefined, "refusal stripped");
  assert.equal(asst.annotations, undefined, "annotations stripped");
  assert.equal(asst.cache_control, undefined, "cache_control stripped");
  // `audio` is intentionally preserved: OpenAI audio models reference a prior
  // assistant audio response by id on multi-turn, and stripping it universally on
  // the OpenAI path would break that. Mistral never emits audio, so nothing is lost.
  assert.deepEqual(asst.audio, { id: "audio_123" }, "audio preserved");
  // The visible content is untouched.
  assert.equal(asst.content, "answer");
});
