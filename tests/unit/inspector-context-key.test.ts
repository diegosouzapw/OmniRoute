import test from "node:test";
import assert from "node:assert/strict";
import { extractSystemPrompt, computeContextKey } from "../../src/mitm/inspector/contextKey.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

function makeReq(body: unknown): InterceptedRequest {
  return {
    id: "00000000-0000-0000-0000-000000000001",
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: body !== null ? JSON.stringify(body) : null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
  };
}

test("extractSystemPrompt — OpenAI chat messages[0] role=system", () => {
  const req = makeReq({
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "Hello" }],
  });
  assert.equal(extractSystemPrompt(req), "You are a helpful assistant.");
});

test("extractSystemPrompt — Anthropic top-level system field (string)", () => {
  const req = makeReq({ system: "You are Claude.", messages: [{ role: "user", content: "Hello" }] });
  assert.equal(extractSystemPrompt(req), "You are Claude.");
});

test("extractSystemPrompt — Anthropic top-level system field (array)", () => {
  const req = makeReq({
    system: [{ type: "text", text: "You are a helpful assistant." }],
    messages: [{ role: "user", content: "Hello" }],
  });
  assert.equal(extractSystemPrompt(req), "You are a helpful assistant.");
});

test("extractSystemPrompt — Gemini systemInstruction.parts", () => {
  const req = makeReq({
    systemInstruction: { parts: [{ text: "You are a Gemini assistant." }] },
    contents: [{ parts: [{ text: "Hello" }] }],
  });
  assert.equal(extractSystemPrompt(req), "You are a Gemini assistant.");
});

test("extractSystemPrompt — null when no system prompt", () => {
  assert.equal(extractSystemPrompt(makeReq({ messages: [{ role: "user", content: "Hi" }] })), null);
});

test("extractSystemPrompt — null when requestBody is null", () => {
  assert.equal(extractSystemPrompt(makeReq(null)), null);
});

test("extractSystemPrompt — null when requestBody is invalid JSON", () => {
  const req = makeReq(null);
  req.requestBody = "not-json{{{";
  assert.equal(extractSystemPrompt(req), null);
});

test("computeContextKey — same system → same 12-hex key", () => {
  const sys = "You are a helpful assistant.";
  const key1 = computeContextKey(makeReq({ messages: [{ role: "system", content: sys }, { role: "user", content: "Hi" }] }));
  const key2 = computeContextKey(makeReq({ messages: [{ role: "system", content: sys }, { role: "user", content: "Bye" }] }));
  assert.ok(key1 !== null);
  assert.equal(key1, key2);
});

test("computeContextKey — returns 12 hex chars", () => {
  const key = computeContextKey(makeReq({ messages: [{ role: "system", content: "Test system" }, { role: "user", content: "Hi" }] }));
  assert.ok(key !== null);
  assert.equal(key!.length, 12);
  assert.match(key!, /^[0-9a-f]{12}$/);
});

test("computeContextKey — null when no system", () => {
  assert.equal(computeContextKey(makeReq({ messages: [{ role: "user", content: "Hi" }] })), null);
});

test("computeContextKey — different systems → different keys", () => {
  const k1 = computeContextKey(makeReq({ messages: [{ role: "system", content: "System A" }, { role: "user", content: "Hi" }] }));
  const k2 = computeContextKey(makeReq({ messages: [{ role: "system", content: "System B" }, { role: "user", content: "Hi" }] }));
  assert.notEqual(k1, k2);
});
