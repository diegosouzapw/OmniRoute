import test from "node:test";
import assert from "node:assert/strict";

const { unwrapClineNonStreamingEnvelope } = await import(
  "../../open-sse/handlers/chatCore/clineResponseEnvelope.ts"
);

test("unwrapClineNonStreamingEnvelope extracts Cline wrapped chat completions", () => {
  const wrapped = {
    success: true,
    data: {
      id: "chatcmpl_cline",
      model: "cline/model",
      choices: [{ index: 0, message: { role: "assistant", content: "ok" } }],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
  };

  assert.deepEqual(unwrapClineNonStreamingEnvelope("cline", wrapped), wrapped.data);
});

test("unwrapClineNonStreamingEnvelope keeps non-Cline and malformed envelopes untouched", () => {
  const wrapped = { success: true, data: { message: "missing choices" } };

  assert.equal(unwrapClineNonStreamingEnvelope("openai", wrapped), wrapped);
  assert.equal(unwrapClineNonStreamingEnvelope("cline", wrapped), wrapped);
});
