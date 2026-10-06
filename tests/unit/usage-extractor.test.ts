import test from "node:test";
import assert from "node:assert/strict";

const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { extractUsage, normalizeUsage } = await import("../../open-sse/utils/usageTracking.ts");
const { parseSSEToClaudeResponse } = await import("../../open-sse/handlers/sseParser.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const {
  getLoggedInputTokens,
  getPromptCacheReadTokens,
  getPromptCacheCreationTokens,
  getPromptCacheReadTokensOrNull,
  getPromptCacheCreationTokensOrNull,
} = await import("../../src/lib/usage/tokenAccounting.ts");
const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");

test("normalizeUsage keeps finite nested cache-read fields for stream cost calculation", () => {
  assert.deepEqual(
    normalizeUsage({
      input_tokens: "12",
      output_tokens: 3,
      total_tokens: Number.POSITIVE_INFINITY,
      input_tokens_details: { cached_tokens: 2 },
    }),
    { input_tokens: 12, output_tokens: 3, cached_tokens: 2 }
  );
});

test("extractUsageFromResponse reads OpenAI chat completion usage", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        prompt_tokens_details: { cached_tokens: 3 },
        completion_tokens_details: { reasoning_tokens: 2 },
      },
    },
    "openai"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 12,
    completion_tokens: 8,
    cached_tokens: 3,
    reasoning_tokens: 2,
  });
});

test("extractUsageFromResponse reads OpenAI usage when cache/reasoning live under input/output token details", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        input_tokens_details: { cached_tokens: 4 },
        output_tokens_details: { reasoning_tokens: 1 },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 12,
    completion_tokens: 8,
    cached_tokens: 4,
    reasoning_tokens: 1,
  });
});

test("extractUsageFromResponse defaults missing OpenAI token fields to zero", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 0,
      },
    },
    "openai"
  );

  assert.equal(usage.prompt_tokens, 0);
  assert.equal(usage.completion_tokens, 0);
  assert.equal(usage.cached_tokens, undefined);
  assert.equal(usage.reasoning_tokens, undefined);
});

test("extractUsageFromResponse reads Responses API usage from the top-level usage field", () => {
  const usage = extractUsageFromResponse(
    {
      object: "response",
      usage: {
        input_tokens: 20,
        output_tokens: 9,
        cache_read_input_tokens: 4,
        cache_creation_input_tokens: 5,
        reasoning_tokens: 3,
      },
    },
    "github"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 20,
    completion_tokens: 9,
    cache_read_input_tokens: 4,
    cached_tokens: 4,
    cache_creation_input_tokens: 5,
    reasoning_tokens: 3,
  });
});

test("extractUsageFromResponse reads Responses API usage from nested response.usage", () => {
  const usage = extractUsageFromResponse(
    {
      response: {
        usage: {
          input_tokens: 14,
          output_tokens: 6,
          input_tokens_details: { cached_tokens: 2 },
          output_tokens_details: { reasoning_tokens: 1 },
        },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 14,
    completion_tokens: 6,
    cache_read_input_tokens: undefined,
    cached_tokens: 2,
    cache_creation_input_tokens: undefined,
    reasoning_tokens: 1,
  });
});

test("extractUsageFromResponse reads Responses API usage with prompt_tokens_details (OpenAI hybrid format)", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 30,
        output_tokens: 12,
        prompt_tokens_details: { cached_tokens: 10 },
        completion_tokens_details: { reasoning_tokens: 5 },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 30,
    completion_tokens: 12,
    cache_read_input_tokens: undefined,
    cached_tokens: 10,
    cache_creation_input_tokens: undefined,
    reasoning_tokens: 5,
  });
});

