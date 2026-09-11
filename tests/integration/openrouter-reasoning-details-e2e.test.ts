import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openrouter-reasoning-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-openrouter-reasoning-secret";
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;

type FetchCall = {
  url: string;
  method?: string;
  headers: Record<string, string>;
  body: Record<string, any> | null;
};

function toPlainHeaders(headers: HeadersInit | undefined | null) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  if (Array.isArray(headers)) return Object.fromEntries(headers);
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildRequest(url: string, overrides: RequestInit = {}) {
  const headers = new Headers({
    "content-type": "application/json",
    ...((overrides.headers as Record<string, string>) || {}),
  });
  return new Request(url, { ...overrides, headers });
}

/**
 * OpenRouter-shaped non-streaming completion: the provider returns BOTH a
 * `reasoning` string AND a `reasoning_details[]` array carrying the same
 * thinking text. This is exactly what DeepSeek V4 / GLM 5.3 / Kimi K3 return
 * through OpenRouter (#12665).
 */
function buildOpenRouterStreamingSse({
  thinking = "Hmm, let me think this through",
  content = "Visible answer",
} = {}) {
  const chunk = (delta: Record<string, unknown>) =>
    `data: ${JSON.stringify({
      id: "chatcmpl_openrouter_reasoning_stream",
      object: "chat.completion.chunk",
      created: 1783636289,
      model: "deepseek/deepseek-v4-flash",
      choices: [
        { index: 0, delta, finish_reason: null, logprobs: null },
      ],
    })}\n\n`;
  return (
    chunk({ reasoning: thinking, reasoning_details: [{ type: "reasoning.text", text: thinking }] }) +
    chunk({ content }) +
    chunk({}) +
    chunk({}) +
    "data: [DONE]\n\n"
  );
}

function buildOpenRouterResponse({
  content = "Visible answer",
  thinking = "Hmm, let me think this through",
} = {}) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl_openrouter_reasoning",
      object: "chat.completion",
      created: 1783636289,
      model: "deepseek/deepseek-v4-flash",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content,
            reasoning: thinking,
            reasoning_details: [{ type: "reasoning.text", text: thinking }],
          },
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: { prompt_tokens: 20, completion_tokens: 30, total_tokens: 50 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

test.before(async () => {
  await initTranslators();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  BaseExecutor.freeze?.();
  clearInflight();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test("openrouter provider: reasoning_details[].text is mirrored to reasoning_content even when reasoning string is present", async () => {
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-reasoning-e2e",
    apiKey: "sk-mock-openrouter-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "http://mock-openrouter.invalid/v1" },
  });

  const fetchCalls: FetchCall[] = [];

  globalThis.fetch = async (input, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(input),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenRouterResponse();
  };

  const response = await handleChat(
    buildRequest("http://localhost/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "openrouter/auto",
        stream: false,
        messages: [{ role: "user", content: "Think through this carefully." }],
      }),
    })
  );

  const json = (await response.json()) as any;

  assert.equal(response.status, 200, JSON.stringify(json));
  assert.equal(fetchCalls.length, 1, "should make exactly one upstream call");
  assert.match(fetchCalls[0].url, /mock-openrouter\.invalid/, fetchCalls[0].url);

  const message = json.choices[0].message;
  assert.equal(message.content, "Visible answer");
  // The client-readable field must be populated from reasoning_details[].text
  // even though the `reasoning` alias is also present (#12665).
  assert.equal(message.reasoning_content, "Hmm, let me think this through");
  assert.equal(message.reasoning, "Hmm, let me think this through");
  assert.deepEqual(message.reasoning_details, [
    { type: "reasoning.text", text: "Hmm, let me think this through" },
  ]);
});

test("openrouter provider: streaming deltas carry reasoning_content from reasoning_details[].text", async () => {
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-reasoning-stream-e2e",
    apiKey: "sk-mock-openrouter-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "http://mock-openrouter.invalid/v1" },
  });

  let fetched = false;
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    void input;
    void init;
    fetched = true;
    return new Response(buildOpenRouterStreamingSse(), {
      status: 200,
      headers: { "content-type": "text/event-stream; charset=utf-8" },
    });
  };

  const response = await handleChat(
    buildRequest("http://localhost/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "openrouter/auto",
        stream: true,
        messages: [{ role: "user", content: "Think through this carefully." }],
      }),
    })
  );

  const raw = await response.text();
  assert.equal(response.status, 200, raw);
  assert.equal(fetched, true, "should make exactly one upstream call");

  const chunks = raw.split("\n\n").filter((line) => line.startsWith("data: "));
  const payloads = chunks
    .map((line) => line.replace(/^data: /, ""))
    .filter((json) => json !== "[DONE]")
    .map((json) => JSON.parse(json) as {
      choices?: Array<{ delta?: Record<string, unknown> }>;
    });

  const reasoningContentDeltas = payloads
    .map((payload) => payload.choices?.[0]?.delta?.reasoning_content)
    .filter((content): content is string => Boolean(content));

  assert.equal(reasoningContentDeltas.length, 1, JSON.stringify(payloads));
  assert.equal(reasoningContentDeltas[0], "Hmm, let me think this through");
});
