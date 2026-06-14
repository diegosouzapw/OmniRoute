import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llamacpp-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-llamacpp-secret";
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { clearProviderFailure } = await import("../../open-sse/services/accountFallback.ts");

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

function buildRequest({
  url = "http://localhost/v1/chat/completions",
  body,
  headers = {},
}: {
  url?: string;
  body?: unknown;
  headers?: Record<string, string>;
} = {}) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

function buildLlamaResponse(text: string, model: string) {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-llamacpp",
      object: "chat.completion",
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  clearInflight();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  await initTranslators();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
  clearInflight();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test("llama-cpp provider: routes request to custom baseUrl with no auth header", async () => {
  await providersDb.createProviderConnection({
    provider: "llama-cpp",
    authType: "apikey",
    name: "llama-cpp-primary",
    apiKey: null,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "http://localhost:10965/v1" },
  });

  const fetchCalls: FetchCall[] = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildLlamaResponse("Why did the programmer go broke? Because he used up all his cache!", "unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "llamacpp/unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M",
        stream: false,
        messages: [{ role: "user", content: "Tell me a joke." }],
      },
    })
  );

  const json = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1, "should make exactly one upstream call");

  const upstream = fetchCalls[0];
  assert.match(upstream.url, /^http:\/\/localhost:10965\/v1\/chat\/completions$/);
  assert.equal(upstream.headers.Authorization, undefined, "no auth header for local provider");
  assert.equal(upstream.body.messages[0].content, "Tell me a joke.");
  assert.equal(upstream.body.model, "unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M");
  assert.equal(json.choices[0].message.content, "Why did the programmer go broke? Because he used up all his cache!");
});

test("llama-cpp provider: alias matching works via model catalog prefix", async () => {
  await providersDb.createProviderConnection({
    provider: "llama-cpp",
    authType: "apikey",
    name: "llama-cpp-secondary",
    apiKey: null,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl: "http://localhost:10965/v1" },
  });

  const fetchCalls: FetchCall[] = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({ url: String(url), method: init.method, headers: toPlainHeaders(init.headers), body: init.body ? JSON.parse(String(init.body)) : null });
    return buildLlamaResponse("42", "unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "llamacpp/unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M",
        stream: false,
        messages: [{ role: "user", content: "What is the answer?" }],
      },
    })
  );

  const json = (await response.json()) as any;
  assert.equal(response.status, 200, `expected 200, got ${response.status}: ${JSON.stringify(json)}`);
  assert.equal(json.choices[0].message.content, "42");
});

test("llama-cpp provider: returns 400 when no connection exists", async () => {
  const response = await handleChat(
    buildRequest({
      body: {
        model: "llamacpp/unsloth/gemma-4-26B-A4B-it-GGUF:UD-IQ2_M",
        stream: false,
        messages: [{ role: "user", content: "test" }],
      },
    })
  );

  assert.equal(response.status, 400);
  const json = (await response.json()) as any;
  assert.match(json.error.message, /No credentials for provider/);
});
