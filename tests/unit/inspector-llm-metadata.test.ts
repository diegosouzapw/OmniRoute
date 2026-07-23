import test from "node:test";
import assert from "node:assert/strict";
import { extractLlmMetadata } from "../../src/mitm/inspector/llmMetadataExtractor.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

function makeReq(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: "test",
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    detectedKind: "llm",
    ...overrides,
  };
}

test("returns null for non-llm requests", () => {
  const req = makeReq({ detectedKind: "app" });
  assert.equal(extractLlmMetadata(req), null);
});

test("infers provider=openai from host", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ model: "gpt-4", messages: [] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.provider, "openai");
  assert.equal(meta.apiKind, "chat.completions");
  assert.equal(meta.model, "gpt-4");
});

test("infers provider=anthropic + apiKind=messages", () => {
  const req = makeReq({
    host: "api.anthropic.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({ model: "claude-3", messages: [{}, {}] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.provider, "anthropic");
  assert.equal(meta.apiKind, "messages");
  assert.equal(meta.messages, 2);
});

test("infers provider=gemini", () => {
  const req = makeReq({
    host: "generativelanguage.googleapis.com",
    path: "/v1beta/models/gemini-pro:generateContent",
    requestBody: JSON.stringify({ contents: [{}, {}, {}] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.provider, "gemini");
  assert.equal(meta.messages, 3);
});

test("extracts model from response body when missing in request", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ messages: [] }),
    responseBody: JSON.stringify({ model: "gpt-4-turbo", choices: [] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.model, "gpt-4-turbo");
});

test("extracts tokensIn/tokensOut from prompt_tokens/completion_tokens", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ model: "gpt-4", messages: [] }),
    responseBody: JSON.stringify({
      usage: { prompt_tokens: 10, completion_tokens: 25 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.tokensIn, 10);
  assert.equal(meta.tokensOut, 25);
});

test("computes costEstimateUsd for gpt-4o with token counts", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ model: "gpt-4o", messages: [] }),
    responseBody: JSON.stringify({
      usage: { prompt_tokens: 1_000_000, completion_tokens: 100_000 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.tokensIn, 1_000_000);
  assert.equal(meta.tokensOut, 100_000);
  // 1M*2.50/1M + 100k*10.00/1M = 2.50 + 1.00 = 3.50
  assert.equal(meta.costEstimateUsd, 3.50);
});

test("computes costEstimateUsd for claude-3-5-sonnet with token counts", () => {
  const req = makeReq({
    host: "api.anthropic.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({ model: "claude-3-5-sonnet-20240620", messages: [] }),
    responseBody: JSON.stringify({
      usage: { input_tokens: 500_000, output_tokens: 200_000 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  // 500k*3.00/1M + 200k*15.00/1M = 1.50 + 3.00 = 4.50
  assert.equal(meta.costEstimateUsd, 4.50);
});

test("costEstimateUsd is null for unknown model", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ model: "unknown-model-xyz", messages: [] }),
    responseBody: JSON.stringify({
      usage: { prompt_tokens: 100, completion_tokens: 50 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.costEstimateUsd, null);
});

test("extracts tokensIn/tokensOut from input_tokens/output_tokens (Anthropic)", () => {
  const req = makeReq({
    host: "api.anthropic.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({ model: "claude-3", messages: [] }),
    responseBody: JSON.stringify({
      usage: { input_tokens: 50, output_tokens: 100 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.tokensIn, 50);
  assert.equal(meta.tokensOut, 100);
});

test("extracts tokens from Gemini usageMetadata", () => {
  const req = makeReq({
    host: "generativelanguage.googleapis.com",
    path: "/v1beta/models/gemini-pro:generateContent",
    requestBody: JSON.stringify({ contents: [] }),
    responseBody: JSON.stringify({
      usageMetadata: { promptTokenCount: 7, candidatesTokenCount: 14 },
    }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.tokensIn, 7);
  assert.equal(meta.tokensOut, 14);
});

test("flags streamed=true on SSE content-type", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ model: "gpt-4", messages: [] }),
    responseHeaders: { "content-type": "text/event-stream" },
    responseBody: "data: {}\n",
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.streamed, true);
});

test("returns null fields when no info available", () => {
  const req = makeReq({
    host: "unknown.example.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({ messages: [] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.provider, null);
  assert.equal(meta.tokensIn, null);
  assert.equal(meta.tokensOut, null);
  assert.equal(meta.costEstimateUsd, null);
});

test("captures mappedTo from request override", () => {
  const req = makeReq({
    mappedModel: "gpt-4o",
    requestBody: JSON.stringify({ model: "gpt-3.5", messages: [] }),
  });
  const meta = extractLlmMetadata(req);
  assert.ok(meta);
  assert.equal(meta.mappedTo, "gpt-4o");
});
