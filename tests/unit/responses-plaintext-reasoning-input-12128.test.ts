import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { resolveReasoningTransport, applyReasoningInputPolicy } = await import(
  "../../open-sse/services/reasoningInputPolicy.ts"
);
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("#12128: resolveReasoningTransport identifies openai-compatible-responses and custom responses variants as opaque transport", () => {
  assert.equal(resolveReasoningTransport("openai-compatible-responses-codex"), "opaque");
  assert.equal(resolveReasoningTransport("custom-openai-responses"), "opaque");
  assert.equal(resolveReasoningTransport("codex-proxy"), "opaque");
  assert.equal(resolveReasoningTransport("openai"), "opaque");
  assert.equal(resolveReasoningTransport("codex"), "opaque");
});

test("#12128: translateRequest to Responses target strips plaintext reasoning.content for opaque responses providers", () => {
  const chatBody = {
    model: "gpt-5.6-codex",
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: "Hi there!",
        reasoning_content: "Let me think about how to greet the user properly.",
      },
      { role: "user", content: "what is 2+2?" },
    ],
  };

  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.6-codex",
    chatBody,
    false,
    null,
    "openai-compatible-responses-codex"
  ) as Record<string, unknown>;

  assert.ok(Array.isArray(translated.input), "translated.input must be an array");

  const input = translated.input as Record<string, unknown>[];
  const reasoningItems = input.filter((item) => item.type === "reasoning");

  // For opaque responses targets without encrypted continuation, orphaned plaintext reasoning items
  // must either be stripped entirely or have content.length === 0, so strict Codex backends do not 400.
  for (const r of reasoningItems) {
    assert.ok(
      !r.content || (Array.isArray(r.content) && r.content.length === 0),
      "reasoning item must not carry non-empty content array to strict responses endpoints"
    );
  }
});

test("#12128: applyReasoningInputPolicy directly sanitizes replayed plaintext reasoning for openai-compatible-responses", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "step 1 plan" }],
        summary: [],
      },
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Done" }],
      },
    ],
  };

  applyReasoningInputPolicy(body, "responses", {
    provider: "openai-compatible-responses-vllm",
    onIncompatibleReasoning: "drop",
  });

  const input = body.input as Record<string, unknown>[];
  const reasoningItems = input.filter((item) => item.type === "reasoning");

  for (const r of reasoningItems) {
    assert.equal(
      r.content,
      undefined,
      "plaintext reasoning content must be dropped for opaque responses providers"
    );
  }
});
