import { test } from "node:test";
import assert from "node:assert/strict";

import { parseNonStreamingResponseBody } from "@omniroute/open-sse/handlers/chatCore/nonStreamingResponseParse.ts";

// Minimal Response stub: only the surface parseNonStreamingResponseBody touches
// (headers.get + text()). upstreamStream is passed false so readNonStreamingResponseBody
// always takes the buffered response.text() path.
function makeResponse(body: string, contentType: string): Response {
  return {
    headers: {
      get: (name: string) =>
        name.toLowerCase() === "content-type" ? contentType : null,
    },
    text: async () => body,
    body: null,
  } as unknown as Response;
}

const baseOpts = {
  upstreamStream: false,
  providerHeaders: null,
  finalBody: null,
  targetFormat: "openai",
  model: "gpt-4o-mini",
};

test("valid JSON body → ok with parsed object and targetFormat", async () => {
  const payload = { id: "x", choices: [{ message: { content: "hi" } }] };
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(JSON.stringify(payload), "application/json"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.deepEqual(res.responseBody, payload);
  assert.equal(res.responsePayloadFormat, "openai");
  assert.equal(res.looksLikeSSE, false);
});

test("empty body (non-SSE) → ok with empty object", async () => {
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("", "application/json"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.deepEqual(res.responseBody, {});
  assert.equal(res.looksLikeSSE, false);
});

test("invalid JSON → invalid_json with short message + detailed error", async () => {
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("{not json", "application/json"),
  });
  assert.equal(res.kind, "invalid_json");
  if (res.kind !== "invalid_json") return;
  assert.equal(res.message, "Invalid JSON response from provider");
  assert.match(res.detailedError, /^Invalid JSON response from provider \(error: /);
  assert.match(res.detailedError, /\{not json/);
  assert.equal(res.looksLikeSSE, false);
});

test("valid SSE payload (by content-type) → ok with SSE-derived format", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hello"},"index":0,"finish_reason":null}]}\n\n' +
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "ok");
  if (res.kind !== "ok") return;
  assert.equal(res.looksLikeSSE, true);
  assert.ok(res.responseBody && typeof res.responseBody === "object");
  assert.equal(typeof res.responsePayloadFormat, "string");
});

test("SSE detected by body heuristic even with non-stream content-type", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hi"},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/plain"),
  });
  assert.equal(res.looksLikeSSE, true);
});

test("error-only SSE (no choices) → invalid_sse surfacing the upstream error (#3324)", async () => {
  const sse = 'data: {"error":{"message":"Devin CLI not found in PATH"}}\n\n';
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "invalid_sse");
  if (res.kind !== "invalid_sse") return;
  assert.equal(res.message, "Devin CLI not found in PATH");
  assert.equal(res.looksLikeSSE, true);
});

test("unparseable SSE with no embedded error → generic invalid_sse message", async () => {
  const sse = "data: not-json-at-all\n\n";
  const res = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse(sse, "text/event-stream"),
  });
  assert.equal(res.kind, "invalid_sse");
  if (res.kind !== "invalid_sse") return;
  assert.equal(res.message, "Invalid SSE response for non-streaming request");
});

test("normalizedProviderPayload is present on every branch", async () => {
  const ok = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse('{"a":1}', "application/json"),
  });
  assert.ok("normalizedProviderPayload" in ok);
  const bad = await parseNonStreamingResponseBody({
    ...baseOpts,
    providerResponse: makeResponse("{bad", "application/json"),
  });
  assert.ok("normalizedProviderPayload" in bad);
});

test("buffering log fires debug when stream was expected, warn otherwise", async () => {
  const sse =
    'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"delta":{"content":"hi"},"index":0,"finish_reason":"stop"}]}\n\n' +
    "data: [DONE]\n\n";
  const debugCalls: string[] = [];
  const warnCalls: string[] = [];
  const log = {
    debug: (_tag: string, msg: string) => debugCalls.push(msg),
    warn: (_tag: string, msg: string) => warnCalls.push(msg),
  };

  // upstreamStream=true → expected → debug path
  await parseNonStreamingResponseBody({
    ...baseOpts,
    upstreamStream: true,
    providerResponse: makeResponse(sse, "text/event-stream"),
    log,
  });
  assert.equal(debugCalls.length, 1);
  assert.equal(warnCalls.length, 0);

  // upstreamStream=false + no accept/stream hints → unexpected → warn path
  await parseNonStreamingResponseBody({
    ...baseOpts,
    upstreamStream: false,
    providerResponse: makeResponse(sse, "text/event-stream"),
    log,
  });
  assert.equal(warnCalls.length, 1);
});