test("extractUsageFromResponse reads Responses API cache_read_input_tokens as cached_tokens fallback", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 50,
        output_tokens: 20,
        cache_read_input_tokens: 15,
        cache_creation_input_tokens: 8,
        reasoning_tokens: 3,
      },
    },
    "github"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 50,
    completion_tokens: 20,
    cache_read_input_tokens: 15,
    cached_tokens: 15,
    cache_creation_input_tokens: 8,
    reasoning_tokens: 3,
  });
});

test("extractUsageFromResponse totals Claude prompt tokens with cache read and cache creation", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        cache_read_input_tokens: 4,
        cache_creation_input_tokens: 6,
      },
    },
    "claude"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 20,
    completion_tokens: 7,
    cache_read_input_tokens: 4,
    cache_creation_input_tokens: 6,
  });
});

for (const provider of ["vertex", "vertex-partner"]) {
  test(`extractUsageFromResponse totals Claude cache tokens for ${provider}`, () => {
    const usage = extractUsageFromResponse(
      {
        usage: {
          input_tokens: 10,
          output_tokens: 7,
          cache_read_input_tokens: 4_000,
          cache_creation_input_tokens: 1_000,
        },
      },
      provider
    );

    assert.deepEqual(usage, {
      prompt_tokens: 5_010,
      completion_tokens: 7,
      cache_read_input_tokens: 4_000,
      cache_creation_input_tokens: 1_000,
    });
  });
}

test("extractUsageFromResponse surfaces Claude thinking tokens without inflating completion", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 22,
        output_tokens: 267,
        output_tokens_details: { thinking_tokens: 85 },
      },
    },
    "claude"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 22,
    completion_tokens: 267,
    cache_read_input_tokens: 0,
    cache_creation_input_tokens: 0,
    reasoning_tokens: 85,
  });
});

test("extractUsageFromResponse reads Gemini usageMetadata and thinking tokens", () => {
  const usage = extractUsageFromResponse(
    {
      usageMetadata: {
        promptTokenCount: 11,
        candidatesTokenCount: 5,
        thoughtsTokenCount: 2,
      },
    },
    "gemini"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 11,
    completion_tokens: 7,
    cached_tokens: 0,
    reasoning_tokens: 2,
  });
});

test("extractUsageFromResponse reads Gemini usageMetadata from the antigravity response envelope", () => {
  // Antigravity / gemini-cli wrap non-streaming payloads in { response: {...} }
  // (port of decolua/9router#59d858b — previously logged zero usage).
  const usage = extractUsageFromResponse(
    {
      response: {
        usageMetadata: {
          promptTokenCount: 42,
          candidatesTokenCount: 13,
          thoughtsTokenCount: 4,
          cachedContentTokenCount: 7,
        },
      },
    },
    "antigravity"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 42,
    completion_tokens: 17,
    cached_tokens: 7,
    reasoning_tokens: 4,
  });
});

test("extractUsageFromResponse prefers top-level usageMetadata over the envelope", () => {
  const usage = extractUsageFromResponse(
    {
      usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 2 },
      response: { usageMetadata: { promptTokenCount: 99, candidatesTokenCount: 99 } },
    },
    "gemini"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 1,
    completion_tokens: 2,
    cached_tokens: 0,
    reasoning_tokens: 0,
  });
});

test("extractUsageFromResponse surfaces Gemini cachedContentTokenCount as cached_tokens", () => {
  // Review follow-up on #10430: match the OpenAI/Claude/Responses branches and
  // the streaming path (usageTracking.ts) by surfacing Gemini cache-hit tokens.
  const usage = extractUsageFromResponse(
    {
      usageMetadata: {
        promptTokenCount: 30,
        candidatesTokenCount: 10,
        thoughtsTokenCount: 3,
        cachedContentTokenCount: 12,
      },
    },
    "gemini"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 30,
    completion_tokens: 13,
    cached_tokens: 12,
    reasoning_tokens: 3,
  });
});

test("extractUsageFromResponse returns null when usage is missing", () => {
  const usage = extractUsageFromResponse(
    {
      id: "chatcmpl_no_usage",
      choices: [{ message: { role: "assistant", content: "ok" } }],
    },
    "openai"
  );

  assert.equal(usage, null);
});

