import test from "node:test";
import assert from "node:assert/strict";
import { detectKind } from "../../src/mitm/inspector/kindDetector.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

function makeReq(overrides: Partial<InterceptedRequest>): InterceptedRequest {
  return {
    id: "00000000-0000-0000-0000-000000000001",
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "random.example.com",
    path: "/api/data",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    ...overrides,
  };
}

test("detectKind — api.openai.com → llm", () => {
  assert.equal(detectKind(makeReq({ host: "api.openai.com" })), "llm");
});
test("detectKind — api.anthropic.com → llm", () => {
  assert.equal(detectKind(makeReq({ host: "api.anthropic.com" })), "llm");
});
test("detectKind — generativelanguage.googleapis.com → llm", () => {
  assert.equal(detectKind(makeReq({ host: "generativelanguage.googleapis.com" })), "llm");
});
test("detectKind — openrouter.ai → llm", () => {
  assert.equal(detectKind(makeReq({ host: "openrouter.ai" })), "llm");
});
test("detectKind — azure openai subdomain → llm", () => {
  assert.equal(detectKind(makeReq({ host: "mycompany.openai.azure.com" })), "llm");
});
test("detectKind — api.mistral.ai → llm", () => {
  assert.equal(detectKind(makeReq({ host: "api.mistral.ai" })), "llm");
});
test("detectKind — api.groq.com → llm", () => {
  assert.equal(detectKind(makeReq({ host: "api.groq.com" })), "llm");
});

test("detectKind — body with messages array → llm", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }),
  });
  assert.equal(detectKind(req), "llm");
});

test("detectKind — body with contents array (Gemini) → llm", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] }),
  });
  assert.equal(detectKind(req), "llm");
});

test("detectKind — UA 'antigravity/1.0' → llm", () => {
  assert.equal(
    detectKind(makeReq({ requestHeaders: { "user-agent": "antigravity/1.0" } })),
    "llm",
  );
});

test("detectKind — random.example.com with no clues → unknown", () => {
  assert.equal(detectKind(makeReq({ host: "random.example.com" })), "unknown");
});

test("detectKind — returns 'unknown' when nothing is detectable (empty body, no UA, unknown host)", () => {
  const req = makeReq({
    host: "internal.example.corp",
    path: "/api/v2/resource",
    requestBody: null,
    requestHeaders: {},
  });
  assert.equal(detectKind(req), "unknown");
});

test("detectKind — non-LLM JSON body → app", () => {
  const req = makeReq({
    requestBody: JSON.stringify({ userId: 42, action: "click" }),
  });
  assert.equal(detectKind(req), "app");
});

test("detectKind — path /v1/chat/completions → llm", () => {
  assert.equal(detectKind(makeReq({ path: "/v1/chat/completions" })), "llm");
});
test("detectKind — path /v1/messages → llm", () => {
  assert.equal(detectKind(makeReq({ path: "/v1/messages" })), "llm");
});
test("detectKind — path /generateContent → llm", () => {
  assert.equal(detectKind(makeReq({ path: "/v1beta/models/gemini-pro:generateContent" })), "llm");
});
