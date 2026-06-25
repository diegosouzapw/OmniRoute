import test from "node:test";
import assert from "node:assert/strict";

const {
  buildCodexResponseMetadata,
  buildResponsesInputMessages,
  extractResponsesOutputText,
  normalizeCodexResponsesModel,
} =
  await import("../../src/app/(dashboard)/dashboard/media-providers/components/llmChatResponsesMetadata.ts");

test("buildResponsesInputMessages maps chat history to Responses API message input", () => {
  assert.deepEqual(
    buildResponsesInputMessages([
      { role: "user", content: "oi" },
      { role: "assistant", content: "olá" },
      { role: "assistant", content: "   " },
    ]),
    [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "oi" }],
      },
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "olá" }],
      },
    ]
  );
});

test("extractResponsesOutputText supports output_text and nested output content", () => {
  assert.equal(extractResponsesOutputText({ output_text: "direto" }), "direto");
  assert.equal(
    extractResponsesOutputText({
      output: [
        {
          type: "message",
          content: [
            { type: "output_text", text: "parte 1" },
            { type: "text", text: "parte 2" },
          ],
        },
      ],
    }),
    "parte 1\nparte 2"
  );
});

test("buildCodexResponseMetadata merges OmniRoute headers with Responses API payload", () => {
  const metadata = buildCodexResponseMetadata({
    requestedModel: "cx/gpt-5.5",
    reasoningEffort: "high",
    fallbackLatencyMs: 999,
    headers: new Headers({
      "X-OmniRoute-Response-Cost": "0.0064950000",
      "X-OmniRoute-Latency-Ms": "4790",
      "X-OmniRoute-Tokens-In": "45",
      "X-OmniRoute-Tokens-Out": "209",
      "X-OmniRoute-Model": "codex/gpt-5.5",
    }),
    payload: {
      id: "resp_123",
      model: "gpt-5.5",
      usage: {
        input_tokens: 45,
        output_tokens: 209,
        output_tokens_details: { reasoning_tokens: 178 },
      },
    },
  });

  assert.equal(metadata.requestedModel, "gpt-5.5");
  assert.equal(metadata.resolvedModel, "gpt-5.5");
  assert.equal(metadata.reasoningEffort, "high");
  assert.equal(metadata.responseId, "resp_123");
  assert.equal(metadata.latencyMs, 4790);
  assert.equal(metadata.tokensIn, 45);
  assert.equal(metadata.tokensOut, 209);
  assert.equal(metadata.usage.cost_usd, 0.006495);
});

test("normalizeCodexResponsesModel removes codex provider aliases only", () => {
  assert.equal(normalizeCodexResponsesModel("cx/gpt-5.5-xhigh"), "gpt-5.5-xhigh");
  assert.equal(normalizeCodexResponsesModel("codex/gpt-5.4"), "gpt-5.4");
  assert.equal(normalizeCodexResponsesModel("openai/gpt-4.1"), "openai/gpt-4.1");
});