test("extractUsageFromResponse returns null for null and undefined response bodies", () => {
  assert.equal(extractUsageFromResponse(null, "openai"), null);
  assert.equal(extractUsageFromResponse(undefined, "openai"), null);
});

test("extractUsageFromResponse returns null for non-object response bodies", () => {
  assert.equal(extractUsageFromResponse("not-an-object", "openai"), null);
  assert.equal(extractUsageFromResponse(42, "openai"), null);
});

// ── extractUsage (streaming) tests ──

test("extractUsage reads response.completed with prompt_tokens_details.cached_tokens", () => {
  const usage = extractUsage({
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 100,
        output_tokens: 50,
        prompt_tokens_details: { cached_tokens: 30 },
        completion_tokens_details: { reasoning_tokens: 10 },
      },
    },
  });

  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.completion_tokens, 50);
  assert.equal(usage.cached_tokens, 30);
  assert.equal(usage.reasoning_tokens, 10);
});

test("extractUsage surfaces Claude message_delta thinking tokens", () => {
  const usage = extractUsage({
    type: "message_delta",
    usage: {
      input_tokens: 22,
      output_tokens: 267,
      output_tokens_details: { thinking_tokens: 85 },
    },
  });

  assert.equal(usage.reasoning_tokens, 85);
  assert.equal(usage.completion_tokens, 267);
});

test("extractUsage reads response.done with input_tokens_details and output_tokens_details", () => {
  const usage = extractUsage({
    type: "response.done",
    response: {
      usage: {
        input_tokens: 80,
        output_tokens: 40,
        input_tokens_details: { cached_tokens: 20 },
        output_tokens_details: { reasoning_tokens: 8 },
      },
    },
  });

  assert.equal(usage.cached_tokens, 20);
  assert.equal(usage.reasoning_tokens, 8);
});

test("extractUsage reads response.completed with cache_read_input_tokens", () => {
  const usage = extractUsage({
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 60,
        output_tokens: 25,
        cache_read_input_tokens: 15,
        cache_creation_input_tokens: 5,
        reasoning_tokens: 3,
      },
    },
  });

  assert.equal(usage.cached_tokens, 15);
  assert.equal(usage.cache_creation_input_tokens, 5);
  assert.equal(usage.reasoning_tokens, 3);
});

test("extractUsage reads OpenAI streaming chunk with prompt_tokens_details", () => {
  const usage = extractUsage({
    choices: [{ delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 200,
      completion_tokens: 100,
      prompt_tokens_details: { cached_tokens: 50 },
      completion_tokens_details: { reasoning_tokens: 20 },
    },
  });

  assert.equal(usage.cached_tokens, 50);
  assert.equal(usage.reasoning_tokens, 20);
});

// ── Flat field extraction tests (Xiaomi MiMo-style providers) ──

test("extractUsageFromResponse reads flat cached_tokens and reasoning_tokens from OpenAI-compatible usage", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 258,
        completion_tokens: 50,
        total_tokens: 308,
        cached_tokens: 192,
        reasoning_tokens: 49,
      },
    },
    "xiaomi-mimo"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 258,
    completion_tokens: 50,
    cached_tokens: 192,
    reasoning_tokens: 49,
  });
});

