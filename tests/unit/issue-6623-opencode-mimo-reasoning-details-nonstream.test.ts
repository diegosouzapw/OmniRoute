import test from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";
import { isEmptyContentResponse } from "../../open-sse/services/errorClassifier.ts";

const mimoOpenRouterStyleResponse = {
  id: "gen-1783636289-lJcRXwMde7qjgDJfHiBC",
  object: "chat.completion",
  created: 1783636289,
  model: "mimo-v2.5-free",
  choices: [
    {
      index: 0,
      finish_reason: "length",
      logprobs: null,
      message: {
        role: "assistant",
        content: null,
        refusal: null,
        reasoning: "Hmm, the user just said hi",
        reasoning_details: [
          { type: "reasoning.text", text: "Hmm, the user just said hi", format: "unknown", index: 0 },
        ],
      },
    },
  ],
  usage: { prompt_tokens: 248, completion_tokens: 10, total_tokens: 258 },
};

test("#6623 raw responseBody is not flagged empty by isEmptyContentResponse", () => {
  assert.equal(isEmptyContentResponse(mimoOpenRouterStyleResponse), false);
});

test("#6623 /v1/messages non-stream translation of an OpenRouter reasoning-only turn is flagged malformed (502) - RED", () => {
  const translated = translateNonStreamingResponse(mimoOpenRouterStyleResponse, "openai", "claude", null);
  const malformedReason = detectMalformedNonStream(translated);
  assert.equal(malformedReason, null);
});

test("#6623 /v1/chat/completions (openai->openai, no translation) is unaffected", () => {
  const passthrough = translateNonStreamingResponse(mimoOpenRouterStyleResponse, "openai", "openai", null);
  assert.equal(passthrough, mimoOpenRouterStyleResponse);
});
