import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";
import {
  getPromptCacheCreationTokens,
  getPromptCacheReadTokens,
} from "../../src/lib/usage/tokenAccounting.ts";

test("#13472: cache_creation tokens survive the chat-completions -> responses-api usage hop (first call, cache WRITE)", () => {
  const state: Record<string, unknown> = {};
  const chunkFromClaudeHop = {
    id: "chatcmpl-abc",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 5000,
      completion_tokens: 20,
      total_tokens: 5020,
      prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 4800 },
    },
  };
  openaiToOpenAIResponsesResponse(chunkFromClaudeHop, state);
  const responsesUsage = state.usage as Record<string, unknown>;
  const loggedCacheCreation = getPromptCacheCreationTokens(responsesUsage);
  assert.ok(
    loggedCacheCreation > 0,
    `expected cache_creation tokens (4800) to survive the responses-api usage hop, got ${loggedCacheCreation}. state.usage was: ${JSON.stringify(responsesUsage)}`
  );
});

test("#13472 (control): cache READ tokens DO survive the same hop (second call, cache HIT)", () => {
  const state: Record<string, unknown> = {};
  const chunkFromClaudeHop = {
    id: "chatcmpl-def",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 5000,
      completion_tokens: 20,
      total_tokens: 5020,
      prompt_tokens_details: { cached_tokens: 4800, cache_creation_tokens: 0 },
    },
  };
  openaiToOpenAIResponsesResponse(chunkFromClaudeHop, state);
  const responsesUsage = state.usage as Record<string, unknown>;
  const loggedCacheRead = getPromptCacheReadTokens(responsesUsage);
  assert.equal(
    loggedCacheRead,
    4800,
    `expected cache_read tokens to survive, got ${loggedCacheRead}`
  );
});

test("#13472 (mixed): cache READ and cache CREATION reported together are both preserved (no clobbering)", () => {
  const state: Record<string, unknown> = {};
  const chunkFromClaudeHop = {
    id: "chatcmpl-ghi",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 6000,
      completion_tokens: 20,
      total_tokens: 6020,
      prompt_tokens_details: { cached_tokens: 1200, cache_creation_tokens: 800 },
    },
  };
  openaiToOpenAIResponsesResponse(chunkFromClaudeHop, state);
  const responsesUsage = state.usage as Record<string, unknown>;
  assert.equal(
    getPromptCacheReadTokens(responsesUsage),
    1200,
    "cache_read should not be clobbered"
  );
  assert.equal(
    getPromptCacheCreationTokens(responsesUsage),
    800,
    "cache_creation should be preserved alongside cache_read"
  );
});