test("extractUsage reads flat cached_tokens and reasoning_tokens from streaming chunk", () => {
  const usage = extractUsage({
    choices: [{ delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 258,
      completion_tokens: 50,
      total_tokens: 308,
      cached_tokens: 192,
      reasoning_tokens: 49,
    },
  });

  assert.equal(usage.cached_tokens, 192);
  assert.equal(usage.reasoning_tokens, 49);
});

// ── Ollama raw NDJSON streaming usage ──
// Ollama sends a final NDJSON line { done: true, prompt_eval_count, eval_count }
// (raw from the provider, before any OpenAI translation). Without a dedicated
// branch, extractUsage returns null and Ollama streaming usage is dropped.

test("extractUsage reads Ollama raw NDJSON final chunk (done + prompt_eval_count/eval_count)", () => {
  const usage = extractUsage({
    model: "llama3.1",
    done: true,
    prompt_eval_count: 26,
    eval_count: 298,
  });

  assert.ok(usage, "expected usage to be extracted from the Ollama final chunk");
  assert.equal(usage.prompt_tokens, 26);
  assert.equal(usage.completion_tokens, 298);
  assert.equal(usage.total_tokens, 324);
});

test("extractUsage defaults missing Ollama eval counts to zero", () => {
  const usage = extractUsage({
    model: "llama3.1",
    done: true,
    prompt_eval_count: 12,
  });

  assert.ok(usage, "expected usage to be extracted even with only prompt_eval_count");
  assert.equal(usage.prompt_tokens, 12);
  assert.equal(usage.completion_tokens, 0);
  assert.equal(usage.total_tokens, 12);
});

test("extractUsage ignores non-final Ollama NDJSON chunks (done=false)", () => {
  const usage = extractUsage({
    model: "llama3.1",
    done: false,
    response: "partial",
  });

  assert.equal(usage, null);
});

// ── Antigravity (Gemini) streaming usageMetadata tests ──

test("extractUsage reads top-level Gemini usageMetadata from a streaming chunk", () => {
  const usage = extractUsage({
    usageMetadata: {
      promptTokenCount: 120,
      candidatesTokenCount: 60,
      totalTokenCount: 180,
      cachedContentTokenCount: 30,
      thoughtsTokenCount: 12,
    },
  });

  assert.equal(usage.prompt_tokens, 120);
  assert.equal(usage.completion_tokens, 72);
  assert.equal(usage.total_tokens, 180);
  assert.equal(usage.cached_tokens, 30);
  assert.equal(usage.reasoning_tokens, 12);
});

test("extractUsage reads Antigravity usageMetadata wrapped inside a response envelope", () => {
  // Antigravity (AG MITM) shapes usage as { response: { usageMetadata: {...} } }.
  // Without the response.usageMetadata fallback, token usage is silently dropped.
  const usage = extractUsage({
    response: {
      usageMetadata: {
        promptTokenCount: 200,
        candidatesTokenCount: 75,
        totalTokenCount: 275,
        cachedContentTokenCount: 40,
        thoughtsTokenCount: 18,
      },
    },
  });

  assert.notEqual(usage, null);
  assert.equal(usage.prompt_tokens, 200);
  assert.equal(usage.completion_tokens, 93);
  assert.equal(usage.total_tokens, 275);
  assert.equal(usage.cached_tokens, 40);
  assert.equal(usage.reasoning_tokens, 18);
});

// ── Anthropic-shaped usage is recognised by shape, not by provider id ──
// Anthropic `input_tokens` EXCLUDES prompt-cache reads and writes, while the stored
// `prompt_tokens` convention INCLUDES them (costCalculator subtracts both caches to get
// the fresh input). Every Claude-format provider must therefore store
// input + cache_read + cache_creation, not only the ids `claude`/`anthropic`/`vertex*`.

// One request: 100 fresh input tokens, 9 000 cache reads, 900 cache writes, 50 output.
const ANTHROPIC_USAGE = {
  input_tokens: 100,
  output_tokens: 50,
  cache_read_input_tokens: 9_000,
  cache_creation_input_tokens: 900,
};
const TOTAL_PROMPT_TOKENS = 10_000;

function anthropicMessageBody(usage: Record<string, unknown> = ANTHROPIC_USAGE) {
  return {
    id: "msg_shape",
    type: "message",
    role: "assistant",
    model: "any-model",
    content: [{ type: "text", text: "ok" }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { ...usage },
  };
}

// The rule keys on the body shape, not on a provider list, so one non-native id stands
// for every Claude-format provider (kimi-coding, deepseek, zai, github /v1/messages, ...).
test("extractUsageFromResponse totals Anthropic cache tokens for a non-native provider id", () => {
  const usage = extractUsageFromResponse(anthropicMessageBody(), "kimi-coding");

  assert.deepEqual(usage, {
    prompt_tokens: TOTAL_PROMPT_TOKENS,
    completion_tokens: 50,
    cache_read_input_tokens: 9_000,
    cache_creation_input_tokens: 900,
  });
  assert.equal(getLoggedInputTokens(usage), TOTAL_PROMPT_TOKENS);
});

test("Anthropic-shaped non-streaming usage matches the native claude id and the streaming path", () => {
  const native = extractUsageFromResponse(anthropicMessageBody(), "claude");
  const shaped = extractUsageFromResponse(anthropicMessageBody(), "kimi-coding");
  const streamed = extractUsage({
    type: "message_start",
    message: { usage: { ...ANTHROPIC_USAGE, output_tokens: 0 } },
  });

  assert.deepEqual(shaped, native);
  assert.equal(getLoggedInputTokens(shaped), getLoggedInputTokens(streamed));
  assert.equal(getPromptCacheReadTokens(shaped), getPromptCacheReadTokens(streamed));
  assert.equal(getPromptCacheCreationTokens(shaped), getPromptCacheCreationTokens(streamed));
});

test("Anthropic SSE buffered for a non-streaming request is totalled once", () => {
  // parseSSEToClaudeResponse keeps the raw Anthropic usage (cache excluded), so the
  // extractor must add the cache exactly once for a non-Anthropic provider id.
  const rawSSE = [
    "event: message_start",
    `data: ${JSON.stringify({
      type: "message_start",
      message: {
        id: "msg_sse",
        model: "any-model",
        role: "assistant",
        usage: { ...ANTHROPIC_USAGE, output_tokens: 1 },
      },
    })}`,
    "",
    "event: content_block_delta",
    'data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"ok"}}',
    "",
    "event: message_delta",
    'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":50}}',
    "",
    "event: message_stop",
    'data: {"type":"message_stop"}',
    "",
  ].join("\n");

  const body = parseSSEToClaudeResponse(rawSSE, "any-model");
  const usage = extractUsageFromResponse(body, "deepseek");

  assert.equal(usage.prompt_tokens, TOTAL_PROMPT_TOKENS);
  assert.equal(usage.completion_tokens, 50);
  assert.equal(getLoggedInputTokens(usage), TOTAL_PROMPT_TOKENS);
});

test("Anthropic-shaped usage without cache keys keeps input as the prompt total", () => {
  const usage = extractUsageFromResponse(
    anthropicMessageBody({ input_tokens: 42, output_tokens: 7 }),
    "kimi-coding"
  );

  assert.equal(usage.prompt_tokens, 42);
  assert.equal(usage.completion_tokens, 7);
});

test("a Claude-format provider with no prompt cache keeps the cache counters N/A", () => {
  // devin-cli-agentic builds Anthropic bodies with input/output only
  // (open-sse/executors/devin-agentic/anthropicResponse.ts): no cache concept.
  const usage = extractUsageFromResponse(
    anthropicMessageBody({ input_tokens: 42, output_tokens: 7 }),
    "devin-cli-agentic"
  );

  assert.equal(usage.prompt_tokens, 42);
  assert.equal(usage.cache_read_input_tokens, undefined);
  assert.equal(usage.cache_creation_input_tokens, undefined);
  assert.equal(getPromptCacheReadTokensOrNull(usage), null);
  assert.equal(getPromptCacheCreationTokensOrNull(usage), null);
});

test("a native Claude id still reports unreported cache counters as 0", () => {
  const usage = extractUsageFromResponse(
    anthropicMessageBody({ input_tokens: 42, output_tokens: 7 }),
    "anthropic"
  );

  assert.equal(getPromptCacheReadTokensOrNull(usage), 0);
  assert.equal(getPromptCacheCreationTokensOrNull(usage), 0);
});

test("a Claude-format provider reporting only one cache counter keeps the other N/A", () => {
  const usage = extractUsageFromResponse(
    anthropicMessageBody({ input_tokens: 100, output_tokens: 7, cache_read_input_tokens: 900 }),
    "zai"
  );

  assert.equal(usage.prompt_tokens, 1_000);
  assert.equal(getPromptCacheReadTokensOrNull(usage), 900);
  assert.equal(getPromptCacheCreationTokensOrNull(usage), null);
});

test("Anthropic-shaped usage keeps reasoning tokens reported by Claude-format providers", () => {
  const thinking = extractUsageFromResponse(
    anthropicMessageBody({ ...ANTHROPIC_USAGE, output_tokens_details: { thinking_tokens: 20 } }),
    "kimi-coding"
  );
  const nested = extractUsageFromResponse(
    anthropicMessageBody({ ...ANTHROPIC_USAGE, output_tokens_details: { reasoning_tokens: 25 } }),
    "kimi-coding"
  );
  const flat = extractUsageFromResponse(
    anthropicMessageBody({ ...ANTHROPIC_USAGE, reasoning_tokens: 30 }),
    "deepseek"
  );

  assert.equal(thinking.reasoning_tokens, 20);
  assert.equal(nested.reasoning_tokens, 25);
  assert.equal(nested.prompt_tokens, TOTAL_PROMPT_TOKENS);
  assert.equal(flat.reasoning_tokens, 30);
});

test("an OpenAI answer translated for a Claude client totals back to prompt_tokens", () => {
  // Semantic-cache replays store the client-format body. For a Claude client served by
  // an OpenAI provider, responseTranslator sets input_tokens = prompt - cache, so the
  // extractor must add the cache back to recover the original prompt total.
  const openAiAnswer = {
    id: "chatcmpl-translated",
    object: "chat.completion",
    model: "gpt-test",
    choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
    usage: {
      prompt_tokens: TOTAL_PROMPT_TOKENS,
      completion_tokens: 50,
      total_tokens: TOTAL_PROMPT_TOKENS + 50,
      prompt_tokens_details: { cached_tokens: 9_000, cache_creation_tokens: 900 },
    },
  };

  const claudeBody = translateNonStreamingResponse(openAiAnswer, "openai", "claude");
  assert.equal(claudeBody.type, "message");
  assert.equal(claudeBody.usage.input_tokens, 100);

  const usage = extractUsageFromResponse(claudeBody, "openai");
  assert.equal(usage.prompt_tokens, TOTAL_PROMPT_TOKENS);
  assert.equal(getLoggedInputTokens(usage), TOTAL_PROMPT_TOKENS);
  assert.equal(getPromptCacheReadTokens(usage), 9_000);
  assert.equal(getPromptCacheCreationTokens(usage), 900);
});

// Controls: bodies whose prompt total already includes cached tokens must not be
// re-totalled, whatever the provider id.

test("every usage shape stores the same prompt total for the same request", () => {
  const cases: Array<[string, Record<string, unknown>, string]> = [
    ["native claude non-streaming", anthropicMessageBody(), "claude"],
    [
      "OpenAI chat with cached_tokens",
      {
        object: "chat.completion",
        choices: [],
        usage: {
          prompt_tokens: TOTAL_PROMPT_TOKENS,
          completion_tokens: 50,
          prompt_tokens_details: { cached_tokens: 9_000, cache_creation_tokens: 900 },
        },
      },
      "deepseek",
    ],
    [
      "Responses API with input_tokens_details",
      {
        object: "response",
        output: [],
        usage: {
          input_tokens: TOTAL_PROMPT_TOKENS,
          output_tokens: 50,
          input_tokens_details: { cached_tokens: 9_000 },
        },
      },
      "kimi-coding",
    ],
    [
      "Responses API nested under response",
      {
        response: {
          usage: {
            input_tokens: TOTAL_PROMPT_TOKENS,
            output_tokens: 50,
            input_tokens_details: { cached_tokens: 9_000 },
          },
        },
      },
      "deepseek",
    ],
    [
      "Gemini usageMetadata",
      {
        usageMetadata: {
          promptTokenCount: TOTAL_PROMPT_TOKENS,
          candidatesTokenCount: 50,
          cachedContentTokenCount: 9_000,
        },
      },
      "gemini",
    ],
  ];

  for (const [label, body, provider] of cases) {
    const usage = extractUsageFromResponse(body, provider);
    assert.equal(usage.prompt_tokens, TOTAL_PROMPT_TOKENS, label);
    assert.equal(getLoggedInputTokens(usage), TOTAL_PROMPT_TOKENS, label);
    assert.equal(getPromptCacheReadTokens(usage), 9_000, label);
  }
});

test("flat Anthropic cache keys without a message body stay on the Responses branch", () => {
  // MiniMax / Bedrock Responses usage carries flat cache_read_input_tokens next to an
  // input_tokens that already includes them (responseSanitizer.ts maps the flat key to
  // input_tokens_details.cached_tokens). Only the `type: "message"` body selects the
  // Anthropic rule, so this usage must keep its reported input as the prompt total.
  const usage = extractUsageFromResponse(
    {
      id: "resp_flat_cache",
      output: [],
      usage: {
        input_tokens: TOTAL_PROMPT_TOKENS,
        output_tokens: 50,
        cache_read_input_tokens: 9_000,
        cache_creation_input_tokens: 900,
      },
    },
    "minimax"
  );

  assert.equal(usage.prompt_tokens, TOTAL_PROMPT_TOKENS);
  assert.equal(usage.cached_tokens, 9_000);
  assert.equal(getLoggedInputTokens(usage), TOTAL_PROMPT_TOKENS);
});

test("a message-typed body carrying Responses cached-token details is not re-totalled", () => {
  // input_tokens_details.cached_tokens means input_tokens already includes the cache.
  const usage = extractUsageFromResponse(
    anthropicMessageBody({
      input_tokens: TOTAL_PROMPT_TOKENS,
      output_tokens: 50,
      input_tokens_details: { cached_tokens: 9_000 },
    }),
    "kimi-coding"
  );

  assert.equal(usage.prompt_tokens, TOTAL_PROMPT_TOKENS);
  assert.equal(usage.cached_tokens, 9_000);
});

test("Anthropic-shaped usage bills fresh input for non-Anthropic provider ids", () => {
  // $/1M tokens: input 3, cache read 0.3, cache write 3.75, output 15.
  const pricing = { input: 3, cached: 0.3, cache_creation: 3.75, output: 15 };
  const expected = (100 * 3 + 9_000 * 0.3 + 900 * 3.75 + 50 * 15) / 1_000_000;
  const withoutFreshInput = (9_000 * 0.3 + 900 * 3.75 + 50 * 15) / 1_000_000;

  for (const provider of ["kimi-coding", "deepseek"]) {
    const cost = computeCostFromPricing(
      pricing,
      extractUsageFromResponse(anthropicMessageBody(), provider)
    );
    assert.ok(Math.abs(cost - expected) < 1e-12, `${provider}: ${cost} !== ${expected}`);
    assert.ok(cost > withoutFreshInput + 1e-12, `${provider}: fresh input not billed`);
  }

  assert.equal(
    computeCostFromPricing(
      pricing,
      extractUsageFromResponse(anthropicMessageBody(), "kimi-coding")
    ),
    computeCostFromPricing(pricing, extractUsageFromResponse(anthropicMessageBody(), "claude"))
  );
});
